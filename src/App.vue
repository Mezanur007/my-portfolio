<template>
  <div>
    <div id="cur"></div>
    <div id="cur-ring"></div>
    <canvas id="bgCanvas"></canvas>
    <div class="scan"></div>
    <GameModal ref="gameModal" />
    <NavBar @open-game="gameModal.open()" />
    <HeroSection />
    <PlayZone @open-game="gameModal.open()" />
    <ProfileSection />
    <CapabilitiesSection />
    <ExperienceSection />
    <ProductsSection />
    <ServicesSection />
    <ContactSection />
    <AppFooter />
    <ChatWidget />
    <UFOWidget />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLanguage } from './composables/useLanguage'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import PlayZone from './components/PlayZone.vue'
import ProfileSection from './components/ProfileSection.vue'
import CapabilitiesSection from './components/CapabilitiesSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProductsSection from './components/ProductsSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'
import GameModal from './components/GameModal.vue'
import ChatWidget from './chat/ChatWidget.vue'
import UFOWidget from './components/UFOWidget.vue'

const gameModal = ref(null)
const { language, setLanguage } = useLanguage()

onMounted(() => {
  // Initialize language on first load
  const saved = localStorage.getItem('language') || 'en'
  setLanguage(saved)
  
  // Custom cursor
  const cur = document.getElementById('cur')
  const ring = document.getElementById('cur-ring')
  let mx = 0, my = 0, rx = 0, ry = 0
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY
    cur.style.left = mx + 'px'; cur.style.top = my + 'px'
  })
  ;(function loop() {
    rx += (mx - rx) * .11; ry += (my - ry) * .11
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
    requestAnimationFrame(loop)
  })()
  document.querySelectorAll('a,button,.cell,.play-btn,.mode-btn,.g-btn,.gm-close,.chat-fab,.chat-send').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.style.width = '18px'; cur.style.height = '18px'; ring.style.width = '48px'; ring.style.height = '48px' })
    el.addEventListener('mouseleave', () => { cur.style.width = '8px'; cur.style.height = '8px'; ring.style.width = '32px'; ring.style.height = '32px' })
  })

  // Canvas particles
  const cv = document.getElementById('bgCanvas')
  const ctx2 = cv.getContext('2d')
  let W, H
  const pts = []
  function resize() { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight }
  resize(); window.addEventListener('resize', resize)
  for (let i = 0; i < 90; i++) pts.push({ x: Math.random() * 1800, y: Math.random() * 1200, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, r: Math.random() * 1.4 + .3, a: Math.random() * .6 + .1 })
  ;(function frame() {
    ctx2.clearRect(0, 0, W, H)
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy
      if (p.x < -5) p.x = W + 5; if (p.x > W + 5) p.x = -5
      if (p.y < -5) p.y = H + 5; if (p.y > H + 5) p.y = -5
      ctx2.beginPath(); ctx2.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx2.fillStyle = `rgba(45,76,200,${p.a * .12})`; ctx2.fill()
    })
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy)
      if (d < 130) { ctx2.beginPath(); ctx2.moveTo(pts[i].x, pts[i].y); ctx2.lineTo(pts[j].x, pts[j].y); ctx2.strokeStyle = `rgba(45,76,200,${(1 - d / 130) * .04})`; ctx2.lineWidth = .5; ctx2.stroke() }
    }
    requestAnimationFrame(frame)
  })()

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const parent = e.target.closest('.cap-grid,.svc-grid,.prod-grid,.mlog')
        const delay = parent ? Array.from(parent.children).indexOf(e.target) * 65 : 0
        setTimeout(() => e.target.classList.add('on'), delay)
      }
    })
  }, { threshold: .08 })
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el))

  // Skill bars
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.sb-fill').forEach(b => { b.style.width = b.dataset.w + '%' })
        barObs.unobserve(e.target)
      }
    })
  }, { threshold: .3 })
  const panel = document.querySelector('.hud-card')
  if (panel) barObs.observe(panel)
})
</script>
