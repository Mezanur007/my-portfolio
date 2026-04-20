<template>
  <section id="services">
    <div class="inner">
      <div class="sec-label reveal"><span class="sec-num">[ 05 ]</span><span class="sec-line"></span><h2 class="sec-title">{{ language === 'en' ? 'Services' : 'الخدمات' }} <span>{{ language === 'en' ? 'Available' : 'المتاحة' }}</span></h2></div>
      <div class="svc-grid reveal">
        <div class="svc-item"><span class="svc-ico">🛡</span><div class="svc-n">{{ language === 'en' ? 'IT Consulting' : 'استشارات تكنولوجيا المعلومات' }}</div></div>
        <div class="svc-item"><span class="svc-ico">🔐</span><div class="svc-n">{{ language === 'en' ? 'Cybersecurity' : 'الأمن السيبراني' }}</div></div>
        <div class="svc-item"><span class="svc-ico">⚙️</span><div class="svc-n">{{ language === 'en' ? 'Application Dev' : 'تطوير التطبيقات' }}</div></div>
        <div class="svc-item"><span class="svc-ico">📱</span><div class="svc-n">{{ language === 'en' ? 'Android Dev' : 'تطوير أندرويد' }}</div></div>
        <div class="svc-item"><span class="svc-ico">🧩</span><div class="svc-n">{{ language === 'en' ? 'Custom Software' : 'برمجيات مخصصة' }}</div></div>
        <div class="svc-item"><span class="svc-ico">☁️</span><div class="svc-n">{{ language === 'en' ? 'SaaS Development' : 'تطوير SaaS' }}</div></div>
        <div class="svc-item"><span class="svc-ico">🌐</span><div class="svc-n">{{ language === 'en' ? 'Web Development' : 'تطوير الويب' }}</div></div>
        <div class="svc-item"><span class="svc-ico">🤝</span><div class="svc-n">{{ language === 'en' ? 'Tech Partnerships' : 'شراكات تكنولوجية' }}</div></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage'

const { language } = useLanguage()
</script>
