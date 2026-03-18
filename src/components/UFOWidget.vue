<template>
  <canvas ref="canvas" class="ufo-canvas" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)

// ── Constants ─────────────────────────────────────────────────────────────────
const NUM_UFOS         = 2
const MAX_TURN         = 0.055   // rad/frame
const BASE_SPEED       = 2.0     // px/frame
const CHASE_BOOST      = 0.6     // extra px/frame when far
const FLEE_SPEED       = 2.2     // red UFO flee speed
const BOLT_SPEED       = 8       // px/frame
const BOLT_LIFE        = 45      // frames
const FIRE_RANGE       = 280     // px
const HIT_RADIUS_BASE  = 20      // px * scale
const SHOOT_COOLDOWN   = 90      // + rand(50) frames
const HIT_FLASH_DUR    = 30      // frames
const FIRING_FLASH_DUR = 8       // frames

// ── Arena (right-middle of viewport) ──────────────────────────────────────────
// Computed each frame from W/H
function arena() {
  return {
    x1: W * 0.54,
    x2: W * 0.98,
    y1: H * 0.18,
    y2: H * 0.82,
  }
}

function zoneContain(u) {
  const margin = 40 * u.scale
  const a = arena()
  const x1 = a.x1 + margin, x2 = a.x2 - margin
  const y1 = a.y1 + margin, y2 = a.y2 - margin
  if (u.x < x1) { u.x = x1; u.angle = angleWrap(Math.PI - u.angle) }
  if (u.x > x2) { u.x = x2; u.angle = angleWrap(Math.PI - u.angle) }
  if (u.y < y1) { u.y = y1; u.angle = angleWrap(-u.angle) }
  if (u.y > y2) { u.y = y2; u.angle = angleWrap(-u.angle) }
}

// ── Palettes ──────────────────────────────────────────────────────────────────
const PALETTE_BLUE = {
  bodyTop:   '#3a5ce0',
  rim:       '#1a2f8a',
  domeEdge:  '#2D4CC8',
  shadow:    'rgba(26,47,138,0.18)',
  lightOff:  '#1a2f8a',
}
const PALETTE_RED = {
  bodyTop:   '#e03a3a',
  rim:       '#8a1a1a',
  domeEdge:  '#C82D2D',
  shadow:    'rgba(138,26,26,0.18)',
  lightOff:  '#8a1a1a',
}
const C_DOME     = '#eaedf6'
const C_LIGHT_ON = '#ffe066'
const C_HIT      = '#e07a3a'

let ctx = null
let W = 0, H = 0
let animId = null
let ufos = []
let projectiles = []
let explosions = []

// ── Helpers ───────────────────────────────────────────────────────────────────
function angleWrap(a) {
  while (a >  Math.PI) a -= Math.PI * 2
  while (a < -Math.PI) a += Math.PI * 2
  return a
}

function dist(a, b) {
  const dx = a.x - b.x, dy = a.y - b.y
  return Math.sqrt(dx * dx + dy * dy)
}

function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v }

// ── Init ──────────────────────────────────────────────────────────────────────
function resize() {
  W = canvas.value.width  = window.innerWidth
  H = canvas.value.height = window.innerHeight
}

function initUFOs() {
  const a = arena()
  const zx = (a.x1 + a.x2) / 2
  const zy = (a.y1 + a.y2) / 2
  const spread = Math.min(a.x2 - a.x1, a.y2 - a.y1) * 0.25

  const blue = {
    x: zx - spread,
    y: zy + (Math.random() - 0.5) * spread,
    angle:       Math.random() * Math.PI * 2,
    speed:       BASE_SPEED,
    scale:       0.9,
    wobble:      Math.random() * Math.PI * 2,
    wobbleSpeed: 0.02,
    lightPhase:  Math.random() * Math.PI * 2,
    lightSpeed:  0.07,
    palette:     PALETTE_BLUE,
    shootCooldown: 40,
    hitFlash:    0,
    firingFlash: 0,
    visualTilt:  0,
  }

  const red = {
    x: zx + spread,
    y: zy + (Math.random() - 0.5) * spread,
    angle:       Math.random() * Math.PI * 2,
    speed:       FLEE_SPEED,
    scale:       0.85,
    wobble:      Math.random() * Math.PI * 2,
    wobbleSpeed: 0.022,
    lightPhase:  Math.random() * Math.PI * 2,
    lightSpeed:  0.065,
    palette:     PALETTE_RED,
    shootCooldown: 0,
    hitFlash:    0,
    firingFlash: 0,
    visualTilt:  0,
  }

  ufos = [blue, red]
}

