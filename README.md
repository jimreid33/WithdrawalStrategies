# Retirement Withdrawal Strategy Simulator

**An open-source tool for testing retirement withdrawal strategies using historical U.S. market data (1926–2024), five Monte Carlo simulation methods, and five configurable withdrawal strategies.**

This simulator replicates William Bengen's original 1994 methodology, implements industry-standard approaches used by Morningstar and others, and introduces Narrative Monte Carlo — an original simulation method designed to preserve the internal coherence of real market sequences.

Built for hobbyists, researchers, and anyone who wants to understand the tradeoffs between spending more now, spending steadily, and not running out of money.

> **Not financial advice.** This is an educational and research tool. Real retirement planning involves Social Security, taxes, healthcare, and many factors this tool does not model.

---

## Quick Start

### Guided Tour

Click the **Guided Tour** button in the top-right corner. The tour walks you through Bengen's discovery, the gap between historical and Monte Carlo results, Narrative Monte Carlo, and the strategy comparison framework — five steps that take about five minutes and leave you ready to explore on your own.

### Strategy Presets

Each tab has a **Quick Presets** bar with five starting configurations:

| Preset | Strategy | Rate | Allocation | What It Tests |
|--------|----------|------|------------|---------------|
| **Bengen Classic** | Fixed Real | 4% | 50/50 | The original 4% rule — the baseline everything else is measured against |
| **Morningstar** | Forgo Inflation | 3.8% | 50/50 | Morningstar's annual study approach — skip inflation adjustments after loss years |
| **Yale Endowment** | Smoothed % (Yale) | 5% | 70/30 | Institutional approach — blend prior spending with portfolio target |
| **Vanguard Dynamic** | Smoothed % (Vanguard) | 5% | 60/40 | Capped annual spending changes (±5%/−2.5%) |
| **Growth + Rails** | Guardrails | 5% | 80/20 | Aggressive equity with guardrail protection |

---

## Simulation Methods

### Historical

Start with a fixed real withdrawal monitoring the ratio of your current withdrawal to your current portfolio value. If that ratio drifts above an upper guardrail, you're withdrawing too much relative to what you have — cut spending. If it drifts below a lower guardrail, you're underspending — raise it. A floor prevents spending from ever falling below a set percentage of your initial amount.

The effect: spending is stable for long stretches, punctuated by occasional step-changes when markets move significantly. The guardrail parameters (band width, cut/raise %) are all adjustable.

### Fixed Real (The Original 4% Rule)

The original 4% rule — the baseline everything else is measured against.

### Forgo Inflation

Morningstar's annual study approach — skip inflation adjustments after loss years.

### Smoothed % (Yale)

Institutional approach — blend prior spending with portfolio target. **Yale Approach** blends two anchors each year: (1) last year's spending adjusted for inflation, and (2) a target percentage of the current portfolio value. The smoothing weight controls the blend; means you're anchored to prior spending, responsive to the portfolio. This was designed for perpetual endowments but translates well to retirement. The smoothing weight is a direct dial on how aggressively spending tracks market reality versus maintaining stability.

### Smoothed % (Vanguard)

Targets a percentage of the current portfolio each year, but caps how much spending can change year over year (typically ±5% maximum increase, −2.5% maximum decrease). The result is similar to Yale but with hard guardrails on annual volatility rather than a blending weight.

### Guardrails

Withdraws a fraction of the portfolio each year based on remaining years (portfolio ÷ remaining horizon).

---

## Understanding the Results

### Survival Curves

Survival curves show the percentage of simulations that still have money remaining at each year of retirement.

### Percentile Fan Charts

Fan charts show spending trajectories across simulations. The bands represent different outcome ranges:

- **10th percentile** (green dashed): The optimistic scenario — only 10% of simulations did better
- **25th percentile** (green solid): A good outcome
- **50th percentile** (blue, thick): The middle outcome — half did better, half did worse
- **75th percentile** (orange solid): A below-average outcome
- **90th percentile** (red dashed): The pessimistic scenario — only 10% did worse

A wide fan means high uncertainty. A narrow fan means the strategy produces more predictable outcomes, for better or worse.

---

## Strategy Details

### Fixed Real

Start with a fixed real withdrawal amount and increase it with inflation each year. If the portfolio runs out, spending drops to zero.

### Forgo Inflation

Like Fixed Real, but skip inflation adjustments in years when the portfolio loses value (negative returns).

### Smoothed Percentage Approaches

Two models sharing a common philosophy — let spending track the portfolio, but smooth the ride.

