<template>
  <nav>
    <div class="nav-id">
      <div class="nav-badge">MM</div>
      <div class="nav-name">MEZANUR MARUF</div>
    </div>
    <ul class="nav-links">
      <li><a href="#profile">{{ language === 'en' ? 'Profile' : 'الملف الشخصي' }}</a></li>
      <li><a href="#capabilities">{{ language === 'en' ? 'Skills' : 'المهارات' }}</a></li>
      <li><a href="#experience">{{ language === 'en' ? 'Experience' : 'الخبرة' }}</a></li>
      <li><a href="#products">{{ language === 'en' ? 'Products' : 'المنتجات' }}</a></li>
      <li><a href="#contact">{{ language === 'en' ? 'Connect' : 'تواصل معي' }}</a></li>
    </ul>
    <div class="nav-right">
      <div class="nav-status">{{ language === 'en' ? 'ONLINE' : 'متواجد' }} // {{ language === 'en' ? 'RIYADH KSA' : 'الرياض، السعودية' }}</div>
      <button class="lang-toggle" @click="toggleLanguage" :title="language === 'en' ? 'Switch to Arabic' : 'الانتقال إلى الإنجليزية'" aria-label="Toggle language">
        {{ language === 'en' ? 'AR' : 'EN' }}
      </button>
      <button class="theme-toggle" @click="toggleTheme" :title="isDark ? (language === 'en' ? 'Switch to light mode' : 'التبديل إلى الوضع الفاتح') : (language === 'en' ? 'Switch to dark mode' : 'التبديل إلى الوضع الداكن')" aria-label="Toggle theme">
        <!-- Sun icon (shown in dark mode) -->
        <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <!-- Moon icon (shown in light mode) -->
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const { language, setLanguage } = useLanguage()
const isDark = ref(false)

function applyTheme(dark) {
  isDark.value = dark
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}

function toggleTheme() {
  applyTheme(!isDark.value)
}

function toggleLanguage() {
  setLanguage(language.value === 'en' ? 'ar' : 'en')
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(saved === 'dark' || (!saved && prefersDark))
})
</script>
