<template>
  <div class="dragon-wrap" :style="dragonStyle">
    <svg
      width="220"
      height="110"
      viewBox="0 0 220 110"
      xmlns="http://www.w3.org/2000/svg"
      class="dragon-svg"
    >
      <!-- Tail (long swept serpentine) -->
      <path d="M210 58 Q200 80 190 72 Q185 64 195 60 Q180 55 170 62 Q165 72 155 68 Q150 60 160 55Z" fill="#111" />
      <!-- Tail continuation -->
      <path d="M160 56 Q148 66 140 60 Q136 52 145 50Z" fill="#111" />

      <!-- Body (long elliptical) -->
      <ellipse cx="100" cy="60" rx="65" ry="26" fill="#111" />
      <!-- Belly highlight -->
      <ellipse cx="100" cy="65" rx="52" ry="16" fill="#e0e0e0" opacity="0.18" />
      <path d="M50 70 Q100 82 150 70" stroke="#e0e0e0" stroke-width="1.8" fill="none" opacity="0.35" />

      <!-- Segmented neck -->
      <ellipse cx="46" cy="50" rx="18" ry="14" fill="#111" />
      <ellipse cx="34" cy="44" rx="13" ry="11" fill="#111" />

      <!-- Dorsal spines -->
      <polygon points="75,34 79,20 83,34" fill="#ffffff" opacity="0.9" />
      <polygon points="95,31 99,16 103,31" fill="#ffffff" opacity="0.9" />
      <polygon points="115,32 119,18 123,32" fill="#ffffff" opacity="0.9" />
      <polygon points="135,35 138,23 142,35" fill="#ffffff" opacity="0.8" />
      <polygon points="152,39 155,28 158,39" fill="#ffffff" opacity="0.7" />

      <!-- Large bat wing (top) -->
      <path class="wing-top" d="M90 42 Q60 4 30 10 Q20 8 10 18 Q28 22 50 34 Q66 38 82 42Z" fill="#222" />
      <!-- Wing veins top -->
      <path d="M82 42 Q60 16 30 10" stroke="#ffffff" stroke-width="0.8" fill="none" opacity="0.45" />
      <path d="M76 42 Q55 20 20 18" stroke="#ffffff" stroke-width="0.6" fill="none" opacity="0.3" />
      <path d="M70 42 Q52 24 35 22" stroke="#ffffff" stroke-width="0.5" fill="none" opacity="0.25" />

      <!-- Large bat wing (bottom) -->
      <path class="wing-bot" d="M90 62 Q60 100 30 94 Q20 96 10 86 Q28 82 50 70 Q66 66 82 62Z" fill="#222" />
      <!-- Wing veins bottom -->
      <path d="M82 62 Q60 88 30 94" stroke="#ffffff" stroke-width="0.8" fill="none" opacity="0.45" />
      <path d="M76 62 Q55 84 20 86" stroke="#ffffff" stroke-width="0.6" fill="none" opacity="0.3" />
      <path d="M70 62 Q52 80 35 82" stroke="#ffffff" stroke-width="0.5" fill="none" opacity="0.25" />

      <!-- Clawed legs -->
      <path d="M75 82 Q73 96 68 100 M73 96 Q78 102 80 104 M73 96 Q66 100 64 104" stroke="#e0e0e0" stroke-width="1.5" fill="none" stroke-linecap="round" />
      <path d="M105 84 Q103 98 98 102 M103 98 Q108 104 110 106 M103 98 Q96 102 94 106" stroke="#e0e0e0" stroke-width="1.5" fill="none" stroke-linecap="round" />

      <!-- Head -->
      <ellipse cx="20" cy="52" rx="16" ry="12" fill="#111" />
      <!-- Snout -->
      <ellipse cx="8" cy="55" rx="9" ry="7" fill="#1a1a1a" />
      <!-- Nostril -->
      <circle cx="4" cy="56" r="1.5" fill="#333" />

      <!-- Horns -->
      <polygon points="24,38 28,22 32,38" fill="#ffffff" opacity="0.95" />
      <polygon points="18,36 20,24 24,37" fill="#ffffff" opacity="0.8" />

      <!-- Eye -->
      <circle cx="18" cy="46" r="5" fill="#ffffff" />
      <!-- Slit pupil -->
      <ellipse cx="17" cy="46" rx="1.5" ry="4" fill="#000000" />
      <!-- Eye shine -->
      <circle cx="15.5" cy="44.5" r="1" fill="#ffffff" opacity="0.7" />

      <!-- Crystal blue flame (conditional) -->
      <g v-if="showFlame" class="flame-group">
        <!-- Outer flame -->
        <path class="flame-outer" d="M-2 55 Q-14 44 -8 36 Q-4 28 0 36 Q4 26 8 34 Q12 24 14 34 Q18 26 16 40 Q14 48 8 55Z" fill="#00E5FF" opacity="0.85" />
        <!-- Mid flame -->
        <path class="flame-mid" d="M0 55 Q-8 46 -4 40 Q0 34 2 40 Q6 32 8 40 Q10 34 12 42 Q10 50 6 55Z" fill="#40F0FF" opacity="0.9" />
        <!-- Core flame -->
        <path class="flame-core" d="M2 55 Q-2 48 0 44 Q2 40 4 44 Q6 40 8 46 Q7 52 4 55Z" fill="#B0F8FF" opacity="0.95" />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const x = ref(10)