// ── Update ────────────────────────────────────────────────────────────────────
function updateUFOs() {
  const blue = ufos[0]
  const red  = ufos[1]

  // ── Blue: chase + shoot ──────────────────────────────────────────────────
  const chaseDesired = Math.atan2(red.y - blue.y, red.x - blue.x)
  const chaseDelta   = clamp(angleWrap(chaseDesired - blue.angle), -MAX_TURN, MAX_TURN)
  blue.angle += chaseDelta
  blue.speed  = BASE_SPEED + (dist(blue, red) > 300 ? CHASE_BOOST : 0)
  blue.x     += Math.cos(blue.angle) * blue.speed
  blue.y     += Math.sin(blue.angle) * blue.speed

  const chaseTilt = clamp(chaseDelta * 7, -0.45, 0.45)
  blue.visualTilt += (chaseTilt - blue.visualTilt) * 0.12

  if (blue.shootCooldown > 0) blue.shootCooldown--
  if (blue.hitFlash      > 0) blue.hitFlash--
  if (blue.firingFlash   > 0) blue.firingFlash--

  if (dist(blue, red) < FIRE_RANGE && blue.shootCooldown === 0) {
    const ang = Math.atan2(red.y - blue.y, red.x - blue.x)
    projectiles.push({
      x: blue.x, y: blue.y,
      vx: Math.cos(ang) * BOLT_SPEED,
      vy: Math.sin(ang) * BOLT_SPEED,
      fromIdx: 0,
      life: BOLT_LIFE,
      maxLife: BOLT_LIFE,
    })
    blue.firingFlash   = FIRING_FLASH_DUR
    blue.shootCooldown = SHOOT_COOLDOWN + Math.floor(Math.random() * 50)
  }

  // ── Red: flee from blue ──────────────────────────────────────────────────
  const fleeDesired = Math.atan2(blue.y - red.y, blue.x - red.x) + Math.PI  // opposite direction
  const fleeDelta   = clamp(angleWrap(fleeDesired - red.angle), -MAX_TURN * 0.9, MAX_TURN * 0.9)
  red.angle += fleeDelta
  red.x     += Math.cos(red.angle) * FLEE_SPEED
  red.y     += Math.sin(red.angle) * FLEE_SPEED

  const fleeTilt = clamp(fleeDelta * 7, -0.45, 0.45)
  red.visualTilt += (fleeTilt - red.visualTilt) * 0.12

  if (red.hitFlash    > 0) red.hitFlash--
  if (red.firingFlash > 0) red.firingFlash--

  // ── Shared: phase updates + zone bounce ──────────────────────────────────
  for (const u of ufos) {
    u.wobble     += u.wobbleSpeed
    u.lightPhase += u.lightSpeed
    zoneContain(u)
  }
}

function updateProjectiles() {
  for (let p = projectiles.length - 1; p >= 0; p--) {
    const bolt = projectiles[p]
    bolt.x += bolt.vx
    bolt.y += bolt.vy
    bolt.life--

    const a = arena()
    if (bolt.life <= 0 || bolt.x < a.x1 || bolt.x > a.x2 || bolt.y < a.y1 || bolt.y > a.y2) {
      projectiles.splice(p, 1); continue
    }

    // only blue (idx 0) shoots, so only check red (idx 1) for hits
    const target = ufos[1]
    if (dist(bolt, target) < HIT_RADIUS_BASE * target.scale) {
      explosions.push({ x: bolt.x, y: bolt.y, age: 0, maxAge: 28, maxR: 18 + Math.random() * 12 })
      target.hitFlash = HIT_FLASH_DUR
      projectiles.splice(p, 1)
    }
  }
}

function updateExplosions() {
  for (let e = explosions.length - 1; e >= 0; e--) {
    explosions[e].age++
    if (explosions[e].age >= explosions[e].maxAge) explosions.splice(e, 1)
  }
}

