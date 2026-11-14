# Vyuha Website Revamp — Implementation Brief

**Goal:** Replace the current vyuhas.com with the approved redesign, productionised into a maintainable codebase.

**Source of truth:** `qworp-vyuha-redesign.html` — a single, self-contained, working file (~180 KB). Every design decision below is already implemented in it. When this brief and the file disagree, **the file wins**. Open it in a browser before writing any code.

---

## 1. What you are building

A single-page marketing site for **Vyuha**, the company behind **QWORP**, its flagship quantitative trading platform for Indian retail traders.

Ten sections, in this order:

| # | Section | ID | Purpose |
|---|---------|-----|---------|
| 1 | Hero | — | Brand statement + 3D ribbon background + stat strip |
| 2 | Etymology | `#vyuha` | Meaning of व्यूह, the Mahabharata battle-formation concept |
| 3 | Why Quantitative | `#why` | Discretionary vs. Systematic interactive toggle |
| 4 | Research Pipeline | `#pipeline` | 5-stage scroll-synced stepper |
| 5 | The Terminal | `#terminal` | `<vyuha-market-signal>` UI showcase |
| 6 | Inside The Engine | `#engine` | `<qworp-engine>` six-pillar diagram |
| 7 | Core Research Areas | `#research` | 8-card grid |
| 8 | Mechanisms | `#mechanisms` | 16 items in 4 groups |
| 9 | Vision | — | Pull quote |
| 10 | Contact | `#contact` | Email + GitHub + LinkedIn |

---

## 2. Non-negotiable rules

These encode decisions made deliberately during design. Do not "improve" them without asking.

### 2.1 Brand hierarchy — Vyuha is the company, QWORP is the product

This is the single most important content rule.

- The **logo and wordmark are VYUHA only.** Never "QWORP by Vyuha" in the nav or hero.
- QWORP is **not mentioned above the fold.** Its first appearance is the Pipeline section subhead: *"This is the process behind QWORP — Vyuha's quantitative trading engine."*
- The Etymology section is about **Vyuha's philosophy**, not the product. Its closing line is *"This is the structure Vyuha builds into capital…"*
- The Vision quote is attributed **"— Vyuha, Vision"** (a company-level statement).
- Footer and copyright read **Vyuha**, with QWORP named as their product.
- Nav link to the Etymology section is labelled **"Etymology"**, not "Vyuha" — the wordmark already says Vyuha, so a nav item repeating it is redundant.

If Vyuha later launches additional products, this structure accommodates them without a rebuild.

### 2.2 No fabricated or unverifiable performance claims

The original motion-graphics kit shipped with Sharpe 2.14, Calmar 1.78, Max Drawdown 6.2%, a self-referential "QWORP-α +0.92%" ticker, and "AI Signal Confidence 98.7%". **All of these were deliberately removed.** They read as audited track-record claims for a platform that is still pre-launch / request-access.

Replacements now in place:
- Hero stat strip: **Research Domains (8) · Quant Mechanisms (16) · Exchanges Covered (2)** — structural facts, not returns.
- Ticker strip: NIFTY, BANKNIFTY, SENSEX, BTC, DXY, UST10Y — illustrative market context, no Vyuha-attributed performance.
- The confidence readout is now a neutral **"SIGNAL TRACE / SAMPLE"** label.
- The Terminal section carries the caption *"A sample look at the interface — illustrative UI, not live account data."* **Keep this caption.**

Do not reintroduce performance figures unless Vyuha has an audited, disclosable track record and has cleared the wording. In India this is SEBI-sensitive territory — treat any return, ratio, or win-rate claim as requiring sign-off, not a design choice.

### 2.3 Market data is Indian-first

The Terminal chart is **NIFTY 50 · NSE Index** at ~24,812. It was originally NASDAQ/NQ at ~18,752 and was converted. All four touchpoints must stay internally consistent: chart header, Entry Signal card, Execution card, and the price text drawn inside the SVG. If you change the instrument, change all four.

### 2.4 Typography discipline

- **Manrope** — all display headings (h1/h2/h3), weight 700–800, tight tracking (`-0.02em`).
- **Inter** — body copy.
- **IBM Plex Mono** — eyebrows, tickers, stat labels, numeric readouts.
- **Fraunces (serif)** — scoped to the Etymology `<h2>` **only**. This was an explicit decision: the serif carries the ancient/heritage register exactly once, where the Sanskrit meaning is discussed. Do not let it leak into other headings.

### 2.5 Motion discipline

An earlier iteration was rejected for having too many circular/rotating animations. The current allocation is intentional:

- **Circular motion (rings, spirals) appears only in the Etymology section** — it's the mandala/formation motif, tied to the concept.
- Every other section uses **market-native motion**: candlesticks, price lines drawing in, node-network connections, a vertical pipeline stepper, a scrolling pulse line.
- Do not add rotating rings elsewhere.

