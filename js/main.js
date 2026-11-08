/* Tamil Nadu Cycling Association — shared behaviour */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Footer year
  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Mobile menu (full-screen overlay)
  const toggle = $('.menu-toggle'), nav = $('#nav');
  if (toggle && nav) {
    const setOpen = open => {
      nav.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      const label = toggle.querySelector('span');
      if (label) label.textContent = open ? 'Close' : 'Menu';
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    $$('a', nav).forEach(a => a.addEventListener('click', () => setOpen(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) setOpen(false); });
  }

  // Countdown (reads data-date on #countdown)
  const cd = $('#countdown');
  if (cd) {
    const target = new Date(cd.dataset.date).getTime();
    const pad = n => String(n).padStart(2, '0');
    const tick = () => {
      let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
      const v = { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
      for (const k in v) { const el = cd.querySelector(`[data-u="${k}"]`); if (el) el.textContent = pad(v[k]); }
    };
    tick(); setInterval(tick, 1000);
  }

  // Event filters
  const filters = $$('.filters button');
  if (filters.length) {
    filters.forEach(b => b.addEventListener('click', () => {
      filters.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      $$('.startlist li').forEach(r => { r.hidden = b.dataset.f !== 'all' && r.dataset.cat !== b.dataset.f; });
    }));
  }

  // Disciplines hover list → pinned figure
  const discList = $('.disc-list'), discFig = $('.disc-figure');
  if (discList && discFig) {
    const items = $$('li', discList), imgs = $$('img', discFig), cap = $('.cap', discFig);
    const activate = i => {
      items.forEach((li, j) => li.classList.toggle('on', j === i));
      imgs.forEach((im, j) => im.classList.toggle('on', j === i));
      if (cap) cap.textContent = items[i].dataset.cap || '';
    };
    items.forEach((li, i) => {
      li.addEventListener('mouseenter', () => activate(i));
      li.addEventListener('focusin', () => activate(i));
    });
    activate(0);
  }

  // Scroll reveal
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .1, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 110 + 'ms'; io.observe(el); });
  } else {
    $$('.reveal').forEach(el => el.classList.add('in'));
  }

  // Count-up numbers
  const counters = $$('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const co = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
      const step = t => {
        const p = Math.min((t - t0) / 1600, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4))).toLocaleString('en-IN') + (p === 1 ? suf : '');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step); co.unobserve(el);
    }), { threshold: .5 });
    counters.forEach(el => co.observe(el));
  }

  // Gallery lightbox
  const lb = $('#lightbox');
  const shots = $$('.gallery-grid img');
  if (lb && shots.length) {
    const img = $('img', lb), count = $('.lb-count', lb);
    let cur = 0;
    const show = i => {
      cur = (i + shots.length) % shots.length;
      img.src = shots[cur].src; img.alt = shots[cur].alt;
      if (count) count.textContent = `${String(cur + 1).padStart(2, '0')} / ${String(shots.length).padStart(2, '0')}`;
    };
    const open = i => { show(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; $('.lb-close', lb).focus(); };
    const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
    $$('.gallery-grid button').forEach((b, i) => b.addEventListener('click', () => open(i)));
    $('.lb-close', lb).addEventListener('click', close);
    $('.lb-prev', lb).addEventListener('click', () => show(cur - 1));
    $('.lb-next', lb).addEventListener('click', () => show(cur + 1));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }

  // Contact form → opens the visitor's mail app (no server required)
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const v = id => (form.querySelector('#' + id) || {}).value || '';
      const subject = encodeURIComponent('[Website] ' + v('topic'));
      const body = encodeURIComponent(`Name: ${v('name')}\nEmail: ${v('email')}\nPhone: ${v('phone')}\n\n${v('message')}`);
      location.href = `mailto:cycling.tamilnadustate@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();
