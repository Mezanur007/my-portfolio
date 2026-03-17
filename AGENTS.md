# AGENTS.md

This file provides guidance to AI agents (e.g. Warp, Claude Code) when working with code in this repository.

## Project Overview

A personal portfolio site for **Mezanur Maruf** (Co-Founder & CTO, BI Technology). Built with **Vue 3 + Vite**. All styling lives in a single global CSS file; all interactivity is handled through Vue components and `App.vue`'s `onMounted` hook.

## Local Development & Deployment

```bash
# Install dependencies (first time only)
npm install

# Start dev server
npm run dev

# Production build (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

**Deploy to production** via the Vercel CLI (project is already linked):
```bash
vercel --prod
```

The `.vercel/` directory stores the linked project/org IDs and is git-ignored.

## Project Structure

```
index.html                    # HTML shell — mounts #app, loads Google Fonts
vite.config.js                # Vite config — @vitejs/plugin-vue only
package.json                  # Vue 3, Vite, @vitejs/plugin-vue
src/
  main.js                     # createApp(App).mount('#app')
  App.vue                     # Root component — global JS behaviours + layout
  assets/
    styles.css                # All CSS (global, imported in main.js)
    photo.js                  # Profile photo exported as base64 data URI
  components/
    NavBar.vue                # Fixed top nav
    HeroSection.vue           # Full-viewport hero
    PlayZone.vue              # Play button → emits 'open-game'
    ProfileSection.vue        # Bio text + animated skill-bar HUD card
    CapabilitiesSection.vue   # 3×2 capability card grid
    ExperienceSection.vue     # Vertical career timeline
    ProductsSection.vue       # 2×2 product cards
    ServicesSection.vue       # 4×2 service items grid
    ContactSection.vue        # CTA + LinkedIn / Email / Website links
    AppFooter.vue             # Footer bar
    GameModal.vue             # Tic-Tac-Toe modal (2-player + AI minimax)
```

## CSS Design Tokens (`src/assets/styles.css` → `:root`)

| Variable | Value | Role |
|---|---|---|
| `--bg`, `--bg2`, `--bg3` | dark navy tones | layered backgrounds |
| `--orange` | `#ff6b35` | primary accent |
| `--blue` | `#00d4ff` | secondary accent |
| `--green` | `#39ff14` | status / online indicator |
| `--red` | `#ff2a6d` | glitch effect |
| `--orb` | Orbitron | display / heading font |
| `--mono` | Share Tech Mono | body / code font |
| `--raj` | Rajdhani | prose font |

Responsive breakpoints: `1020px` (tablet) and `720px` (mobile) — at the bottom of `styles.css`.

## Page Sections (DOM order in `App.vue`)

1. **`#cur` / `#cur-ring`** — custom cursor (hidden on mobile via `cursor:none`)
2. **`#bgCanvas`** — fixed canvas for animated particle/line background
3. **`.scan`** — fixed scanline overlay
4. **`GameModal`** — Tic-Tac-Toe modal (`ref="gameModal"`, opened via `gameModal.open()`)
5. **`NavBar`** — fixed top nav; emits nothing, receives `@open-game` to open game (nav has no game button currently — only `PlayZone` and `NavBar` wire up)
6. **`HeroSection`** — full-viewport hero with glitch name, metrics strip, and profile photo
7. **`PlayZone`** — play button; emits `open-game` → `App.vue` calls `gameModal.open()`
8. **`ProfileSection`** — bio text + HUD card with animated skill bars
9. **`CapabilitiesSection`** — 6-card capability grid (`[ 02 ]`)
10. **`ExperienceSection`** — vertical career timeline (`[ 03 ]`)
11. **`ProductsSection`** — 4 product cards (`[ 04 ]`)
12. **`ServicesSection`** — 8 service items (`[ 05 ]`)
13. **`ContactSection`** — CTA with LinkedIn, Email, and BI Technology links
14. **`AppFooter`** — footer bar

## Key JS Behaviours (`App.vue` → `onMounted`)

- **Canvas background** — draws animated nodes and connecting lines on `#bgCanvas`
- **Custom cursor** — `#cur` (dot) + `#cur-ring` (ring) track `mousemove` with lag interpolation
- **Scroll reveal** — `IntersectionObserver` adds `.on` to `.reveal` elements (staggered for grid children)
- **Skill bars** — `.sb-fill` widths driven by `data-w` attribute, triggered when `.hud-card` enters viewport

## GameModal (`src/components/GameModal.vue`)

Fully reactive Vue component using `<script setup>`:
- **State**: `board` (9-cell array), `current` (X/O), `gameOver`, `gameMode` (2p / ai), `scores`, `winLine`, `winnerMark`
- **AI**: minimax algorithm (`minimax()` + `checkWinFor()`) — unbeatable
- **API**: exposes `open()` via `defineExpose({ open })` — called from `App.vue` via `ref`
- **Events**: closes on `[CLOSE]` button or clicking the backdrop

## Editing Guidelines

- **Colours and fonts** — change only the `:root` variables in `styles.css`; they cascade everywhere.
- **Profile photo** — exported as a base64 `data:image/png` from `src/assets/photo.js`; replace by re-encoding a new image and updating that export.
- **Content** (bio, experience, products, services, contact links) — edit the relevant `.vue` file's template directly.
- **New sections** — create a new `.vue` component, import it in `App.vue`, and add the corresponding CSS to `styles.css`.
- **Global JS** (cursor, canvas, scroll reveal) — lives in `App.vue`'s `onMounted` hook.
- **Hover effects** — consolidated in the `/* ── HOVER EFFECTS ── */` block near the end of `styles.css`.
- **Responsive breakpoints** — `1020px` and `720px` media queries are at the bottom of `styles.css`.