**Resolved, not an open question**: the Engine component's hexagon core originally had two continuous rotations (`core-spin`/`core-spin-reverse`, 26s/18s, infinite) on its tick-marked rings — a genuine violation of the rule above, found during productionisation. Evaluated deliberately (not just fixed silently) against the argument "it's diegetically a machine, machines spin" — rejected, because that reasoning would justify rotation on almost any future component too, which is exactly what this rule exists to foreclose. Replaced with the same `coreBreath` pulse already used elsewhere in the component. This is not a blessed exception to the rule; the rule is exactly as stated above, zero rotation outside Etymology, full stop. If this discussion resurfaces next time someone touches the Engine component, this paragraph is why the answer is still no.

---

## 3. Design tokens

Copy these verbatim into your CSS layer / Tailwind config / design-token file.

```css
:root{
  /* surfaces */
  --void:#070612;            /* page background */
  --panel:#0d0a20;
  --panel-2:#14102a;

  /* hairlines */
  --line: rgba(187,152,255,0.12);
  --line-strong: rgba(196,164,255,0.24);

  /* text */
  --ink:#f7f5fb;
  --ink-dim:#aaa4ba;
  --ink-faint:#6f6a80;

  /* brand accent */
  --purple:#aa78ff;
  --purple-soft: rgba(170,120,255,0.14);
  --purple-line: rgba(170,120,255,0.4);
  --purple-bright:#d6c0ff;
  --purple-bright-soft: rgba(214,192,255,0.12);

  /* market semantics */
  --green:#62cfa0;           /* up / gains / systematic */
  --red:#de6878;             /* down / losses / discretionary */

  /* type */
  --font-display: 'Manrope', 'Inter', sans-serif;
  --font-meaning: 'Fraunces', serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  /* layout */
  --container: 1180px;
  --pad: clamp(1.25rem, 4vw, 3rem);
  --section-pad: clamp(4.5rem, 9vw, 8.5rem);
}
```

**Colour semantics matter.** Purple is brand/structure. Green and red are reserved for market direction — green for up/gains/systematic, red for down/losses/discretionary. This is why the Why-Quantitative toggle buttons turn green and red respectively. Don't use green or red decoratively.

Fonts load from Google Fonts:
```
Fraunces:opsz,wght@9..144,300..900
Manrope:wght@500;600;700;800
Inter:wght@400;500;600;700;800
IBM+Plex+Mono:wght@400;500;600
```

---

## 4. The three motion components

The heavy visual work lives in three dependency-free Web Components (Shadow DOM, no framework, no build step):

| Element | Used in | Renders |
|---------|---------|---------|
| `<vyuha-hero>` | Hero | Headline, eyebrow, description, stat strip, 3D ribbon background, ambient orb |
| `<qworp-engine>` | Inside The Engine | Six-pillar hexagon diagram with animated core and connector pulses |
| `<vyuha-market-signal>` | The Terminal | Candlestick chart, signal line, entry/latency/execution cards, ticker strip |

They currently sit in one `<script type="module">` block (~129 KB). Notes:

- They use **Shadow DOM**, so page CSS does not reach inside them. Theming happens via tokens defined inside each component's `TOKENS` block — if you change the palette, update both the page `:root` **and** the component tokens, or they will drift.
- They already handle `prefers-reduced-motion` and pause animation when scrolled off-screen via `IntersectionObserver`. **Preserve both behaviours.**
- `border-radius: inherit` is used internally, so the host element controls corner rounding from outside.
- `<vyuha-hero>` accepts attributes: `eyebrow`, `headline` (pipe-delimited for line breaks), `description`, `domains`, `mechanisms`, `exchanges`.

**Recommended:** extract this module to `assets/js/vyuha-motion.js` and load with `<script type="module" src="…" defer>`.

---

## 5. Productionisation tasks

The prototype is deliberately single-file for portability. For production:

### 5.1 Split the bundle
```
/index.html
/assets/css/main.css              ← the ~16 KB inline <style>
/assets/js/vyuha-motion.js        ← the ~129 KB module (3 components)
/assets/js/site.js                ← the ~19 KB page logic (ticker, toggle,
                                     stepper, card rendering, reveals, nav)
/assets/img/hero-ribbon.webp      ← see 5.2
```

### 5.2 Extract the embedded hero image — highest-impact win

The 3D ribbon is currently a **base64 data URI inside the HTML: 101,696 characters representing a 74 KB WebP.** That single string is roughly 55% of the page's byte weight and it blocks HTML parsing, cannot be cached separately, and cannot be served responsively.

