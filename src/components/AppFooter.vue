<template>
  <footer>
    <span class="f-logo">MEZANUR MARUF</span>
    <p>{{ language === 'en' ? '© 2025 · CO-FOUNDER & CTO · BI TECHNOLOGY · RIYADH KSA' : '© 2025 · المؤسس المشارك والمدير التقني · شركة ذكاء الأعمال · الرياض السعودية' }}</p>
    <p>{{ language === 'en' ? 'SYSTEM v3.0 // ONLINE' : 'النظام v3.0 // متواجد' }}</p>
  </footer>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage'

const { language } = useLanguage()
</script>
