/* ── Настройки ── */
const CFG = {
  phone: '996775853838',
  // Бесплатная форма без сервера (идея из Free-for-dev): Web3Forms / Formspree.
  // Вставьте URL — заявки пойдут на почту. Пусто = заявка откроется в WhatsApp.
  formUrl: '', // например 'https://api.web3forms.com/submit'
  formKey: ''  // access_key для Web3Forms
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = n => Math.round(n).toLocaleString('ru-RU');
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};

/* ── Данные каталога ── */
const CATS = { plates: 'Фанера и OSB', floor: 'Ламинат и подложки', mix: 'Смеси и шпаклёвки', ceiling: 'ГКЛ и профили', mdf: 'МДФ' };
const ICON = {
  plates: '<rect x="4" y="12" width="40" height="24"/><path d="M4 18h40M4 24h40M4 30h40"/>',
  floor: '<path d="M4 14h40v20H4zM16 14v20M28 14v20M10 24h6M34 24h6"/>',
  mix: '<path d="M12 10h24l4 8v22H8V18zM8 18h32"/><path d="M18 28h12"/>',
  ceiling: '<rect x="4" y="10" width="40" height="8"/><path d="M12 18v14M24 18v14M36 18v14M8 32h32"/>',
  mdf: '<rect x="14" y="4" width="20" height="40"/><path d="M20 4v40M26 4v40"/>'
};
const ico = c => `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">${ICON[c]}</svg>`;
const P = [];
const add = (c, n, d, p, u) => P.push({ id: P.length, c, n, d, p, u });
[[0.6, 800], [0.9, 900], [1.2, 1180], [1.5, 1480], [1.8, 1700]].forEach(([t, p]) => add('plates', `OSB ${t.toString().replace('.', ',')} см`, 'Размер 2500×1250 мм, OSB-3', p, 'лист'));
[[0.6, 1900], [0.9, 2500], [1.2, 2900], [1.5, 3300], [1.8, 3700]].forEach(([t, p]) => add('plates', `Мурашенская фанера ${t.toString().replace('.', ',')} см`, 'Размер 2440×1220 мм, повышенная нагрузка, влагостойкая', p, 'лист'));
['0,6', '0,9', '1,2', '1,5', '1,8'].forEach(t => add('plates', `Фанера ${t} см`, 'Размер 2440×1220 мм, повышенная нагрузка', 1900, 'лист'));
add('plates', 'ДВП 0,4 см', 'Размер 2750×1750 мм', 500, 'лист');
add('ceiling', 'Гипсокартон стеновой 12,5 мм', '2500×1200 мм, для стен и перегородок', 420, 'лист');
add('ceiling', 'Гипсокартон потолочный 9,5 мм', '2500×1200 мм, лёгкий, для подвесных потолков', 380, 'лист');
add('ceiling', 'Влагостойкий гипсокартон 12,5 мм', 'ГКЛВ, для ванных и кухонь', 510, 'лист');
add('floor', 'Ламинат 32 класс 0,8 см', 'Для жилых помещений, средняя нагрузка', 480, 'м²');
['Этери', 'Артемис', 'Форто', 'Мелас', 'Анри'].forEach(n => add('floor', `Ламинат 33 класс 0,8 см, Дуб ${n}`, 'Коммерческий класс, высокая нагрузка', 580, 'м²'));
['Крофт Снежный', 'Мичеган Снежный'].forEach(n => add('floor', `Ламинат 32 класс с фаской 0,8 см, ${n}`, 'Фаска, высокая нагрузка', 700, 'м²'));
[['0,3', 'Узбекистан', 750], ['0,5', 'Узбекистан', 850], ['0,3', 'Кыргызстан', 650], ['0,5', 'Кыргызстан', 750]].forEach(([t, c, p]) => add('floor', `Подложка под ламинат ${t} см, ${c}`, `Толщина ${t === '0,3' ? 3 : 5} мм, рулон 10 м², сделано в ${c === 'Узбекистан' ? 'Узбекистане' : 'Кыргызстане'}`, p, 'рулон'));
add('floor', 'Подложка для тёплого пола 0,3 см, Россия', 'Толщина 3 мм, рулон 5 м², сделано в России', 700, 'рулон');
[['финишная Exclusive', '20 кг', 500, 'Для финальной отделки стен перед покраской'], ['финишная Plaster', '20 кг', 500, 'Для финальной отделки стен перед покраской'], ['финишная Flex', '25 кг', 350, 'Для финальной отделки стен перед покраской'],
 ['стартовая Fomix', '25 кг', 250, 'Выравнивание стен, слой до 10 мм'], ['стартовая Exclusive', '25 кг', 250, 'Выравнивание стен, слой до 10 мм'], ['стартовая Lider', '25 кг', 250, 'Выравнивание стен, слой до 10 мм']]
  .forEach(([n, w, p, d]) => add('mix', `Шпаклёвка ${n} ${w}`, d, p, 'мешок'));
