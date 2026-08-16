/* ═══════════════════════════════════════════════
   PORTFOLIO JAVASCRIPT
   Kommanapalli Alivelu Manga Tayaru
═══════════════════════════════════════════════ */

// ─── Navbar scroll effect ───────────────────────
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// ─── Active nav link on scroll ──────────────────
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[data-section="${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

// ─── Hamburger menu ─────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

// Close menu on nav link click
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

// ─── Intersection Observer — reveal animations ──
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once visible, animate language bars if present inside
        const bars = entry.target.querySelectorAll('.lang-fill');
        bars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          requestAnimationFrame(() => {
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
        });
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
  }
);

revealElements.forEach(el => revealObserver.observe(el));

// ─── Language bar animation on section enter ───
const langObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.lang-fill');
        fills.forEach(fill => {
          const targetWidth = fill.getAttribute('data-width') || fill.style.width;
          fill.setAttribute('data-width', targetWidth);
          fill.style.width = '0';
          setTimeout(() => {
            fill.style.width = targetWidth;
          }, 200);
        });
        langObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.lang-list').forEach(el => langObserver.observe(el));

// ─── Smooth counter animation for hero stats ───
function animateCounter(el, target, duration = 1800, suffix = '') {
  const isFloat = String(target).includes('.');
  const decimals = isFloat ? String(target).split('.')[1].length : 0;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = start + (target - start) * eased;
    el.textContent = isFloat
      ? value.toFixed(decimals) + suffix
      : Math.floor(value) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const heroStatsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNums = entry.target.querySelectorAll('.stat-num');
        statNums.forEach(el => {
          const text = el.textContent.trim();
          const suffix = text.replace(/[\d.]/g, '');
          const num = parseFloat(text.replace(/[^\d.]/g, ''));
          if (!isNaN(num)) animateCounter(el, num, 1500, suffix);
        });
        heroStatsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroStatsObserver.observe(heroStats);

// ─── Subtle parallax on hero orbs ──────────────
const orbs = document.querySelectorAll('.hero-orb');
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 8;
    orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
});

// ─── Add stagger delay to skill tags ───────────
document.querySelectorAll('.skill-tags').forEach(container => {
  container.querySelectorAll('.skill-tag').forEach((tag, i) => {
    tag.style.transitionDelay = `${i * 0.04}s`;
  });
});

// ─── Typing effect for hero title ──────────────
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const phrases = [
    'Finance MBA Candidate • Equity Research Analyst • Financial Modeler',
    'Data Visualizer • Power BI & Tableau Expert • SQL & Python',
    'SEBI/NISM Trained • 20+ Published Research Reports',
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let pauseTimer = null;

  function typeEffect() {
    const current = phrases[phraseIdx];
    if (!isDeleting) {
      heroTitle.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        pauseTimer = setTimeout(typeEffect, 2800);
        return;
      }
    } else {
      heroTitle.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(typeEffect, isDeleting ? 28 : 50);
  }

  // Start typing after hero animations play
  setTimeout(typeEffect, 1400);
}

// ─── Tilt effect on project cards ──────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ─── Timeline item entrance stagger ────────────
document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.12}s`;
});

// ─── Back to top on logo click ──────────────────
document.getElementById('nav-logo').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Console Easter egg ─────────────────────────
console.log(`
%c  Kommanapalli Alivelu Manga Tayaru  
%c  Finance & Equity Research Analyst  
%c  📊 20+ Research Reports | 💻 Power BI • Tableau • SQL • Python
%c  📧 kommanapalliali@gmail.com
`,
'background:#3b82f6;color:#fff;font-size:16px;font-weight:bold;padding:4px 8px;',
'background:#06b6d4;color:#fff;font-size:13px;padding:2px 8px;',
'color:#94a3b8;font-size:12px;',
'color:#60a5fa;font-size:12px;'
);
