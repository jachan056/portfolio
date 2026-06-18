/* ── STREAM CANVAS (hero background) ── */
(function () {
  const canvas = document.getElementById('stream-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const CHARS = '01アイウエオカキクケコデータサイエンス';
  const COL_W = 18;
  let cols, drops, raf;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    cols  = Math.floor(canvas.width / COL_W);
    drops = Array.from({ length: cols }, () => Math.random() * -60);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '12px "Space Mono", monospace';
    ctx.fillStyle = '#2952CC';

    for (let i = 0; i < drops.length; i++) {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      ctx.globalAlpha = Math.random() * 0.6 + 0.2;
      ctx.fillText(char, i * COL_W, drops[i] * 18);

      if (drops[i] * 18 > canvas.height && Math.random() > 0.97) {
        drops[i] = 0;
      }
      drops[i] += 0.25;
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(() => { resize(); });
  ro.observe(canvas.parentElement);
  resize();
  draw();

  // Respect reduced motion
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) { cancelAnimationFrame(raf); canvas.style.display = 'none'; }
  mq.addEventListener('change', e => {
    if (e.matches) { cancelAnimationFrame(raf); canvas.style.display = 'none'; }
    else { canvas.style.display = ''; draw(); }
  });
})();


/* ── PROJECT FILTERS ── */
(function () {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  const note  = document.querySelector('.section-note');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      note.textContent = 'Filtered by: ' + btn.textContent;

      cards.forEach(card => {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          const tags = (card.dataset.tags || '').split(' ');
          card.classList.toggle('hidden', !tags.includes(filter));
        }
      });
    });
  });
})();


/* ── SKILL BARS (animate on scroll) ── */
(function () {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.width = el.style.width; // trigger reflow
        requestAnimationFrame(() => {
          el.style.width = el.getAttribute('data-w');
        });
        io.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  fills.forEach(el => {
    const w = el.style.width;
    el.setAttribute('data-w', w);
    el.style.width = '0';
    io.observe(el);
  });
})();


/* ── ACTIVE NAV LINK on scroll ── */
(function () {
  const sections = document.querySelectorAll('section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => io.observe(s));
})();


/* ── SMOOTH CARD ENTRANCE ── */
(function () {
  const cards = document.querySelectorAll('.project-card, .skill-group, .about-card');

  const style = document.createElement('style');
  style.textContent = `
    .card-hidden { opacity: 0; transform: translateY(16px); transition: opacity 0.4s ease, transform 0.4s ease; }
    .card-visible { opacity: 1; transform: none; }
  `;
  document.head.appendChild(style);

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('card-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  cards.forEach((card, i) => {
    card.classList.add('card-hidden');
    card.style.transitionDelay = (i % 4) * 60 + 'ms';
    io.observe(card);
  });
})();
