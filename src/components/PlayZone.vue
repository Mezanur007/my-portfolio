<template>
  <section id="play-zone">
    <div class="inner">
      <div class="games-grid">
        <!-- TIC-TAC-TOE -->
        <div class="play-card reveal">
          <div class="play-label">{{ language === 'en' ? '// GAME 01' : '// لعبة 01' }}</div>
          <button class="play-btn" @click="$emit('open-game')">
            <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
          </button>
          <div class="play-title">{{ language === 'en' ? 'TIC-TAC-TOE' : 'تك تاك تو' }}</div>
          <div class="play-sub">{{ language === 'en' ? 'Challenge a friend or battle the AI' : 'تحدى صديق أو تبارى مع الذكاء الاصطناعي' }}</div>
        </div>

        <!-- TUG OF WAR -->
        <div class="play-card reveal">
          <div class="play-label">{{ language === 'en' ? '// GAME 02' : '// لعبة 02' }}</div>
          <button class="play-btn tug-btn" @click="$emit('open-tug-of-war')">
            <svg viewBox="0 0 24 24"><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/><circle cx="4" cy="12" r="3" fill="currentColor"/><circle cx="20" cy="12" r="3" fill="currentColor"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="3"/></svg>
          </button>
          <div class="play-title">{{ language === 'en' ? 'TUG OF WAR' : 'شد الحبل' }}</div>
          <div class="play-sub">{{ language === 'en' ? 'Race against your opponent in math battles' : 'تسابق منافسك في معارك الرياضيات' }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage'

const { language } = useLanguage()

defineEmits(['open-game', 'open-tug-of-war'])
</script>

<style scoped>
#play-zone {
  padding: 80px 0;
  position: relative;
}

.inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  position: relative;
}

.play-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 40px 30px;
  border: 2px solid transparent;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(10, 14, 39, 0.5), rgba(26, 31, 58, 0.5));
  transition: all 0.4s ease;
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px);
}

.play-card.on {
  opacity: 1;
  transform: translateY(0);
  border-color: var(--orange);
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(0, 212, 255, 0.1));
}

.play-card:hover {
  border-color: var(--blue);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.05);
  transform: scale(1.02);
}

.play-label {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--orange);
  letter-spacing: 2px;
  opacity: 0.7;
}

.play-btn {
  width: 80px;
  height: 80px;
  border: 3px solid var(--orange);
  background: rgba(255, 107, 53, 0.1);
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--orange);
  transition: all 0.3s ease;
  font-size: 0;
}

.play-btn svg {
  width: 40px;
  height: 40px;
  fill: currentColor;
  stroke: currentColor;
}

.play-btn:hover {
  background: rgba(255, 107, 53, 0.3);
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.6);
  transform: scale(1.1);
}

.play-btn:active {
  transform: scale(0.95);
}

.play-title {
  font-family: var(--orb);
  font-size: 22px;
  color: var(--blue);
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

.play-sub {
  font-family: var(--raj);
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  line-height: 1.6;
}

@media (max-width: 1020px) {
  .games-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .play-card {
    padding: 30px 20px;
  }
}

@media (max-width: 720px) {
  #play-zone {
    padding: 60px 0;
  }

  .games-grid {
    gap: 20px;
  }

  .play-card {
    padding: 25px 15px;
    gap: 15px;
  }

  .play-btn {
    width: 60px;
    height: 60px;
  }

  .play-btn svg {
    width: 30px;
    height: 30px;
  }

  .play-title {
    font-size: 18px;
  }

  .play-sub {
    font-size: 13px;
  }
}
</style>
