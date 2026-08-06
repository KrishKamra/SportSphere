# SportSphere | Real-Time Sports Intelligence & Analytics Pipeline

**SportSphere** is a premium 3D analytics command center that bridges raw web data and actionable sports insights. The platform features an elite glassmorphic interface, WebGL atmosphere, and Lenis-powered smooth scrolling — engineered as the frontend for an automated web scraping pipeline targeting real-world professional sports organizations.

<p align="center">
  <img src="docs/screenshots/01-hero.png" alt="SportSphere hero — Decode the game before it happens" width="100%" />
</p>

<p align="center">
  <em>Hero command surface with Three.js atmosphere, live KPIs, and insight controls</em>
</p>

---

## 🖼 Dashboard Preview

### Live Intelligence

Bento-style analytics modules for rapid signal scanning — power-rank trajectories, momentum index, and scout notes.

<p align="center">
  <img src="docs/screenshots/02-live-intel.png" alt="Live Intelligence bento grid with charts and signal board" width="100%" />
</p>

### Team Intelligence Grid

Featured squads with power index meters, form lines, stadium metadata, and persistent favorites.

<p align="center">
  <img src="docs/screenshots/03-teams.png" alt="Team intelligence cards for City Tigers, River Hawks, Mountain Bears, Coastal Sharks" width="100%" />
</p>

### Smart Schedule

Fixture tracker with live pulse badges and multi-criteria filtering (All · Live · Upcoming · Completed).

<p align="center">
  <img src="docs/screenshots/04-fixtures.png" alt="Match fixtures schedule with live and upcoming games" width="100%" />
</p>

### Scraper Pipeline (Future Prospect)

Roadmap visualization for the Python intelligence layer — sources → scraper → JSON → model → UI.

<p align="center">
  <img src="docs/screenshots/05-pipeline.png" alt="Future Prospect scraper pipeline roadmap" width="100%" />
</p>

---

## 🏗 System Architecture: The Dashboard

The current environment is built for high-performance data visualization and a premium browsing experience:

| Layer | Stack |
|--------|--------|
| **Layout & utilities** | Tailwind CSS (CDN) + custom design tokens |
| **Smooth scroll** | **Lenis** — inertia-based premium page flow |
| **3D atmosphere** | **Three.js** — wireframe sphere, orbital rings, particle field |
| **Motion** | **GSAP** + ScrollTrigger, IntersectionObserver reveals |
| **Analytics charts** | **Chart.js** — power-rank trajectory |
| **Client state** | Vanilla JS + `localStorage` favorites |
| **Visual identity** | Glassmorphism 2.0, cyan / gold / magenta on void navy |

### Dynamic Components

- **Hero Command Surface** — Insight of the Day matchup arena with xG / possession dual-bars, live KPIs, and win-probability footer
- **Live Intelligence Bento** — Power-rank chart, momentum radial meter, signal board, scout spotlight
- **Team Intelligence Grid** — 3D-tilt cards with power index, form, stadium meta, and pin-to-favorites
- **Smart Schedule** — Fixture cards with live pulse badges and multi-criteria filtering
- **Pipeline Teaser** — Future Prospect roadmap visualization (scraper → JSON → model → UI)
- **Ambient UX** — Soft cursor glow, infinite ticker, scroll-linked 3D parallax

---

## 📂 Project Structure

```text
.
├── index.html              # Dashboard interface (hydration-ready markup)
├── style.css               # Elite design system, glass 2.0, 3D panel styles
├── script.js               # Lenis · Three.js · GSAP · Chart.js · app logic
├── docs/
│   └── screenshots/        # README product shots
│       ├── 01-hero.png
│       ├── 02-live-intel.png
│       ├── 03-teams.png
│       ├── 04-fixtures.png
│       └── 05-pipeline.png
├── scripts/
│   └── capture-screenshots.mjs  # Optional Playwright capture helper
└── README.md
```

---

## 🏁 Getting Started

1. **Clone the environment:**
   ```bash
   git clone <repo-url>
   cd SportSphere
   ```

2. **Launch the dashboard:**
   Open `index.html` in a modern browser, or use a local server for full WebGL / CDN reliability:

   ```bash
   # Node
   npx serve -l 8000 .

   # or Python
   python -m http.server 8000
   ```

   Navigate to `http://localhost:8000`.

> **Note:** A local HTTP server is recommended so CDN modules and canvas behave consistently across browsers.

### Regenerating screenshots (optional)

With a local server running on port `3456`:

```bash
npm install playwright
npx playwright install chromium
npx serve -l 3456 .
node scripts/capture-screenshots.mjs
```

---

## 🚀 Future Prospect: Web Scraping Pipeline

The next phase of development focuses on the **SportSphere Scraper**, a Python-based pipeline designed to automate data collection for specific teams:

- **Automated Extraction:** Using **BeautifulSoup** and **Selenium** to crawl sites like FBref and NBA.com for live standings and performance metrics.
- **Headline Aggregation:** Integration of a news crawler (e.g., Sky Sports RSS) to serve team-specific news directly to the user's dashboard.
- **Data Hydration:** Transitioning from static HTML to dynamic JSON injection, allowing the dashboard to reflect real-world matches in real-time.
- **Predictive Analytics:** Implementation of a **Linear Regression** model to calculate win probabilities based on the scraped historical data.

The UI is structured so each bento module, team card, and fixture row can be replaced with JSON-driven content without redesigning the command surface.

---

## 👤 Author

**Krish Kamra**

- GitHub: [@KrishKamra](https://github.com/KrishKamra)
- Project: [SportSphere](https://github.com/KrishKamra/SportSphere)

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the conditions in the license file.

See the full text in [`LICENSE`](./LICENSE).

```
MIT License

Copyright (c) 2026 Krish Kamra
```

---

*© 2026 SportSphere. Transforming raw web data into professional sports intelligence.*