const y = ref(15)
const facingLeft = ref(false)
const showFlame = ref(false)

// Waypoints: [vw%, vh%] across viewport
const waypoints = [
  [10, 15],
  [70, 10],
  [80, 60],
  [20, 70],
  [50, 30],
  [10, 15],
]

let animFrame = null
let waypointIndex = 0
let progress = 0
const SPEED = 0.00024 // −70% of original 0.0008

let lastTime = null
let flameInterval = null

function lerp(a, b, t) {
  return a + (b - a) * t
}

function animate(now) {
  if (!lastTime) lastTime = now
  const dt = now - lastTime
  lastTime = now

  progress += SPEED * dt

  if (progress >= 1) {
    progress = 0
    waypointIndex = (waypointIndex + 1) % (waypoints.length - 1)
  }

  const from = waypoints[waypointIndex]
  const to = waypoints[waypointIndex + 1]

  const newX = lerp(from[0], to[0], progress)
  const newY = lerp(from[1], to[1], progress)

  facingLeft.value = to[0] < from[0]

  x.value = newX
  y.value = newY

  animFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  animFrame = requestAnimationFrame(animate)

  flameInterval = setInterval(() => {
    showFlame.value = true
    setTimeout(() => {
      showFlame.value = false
    }, 1200)
  }, 3000)
})

onUnmounted(() => {
  if (animFrame) cancelAnimationFrame(animFrame)
  if (flameInterval) clearInterval(flameInterval)
})

const dragonStyle = computed(() => ({
  left: x.value + 'vw',
  top: y.value + 'vh',
  transform: facingLeft.value ? 'scaleX(-1)' : 'scaleX(1)',
}))
</script>

<style scoped>
.dragon-wrap {
  position: fixed;
  z-index: 150;
  pointer-events: none;
  will-change: left, top;
  transition: transform 0.3s ease;
}

.dragon-svg {
  filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.65));
  animation: bodyFloat 1.8s ease-in-out infinite alternate;
}

.wing-top {
  transform-origin: 82px 42px;
  animation: flapTop 1.2s ease-in-out infinite alternate;
}

.wing-bot {
  transform-origin: 82px 62px;
  animation: flapBot 1.2s ease-in-out infinite alternate;
}

.flame-group {
  filter: drop-shadow(0 0 10px #00E5FF);
}

.flame-outer {
  animation: flameFlicker 0.18s ease-in-out infinite alternate;
}

.flame-mid {
  animation: flameFlicker 0.22s ease-in-out infinite alternate-reverse;
}

.flame-core {
  animation: flameFlicker 0.15s ease-in-out infinite alternate;
}

@keyframes bodyFloat {
  from { transform: translateY(0px); }
  to   { transform: translateY(-4px); }
}

@keyframes flapTop {
  from { transform: rotate(0deg) scaleY(1); }
  to   { transform: rotate(-20deg) scaleY(0.82); }
}

@keyframes flapBot {
  from { transform: rotate(0deg) scaleY(1); }
  to   { transform: rotate(20deg) scaleY(0.82); }
}

@keyframes flameFlicker {
  from {
    opacity: 0.7;
    transform: scaleX(1) scaleY(1);
  }
  to {
    opacity: 1;
    transform: scaleX(1.12) scaleY(0.94);
  }
}
</style>
