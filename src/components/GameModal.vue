<template>
  <div id="game-overlay" :class="{ open: isOpen }" @click.self="close">
    <div class="game-modal">
      <div class="gm-corner tl"></div><div class="gm-corner tr"></div>
      <div class="gm-corner bl"></div><div class="gm-corner br"></div>
      <button class="gm-close" @click="close">[ CLOSE ]</button>
      <div class="gm-head">
        <div class="gm-title">TIC<span>-TAC-</span>TOE</div>
        <div class="gm-status" id="gStatus">{{ statusText }}</div>
      </div>
      <div class="gm-mode">
        <button class="mode-btn" :class="{ active: gameMode === '2p' }" @click="setMode('2p')">2 PLAYERS</button>
        <button class="mode-btn" :class="{ active: gameMode === 'ai' }" @click="setMode('ai')">VS AI</button>
      </div>
      <div class="gm-score">
        <div class="sc-box"><div class="sc-label">PLAYER X</div><div class="sc-val x-col">{{ scores.X }}</div></div>
        <div class="sc-sep">/</div>
        <div class="sc-box"><div class="sc-label">DRAWS</div><div class="sc-val d-col">{{ scores.D }}</div></div>
        <div class="sc-sep">/</div>
        <div class="sc-box"><div class="sc-label" id="p2label">{{ gameMode === 'ai' ? 'AI O' : 'PLAYER O' }}</div><div class="sc-val o-col">{{ scores.O }}</div></div>
      </div>
      <div class="gm-board" id="board">
        <div
          v-for="i in 9"
          :key="i - 1"
          class="cell"
          :class="{ taken: board[i - 1] !== null, 'win-cell': winLine.includes(i - 1), 'o-win': winLine.includes(i - 1) && winnerMark === 'O' }"
          @click="cellClick(i - 1)"
        >
          <div
            class="cell-mark"
            :class="board[i - 1] ? ('show ' + (board[i - 1] === 'X' ? 'x-mark' : 'o-mark')) : ''"
          >{{ board[i - 1] || '' }}</div>
        </div>
      </div>
      <div class="gm-btns">
        <button class="g-btn g-btn-primary" @click="resetGame">NEW GAME</button>
        <button class="g-btn g-btn-sec" @click="resetScores">RESET SCORES</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isOpen = ref(false)
const board = ref(Array(9).fill(null))
const current = ref('X')
const gameOver = ref(false)
const gameMode = ref('2p')
const scores = ref({ X: 0, O: 0, D: 0 })
const winLine = ref([])
const winnerMark = ref(null)
const statusText = ref("▶ PLAYER X'S TURN")

const WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

function open() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function setMode(m) {
  gameMode.value = m
  resetGame()
}

function cellClick(i) {
  if (gameOver.value || board.value[i] !== null) return
  if (gameMode.value === 'ai' && current.value === 'O') return
  makeMove(i)
  if (gameMode.value === 'ai' && !gameOver.value && current.value === 'O') {
    setTimeout(aiMove, 420)
  }
}

function makeMove(i) {
  const newBoard = [...board.value]
  newBoard[i] = current.value
  board.value = newBoard

  const result = checkWin(board.value)
  if (result) {
    endGame(result)
    return
  }
  if (board.value.every(c => c !== null)) {
    endGame('draw')
    return
  }
  current.value = current.value === 'X' ? 'O' : 'X'
  updateStatus()
}

function aiMove() {
  const best = minimax([...board.value], 'O')
  makeMove(best.idx)
}

function minimax(b, player) {
  const opp = player === 'O' ? 'X' : 'O'
  if (checkWinFor(b, 'O')) return { score: 10 }
  if (checkWinFor(b, 'X')) return { score: -10 }
  if (b.every(c => c !== null)) return { score: 0 }
  const moves = []
  b.forEach((c, i) => {
    if (c === null) {
      const nb = [...b]
      nb[i] = player
      const r = minimax(nb, opp)
      moves.push({ idx: i, score: r.score })
    }
  })
  return player === 'O'
    ? moves.reduce((a, c) => c.score > a.score ? c : a)
    : moves.reduce((a, c) => c.score < a.score ? c : a)
}

function checkWinFor(b, p) {
  return WINS.some(([a, c, d]) => b[a] === p && b[c] === p && b[d] === p)
}

function checkWin(b) {
  for (const [a, bIdx, c] of WINS) {
    if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
      return { winner: b[a], line: [a, bIdx, c] }
    }
  }
  return null
}

function endGame(result) {
  gameOver.value = true
  if (result === 'draw') {
    scores.value.D++
    statusText.value = 'DRAW — Well played both sides'
  } else {
    const w = result.winner
    scores.value[w]++
    winLine.value = result.line
    winnerMark.value = w
    const label = gameMode.value === 'ai' && w === 'O' ? 'AI WINS'
      : gameMode.value === 'ai' && w === 'X' ? 'PLAYER X WINS!'
      : w + ' WINS!'
    statusText.value = '▶ ' + label + ' — Press NEW GAME to continue'
  }
}

function updateStatus() {
  const next = gameMode.value === 'ai' && current.value === 'O'
    ? 'AI is thinking...'
    : current.value === 'X' ? "PLAYER X'S TURN" : "PLAYER O'S TURN"
  statusText.value = '▶ ' + next
}

function resetGame() {
  board.value = Array(9).fill(null)
  current.value = 'X'
  gameOver.value = false
  winLine.value = []
  winnerMark.value = null
  statusText.value = "▶ PLAYER X'S TURN"
}

function resetScores() {
  scores.value = { X: 0, O: 0, D: 0 }
  resetGame()
}

defineExpose({ open })
</script>
