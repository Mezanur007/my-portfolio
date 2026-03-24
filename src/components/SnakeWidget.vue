<template>
  <canvas ref="canvas" class="snake-canvas" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)

// ── colours ──────────────────────────────────────────────
const COL_DORSAL  = '#2D4CC8'
const COL_DARK    = '#1a2f8a'
const COL_BELLY   = '#eaedf6'
const COL_TONGUE  = '#e07a3a'
const COL_PUPIL   = '#31344b'
const COL_HOLE_BG = '#1a1a2e'
const COL_HOLE_IN = '#0d0d17'
const COL_HOLE_RIM= '#44476a'

// ── snake constants ───────────────────────────────────────
const NUM_SEGMENTS  = 80
const SPEED         = 0.7     // px / frame
const MAX_TURN      = 0.04    // rad / frame
const HOLE_RADIUS   = 18      // px – segments inside this are skipped

// waypoints [vw%, vh%]
const WAYPOINTS_VH = [
  [15, 20],
  [75, 15],
  [80, 55],
  [55, 75],
  [20, 65],
]
const HOLE_VW = 12
const HOLE_VH = 85

// ── runtime state ─────────────────────────────────────────
let ctx        = null
let W = 0, H = 0
let animId     = null
let pauseTimer = null

let holeCenter  = { x: 0, y: 0 }
let waypoints   = []     // pixel coords, refreshed on resize

// snake: segments[0]=head, segments[N-1]=tail
let segments    = []
let headAngle   = 0

// roaming
let wpIndex     = 0
let goingToHole = false  // true after all waypoints done

// emerging
let emergingHeadX = 0
let emergingHeadY = 0
let emergingAngle = 0

const STATE = { ROAMING: 0, ENTERING: 1, PAUSED: 2, EMERGING: 3 }
let state = STATE.ROAMING

// ── helpers ───────────────────────────────────────────────
function vwpx(vw) { return (vw / 100) * W }
function vhpx(vh) { return (vh / 100) * H }

function recompute() {
  W = canvas.value.width  = window.innerWidth
  H = canvas.value.height = window.innerHeight
  holeCenter = { x: vwpx(HOLE_VW), y: vhpx(HOLE_VH) }
  waypoints  = WAYPOINTS_VH.map(([vw, vh]) => ({ x: vwpx(vw), y: vhpx(vh) }))
}

function dist2(a, b) {
  const dx = a.x - b.x, dy = a.y - b.y
  return dx * dx + dy * dy
}
function dist(a, b) { return Math.sqrt(dist2(a, b)) }

function angleTo(from, to) {
  return Math.atan2(to.y - from.y, to.x - from.x)
}

function angleWrap(a) {
  while (a >  Math.PI) a -= 2 * Math.PI
  while (a < -Math.PI) a += 2 * Math.PI
  return a
}

function segRadius(i) {
  // 9 at head → 11 at index 15 → 3 at tail
  if (i === 0) return 9
  if (i <= 15) return 9 + (11 - 9) * (i / 15)
  const t = (i - 15) / (NUM_SEGMENTS - 1 - 15)
  return 11 - (11 - 3) * t
}

// ── init ─────────────────────────────────────────────────
function initSnake() {
  const start = waypoints[0]
  segments = []
  for (let i = 0; i < NUM_SEGMENTS; i++) {
    segments.push({ x: start.x - i * 6, y: start.y })
  }
  headAngle   = 0
  wpIndex     = 0
  goingToHole = false
  state       = STATE.ROAMING
}

// ── drawing ───────────────────────────────────────────────
function drawHoleBody() {
  const { x, y } = holeCenter

  // ambient glow
  const grd = ctx.createRadialGradient(x, y, 8, x, y, 40)
  grd.addColorStop(0, 'rgba(45,76,200,0.25)')
  grd.addColorStop(1, 'rgba(45,76,200,0)')
  ctx.beginPath()
  ctx.ellipse(x, y, 42, 20, 0, 0, Math.PI * 2)
  ctx.fillStyle = grd
  ctx.fill()

  // outer rim
  ctx.beginPath()
  ctx.ellipse(x, y, 22, 10, 0, 0, Math.PI * 2)
  ctx.fillStyle   = COL_HOLE_BG
  ctx.strokeStyle = COL_HOLE_RIM
  ctx.lineWidth   = 1.5
  ctx.fill()
  ctx.stroke()

  // inner depth
  ctx.beginPath()
  ctx.ellipse(x, y, 16, 7, 0, 0, Math.PI * 2)
  ctx.fillStyle = COL_HOLE_IN
  ctx.fill()
}

function drawHoleRim() {
  const { x, y } = holeCenter
  ctx.beginPath()
  ctx.ellipse(x, y, 22, 10, 0, 0, Math.PI * 2)
  ctx.fillStyle   = COL_HOLE_BG
  ctx.strokeStyle = COL_HOLE_RIM
  ctx.lineWidth   = 1.5
  ctx.fill()
  ctx.stroke()
  ctx.beginPath()
  ctx.ellipse(x, y, 16, 7, 0, 0, Math.PI * 2)
  ctx.fillStyle = COL_HOLE_IN
  ctx.fill()
}

