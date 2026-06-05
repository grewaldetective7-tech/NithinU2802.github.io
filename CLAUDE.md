# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal portfolio website for Nithin U, hosted at `https://nithinu2802.github.io`. Built with vanilla HTML5, CSS3, and JavaScript — no build tools, no package manager, no compilation step.

A notification banner at the top of `index.html` points visitors to a newer portfolio at `/portfolio`. This is intentional; do not remove it.

## Development

No build or install step. Open `index.html` directly in a browser or serve locally:

```bash
# Python (simplest)
python3 -m http.server 8080

# Node (if available)
npx serve .
```

Deployment is automatic: any push to `main` triggers `.github/workflows/static.yml`, which uploads the entire repository to GitHub Pages.

## Architecture

All content lives in a single page (`index.html`) with five anchor-linked sections: `#Home`, `#about`, `#skill`, `#project`, `#contact`. The contact form posts to FormSubmit.co (no backend) and redirects to `thankyou.html` on success.

**External dependencies (CDN only — no local installs):**
- Boxicons 2.1.4 — icon font
- Typed.js 2.0.16 — animated text rotation in the hero section (targets `.text` span)
- jQuery 3.6.0 + Isotope 3.0.6 — referenced in `index.html` but project filtering is reimplemented in vanilla JS in `script.js`; the jQuery/Isotope scripts are effectively unused

**`style.css` conventions:**
- CSS custom properties defined on `:root`: `--hover-color` (#FFD700 gold), `--neo-box-shadow` (cyan), `--secon-bg-color` (#141414)
- Staggered entrance animations use inline `style="--i:N"` on nav links and social icons — the `--i` variable drives `animation-delay` in CSS
- Circular skill charts are SVG strokes animated via `@keyframes`; each chart's fill amount is set by an inline `stroke-dashoffset` value on the SVG `<circle>` element

**`script.js` responsibilities:**
1. Typed.js initialization
2. Smooth-scroll for all `a[href^="#"]` anchors
3. Project filter buttons (`.btn` → `.port-box.<category>` show/hide)
4. `closeBanner()` — hides the notification banner and resets `.header` top to `0px`
5. Dynamic copyright year in `#copyright`

## Key Conventions

- Project cards in the portfolio grid use both a layout class (`.port-box`) and a category class (`web`, `mobile`, `iot`) for filtering. New projects must follow this pattern.
- The header sits at `top: 50px` to leave room for the notification banner; `closeBanner()` resets it to `0px`. If the banner is ever removed permanently, update `.header` top in CSS as well.
- All images live in `Assets/`. File names are case-sensitive on Linux/GitHub Pages — use the exact casing shown in existing `<img src="">` references.
- The resume link points to a Google Drive file. Update the `href` on the `.btn-box` anchor in the home section when the resume changes.
