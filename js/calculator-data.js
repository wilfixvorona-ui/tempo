/* ============================================================
   Tempo — дані для калькулятора вартості
   Один файл-джерело правди: його читає і калькулятор,
   і таблиця тарифів на сторінці «Ціни».
   ============================================================ */

/* Коефіцієнт «пряма лінія → реальна дорога».
   Перевірено на Київ–Париж: 2020 км по прямій × 1.2 ≈ 2400 км. */
export const ROAD_FACTOR = 1.2;

/* Базова ставка за км для тентового напівпричепа, повна фура, євро. */
export const RATE_PER_KM = 1.15;

/* Митне оформлення + документи, євро. */
export const FIXED_FEES = 150;

/* ------------------------------------------------------------
   КРАЇНИ
   daysMin / daysMax МАЮТЬ збігатися з картками країн на сайті.
   Не рахувати строк формулою — брати звідси, інакше калькулятор
   почне суперечити тому, що написано на картках.
   ------------------------------------------------------------ */
export const COUNTRIES = {
  UA: { name: 'Україна',    nameEn: 'Ukraine',     daysMin: 1, daysMax: 2 },
  PL: { name: 'Польща',     nameEn: 'Poland',      daysMin: 2, daysMax: 3 },
  HU: { name: 'Угорщина',   nameEn: 'Hungary',     daysMin: 2, daysMax: 3 },
  RO: { name: 'Румунія',    nameEn: 'Romania',     daysMin: 3, daysMax: 4 },
  DE: { name: 'Німеччина',  nameEn: 'Germany',     daysMin: 3, daysMax: 5 }, // ← звір з карткою
  IT: { name: 'Італія',     nameEn: 'Italy',       daysMin: 5, daysMax: 7 },
  CH: { name: 'Швейцарія',  nameEn: 'Switzerland', daysMin: 5, daysMax: 7 },
  FR: { name: 'Франція',    nameEn: 'France',      daysMin: 6, daysMax: 8 },
  ES: { name: 'Іспанія',    nameEn: 'Spain',       daysMin: 8, daysMax: 10 }
};

/* ------------------------------------------------------------
   ТИПИ ВАНТАЖУ
   ------------------------------------------------------------ */
export const CARGO_TYPES = {
  general: {
    label: 'Генеральний вантаж', labelEn: 'General cargo',
    transport: 'тентовий напівпричіп', transportEn: 'curtain-side trailer', k: 1.0
  },
  refrigerated: {
    label: 'Температурний режим', labelEn: 'Temperature-controlled',
    transport: 'рефрижератор', transportEn: 'refrigerated trailer', k: 1.25
  },
  fragile: {
    label: 'Крихкий вантаж', labelEn: 'Fragile cargo',
    transport: 'тентовий напівпричіп', transportEn: 'curtain-side trailer', k: 1.12
  },
  oversized: {
    label: 'Негабаритний', labelEn: 'Oversized',
    transport: 'низькорамний трал', transportEn: 'low-bed trailer', k: 1.45
  },
  dangerous: {
    label: 'Небезпечний (ADR)', labelEn: 'Dangerous goods (ADR)',
    transport: 'тент ADR', transportEn: 'ADR curtain-side trailer', k: 1.35
  }
};

/* ------------------------------------------------------------
   ТИПИ ЗАВАНТАЖЕННЯ
   ------------------------------------------------------------ */
export const LOADING_TYPES = {
  ftl: {
    label: 'Повна фура', labelEn: 'Full truck load',
    k: 1.0, daysExtra: 0
  },
  ltl: {
    label: 'Догруз', labelEn: 'Groupage',
    k: 0.55, daysExtra: 2
  }
};

/* ------------------------------------------------------------
   МІСТА
   aliases — усе, що людина може ввести: укр., рос., англ., локальне.
   Пошук іде по name + nameEn + aliases, без урахування регістру,
   апострофів, дефісів і діакритики.
   ------------------------------------------------------------ */
