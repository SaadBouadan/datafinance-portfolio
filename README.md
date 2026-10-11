# DataFinance Lab

**Turning Financial Data Into Better Decisions.** The personal portfolio of Saad Bouadan, an MSc student in Financial Data Intelligence at Rennes School of Business, looking for a 6-month end-of-studies internship in risk, quantitative or financial data analysis from late March 2027.

**Live site:** https://saadbouadan.github.io/datafinance-portfolio/

It's a fast, accessible static site with an editorial fintech look: deep navy and mint, serif headlines and data-driven SVG charts. It has no framework, no build step and no backend, so it runs anywhere and deploys free on GitHub Pages.

---

## Features

- **Five pages:** Home, Projects, Financial Insights, About and Contact.
- **Project filters:** Finance, Data Science, Machine Learning and Web Development, with accessible toggle buttons and a live result count.
- **Five original educational articles:** diversification, Value at Risk, algorithmic trading, financial data analysis and machine learning in finance. Each article is clearly marked as not investment advice.
- **Data visualizations without a chart library:**
  - An efficient-frontier chart built from 20,000 seeded, simulated portfolios.
  - A Value at Risk distribution chart.
  - An interactive diversification calculator that applies the two-asset portfolio-volatility formula live.
- **Light and dark themes:** follows the visitor's system setting by default, remembers a manual choice, and doesn't flash the wrong theme on load.
- **Responsive** from phones to wide desktops (tested at 375 px and 1366 px), with a mobile menu that closes on Escape or an outside click.
- **Accessible:** semantic landmarks, a skip link, visible focus styles, `aria-pressed` and `aria-expanded` states, chart titles and descriptions, WCAG AA color contrast, and `prefers-reduced-motion` support.
- **Progressive enhancement:** every page is readable with JavaScript disabled. JS-only controls hide themselves when scripts don't run.
- **SEO and sharing:** a title, description, canonical URL, Open Graph and Twitter tags, an SVG favicon and a 1200×630 social preview image on every page.
- **Subpath-safe:** every path is relative, so the site works at `https://<user>.github.io/datafinance-portfolio/`.

## Technology stack

| Layer | Choice |
| --- | --- |
| Markup | HTML5 (semantic, no templating) |
| Styling | CSS3 with custom properties, Grid and Flexbox, no preprocessor |
| Behavior | Vanilla JavaScript (under 100 lines, no dependencies) |
| Charts | Hand-built inline SVG (no Chart.js needed) |
| Fonts | Newsreader, IBM Plex Sans and IBM Plex Mono via Google Fonts, with system fallbacks |
| Hosting | GitHub Pages |
| Checks | `node scripts/check-site.mjs` (Node 18+, zero dependencies) |

## Run it locally

You need any static file server, because opening files directly with `file://` works but doesn't behave like a real host.

```bash
cd datafinance-portfolio
python -m http.server 8000
```

Then open <http://localhost:8000>. If you prefer Node, `npx serve .` does the same job.

**To mimic GitHub Pages' subpath**, serve the *parent* folder and open `http://localhost:8000/datafinance-portfolio/`.

## Test it

```bash
node scripts/check-site.mjs
```

The script checks that:
- every local link, asset and `#anchor` resolves
- no root-absolute paths (`/css/...`) are used, since those break on GitHub Pages
- ids are unique and ARIA references point at real elements
- each page has its metadata
- the social image exists

It also counts the placeholders you still need to personalize.

Then work through this manual checklist in a browser:
1. Resize to phone width. Open and close the menu with the button, Escape and a click outside it.
2. Toggle the theme, then move to another page. The choice should persist.
3. On **Projects**, try every filter. The count should update.
4. On **Insights**, drag the correlation slider. At ρ = 1 it shows 20.0%, at ρ = 0 it shows 14.1%, and at ρ = −1 it shows 0.0%.
5. Tab through a page with the keyboard. Focus should always be visible.
6. Turn on your OS "reduce motion" setting and reload. The chart should appear without animating.
7. Open DevTools → Console. There should be no errors.

## Project structure

```
datafinance-portfolio/
├── index.html            Home: hero + frontier chart, selected work, skills, insights, contact
├── projects.html         Filterable project cards (QuantRisk Analytics featured)
├── insights.html         Five educational articles, VaR chart, diversification calculator
├── about.html            Biography, skills, education, certifications, interests
├── contact.html          LinkedIn / GitHub, recruiter and collaborator sections
├── css/
│   └── styles.css        Design tokens (both themes) and all components
├── js/
│   └── main.js           Theme toggle, mobile menu, project filters, calculator
├── assets/
│   ├── favicon.svg
│   └── og-image.png      1200×630 social preview
├── scripts/
│   └── check-site.mjs    Static link and metadata checks
├── README.md
└── LICENSE
```

Header and footer markup is repeated in each page on purpose, because it keeps the site build-free. If you change navigation, update all five files.

## Deployment

The site is served by GitHub Pages from the `main` branch, root folder. Every push to `main` redeploys it within a minute or so at https://saadbouadan.github.io/datafinance-portfolio/.

## Editing content

- **Projects** live in `projects.html` (all cards) and `index.html` (three selected cards). Filter categories come from each card's `data-category` attribute: `finance`, `data-science`, `machine-learning` and `web-development`.
- **Articles** live in `insights.html`. To add one, copy an `<article class="article" id="...">` block with a new `id` and add a matching card in the "All insights" grid. Keep examples hypothetical and avoid recommendations.
- **Colours** are CSS custom properties at the top of `css/styles.css`: `:root` for dark, `[data-theme="light"]` for light.
- Header and footer markup is repeated in all five pages, so update every file when navigation changes. Run `node scripts/check-site.mjs` after editing.

## Content disclaimer

The articles on this site are educational. They are not financial, investment, tax or legal advice. All figures and charts use hypothetical or simulated data.

## License

Released under the [MIT License](LICENSE). Article text and personal content remain © their author.
