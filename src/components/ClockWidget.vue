<template>
  <div class="clock-wrap">
    <div class="clock-face">
      <div class="clock-inner">
        <div class="clock-digits">
          <span class="digit-group">{{ hours }}</span>
          <span class="clock-sep">:</span>
          <span class="digit-group">{{ minutes }}</span>
          <span class="clock-sep">:</span>
          <span class="digit-group">{{ seconds }}</span>
          <span class="ampm">{{ ampm }}</span>
        </div>
        <div class="clock-label">
          <span class="tz-icon">◉</span>
          {{ timezone }}
        </div>
        <div class="clock-date">{{ dateLabel }}</div>
      </div>
      <div class="clock-glow"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const hours   = ref('00')
const minutes = ref('00')
const seconds = ref('00')
const ampm    = ref('AM')
const timezone = ref('')
const dateLabel = ref('')

let timer = null

function pad(n) { return String(n).padStart(2, '0') }

function tick() {
  const now = new Date()
  let h = now.getHours()
  ampm.value = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  hours.value   = pad(h)
  minutes.value = pad(now.getMinutes())
  seconds.value = pad(now.getSeconds())
  dateLabel.value = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(now)
}

onMounted(() => {
  timezone.value = Intl.DateTimeFormat().resolvedOptions().timeZone.replace('_', ' ')
  tick()
  timer = setInterval(tick, 1000)
})

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.clock-wrap {
  perspective: 700px;
  margin-bottom: 14px;
  display: flex;
  justify-content: center;
  animation: fadeUp 0.7s ease 0.25s both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: none; }
}

.clock-face {
  position: relative;
  background: var(--bg);
  box-shadow:
    var(--neu-md),
    0 0 0 1px rgba(var(--primary-rgb), 0.08),
    inset 0 1px 0 rgba(255,255,255,0.06);
  border-radius: var(--r-md);
  padding: 14px 20px 10px;
  transform: rotateX(14deg) rotateY(-2deg);
  transform-style: preserve-3d;
  transition:
    transform 0.45s cubic-bezier(.22,1,.36,1),
    box-shadow 0.4s ease;
  cursor: default;
  overflow: hidden;
  width: 100%;
}

.clock-wrap:hover .clock-face {
  transform: rotateX(0deg) rotateY(0deg);
  box-shadow:
    var(--neu-in),
    0 0 22px rgba(var(--orange-rgb), 0.18);
}

.clock-inner {
  position: relative;
  z-index: 1;
}

.clock-digits {
  display: flex;
  align-items: baseline;
  gap: 2px;
  font-family: var(--orb);
  font-weight: 700;
  font-size: 1.55rem;
  color: var(--primary);
  letter-spacing: 0.05em;
  transition: color 0.4s ease, text-shadow 0.4s ease;
  line-height: 1;
}

.clock-wrap:hover .clock-digits {
  color: var(--orange);
  text-shadow: 0 0 14px rgba(var(--orange-rgb), 0.55);
}

.digit-group {
  display: inline-block;
  min-width: 2ch;
  text-align: center;
}

.clock-sep {
  font-family: var(--orb);
  font-weight: 700;
  color: var(--primary);
  opacity: 0.6;
  animation: sepBlink 1s step-start infinite;
  margin: 0 1px;
  transition: color 0.4s ease;
  align-self: center;
  font-size: 1.3rem;
  line-height: 1;
  position: relative;
  top: -1px;
}

.clock-wrap:hover .clock-sep {
  color: var(--orange);
}

@keyframes sepBlink {
  0%, 49% { opacity: 0.6; }
  50%, 100% { opacity: 0.1; }
}

.ampm {
  font-family: var(--orb);
  font-size: 0.58rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  margin-left: 4px;
  align-self: flex-start;
  padding-top: 3px;
  transition: color 0.4s ease;
}

.clock-wrap:hover .ampm {
  color: var(--orange);
}

.clock-label {
  font-family: var(--mono);
  font-size: 0.6rem;
  color: var(--text-muted);
  letter-spacing: 0.12em;
  text-align: center;
  margin-top: 7px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: color 0.4s ease;
}

.clock-wrap:hover .clock-label {
  color: var(--text-dim);
}

.clock-date {
  font-family: var(--mono);
  font-size: 0.58rem;
  color: var(--text-dim);
  letter-spacing: 0.08em;
  text-align: center;
  margin-top: 5px;
  text-transform: uppercase;
  transition: color 0.4s ease;
}

.clock-wrap:hover .clock-date {
  color: var(--orange);
}

.tz-icon {
  font-size: 0.5rem;
  color: var(--primary);
  transition: color 0.4s ease;
  animation: tzPulse 2s ease-in-out infinite;
}

.clock-wrap:hover .tz-icon {
  color: var(--orange);
}

@keyframes tzPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
}

.clock-glow {
  position: absolute;
  inset: 0;
  border-radius: var(--r-md);
  background: radial-gradient(
    ellipse at 50% 0%,
    rgba(var(--primary-rgb), 0.07) 0%,
    transparent 65%
  );
  pointer-events: none;
  transition: background 0.4s ease;
}

.clock-wrap:hover .clock-glow {
  background: radial-gradient(
    ellipse at 50% 0%,
    rgba(var(--orange-rgb), 0.12) 0%,
    transparent 65%
  );
}
</style>
