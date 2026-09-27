/* Centre Mart — v3 interactions
   Removed:  IntersectionObserver fade-ups everywhere
   Added:    text-mask kinetic reveal (hero only), magnetic buttons,
             cursor spotlight for hero image, hero image parallax tilt,
             odometer counters, marquee clone (pause on hover via CSS)  */
(function () {
  const $  = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile nav */
  const toggle = $('.nav-toggle');
  if (toggle) toggle.addEventListener('click', () => document.body.classList.toggle('nav-open'));
  $$('.site-nav a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('nav-open')));

  /* Active nav link */
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('.site-nav a[href]').forEach(a => {
    const h = a.getAttribute('href').toLowerCase();
    if (h === here || (here === '' && h === 'index.html')) a.classList.add('active');
  });

  /* Sticky header border/shade on scroll */
  const hdr = $('.site-header');
  if (hdr) {
    const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Kinetic text mask — split H1 (marked .kinetic) into word-spans and reveal */
  const kineticTargets = $$('.kinetic');
  kineticTargets.forEach(el => {
    if (el.dataset.split) return;
    // Walk only text nodes so we don't break attributes on inline SVGs.
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    let n; while ((n = walker.nextNode())) textNodes.push(n);
    textNodes.forEach(tn => {
      if (!tn.nodeValue.trim()) return;
      const frag = document.createDocumentFragment();
      tn.nodeValue.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        const span = document.createElement('span');
        span.textContent = part;
        frag.appendChild(span);
      });
      tn.parentNode.replaceChild(frag, tn);
    });
    el.dataset.split = '1';
  });
  requestAnimationFrame(() => kineticTargets.forEach(el => el.classList.add('in')));

  /* Marquee: duplicate track once so drift is seamless */
  $$('.topbar-viewport, .ticker-track').forEach(track => {
    const clone = track.cloneNode(true);
    while (clone.firstChild) track.appendChild(clone.firstChild);
  });

  /* Odometer counters — count up when scrolled into view */
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const format = n => n >= 1000 ? Math.round(n).toLocaleString('en-IN') : String(Math.round(n));
  const counters = $$('.counter[data-target]');
  const cIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      cIO.unobserve(e.target);
      const target = parseFloat(e.target.dataset.target);
      const dur = 1600;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        e.target.textContent = format(target * easeOut(t));
        if (t < 1) requestAnimationFrame(tick);
        else e.target.textContent = format(target);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: .4 });
  counters.forEach(c => cIO.observe(c));

  if (rm) return;

  /* Magnetic buttons — subtle pull toward cursor */
  $$('.btn-magnetic').forEach(btn => {
    const strength = 14;
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* Hero image — cursor spotlight (--mx/--my) + gentle 3D tilt */
  const heroImg = $('.hero-img');
  if (heroImg) {
    const inner = $('.img-inner', heroImg) || heroImg;
    heroImg.addEventListener('mousemove', (e) => {
      const r = heroImg.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width) * 100;
      const py = ((e.clientY - r.top) / r.height) * 100;
      heroImg.style.setProperty('--mx', px + '%');
      heroImg.style.setProperty('--my', py + '%');
      const tx = (px - 50) / 50;
      const ty = (py - 50) / 50;
      inner.style.transform = `perspective(1000px) rotateY(${tx * 3}deg) rotateX(${-ty * 2.5}deg) scale(1.015)`;
    });
    heroImg.addEventListener('mouseleave', () => {
      inner.style.transform = '';
    });
  }

  /* WhatsApp contact form → pre-fill */
  const waForm = $('#wa-form');
  if (waForm) {
    waForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = waForm.elements;
      const msg = `Hi Centre Mart 👋\n\nName: ${f.name.value}\nPhone: ${f.phone.value}` +
                  (f.addr.value ? `\nAddress: ${f.addr.value}` : '') +
                  `\n\nOrder / Message:\n${f.msg.value}`;
      window.open('https://wa.me/917034530300?text=' + encodeURIComponent(msg), '_blank');
    });
  }
})();
