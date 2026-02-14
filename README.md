# Retirement Withdrawal Strategy Simulator

**An open-source tool for testing retirement withdrawal strategies using historical U.S. market data (1926–2024), five Monte Carlo simulation methods, and five configurable withdrawal strategies.**

This simulator replicates William Bengen's original 1994 methodology, implements industry-standard approaches used by Morningstar and others, and introduces Narrative Monte Carlo — an original simulation method designed to preserve the internal coherence of real market sequences.

Built for hobbyists, researchers, and anyone who wants to understand the tradeoffs between spending more now, spending steadily, and not running out of money.

> **Not financial advice.** This is an educational and research tool. Real retirement planning involves Social Security, taxes, healthcare, and many factors this tool does not model.

---


## Strategy Descriptions

### Fixed Real

Start with a fixed real withdrawal — at that rate, draw the ratio of your current withdrawal to your current portfolio value. Up that rate if drift above; lower if drift below. Lower and single digits: You're withdrawing too much relative to what you have, cut back. The spending cut is real and single-year: Don't drag three random back years.

This replicates William Bengen's historical cohort-year analysis. It works well for long stretches, punctuated by occasional step-changes when markets move significantly. The guardrail parameters (bandwidth, cut/raise size) are all adjustable.

### Guardrails

Start with a fixed percent withdrawal at your initial age, cap spend moves (typically max increase ±X%, max decrease Y%). Floor prevents spending from ever falling below a set percentage of your initial amount.

Guardrails combine two anchors — an spending floor to avoid catastrophic declines, and volatility caps to smooth the ride. This was designed for perpetual endowments but translates well to retirement. The smoothing weight is a direct dial on how aggressively spending tracks market reality versus maintaining stability.

### Smoothed % (Yale / Vanguard)

Two models sharing a common philosophy — let spending track the portfolio, but smooth the ride.

**Yale Model** blends two anchors each year — X% last year's spending adjusted for inflation, and Y% a target percentage of the current portfolio value. The smoothing weight controls the blend: mean's you're anchored to prior spending, responsive to the portfolio. This was designed for perpetual endowments but translates well to retirement. The smoothing weight is a direct dial on how aggressively spending tracks market reality versus maintaining stability.

**Vanguard Model** targets a percentage of the current portfolio each year, but caps how much spending can change year over year (typically ±X% maximum increase, Y% maximum decrease). The result is similar to Yale but with hard guardrails on annual volatility rather than a blending weight.

### Percentage of Portfolio

Withdraws a fraction of the portfolio each year based on remaining years (portfolio ÷ remaining horizon).
### Forgo Inflation

Morningstar's research approach. Like Fixed Real but with one twist — in years when the portfolio loses money, skip the inflation adjustment that year. The result is steady spending most of the time, with small real cuts during bear markets.

---

## Simulation Methods

### Historical Cohorts (1926–2024)

Uses actual market returns from 1926 through 2024 — 99 overlapping 30-year periods. For instance, someone retiring in 1966 experienced the stagflation of the 1970s; someone retiring in 2000 experienced the dot-com crash and 2008 crisis.

### Monte Carlo (5 Methods)

#### Standard Monte Carlo
Random draws from historical return distributions. Each simulation is independent.

#### Resampling Monte Carlo
Samples without replacement from the historical record — ensures each 30-year simulation uses 30 different actual years.

#### Block Bootstrap
Preserves multi-year patterns by sampling consecutive blocks of years (e.g., 5-year sequences) instead of individual years.

#### Autocorrelated Monte Carlo
Models the tendency of markets to exhibit momentum and mean reversion by adjusting correlations between consecutive years.

#### Narrative Monte Carlo (New)
Samples complete 30-year market sequences from history (1926-1956, 1927-1957, etc.), preserving the exact sequence of bull markets, bear markets, inflation shocks, and recovery periods that actually occurred together.

---

## Understanding the Metrics

### Success Rate
Percentage of simulations where the portfolio lasted the full 30-year period.

### Median End Balance
The middle outcome — half of simulations ended with more, half with less.

### 10th/90th Percentile End Balance
Shows the range of outcomes — the 10th percentile is the outcome that did worse than 90% of simulations (useful for understanding downside risk), and the 90th percentile shows upside potential.

### Spending Volatility
Standard deviation of year-over-year spending changes. Lower values mean more predictable spending.

### Worst Drawdown
The largest peak-to-trough decline in portfolio value experienced during the simulations.

---

## Educational Use & Research

This tool is designed for:

- Understanding the mathematics of retirement planning without the complexity of full financial planning software
- Academic research on withdrawal strategies and Monte Carlo methodology
- Helping individuals understand the tradeoffs between spending flexibility and portfolio longevity
- Comparing how different simulation methods affect perceived safe withdrawal rates

**This is not financial advice.** Real retirement planning requires consideration of Social Security, pensions, taxes, healthcare costs, legacy goals, and many other factors this tool does not model.

---

## Technical Notes

### Historical Data
- U.S. stock returns: S&P 500 (or equivalent pre-1957)
- U.S. bond returns: Intermediate-term government bonds
- Inflation: CPI-U
- Data source: Annual returns from 1926–2024

### Simulation Parameters
- Default portfolio: 50% stocks, 50% bonds (adjustable)
- Default time horizon: 30 years (adjustable)
- Default withdrawal rate: 4% of initial portfolio (adjustable)
- Number of Monte Carlo simulations: 10,000 per run

### Rebalancing
All strategies assume annual rebalancing back to target allocation.

---

## References & Further Reading

**Bengen, W. (1994).** "Determining Withdrawal Rates Using Historical Data," *Journal of Financial Planning*.

**Pfau, W. & Kitces, M. (2014).** "Reduce Volatility to Improve Retirement Outcomes: The Efficient Frontier of Spending Volatility and Initial Real Retirement Income."

**Blanchett, D., Finke, M., & Pfau, W. (2013).** "Low Bond Yields and Safe Portfolio Withdrawal Rates," *Journal of Financial Planning*.

**Milevsky, M. & Huang, H. (2011).** "Spending Retirement on Planet Vulcan: The Impact of Longevity Risk Aversion on Optimal Withdrawal Rates."

**Cooley, P., Hubbard, C., & Walz, D. (2003).** "A Comparative Analysis of Retirement Portfolio Success Rates: Simulation versus Overlapping Periods."

---

## License

MIT License - See LICENSE file for details.

---

## Contributing

Contributions are welcome! Please see SETUP.md for development setup instructions.

For bugs, feature requests, or questions, please open an issue on GitHub.

---

## Acknowledgments

This project builds on decades of research in retirement income planning, particularly the foundational work of William Bengen, the ongoing research at Morningstar and Vanguard, and the academic contributions of Wade Pfau, Michael Kitces, David Blanchett, and many others.

The Narrative Monte Carlo methodology is an original contribution designed to address limitations in both pure historical backtesting and standard Monte Carlo simulation.