[['Lider', '30 кг', 200], ['Tulpar', '30 кг', 220], ['Start+', '30 кг', 280], ['Fomix', '25 кг', 200]].forEach(([n, w, p]) => add('mix', `Штукатурка гипсовая Родбун ${n}`, `${w}, машинное и ручное нанесение`, p, 'мешок'));
['0,33', '0,35', '0,37', '0,40', '0,45'].forEach(t => add('ceiling', `Профиль ${t}`, 'Потолочный CD-профиль, 27×60, длина 3 м, оцинкованный', 120, 'шт.'));
['0,33', '0,38'].forEach(t => add('ceiling', `Направляющий ${t}`, 'Потолочный CD-направляющий, длина 3 м, оцинкованный', 120, 'шт.'));
add('mdf', 'МДФ Нежный Алюм', 'Декоративная панель, длина 2,7 м, ширина 25 см', 120, 'шт.');

/* ── Заявка (корзина) ── */
let cart = store.get('cart', {});
const pById = id => P[id];
const cartCount = () => Object.values(cart).reduce((a, b) => a + b, 0);
const cartSum = () => Object.entries(cart).reduce((s, [id, q]) => s + pById(id).p * q, 0);
function saveCart() { store.set('cart', cart); renderCart(); }
function addToCart(id, q = 1) { cart[id] = (cart[id] || 0) + q; saveCart(); toast('Добавлено в заявку'); }
function setQty(id, d) { cart[id] = (cart[id] || 0) + d; if (cart[id] <= 0) delete cart[id]; saveCart(); }
function cartText() {
  const lines = Object.entries(cart).map(([id, q]) => `• ${pById(id).n} — ${q} ${pById(id).u}`);
  return 'Здравствуйте! Хочу заказать:\n' + lines.join('\n');
}
function renderCart() {
  const n = cartCount(), cn = $('#cn');
  if (cn) { cn.textContent = n; cn.dataset.n = n; }
  const dl = $('#dl'); if (!dl) return;
  const ids = Object.keys(cart);
  dl.innerHTML = ids.length ? ids.map(id => { const p = pById(id); return `<div class="li"><b>${p.n}</b><div class="q"><button data-d="-1" data-id="${id}" aria-label="Меньше">−</button><span>${cart[id]}</span><button data-d="1" data-id="${id}" aria-label="Больше">+</button></div><small>${fmt(p.p)} сом/${p.u}</small></div>`; }).join('')
    : '<p class="sub" style="padding:24px 0">Заявка пока пустая. Добавьте материалы из каталога или калькулятора.</p>';
  $('#dt').textContent = 'от ' + fmt(cartSum()) + ' сом';
  $('#ds').disabled = !ids.length;
  $('#ds').style.opacity = ids.length ? 1 : .5;
}
function toast(t) {
  const el = $('#ts'); el.textContent = t; el.classList.add('on');
  clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), 1800);
}
const openCart = o => document.body.classList.toggle('co', o);
const waLink = text => `https://wa.me/${CFG.phone}?text=${encodeURIComponent(text)}`;

