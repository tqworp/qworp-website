/*
 * Three dependency-free Web Components (Shadow DOM, no framework, no
 * build step) — ported verbatim from qworp-vyuha-redesign.html's inline
 * <script type="module"> block. The one deliberate change: VyuhaHero's
 * hero ribbon is a real, cached image with a srcset instead of a 101,696-
 * character base64 data URI inlined in the template (see the productionisation
 * brief §5.2 — that single string was ~55% of the original page's byte weight).
 *
 * Everything else — tokens, markup, animation timings, all three
 * components' internals — is unchanged from the source file. If you touch
 * this file, check it against qworp-vyuha-redesign.html first: the file
 * is the source of truth, this is its production copy.
 */
const TOKENS = `
  :host {
    --vy-bg: #070612;
    --vy-bg-2: #0d0a20;
    --vy-panel: rgba(17, 14, 38, 0.68);
    --vy-panel-strong: rgba(13, 10, 31, 0.9);
    --vy-line: rgba(187, 152, 255, 0.24);
    --vy-line-strong: rgba(196, 164, 255, 0.58);
    --vy-purple: #aa78ff;
    --vy-purple-bright: #d6c0ff;
    --vy-purple-deep: #6e3de8;
    --vy-rose: #f4a0b8;
    --vy-bronze: #d79a76;
    --vy-text: #f7f5fb;
    --vy-muted: #aaa4ba;
    --vy-gain: #62cfa0;
    --vy-loss: #de6878;
    --vy-radius: 22px;
    --vy-loop-fast: 2s;
    --vy-loop-medium: 5s;
    --vy-loop-slow: 8s;
    --vy-loop-ticker: 24s;
    display: block;
    color: var(--vy-text);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    contain: content;
  }
  *, *::before, *::after { box-sizing: border-box; }
  .frame {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    background:
      radial-gradient(circle at 78% 36%, rgba(107, 61, 232, .22), transparent 34%),
      radial-gradient(circle at 46% 88%, rgba(136, 85, 255, .12), transparent 35%),
      linear-gradient(135deg, var(--vy-bg) 0%, var(--vy-bg-2) 55%, #080713 100%);
  }
  .frame::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: .23;
    background-image:
      linear-gradient(rgba(190,160,255,.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(190,160,255,.035) 1px, transparent 1px);
    background-size: 52px 52px;
    mask-image: linear-gradient(to bottom, #000, transparent 92%);
  }
  .eyebrow {
    color: #c09bff;
    font: 600 clamp(.68rem, 1vw, .84rem)/1.2 "SFMono-Regular", Consolas, monospace;
    letter-spacing: .1em;
    text-transform: uppercase;
  }
  .wordmark {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: Manrope, Inter, sans-serif;
    font-weight: 600;
    letter-spacing: .42em;
    font-size: clamp(.92rem, 1.25vw, 1.15rem);
  }
  .mark { width: 34px; height: 34px; }
  .panel {
    border: 1px solid var(--vy-line);
    background: linear-gradient(180deg, rgba(24,18,49,.72), rgba(9,8,24,.7));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.025), 0 20px 70px rgba(0,0,0,.22);
    backdrop-filter: blur(14px);
  }
  .is-paused *, .is-paused *::before, .is-paused *::after {
    animation-play-state: paused !important;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: .001ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
    }
  }
`;

const MARK = `
<svg class="mark" viewBox="0 0 48 48" aria-hidden="true">
  <defs>
    <linearGradient id="mark-g" x1="4" y1="4" x2="44" y2="44">
      <stop stop-color="#e0cfff"/><stop offset=".5" stop-color="#9d67ff"/><stop offset="1" stop-color="#f2a4bc"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke="url(#mark-g)" stroke-width="1.7" opacity=".95">
    <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(18 24 24)"/>
    <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(62 24 24)"/>
    <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(106 24 24)"/>
    <ellipse cx="24" cy="24" rx="17" ry="12" transform="rotate(150 24 24)"/>
  </g>
</svg>`;