**Yale Approach** blends two anchors each year — (1) last year's spending adjusted for inflation, and (2) a target percentage of the current portfolio value. The smoothing weight controls the blend: means you're anchored to prior spending, responsive to the portfolio. This was designed for perpetual endowments but translates well to retirement. The smoothing weight is a direct dial on how aggressively spending tracks market reality versus maintaining stability.

**Vanguard Approach** targets a percentage of the current portfolio each year, but caps how much spending can change year over year (typically ±5% maximum increase, −2.5% maximum decrease). The result is similar to Yale but with hard guardrails on annual volatility rather than a blending weight.

### Guardrails

Start with a fixed real withdrawal monitoring the ratio of your current withdrawal to your current portfolio value. If that ratio drifts above an upper guardrail, you're withdrawing too much relative to what you have — cut spending. If it drifts below a lower guardrail, you're underspending — raise it. A floor prevents spending from ever falling below a set percentage of your initial amount.

The effect: spending is stable for long stretches, punctuated by occasional step-changes when markets move significantly. The guardrail parameters (band width, cut/raise %) are all adjustable.

---

## Monte Carlo Methods

The tool includes five Monte Carlo approaches:

1. **Bengen (i.i.d.)** — Independent draws, the standard textbook Monte Carlo
2. **Smoothed (Block Bootstrap)** — Draws 5-year blocks to preserve autocorrelation
3. **Smoothed (Vanguard)** — Matches historical autocorrelation structure  
4. **Narrative Monte Carlo** — Preserves regime coherence using historical episode sequences
5. **Fitted (ARMA)** — Time series model fit to historical data

### Why Multiple Methods?

Markets exhibit both **macro dynamics** (regime shifts, crises, bear/bull environments) and **micro dynamics** (within-episode returns, inflation, cross-asset behavior).

- **i.i.d.** doesn't draw three random bag years as it really happened
- It draws, say, the 2008–2009 financial crisis as a coherent unit
- **Narrative MC** produces success rates slightly higher than standard i.i.d. (reflecting the mean reversion premium that real markets exhibit)

At moderate withdrawal rates (around 4–4.5%), Narrative MC typically produces success rates slightly higher than standard i.i.d. At higher rates, the differences are more pronounced because the specific sequencing of crash + recovery matters more.

---

## Interpreting Results

### Success Rate

The percentage of simulations that never ran out of money.

### Outcome Distribution

Five lines showing how outcomes spread across simulations:

- **Green dashed**: The optimistic scenario
- **Green solid**: A good outcome  
- **Blue (thick)**: The middle outcome
- **Orange solid**: A below-average outcome
- **Red dashed**: The pessimistic scenario

### Historical vs. Monte Carlo

When comparing Historical and Monte Carlo results, remember:

- **Historical** shows what actually happened across all starting years in the dataset
- **Monte Carlo** shows what could happen under randomized market sequences
- The gap between them reveals how sensitive your strategy is to sequence risk

---

## Data & Methodology

### Data Sources

- **U.S. Stocks**: Ibbotson/Morningstar SBBI Large Cap data (1926–2024)
- **U.S. Bonds**: Ibbotson Intermediate-Term Government Bonds
- **Inflation**: CPI-U

### Rebalancing

Annual rebalancing to maintain target allocation.

### Fees & Taxes

Not modeled. This is a gross returns analysis.

---

## Technical Notes

### Portfolio Construction

Portfolios are specified as stock/bond allocations (e.g., 60/40, 50/50). All returns are real (inflation-adjusted).

### Simulation Length

Default retirement horizon is 30 years. Configurable up to 40 years.

### Random Seeds

Results are deterministic given the same configuration and seed. Seeds can be adjusted for reproducibility.

---

## References

**Bengen, W. P. (1994).** "Determining Withdrawal Rates Using Historical Data." *Journal of Financial Planning.*

**Pfau, W. (2011).** "Can We Predict the Sustainable Withdrawal Rate for New Retirees?" *Journal of Financial Planning.*

**Blanchett, D. & Frank, L. (2009).** "Revisit Switches in Interest Rates." *Journal of Business & Economic Statistics.*

**Fitzpatrick, J. & Sharp, M. (2020).** "Evaluating Monte Carlo Models for Retirement Planning Forecast Accuracy." *Income Lab at HI2.com.*

---

## About This Tool

This simulator was created to make retirement withdrawal research accessible to everyone. It's open-source, transparent, and designed for exploration. Whether you're a researcher testing new strategies, a practitioner comparing approaches, or someone planning their own retirement, this tool gives you the data and frameworks to understand the tradeoffs.

**Not financial advice.** Always consult a qualified financial advisor for personalized retirement planning guidance.

---

*Last updated: February 2026*
