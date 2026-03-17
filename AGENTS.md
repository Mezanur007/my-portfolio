# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A single-file static personal portfolio for **Mezanur Maruf** (CTO & Co-Founder, BI Technology). The entire site lives in one file: `index.html`. There is no build system, no package manager, and no framework.

## Viewing and Deploying

**Local development** — open `index.html` directly in a browser; no server is required.

**Deploy to production** via the Vercel CLI (project is already linked):
```bash
vercel --prod
```

The `.vercel/` directory stores the linked project/org IDs and is git-ignored.

## Architecture

Everything — HTML, CSS, and JavaScript — is self-contained in `index.html`:

- **`<style>`** — all styling, using CSS custom properties defined in `:root`
- **`<script>`** (bottom of `<body>`) — all interactivity: canvas background, custom cursor, scroll-reveal, skill-bar animation, and the Tic-Tac-Toe game

### CSS Design Tokens (`:root`)
| Variable | Value | Role |
|---|---|---|
| `--bg`, `--bg2`, `--bg3` | dark navy tones | layered backgrounds |
| `--orange` | `#ff6b35` | primary accent |
| `--blue` | `#00d4ff` | secondary accent |
| `--green` | `#39ff14` | status/online indicator |
| `--red` | `#ff2a6d` | glitch effect |
| `--orb` | Orbitron | display/heading font |
| `--mono` | Share Tech Mono | body/code font |
| `--raj` | Rajdhani | prose font |

### Page Sections (in DOM order)
1. **`#cur` / `#cur-ring`** — custom cursor (hidden on mobile via `cursor:none`)
2. **`#bgCanvas`** — fixed canvas for the animated particle/line background
3. **`#game-overlay`** — Tic-Tac-Toe modal (triggered by the play button)
4. **`nav`** — fixed top nav with `MM` badge, section links, and "ONLINE // RIYADH KSA" status
5. **`#hero`** — full-viewport hero with glitch name, metrics strip, and profile photo (base64-encoded)
6. **`#play-zone`** — play button that opens the Tic-Tac-Toe modal
7. **`#profile`** — bio text + HUD card with animated skill bars
8. **`#capabilities`** — 3-column capability card grid
9. **`#experience`** — vertical timeline (`.mlog` / `.ms`)
10. **`#products`** — 2-column product cards
11. **`#services`** — 4-column service items
12. **`#contact`** — CTA with social/contact links
13. **`footer`**

### Key JS Behaviours
- **Canvas background** — draws animated nodes and connecting lines on `#bgCanvas`
- **Custom cursor** — `#cur` (dot) + `#cur-ring` (ring) track `mousemove`
- **Scroll reveal** — `IntersectionObserver` adds `.on` to `.reveal` elements
- **Skill bars** — `.sb-fill` widths are set via JS when the profile section enters the viewport
- **Tic-Tac-Toe** — `setMode()` / `cellClick()` / `resetGame()` / `resetScores()` — supports 2-player and vs-AI (minimax) modes

## Editing Guidelines

- **Colours and fonts** — change only the `:root` variables; they cascade everywhere.
- **Profile photo** — stored as a base64 `data:image/png` in the `src` of `.hero-photo`; replace by re-encoding a new image.
- **Content** (bio, experience, products, etc.) — edit the HTML text nodes directly; no templating layer exists.
- **Responsive breakpoints** — `1020px` (tablet) and `720px` (mobile) media queries are at the bottom of `<style>`.
- **Hover effects** — consolidated in the "HOVER EFFECTS" comment block near the end of `<style>`.
