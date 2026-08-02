// Verbatim from qworp-vyuha-redesign.html's STAGES/RESEARCH/MECH_GROUPS
// data arrays (lines 1101-1107, 1165-1174, 1189-1214) — copy is approved,
// don't rewrite it. `icon` keys index into src/lib/icons.ts's ICONS map.

export const STAGES = [
  { icon: "data", title: "Data", copy: "NSE & BSE, timestamped at source. Nothing enters the pipeline unverified." },
  { icon: "features", title: "Features", copy: "Raw series broken down into structured, testable signal." },
  { icon: "models", title: "Models", copy: "Walk-forward validated — never fit on data it will later be judged on." },
  { icon: "signals", title: "Signals", copy: "Statistically significant, and bounded by explicit risk limits." },
  { icon: "execution", title: "Execution", copy: "A validated signal, routed as a disciplined, systematic order." },
] as const;

export const RESEARCH = [
  { icon: "equity", title: "Equity Derivatives", copy: "Futures and options across NSE & BSE, from index to single stock." },
  { icon: "volatility", title: "Volatility & Options", copy: "Implied volatility surfaces, skew and term structure, modelled continuously." },
  { icon: "openinterest", title: "Open Interest & Positioning", copy: "Reading where the market is leaning, strike by strike." },
  { icon: "microstructure", title: "Market Microstructure", copy: "Order-book depth, liquidity and short-term flow." },
  { icon: "crosssectional", title: "Cross-Sectional Equity", copy: "Ranking hundreds of stocks against each other, not the calendar." },
  { icon: "statarb", title: "Statistical Arbitrage", copy: "Mean-reverting relationships between related instruments, traded systematically." },
  { icon: "portfoliorisk", title: "Portfolio & Risk", copy: "Sizing, allocation and drawdown control, bounded by explicit limits." },
  { icon: "sysexec", title: "Systematic Execution", copy: "A validated signal, turned into a disciplined order." },
] as const;

export const MECH_GROUPS = [
  {
    roman: "I",
    name: "Signal Discovery",
    items: [
      { icon: "funnel", title: "Feature Engineering", copy: "Raw series into structured, testable signal." },
      { icon: "bars", title: "Statistical Factors", copy: "Return drivers, isolated and measured." },
      { icon: "podium", title: "Cross-Sectional Ranking", copy: "Ranked against peers, not the calendar." },
      { icon: "clock", title: "Rolling Window Analysis", copy: "Recomputed continuously as data arrives." },
    ],
  },
  {
    roman: "II",
    name: "Market Behaviour",
    items: [
      { icon: "pullin", title: "Mean Reversion", copy: "The pull back to equilibrium." },
      { icon: "trendup", title: "Momentum", copy: "The persistence of an existing trend." },
      { icon: "radar", title: "Market Regime Detection", copy: "Trending, ranging or volatile — classified." },
      { icon: "brain", title: "Machine Learning", copy: "Pattern recognition, earning its place." },
    ],
  },
  {
    roman: "III",
    name: "Options & Volatility Intelligence",
    items: [
      { icon: "wave", title: "Volatility Modelling", copy: "Forecasting the dispersion of returns." },
      { icon: "oibars", title: "Open Interest Analysis", copy: "Positioning, read across the options chain." },
      { icon: "delta", title: "Greeks", copy: "Delta, gamma, theta, vega — tracked live." },
      { icon: "gamma", title: "Dealer Gamma", copy: "How hedging flows shape price action." },
    ],
  },
  {
    roman: "IV",
    name: "Portfolio, Validation & Execution",
    items: [
      { icon: "calcheck", title: "Walk-Forward Validation", copy: "Tested only on data never seen." },
      { icon: "pie", title: "Portfolio Optimisation", copy: "Capital allocated under explicit constraints." },
      { icon: "shieldcheck", title: "Risk Models", copy: "Exposure and drawdown, bounded." },
      { icon: "routearrow", title: "Execution Algorithms", copy: "Sequenced to minimise slippage." },
    ],
  },
] as const;
