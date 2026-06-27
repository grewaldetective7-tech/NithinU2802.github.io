# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal portfolio website for Nithin U, hosted at `https://nithinu2802.github.io`. Built with vanilla HTML5, CSS3, and JavaScript — no build tools, no package manager, no compilation step.

A notification banner at the top of `index.html` points visitors to a newer portfolio at `/portfolio`. This is intentional; do not remove it.

## Repository Structure

```
NithinU2802.github.io/
├── index.html          # Main single-page portfolio (376 lines)
├── style.css           # All styles (842 lines)
├── script.js           # All JavaScript (63 lines)
├── thankyou.html       # Contact form redirect page
├── CLAUDE.md           # This file
├── README.md           # Minimal project description
├── Assets/             # All images (case-sensitive filenames)
│   ├── title.png           # Favicon
│   ├── home.jpg            # Hero section background
│   ├── ImageProfile.jpg    # About section profile photo
│   ├── project1.jpg        # Project screenshots
│   ├── project2.jpg
│   ├── project3.jpg
│   ├── project4.jpg
│   ├── project5.jpg
│   └── project6.png
└── .github/
    └── workflows/
        └── static.yml  # GitHub Pages deployment workflow
```

## Development

No build or install step. Open `index.html` directly in a browser or serve locally:

```bash
# Python (simplest)
python3 -m http.server 8080

# Node (if available)
npx serve .
```

Deployment is automatic: any push to `main` triggers `.github/workflows/static.yml`, which uploads the entire repository to GitHub Pages using the official `actions/upload-pages-artifact` + `actions/deploy-pages` actions. Concurrency is limited to one deployment at a time.

## Architecture

All content lives in a single page (`index.html`) with five anchor-linked sections:

| Anchor | Section | Content |
|--------|---------|---------|
| `#Home` | Hero | Background image, animated typing text, social icons, resume button |
| `#about` | About | 2-column: profile image + bio text, LinkTree button |
| `#skill` | Skills | Technical bars (horizontal) + Professional charts (SVG circles) |
| `#project` | Projects | Filter buttons + 6-card gallery grid |
| `#contact` | Contact | FormSubmit.co form → `thankyou.html` on success |

The contact form POSTs to `https://formsubmit.co/nithinu2810@gmail.com` (note: `2810`, not `2802`), with captcha disabled and redirect set to `https://nithinu2802.github.io/thankyou.html`.

`thankyou.html` is a minimal standalone page with inline CSS, a success heading, and a link back to `#contact`.

**External dependencies (CDN only — no local installs):**
- Boxicons 2.1.4 (`unpkg.com`) — icon font
- Typed.js 2.0.16 (`unpkg.com`) — animated text rotation in the hero section (targets `.text` span)
- jQuery 3.6.0 + Isotope 3.0.6 — loaded from CDN but **effectively unused**; project filtering is reimplemented in vanilla JS in `script.js`

## CSS (`style.css`)

**Custom properties on `:root`:**
- `--hover-color: #FFD700` — gold, primary accent color
- `--neo-box-shadow: cyan` — glow/shadow effect color
- `--secon-bg-color: #141414` — dark background
- `--btn-color: aliceblue` — button text color
- `--text-color: #333` — rarely used

**Color scheme:** Dark backgrounds (`#141414`, `#081b29` header) + light text (aliceblue/white) + gold accents + cyan glows.

**Staggered entrance animations:** Inline `style="--i:N"` on nav links and social icons drives `animation-delay: calc(.2s * var(--i))` in CSS. Used on `.navbar a` and `.home-sci a` elements.

**Animation keyframes defined:**
- `right` — slide in from left (logo)
- `top` / `bottom` — slide up/down (nav links, headings)
- `left` — slide in from right (paragraphs, icons)
- `animi` — horizontal skill bar fill (scaleX 0→1)
- `display` — opacity fade for bar labels
- `bar` — SVG background circle animation
- `path1` through `path5` — SVG fill animations with varying `stroke-dashoffset` values per skill

