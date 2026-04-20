<template>
  <section id="play-zone">
    <div class="inner">
      <div class="play-center reveal">
        <div class="play-label">{{ language === 'en' ? '// MINI GAME UNLOCKED' : '// لعبة صغيرة مقفولة' }}</div>
        <button class="play-btn" @click="$emit('open-game')">
          <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
        </button>
        <div class="play-title">{{ language === 'en' ? 'PLAY TIC-TAC-TOE' : 'لعب تك تاك تو' }}</div>
        <div class="play-sub">{{ language === 'en' ? 'Challenge a friend or battle the AI' : 'تحدى صديق أو تبارى مع الذكاء الاصطناعي' }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage'

const { language } = useLanguage()

defineEmits(['open-game'])
</script>