export const CITIES = [
  /* --- Україна --- */
  { name: 'Київ', nameEn: 'Kyiv', country: 'UA', lat: 50.4501, lng: 30.5234, aliases: ['киев', 'kiev'] },
  { name: 'Львів', nameEn: 'Lviv', country: 'UA', lat: 49.8397, lng: 24.0297, aliases: ['львов', 'lvov'] },
  { name: 'Одеса', nameEn: 'Odesa', country: 'UA', lat: 46.4825, lng: 30.7233, aliases: ['одесса', 'odessa'] },
  { name: 'Харків', nameEn: 'Kharkiv', country: 'UA', lat: 49.9935, lng: 36.2304, aliases: ['харьков'] },
  { name: 'Дніпро', nameEn: 'Dnipro', country: 'UA', lat: 48.4647, lng: 35.0462, aliases: ['днепр', 'дніпропетровськ'] },
  { name: 'Запоріжжя', nameEn: 'Zaporizhzhia', country: 'UA', lat: 47.8388, lng: 35.1396, aliases: ['запорожье'] },
  { name: 'Вінниця', nameEn: 'Vinnytsia', country: 'UA', lat: 49.2331, lng: 28.4682, aliases: ['винница'] },
  { name: 'Полтава', nameEn: 'Poltava', country: 'UA', lat: 49.5883, lng: 34.5514, aliases: [] },
  { name: 'Чернівці', nameEn: 'Chernivtsi', country: 'UA', lat: 48.2921, lng: 25.9358, aliases: ['черновцы'] },
  { name: 'Ужгород', nameEn: 'Uzhhorod', country: 'UA', lat: 48.6208, lng: 22.2879, aliases: ['ужгород'] },
  { name: 'Івано-Франківськ', nameEn: 'Ivano-Frankivsk', country: 'UA', lat: 48.9226, lng: 24.7111, aliases: ['франківськ'] },
  { name: 'Тернопіль', nameEn: 'Ternopil', country: 'UA', lat: 49.5535, lng: 25.5948, aliases: ['тернополь'] },
  { name: 'Рівне', nameEn: 'Rivne', country: 'UA', lat: 50.6199, lng: 26.2516, aliases: ['ровно'] },
  { name: 'Луцьк', nameEn: 'Lutsk', country: 'UA', lat: 50.7472, lng: 25.3254, aliases: [] },
  { name: 'Хмельницький', nameEn: 'Khmelnytskyi', country: 'UA', lat: 49.4229, lng: 26.9871, aliases: ['хмельницкий'] },
  { name: 'Житомир', nameEn: 'Zhytomyr', country: 'UA', lat: 50.2547, lng: 28.6587, aliases: [] },
  { name: 'Черкаси', nameEn: 'Cherkasy', country: 'UA', lat: 49.4444, lng: 32.0598, aliases: ['черкассы'] },
  { name: 'Кропивницький', nameEn: 'Kropyvnytskyi', country: 'UA', lat: 48.5079, lng: 32.2623, aliases: ['кировоград'] },
  { name: 'Миколаїв', nameEn: 'Mykolaiv', country: 'UA', lat: 46.9750, lng: 31.9946, aliases: ['николаев'] },
  { name: 'Чернігів', nameEn: 'Chernihiv', country: 'UA', lat: 51.4982, lng: 31.2893, aliases: ['чернигов'] },
  { name: 'Суми', nameEn: 'Sumy', country: 'UA', lat: 50.9077, lng: 34.7981, aliases: [] },
  { name: 'Херсон', nameEn: 'Kherson', country: 'UA', lat: 46.6354, lng: 32.6169, aliases: [] },

  /* --- Польща --- */
  { name: 'Варшава', nameEn: 'Warsaw', country: 'PL', lat: 52.2297, lng: 21.0122, aliases: ['warszawa'] },
  { name: 'Краків', nameEn: 'Krakow', country: 'PL', lat: 50.0647, lng: 19.9450, aliases: ['kraków', 'краков'] },
  { name: 'Вроцлав', nameEn: 'Wroclaw', country: 'PL', lat: 51.1079, lng: 17.0385, aliases: ['wrocław'] },
  { name: 'Познань', nameEn: 'Poznan', country: 'PL', lat: 52.4064, lng: 16.9252, aliases: ['poznań'] },
  { name: 'Гданськ', nameEn: 'Gdansk', country: 'PL', lat: 54.3520, lng: 18.6466, aliases: ['gdańsk', 'гданьск'] },
  { name: 'Лодзь', nameEn: 'Lodz', country: 'PL', lat: 51.7592, lng: 19.4560, aliases: ['łódź'] },
  { name: 'Катовіце', nameEn: 'Katowice', country: 'PL', lat: 50.2649, lng: 19.0238, aliases: ['катовице'] },

  /* --- Німеччина --- */
  { name: 'Берлін', nameEn: 'Berlin', country: 'DE', lat: 52.5200, lng: 13.4050, aliases: ['берлин'] },
  { name: 'Гамбург', nameEn: 'Hamburg', country: 'DE', lat: 53.5511, lng: 9.9937, aliases: [] },
  { name: 'Мюнхен', nameEn: 'Munich', country: 'DE', lat: 48.1351, lng: 11.5820, aliases: ['münchen'] },
  { name: 'Кельн', nameEn: 'Cologne', country: 'DE', lat: 50.9375, lng: 6.9603, aliases: ['köln', 'кьольн'] },
  { name: 'Франкфурт', nameEn: 'Frankfurt', country: 'DE', lat: 50.1109, lng: 8.6821, aliases: ['frankfurt am main'] },
  { name: 'Штутгарт', nameEn: 'Stuttgart', country: 'DE', lat: 48.7758, lng: 9.1829, aliases: [] },

  /* --- Франція --- */
  { name: 'Париж', nameEn: 'Paris', country: 'FR', lat: 48.8566, lng: 2.3522, aliases: [] },
  { name: 'Ліон', nameEn: 'Lyon', country: 'FR', lat: 45.7640, lng: 4.8357, aliases: ['лион'] },
  { name: 'Марсель', nameEn: 'Marseille', country: 'FR', lat: 43.2965, lng: 5.3698, aliases: [] },
  { name: 'Тулуза', nameEn: 'Toulouse', country: 'FR', lat: 43.6047, lng: 1.4442, aliases: [] },
  { name: 'Ніцца', nameEn: 'Nice', country: 'FR', lat: 43.7102, lng: 7.2620, aliases: ['ницца'] },
  { name: 'Нант', nameEn: 'Nantes', country: 'FR', lat: 47.2184, lng: -1.5536, aliases: [] },
  { name: 'Страсбург', nameEn: 'Strasbourg', country: 'FR', lat: 48.5734, lng: 7.7521, aliases: [] },

  /* --- Італія --- */
  { name: 'Мілан', nameEn: 'Milan', country: 'IT', lat: 45.4642, lng: 9.1900, aliases: ['milano', 'милан'] },
  { name: 'Рим', nameEn: 'Rome', country: 'IT', lat: 41.9028, lng: 12.4964, aliases: ['roma'] },
  { name: 'Турин', nameEn: 'Turin', country: 'IT', lat: 45.0703, lng: 7.6869, aliases: ['torino'] },
  { name: 'Болонья', nameEn: 'Bologna', country: 'IT', lat: 44.4949, lng: 11.3426, aliases: [] },
  { name: 'Верона', nameEn: 'Verona', country: 'IT', lat: 45.4384, lng: 10.9916, aliases: [] },
  { name: 'Неаполь', nameEn: 'Naples', country: 'IT', lat: 40.8518, lng: 14.2681, aliases: ['napoli'] },
  { name: 'Флоренція', nameEn: 'Florence', country: 'IT', lat: 43.7696, lng: 11.2558, aliases: ['firenze', 'флоренция'] },

  /* --- Угорщина --- */
  { name: 'Будапешт', nameEn: 'Budapest', country: 'HU', lat: 47.4979, lng: 19.0402, aliases: [] },
  { name: 'Дебрецен', nameEn: 'Debrecen', country: 'HU', lat: 47.5316, lng: 21.6273, aliases: [] },
  { name: 'Сегед', nameEn: 'Szeged', country: 'HU', lat: 46.2530, lng: 20.1414, aliases: [] },
  { name: 'Мішкольц', nameEn: 'Miskolc', country: 'HU', lat: 48.1035, lng: 20.7784, aliases: ['мишкольц'] },
  { name: 'Дьйор', nameEn: 'Gyor', country: 'HU', lat: 47.6875, lng: 17.6504, aliases: ['győr', 'дьєр'] },
  { name: 'Печ', nameEn: 'Pecs', country: 'HU', lat: 46.0727, lng: 18.2323, aliases: ['pécs'] },

  /* --- Швейцарія --- */
  { name: 'Цюрих', nameEn: 'Zurich', country: 'CH', lat: 47.3769, lng: 8.5417, aliases: ['zürich'] },
  { name: 'Женева', nameEn: 'Geneva', country: 'CH', lat: 46.2044, lng: 6.1432, aliases: ['genève', 'geneve'] },
  { name: 'Базель', nameEn: 'Basel', country: 'CH', lat: 47.5596, lng: 7.5886, aliases: [] },
  { name: 'Берн', nameEn: 'Bern', country: 'CH', lat: 46.9480, lng: 7.4474, aliases: [] },
  { name: 'Лозанна', nameEn: 'Lausanne', country: 'CH', lat: 46.5197, lng: 6.6323, aliases: [] },
  { name: 'Люцерн', nameEn: 'Lucerne', country: 'CH', lat: 47.0502, lng: 8.3093, aliases: ['luzern'] },

  /* --- Іспанія --- */
  { name: 'Мадрид', nameEn: 'Madrid', country: 'ES', lat: 40.4168, lng: -3.7038, aliases: [] },
  { name: 'Барселона', nameEn: 'Barcelona', country: 'ES', lat: 41.3851, lng: 2.1734, aliases: [] },
  { name: 'Валенсія', nameEn: 'Valencia', country: 'ES', lat: 39.4699, lng: -0.3763, aliases: ['валенсия'] },
  { name: 'Сарагоса', nameEn: 'Zaragoza', country: 'ES', lat: 41.6488, lng: -0.8891, aliases: [] },
  { name: 'Севілья', nameEn: 'Seville', country: 'ES', lat: 37.3891, lng: -5.9845, aliases: ['sevilla', 'севилья'] },
  { name: 'Більбао', nameEn: 'Bilbao', country: 'ES', lat: 43.2630, lng: -2.9350, aliases: ['бильбао'] },

  /* --- Румунія --- */
  { name: 'Бухарест', nameEn: 'Bucharest', country: 'RO', lat: 44.4268, lng: 26.1025, aliases: ['bucurești', 'bucuresti'] },
  { name: 'Клуж-Напока', nameEn: 'Cluj-Napoca', country: 'RO', lat: 46.7712, lng: 23.6236, aliases: ['cluj', 'клуж'] },
  { name: 'Тімішоара', nameEn: 'Timisoara', country: 'RO', lat: 45.7489, lng: 21.2087, aliases: ['timișoara', 'тимишоара'] },
  { name: 'Ясси', nameEn: 'Iasi', country: 'RO', lat: 47.1585, lng: 27.6014, aliases: ['iași', 'яси'] },
  { name: 'Констанца', nameEn: 'Constanta', country: 'RO', lat: 44.1598, lng: 28.6348, aliases: ['constanța'] },
  { name: 'Брашов', nameEn: 'Brasov', country: 'RO', lat: 45.6427, lng: 25.5887, aliases: ['brașov'] }
];