// ── Draw ──────────────────────────────────────────────────────────────────────
function drawExplosion(e) {
  const t  = e.age / e.maxAge          // 0 → 1
  const r  = t * e.maxR
  const ia = 1 - t

  // ring
  ctx.beginPath()
  ctx.arc(e.x, e.y, r, 0, Math.PI * 2)
  ctx.strokeStyle = `rgba(255,${Math.floor(200 * (1 - t))},50,${ia * 0.9})`
  ctx.lineWidth = 2.5
  ctx.stroke()

  // inner fill
  ctx.beginPath()
  ctx.arc(e.x, e.y, r * 0.55, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(255,220,100,${ia * 0.55})`
  ctx.fill()

  // sparkle lines
  const numSparks = 6
  for (let i = 0; i < numSparks; i++) {
    const ang = (i / numSparks) * Math.PI * 2
    const r1  = r * 0.5
    const r2  = r * 1.1
    ctx.beginPath()
    ctx.moveTo(e.x + Math.cos(ang) * r1, e.y + Math.sin(ang) * r1)
    ctx.lineTo(e.x + Math.cos(ang) * r2, e.y + Math.sin(ang) * r2)
    ctx.strokeStyle = `rgba(255,180,60,${ia * 0.7})`
    ctx.lineWidth = 1.5
    ctx.stroke()
  }
}

function drawProjectile(bolt) {
  const len   = 14
  const speed = Math.sqrt(bolt.vx * bolt.vx + bolt.vy * bolt.vy)
  const nx    = bolt.vx / speed
  const ny    = bolt.vy / speed

  // glow pass
  ctx.beginPath()
  ctx.moveTo(bolt.x - nx * (len / 2), bolt.y - ny * (len / 2))
  ctx.lineTo(bolt.x + nx * (len / 2), bolt.y + ny * (len / 2))
  ctx.strokeStyle = 'rgba(255,160,40,0.25)'
  ctx.lineWidth   = 6
  ctx.stroke()

  // core
  ctx.beginPath()
  ctx.moveTo(bolt.x - nx * (len / 2), bolt.y - ny * (len / 2))
  ctx.lineTo(bolt.x + nx * (len / 2), bolt.y + ny * (len / 2))
  ctx.strokeStyle = 'rgba(255,230,120,0.85)'
  ctx.lineWidth   = 2
  ctx.stroke()
}

function drawUFO(u) {
  const s  = u.scale
  const rw = 38 * s
  const rh = 10 * s
  const p  = u.palette

  ctx.save()
  ctx.translate(u.x, u.y + Math.sin(u.wobble) * 4 * s)
  ctx.rotate(u.visualTilt)

  // drop shadow
  ctx.beginPath()
  ctx.ellipse(0, rh + 14 * s, rw * 0.7, 5 * s, 0, 0, Math.PI * 2)
  ctx.fillStyle = p.shadow
  ctx.fill()

  // saucer body
  const bodyGrad = ctx.createLinearGradient(0, -rh, 0, rh)
  bodyGrad.addColorStop(0, p.bodyTop)
  bodyGrad.addColorStop(1, p.rim)
  ctx.beginPath()
  ctx.ellipse(0, 0, rw, rh, 0, 0, Math.PI * 2)
  ctx.fillStyle = bodyGrad
  ctx.fill()

  // rim
  ctx.beginPath()
  ctx.ellipse(0, 0, rw, rh, 0, 0, Math.PI * 2)
  ctx.strokeStyle = p.rim
  ctx.lineWidth   = 1.2 * s
  ctx.stroke()

  // rim lights
  const numLights = 7
  const isFiring  = u.firingFlash > 0
  for (let i = 0; i < numLights; i++) {
    const t  = (i / numLights) * Math.PI * 2
    const lx = Math.cos(t) * rw * 0.72
    const ly = Math.sin(t) * rh * 0.6
    const on = Math.sin(u.lightPhase + i * 0.9) > 0
    ctx.beginPath()
    ctx.arc(lx, ly, 2.2 * s, 0, Math.PI * 2)
    ctx.fillStyle = isFiring ? C_HIT : (on ? C_LIGHT_ON : p.lightOff)
    ctx.fill()
  }

  // dome
  const domeRw = rw * 0.48
  const domeRh = rh * 2.6
  ctx.beginPath()
  ctx.ellipse(0, -rh * 0.2, domeRw, domeRh, 0, Math.PI, Math.PI * 2)
  ctx.fillStyle = C_DOME
  ctx.fill()
  ctx.strokeStyle = p.domeEdge
  ctx.lineWidth   = 1 * s
  ctx.stroke()

  // dome glare
  ctx.beginPath()
  ctx.ellipse(-domeRw * 0.28, -rh * 1.5, domeRw * 0.22, domeRh * 0.18, -0.4, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  ctx.fill()

  // hit flash overlay
  if (u.hitFlash > 0) {
    ctx.globalAlpha = (u.hitFlash / HIT_FLASH_DUR) * 0.55
    ctx.fillStyle   = C_HIT
    ctx.beginPath()
    ctx.ellipse(0, 0, rw, rh, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
  }

  ctx.restore()
}

function render() {
  ctx.clearRect(0, 0, W, H)
  for (const e of explosions)   drawExplosion(e)
  for (const b of projectiles)  drawProjectile(b)
  for (const u of ufos)         drawUFO(u)
}

// ── Loop ──────────────────────────────────────────────────────────────────────
function loop() {
  updateUFOs()
  updateProjectiles()
  updateExplosions()
  render()
  animId = requestAnimationFrame(loop)
}

let onResize = null

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resize()
  initUFOs()
  loop()
  onResize = () => resize()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  if (animId)   cancelAnimationFrame(animId)
  if (onResize) window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.ufo-canvas {
  position: fixed;
  inset: 0;
  z-index: 150;
  pointer-events: none;
}
</style>
