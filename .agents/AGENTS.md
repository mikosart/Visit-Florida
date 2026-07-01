# Project Context & Rules: VISIT FLORIDA Toolkit

This file serves as a memory and guideline for any agent working on the "Live More Floridays Toolkit" codebase.

## Codebase Architecture
* **Static HTML/CSS/JS:** The toolkit is a lightweight static web app.
* **Core Pages:**
  * `index.html` (Toolkit Hub)
  * `pages/brand-guidelines-consolidated.html` (Consolidated Brand Guidelines)
* **Translation System:** Translations are powered by `js/i18n.js` for English (`en`), Spanish (`es`), and Portuguese (`pt`).

## Key Conventions & Logic

### 1. Localization of Text Elements
* Text elements in HTML use the `data-i18n` attribute pointing to a key in the `translations` object inside `js/i18n.js`.
* Avoid hardcoding text changes directly in HTML; update the translation dictionary in `js/i18n.js` instead.

### 2. Localization of Images & Assets
* Localized images use the `data-i18n-img` attribute, which points to the base English path (e.g., `../img/pages/brand-guidelines/br-12-texture-application-01.png`).
* The i18n engine automatically maps non-English sources to matching localized filenames inside language subdirectories (e.g. `es/` with suffix `-es` or `pt/` with suffix `-pt`).
* Maintain this exact folder and suffix convention when adding or updating localized assets.

### 3. Navigation and Layout
* A fixed/sticky header is managed dynamically via `js/main.js` which adjusts padding offsets (`--fixed-header-h`).
* Quick-nav buttons and sticky bar navigation must match the correct section IDs (e.g., `#macro-textures-usage`).
* Avoid using `#macro-textures-palette` as that section has been removed.