/* ── Каркас: шапка, подвал, корзина ── */
const NAV = [['index.html', 'Главная'], ['catalog.html', 'Каталог'], ['index.html#about', 'О нас'], ['index.html#contacts', 'Контакты']];
function layout() {
  const cur = location.pathname.endsWith('catalog.html') ? 'catalog.html' : 'index.html';
  $('#hd').innerHTML = `<div class="wrap bar"><a class="logo" href="index.html">Строй<b>Мат</b></a>
  <nav>${NAV.map(([h, t]) => `<a href="${h}"${h === cur ? ' class="on"' : ''}>${t}</a>`).join('')}</nav>
  <div class="tools"><button class="ic" id="th" aria-label="Сменить тему">◐</button>
  <button class="ic" id="cb" aria-label="Открыть заявку"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg><i id="cn" data-n="0">0</i></button>
  <button class="ic burger" id="bg" aria-label="Меню">☰</button></div></div>`;
  $('#ft').innerHTML = `<div class="wrap fb"><a class="logo" href="index.html">Строй<b>Мат</b></a><span>© ${new Date().getFullYear()} СтройМат</span><div>${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</div></div>`;
  document.body.insertAdjacentHTML('beforeend', `<div class="ov" id="ov"></div><aside class="dr" id="dr" aria-label="Заявка"><div class="dh"><h3>Ваша заявка</h3><button class="ic" id="dx" aria-label="Закрыть">✕</button></div><div class="dl" id="dl"></div>
  <div class="df"><div class="tot">Ориентировочно: <b id="dt"></b></div><small>Цены «от». Точную сумму и наличие назовём в ответ.</small><button class="btn" id="ds">Отправить в WhatsApp</button><button class="lnk" id="dc">Очистить заявку</button></div></aside><div class="ts" id="ts" role="status"></div>`);
  const th = store.get('theme', matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = th;
  $('#th').onclick = () => { const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = t; store.set('theme', t); };
  $('#bg').onclick = () => $('#hd').classList.toggle('open');
  $$('#hd nav a').forEach(a => a.addEventListener('click', () => $('#hd').classList.remove('open')));
  $('#cb').onclick = () => openCart(true);
  $('#dx').onclick = $('#ov').onclick = () => openCart(false);
  document.addEventListener('keydown', e => e.key === 'Escape' && openCart(false));
  $('#dl').onclick = e => { const b = e.target.closest('button'); if (b) setQty(b.dataset.id, +b.dataset.d); };
  $('#dc').onclick = () => { cart = {}; saveCart(); };
  $('#ds').onclick = () => window.open(waLink(cartText()), '_blank', 'noopener');
  renderCart();
}

/* ── Карточка товара ── */
const card = p => `<article class="pc"><div class="pi">${ico(p.c)}</div><small>${CATS[p.c]}</small><h3>${p.n}</h3><p>${p.d}</p><div class="pr">от ${fmt(p.p)} <span>сом/${p.u}</span></div><button class="btn o s" data-add="${p.id}">В заявку</button></article>`;
document.addEventListener('click', e => { const b = e.target.closest('[data-add]'); if (b) addToCart(+b.dataset.add); });

/* ── Главная: категории ── */
function homeCats() {
  const el = $('#cats'); if (!el) return;
  el.innerHTML = Object.entries(CATS).map(([k, n]) => {
    const items = P.filter(p => p.c === k);
    return `<a class="cat" href="catalog.html#${k}">${ico(k)}<b>${n}</b><span>${items.length} поз. · от ${fmt(Math.min(...items.map(i => i.p)))} сом</span></a>`;
  }).join('');
}

/* ── Главная: калькулятор ── */
const CALC = [['OSB 0,9 см', 3.125, 'лист'], ['Мурашенская фанера 1,2 см', 2.98, 'лист'], ['Гипсокартон стеновой 12,5 мм', 3, 'лист'], ['Ламинат 33 класс 0,8 см, Дуб Этери', 1, 'м²'], ['Подложка под ламинат 0,3 см, Кыргызстан', 10, 'рулон']];
function calc() {
  const s = $('#cm'); if (!s) return;
  s.innerHTML = CALC.map(([n], i) => `<option value="${i}">${n}</option>`).join('');
  const run = () => {
    const [n, cover, unit] = CALC[s.value], p = P.find(x => x.n === n);
    const area = Math.max(+$('#ca').value || 0, 0), units = Math.ceil(area * (1 + $('#cr').value / 100) / cover - 1e-9);
    $('#cu').textContent = units ? `${units} ${unit}` : '—';
    $('#cs').textContent = units ? `≈ ${fmt(units * p.p)} сом по цене «от»` : 'Введите площадь';
    $('#cadd').disabled = !units; $('#cadd').onclick = () => addToCart(p.id, units);
  };
  ['#cm', '#ca', '#cr'].forEach(q => $(q).addEventListener('input', run)); run();
}

/* ── Главная: форма ── */
function form() {
  const f = $('#cf'); if (!f) return;
  f.addEventListener('submit', async e => {
    e.preventDefault();
    const rules = { name: v => v.trim().length >= 2, phone: v => v.replace(/\D/g, '').length >= 9, message: v => v.trim().length >= 5 };
    let ok = true;
    for (const k in rules) { const i = f[k], g = rules[k](i.value); i.classList.toggle('bad', !g); $(`#e-${k}`).classList.toggle('on', !g); ok &&= g; }
    if (!ok) return;
    const text = `Заявка с сайта\nИмя: ${f.name.value}\nТелефон: ${f.phone.value}\n${f.message.value}` + (cartCount() ? '\n\n' + cartText() : '');
    if (CFG.formUrl) {
      try {
        const r = await fetch(CFG.formUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access_key: CFG.formKey, subject: 'Заявка с сайта СтройМат', name: f.name.value, phone: f.phone.value, message: text }) });
        if (!r.ok) throw 0;
      } catch { toast('Не удалось отправить. Позвоните нам или напишите в WhatsApp.'); return; }
    } else window.open(waLink(text), '_blank', 'noopener');
    f.style.display = 'none'; $('#ok').classList.add('on');
  });
}

