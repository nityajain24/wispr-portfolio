// Site-wide UI behaviour: letter wave (M1/M2), nav hide (M4), nav indicator (M5),
// scroll-drawn underline fallback (M6b). No dependencies. See drafts/design-spec.md section 5.

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = matchMedia('(hover: hover)').matches;

/* 1. Letter wave. Hover devices without reduced motion only; otherwise text stays plain. */
if (canHover && !reduce) {
  document.querySelectorAll<HTMLElement>('[data-wave]').forEach((el) => {
    const text = el.textContent ?? '';
    let i = 0;
    el.textContent = '';
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = text;
    const vis = document.createElement('span');
    vis.className = 'wv';
    vis.setAttribute('aria-hidden', 'true');
    text.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) { vis.appendChild(document.createTextNode(' ')); return; }
      const w = document.createElement('span');
      w.className = 'w';
      Array.from(part).forEach((c) => {
        const s = document.createElement('span');
        s.className = 'ch';
        s.textContent = c;
        s.style.setProperty('--i', String(i++));
        w.appendChild(s);
      });
      vis.appendChild(w);
    });
    el.append(sr, vis);
    const host = el.closest('a,button') ?? el;
    const chars = () => vis.querySelectorAll<HTMLElement>('.ch');
    host.addEventListener('mouseenter', () => {
      chars().forEach((c) => { c.style.transition = ''; c.style.transform = ''; });
      vis.classList.remove('waving');
      void vis.offsetWidth;
      vis.classList.add('waving');
    });
    host.addEventListener('mouseleave', () => {
      const cs = chars();
      cs.forEach((c) => { c.style.transition = 'none'; c.style.transform = getComputedStyle(c).transform; });
      vis.classList.remove('waving');
      void vis.offsetWidth;
      cs.forEach((c) => { c.style.transition = 'transform .2s'; c.style.transform = 'none'; });
      setTimeout(() => cs.forEach((c) => { c.style.transition = ''; c.style.transform = ''; }), 260);
    });
  });
}

/* 2. Nav hides on scroll down past 120px, returns on scroll up. Never while focus is inside. */
const wrap = document.getElementById('navwrap');
if (wrap && !reduce) {
  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    if (wrap.contains(document.activeElement)) { wrap.classList.remove('is-hidden'); lastY = y; return; }
    if (y > lastY && y > 120) wrap.classList.add('is-hidden');
    else if (y < lastY) wrap.classList.remove('is-hidden');
    lastY = y;
  }, { passive: true });
  wrap.addEventListener('focusin', () => wrap.classList.remove('is-hidden'));
}

/* 3. Nav sliding indicator. Follows hover/focus, returns to the current page link. */
const nav = document.getElementById('nav');
const list = document.getElementById('navlist');
const pill = document.getElementById('pill');
if (nav && list && pill) {
  const cur = list.querySelector<HTMLElement>('[aria-current]');
  const moveTo = (a: HTMLElement) => {
    // links are position: relative, so their offsetParent is .links (the pill's containing block)
    pill.style.width = `${a.offsetWidth}px`;
    pill.style.height = `${a.offsetHeight}px`;
    pill.style.top = `${a.offsetTop}px`;
    pill.style.marginTop = '0';
    pill.style.transform = `translateX(${a.offsetLeft}px)`;
    pill.classList.add('on');
  };
  // offsetLeft is relative to the nearest positioned ancestor; the <li> is static, so
  // it resolves to .links (position: relative), which is the pill's containing block.
  if (cur) {
    nav.classList.add('has-pill');
    pill.style.transition = 'none';
    moveTo(cur);
    void pill.offsetWidth;
    pill.style.transition = '';
    addEventListener('resize', () => moveTo(cur));
  }
  list.querySelectorAll<HTMLElement>('a').forEach((a) => {
    a.addEventListener('mouseenter', () => { if (cur) moveTo(a); });
    a.addEventListener('focus', () => { if (cur) moveTo(a); });
  });
  // Narrow screens: the link row scrolls sideways. Show the current link, and fade the edge while more is hidden.
  const sync = () => {
    list.classList.toggle('can-scroll', list.scrollWidth > list.clientWidth + 1);
    list.classList.toggle('at-end', list.scrollLeft + list.clientWidth >= list.scrollWidth - 2);
  };
  if (cur && list.scrollWidth > list.clientWidth) list.scrollLeft = Math.max(0, cur.offsetLeft - 8);
  sync();
  list.addEventListener('scroll', sync, { passive: true });
  addEventListener('resize', sync);
  list.addEventListener('mouseleave', () => { if (cur) moveTo(cur); });
  list.addEventListener('focusout', () => { if (cur) moveTo(cur); });
}

/* 4. Scroll reveal. Waits for the entry gate to close so the hero animates in view, not behind it. */
const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
const startReveals = () => {
  if (reduce || !('IntersectionObserver' in window)) { reveals.forEach((r) => r.classList.add('is-in')); return; }
  // The first screen always plays in full (staggered by --d), including the scroll cue at its foot.
  document.querySelectorAll<HTMLElement>('.hero [data-reveal]').forEach((r) => r.classList.add('is-in'));
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -12% 0px' });
  reveals.forEach((r) => io.observe(r));
};
if (reveals.length) {
  const root = document.documentElement;
  if (!root.classList.contains('gate-on')) startReveals();
  else {
    const mo = new MutationObserver(() => {
      if (!root.classList.contains('gate-on')) { mo.disconnect(); startReveals(); }
    });
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
  }
}

/* 5. Underline draws when its heading scrolls into view. (A CSS scroll-timeline version
   was dropped: the minifier folded animation-timeline into the shorthand and Chrome ignored it.) */
const uls = document.querySelectorAll<HTMLElement>('.ul');
if (reduce || !('IntersectionObserver' in window)) {
  uls.forEach((u) => u.classList.add('is-in'));
} else if (uls.length) {
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -30% 0px' });
  uls.forEach((u) => io.observe(u));
}