/* ============================================================
   ЛОГІКА
   ============================================================ */

/** Нормалізація вводу: регістр, діакритика, апострофи, дефіси, пробіли. */
export function normalize(str) {
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’ʼ`\-\s]/g, '');
}

/** Пошук міста за будь-яким написанням. Повертає об'єкт міста або null. */
export function findCity(query) {
  const q = normalize(query);
  if (!q) return null;
  return CITIES.find(c =>
    normalize(c.name) === q ||
    normalize(c.nameEn) === q ||
    c.aliases.some(a => normalize(a) === q)
  ) || null;
}

/** Підказки для datalist / автокомпліту: усе, що починається з введеного. */
export function suggestCities(query, limit = 8) {
  const q = normalize(query);
  if (!q) return [];
  return CITIES
    .filter(c =>
      normalize(c.name).startsWith(q) ||
      normalize(c.nameEn).startsWith(q) ||
      c.aliases.some(a => normalize(a).startsWith(q))
    )
    .slice(0, limit);
}

/** Відстань по дорозі, км. Гаверсинус × ROAD_FACTOR, округлення до 50. */
export function distanceKm(from, to) {
  const R = 6371;
  const rad = d => (d * Math.PI) / 180;
  const dLat = rad(to.lat - from.lat);
  const dLng = rad(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(from.lat)) * Math.cos(rad(to.lat)) * Math.sin(dLng / 2) ** 2;
  const straight = 2 * R * Math.asin(Math.sqrt(a));
  return Math.round((straight * ROAD_FACTOR) / 50) * 50;
}

/** Дата прибуття: сьогодні + N робочих днів (неділя пропускається). */
export function arrivalDate(days) {
  const d = new Date();
  let left = days;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) left--;
  }
  const pad = n => String(n).padStart(2, '0');
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${String(d.getFullYear()).slice(2)}`;
}