/* ── Каталог ── */
function catalog() {
  const g = $('#pg'); if (!g) return;
  let cat = location.hash.slice(1) in CATS ? location.hash.slice(1) : 'all';
  const chips = $('#chips');
  chips.innerHTML = [['all', 'Все', P.length], ...Object.entries(CATS).map(([k, n]) => [k, n, P.filter(p => p.c === k).length])]
    .map(([k, n, c]) => `<button class="chip" data-k="${k}">${n}<em>${c}</em></button>`).join('');
  const run = () => {
    const q = $('#q').value.trim().toLowerCase(), sort = $('#so').value;
    let l = P.filter(p => (cat === 'all' || p.c === cat) && (p.n + ' ' + p.d).toLowerCase().includes(q));
    if (sort === 'asc') l.sort((a, b) => a.p - b.p); if (sort === 'desc') l.sort((a, b) => b.p - a.p);
    $$('.chip').forEach(c => c.classList.toggle('on', c.dataset.k === cat));
    $('#rc').textContent = `Найдено: ${l.length}`;
    g.innerHTML = l.length ? l.map(card).join('') : '<div class="empty">Ничего не нашли. Попробуйте другое слово или позвоните нам — подберём вручную.</div>';
  };
  chips.onclick = e => { const b = e.target.closest('.chip'); if (b) { cat = b.dataset.k; history.replaceState(null, '', cat === 'all' ? location.pathname : '#' + cat); run(); } };
  $('#q').oninput = $('#so').onchange = run; run();
}

layout(); homeCats(); calc(); form(); catalog();