function drawSegment(seg, i) {
  if (dist(seg, holeCenter) < HOLE_RADIUS) return

  const r = segRadius(i)
  let ang
  if (i < segments.length - 1) {
    ang = angleTo(segments[i + 1], seg)
  } else {
    ang = headAngle
  }

  ctx.save()
  ctx.translate(seg.x, seg.y)
  ctx.rotate(ang)

  // belly – slightly wider, thinner
  ctx.beginPath()
  ctx.ellipse(0, 0, r * 1.05, r * 0.55, 0, 0, Math.PI * 2)
  ctx.fillStyle = COL_BELLY
  ctx.fill()

  // dorsal – covers upper half
  ctx.beginPath()
  ctx.ellipse(0, 0, r, r * 0.82, 0, 0, Math.PI * 2)
  ctx.fillStyle = COL_DORSAL
  ctx.fill()

  // spine
  ctx.beginPath()
  ctx.moveTo(-r * 0.85, 0)
  ctx.lineTo( r * 0.85, 0)
  ctx.strokeStyle = COL_DARK
  ctx.lineWidth   = 0.7
  ctx.stroke()

  // scale mark every 5 segments
  if (i % 5 === 0 && i > 0) {
    ctx.beginPath()
    ctx.arc(0, 0, r * 0.7, -0.45, 0.45)
    ctx.strokeStyle = 'rgba(26,47,138,0.4)'
    ctx.lineWidth   = 1
    ctx.stroke()
  }

  ctx.restore()
}

function drawHead() {
  if (segments.length === 0) return
  const head = segments[0]
  if (dist(head, holeCenter) < HOLE_RADIUS) return

  ctx.save()
  ctx.translate(head.x, head.y)
  ctx.rotate(headAngle)

  // head base
  ctx.beginPath()
  ctx.arc(0, 0, 9, 0, Math.PI * 2)
  ctx.fillStyle = COL_DORSAL
  ctx.fill()

  // slight snout elongation
  ctx.beginPath()
  ctx.ellipse(5, 0, 7, 6.5, 0, 0, Math.PI * 2)
  ctx.fillStyle = COL_DORSAL
  ctx.fill()

  // eyes
  ;[{ ex: 5, ey: -4 }, { ex: 5, ey: 4 }].forEach(({ ex, ey }) => {
    ctx.beginPath()
    ctx.arc(ex, ey, 2.6, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(ex, ey, 0.8, 2.0, 0, 0, Math.PI * 2)
    ctx.fillStyle = COL_PUPIL
    ctx.fill()
  })

  // forked tongue – only while roaming
  if (state === STATE.ROAMING) {
    ctx.strokeStyle = COL_TONGUE
    ctx.lineWidth   = 1.1
    ctx.lineCap     = 'round'
    ctx.beginPath()
    ctx.moveTo(10, 0)
    ctx.lineTo(15, 0)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(15, 0)
    ctx.lineTo(19, -3)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(15, 0)
    ctx.lineTo(19,  3)
    ctx.stroke()
  }

  ctx.restore()
}

function render() {
  ctx.clearRect(0, 0, W, H)
  drawHoleBody()
  // tail→head so head is on top
  for (let i = segments.length - 1; i >= 1; i--) {
    drawSegment(segments[i], i)
  }
  drawHead()
  drawHoleRim()
}

// ── movement helpers ──────────────────────────────────────
function steerToward(target) {
  const desired = angleTo(segments[0], target)
  let delta     = angleWrap(desired - headAngle)
  delta = Math.max(-MAX_TURN, Math.min(MAX_TURN, delta))
  headAngle = angleWrap(headAngle + delta)
}

function advanceHead() {
  segments.unshift({
    x: segments[0].x + Math.cos(headAngle) * SPEED,
    y: segments[0].y + Math.sin(headAngle) * SPEED,
  })
  segments.pop()
}

// ── state machine ─────────────────────────────────────────
function update() {
  if (state === STATE.ROAMING) {
    if (goingToHole) {
      steerToward(holeCenter)
      advanceHead()
      if (dist(segments[0], holeCenter) < 20) {
        state = STATE.ENTERING
      }
    } else {
      const target = waypoints[wpIndex]
      steerToward(target)
      advanceHead()
      if (dist(segments[0], target) < 18) {
        wpIndex++
        if (wpIndex >= waypoints.length) {
          goingToHole = true
        }
      }
    }
  }

  else if (state === STATE.ENTERING) {
    // steer into hole, hold head once close
    if (dist(segments[0], holeCenter) >= 8) {
      steerToward(holeCenter)
      advanceHead()
    }
    // trim tail each frame for sink effect
    if (segments.length > 0) {
      segments.pop()
    }
    if (segments.length === 0) {
      state = STATE.PAUSED
      // pick a random exit direction
      emergingAngle = Math.random() * Math.PI * 2
      headAngle     = emergingAngle
      emergingHeadX = holeCenter.x
      emergingHeadY = holeCenter.y
      pauseTimer = setTimeout(() => {
        state = STATE.EMERGING
      }, 2500)
    }
  }

  else if (state === STATE.PAUSED) {
    // waiting – nothing to do
  }

  else if (state === STATE.EMERGING) {
    // advance emerging head outward one step
    emergingHeadX += Math.cos(emergingAngle) * SPEED
    emergingHeadY += Math.sin(emergingAngle) * SPEED
    headAngle = emergingAngle

    // prepend new segment (don't pop – array grows)
    segments.unshift({ x: emergingHeadX, y: emergingHeadY })

    if (segments.length >= NUM_SEGMENTS) {
      // fully emerged – resume roaming
      wpIndex     = 0
      goingToHole = false
      state       = STATE.ROAMING
    }
  }
}

// ── main loop ─────────────────────────────────────────────
function loop() {
  update()
  render()
  animId = requestAnimationFrame(loop)
}

// ── lifecycle ─────────────────────────────────────────────
let onResize = null

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  recompute()
  initSnake()
  loop()

  onResize = () => recompute()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  if (animId)     cancelAnimationFrame(animId)
  if (pauseTimer) clearTimeout(pauseTimer)
  if (onResize)   window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.snake-canvas {
  position: fixed;
  inset: 0;
  z-index: 150;
  pointer-events: none;
}
</style>
