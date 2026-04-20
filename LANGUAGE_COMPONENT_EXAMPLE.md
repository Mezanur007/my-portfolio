<!-- EXAMPLE: How to add language support to components -->
<!-- 
  This example shows how to update any component to use the language system.
  Replace placeholders with actual content from your component.
-->

<template>
  <!-- Example 1: Simple inline translation (as shown in NavBar) -->
  <div>
    <h1>{{ language === 'en' ? 'About Me' : 'من أنا' }}</h1>
  </div>

  <!-- Example 2: Using computed values for cleaner code -->
  <div>
    <p>{{ currentText }}</p>
  </div>

  <!-- Example 3: Conditional rendering based on language -->
  <div v-if="language === 'en'">English-only content</div>
  <div v-else>محتوى خاص باللغة العربية فقط</div>

  <!-- Example 4: Using classes for RTL -->
  <div :class="{ 'rtl-text': isRTL }">
    Content that supports RTL
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

const { language, isRTL } = useLanguage()

// For simple text, inline ternary is fine (as in NavBar)
// For complex content, use computed properties:
const currentText = computed(() => {
  return language.value === 'en' 
    ? 'Welcome to my portfolio'
    : 'مرحباً بك في محفظتي'
})
</script>

<style scoped>
/* RTL-aware styling example */
.text-block {
  text-align: right;
  direction: ltr; /* This will be overridden by html.rtl */
}

/* If you need to apply RTL specifically in component styles */
:global(html.rtl) .text-block {
  text-align: right;
  padding-right: 20px;
  padding-left: 0;
}

:global(html.ltr) .text-block {
  text-align: left;
  padding-left: 20px;
  padding-right: 0;
}
</style>
