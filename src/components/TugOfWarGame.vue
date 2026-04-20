<template>
  <div class="tug-container" v-if="isOpen">
    <!-- Backdrop -->
    <div class="tug-backdrop" @click="close"></div>

    <!-- Game Modal -->
    <div class="tug-modal">
      <div class="tug-header">
        <h2>TUG OF WAR: MATHEMATICS</h2>
        <button class="close-btn" @click="close">✕</button>
      </div>

      <!-- Score Display -->
      <div class="tug-scores">
        <div class="team-score team-blue">
          <span class="label">TEAM BLUE</span>
          <span class="score">{{ scores.blue }}</span>
        </div>
        <div class="tug-rope">
          <div class="rope-container">
            <div class="rope" :style="{ left: ropePosition + '%' }"></div>
            <div class="flag flag-left" :style="{ left: ropePosition + '%' }">🚩</div>
          </div>
        </div>
        <div class="team-score team-red">
          <span class="label">TEAM RED</span>
          <span class="score">{{ scores.red }}</span>
        </div>
      </div>

      <!-- Game Area -->
      <div class="tug-game-area" v-if="!gameOver">
        <div class="questions">
          <div class="question-card blue-card">
            <div class="question-text">{{ currentQuestion.left }}</div>
            <div class="answering" v-if="answeringTeam === 'left'">⏱️</div>
          </div>
          <div class="vs-badge">VS</div>
          <div class="question-card red-card">
            <div class="question-text">{{ currentQuestion.right }}</div>
            <div class="answering" v-if="answeringTeam === 'right'">⏱️</div>
          </div>
        </div>
      </div>

      <!-- Number Pad & Team Selection -->
      <div class="tug-controls">
        <div class="team-input blue-team">
          <div class="input-area">
            <input 
              v-model="blueAnswer" 
              type="text" 
              placeholder="Answer"
              @keyup.enter="submitBlueAnswer"
              :disabled="gameOver || answeringTeam === 'right'"
            >
            <button @click="submitBlueAnswer" :disabled="gameOver || answeringTeam === 'right'">SUBMIT</button>
          </div>
        </div>

        <div class="numberpad">
          <button 
            v-for="num in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]" 
            :key="num"
            @click="addNumber(num)"
            :disabled="gameOver"
            class="num-btn"
          >
            {{ num }}
          </button>
          <button @click="clearAnswer" :disabled="gameOver" class="clear-btn">CLEAR</button>
        </div>

        <div class="team-input red-team">
          <div class="input-area">
            <input 
              v-model="redAnswer" 
              type="text" 
              placeholder="Answer"
              @keyup.enter="submitRedAnswer"
              :disabled="gameOver || answeringTeam === 'left'"
            >
            <button @click="submitRedAnswer" :disabled="gameOver || answeringTeam === 'left'">SUBMIT</button>
          </div>
        </div>
      </div>

      <!-- Game Over Screen -->
      <div class="tug-game-over" v-if="gameOver">
        <div class="winner-display">
          <div v-if="winner === 'draw'" class="draw-text">🤝 IT'S A DRAW! 🤝</div>
          <div v-else class="winner-text">
            <span class="team-name" :class="winner + '-winner'">
              {{ winner === 'blue' ? 'TEAM BLUE' : 'TEAM RED' }}
            </span>
            WINS!
          </div>
          <div class="final-score">
            {{ scores.blue }} — {{ scores.red }}
          </div>
        </div>
        <button @click="restart" class="restart-btn">PLAY AGAIN</button>
      </div>

      <!-- Round Counter -->
      <div class="round-counter">ROUND {{ currentRound }} / {{ totalRounds }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const isOpen = ref(false)
const gameOver = ref(false)
const winner = ref(null)
const currentRound = ref(0)
const totalRounds = ref(5)

const scores = ref({ blue: 0, red: 0 })
const blueAnswer = ref('')
const redAnswer = ref('')
const answeringTeam = ref(null)

const mathQuestions = [
  { left: '7 × 8', right: '9 × 6', correct: { left: 56, right: 54 } },
  { left: '12 + 18', right: '5 × 7', correct: { left: 30, right: 35 } },
  { left: '100 ÷ 5', right: '9 + 11', correct: { left: 20, right: 20 } },
  { left: '6² + 4', right: '8 × 5', correct: { left: 40, right: 40 } },
  { left: '45 - 13', right: '16 + 16', correct: { left: 32, right: 32 } },
  { left: '3 × 9 - 2', right: '25 + 1', correct: { left: 25, right: 26 } },
  { left: '11 × 11', right: '12 × 10', correct: { left: 121, right: 120 } },
  { left: '50 + 50', right: '99 + 1', correct: { left: 100, right: 100 } },
  { left: '7³', right: '300 + 43', correct: { left: 343, right: 343 } },
  { left: '88 ÷ 8', right: '9 + 2', correct: { left: 11, right: 11 } },
]

const currentQuestion = ref({})

function getRandomQuestion() {
  return mathQuestions[Math.floor(Math.random() * mathQuestions.length)]
}

const ropePosition = computed(() => {
  const total = scores.value.blue + scores.value.red
  if (total === 0) return 50
  const bluePercent = (scores.value.blue / total) * 100
  return Math.max(20, Math.min(80, bluePercent))
})

function open() {
  isOpen.value = true
  nextTick(() => {
    startGame()
  })
}

function close() {
  isOpen.value = false
  resetGame()
}

function startGame() {
  scores.value = { blue: 0, red: 0 }
  currentRound.value = 1
  gameOver.value = false
  winner.value = null
  newRound()
}

function newRound() {
  currentQuestion.value = getRandomQuestion()
  blueAnswer.value = ''
  redAnswer.value = ''
  answeringTeam.value = null
}

function addNumber(num) {
  if (blueAnswer.value.length < 10) blueAnswer.value += num
  if (redAnswer.value.length < 10) redAnswer.value += num
}

function clearAnswer() {
  blueAnswer.value = ''
  redAnswer.value = ''
}

function submitBlueAnswer() {
  if (!blueAnswer.value || answeringTeam.value) return
  
  const answer = parseInt(blueAnswer.value)
  const correctAnswer = currentQuestion.value.correct.left

  if (answer === correctAnswer) {
    scores.value.blue++
    answeringTeam.value = 'left'
  }

  setTimeout(() => {
    if (currentRound.value < totalRounds.value) {
      currentRound.value++
      newRound()
    } else {
      endGame()
    }
  }, 800)
}

function submitRedAnswer() {
  if (!redAnswer.value || answeringTeam.value) return

  const answer = parseInt(redAnswer.value)
  const correctAnswer = currentQuestion.value.correct.right

  if (answer === correctAnswer) {
    scores.value.red++
    answeringTeam.value = 'right'
  }

  setTimeout(() => {
    if (currentRound.value < totalRounds.value) {
      currentRound.value++
      newRound()
    } else {
      endGame()
    }
  }, 800)
}

function endGame() {
  gameOver.value = true
  
  if (scores.value.blue > scores.value.red) {
    winner.value = 'blue'
  } else if (scores.value.red > scores.value.blue) {
    winner.value = 'red'
  } else {
    winner.value = 'draw'
  }
}

function restart() {
  startGame()
}

function resetGame() {
  gameOver.value = false
  winner.value = null
  currentRound.value = 0
  scores.value = { blue: 0, red: 0 }
  blueAnswer.value = ''
  redAnswer.value = ''
  answeringTeam.value = null
}

defineExpose({ open })
</script>

<style scoped>
.tug-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.tug-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  cursor: pointer;
}

