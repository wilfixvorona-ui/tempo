document.addEventListener('DOMContentLoaded', () => {
  // initScrollAnimations() викликається зсередини initPreloader() (після
  // finish()), а не тут напряму — інакше анімації секцій програються ще
  // під прелоадером.
  initPreloader();
  initInternalLinkSkip();
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
  initLangSwitch();
  initMobileNav();
  initCountryCardToggle();
  initReviewsScrollbar();
  initTeamGridLoadMore();
  initCountriesLoadMore();
});

function initTeamGridLoadMore() {
  const grid = document.querySelector('.team-grid');
  const btn = document.getElementById('teamGridLoadMoreBtn');
  if (!grid || !btn) return;

  btn.addEventListener('click', () => {
    const expanded = grid.classList.toggle('is-expanded');
    btn.textContent = expanded ? 'Згорнути' : 'Дивитись більше';
    if (!expanded) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

function initCountriesLoadMore() {
  const grid = document.querySelector('.countries__grid');
  const btn = document.getElementById('countriesLoadMoreBtn');
  if (!grid || !btn) return;

  // Текст кнопки — з data-атрибутів HTML, щоб той самий JS працював і в UA, і в EN версії.
  const collapsedLabel = btn.dataset.labelCollapsed || btn.textContent;
  const expandedLabel = btn.dataset.labelExpanded || btn.textContent;

  btn.addEventListener('click', () => {
    const expanded = grid.classList.toggle('is-expanded');
    btn.textContent = expanded ? expandedLabel : collapsedLabel;
    if (!expanded) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const panel = document.getElementById('mobileNav');
  if (!toggle || !panel) return;

  function close() {
    toggle.classList.remove('is-open');
    panel.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = toggle.classList.contains('is-open');
    if (isOpen) {
      close();
    } else {
      toggle.classList.add('is-open');
      panel.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !toggle.contains(e.target)) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function initCountryCardToggle() {
  const cards = document.querySelectorAll('.country-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-open');
    });
  });
}

function initReviewsScrollbar() {
  const scroller = document.querySelector('.reviews__marquee--row1');
  const fill = document.getElementById('reviewsScrollbarFill');
  if (!scroller || !fill) return;

  function update() {
    const max = scroller.scrollWidth - scroller.clientWidth;
    const percent = max > 0 ? (scroller.scrollLeft / max) * 100 : 0;
    fill.style.width = `${Math.max(12, percent)}%`;
  }

  scroller.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

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
    // На мобілці розмір фіксований в CSS, не адаптивний — інлайновий
    // font-size звідси зламав би верстку картки.
    if (window.innerWidth < 641) {
      names.forEach((el) => { el.style.fontSize = ''; });
      return;
    }

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

  // Без rAF-троттлінгу навмисно: у фонових вкладках rAF може не викликатись
  // взагалі, і хедер застрягне в неправильній темі.
  const update = () => {
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

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  document.addEventListener('visibilitychange', update);
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

// Розбиває заголовок/підзаголовок на слова для ефекту "слова знизу"
// (.fx-word-wrap > .fx-word-inner, див. CSS). Йде по childNodes, а не
// textContent, щоб зберегти ручні <br>.
function buildWords(el) {
  if (el.dataset.wordsBuilt) return;
  el.dataset.wordsBuilt = '1';

  let wordIndex = 0;

  function wrapWord(text) {
    const wrap = document.createElement('span');
    wrap.className = 'fx-word-wrap';
    const inner = document.createElement('span');
    inner.className = 'fx-word-inner';
    inner.style.transitionDelay = `${wordIndex * 70}ms`;
    inner.textContent = text;
    wrap.appendChild(inner);
    wordIndex++;
    return wrap;
  }

  function processTextNode(node) {
    const frag = document.createDocumentFragment();
    const parts = node.textContent.split(/(\s+)/);
    parts.forEach((tok) => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) {
        frag.appendChild(document.createTextNode(tok));
        return;
      }
      frag.appendChild(wrapWord(tok));
    });
    return frag;
  }

  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) return processTextNode(node);
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'BR') return node.cloneNode(true);
      const clone = node.cloneNode(false);
      Array.from(node.childNodes).forEach((child) => {
        clone.appendChild(processNode(child));
      });
      return clone;
    }
    return node.cloneNode(true);
  }

  const frag = document.createDocumentFragment();
  Array.from(el.childNodes).forEach((child) => {
    frag.appendChild(processNode(child));
  });
  el.innerHTML = '';
  el.appendChild(frag);
}

