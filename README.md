# DataFinance Lab

**Turning Financial Data Into Better Decisions.** The personal portfolio of a Financial Data Intelligence student, built to support internship applications in quantitative finance, financial analysis, fintech and data science.

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
├── contact.html          Email / LinkedIn / GitHub, recruiter and collaborator sections
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

## Deploy to GitHub Pages

1. Create a public repository named **`datafinance-portfolio`** on GitHub.
2. Push the files to it:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/datafinance-portfolio.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**. Under **Build and deployment**, set *Source* to **Deploy from a branch**, then choose branch **`main`** and folder **`/ (root)`**, and click **Save**.
4. After a minute or so the site is live at `https://<your-username>.github.io/datafinance-portfolio/`.

To use a different repository name, change the `datafinance-portfolio` part of the canonical, `og:url` and `og:image` URLs in each page's `<head>`.

## Customization guide

### 1. Personal details (required)

Use find-and-replace across all files:

| Find | Replace with |
| --- | --- |
| `your-username` | Your GitHub username (fixes GitHub links, repository links and the canonical, `og:url` and `og:image` URLs) |
| `your-profile` | Your LinkedIn profile slug |
| `your.email@example.com` | Your email address |

Then search for `class="ph"`. Every match is a highlighted placeholder, such as your name, university, graduation date, location, languages, coursework, certifications and availability. Replace the text, then remove the `class="ph"` wrapper so the dashed highlight disappears. When `node scripts/check-site.mjs` stops reporting placeholders, you're done.

### 2. Verify the content about you

- **QuantRisk Analytics**, in `index.html` and `projects.html`, was written from the project name only. Make its description, focus areas and technology tags match your repository.
- **Skills**, in `about.html` and on the home page: keep only skills you can discuss confidently in an interview.
- **Interests** and the **biography** in `about.html`: adjust them to your own voice.
- **Certifications**: duplicate the entry for each one you hold, or delete the panel if you have none yet.

### 3. Replace the example projects

Cards with an **Example** badge are outlines, not completed work. To replace one, change its title, text and tags. Then swap the `card-note` line for a real link:

```html
<div class="card-foot"><a class="link-arrow" href="https://github.com/your-username/repo">View repository ↗</a></div>
```

Also remove the `<span class="badge badge-example">Example</span>` badge. If none are left, delete the "Note" callout at the top of `projects.html` as well.

**Filter categories** come from `data-category`, a space-separated list of `finance`, `data-science`, `machine-learning` and `web-development`. The project count updates automatically.

### 4. Add an article

In `insights.html`:
1. Copy an `<article class="article" id="...">` block and give it a new, unique `id`.
2. Add a matching card in the "All insights" grid that links to `#your-id`.
3. Keep examples hypothetical and avoid recommendations.

### 5. Look and feel

- **Colors** are CSS custom properties at the top of `css/styles.css`: `:root` for dark, `[data-theme="light"]` for light.
- **Default theme**: the inline `<script>` in each page's `<head>` follows the system setting. To always start in dark mode, replace `(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')` with `'dark'` in all five pages.
- **Fonts**: change the Google Fonts `<link>` and the `--font-*` variables.
- **Social image**: replace `assets/og-image.png` with any 1200×630 PNG.

## Screenshots

Add screenshots to this README so visitors to the repository see the design at a glance:

1. Run the site locally, as described above.
2. Capture the home page at a desktop width of about 1440 px, in both light and dark themes. Also capture one phone-width view of about 390 px. In Chrome DevTools, open the device toolbar (Ctrl/Cmd+Shift+M), then use **⋮ → Capture screenshot** or **Capture full size screenshot**.
3. Save them in a `docs/` folder, for example `docs/home-dark.png`, and reference them here:
   ```markdown
   ![Home page, dark theme](docs/home-dark.png)
   ```

## Content disclaimer

The articles on this site are educational. They are not financial, investment, tax or legal advice. All figures and charts use hypothetical or simulated data.

## License

Released under the [MIT License](LICENSE). Article text and personal content remain © their author. Update the name in `LICENSE`.
