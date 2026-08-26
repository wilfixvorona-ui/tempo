(() => {
  const PAGE_SIZE = 5;

  const PLATFORM_ICONS = {
    google: { src: 'assets/img/google-logo.png', alt: 'Google' },
    facebook: { src: 'assets/img/logos_facebook.png', alt: 'Facebook' },
    lardi: { src: 'assets/img/lardi-trans.png', alt: 'Lardi-Trans' },
  };

  const reviews = [
    // ===== Page 1 =====
    {
      stars: 4,
      score: '4',
      text: 'Потрібно було терміново відправити партію в Румунію, дали два дні на все. Знайшли машину, оформили документи й вивезли вчасно. Не всі перевізники взагалі беруться за такі строки.',
      name: 'Дмитро Лисенко',
      platform: 'lardi',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'Працюємо вже понад рік, возимо тентом по всій Європі. Жодного разу не було зриву дедлайну, диспетчер завжди на зв’язку і попереджає про будь-які затримки на кордоні заздалегідь.',
      name: 'Максим Левченко',
      platform: 'lardi',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'Замовляли рефрижератор для перевезення продуктів у Німеччину. Температурний режим витримали повністю, водій присилав фото термографа на кожній зупинці. Дуже задоволені сервісом.',
      name: 'Андрій Кравченко',
      platform: 'lardi',
      reply: null,
    },
    {
      stars: 4,
      score: '4',
      text: 'Замовляв перевезення обладнання на завод у Чехії. Ціна відповідала тому, що назвали на початку, без прихованих доплат. Єдине — хотілося б швидшого зворотного зв’язку у вихідні.',
      name: 'Юрій Мазур',
      platform: 'google',
      reply: {
        text: 'Дякуємо за відгук, Юрію! Врахували побажання щодо зв’язку у вихідні — з цього місяця диспетчерська служба чергує 7 днів на тиждень. Раді, що вантаж доїхав вчасно.',
      },
    },
    {
      stars: 5,
      score: '5',
      text: 'Возимо збірні вантажі до Польщі щомісяця. Зручно, що можна відправити навіть одну палету і не переплачувати за цілу фуру. Документи оформляють швидко, без затримок на митниці.',
      name: 'Оксана Гнатюк',
      platform: 'facebook',
      reply: null,
    },

    // ===== Page 2 (generated) =====
    {
      stars: 5,
      score: '5',
      text: 'Перевозили меблі у Варшаву, все доїхало без жодної подряпини — акуратно закріпили і обгорнули. Водій попереджав про кожен етап маршруту, було спокійно за вантаж.',
      name: 'Ірина Ковальська',
      platform: 'google',
      reply: null,
    },
    {
      stars: 4,
      score: '4',
      text: 'Тентова перевезення до Словаччини пройшла добре, вклались у обіцяні терміни. Трохи довго чекали підтвердження заявки менеджером, але у решті все влаштувало.',
      name: 'Богдан Тимошенко',
      platform: 'lardi',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'Співпрацюємо вже третій рік, возимо будівельні матеріали по Україні та в Молдову. Жодного разу не підвели з датою подачі машини, ціни адекватні ринку.',
      name: 'Наталія Ісаєнко',
      platform: 'facebook',
      reply: null,
    },
    {
      stars: 3,
      score: '3',
      text: 'Загалом нормально, але одного разу машину подали з запізненням на кілька годин без попередження. Довелось самому дзвонити й уточнювати. Вантаж у результаті доїхав цілим.',
      name: 'Віталій Орлюк',
      platform: 'google',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'Возили негабарит — будівельну техніку в Литву. Оформили всі дозволи на широкогабаритний вантаж самі, нам залишилось тільки підписати документи. Дуже професійно.',
      name: 'Сергій Пилипенко',
      platform: 'lardi',
      reply: null,
    },

    // ===== Page 3 (generated) =====
    {
      stars: 4,
      score: '4',
      text: 'Замовляли доставку партії одягу до Італії. Все пройшло вчасно, водій завжди відповідав на дзвінки. Хотілося б трохи детальнішого трекінгу вантажу онлайн.',
      name: 'Марина Ткаченко',
      platform: 'facebook',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'ADR-перевезення хімічної продукції у Німеччину — знайшли компанію, яка справді розбирається у процедурах. Всі дозволи й маркування були готові заздалегідь.',
      name: 'Олексій Кузьменко',
      platform: 'google',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'Регулярно відправляємо збірні вантажі в Нідерланди. Ціна не змінюється в процесі, як обіцяли на старті, так і виставили в рахунку. Рекомендуємо.',
      name: 'Юлія Савчук',
      platform: 'lardi',
      reply: null,
    },
    {
      stars: 4,
      score: '4',
      text: 'Перевозили харчову продукцію рефрижератором до Австрії. Температуру тримали стабільно, документи по СМR оформили без помилок. Загалом гарний досвід співпраці.',
      name: 'Павло Гаврилюк',
      platform: 'google',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'Дуже сподобалось, що менеджер одразу порахував орієнтовну вартість і не змінював умови по ходу. Вантаж (меблевий цех) доїхав до Франції за 4 дні, як і обіцяли.',
      name: 'Катерина Волошина',
      platform: 'facebook',
      reply: null,
    },

    // ===== Page 4 (generated) =====
    {
      stars: 5,
      score: '5',
      text: 'Тральним перевезенням возили спецтехніку на об’єкт у Хорватію. Все узгодили по маршруту заздалегідь, супровід організували самі. Дуже задоволені результатом.',
      name: 'Ігор Бондаренко',
      platform: 'lardi',
      reply: null,
    },
    {
      stars: 4,
      score: '4',
      text: 'Возимо збірні партії щотижня в Чехію та Словаччину. Загалом стабільно, іноді буває невелика затримка на кордоні, але про це завжди попереджають заздалегідь.',
      name: 'Аліна Захарченко',
      platform: 'google',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'Перше знайомство з компанією — і одразу приємне враження. Чіткі відповіді на всі питання, зрозумілий договір, вантаж (електроніка) доставили без затримок і пошкоджень.',
      name: 'Роман Дяченко',
      platform: 'facebook',
      reply: null,
    },
    {
      stars: 2,
      score: '2',
      text: 'Виникло непорозуміння з датою завантаження, довелось переносити відправку на день. Врешті все вивезли, але осад від початкової плутанини лишився.',
      name: 'Тарас Мельничук',
      platform: 'google',
      reply: null,
    },
    {
      stars: 5,
      score: '5',
      text: 'Співпрацюємо на постійній основі — возимо продукцію в Польщу, Німеччину і Бельгію. За два роки жодного серйозного зриву графіка. Рекомендуємо як надійного партнера.',
      name: 'Вадим Литвиненко',
      platform: 'lardi',
      reply: null,
    },
  ];

  function starIcon(filled) {
    const src = filled ? 'assets/img/star-yellow.png' : 'assets/img/star-grey.png';
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
            Відповідь Tempo
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
          <img src="assets/img/user-icon.png" alt="" class="review-card__avatar">
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
      btn.querySelector('img').src = disabled ? 'assets/img/arrow2.png' : 'assets/img/arrow1.png';
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