/**
 * Головна функція розрахунку.
 * @returns об'єкт результату або { error } — якщо ввід некоректний.
 */
export function calcQuote({ from, to, cargoType, loadingType }) {
  const cityFrom = findCity(from);
  const cityTo = findCity(to);

  if (!cityFrom) return { error: 'from_not_found' };
  if (!cityTo) return { error: 'to_not_found' };
  if (cityFrom === cityTo) return { error: 'same_city' };

  const cargo = CARGO_TYPES[cargoType];
  const loading = LOADING_TYPES[loadingType];
  if (!cargo || !loading) return { error: 'invalid_options' };

  const distance = distanceKm(cityFrom, cityTo);

  const base = distance * RATE_PER_KM * cargo.k * loading.k + FIXED_FEES;
  const priceLow = Math.floor(base / 50) * 50;
  const priceHigh = priceLow + 100;

  /* Строк беремо з країни призначення — так само, як на картках країн.
     Для догрузу додаємо два дні на консолідацію. */
  const country = COUNTRIES[cityTo.country];
  const daysMin = country.daysMin + loading.daysExtra;
  const daysMax = country.daysMax + loading.daysExtra;

  return {
    route: `${cityFrom.name} → ${cityTo.name}`,
    routeEn: `${cityFrom.nameEn} → ${cityTo.nameEn}`,
    distance,
    transport: cargo.transport,
    loading: loading.label,
    priceLow,
    priceHigh,
    daysMin,
    daysMax,
    arrival: arrivalDate(daysMax)
  };
}
