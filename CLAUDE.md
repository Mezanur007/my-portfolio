# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Install dependencies** (required on first clone — WSL/NTFS needs `--no-bin-links`):
```bash
npm install --no-bin-links
```

**Local dev server:**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
# or via node directly (avoids PATH issues in WSL):
node node_modules/vite/bin/vite.js build
```

**Deploy to production** (Vercel project is already linked):
```bash
vercel --token <token> --yes --scope mezanur007s-projects --prod
```

**Push to GitHub** (use Windows git from WSL — WSL git cannot chmod on NTFS):
```bash
git.exe add src/
git.exe commit -m "message"
git.exe push
```

## Architecture

Vue 3 + Vite single-page app. No router, no state management library — the app is one long scrollable page.

### Entry flow
`index.html` → `src/main.js` → `src/App.vue` → 10 section components

### App.vue responsibilities
`App.vue` owns all DOM-level side effects that span the whole page and must run after all components mount:
- **Custom cursor** — `#cur` dot + `#cur-ring` ring tracking `mousemove`
- **Canvas particle background** — `#bgCanvas` with 90 animated nodes and connecting lines
- **Scroll reveal** — `IntersectionObserver` adds `.on` to `.reveal` elements; staggered delay when inside a grid parent
- **Skill bar animation** — second `IntersectionObserver` sets `.sb-fill` widths from `data-w` attributes when `.hud-card` enters viewport

### Component map
| Component | Section |
|---|---|
| `NavBar` | Fixed top nav |
| `HeroSection` | Full-viewport hero with glitch name + base64 photo |
| `PlayZone` | Play button strip that opens the game |
| `ProfileSection` | Bio text + animated skill bars (`.hud-card`) |
| `CapabilitiesSection` | 3-column capability cards |
| `ExperienceSection` | Vertical timeline (`.mlog` / `.ms`) |
| `ProductsSection` | 2-column product cards |
| `ServicesSection` | 4-column service items |
| `ContactSection` | CTA + contact links |
| `AppFooter` | Footer |
| `GameModal` | Tic-Tac-Toe modal — fully self-contained |

### GameModal
The only stateful component. Uses Vue `ref` for all game state (board, scores, turn, mode). Exposes `open()` via `defineExpose` so `App.vue` can call `gameModal.open()`. The minimax AI is implemented inline.

### Styles
All CSS lives in `src/assets/styles.css` (imported globally in `main.js`). Design tokens are CSS custom properties on `:root`:
- `--orange: #ff6b35` — primary accent
- `--blue: #00d4ff` — secondary accent
- `--bg / --bg2 / --bg3` — layered dark backgrounds
- `--orb` (Orbitron), `--mono` (Share Tech Mono), `--raj` (Rajdhani) — font families

### Profile photo
Stored as a base64 `data:image/png` export in `src/assets/photo.js` (`export const photoSrc = "..."`). `HeroSection.vue` imports and binds it with `:src="photoSrc"`. To replace the photo, re-encode the new image to base64 and overwrite that export.

### Deployment
Vercel builds via `npm run build` and serves the `dist/` output. `dist/` and `node_modules/` are git-ignored. The `.vercel/` directory (git-ignored) stores the linked project ID (`prj_8FSi666RJ1Nn8nYjwXUlOsHwdAFg`, team `mezanur007s-projects`). GitHub repo: `Mezanur007/my-portfolio` — pushes to `main` trigger automatic Vercel deploys to `maruf.b-it.co`.