Do this:
1. Decode it to `assets/img/hero-ribbon.webp` (it is already watermark-free and optimised — do not re-process or re-compress it).
2. Reference it normally. Add `loading="eager"` and `fetchpriority="high"` since it is above the fold.
3. Generate 2–3 widths (e.g. 900 / 1500 / 2000 px) and serve via `srcset`.
4. Provide a JPEG/PNG fallback only if you must support browsers without WebP.

Expected result: HTML drops from ~180 KB to ~80 KB, with the image cached independently.

The image is applied as a **full-bleed background layer**, not a side illustration:
- `.art { position:absolute; inset:0; z-index:0; opacity:.68; }` with a `mask-image` gradient fading it out toward the text side so the headline stays legible.
- `object-fit: cover; object-position: 74% 42%`.
- On ≤1040 px the mask flips to a vertical fade and opacity drops to `.42` so it doesn't compete with stacked text.

### 5.3 Other production tasks
- Self-host fonts (or `preload` the two critical weights) to remove the render-blocking Google Fonts request.
- Add `<link rel="preload">` for the hero image.
- Minify CSS/JS; enable Brotli.
- Add favicon set + `og:image` / Twitter card (currently only an inline SVG favicon exists).
- Set real canonical URL, `og:title`, `og:description`.

---

## 6. Content inventory to carry over

All copy is already written and approved in the file. Do not rewrite it. Key strings:

- **Hero headline:** "Markets move in formation. | Trade like you know the pattern."
- **Hero eyebrow:** "🇮🇳 AI-DRIVEN QUANT ENGINE"
- **Etymology h2:** "व्यूह — an arrangement built to win."
- **Why Quant h2:** "Conviction fades. Evidence compounds."
- **Pipeline h2:** "From raw data to a placed order."
- **Vision quote:** "Every Indian trader deserves the statistical rigor institutions have used for decades."
- **Contact:** contact@vyuhas.com · github.com/tqworp · linkedin.com/company/vyuhas

Data arrays live in `site.js` and are trivial to edit:
- `STAGES` — 5 pipeline stages
- `RESEARCH` — 8 research areas
- `MECH_GROUPS` — 4 groups × 4 mechanisms
- `ICONS` — 29 hand-built inline SVG icons (no icon library dependency)

---

## 7. Responsive behaviour

Breakpoints already implemented: **1040 px** (component internals), **980 px** (page grid), **660 px** / **600 px** (mobile).

- Nav collapses to a hamburger below 980 px.
- Research grid: 4 cols → 2 → 1. Mechanisms: 4 → 2 → 1.
- Pipeline stepper unsticks and centres above 980 px; Etymology and Terminal stack.
- Hero ribbon de-emphasises as described in 5.2.

Verify on a real device at 375 px, not just devtools.

---

## 8. Accessibility requirements

Already implemented — preserve all of it:

- `prefers-reduced-motion: reduce` disables animation globally *and* inside every component.
- Decorative SVG/imagery carries `aria-hidden="true"`; component frames carry descriptive `role="img"` + `aria-label`.
- All interactive controls are real `<button>` / `<a>` elements.
- Hamburger has `aria-label`.

Still to do:
- Verify contrast on `--ink-dim` (#aaa4ba) over `--void` — it passes AA for body text but check any small-size usage.
- Add visible focus states for keyboard navigation (the prototype relies on browser defaults, which are weak on a dark background).
- Add a skip-to-content link.
- Confirm the ticker marquee is pausable or non-distracting (WCAG 2.2.2 — moving content over 5 s).

---

## 9. Acceptance checklist

- [ ] Nav/hero say **VYUHA**; QWORP appears no earlier than the Pipeline section
- [ ] No Sharpe / Calmar / drawdown / win-rate / confidence-% claims anywhere
- [ ] Terminal caption "illustrative UI, not live account data" present
- [ ] Terminal shows NIFTY 50 consistently across all four price touchpoints
- [ ] Fraunces serif appears **only** on the Etymology heading
- [ ] Rotating/circular motion appears **only** in the Etymology section
- [ ] Green = up/systematic, red = down/discretionary, purple = brand — no decorative misuse
- [ ] Hero image served as a real cached file, not a base64 data URI
- [ ] `prefers-reduced-motion` verified in browser settings
- [ ] Components pause when scrolled out of view
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95
- [ ] Tested Chrome, Safari, Firefox + iOS Safari and Android Chrome
- [ ] All external links open correctly with `rel="noopener"`

---

## 10. Suggested delivery order

1. Scaffold + tokens + fonts + nav/footer shell
2. Extract and wire the three motion components; confirm they render and animate
3. Extract the hero image to a real asset; build the hero
4. Build the static-content sections (Etymology, Research, Mechanisms, Vision, Contact)
5. Build the interactive sections (Why-Quant toggle, Pipeline scroll-sync)
6. Responsive pass
7. Accessibility + performance pass
8. Analytics, meta/OG tags, deploy


