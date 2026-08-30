// Калькулятор вартості на сторінці «Ціни». Дані й розрахунок — з
// calculator-data.js, працює без API, повністю на клієнті.
import { CARGO_TYPES, LOADING_TYPES, findCity, suggestCities, calcQuote } from './calculator-data.js';

function initPricesCalculator() {
  const form = document.getElementById('calculatorForm');
  if (!form) return;

  const isEn = document.documentElement.lang === 'en';

  const fromInput = document.getElementById('priceFromCity');
  const toInput = document.getElementById('priceToCity');
  const cargoSelect = document.getElementById('priceCargoType');
  const loadSelect = document.getElementById('priceLoadType');

  const fromField = document.getElementById('fromCityField');
  const toField = document.getElementById('toCityField');
  const cargoField = document.getElementById('cargoTypeField');
  const loadField = document.getElementById('loadTypeField');

  const fromError = document.getElementById('fromCityError');
  const toError = document.getElementById('toCityError');
  const cargoError = document.getElementById('cargoTypeError');
  const loadError = document.getElementById('loadTypeError');

  const fromDatalist = document.getElementById('fromCitySuggestions');
  const toDatalist = document.getElementById('toCitySuggestions');

  const result = {
    route: document.getElementById('resultRoute'),
    distance: document.getElementById('resultDistance'),
    transport: document.getElementById('resultTransport'),
    loading: document.getElementById('resultLoading'),
    price: document.getElementById('resultPrice'),
    days: document.getElementById('resultDays'),
    arrival: document.getElementById('resultArrival'),
  };

  const T = isEn ? {
    enterCity: 'Enter a city',
    cityNotFound: 'City not found',
    sameCity: 'Departure and destination are the same',
    selectType: 'Select a type',
    distance: 'Distance', transport: 'Transport', loading: 'Loading',
    price: 'Approximate cost', days: 'Delivery time', arrival: 'Arrival date',
    daysUnit: 'days', kmUnit: 'km',
  } : {
    enterCity: 'Введіть місто',
    cityNotFound: 'Місто не знайдено',
    sameCity: 'Пункт відправлення і призначення співпадають',
    selectType: 'Оберіть тип',
    distance: 'Відстань', transport: 'Транспорт', loading: 'Завантаження',
    price: 'Орієнтовна вартість', days: 'Термін доставки', arrival: 'Дата прибуття',
    daysUnit: 'днів', kmUnit: 'км',
  };

  // Тисячні розділювачі — лише для EN ("2,400 km" проти "2400 км").
  function fmt(n) {
    return isEn ? n.toLocaleString('en-US') : String(n);
  }

  function setError(field, errorEl, message) {
    field.classList.add('has-error');
    errorEl.textContent = message;
  }

  function clearError(field, errorEl) {
    field.classList.remove('has-error');
    errorEl.textContent = '';
  }

  function clearAllErrors() {
    clearError(fromField, fromError);
    clearError(toField, toError);
    clearError(cargoField, cargoError);
    clearError(loadField, loadError);
  }

  function wireAutocomplete(input, datalist) {
    input.addEventListener('input', () => {
      const matches = suggestCities(input.value);
      datalist.innerHTML = matches
        .map((c) => `<option value="${isEn ? c.nameEn : c.name}"></option>`)
        .join('');
    });
  }
  wireAutocomplete(fromInput, fromDatalist);
  wireAutocomplete(toInput, toDatalist);

  [[fromInput, fromField, fromError], [toInput, toField, toError]].forEach(([input, field, error]) => {
    input.addEventListener('input', () => clearError(field, error));
  });
  [[cargoSelect, cargoField, cargoError], [loadSelect, loadField, loadError]].forEach(([select, field, error]) => {
    select.addEventListener('change', () => clearError(field, error));
  });

  function renderResult(data) {
    const cargo = CARGO_TYPES[cargoSelect.value];
    const loading = LOADING_TYPES[loadSelect.value];

    result.route.textContent = isEn ? data.routeEn : data.route;
    result.distance.textContent = `${T.distance}: ~${fmt(data.distance)} ${T.kmUnit}`;
    result.transport.textContent = `${T.transport}: ${isEn ? cargo.transportEn : cargo.transport}`;
    result.loading.textContent = `${T.loading}: ${isEn ? loading.labelEn : loading.label}`;
    result.price.textContent = `${T.price}: €${fmt(data.priceLow)}-${fmt(data.priceHigh)}`;
    result.days.textContent = `${T.days}: ${data.daysMin}-${data.daysMax} ${T.daysUnit}`;
    result.arrival.textContent = `${T.arrival}: ${data.arrival}`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors();

    const fromRaw = fromInput.value.trim();
    const toRaw = toInput.value.trim();
    const cargoType = cargoSelect.value;
    const loadingType = loadSelect.value;

    let hasError = false;

    if (!fromRaw) {
      setError(fromField, fromError, T.enterCity);
      hasError = true;
    } else if (!findCity(fromRaw)) {
      setError(fromField, fromError, T.cityNotFound);
      hasError = true;
    }

    if (!toRaw) {
      setError(toField, toError, T.enterCity);
      hasError = true;
    } else if (!findCity(toRaw)) {
      setError(toField, toError, T.cityNotFound);
      hasError = true;
    }

    if (!cargoType) {
      setError(cargoField, cargoError, T.selectType);
      hasError = true;
    }
    if (!loadingType) {
      setError(loadField, loadError, T.selectType);
      hasError = true;
    }

    if (hasError) return;

    const data = calcQuote({ from: fromRaw, to: toRaw, cargoType, loadingType });

    if (data.error === 'same_city') {
      setError(toField, toError, T.sameCity);
      return;
    }
    if (data.error) {
      // підстраховка на випадок розсинхрону з перевірками вище
      setError(fromField, fromError, T.cityNotFound);
      return;
    }

    renderResult(data);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPricesCalculator);
} else {
  initPricesCalculator();
}