.tug-modal {
  position: relative;
  z-index: 10001;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  border: 2px solid var(--orange);
  border-radius: 12px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 40px rgba(255, 107, 53, 0.3), 0 0 20px rgba(0, 212, 255, 0.2);
  padding: 30px;
}

.tug-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 2px solid var(--orange);
  padding-bottom: 15px;
}

.tug-header h2 {
  font-family: var(--orb);
  font-size: 24px;
  color: var(--orange);
  letter-spacing: 2px;
  margin: 0;
  text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
}

.close-btn {
  background: transparent;
  border: 2px solid var(--blue);
  color: var(--blue);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(0, 212, 255, 0.1);
  transform: rotate(90deg);
}

.tug-scores {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  gap: 20px;
}

.team-score {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.team-blue {
  color: var(--blue);
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.team-red {
  color: var(--red);
  text-shadow: 0 0 10px rgba(255, 42, 109, 0.5);
}

.team-score .label {
  font-family: var(--orb);
  font-size: 12px;
  letter-spacing: 1px;
  opacity: 0.8;
}

.team-score .score {
  font-family: var(--orb);
  font-size: 32px;
  font-weight: bold;
}

.tug-rope {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rope-container {
  position: relative;
  width: 100%;
  height: 60px;
  background: rgba(255, 107, 53, 0.1);
  border: 2px dashed var(--orange);
  border-radius: 8px;
  overflow: hidden;
}

.rope {
  position: absolute;
  top: 0;
  left: 50%;
  width: 8px;
  height: 100%;
  background: linear-gradient(90deg, var(--blue), var(--orange), var(--red));
  transform: translateX(-50%);
  box-shadow: 0 0 15px rgba(255, 107, 53, 0.6);
  transition: left 0.4s ease-out;
}

.flag {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  transition: left 0.4s ease-out;
}

.tug-game-area {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
  margin-bottom: 30px;
}

.questions {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 40px;
  width: 100%;
}

.question-card {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid;
  text-align: center;
  position: relative;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--orb);
  font-size: 28px;
  letter-spacing: 1px;
}

.blue-card {
  border-color: var(--blue);
  background: rgba(0, 212, 255, 0.08);
  color: var(--blue);
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.red-card {
  border-color: var(--red);
  background: rgba(255, 42, 109, 0.08);
  color: var(--red);
  text-shadow: 0 0 10px rgba(255, 42, 109, 0.5);
}

.vs-badge {
  font-family: var(--orb);
  font-size: 20px;
  color: var(--orange);
  font-weight: bold;
  letter-spacing: 2px;
}

.answering {
  margin-top: 5px;
  font-size: 20px;
  animation: pulse 0.6s ease-in-out;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.tug-controls {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
  align-items: center;
}

.team-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.team-input .input-area {
  display: flex;
  gap: 8px;
}

.team-input input {
  flex: 1;
  padding: 12px;
  border: 2px solid;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border-radius: 6px;
  font-family: var(--mono);
  font-size: 16px;
  text-align: center;
}

.team-input.blue-team input {
  border-color: var(--blue);
  color: var(--blue);
  text-shadow: 0 0 5px rgba(0, 212, 255, 0.5);
}

.team-input.blue-team input::placeholder {
  color: rgba(0, 212, 255, 0.3);
}

.team-input.red-team input {
  border-color: var(--red);
  color: var(--red);
  text-shadow: 0 0 5px rgba(255, 42, 109, 0.5);
}

.team-input.red-team input::placeholder {
  color: rgba(255, 42, 109, 0.3);
}

.team-input button {
  padding: 10px 16px;
  border: 2px solid;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-family: var(--orb);
  font-size: 12px;
  letter-spacing: 1px;
  transition: all 0.2s ease;
}

.team-input.blue-team button {
  border-color: var(--blue);
  color: var(--blue);
}

.team-input.blue-team button:hover:not(:disabled) {
  background: rgba(0, 212, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.team-input.red-team button {
  border-color: var(--red);
  color: var(--red);
}

.team-input.red-team button:hover:not(:disabled) {
  background: rgba(255, 42, 109, 0.2);
  box-shadow: 0 0 10px rgba(255, 42, 109, 0.5);
}

.team-input button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.numberpad {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.num-btn {
  padding: 12px;
  border: 2px solid var(--orange);
  background: rgba(255, 107, 53, 0.1);
  color: var(--orange);
  border-radius: 6px;
  cursor: pointer;
  font-family: var(--orb);
  font-size: 18px;
  font-weight: bold;
  transition: all 0.2s ease;
  text-shadow: 0 0 5px rgba(255, 107, 53, 0.3);
}

.num-btn:hover:not(:disabled) {
  background: rgba(255, 107, 53, 0.3);
  box-shadow: 0 0 15px rgba(255, 107, 53, 0.6);
  transform: scale(1.05);
}

.num-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.clear-btn {
  grid-column: 1 / -1;
  padding: 12px;
  border: 2px solid var(--red);
  background: rgba(255, 42, 109, 0.1);
  color: var(--red);
  border-radius: 6px;
  cursor: pointer;
  font-family: var(--orb);
  font-size: 16px;
  letter-spacing: 1px;
  transition: all 0.2s ease;
}

.clear-btn:hover:not(:disabled) {
  background: rgba(255, 42, 109, 0.3);
  box-shadow: 0 0 15px rgba(255, 42, 109, 0.6);
}

.clear-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.tug-game-over {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 40px 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  border: 2px solid var(--orange);
}

.winner-display {
  text-align: center;
}

.draw-text {
  font-family: var(--orb);
  font-size: 32px;
  color: var(--blue);
  letter-spacing: 2px;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

.winner-text {
  font-family: var(--orb);
  font-size: 28px;
  letter-spacing: 2px;
  text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
  line-height: 1.6;
}

.team-name {
  display: block;
  font-size: 36px;
  margin-bottom: 10px;
}

.blue-winner {
  color: var(--blue);
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
}

.red-winner {
  color: var(--red);
  text-shadow: 0 0 20px rgba(255, 42, 109, 0.8);
}

.winner-text {
  color: var(--orange);
}

.final-score {
  font-family: var(--mono);
  font-size: 32px;
  color: var(--orange);
  margin-top: 20px;
  letter-spacing: 4px;
  text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
}

.restart-btn {
  padding: 15px 40px;
  border: 2px solid var(--orange);
  background: rgba(255, 107, 53, 0.1);
  color: var(--orange);
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--orb);
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: bold;
  transition: all 0.3s ease;
  text-shadow: 0 0 5px rgba(255, 107, 53, 0.5);
}

.restart-btn:hover {
  background: rgba(255, 107, 53, 0.3);
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.8);
  transform: scale(1.05);
}

.round-counter {
  position: absolute;
  top: 20px;
  right: 20px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--blue);
  letter-spacing: 1px;
  opacity: 0.7;
}

@media (max-width: 1020px) {
  .tug-modal {
    padding: 20px;
  }

  .tug-controls {
    grid-template-columns: 1fr;
  }

  .questions {
    flex-direction: column;
    gap: 20px;
  }

  .numberpad {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 720px) {
  .tug-header h2 {
    font-size: 18px;
  }

  .tug-modal {
    width: 95%;
    padding: 15px;
  }

  .question-card {
    font-size: 20px;
  }

  .numberpad {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
