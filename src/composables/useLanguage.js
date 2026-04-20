import { ref, computed, watch } from 'vue'

const currentLanguage = ref(localStorage.getItem('language') || 'en')

export function useLanguage() {
  const language = computed(() => currentLanguage.value)
  const isRTL = computed(() => currentLanguage.value === 'ar')
  const dir = computed(() => isRTL.value ? 'rtl' : 'ltr')

  function setLanguage(lang) {
    if (['en', 'ar'].includes(lang)) {
      currentLanguage.value = lang
      localStorage.setItem('language', lang)
      document.documentElement.lang = lang
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.classList.toggle('rtl', lang === 'ar')
    }
  }

  // Set initial direction on first call
  if (typeof window !== 'undefined') {
    document.documentElement.lang = currentLanguage.value
    document.documentElement.dir = currentLanguage.value === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.classList.toggle('rtl', currentLanguage.value === 'ar')
  }

  return {
    language,
    isRTL,
    dir,
    setLanguage
  }
}
