document.addEventListener('DOMContentLoaded', () => {
  initVideoProgress();
  initCountryNameFit();
  initAccordion();
  initStepsTrackFill();
  initAchievementsCountUp();
  initContactForm();
  initFooterYear();
  initHeaderTheme();
  initFleetLoadMore();
  initCasesToggle();
  initScrollAnimations();
  initLangSwitch();
});

function initLangSwitch() {
  const wraps = document.querySelectorAll('.lang-switch');
  if (!wraps.length) return;

  function closeAll() {
    wraps.forEach((w) => {
      w.classList.remove('is-open');
      w.querySelector('.lang-switch__btn')?.setAttribute('aria-expanded', 'false');
    });
  }

  wraps.forEach((wrap) => {
    const btn = wrap.querySelector('.lang-switch__btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.contains('is-open');
      closeAll();
      if (!isOpen) {
        wrap.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', closeAll);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
}

function initVideoProgress() {
  const video = document.getElementById('heroVideo');
  const progressFill = document.getElementById('videoProgress');

  if (!video || !progressFill) return;

  let rafId = null;

  function tick() {
    if (video.duration) {
      const percent = (video.currentTime / video.duration) * 100;
      progressFill.style.width = `${percent}%`;
    }
    rafId = requestAnimationFrame(tick);
  }

  video.addEventListener('play', () => {
    if (rafId === null) rafId = requestAnimationFrame(tick);
  });

  video.addEventListener('pause', () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });

  if (!video.paused) rafId = requestAnimationFrame(tick);
}

function initCountryNameFit() {
  const names = document.querySelectorAll('.country-card__name');
  if (!names.length) return;

  const fitAll = () => {
    names.forEach((el) => {
      el.style.fontSize = '';
      const targetWidth = el.clientWidth;
      const naturalWidth = el.scrollWidth;
      if (naturalWidth <= targetWidth || naturalWidth === 0) return;
      const baseFontSize = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = `${baseFontSize * (targetWidth / naturalWidth) * 0.92}px`;
    });
  };

  const run = () => fitAll();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(run);
  } else {
    run();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(run, 150);
  });
}

function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach((item) => {
    const header = item.querySelector('.accordion-item__header');

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.accordion-item__header').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initStepsTrackFill() {
  const track = document.querySelector('.steps__track');
  const fill = document.getElementById('stepsTrackFill');
  if (!track || !fill) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = track.getBoundingClientRect();
    const reference = window.innerHeight / 2;
    const progress = (reference - rect.top) / rect.height;
    fill.style.height = `${Math.min(Math.max(progress, 0), 1) * 100}%`;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
}

function initAchievementsCountUp() {
  const numbers = document.querySelectorAll('.achievement__number');
  if (!numbers.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const startTime = performance.now();

    if (el.countUpRaf) cancelAnimationFrame(el.countUpRaf);

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) {
        el.countUpRaf = requestAnimationFrame(tick);
      }
    };

    el.countUpRaf = requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
      }
    });
  }, { threshold: 0.5 });

  numbers.forEach((el) => observer.observe(el));
}

function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
}

function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (!el) return;
  el.textContent = new Date().getFullYear();
}

function initHeaderTheme() {
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('[data-header-theme]');
  if (!header || !sections.length) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const probeY = header.getBoundingClientRect().bottom - 1;
    let theme = 'dark';

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= probeY && rect.bottom > probeY) {
        theme = section.dataset.headerTheme;
      }
    });

    header.classList.toggle('is-light', theme === 'light');
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
}

