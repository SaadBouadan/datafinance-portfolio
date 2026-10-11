// DataFinance Lab — progressive enhancements. The site is fully readable without this file.
(() => {
  const root = document.documentElement;

  // Theme toggle (initial theme is set by the inline script in each page's <head>)
  const themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    const sync = () => themeBtn.setAttribute('aria-pressed', String(root.dataset.theme !== 'light'));
    themeBtn.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* storage blocked: theme lasts for this page only */ }
      sync();
    });
    sync();
  }

  // Mobile menu
  const header = document.querySelector('[data-header]');
  const menuBtn = document.querySelector('[data-menu-toggle]');
  if (header && menuBtn) {
    const setMenu = (open) => {
      header.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    };
    menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('is-open')) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    document.addEventListener('click', (e) => {
      if (header.classList.contains('is-open') && !header.contains(e.target)) setMenu(false);
    });
  }

  // Project filters
  const filterBar = document.querySelector('[data-filters]');
  if (filterBar) {
    const cards = document.querySelectorAll('[data-category]');
    const status = document.querySelector('[data-filter-status]');
    const apply = (btn) => {
      const filter = btn.dataset.filter;
      filterBar.querySelectorAll('button[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      let shown = 0;
      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category.split(' ').includes(filter);
        card.hidden = !match;
        shown += match;
      });
      status.textContent = `Showing ${shown} of ${cards.length} projects`;
    };
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-filter]');
      if (btn) apply(btn);
    });
    apply(filterBar.querySelector('button[data-filter="all"]'));
  }

  // Diversification calculator: two assets, equal 50/50 weights, same volatility
  const corr = document.getElementById('corr');
  if (corr) {
    const assetVol = 0.2;
    const corrOut = document.getElementById('corr-out');
    const volOut = document.getElementById('vol-out');
    const fill = document.querySelector('[data-meter-fill]');
    const update = () => {
      const rho = Number(corr.value);
      // σp² = w1²σ1² + w2²σ2² + 2·w1·w2·ρ·σ1·σ2, which reduces to 0.5·σ²·(1 + ρ) here
      const vol = assetVol * Math.sqrt(0.5 * (1 + rho));
      corrOut.textContent = rho.toFixed(2);
      volOut.textContent = `${(vol * 100).toFixed(1)}%`;
      fill.style.setProperty('--v', String(vol / assetVol));
    };
    corr.addEventListener('input', update);
    update();
  }
})();
