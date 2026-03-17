<template>
  <section id="hero">
    <div class="hero-grid"></div>
    <div class="hero-glow-r"></div>
    <div class="hero-glow-l"></div>
    <div class="hero-layout inner">
      <div class="hero-content">
        <div class="h-tag">
          <span class="dot"></span><span class="sep"></span>
          <span>CO-FOUNDER &amp; CTO</span><span class="sep"></span>
          <span>BI TECHNOLOGY</span>
        </div>
        <div class="name-wrap">
          <h1 class="hero-name">
            <span class="glitch-t" data-text="MEZANUR">MEZANUR</span>
            <span class="line2 glitch-t" data-text="MARUF">MARUF</span>
          </h1>
        </div>
        <div class="hero-sub">
          <span>BUILDER</span><span class="bar"></span>
          <span>ARCHITECT</span><span class="bar"></span>
          <span class="hl">TECHNOLOGY LEADER</span>
        </div>
        <p class="hero-desc">I turn ideas into scalable technology products — SaaS platforms, AI solutions, enterprise systems, and custom digital infrastructure engineered to solve real business problems and create measurable impact.</p>
        <div class="hero-btns">
          <a href="#products" class="btn-A">View Projects</a>
          <a href="#contact" class="btn-B">Initiate Contact</a>
        </div>
        <div class="hero-metrics">
          <div class="metric"><div class="m-val">5<sup>+</sup></div><div class="m-key">Years Active</div></div>
          <div class="metric"><div class="m-val">8<sup>+</sup></div><div class="m-key">Organizations</div></div>
          <div class="metric"><div class="m-val">AI</div><div class="m-key">Powered Solutions</div></div>
          <div class="metric"><div class="m-val">KSA</div><div class="m-key">Base · Global Reach</div></div>
        </div>
      </div>
      <div class="hero-photo-wrap">
        <div class="hero-photo-frame">
          <div class="hud-tl"></div><div class="hud-tr"></div>
          <div class="hud-bl"></div><div class="hud-br"></div>
          <img class="hero-photo" :src="photoSrc" alt="Mezanur Maruf">
          <div class="photo-scan-line"></div>
          <div class="photo-glow"></div>
        </div>
        <div class="photo-label">// MEZANUR.MARUF.PNG</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { photoSrc } from '../assets/photo.js'
</script>
