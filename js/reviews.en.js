(() => {
  const PAGE_SIZE = 5;

  const PLATFORM_ICONS = {
    google: { src: '../assets/img/google-logo.png', alt: 'Google' },
    facebook: { src: '../assets/img/logos_facebook.png', alt: 'Facebook' },
    lardi: { src: '../assets/img/lardi-trans.png', alt: 'Lardi-Trans' },
  };

  const reviews = [
    // ===== Page 1 =====
    {
      stars: 4,
      score: '4',
      text: 'We needed to urgently send a shipment to Romania and had just two days for everything. They found a truck, handled the paperwork and got it out on time. Not every carrier is willing to take on such deadlines.',
      name: 'Dmytro Lysenko',
      platform: 'lardi',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'We’ve been working together for over a year, shipping curtain-side loads across Europe. Not once has a deadline been missed — the dispatcher is always reachable and warns us about any border delays in advance.',
      name: 'Maksym Levchenko',
      platform: 'lardi',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'We ordered a refrigerated truck to transport food to Germany. The temperature was maintained the whole way, the driver sent thermograph photos at every stop. Very happy with the service.',
      name: 'Andrii Kravchenko',
      platform: 'lardi',
      reply: null,
    },
    {
      stars: 4,
      score: '4',
      text: 'I ordered equipment transport to a factory in Czechia. The price matched what was quoted at the start, no hidden fees. The only thing — I’d like faster responses on weekends.',
      name: 'Yurii Mazur',
      platform: 'google',
      reply: {
        text: 'Thank you for the feedback, Yurii! We’ve taken your point about weekend contact on board — starting this month our dispatch team is on duty 7 days a week. Glad the cargo arrived on time.',
      },
    },
    {
      stars: 5,
      score: '5',
      text: 'We ship groupage loads to Poland every month. It’s convenient that you can send even a single pallet without paying for a whole truck. The paperwork is handled quickly, no delays at customs.',
      name: 'Oksana Hnatiuk',
      platform: 'facebook',
      reply: null,
    },

    // ===== Page 2 =====
    {
      stars: 5,
      score: '5',
      text: 'We shipped furniture to Warsaw, everything arrived without a single scratch — carefully secured and wrapped. The driver kept us updated at every stage of the route, so we didn’t worry about the cargo.',
      name: 'Iryna Kovalska',
      platform: 'google',
      reply: null,
    },
    {
      stars: 4,
      score: '4',
      text: 'The curtain-side shipment to Slovakia went well, they kept to the promised timeframe. It took a bit long to get the request confirmed by the manager, but otherwise everything worked out.',
      name: 'Bohdan Tymoshenko',
      platform: 'lardi',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'We’ve been working together for three years now, shipping construction materials around Ukraine and to Moldova. Not once have they let us down on the truck arrival date, and the prices are fair for the market.',
      name: 'Nataliia Isaienko',
      platform: 'facebook',
      reply: null,
    },
    {
      stars: 3,
      score: '3',
      text: 'Overall fine, but on one occasion the truck showed up several hours late without any warning. I had to call myself to find out what was going on. The cargo did arrive intact in the end.',
      name: 'Vitalii Orliuk',
      platform: 'google',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'They transported oversized cargo — construction equipment to Lithuania. They handled all the oversized load permits themselves, we only had to sign the paperwork. Very professional.',
      name: 'Serhii Pylypenko',
      platform: 'lardi',
      reply: null,
    },

    // ===== Page 3 =====
    {
      stars: 4,
      score: '4',
      text: 'We ordered a clothing shipment to Italy. Everything went on time, the driver always answered calls. Would like a bit more detailed online cargo tracking, though.',
      name: 'Maryna Tkachenko',
      platform: 'facebook',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'ADR transport of chemical products to Germany — we found a company that genuinely understands the procedures. All permits and labeling were ready in advance.',
      name: 'Oleksii Kuzmenko',
      platform: 'google',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'We regularly send groupage shipments to the Netherlands. The price never changes along the way — what was promised at the start is what ends up on the invoice. We recommend them.',
      name: 'Yuliia Savchuk',
      platform: 'lardi',
      reply: null,
    },
    {
      stars: 4,
      score: '4',
      text: 'We shipped food products by refrigerated truck to Austria. The temperature was kept stable, the CMR documents were prepared without errors. Overall a good experience working with them.',
      name: 'Pavlo Havryliuk',
      platform: 'google',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'What we really liked was that the manager calculated the approximate cost right away and didn’t change the terms along the way. The cargo (a furniture workshop) reached France in 4 days, exactly as promised.',
      name: 'Kateryna Voloshyna',
      platform: 'facebook',
      reply: null,
    },

    // ===== Page 4 =====
    {
      stars: 5,
      score: '5',
      text: 'We used a low-loader to transport special equipment to a site in Croatia. Everything about the route was agreed in advance, they organized the escort themselves. Very happy with the result.',
      name: 'Ihor Bondarenko',
      platform: 'lardi',
      reply: null,
    },
    {
      stars: 4,
      score: '4',
      text: 'We ship groupage loads weekly to Czechia and Slovakia. Generally stable, sometimes there’s a small delay at the border, but they always give advance warning about it.',
      name: 'Alina Zakharchenko',
      platform: 'google',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'Our first time working with this company, and it made a great impression right away. Clear answers to every question, an understandable contract, and the cargo (electronics) was delivered without delays or damage.',
      name: 'Roman Diachenko',
      platform: 'facebook',
      reply: null,
    },
    {
      stars: 2,
      score: '2',
      text: 'There was a mix-up over the loading date, and we had to push the shipment back a day. Everything did get shipped in the end, but the initial confusion left a bit of a sour taste.',
      name: 'Taras Melnychuk',
      platform: 'google',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'We work with them on an ongoing basis — shipping goods to Poland, Germany and Belgium. Over two years, not a single serious schedule failure. We recommend them as a reliable partner.',
      name: 'Vadym Lytvynenko',
      platform: 'lardi',
      reply: null,
    },
  ];

  function starIcon(filled) {
    const src = filled ? '../assets/img/star-yellow.png' : '../assets/img/star-grey.png';
    return `<img src="${src}" alt="" class="star-icon">`;
  }

  function renderCard(review) {
    const stars = Array.from({ length: 5 }, (_, i) => starIcon(i < review.stars)).join('');
    const platform = PLATFORM_ICONS[review.platform];

    const reply = review.reply
      ? `
        <div class="review-card__reply">
          <div class="review-card__reply-head">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4L3 8L7 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 8H11.5C13.4 8 15 9.6 15 11.5V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Tempo's reply
          </div>
          <p class="review-card__reply-text text-body">${review.reply.text}</p>
        </div>`
      : '';

    return `
      <article class="review-card">
        <div class="review-card__top">
          <div class="review-card__stars" aria-hidden="true">${stars}</div>
          <span class="review-card__score">${review.score}<span class="review-card__score-max">/5</span></span>
        </div>
        <p class="review-card__text text-body">${review.text}</p>
        <div class="review-card__footer">
          <img src="../assets/img/user-icon.png" alt="" class="review-card__avatar">
          <span class="review-card__name">${review.name}</span>
          <img src="${platform.src}" alt="${platform.alt}" class="review-card__platform">
        </div>${reply}
      </article>`;
  }

  function initReviewsPagination() {
    const list = document.getElementById('reviewsList');
    const pagesWrap = document.getElementById('reviewsPages');
    const prevBtn = document.getElementById('reviewsPrev');
    const nextBtn = document.getElementById('reviewsNext');

    if (!list || !pagesWrap || !prevBtn || !nextBtn) return;

    const totalPages = Math.ceil(reviews.length / PAGE_SIZE);
    let currentPage = 1;

    function setArrowState(btn, disabled) {
      btn.disabled = disabled;
      btn.classList.toggle('is-disabled', disabled);
      btn.classList.toggle('is-active', !disabled);
      btn.querySelector('img').src = disabled ? '../assets/img/arrow2.png' : '../assets/img/arrow1.png';
    }

    function renderPages() {
      pagesWrap.innerHTML = Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        const active = page === currentPage ? ' is-active' : '';
        return `<button type="button" class="reviews-pagination__page${active}" data-page="${page}">${page}</button>`;
      }).join('');
    }

    function renderList() {
      const start = (currentPage - 1) * PAGE_SIZE;
      const pageReviews = reviews.slice(start, start + PAGE_SIZE);
      list.innerHTML = pageReviews.map(renderCard).join('');
    }

    function goToPage(page) {
      currentPage = Math.min(Math.max(page, 1), totalPages);
      renderList();
      renderPages();
      setArrowState(prevBtn, currentPage === 1);
      setArrowState(nextBtn, currentPage === totalPages);
    }

    pagesWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-page]');
      if (!btn) return;
      goToPage(Number(btn.dataset.page));
    });

    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

    goToPage(1);
  }

  document.addEventListener('DOMContentLoaded', initReviewsPagination);
})();