function initFleetLoadMore() {
  const grid = document.getElementById('fleetGrid');
  const btn = document.getElementById('fleetLoadMoreBtn');
  if (!grid || !btn) return;

  const isEn = document.documentElement.lang === 'en';
  const assetBase = isEn ? '../' : '';
  const LABEL_MORE = isEn ? 'See more' : 'Дивитись більше';
  const LABEL_LESS = isEn ? 'Show less' : 'Показати менше';

  const images = isEn ? [
    { src: `${assetBase}assets/img/track1.png`, alt: 'Curtain-side semi-trailer' },
    { src: `${assetBase}assets/img/track2.png`, alt: 'Low-loader trailer' },
    { src: `${assetBase}assets/img/track3.png`, alt: 'Curtain-side semi-trailer for ADR' },
    { src: `${assetBase}assets/img/track4.png`, alt: 'Rigid box truck' },
    { src: `${assetBase}assets/img/track5.png`, alt: 'Refrigerated trailer' },
  ] : [
    { src: `${assetBase}assets/img/track1.png`, alt: 'Тентовий напівпричіп' },
    { src: `${assetBase}assets/img/track2.png`, alt: 'Низькорамний трал' },
    { src: `${assetBase}assets/img/track3.png`, alt: 'Тентовий напівпричіп під ADR' },
    { src: `${assetBase}assets/img/track4.png`, alt: 'Малотоннажний фургон' },
    { src: `${assetBase}assets/img/track5.png`, alt: 'Рефрижератор' },
  ];

  const initialCount = grid.children.length;
  const batchSize = 8;
  const maxSteps = 3;
  let step = 0;
  let nextIndex = initialCount;

  function addBatch() {
    for (let i = 0; i < batchSize; i++) {
      const image = images[nextIndex % images.length];
      nextIndex++;
      const item = document.createElement('div');
      item.className = 'fleet__item';
      item.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
      grid.appendChild(item);
    }
  }

  function collapse() {
    while (grid.children.length > initialCount) {
      grid.removeChild(grid.lastElementChild);
    }
    step = 0;
    nextIndex = initialCount;
    btn.textContent = LABEL_MORE;
  }

  btn.addEventListener('click', () => {
    if (step < maxSteps) {
      addBatch();
      step++;
      if (step === maxSteps) {
        btn.textContent = LABEL_LESS;
      }
    } else {
      collapse();
      grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

function initCasesToggle() {
  const btn = document.getElementById('casesToggleBtn');
  const hidden = document.querySelectorAll('.case--hidden');
  if (!btn || !hidden.length) return;

  const isEn = document.documentElement.lang === 'en';
  const LABEL_MORE = isEn ? 'See more' : 'Дивитись більше';
  const LABEL_LESS = isEn ? 'Collapse' : 'Згорнути';

  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;
    hidden.forEach(el => {
      el.style.display = expanded ? 'block' : 'none';
    });
    btn.textContent = expanded ? LABEL_LESS : LABEL_MORE;
    btn.setAttribute('aria-expanded', String(expanded));

    if (!expanded) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

function initScrollAnimations() {
  const targets = document.querySelectorAll('[data-anim]');
  if (!targets.length) return;

  document.querySelectorAll('[data-anim="stagger"]').forEach(box => {
    [...box.children].forEach((child, i) => {
      child.style.setProperty('--i', i);
    });
  });

  const pending = new Set(targets);

  // Фолбек-перевірка на голому getBoundingClientRect: у деяких станах вкладки
  // (згорнута/фонова, DevTools відкриті певним чином тощо) IntersectionObserver
  // не встигає доставити колбек вчасно чи взагалі, і заголовки лишаються
  // невидимими назавжди. Ця перевірка на scroll/resize/visibilitychange —
  // страховка, яка не залежить від таймінгу рендер-пайплайна.
  function revealVisible() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    pending.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.height <= 0) return;
      const visible = Math.min(rect.bottom, vh - 60) - Math.max(rect.top, 0);
      if (visible / rect.height >= 0.2) {
        el.classList.add('is-visible');
        pending.delete(el);
      }
    });
    if (!pending.size) {
      window.removeEventListener('scroll', revealVisible);
      window.removeEventListener('resize', revealVisible);
      document.removeEventListener('visibilitychange', revealVisible);
    }
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        pending.delete(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => io.observe(el));

  window.addEventListener('scroll', revealVisible, { passive: true });
  window.addEventListener('resize', revealVisible);
  document.addEventListener('visibilitychange', revealVisible);
  revealVisible();
}