**Key classes:**

| Class | Description |
|-------|-------------|
| `.header` | Fixed nav, `top: 50px` (leaves room for banner) |
| `.notification-banner` | Fixed top bar, gold background, dismissible |
| `.btn-box` | Primary CTA button (gold bg, rounded) |
| `.home-sci a` | Circular social icon buttons with cyan glow on hover |
| `.Technical-bar` | Horizontal skill progress bar container |
| `.percent-line span` | Gold-filled bar; width set per skill |
| `.chart-bars` | Grid of 5 SVG circular skill charts |
| `.path-1` through `.path-5` | Named SVG `<circle>` elements for professional skill animations |
| `.port-box` | Project card (dark bg, gold border, cyan shadow) |
| `.port-box.web / .mobile / .iot` | Category classes used by JS filter |
| `.fillter-buttons .btn` | Filter buttons; active state toggled by JS |

**Known CSS limitations:**
- No responsive/mobile media queries; contact form (`width: 500px; margin-left: 350px`) and skill container (`width: 600px`) use hardcoded widths
- Projects grid uses `repeat(auto-fill, minmax(270px, 1fr))` so it adapts somewhat

## JavaScript (`script.js`)

Five responsibilities in 63 lines:

1. **Typed.js init** — Rotates strings `["Final Year Student", "President of Mastro Club", "Fresher"]` in `.text` span with `typeSpeed: 100`, `backSpeed: 100`, `backDelay: 1000`, `loop: true`.

2. **Smooth scroll** — Intercepts all `a[href^="#"]` clicks and uses `scrollIntoView({ behavior: "smooth" })`.

3. **Project filter** — On load, queries all `.btn` and `.port-box` elements. Click on a filter button toggles `.active` class and shows/hides project cards by matching the button's `data-filter` value against card CSS classes (`web`, `mobile`, `iot`). "All" shows every card.

4. **`closeBanner()`** — Global function called by the banner's close button. Hides `#notification-banner` and sets `.header` CSS `top` to `"0px"`.

5. **Dynamic copyright year** — Sets `#copyright` text content to the current year on `DOMContentLoaded`.

## Key Conventions

- **Project cards** must carry both `.port-box` (layout) and a category class (`web`, `mobile`, or `iot`) for the filter to work. New projects must follow this pattern.
- **Header top offset:** `.header` is `top: 50px` to sit below the notification banner. `closeBanner()` resets it to `0px`. If the banner is ever removed permanently, change `.header` top in CSS directly.
- **Images** live in `Assets/`. Filenames are case-sensitive on Linux/GitHub Pages — use the exact casing from existing `<img src="">` references.
- **Resume link** points to a Google Drive share URL. Update the `href` on the `.btn-box` anchor in the home section when the resume file changes.
- **Social links:** Instagram, LinkedIn, GitHub, and email (mailto) are in the home section; LinkTree is in the about section.
- **6 project cards** link to GitHub repos (iconnect_Website, Obstacle-Avoidance-Robot, College_Website, AntiNarco, NodeJs Employee, Diabetes_parkinson-Disease-Prediction).

## Adding Content

**New project card:**
```html
<div class="port-box web">  <!-- use web | mobile | iot -->
  <img src="Assets/projectN.jpg" alt="Project Name" />
  <div class="port-content">
    <div class="port-text">
      <h3>Project Name</h3>
      <span>Category</span>
    </div>
    <a href="https://github.com/NithinU2802/repo-name" class="port-icon">
      <i class="bx bxl-github"></i>
    </a>
  </div>
</div>
```

**New SVG circular skill chart (professional skills):**
Copy an existing `.chart-bar` block, add a new `.path-N` keyframe in `style.css` with the appropriate `stroke-dashoffset` value (lower = more filled; circumference ≈ 534).

## Deployment

Push to `main` → GitHub Actions (`static.yml`) → GitHub Pages. No manual steps. The workflow has `concurrency: group: pages` so only one deployment runs at a time (in-progress ones are not cancelled).
