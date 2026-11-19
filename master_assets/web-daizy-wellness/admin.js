const $ = id => document.getElementById(id);
let state, dirty = false;
const message = text => { $('message').textContent = text; };
async function api(path, options = {}) {
  const response = await fetch('/api/' + path, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } });
  let data; try { data = await response.json(); } catch { throw Error('API quản trị chưa hoạt động. Chạy npm run dev hoặc cấu hình Vercel theo hướng dẫn.'); }
  if (!response.ok) { if (response.status === 401) showLogin(); throw Error(data.error || 'Không thể thực hiện yêu cầu.'); }
  return data;
}
function showLogin() { $('dashboard').hidden = true; $('login-panel').hidden = false; $('logout').hidden = true; }
function field(label, name, value, type = 'text') {
  const wrap = document.createElement('label'); wrap.textContent = label;
  const input = document.createElement(type === 'textarea' ? 'textarea' : 'input');
  input.name = name; input.value = value ?? '';
  if (type === 'textarea') { input.rows = 4; input.maxLength = 3000; }
  else { input.type = type; if (type === 'number') { input.min = 1000; input.max = 100000000; input.step = 1; } else { input.maxLength = 120; } }
  input.required = name !== 'salePriceVnd' && name !== 'desc'; wrap.append(input); return wrap;
}
function render() {
  $('products').replaceChildren();
  for (const p of state.products.filter(p => !p.archived)) {
    const card = document.createElement('article'); card.className = 'product'; card.dataset.id = p.id;
    const img = document.createElement('img'); img.src = p.defaultImg; img.alt = p.name;
    const fields = document.createElement('div'); fields.className = 'fields';
    const code = document.createElement('p'); code.className = 'product-id'; code.textContent = p.id;
    const prices = document.createElement('div'); prices.className = 'price-fields';
    prices.append(field('Giá gốc (VND)', 'listPriceVnd', p.listPriceVnd, 'number'), field('Giá sale (VND, tùy chọn)', 'salePriceVnd', p.salePriceVnd, 'number'));
    fields.append(code, field('Tên sản phẩm', 'name', p.name), prices, field('Mô tả', 'desc', p.desc, 'textarea'));
    card.append(img, fields); $('products').append(card);
  }
  $('updated').textContent = state.updated_at ? new Date(state.updated_at).toLocaleString('vi-VN', { timeZone: 'Asia/Bangkok' }) : 'Chưa cập nhật';
  window.DaizyProductAdmin?.refresh(state);
  dirty = false;
}
async function dashboard(user) {
  state = await api('catalog?admin=1'); render(); $('account').textContent = user.email;
  $('login-panel').hidden = true; $('dashboard').hidden = false; $('logout').hidden = false;
}
$('login-form').addEventListener('submit', async e => {
  e.preventDefault(); const button = e.target.querySelector('button'); button.disabled = true; message('Đang đăng nhập…');
  try { const form = new FormData(e.target); const user = await api('session', { method: 'POST', body: JSON.stringify(Object.fromEntries(form)) }); e.target.reset(); await dashboard(user); message('Đã đăng nhập.'); }
  catch (error) { message(error.message); } finally { button.disabled = false; }
});
$('products').addEventListener('input', () => { dirty = true; message('Có thay đổi chưa lưu.'); });
$('products').addEventListener('submit', e => e.preventDefault());
$('save').addEventListener('click', async () => {
  if (!$('products').reportValidity()) return;
  const products = [...$('products').querySelectorAll('.product')].map(card => ({ id: card.dataset.id, name: card.querySelector('[name=name]').value, desc: card.querySelector('[name=desc]').value, listPriceVnd: Number(card.querySelector('[name=listPriceVnd]').value), salePriceVnd: card.querySelector('[name=salePriceVnd]').value === '' ? null : Number(card.querySelector('[name=salePriceVnd]').value) }));
  const button = $('save'); button.disabled = true; $('products').inert = true; message('Đang lưu lên server…');
  try { state = await api('catalog', { method: 'PUT', body: JSON.stringify({ products, updated_at: state.updated_at }) }); render(); message('Đã lưu. Tải lại cửa hàng để xem cập nhật.'); }
  catch (error) { message(error.message); } finally { button.disabled = false; $('products').inert = false; }
});
$('logout').addEventListener('click', async () => { try { await api('session', { method: 'DELETE' }); dirty = false; state = null; $('products').replaceChildren(); showLogin(); message('Đã đăng xuất.'); } catch (e) { message(e.message); } });
window.addEventListener('beforeunload', e => { if (dirty) { e.preventDefault(); e.returnValue = ''; } });
(async () => { try { await dashboard(await api('session')); } catch (e) { if (!e.message.includes('Vui lòng đăng nhập')) message(e.message); } })();