class MotionElement extends HTMLElement {
  static get observedAttributes() { return ['paused']; }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._io = null;
    this._reduced = matchMedia('(prefers-reduced-motion: reduce)');
    this._onReduced = () => this._syncPlayback();
  }
  connectedCallback() {
    this.render();
    this._setupVisibility();
    this._reduced.addEventListener?.('change', this._onReduced);
    this._syncPlayback();
  }
  disconnectedCallback() {
    this._io?.disconnect();
    this._reduced.removeEventListener?.('change', this._onReduced);
  }
  attributeChangedCallback() { this._syncPlayback(); }
  _setupVisibility() {
    this._io?.disconnect();
    this._io = new IntersectionObserver(([entry]) => {
      this._visible = entry.isIntersecting;
      this._syncPlayback();
      if (entry.isIntersecting) this._runCounters();
    }, { threshold: .08 });
    this._io.observe(this);
  }
  _syncPlayback() {
    if (!this.shadowRoot) return;
    const paused = this.hasAttribute('paused') || this._reduced.matches || this._visible === false;
    this.shadowRoot.querySelector('.frame')?.classList.toggle('is-paused', paused);
    this.shadowRoot.querySelectorAll('svg').forEach(svg => {
      if (typeof svg.pauseAnimations !== 'function') return;
      try { paused ? svg.pauseAnimations() : svg.unpauseAnimations(); } catch (_) {}
    });
  }
  _runCounters() {
    this.shadowRoot.querySelectorAll('[data-count]').forEach(el => {
      if (el.dataset.ran) return;
      el.dataset.ran = '1';
      const target = Number(el.dataset.count);
      const decimals = Number(el.dataset.decimals || 0);
      const suffix = el.dataset.suffix || '';
      const duration = 1050;
      const start = performance.now();
      const tick = now => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
  play() { this.removeAttribute('paused'); }
  pause() { this.setAttribute('paused', ''); }
}

class VyuhaHero extends MotionElement {
  render() {
    const headline = this.getAttribute('headline') || 'Structured.|Tactical.|Precise.';
    const lines = headline.split('|').map(line => `<span>${line}</span>`).join('');
    const eyebrow = this.getAttribute('eyebrow') || 'AI-DRIVEN QUANT ENGINE';
    const description = this.getAttribute('description') || 'Disciplined AI trading systems from Vyuha. Built for signal detection, risk control, and execution.';
    const domains = Number(this.getAttribute('domains') || 8);
    const mechanisms = Number(this.getAttribute('mechanisms') || 16);
    const exchanges = Number(this.getAttribute('exchanges') || 2);

    this.shadowRoot.innerHTML = `
      <style>
        ${TOKENS}
        .frame { min-height: min(900px, 92vh); border-radius: inherit; background: transparent; }
        /* Not in the source file — added after removing Hero's .container
           wrapper made it full-bleed. At very wide viewports, object-
           position:74% 42% keeps the same anchor point but the fixed
           900px cap means object-fit:cover reveals more of the image's
           own emptier region to the right, reading as sparse. Letting
           .frame grow taller (bounded by 92vh so it never fills the
           screen) shows more of the image vertically instead, which is
           the fix — not touching object-position, which only changes
           *which* part shows, not how much of it does. 52vw is a
           starting point from visual iteration, not a derived constant;
           adjust if a wider viewport still reads sparse. */
        @media (min-width: 1700px) {
          .frame { min-height: min(92vh, 52vw); }
        }
        .art { position: absolute; inset: 0; z-index: 0; opacity: .68;
          -webkit-mask-image: linear-gradient(100deg, transparent 0%, transparent 6%, black 42%, black 100%);
          mask-image: linear-gradient(100deg, transparent 0%, transparent 6%, black 42%, black 100%);
        }
        .art::after { content:""; position:absolute; inset:0; pointer-events:none;
          background: linear-gradient(to bottom, var(--vy-bg) 0%, transparent 14%, transparent 86%, var(--vy-bg) 100%);
        }
        .art img { width: 100%; height: 100%; object-fit: cover; object-position: 74% 42%; display: block; }
        .shell { position: relative; z-index: 2; min-height: inherit; padding: clamp(28px, 4.5vw, 72px); display: flex; flex-direction: column; }
        .brand { }
        .copy { max-width: 680px; padding-top: 4vh; z-index: 3; flex: 1; display: flex; flex-direction: column; justify-content: center; }
        .eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: clamp(24px, 4vh, 42px); }
        .eyebrow::after { content:""; width: min(260px, 28vw); height: 1px; background: linear-gradient(90deg, #a36cff, transparent); box-shadow: 90px 0 14px #8f5bff; }
        h1 { margin: 0; font: 800 clamp(3.5rem, 6.5vw, 7.5rem)/.92 Manrope, Inter, sans-serif; letter-spacing: -.065em; }
        h1 span { display: block; }
        p { margin: clamp(22px,3vh,34px) 0 0; color: var(--vy-muted); font-size: clamp(1rem, 1.35vw, 1.28rem); line-height: 1.55; max-width: 650px; }
        .stats { align-self: flex-start; margin-top: clamp(28px,5vh,56px); display: grid; grid-template-columns: repeat(3, 1fr); border-radius: 18px; overflow: hidden; min-width: min(720px, 95vw); }
        .stat { padding: clamp(18px, 2.2vw, 28px); position: relative; }
        .stat + .stat::before { content:""; position:absolute; left:0; top:22%; bottom:22%; width:1px; background: rgba(202,174,255,.18); }
        .label { color:#b98cff; font-size: clamp(.8rem, 1vw, 1rem); margin-bottom: 9px; }
        .value-row { display:flex; align-items:flex-end; gap: 14px; }
        .value { font: 500 clamp(2rem, 3.2vw, 3.4rem)/1 Manrope, Inter, sans-serif; letter-spacing:-.04em; }
        .spark { width: 90px; height: 28px; }
        .spark path { stroke-dasharray: 140; stroke-dashoffset: 140; animation: draw var(--vy-loop-medium) ease-in-out infinite; }
        .spark circle { animation: blink var(--vy-loop-fast) ease-in-out infinite; }
        @keyframes draw { 0%,15%{stroke-dashoffset:140;opacity:.35} 55%,90%{stroke-dashoffset:0;opacity:1} 100%{stroke-dashoffset:0;opacity:.35} }
        @keyframes blink { 50%{opacity:.25;filter:drop-shadow(0 0 1px #9d67ff)} }
        .ambient { position:absolute; inset:0; pointer-events:none; opacity:.9; }
        .orb { position:absolute; width:36vw; height:36vw; right:3%; top:9%; border-radius:50%; background:radial-gradient(circle, rgba(139,78,255,.2), transparent 65%); filter:blur(20px); animation:breathe var(--vy-loop-slow) ease-in-out infinite; }
        @keyframes breathe { 50%{transform:scale(1.1); opacity:.62} }
        @media (max-width: 1040px) {
          .frame { min-height: auto; }
          .shell { min-height:auto; }
          .art { opacity:.42; mask-image: linear-gradient(180deg, transparent 0%, black 55%, black 100%); -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 55%, black 100%); }
          .art img { object-position: 70% 60%; }
          .stats { min-width:0; width:100%; }
        }
        @media (max-width: 660px) {
          .shell { padding:24px; }
          .wordmark { letter-spacing:.28em; }
          h1 { font-size: clamp(3rem, 15vw, 4.6rem); }
          .stats { grid-template-columns:1fr; }
          .stat + .stat::before { top:0; left:18px; right:18px; bottom:auto; width:auto; height:1px; }
          .spark { margin-left:auto; }
        }
      </style>
      <section class="frame" role="img" aria-label="VYUHA institutional AI quant engine hero">
        <div class="orb"></div>
        <div class="art" aria-hidden="true">
          <img
            src="/images/hero-ribbon.webp"
            srcset="/images/hero-ribbon-640w.webp 640w, /images/hero-ribbon-900w.webp 900w, /images/hero-ribbon.webp 1500w"
            sizes="100vw"
            loading="eager"
            fetchpriority="high"
            alt=""
          />
        </div>
        <div class="shell">
          <div class="brand"><div class="wordmark">${MARK}<span>VYUHA</span></div></div>
          <div class="copy">
            <div class="eyebrow">${eyebrow}</div>
            <h1>${lines}</h1>
            <p>${description}</p>
          </div>
          <div class="stats panel">
            ${this.stat('Research Domains', domains, 0, '')}
            ${this.stat('Quant Mechanisms', mechanisms, 0, '')}
            ${this.stat('Exchanges Covered', exchanges, 0, '')}
          </div>
        </div>
      </section>`;
  }
  stat(label, value, decimals, suffix) {
    return `<div class="stat"><div class="label">${label}</div><div class="value-row"><div class="value" data-count="${value}" data-decimals="${decimals}" data-suffix="${suffix}">${value.toFixed(decimals)}${suffix}</div><svg class="spark" viewBox="0 0 100 30" aria-hidden="true"><path d="M2 20 C12 4 17 11 26 18 S42 28 50 18 S64 6 72 11 S87 14 98 8" fill="none" stroke="#a876ff" stroke-width="1.7"/><circle cx="98" cy="8" r="2" fill="#d9c5ff"/></svg></div></div>`;
  }
}

class QworpEngine extends MotionElement {
  render() {
    const nodes = [
      ['Signal Detection', 'signal', 190, 155, 1],
      ['Execution Speed', 'bolt', 135, 325, 2],
      ['Backtesting', 'dots', 220, 505, 3],
      ['Risk Engine', 'shield', 810, 155, 4],
      ['Adaptive Sizing', 'diamond', 865, 325, 5],
      ['Market Data Feed', 'bars', 780, 505, 6],
    ];
    const nodeMarkup = nodes.map(([label, icon, x, y, i]) => this.node(label, icon, x, y, i)).join('');
    const links = [
      ['M 390 250 L 320 215 L 275 190', 1], ['M 355 325 L 265 325 L 225 325', 2], ['M 390 405 L 325 450 L 285 478', 3],
      ['M 610 250 L 680 215 L 725 190', 4], ['M 645 325 L 735 325 L 775 325', 5], ['M 610 405 L 675 450 L 715 478', 6]
    ];
    const linkMarkup = links.map(([d,i]) => `<path id="qe-link-${i}" d="${d}" class="link"/><circle r="3.5" fill="#e1d2ff" filter="url(#qe-glow)"><animateMotion dur="${5.3 + i*.25}s" begin="${i*.32}s" repeatCount="indefinite"><mpath href="#qe-link-${i}"/></animateMotion></circle>`).join('');
    this.shadowRoot.innerHTML = `
      <style>
        ${TOKENS}
        .frame { aspect-ratio: 8 / 5; min-height: 470px; border-radius: inherit; }
        svg.diagram { position:absolute; inset:0; width:100%; height:100%; z-index:2; }
        .link { fill:none; stroke:#aa7cff; stroke-opacity:.5; stroke-width:1.5; stroke-dasharray:5 8; animation:flow var(--vy-loop-medium) linear infinite; }
        .node { transform-box:fill-box; transform-origin:center; animation:nodePulse var(--vy-loop-medium) ease-in-out infinite; }
        .node .hex { fill:rgba(11,9,28,.82); stroke:#ba91ff; stroke-opacity:.64; stroke-width:1.7; }
        .node .inner { fill:none; stroke:#d4bdff; stroke-opacity:.14; }
        .node text { fill:#f2eff8; font:500 18px Inter, sans-serif; text-anchor:middle; }
        .node .icon { fill:none; stroke:#b780ff; stroke-width:2.2; stroke-linecap:round; stroke-linejoin:round; }
        /* core-ring-outer/core-ring-inner previously rotated independently
           (spin 26s / spinReverse -18s, both infinite, renamed from
           core-spin/core-spin-reverse) — now static, no animation property
           at all. The outer .core-breathe group's scale pulse is the only
           motion the assembly has. Per brief §2.5: no rotating motion
           outside Etymology, not even a "diegetic" one on a machine-like
           element. See vyuha-website-revamp-brief.md §2.5. */
        .core-ring-outer { transform-origin:500px 325px; }
        .core-ring-inner { transform-origin:500px 325px; }
        .core-breathe { transform-origin:500px 325px; animation:coreBreath var(--vy-loop-medium) ease-in-out infinite; }
        .core-label { text-anchor:middle; fill:#fff; font-family:Manrope, Inter, sans-serif; }
        .core-label.q { font-size:80px; font-weight:700; fill:url(#qe-text); }
        .core-label.small { font-size:16px; letter-spacing:.28em; font-weight:600; }
        @keyframes flow { to{stroke-dashoffset:-52} }
        @keyframes nodePulse { 0%,100%{opacity:.78;filter:drop-shadow(0 0 0 rgba(157,103,255,0))} 50%{opacity:1;filter:drop-shadow(0 0 10px rgba(157,103,255,.35))} }
        @keyframes coreBreath { 50%{transform:scale(1.025);filter:drop-shadow(0 0 24px rgba(166,105,255,.55))} }
        @media (max-width:760px){ .frame{min-height:440px;aspect-ratio:auto}.node text{font-size:15px} }
      </style>
      <section class="frame" role="img" aria-label="QWORP engine with six connected pillars">
        <svg class="diagram" viewBox="0 0 1000 625" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <radialGradient id="qe-core"><stop stop-color="#efe8ff"/><stop offset=".2" stop-color="#b47bff"/><stop offset=".55" stop-color="#6134c4"/><stop offset="1" stop-color="#0a0718"/></radialGradient>
            <linearGradient id="qe-metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eadfff"/><stop offset=".18" stop-color="#7541db"/><stop offset=".42" stop-color="#180d2d"/><stop offset=".65" stop-color="#d9b3ff"/><stop offset=".83" stop-color="#d5967b"/><stop offset="1" stop-color="#7440da"/></linearGradient>
            <linearGradient id="qe-text" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".5" stop-color="#c7a9ff"/><stop offset="1" stop-color="#8d54ee"/></linearGradient>
            <filter id="qe-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="qe-soft"><feGaussianBlur stdDeviation="28"/></filter>
          </defs>
          <ellipse cx="500" cy="340" rx="220" ry="160" fill="#7742df" opacity=".12" filter="url(#qe-soft)"/>
          <g>${linkMarkup}</g>
          <g class="core-breathe">
            <polygon points="500,180 620,250 620,400 500,470 380,400 380,250" fill="rgba(10,8,25,.94)" stroke="url(#qe-metal)" stroke-width="3"/>
            <circle cx="500" cy="325" r="124" fill="none" stroke="#a875ff" stroke-opacity=".18" stroke-width="16"/>
            <g class="core-ring-outer">
              <circle cx="500" cy="325" r="114" fill="none" stroke="url(#qe-metal)" stroke-width="3" stroke-dasharray="2 12 34 8"/>
              ${Array.from({length:24},(_,i)=>`<line x1="500" y1="203" x2="500" y2="217" stroke="#b888ff" stroke-opacity="${i%3===0?.8:.28}" transform="rotate(${i*15} 500 325)"/>`).join('')}
            </g>
            <g class="core-ring-inner">
              <circle cx="500" cy="325" r="91" fill="none" stroke="#dfc8ff" stroke-opacity=".45" stroke-width="2" stroke-dasharray="44 9 7 12"/>
              <circle cx="500" cy="325" r="78" fill="none" stroke="#d59d7f" stroke-opacity=".32" stroke-width="1.5" stroke-dasharray="5 8"/>
            </g>
            <circle cx="500" cy="325" r="67" fill="url(#qe-core)" stroke="#d7c0ff" stroke-opacity=".7"/>
            <text x="500" y="334" class="core-label q">Q</text>
            <text x="500" y="375" class="core-label small">QWORP ENGINE</text>
          </g>
          ${nodeMarkup}
        </svg>
      </section>`;
  }
  node(label, icon, x, y, index) {
    const [a,b=''] = label.split(/ (?=[A-Z])/).length > 2 ? [label.split(' ').slice(0,-1).join(' '), label.split(' ').slice(-1)] : label.split(/ (?=[A-Z])/);
    const path = this.icon(icon);
    return `<g class="node" style="animation-delay:-${index*.55}s" transform="translate(${x} ${y})"><polygon class="hex" points="0,-74 65,-37 65,37 0,74 -65,37 -65,-37"/><polygon class="inner" points="0,-68 59,-34 59,34 0,68 -59,34 -59,-34"/>${path}<text y="32">${a}</text>${b?`<text y="54">${b}</text>`:''}</g>`;
  }
  icon(type) {
    if (type==='signal') return `<g class="icon"><circle r="24" cy="-18"/><circle r="15" cy="-18"/><circle cx="17" cy="-34" r="3" fill="#c7a7ff" stroke="none"/></g>`;
    if (type==='bolt') return `<path class="icon" d="M8 -51 L-20 -16 H-3 L-12 12 L22 -28 H4 Z"/>`;
    if (type==='dots') return `<g fill="#b983ff" stroke="none">${[-18,0,18].flatMap(dx=>[-32,-14,4].map(dy=>`<circle cx="${dx}" cy="${dy}" r="4"/>`)).join('')}</g>`;
    if (type==='shield') return `<path class="icon" d="M0 -48 L30 -36 V-10 C30 10 17 23 0 31 C-17 23 -30 10 -30 -10 V-36 Z"/>`;
    if (type==='diamond') return `<path class="icon" d="M0 -50 L34 -27 L20 8 L0 25 L-20 8 L-34 -27 Z M-34 -27 H34 M0 -50 V25 M-20 8 L0 -27 L20 8"/>`;
    return `<g class="icon">${[-32,-20,-8,4].map((y,i)=>`<line x1="${-24+i*2}" y1="${y}" x2="${24-i*2}" y2="${y}"/>`).join('')}</g>`;
  }
}

class VyuhaMarketSignal extends MotionElement {
  render() {
    const candles = [
      [18,54,23,42,1],[30,45,22,34,1],[42,36,26,46,0],[54,48,30,38,1],[66,39,32,49,0],[78,51,37,44,1],[90,43,35,52,0],[102,54,41,47,1],[114,46,30,57,0],[126,58,42,50,1],[138,50,35,61,0],[150,62,44,56,1],
      [162,58,46,68,0],[174,70,53,64,1],[186,65,50,76,0],[198,77,58,68,1],[210,70,57,82,0],[222,84,64,76,1],[234,78,62,88,0],[246,90,70,82,1],[258,84,68,95,0],[270,96,76,88,1],
      [282,90,75,102,0],[294,104,82,96,1],[306,98,79,112,0],[318,113,90,104,1],[330,105,89,116,0],[342,118,94,109,1],[354,110,92,121,0],[366,122,98,114,1],
      [378,116,94,126,1],[390,108,86,119,1],[402,100,79,112,1],[414,92,72,104,1],[426,84,65,96,1],[438,76,58,89,1],[450,68,50,81,1],[462,60,44,72,1],[474,52,36,64,1],[486,44,28,57,1]
    ];
    const candleMarkup = candles.map(([x,open,high,low,up],i) => {
      const y = Math.min(open, low), h = Math.max(5, Math.abs(open-low));
      return `<g class="candle" style="--delay:${i*60}ms"><line x1="${x}" y1="${high}" x2="${x}" y2="${low+10}" class="wick ${up?'up':'down'}"/><rect x="${x-3.2}" y="${y}" width="6.4" height="${h}" rx="1" class="body ${up?'up':'down'}"/></g>`;
    }).join('');
    const ticker = [
      ['NIFTY','24,812.35','+0.61%','gain'],['BANKNIFTY','51,342.80','+0.84%','gain'],['SENSEX','81,463.20','+0.58%','gain'],['BTC','67,842.10','+1.21%','gain'],['DXY','104.27','-0.19%','loss'],['UST10Y','4.32%','-0.03%','loss']
    ];
    const tickerItems = ticker.map(([s,v,c,k])=>`<div class="tick"><b>${s}</b><span>${v}</span><em class="${k}">${c}</em></div>`).join('');
    this.shadowRoot.innerHTML = `
      <style>
        ${TOKENS}
        .frame { min-height:660px; border-radius:inherit; padding:clamp(24px,3.7vw,54px); display:grid; grid-template-columns:minmax(265px,.68fr) minmax(520px,1.6fr); grid-template-rows:1fr auto; gap:22px 32px; }
        .copy { z-index:3; align-self:start; padding-top:clamp(10px,2vw,24px); grid-row:1; }
        h2 { margin:20px 0 12px; font:800 clamp(2.4rem,4.5vw,5rem)/.98 Manrope,Inter,sans-serif; letter-spacing:-.055em; }
        .sub { margin:0 0 22px; color:var(--vy-muted); line-height:1.55; max-width:390px; }
        .cards { display:grid; gap:10px; }
        .card { border-radius:14px; padding:13px 15px; display:grid; grid-template-columns:42px 1fr auto; align-items:center; gap:10px; }
        .card-icon { width:38px;height:38px;border:1px solid rgba(180,132,255,.28);border-radius:12px;display:grid;place-items:center;color:#b580ff;background:rgba(134,73,255,.08); }
        .card-icon svg { width:22px;height:22px; }
        .mini-label { color:#bc91ff; font:600 10px/1.2 ui-monospace,monospace; letter-spacing:.09em; text-transform:uppercase; }
        .main-value { font:500 18px/1.3 Manrope,Inter,sans-serif; margin-top:3px; }
        .meta { color:#8f899b;font-size:10px;text-align:right; }
        .chart-wrap { z-index:3; min-width:0; display:flex; flex-direction:column; gap:12px; grid-row:1; }
        .chart { position:relative; min-height:0; flex:1; border-radius:18px; padding:14px; }
        .chart-head { display:flex; justify-content:space-between; align-items:center; color:#b7b0c3; font:600 11px/1 ui-monospace,monospace; letter-spacing:.04em; }
        .live { display:flex;align-items:center;gap:6px;color:#d6d1df; }.live i{width:7px;height:7px;border-radius:50%;background:var(--vy-gain);box-shadow:0 0 9px var(--vy-gain);animation:live var(--vy-loop-fast) ease-in-out infinite}
        .chart svg { width:100%; height:100%; min-height:300px; overflow:visible; }
        .grid line { stroke:#bca2e8; stroke-opacity:.09; stroke-dasharray:2 5; }
        .wick { stroke-width:1; opacity:.8; }.body.up,.wick.up{fill:var(--vy-gain);stroke:var(--vy-gain)}.body.down,.wick.down{fill:var(--vy-loss);stroke:var(--vy-loss)}
        .candle { transform-box:fill-box;transform-origin:center bottom;animation:barIn .55s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--delay); }
        .signal { fill:none; stroke:#9c62ff; stroke-width:2.4; filter:drop-shadow(0 0 6px #8a4eff); stroke-dasharray:720; stroke-dashoffset:720; animation:signalDraw var(--vy-loop-slow) ease-in-out infinite; }
        .signal-glow { fill:none; stroke:#8f54ff; stroke-width:12; opacity:.11; filter:blur(5px); }
        .entry-card { filter:drop-shadow(0 0 16px rgba(142,81,255,.4)); }
        .confidence { border-radius:13px; min-height:58px; display:grid;grid-template-columns:auto 1fr auto;gap:14px;align-items:center;padding:12px 16px; }
        .confidence svg { width:100%; height:30px; }.confidence path{fill:none;stroke:#aa70ff;stroke-width:1.5;stroke-dasharray:300;animation:micro var(--vy-loop-slow) linear infinite}.confidence strong{color:#af75ff;font:500 28px/1 Manrope,Inter,sans-serif}
        .ticker { grid-column:1/-1; grid-row:2; z-index:4; border-radius:13px; overflow:hidden; white-space:nowrap; }
        .ticker-track { display:flex; width:max-content; animation:ticker var(--vy-loop-ticker) linear infinite; }
        .tick { display:grid; grid-template-columns:auto auto auto; gap:12px; align-items:center; padding:15px 24px; border-right:1px solid rgba(190,160,255,.12); min-width:220px; font-size:13px; }
        .tick b{font-family:ui-monospace,monospace}.tick span{color:#e8e4ed}.tick em{font-style:normal}.gain{color:var(--vy-gain)}.loss{color:var(--vy-loss)}
        .liquid { position:absolute; right:-6%; bottom:-5%; width:30%; height:42%; z-index:2; opacity:.9; pointer-events:none; }
        @keyframes barIn { from{transform:scaleY(.05);opacity:0} }
        @keyframes signalDraw { 0%,8%{stroke-dashoffset:720;opacity:.2} 55%,90%{stroke-dashoffset:0;opacity:1} 100%{stroke-dashoffset:0;opacity:.2} }
        @keyframes live { 50%{opacity:.3;transform:scale(.72)} }
        @keyframes micro { to{stroke-dashoffset:-300} }
        @keyframes ticker { to{transform:translateX(-50%)} }
        @media(max-width:980px){.frame{aspect-ratio:auto;grid-template-columns:1fr;grid-template-rows:auto minmax(440px,1fr) auto}.copy{display:grid;grid-template-columns:1fr 1fr;gap:24px;grid-row:1}.copy-head{align-self:center}.cards{grid-template-columns:repeat(3,1fr)}.chart-wrap{grid-column:1;grid-row:2}.ticker{grid-column:1;grid-row:3}.liquid{width:42%;opacity:.55}}
        @media(max-width:700px){.frame{padding:22px;min-height:auto}.copy{display:block}.cards{grid-template-columns:1fr}.chart-wrap{min-height:480px}.chart{padding:10px}.tick{min-width:190px}.liquid{width:60%;right:-22%}}
      </style>
      <section class="frame" role="img" aria-label="VYUHA market signal and algorithmic execution interface">
        <div class="copy">
          <div class="copy-head"><div class="eyebrow">AI-DRIVEN QUANT ENGINE</div><h2>Market Signal.<br>Algo Execution.</h2><p class="sub">From real-time signal detection to institutional execution. Precision at machine speed.</p></div>
          <div class="cards">
            ${this.card('target','ENTRY SIGNAL','NIFTY 24,812.25','Signal confirmed','09:31:42.187')}
            ${this.card('bolt','LATENCY','0.42 ms','Exchange round-trip','09:31:42.189')}
            ${this.card('cube','EXECUTION','Filled @ 24,812.50','Execution routed','09:31:42.221')}
          </div>
        </div>
        <div class="chart-wrap">
          <div class="chart panel">
            <div class="chart-head"><span>NIFTY 50 · NSE INDEX&nbsp;&nbsp;&nbsp;1m</span><span class="live"><i></i>LIVE</span></div>
            <svg viewBox="0 0 520 260" preserveAspectRatio="none" aria-hidden="true">
              <defs><filter id="ms-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><linearGradient id="ms-metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e6dbff"/><stop offset=".25" stop-color="#6e36d1"/><stop offset=".55" stop-color="#1a0d2d"/><stop offset=".78" stop-color="#d7a7ff"/><stop offset="1" stop-color="#d3927c"/></linearGradient></defs>
              <g class="grid">${[40,80,120,160,200,240].map(y=>`<line x1="0" y1="${y}" x2="520" y2="${y}"/>`).join('')}${[60,120,180,240,300,360,420,480].map(x=>`<line x1="${x}" y1="20" x2="${x}" y2="245"/>`).join('')}</g>
              <g transform="translate(8 46) scale(1.02 1.08)">${candleMarkup}</g>
              <path class="signal-glow" d="M 10 207 C 60 148 92 138 130 174 S 195 224 245 159 S 315 132 350 161 S 414 128 510 55"/>
              <path id="signal-path" class="signal" d="M 10 207 C 60 148 92 138 130 174 S 195 224 245 159 S 315 132 350 161 S 414 128 510 55"/>
              <circle r="6" fill="#efe6ff" filter="url(#ms-glow)"><animateMotion dur="8s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".4 0 .2 1"><mpath href="#signal-path"/></animateMotion></circle>
              <g class="entry-card" transform="translate(236 46)"><rect width="108" height="54" rx="8" fill="rgba(15,10,35,.94)" stroke="#9d65f8" stroke-opacity=".65"/><text x="54" y="17" text-anchor="middle" fill="#c39eff" font-size="9" font-family="ui-monospace,monospace">ENTRY SIGNAL</text><text x="54" y="34" text-anchor="middle" fill="#fff" font-size="13" font-family="Inter,sans-serif">24,812.25</text><text x="54" y="47" text-anchor="middle" fill="#9f98ad" font-size="8">09:31:42.187</text></g>
            </svg>
          </div>
          <div class="confidence panel"><span class="mini-label">SIGNAL TRACE</span><svg viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 20 L18 16 L34 20 L50 12 L68 15 L84 8 L102 13 L120 11 L138 21 L156 15 L174 17 L192 10 L210 13 L228 8 L246 12 L264 5 L282 10 L300 7"/></svg><strong style="font:600 13px/1 ui-monospace,monospace;color:#af75ff;letter-spacing:.08em;">SAMPLE</strong></div>
        </div>
        <div class="ticker panel"><div class="ticker-track">${tickerItems}${tickerItems}</div></div>
        <svg class="liquid" viewBox="0 0 420 260" aria-hidden="true"><defs><linearGradient id="liq" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eadfff"/><stop offset=".22" stop-color="#713bda"/><stop offset=".52" stop-color="#120a22"/><stop offset=".72" stop-color="#c99aff"/><stop offset=".88" stop-color="#e2a087"/><stop offset="1" stop-color="#6c36cc"/></linearGradient><filter id="lg"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path d="M18 220 C76 160 84 36 176 42 C268 48 238 184 310 184 C354 184 370 118 418 90" fill="none" stroke="#10091f" stroke-width="50" stroke-linecap="round"/><path d="M18 220 C76 160 84 36 176 42 C268 48 238 184 310 184 C354 184 370 118 418 90" fill="none" stroke="url(#liq)" stroke-width="37" stroke-linecap="round" filter="url(#lg)"><animate attributeName="d" dur="9s" repeatCount="indefinite" values="M18 220 C76 160 84 36 176 42 C268 48 238 184 310 184 C354 184 370 118 418 90;M8 220 C84 180 98 52 184 54 C270 56 244 164 318 178 C368 188 382 126 422 106;M18 220 C76 160 84 36 176 42 C268 48 238 184 310 184 C354 184 370 118 418 90"/></path></svg>
      </section>`;
  }
  card(icon,label,value,sub,time){
    const icons={target:'<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>',bolt:'<path d="M14 1L5 13h6l-2 10 10-13h-6z"/>',cube:'<path d="M12 2l8 5v10l-8 5-8-5V7zM4 7l8 5 8-5M12 12v10"/>'};
    return `<div class="card panel"><div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">${icons[icon]}</svg></div><div><div class="mini-label">${label}</div><div class="main-value">${value}</div><div class="meta" style="text-align:left">${sub}</div></div><div class="meta">${time}</div></div>`;
  }
}

customElements.define('vyuha-hero', VyuhaHero);
customElements.define('qworp-engine', QworpEngine);
customElements.define('vyuha-market-signal', VyuhaMarketSignal);

export { VyuhaHero, QworpEngine, VyuhaMarketSignal };
