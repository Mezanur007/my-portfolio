<template>
  <section id="hero">
    <div class="hero-grid"></div>
    <div class="hero-glow-r"></div>
    <div class="hero-glow-l"></div>
    <div class="hero-layout inner">
      <div class="hero-content">
        <div class="h-tag">
          <span class="dot"></span><span class="sep"></span>
          <span>{{ language === 'en' ? 'CO-FOUNDER & CTO' : 'المؤسس المشارك والمدير التقني' }}</span><span class="sep"></span>
          <span>{{ language === 'en' ? 'BI TECHNOLOGY' : 'شركة ذكاء الأعمال' }}</span>
        </div>
        <div class="name-wrap">
          <h1 class="hero-name">
            <span class="glitch-t" :data-text="language === 'en' ? 'MEZANUR' : 'مزنور'">{{ language === 'en' ? 'MEZANUR' : 'مزنور' }}</span>
            <span class="line2 glitch-t" :data-text="language === 'en' ? 'MARUF' : 'مارف'">{{ language === 'en' ? 'MARUF' : 'مارف' }}</span>
          </h1>
        </div>
        <div class="hero-sub">
          <span>{{ language === 'en' ? 'BUILDER' : 'البناء' }}</span><span class="bar"></span>
          <span>{{ language === 'en' ? 'ARCHITECT' : 'العمارة' }}</span><span class="bar"></span>
          <span class="hl">{{ language === 'en' ? 'TECHNOLOGY LEADER' : 'قائد التكنولوجيا' }}</span>
        </div>
        <p class="hero-desc">{{ language === 'en' ? heroDescEn : heroDescAr }}</p>
        <div class="hero-btns">
          <a href="#products" class="btn-A">{{ language === 'en' ? 'View Projects' : 'عرض المشاريع' }}</a>
          <a href="#contact" class="btn-B">{{ language === 'en' ? 'Initiate Contact' : 'بدء الاتصال' }}</a>
        </div>
        <div class="hero-metrics">
          <div class="metric"><div class="m-val">5<sup>+</sup></div><div class="m-key">{{ language === 'en' ? 'Years Active' : 'سنوات نشطة' }}</div></div>
          <div class="metric"><div class="m-val">8<sup>+</sup></div><div class="m-key">{{ language === 'en' ? 'Organizations' : 'منظمات' }}</div></div>
          <div class="metric"><div class="m-val">AI</div><div class="m-key">{{ language === 'en' ? 'Powered Solutions' : 'حلول مدعومة' }}</div></div>
          <div class="metric"><div class="m-val">KSA</div><div class="m-key">{{ language === 'en' ? 'Base · Global Reach' : 'القاعدة · الوصول العالمي' }}</div></div>
        </div>
      </div>
      <div class="hero-photo-wrap">
        <ClockWidget />
        <div class="hero-photo-frame">
          <div class="hud-tl"></div><div class="hud-tr"></div>
          <div class="hud-bl"></div><div class="hud-br"></div>
          <img class="hero-photo" :src="photoSrc" alt="Mezanur Maruf">
          <div class="photo-scan-line"></div>
          <div class="photo-glow"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { photoSrc } from '../assets/photo.js'
import ClockWidget from './ClockWidget.vue'

const { language } = useLanguage()

const heroDescEn = 'I turn ideas into scalable technology products — SaaS platforms, AI solutions, enterprise systems, and custom digital infrastructure engineered to solve real business problems and create measurable impact.'
const heroDescAr = 'أحول الأفكار إلى منتجات تكنولوجية قابلة للتطوير — منصات SaaS وحلول الذكاء الاصطناعي والأنظمة المؤسسية والبنية التحتية الرقمية المخصصة المصممة لحل مشاكل العمل الحقيقية وخلق تأثير قابل للقياس.'
</script>
