<template>
  <section id="contact">
    <div class="c-glow"></div>
    <div class="inner">
      <div class="c-sub reveal">{{ language === 'en' ? '▶ TRANSMISSION CHANNEL OPEN' : '▶ قناة النقل مفتوحة' }}</div>
      <h2 class="reveal">{{ language === 'en' ? "LET'S BUILD" : "دعنا نبني" }}<br><em>{{ language === 'en' ? 'THE FUTURE' : 'المستقبل' }}</em></h2>
      <p class="reveal">{{ contactText }}</p>
      <div class="c-links reveal">
        <a href="https://www.linkedin.com/in/mezanur-rahman-maruf/" target="_blank" class="c-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>{{ language === 'en' ? 'LinkedIn' : 'لينكدإن' }}</a>
        <a href="mailto:maruf@b-it.co" class="c-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>{{ language === 'en' ? 'Send Email' : 'إرسال بريد إلكتروني' }}</a>
        <a href="https://b-it.co" target="_blank" class="c-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>{{ language === 'en' ? 'BI Technology' : 'شركة ذكاء الأعمال' }}</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const { language } = useLanguage()

const contactText = computed(() => 
  language.value === 'en'
    ? `Building a startup or SaaS product? Need AI or enterprise solutions?\nPlanning a digital transformation? Interested in a technology partnership?\nI'm ready to execute.`
    : `هل تبني شركة ناشئة أو منتج SaaS؟ هل تحتاج إلى حلول ذكاء اصطناعي أو مؤسسية؟\nهل تخطط لتحول رقمي؟ هل أنت مهتم بشراكة تكنولوجية؟\nأنا مستعد للتنفيذ.`
)
</script>
