# 🌐 Language & RTL/LTR Support Guide

## Overview
Your portfolio now supports **English (EN)** and **Arabic (AR)** with automatic **RTL/LTR layout switching**.

## Features Added

### 1. **Language Toggle Button** ✨
- Located in the **top-right navbar** next to the dark mode toggle
- Shows **"AR"** when in English, **"EN"** when in Arabic
- Click to instantly switch languages
- Language preference persists in browser localStorage

### 2. **Automatic RTL Support** 🔄
When switching to Arabic:
- Text direction automatically changes to RTL
- Layouts automatically mirror (grids, flexbox, borders)
- Navigation, hero section, and all cards reposition correctly
- Custom CSS handles all alignments

### 3. **Dark Mode Compatible** 🌙
- RTL works with both light and dark modes
- Language and theme settings are independent
- Both settings persist separately in localStorage

---

## Implementation Structure

### Files Created
```
src/composables/
├── useLanguage.js          # Language state management
└── translations.js         # Translation keys (EN + AR)

LANGUAGE_COMPONENT_EXAMPLE.md  # Component integration guide
```

### Files Modified
```
src/components/NavBar.vue     # Added language toggle button
src/assets/styles.css         # Added RTL CSS rules + .lang-toggle styles
src/App.vue                   # Added language initialization
```

---

## Quick Usage Guide

### For Components
To use language in any Vue component:

```vue
<template>
  <div>
    <!-- Simple inline translation -->
    <h1>{{ language === 'en' ? 'Welcome' : 'أهلا' }}</h1>
    
    <!-- Computed property for complex content -->
    <p>{{ translatedText }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

const { language, isRTL } = useLanguage()

const translatedText = computed(() => 
  language.value === 'en' 
    ? 'This is my portfolio'
    : 'هذه هي محفظتي'
)
</script>
```

### Add New Translations
Edit `src/composables/translations.js`:

```javascript
export const translations = {
  en: {
    myNewKey: 'English text here',
    // ... more keys
  },
  ar: {
    myNewKey: 'النص العربي هنا',
    // ... more keys
  }
}
```

---

## Technical Details

### Language State Management
- **File**: `src/composables/useLanguage.js`
- **Exports**: `useLanguage()` composable with:
  - `language` - current language (ref)
  - `isRTL` - boolean indicating RTL mode
  - `dir` - computed direction ('rtl' or 'ltr')
  - `setLanguage(lang)` - function to change language

### CSS RTL Architecture
- All RTL rules use `html.rtl` selector
- Dark mode + RTL uses `html.dark.rtl` selector
- Mobile RTL handled in `@media(max-width:720px)` with RTL overrides

### Supported Layouts (Auto-reversed for RTL)
- Navigation bar and links
- Hero section with photo
- Grid layouts (capabilities, products, services)
- Timeline (experience section with border-right instead of border-left)
- Buttons and interactive elements
- Mobile responsive layouts

---

## Browser Compatibility
- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires ES6+ JavaScript support
- Works with localStorage (one-line fallback possible if needed)

---

## Styling Arabic Text
Arabic requires specific Google Fonts:

Current setup uses **Share Tech Mono** and **Orbitron** which support Arabic characters.

To add dedicated Arabic fonts in the future:
1. Add to `index.html`'s Google Fonts link:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
   ```

2. Update CSS variables in `styles.css`:
   ```css
   :root {
     --ar-font: 'Cairo', sans-serif;
   }
   ```

3. Apply conditionally:
   ```css
   html.rtl body { font-family: var(--ar-font); }
   ```

---

## Testing Checklist
- [ ] Click "AR" button in navbar to switch to Arabic
- [ ] Verify text direction changes to RTL
- [ ] Check that layouts mirror correctly
- [ ] Test with dark mode toggled on/off
- [ ] Verify mobile view (< 720px) layouts properly in both languages
- [ ] Refresh page—language preference persists
- [ ] Test all sections: Hero, Profile, Skills, Experience, Products, Services, Contact
- [ ] Verify navigation links display in correct language

---

## Future Enhancement Ideas
1. **i18n Library**: Switch to `vue-i18n` for larger translation sets
2. **More Languages**: Add French, Spanish, or other languages
3. **Translation Management**: Use external CMS or translation service
4. **Date/Number Formatting**: Add `Intl.DateTimeFormat` for locale-specific formatting
5. **Content Regions**: Different content for different Arabic regions (Saudi, Egypt, etc.)

---

## Troubleshooting

**Q: Language switch button not showing?**
- Ensure `NavBar.vue` has the latest code with the `lang-toggle` button
- Check browser console for errors

**Q: RTL not working?**
- Verify `html.rtl` class is being applied to `<html>` element
- Check `useLanguage.js` is properly setting the class
- Clear browser cache and reload

**Q: Translations not appearing?**
- Verify `translations.js` has the keys you're using
- Check component is using correct ternary or computed property
- Ensure language reactive value is being accessed with `.value`

---

## Support
For questions or issues, refer to:
- `LANGUAGE_COMPONENT_EXAMPLE.md` - Component examples
- `src/composables/useLanguage.js` - Language composable
- `src/composables/translations.js` - Translation keys

Happy localization! 🎉