// Перед переходом по внутрішньому лінку (навігація, перемикач мови) —
// ставимо прапорець в sessionStorage, який inline-скрипт у <head>
// наступної сторінки зчитує й не показує прелоадер. Без прапорця
// прелоадер показується завжди (прямий вхід, F5).
function initInternalLinkSkip() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const a = e.target.closest('a');
    if (!a || !a.href) return;
    if (a.target === '_blank') return;
    if (a.hasAttribute('download')) return;

    const rawHref = a.getAttribute('href') || '';
    if (rawHref.startsWith('#')) return;
    if (/^(mailto|tel):/i.test(rawHref)) return;

    let url;
    try {
      url = new URL(a.href, window.location.href);
    } catch (err) {
      return;
    }
    if (url.origin !== window.location.origin) return;

    try {
      sessionStorage.setItem('tempoSkipPreloader', '1');
    } catch (err) {
      // sessionStorage недоступний — не критично.
    }
  });
}

// Прелоадер: вордмарк «Tempo» заливається білою хвилею знизу вгору
// (canvas + CSS-маска на .preloader__logo), під ним лічильник відсотків.
// Показується на кожен вхід/F5, окрім переходу по внутрішньому лінку
// (див. initInternalLinkSkip). prefers-reduced-motion — статичний білий
// вордмарк без хвилі й зуму.
function initPreloader() {
  const root = document.querySelector('.preloader');

  // Відео на хіро — без autoplay в HTML, стартує рівно тут, коли зникає
  // прелоадер.
  function playHeroVideo() {
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
      heroVideo.play().catch(() => {});
    }
  }

  if (!root) {
    playHeroVideo();
    initScrollAnimations();
    return;
  }

  const html = document.documentElement;
  const logoEl = root.querySelector('.preloader__logo');
  const canvas = root.querySelector('.preloader__canvas');
  const counterWrap = root.querySelector('.preloader__counter');
  const counterEl = counterWrap ? counterWrap.querySelector('span') : null;
  const ctx = canvas ? canvas.getContext('2d') : null;

  // is-preloading вже виставив (або ні) синхронний inline-скрипт у <head>.
  const shouldShowPreloader = html.classList.contains('is-preloading');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let finished = false;
  let resizeTimer = null;

  function onWindowResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 200);
  }

  function finish() {
    if (finished) return;
    finished = true;
    window.removeEventListener('resize', onWindowResize);
    html.classList.remove('is-preloading');
    html.style.overflow = '';
    root.remove();
    playHeroVideo();
    initScrollAnimations();
  }

  // ---- Скорочений шлях: prefers-reduced-motion ----
  // Без хвилі й без лічильника, лише фейд оверлею геть.
  function runShortPath(fadeMs) {
    if (counterWrap) counterWrap.style.display = 'none';
    if (logoEl) logoEl.style.background = '#fff';
    root.style.transitionDuration = `${fadeMs}ms`;
    // Форсуємо reflow замість чекання на rAF — той у фоновій вкладці може довго не спрацювати.
    void root.offsetHeight;
    root.classList.add('is-out');
    setTimeout(finish, fadeMs);
  }

  if (!shouldShowPreloader) {
    finish();
    return;
  }

  if (reduceMotion) {
    runShortPath(300);
    return;
  }

  // ---- Повна версія: хвиля на canvas + гібридний прогрес ----
  if (!canvas || !ctx) {
    finish();
    return;
  }

  html.classList.add('is-preloading');
  html.style.overflow = 'hidden';

  let amp = window.innerWidth >= 1024 ? 50 : 25;
  let w = 0;
  let h = 0;
  let phase = 0;

  function resizeCanvas() {
    amp = window.innerWidth >= 1024 ? 50 : 25;
    // Розміри беремо з .preloader__logo, а не з canvas: без явних CSS
    // width/height canvas визначає власний розмір по інтринзик 300x150.
    w = logoEl.offsetWidth;
    h = logoEl.offsetHeight + 1.75 * amp;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    // Скидання трансформації перед scale() — інакше на кожному ресайзі масштаб компонувався б.
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  // p: 1 = порожньо, 0 = залито повністю.
  function draw(p) {
    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.moveTo(0, h);
    // Крок вибірки 3px (x*3) — межа циклу w/3 рівно покриває ширину канваса.
    for (let x = 0; x < w / 3; x++) {
      const y = h * p - Math.sin(0.02 * x + phase) * Math.sin(0.01 * x + phase) * Math.sin(0.05 * x + phase) * amp;
      ctx.lineTo(x * 3, y);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
    phase += 0.03;
  }

  resizeCanvas();
  window.addEventListener('resize', onWindowResize);

  // Фіксуємо ширину лічильника по "100", щоб цифри 0→100 не "стрибали".
  if (counterEl) {
    counterEl.textContent = '100';
    counterEl.style.width = `${counterEl.offsetWidth}px`;
    counterEl.textContent = '0';
  }

  const START_DELAY = 500;
  const RAMP_DURATION = 3000;
  const SOFT_CAP = 95;
  const HARD_TIMEOUT = 6000;

  const heroVideo = document.getElementById('heroVideo');
  let loadFired = document.readyState === 'complete';
  let videoFired = !heroVideo || heroVideo.readyState >= 3; // HAVE_FUTURE_DATA ~ canplaythrough
  let ready = loadFired && videoFired;

  window.addEventListener('load', () => {
    loadFired = true;
    ready = loadFired && videoFired;
  });
  if (heroVideo && !videoFired) {
    heroVideo.addEventListener('canplaythrough', () => {
      videoFired = true;
      ready = loadFired && videoFired;
    }, { once: true });
  }

  const hardTimeoutId = setTimeout(() => { ready = true; }, HARD_TIMEOUT);

  let startTime = null;
  let displayProgress = 0;
  let exitStarted = false;

  function tick(now) {
    if (startTime === null) startTime = now;
    const elapsed = now - startTime;

    if (elapsed >= START_DELAY) {
      const t = Math.min((elapsed - START_DELAY) / RAMP_DURATION, 1);
      const rampValue = t * 100;
      displayProgress = ready ? Math.max(displayProgress, rampValue) : Math.min(rampValue, SOFT_CAP);
    }

    draw(1 - displayProgress / 100);
    if (counterEl) counterEl.textContent = String(Math.round(displayProgress));

    if (displayProgress >= 100 && !exitStarted) {
      exitStarted = true;
      clearTimeout(hardTimeoutId);
      startExit();
      return;
    }

    requestAnimationFrame(tick);
  }

  function startExit() {
    // 1) лічильник — фейд 250мс
    if (counterWrap) counterWrap.classList.add('is-out');

    // 2) фон вордмарка → суцільний білий, 200мс
    if (logoEl) logoEl.classList.add('is-filled');

    // 3) на ~90% тривалості кроку 2 — вордмарк зникає + зумиться, 1с
    setTimeout(() => {
      if (!logoEl) return;
      const factor = (window.innerWidth / logoEl.offsetWidth) * 2;
      logoEl.style.transform = `scale(${factor})`;
      logoEl.classList.add('is-zoom');
    }, 180);

    // 4) весь оверлей — фейд геть, потім прибрати з DOM
    setTimeout(() => {
      root.style.transitionDuration = '350ms';
      root.classList.add('is-out');
      setTimeout(finish, 350);
    }, 180 + 1000);
  }

  requestAnimationFrame(tick);
}

function initScrollAnimations() {
  document.querySelectorAll('[data-anim="wipe"]').forEach(buildWords);

  const targets = document.querySelectorAll('[data-anim]');
  if (!targets.length) return;

  document.querySelectorAll('[data-anim="stagger"]').forEach(box => {
    [...box.children].forEach((child, i) => {
      child.style.setProperty('--i', i);
    });
  });

  const pending = new Set(targets);

  // Фолбек: IntersectionObserver іноді не встигає спрацювати вчасно (фонова
  // вкладка, DevTools) — тоді елементи лишаються невидимими назавжди.
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
