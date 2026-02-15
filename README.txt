# Retirement Withdrawal Strategy Simulator

**An open-source tool for testing retirement withdrawal strategies using historical U.S. market data (1926–2024), five Monte Carlo simulation methods, and five configurable withdrawal strategies.**

This simulator replicates William Bengen's original 1994 methodology, implements industry-standard approaches used by Morningstar and others, and introduces Narrative Monte Carlo — an original simulation method designed to preserve the internal coherence of real market sequences.

Built for hobbyists, researchers, and anyone who wants to understand the tradeoffs between spending more now, spending steadily, and not running out of money.

> **Not financial advice.** This is an educational and research tool. Real retirement planning involves Social Security, taxes, healthcare, and many factors this tool does not model.

---

## Features

- **Five withdrawal strategies:** Fixed Real (Bengen), Forgo Inflation (Morningstar), Guardrails (Guyton-Klinger), Smoothed % (Yale/Vanguard), RMD-Based
- **Six analysis methods:** Historical rolling periods, i.i.d. Monte Carlo, block bootstrap, regime-switching, CAPE-conditioned, and Narrative Monte Carlo ★
- **Single Strategy mode:** Deep analysis of one strategy — percentile fans, success sweep, clickable year-by-year detail (historical method)
- **Compare mode:** Pit 2–5 strategies against each other under identical conditions — success rates, median spending, spending volatility, terminal values
- **Real / Nominal toggle:** All charts in constant purchasing power or raw dollars
- **Full documentation:** In-app user guide, methodology notes, academic citations, and version history

---

## Quick Start



### Project structure

```
retirement-sim/
├── src/
│   ├── App.tsx          # The simulator (single-file React component)
│   └── main.tsx         # Entry point
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

### Dependencies

- React 18
- Recharts (charting)
- Vite (build tool)
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin)

---

## Data

Returns reconstructed from publicly available sources:

- **Stocks:** S&P 500 total returns from Robert Shiller's dataset
- **Bonds:** Intermediate-term U.S. government bond proxies from FRED
- **Inflation:** CPI from Shiller/FRED
- **CAPE:** Cyclically Adjusted P/E ratio from Shiller

Coverage: 1926–2024 (99 years). The 1926 start date matches Bengen's original work and the consensus starting point in retirement planning research. This closely replicates but is not identical to the proprietary Ibbotson SBBI dataset.

---

## Simulation Methods

| Method | Based On | Key Feature |
|---|---|---|
| Historical Rolling | Bengen (1994) | Actual sequences as they happened |
| i.i.d. Monte Carlo | Morningstar / industry standard | Independent random year sampling |
| Block Bootstrap | Portfolio Visualizer | Contiguous multi-year blocks (default 7yr) |
| Regime-Switching | Ang & Bekaert (2002) | Markov chain on crisis/bear/normal/bull |
| CAPE-Conditioned | Fitzpatrick & Tharp (2023) | Two-phase: CAPE-similar starts → unconditional bootstrap |
| Narrative MC ★ | Original | Regime transitions + coherent historical episode playback |

---

## Withdrawal Strategies

| Strategy | Based On | Mechanism |
|---|---|---|
| Fixed Real | Bengen (1994) | Constant inflation-adjusted withdrawal |
| Forgo Inflation | Morningstar (Benz et al.) | Skip CPI adjustment after portfolio loss years |
| Guardrails | Guyton & Klinger (2006) | Adjust when withdrawal/portfolio ratio drifts outside band |
| Smoothed % | Yale Endowment / Vanguard | Blend prior spending with portfolio target (Yale) or cap annual changes (Vanguard) |
| RMD-Based | IRS RMD concept (simplified) | Portfolio ÷ remaining years; always 100% survival |

---

## Documentation

- **[Guide to Retirement Withdrawals](./GUIDE.md)** — A plain-language companion covering the history, all strategies and methods, how to read the charts, key concepts, suggested explorations, and known limitations. Start here if you're new to the field.
- **In-app reference** — Click "User Guide, Methodology & References" at the bottom of the simulator for quick-reference methodology notes, full citations, and version history.

---

## Known Limitations

- **U.S. only.** All methods draw from one country's unusually strong market history (Dimson, Marsh & Staunton, 2002).
- **99 years.** CAPE conditioning splits limited data into small buckets. Use as directional context.
- **No taxes, Social Security, healthcare, or dynamic spending needs.**
- **RMD is simplified** (1/N divisor, not actual IRS life expectancy tables).
- **Narrative MC is unvalidated** — original method, not peer-reviewed.

---

## References

- Bengen, W.P. (1994). "Determining Withdrawal Rates Using Historical Data." *Journal of Financial Planning*, 7(4), 171–180.
- Guyton, J.T. & Klinger, W.J. (2006). "Decision Rules and Maximum Initial Withdrawal Rates." *Journal of Financial Planning*, 19(3), 49–57.
- Fitzpatrick, D. & Tharp, D. (2023). "Evaluating Monte Carlo Models for Retirement Planning." Income Lab / Kitces.com.
- Benz, C., Ptak, J. & Rekenthaler, J. (2024). "The State of Retirement Income." Morningstar Research.
- Dimson, E., Marsh, P. & Staunton, M. (2002). *Triumph of the Optimists*. Princeton University Press.
- Shiller, R.J. Online Data. econ.yale.edu/~shiller/data.htm

---

## Version History

| Version | Changes |
|---|---|
| v1.1 | Unified single-page layout. Strategy/method as independent dropdowns. Single/Compare mode toggle. In-app user guide. Guardrails attribution. |
| v1.0 | Five simulation engines, five withdrawal strategies, three-tab layout, Shiller/FRED data 1926–2024. |

---

## License

MIT
