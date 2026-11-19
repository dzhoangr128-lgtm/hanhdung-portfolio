/* ==========================================================================
   DAIZY WELLNESS — LUXURY PILATES ATHLEISURE STORE ENGINE
   Interactive Features, 5 Color Switchers per Product, Cart Drawer, Best Sellers & Sale
   ========================================================================== */

// --- 1. CORE DATA STORE & CURRENCIES ---
const CURRENCIES = {
  VND: { 
    symbol: '₫', 
    rate: 25000, 
    suffix: '₫', 
    format: (val) => `${Math.round(val * 25000).toLocaleString('vi-VN')}₫`
  },
  USD: { symbol: '$', rate: 1, suffix: '', format: (val) => `$${val < 10 ? val.toFixed(1) : Math.round(val)}` },
  EUR: { symbol: '€', rate: 0.92, suffix: '', format: (val) => `€${val * 0.92 < 10 ? (val * 0.92).toFixed(1) : Math.round(val * 0.92)}` },
  GBP: { symbol: '£', rate: 0.78, suffix: '', format: (val) => `£${val * 0.78 < 10 ? (val * 0.78).toFixed(1) : Math.round(val * 0.78)}` }
};

let currentCurrency = 'VND';
let cart = [];
let wishlist = new Set();

// The 5 Signature Products with ALL 5 Color Variations per Product (Mức giá chuẩn thị trường Việt Nam)
const PRODUCTS = [
  {
    id: 'halter-bra',
    name: 'Áo Bra Cổ Halter Tôn Dáng',
    category: 'bras',
    categoryLabel: 'Áo Bra Tập Pilates · Nâng Đỡ Tối Ưu',
    listPriceVnd: 290000, // 290.000₫
    badges: ['Thiết Kế Độc Quyền', 'Bán Chạy Nhất'],
    rating: '5.0',
    reviewCount: 148,
    desc: 'Chế tác từ chất liệu thun lạnh Micro-Nylon 6.6 mát mịn như bơ độc quyền. Đường cắt cổ vuông cúp tim tôn bờ vai thon và xương quai xanh quyến rũ, dây halter êm ái triệt tiêu áp lực đốt sống cổ. Mút đệm nâng ngực siêu thoáng khí có thể tháo rời tiện lợi.',
    colors: [
      { name: 'Hồng Phấn', enName: 'Ballet Pink', hex: '#F6E2DF', img: 'assets/images/bra_pink.jpg', hoverImg: 'assets/images/bra_vanilla.jpg' },
      { name: 'Trắng Kem', enName: 'Vanilla Cream', hex: '#FAF7F2', img: 'assets/images/bra_vanilla.jpg', hoverImg: 'assets/images/bra_pink.jpg' },
      { name: 'Vàng Bơ', enName: 'Butter Yellow', hex: '#FCF4D9', img: 'assets/images/bra_yellow.jpg', hoverImg: 'assets/images/bra_pink.jpg' },
      { name: 'Xám Xi Măng', enName: 'Pale Cement', hex: '#E3DFDA', img: 'assets/images/bra_cement.jpg', hoverImg: 'assets/images/bra_mocha.jpg' },
      { name: 'Nâu Mocha', enName: 'Mocha Brown', hex: '#543E34', img: 'assets/images/bra_mocha.jpg', hoverImg: 'assets/images/bra_cement.jpg' }
    ],
    defaultImg: 'assets/images/bra_pink.jpg',
    hoverImg: 'assets/images/bra_vanilla.jpg'
  },
  {
    id: 'flared-pants',
    name: 'Quần Loe Cạp Gập Pilates Tôn Dáng',
    category: 'bottoms',
    categoryLabel: 'Quần Tập Pilates · Từ Phòng Tập Ra Phố',
    listPriceVnd: 350000, // 350.000₫
    badges: ['Cạp Gập Tôn Dáng', 'Ống Loe Chạm Gót'],
    rating: '4.9',
    reviewCount: 182,
    desc: 'Thiết kế quần loe kinh điển lấy cảm hứng từ nghệ thuật ballet. Đai cạp gập siêu mềm mại kiến tạo đường cong đồng hồ cát, ôm trọn hông và đùi trước khi buông rũ thanh thoát theo từng nhịp kéo giãn trên khung máy Reformer.',
    colors: [
      { name: 'Hồng Phấn', enName: 'Ballet Pink', hex: '#F6E2DF', img: 'assets/images/pants_pink.jpg', hoverImg: 'assets/images/pants_vanilla.jpg' },
      { name: 'Trắng Kem', enName: 'Vanilla Cream', hex: '#FAF7F2', img: 'assets/images/pants_vanilla.jpg', hoverImg: 'assets/images/pants_pink.jpg' },
      { name: 'Vàng Bơ', enName: 'Butter Yellow', hex: '#FCF4D9', img: 'assets/images/pants_yellow.jpg', hoverImg: 'assets/images/pants_pink.jpg' },
      { name: 'Xám Xi Măng', enName: 'Pale Cement', hex: '#E3DFDA', img: 'assets/images/pants_cement.jpg', hoverImg: 'assets/images/pants_mocha.jpg' },
      { name: 'Nâu Mocha', enName: 'Mocha Brown', hex: '#543E34', img: 'assets/images/pants_mocha.jpg', hoverImg: 'assets/images/pants_cement.jpg' }
    ],
    defaultImg: 'assets/images/pants_pink.jpg',
    hoverImg: 'assets/images/pants_vanilla.jpg'
  },
  {
    id: 'ballet-wrap',
    name: 'Áo Khoác Wrap Crossover Kiểu Ballet',
    category: 'outerwear',
    categoryLabel: 'Áo Wrap Pilates · Khoác Ngoài Studio',
    listPriceVnd: 350000, salePriceVnd: 280000, // 350.000₫
    badges: ['Đang Sale -20%', 'Dây Buộc Tùy Chỉnh'],
    rating: '4.9',
    reviewCount: 126,
    desc: 'Áo wrap với bề mặt vải mịn, mỏng nhẹ và rủ mềm, lấy cảm hứng từ trang phục của mẫu đại diện DAIZY. Tay áo hơi xuyên nhẹ, phối cùng áo bra bên trong. Vạt đắp chéo và dây buộc eo linh hoạt tạo dáng ballet thanh thoát.',
    colors: [
      { name: 'Trắng Kem', enName: 'Vanilla Cream', hex: '#FAF7F2', img: 'assets/images/wrap_vanilla_light.jpg', hoverImg: 'assets/images/wrap_pink_light.jpg' },
      { name: 'Hồng Phấn', enName: 'Ballet Pink', hex: '#F6E2DF', img: 'assets/images/wrap_pink_light.jpg', hoverImg: 'assets/images/wrap_vanilla_light.jpg' },
      { name: 'Vàng Bơ', enName: 'Butter Yellow', hex: '#FCF4D9', img: 'assets/images/wrap_yellow_light.jpg', hoverImg: 'assets/images/wrap_vanilla_light.jpg' },
      { name: 'Xám Xi Măng', enName: 'Pale Cement', hex: '#E3DFDA', img: 'assets/images/wrap_cement_light.jpg', hoverImg: 'assets/images/wrap_mocha_light.jpg' },
      { name: 'Nâu Mocha', enName: 'Mocha Brown', hex: '#543E34', img: 'assets/images/wrap_mocha_light.jpg', hoverImg: 'assets/images/wrap_cement_light.jpg' }
    ],
    defaultImg: 'assets/images/wrap_vanilla_light.jpg',
    hoverImg: 'assets/images/wrap_pink_light.jpg'
  },
  {
    id: 'grip-socks',
    name: 'Tất Pilates Hở Mu Nâng Vòm Chống Trượt',
    category: 'socks',
    categoryLabel: 'Phụ Kiện Pilates · Chống Trượt Tuyệt Đối',
    listPriceVnd: 80000, // 80.000₫
    badges: ['Hở Mu Thoáng Khí', 'Đế Bám Silicon Tổ Ong'],
    rating: '5.0',
    reviewCount: 240,
    desc: 'Thiết kế chuyên biệt cho máy Reformer, Cadillac và Barrel. Khoét hở mu chân thanh thoát, dải thun nén trợ lực nâng đỡ vòm chân và hàng trăm hạt silicon gel tổ ong bám chặt bề mặt đệm lò xo, chống trượt 100% trong mọi bài tập giữ thăng bằng.',
    colors: [
      { name: 'Hồng Phấn', enName: 'Ballet Pink', hex: '#F6E2DF', img: 'assets/images/socks_pink.png', hoverImg: 'assets/images/socks_vanilla.jpg' },
      { name: 'Trắng Kem', enName: 'Vanilla Cream', hex: '#FAF7F2', img: 'assets/images/socks_vanilla.jpg', hoverImg: 'assets/images/socks_pink.png' },
      { name: 'Vàng Bơ', enName: 'Butter Yellow', hex: '#FCF4D9', img: 'assets/images/socks_yellow.jpg', hoverImg: 'assets/images/socks_pink.png' },
      { name: 'Xám Xi Măng', enName: 'Pale Cement', hex: '#E3DFDA', img: 'assets/images/socks_cement.jpg', hoverImg: 'assets/images/socks_mocha.jpg' },
      { name: 'Nâu Mocha', enName: 'Mocha Brown', hex: '#543E34', img: 'assets/images/socks_mocha.jpg', hoverImg: 'assets/images/socks_cement.jpg' }
    ],
    defaultImg: 'assets/images/socks_pink.png',
    hoverImg: 'assets/images/socks_vanilla.jpg'
  },
  {
    id: 'cloud-headband',
    name: 'Băng Đô Dệt Gân Co Giãn Êm Ái',
    category: 'headband',
    categoryLabel: 'Phụ Kiện Pilates · Không Đau Đầu',
    listPriceVnd: 60000, salePriceVnd: 45000, // 60.000₫
    badges: ['Đang Sale -25%', 'Viền Silicon Bám Tóc'],
    rating: '4.9',
    reviewCount: 94,
    desc: 'Bản rộng 7cm dệt gân co giãn với viền sợi silicon siêu mỏng ẩn bên trong. Giữ nếp tóc gọn gàng tuyệt đối trong các tư thế dốc ngược mà không gây cảm giác bó thắt da đầu hay làm gãy nếp tóc.',
    colors: [
      { name: 'Trắng Kem', enName: 'Vanilla Cream', hex: '#FAF7F2', img: 'assets/images/headband_vanilla.jpg', hoverImg: 'assets/images/headband_pink.jpg' },
      { name: 'Hồng Phấn', enName: 'Ballet Pink', hex: '#F6E2DF', img: 'assets/images/headband_pink.jpg', hoverImg: 'assets/images/headband_vanilla.jpg' },
      { name: 'Vàng Bơ', enName: 'Butter Yellow', hex: '#FCF4D9', img: 'assets/images/headband_yellow.jpg', hoverImg: 'assets/images/headband_pink.jpg' },
      { name: 'Xám Xi Măng', enName: 'Pale Cement', hex: '#E3DFDA', img: 'assets/images/headband_cement.jpg', hoverImg: 'assets/images/headband_mocha.jpg' },
      { name: 'Nâu Mocha', enName: 'Mocha Brown', hex: '#543E34', img: 'assets/images/headband_mocha.jpg', hoverImg: 'assets/images/headband_cement.jpg' }
    ],
    defaultImg: 'assets/images/headband_vanilla.jpg',
    hoverImg: 'assets/images/headband_pink.jpg'
  }
];

// --- 2. FORMATTING HELPERS ---
const STORAGE_KEY = 'daizy-store-v1';

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

let bundleSequence = 0;
function addBundle(bundleId) {
  const definition = BUNDLES[bundleId];
  const bundleGroupId = 'bundle-' + Date.now() + '-' + (++bundleSequence);
  definition.ids.forEach((id, index) => {
    const product = PRODUCTS.find(p => p.id === id);
    const color = product.colors[bundleId === 'socks' ? index : 0];
    cart.push({ key: bundleGroupId + '-' + index, id, name: product.name, size: 'S', colorName: color.name, img: color.img, qty: 1, bundleId, bundleGroupId });
  });
  updateCartUI(); openCartDrawer(); showToast('Đã thêm combo demo. Nút số lượng thay đổi toàn bộ nhóm; xóa một món sẽ bỏ ưu đãi nhóm.');
}

function saveStoreState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist: [...wishlist], currency: currentCurrency }));
  } catch { /* Shopping remains usable when browser storage is unavailable. */ }
}

function restoreStoreState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== 'object') return;
    if (Object.hasOwn(CURRENCIES, saved.currency)) currentCurrency = saved.currency;
    if (Array.isArray(saved.wishlist)) {
      wishlist = new Set(saved.wishlist.filter(id => PRODUCTS.some(p =>
        p.id === id || p.colors.some((_, index) => `${p.id}-${index}` === id))));
    }
    if (Array.isArray(saved.cart)) {
      cart = saved.cart.flatMap(item => {
        if (!item || typeof item !== 'object') return [];
        const product = PRODUCTS.find(p => p.id === item.id);
        const color = product?.colors.find(c => c.name === item.colorName);
        if (!product || !color || !['XS', 'S', 'M', 'L'].includes(item.size) || !Number.isInteger(item.qty) || item.qty < 1 || item.qty > 99) return [];
        const groupId = typeof item.bundleGroupId === 'string' && /^bundle-[0-9-]+$/.test(item.bundleGroupId) ? item.bundleGroupId : null;
        const key = groupId ? groupId + '-' + saved.cart.indexOf(item) : product.id + '-' + item.size + '-' + product.colors.indexOf(color);
        const bundleId = groupId && Object.hasOwn(BUNDLES, item.bundleId) ? item.bundleId : null;
        return [{ key, id: product.id, name: product.name, bundleGroupId: groupId, bundleId,
          size: item.size, colorName: color.name, img: color.img, qty: item.qty }];
      });
    }
  } catch { /* Ignore corrupted or unavailable browser storage. */ }
}

function formatPrice(amountVnd) {
  if (currentCurrency === 'VND') return `${Math.round(amountVnd).toLocaleString('vi-VN')}₫`;
  const curr = CURRENCIES[currentCurrency] || CURRENCIES.VND;
  return curr.format(amountVnd / 25000);
}

// Update all currency labels across the entire document
function productPriceHTML(product) {
  return '<span class="product-price">' + formatPrice(getSellingPrice(product)) + '</span>' + (product.salePriceVnd != null ? '<span style="text-decoration:line-through;color:var(--text-muted)">' + formatPrice(product.listPriceVnd) + '</span>' : '');
}
function updateGlobalPrices() {
  saveStoreState();
  for (const [id, prefix] of [['ballet-wrap', 'wrap'], ['cloud-headband', 'headband']]) {
    const product = PRODUCTS.find(p => p.id === id);
    const card = document.getElementById(`sale-${prefix}-img`)?.closest('.sale-card');
    if (card) {
      card.hidden = product.salePriceVnd == null;
      card.querySelector('h3').textContent = product.name;
      card.querySelector('.sale-card-desc').textContent = product.desc;
      card.querySelector('.sale-badge-ribbon').textContent = `SALE -${Math.round((1-getSellingPrice(product)/product.listPriceVnd)*100)}%`;
    }
  }
  const freeShipEl = document.getElementById('free-ship-threshold');
  if (freeShipEl) freeShipEl.textContent = formatPrice(500000); // 500.000₫

  // Combo prices stay fixed; reference totals follow the current catalog.
  for (const [id, prefix] of [['outfit','outfit'], ['socks','socks-combo'], ['full','bundle']]) {
    const definition = BUNDLES[id];
    const original = definition.ids.reduce((sum, productId) => sum + PRODUCTS.find(p => p.id === productId).listPriceVnd, 0);
    const orig = document.getElementById(prefix + '-orig-price');
    const disc = document.getElementById(prefix + '-disc-price');
    if (orig) orig.textContent = formatPrice(original);
    if (disc) disc.textContent = formatPrice(definition.priceVnd);
    const tag = orig?.closest('.bestseller-pricing')?.querySelector('.bestseller-save-tag');
    if (tag) tag.textContent = original > definition.priceVnd ? 'Tiết Kiệm ' + formatPrice(original - definition.priceVnd) : 'Giá Combo';
  }

  // Sale items
  const wrapOrig = document.getElementById('sale-wrap-orig-price');
  const wrapDisc = document.getElementById('sale-wrap-disc-price');
  if (wrapOrig) wrapOrig.textContent = formatPrice(PRODUCTS.find(p => p.id === 'ballet-wrap').listPriceVnd); // 350.000₫
  if (wrapDisc) wrapDisc.textContent = formatPrice(getSellingPrice(PRODUCTS.find(p => p.id === 'ballet-wrap'))); // 280.000₫

  const headOrig = document.getElementById('sale-headband-orig-price');
  const headDisc = document.getElementById('sale-headband-disc-price');
  if (headOrig) headOrig.textContent = formatPrice(PRODUCTS.find(p => p.id === 'cloud-headband').listPriceVnd); // 60.000₫
  if (headDisc) headDisc.textContent = formatPrice(getSellingPrice(PRODUCTS.find(p => p.id === 'cloud-headband'))); // 45.000₫

  document.querySelectorAll('[data-usd-price]').forEach(el => {
    const product = PRODUCTS.find(p => p.id === el.getAttribute('data-product-price'));
    if (product) el.textContent = formatPrice(getSellingPrice(product));
  });

  renderProducts();
  renderAtelierShowcase();
  updateCartUI();
}

// --- 3. PRODUCT CATALOG RENDERING (MỖI TRANG PHỤC & PHỤ KIỆN CÓ ĐỦ 5 MÀU SẮC) ---
let currentCatalogFilter = 'all';

// Thông tin chi tiết cho từng trang danh mục sản phẩm (Đủ 5 màu mỗi trang)
const PRODUCT_CAT_DETAILS = {
  'bottoms': {
    id: 'flared-pants',
    catName: 'Quần Tập Pilates',
    breadcrumb: 'Trang Phục',
    tag: 'TRANG PHỤC PILATES · THIẾT YẾU',
    title: 'Quần Loe Cạp Gập Pilates Tôn Dáng',
    desc: 'Chế tác từ chất liệu thun lạnh Micro-Nylon 6.6 mát mịn như bơ độc quyền. Đai cạp gập siêu mềm mại kiến tạo đường cong đồng hồ cát, ôm trọn hông và đùi trước khi buông rũ thanh thoát theo từng nhịp kéo giãn trên khung máy Reformer. Trọn bộ 5 sắc thái màu signature.',
    listPriceVnd: 350000,
    metaPills: [
      { text: '350.000₫', isPrice: true },
      { text: '5 Sắc Thái Signature', icon: 'fa-palette' },
      { text: 'Size XS, S, M, L', icon: 'fa-ruler' },
      { text: 'Freeship Đơn Từ 500k', icon: 'fa-truck-fast', isHighlight: true }
    ]
  },
  'bras': {
    id: 'halter-bra',
    catName: 'Áo Bra Tập Pilates',
    breadcrumb: 'Trang Phục',
    tag: 'TRANG PHỤC PILATES · NÂNG ĐỠ TỐI ƯU',
    title: 'Áo Bra Cổ Halter Tôn Dáng',
    desc: 'Đường cắt cổ vuông cúp tim tôn bờ vai thon và xương quai xanh quyến rũ, dây halter êm ái triệt tiêu áp lực đốt sống cổ. Mút đệm nâng ngực siêu thoáng khí có thể tháo rời tiện lợi. Trọn bộ 5 sắc thái màu signature.',
    listPriceVnd: 290000,
    metaPills: [
      { text: '290.000₫', isPrice: true },
      { text: '5 Sắc Thái Signature', icon: 'fa-palette' },
      { text: 'Size XS, S, M, L', icon: 'fa-ruler' },
      { text: 'Best Seller #1', icon: 'fa-crown', isHighlight: true }
    ]
  },
  'outerwear': {
    id: 'ballet-wrap',
    catName: 'Áo Wrap Pilates',
    breadcrumb: 'Trang Phục',
    tag: 'ÁO KHOÁC STUDIO · SALE -20%',
    title: 'Áo Khoác Wrap Crossover Kiểu Ballet',
    desc: 'Bề mặt vải mịn, mỏng nhẹ và rủ mềm như áo wrap của mẫu đại diện DAIZY. Tay áo hơi xuyên nhẹ để phối cùng bra, vạt đắp chéo và dây buộc eo tạo dáng ballet thanh thoát. Trọn bộ 5 sắc thái màu.',
    listPriceVnd: 280000,
    origPriceVnd: 350000,
    isSale: true,
    metaPills: [
      { text: '280.000₫ (Gốc 350.000₫)', isPrice: true, isSalePrice: true },
      { text: '5 Sắc Thái Signature', icon: 'fa-palette' },
      { text: 'Size XS, S, M, L', icon: 'fa-ruler' },
      { text: 'Ưu Đãi Sale 20%', icon: 'fa-percent', isHighlight: true }
    ]
  },
  'socks': {
    id: 'grip-socks',
    catName: 'Tất Chống Trượt Pilates',
    breadcrumb: 'Phụ Kiện',
    tag: 'PHỤ KIỆN REFORMER · CHỐNG TRƯỢT 100%',
    title: 'Tất Pilates Hở Mu Nâng Vòm Chống Trượt',
    desc: 'Thiết kế chuyên biệt cho máy Reformer, Cadillac và Barrel. Khoét hở mu chân thanh thoát, dải thun nén trợ lực nâng đỡ vòm chân và hàng trăm hạt silicon gel tổ ong bám chặt bề mặt đệm lò xo, chống trượt 100% trong mọi bài tập. Trọn bộ 5 sắc thái màu.',
    listPriceVnd: 80000,
    metaPills: [
      { text: '80.000₫ / đôi', isPrice: true },
      { text: '5 Sắc Thái Signature', icon: 'fa-palette' },
      { text: 'Freesize Co Giãn', icon: 'fa-arrows-to-dot' },
      { text: 'Combo 3 Đôi Chỉ 199k', icon: 'fa-box-open', isHighlight: true }
    ]
  },
  'headband': {
    id: 'cloud-headband',
    catName: 'Băng Đô Tập Pilates',
    breadcrumb: 'Phụ Kiện',
    tag: 'PHỤ KIỆN TẬP · SALE -25%',
    title: 'Băng Đô Dệt Gân Co Giãn Êm Ái',
    desc: 'Bản rộng 7cm dệt gân co giãn với viền sợi silicon siêu mỏng ẩn bên trong. Giữ nếp tóc gọn gàng tuyệt đối trong các tư thế dốc ngược mà không gây cảm giác bó thắt da đầu hay làm gãy nếp tóc. Trọn bộ 5 sắc thái màu.',
    listPriceVnd: 45000,
    origPriceVnd: 60000,
    isSale: true,
    metaPills: [
      { text: '45.000₫ (Gốc 60.000₫)', isPrice: true, isSalePrice: true },
      { text: '5 Sắc Thái Signature', icon: 'fa-palette' },
      { text: 'Freesize Êm Ái', icon: 'fa-head-side-heart' },
      { text: 'Ưu Đãi Sale 25%', icon: 'fa-percent', isHighlight: true }
    ]
  }
};

function renderProducts(filterCategory = currentCatalogFilter) {
  currentCatalogFilter = filterCategory;
  const container = document.getElementById('products-container');
  const bannerContainer = document.getElementById('category-banner-container');
  if (!container) return;

  // Sync category pills active state
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-filter') === filterCategory);
  });

  const detail = PRODUCT_CAT_DETAILS[filterCategory];

  // CASE 1: Hiển thị trang chuyên biệt cho từng trang phục / phụ kiện:
  // Render Banner sang trọng + 5 CARDS hiển thị đủ 5 màu sắc độc lập
  if (detail) {
    const product = PRODUCTS.find(p => p.id === detail.id);
    if (!product) return;
    detail.isSale = product.salePriceVnd != null;
    detail.desc = product.desc;
    detail.title = escapeHTML(product.name);
    detail.tag = product.categoryLabel + (detail.isSale ? ` · SALE -${Math.round((1-getSellingPrice(product)/product.listPriceVnd)*100)}%` : '');
    detail.metaPills.filter(p => p.icon === 'fa-percent').forEach(p => { p.text = detail.isSale ? `Ưu Đãi Sale ${Math.round((1-getSellingPrice(product)/product.listPriceVnd)*100)}%` : 'Giá niêm yết'; });
    detail.metaPills.filter(p => p.isPrice).forEach(p => { p.text = formatPrice(getSellingPrice(product)); });

    if (bannerContainer) {
      bannerContainer.innerHTML = `
        <div class="dedicated-cat-banner">
          <div class="cat-breadcrumb">
            <a href="#new" data-nav-cat="all">Trang Chủ</a> / 
            <span>${detail.breadcrumb}</span> / 
            <span>${detail.catName}</span>
          </div>
          <div class="cat-banner-tag"><i class="fa-solid fa-sparkles"></i> ${detail.tag}</div>
          <h2 class="cat-banner-title">${detail.title}</h2>
          <p class="cat-banner-desc">${escapeHTML(detail.desc)}</p>
          <div class="cat-banner-meta">
            ${detail.metaPills.map(p => `
              <span class="cat-meta-pill ${p.isPrice ? 'price-pill' : ''} ${p.isHighlight ? 'highlight' : ''}">
                ${p.icon ? `<i class="fa-solid ${p.icon}"></i>` : ''} ${p.text}
              </span>
            `).join('')}
          </div>
          <div class="cat-nav-quick-switch">
            <span style="font-size: 0.76rem; color: var(--text-muted); font-weight: 600;">Xem chi tiết 5 màu của các dòng khác:</span>
            <div class="cat-nav-switch-links">
              <button class="cat-nav-switch-btn ${filterCategory === 'bottoms' ? 'active' : ''}" data-nav-cat="bottoms">Quần Tập (5 Màu)</button>
              <button class="cat-nav-switch-btn ${filterCategory === 'bras' ? 'active' : ''}" data-nav-cat="bras">Áo Bra (5 Màu)</button>
              <button class="cat-nav-switch-btn ${filterCategory === 'outerwear' ? 'active' : ''}" data-nav-cat="outerwear">Áo Wrap (5 Màu)</button>
              <button class="cat-nav-switch-btn ${filterCategory === 'socks' ? 'active' : ''}" data-nav-cat="socks">Tất Chống Trượt (5 Màu)</button>
              <button class="cat-nav-switch-btn ${filterCategory === 'headband' ? 'active' : ''}" data-nav-cat="headband">Băng Đô (5 Màu)</button>
              <button class="cat-nav-switch-btn" data-nav-cat="all">Xem Tất Cả (5 Món)</button>
            </div>
          </div>
        </div>
      `;
    }

    // Render 5 CARDS hiển thị rõ 5 màu sắc của sản phẩm đó
    container.innerHTML = product.colors.map((color, colorIdx) => {
      const isWishlisted = wishlist.has(`${product.id}-${colorIdx}`);
      const priceHtml = productPriceHTML(product);

      // Clickable swatch dots for this card
      const swatchesHtml = product.colors.map((c, ci) => `
        <span class="swatch-dot ${ci === colorIdx ? 'active' : ''}" 
              style="background-color: ${c.hex};" 
              title="${c.name} (${c.enName})"
              data-product-id="${product.id}"
              data-color-index="${ci}"></span>
      `).join('');

      return `
        <div class="product-card" id="card-${product.id}-${colorIdx}">
          <div class="product-media">
            <div class="product-badges">
              <span class="badge" style="background: var(--mocha-deep); color: var(--vanilla-cream);">
                <i class="fa-solid fa-palette"></i> ${color.name}
              </span>
              ${detail.isSale ? `<span class="badge" style="background: #C44D34; color: #fff;">Sale</span>` : ''}
              ${product.badges.map(b => `<span class="badge">${b}</span>`).join('')}
            </div>
            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                    data-wishlist-id="${product.id}-${colorIdx}" 
                    title="Lưu vào yêu thích">
              <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            
            <img src="${color.img}" alt="${escapeHTML(product.name)} - ${color.name}" class="product-img-main" id="img-main-${product.id}-${colorIdx}">
            <img src="${color.hoverImg || color.img}" alt="${escapeHTML(product.name)} - ${color.name} chi tiết" class="product-img-hover" id="img-hover-${product.id}-${colorIdx}">

            <button class="quick-view-overlay-btn" data-quickview-id="${product.id}" data-color-index="${colorIdx}">
              <i class="fa-regular fa-eye"></i> Xem Nhanh
            </button>
          </div>

          <div class="product-details">
            <div class="product-category">${product.categoryLabel}</div>
            <h3 class="product-title">${escapeHTML(product.name)}</h3>
            
            <div style="font-size: 0.82rem; font-weight: 600; color: var(--mocha-deep); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
              <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background-color:${color.hex}; border:1px solid #ccc;"></span>
              <span>Sắc Thái: <strong id="card-color-name-${product.id}-${colorIdx}">${color.name}</strong> (${color.enName})</span>
            </div>

            <div class="product-rating">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
              <span class="count">(${product.reviewCount} đánh giá demo)</span>
            </div>

            <div class="product-price-row">
              ${priceHtml}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.35rem;">
              <span style="font-size: 0.72rem; color: var(--text-secondary); font-weight: 500;">Chọn nhanh sắc thái khác:</span>
            </div>
            <div class="product-swatches" id="swatches-${product.id}-${colorIdx}">
              ${swatchesHtml}
            </div>

            <div class="product-size-selector" id="sizes-${product.id}-${colorIdx}">
              <button class="size-pill" data-size="XS">XS</button>
              <button class="size-pill active" data-size="S">S</button>
              <button class="size-pill" data-size="M">M</button>
              <button class="size-pill" data-size="L">L</button>
            </div>

            <button class="btn-add-to-cart" data-add-id="${product.id}" data-color-index="${colorIdx}">
              <i class="fa-solid fa-bag-shopping"></i>
              <span>Thêm Màu ${color.name} Vào Giỏ</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    bindProductCardEvents();
    bindBannerSwitchEvents();
    return;
  }

  // CASE 2: Danh mục 'clothing' (Trang Phục - 3 items)
  if (filterCategory === 'clothing') {
    if (bannerContainer) {
      bannerContainer.innerHTML = `
        <div class="dedicated-cat-banner">
          <div class="cat-breadcrumb"><a href="#new" data-nav-cat="all">Trang Chủ</a> / <span>Trang Phục Pilates (3 Thiết Kế)</span></div>
          <div class="cat-banner-tag"><i class="fa-solid fa-shirt"></i> BỘ SƯU TẬP TRANG PHỤC CỐT LÕI</div>
          <h2 class="cat-banner-title">Trang Phục Pilates Thiết Yếu</h2>
          <p class="cat-banner-desc">Bộ 3 thiết kế trang phục cơ bản dành riêng cho thánh đường Reformer: Quần Loe Cạp Gập tôn dáng, Áo Bra Cổ Halter nâng đỡ tối ưu, và Áo Khoác Wrap Crossover phong cách vũ công ballet. <strong>Mỗi thiết kế đều có trọn vẹn cả 5 màu sắc</strong>.</p>
          <div class="cat-banner-meta">
            <span class="cat-meta-pill price-pill"><i class="fa-solid fa-tags"></i> Tầm Giá ~300k</span>
            <span class="cat-meta-pill"><i class="fa-solid fa-shirt"></i> 3 Dòng Trang Phục</span>
            <span class="cat-meta-pill"><i class="fa-solid fa-palette"></i> Đủ 5 Màu Mỗi Món</span>
            <span class="cat-meta-pill highlight"><i class="fa-solid fa-truck-fast"></i> Freeship Từ 500k</span>
          </div>
          <div class="cat-nav-quick-switch">
            <span style="font-size: 0.76rem; color: var(--text-muted); font-weight: 600;">Xem riêng từng trang phục (đủ 5 màu):</span>
            <div class="cat-nav-switch-links">
              <button class="cat-nav-switch-btn" data-nav-cat="bottoms">1. Quần Tập Pilates (5 Màu)</button>
              <button class="cat-nav-switch-btn" data-nav-cat="bras">2. Áo Bra Tập Pilates (5 Màu)</button>
              <button class="cat-nav-switch-btn" data-nav-cat="outerwear">3. Áo Wrap Pilates (5 Màu)</button>
            </div>
          </div>
        </div>
      `;
    }
  } else if (filterCategory === 'accessories') {
    // CASE 3: Danh mục 'accessories' (Phụ Kiện - 2 items)
    if (bannerContainer) {
      bannerContainer.innerHTML = `
        <div class="dedicated-cat-banner">
          <div class="cat-breadcrumb"><a href="#new" data-nav-cat="all">Trang Chủ</a> / <span>Phụ Kiện Pilates (2 Thiết Kế)</span></div>
          <div class="cat-banner-tag"><i class="fa-solid fa-socks"></i> PHỤ KIỆN REFORMER CHUYÊN BIỆT</div>
          <h2 class="cat-banner-title">Phụ Kiện Tập Pilates Hoàn Hảo</h2>
          <p class="cat-banner-desc">Bộ đôi phụ kiện an toàn thiết yếu cho các buổi tập Reformer: Tất Chống Trượt hở mu hạt silicon tổ ong bám chặt khung lò xo, và Băng Đô Dệt Gân co giãn êm ái viền silicon không đau đầu. <strong>Đầy đủ cả 5 màu sắc đồng bộ</strong>.</p>
          <div class="cat-banner-meta">
            <span class="cat-meta-pill price-pill"><i class="fa-solid fa-tag"></i> Từ 45.000₫ - 80.000₫</span>
            <span class="cat-meta-pill"><i class="fa-solid fa-socks"></i> 2 Phụ Kiện</span>
            <span class="cat-meta-pill"><i class="fa-solid fa-palette"></i> Đủ 5 Màu Mỗi Món</span>
            <span class="cat-meta-pill highlight"><i class="fa-solid fa-fire"></i> Combo 3 Đôi Tất 199k</span>
          </div>
          <div class="cat-nav-quick-switch">
            <span style="font-size: 0.76rem; color: var(--text-muted); font-weight: 600;">Xem riêng từng phụ kiện (đủ 5 màu):</span>
            <div class="cat-nav-switch-links">
              <button class="cat-nav-switch-btn" data-nav-cat="socks">1. Tất Chống Trượt (5 Màu)</button>
              <button class="cat-nav-switch-btn" data-nav-cat="headband">2. Băng Đô Tập (5 Màu)</button>
            </div>
          </div>
        </div>
      `;
    }
  } else {
    // CASE 4: 'all' / New -> Clear banner
    if (bannerContainer) bannerContainer.innerHTML = '';
  }

  // Render capsule cards
  const filtered = filterCategory === 'all' 
    ? PRODUCTS 
    : filterCategory === 'clothing'
    ? PRODUCTS.filter(p => ['bras', 'bottoms', 'outerwear'].includes(p.category))
    : PRODUCTS.filter(p => ['socks', 'headband'].includes(p.category));

  container.innerHTML = filtered.map(product => {
    const isWishlisted = wishlist.has(product.id);
    const swatchesHtml = product.colors.map((c, i) => `
      <span class="swatch-dot ${i === 0 ? 'active' : ''}" 
            style="background-color: ${c.hex};" 
            title="${c.name} (${c.enName})"
            data-product-id="${product.id}"
            data-color-index="${i}"></span>
    `).join('');

    const thumbsHtml = product.colors.map((c, i) => `
      <button type="button" 
              class="thumb-preview-btn ${i === 0 ? 'active' : ''}" 
              data-product-id="${product.id}" 
              data-color-index="${i}" 
              title="${c.name} (${c.enName})">
        <img src="${c.img}" alt="${escapeHTML(product.name)} - ${c.name}">
      </button>
    `).join('');

    const badgesHtml = product.badges.map(b => `<span class="badge">${b}</span>`).join('');

    return `
      <div class="product-card" id="card-${product.id}">
        <div class="product-media">
          <div class="product-badges">${badgesHtml}</div>
          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                  data-wishlist-id="${product.id}" 
                  title="Lưu vào danh sách yêu thích">
            <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
          
          <img src="${product.colors[0].img}" alt="${escapeHTML(product.name)}" class="product-img-main" id="img-main-${product.id}">
          <img src="${product.colors[0].hoverImg || product.colors[0].img}" alt="${escapeHTML(product.name)} chi tiết" class="product-img-hover" id="img-hover-${product.id}">

          <button class="quick-view-overlay-btn" data-quickview-id="${product.id}" data-color-index="0">
            <i class="fa-regular fa-eye"></i> Xem Nhanh
          </button>
        </div>

        <div class="product-details">
          <div class="product-category">${product.categoryLabel}</div>
          <h3 class="product-title">${escapeHTML(product.name)}</h3>
          
          <div class="product-rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <span class="count">(${product.reviewCount} đánh giá demo)</span>
          </div>

          <div class="product-price-row">
            ${productPriceHTML(product)}
          </div>

          <!-- Color Label & Swatch Dots -->
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.35rem;">
            <span style="font-size: 0.72rem; color: var(--text-secondary); font-weight: 500;">
              Màu chọn: <strong id="card-color-name-${product.id}" style="color: var(--mocha-deep);">${product.colors[0].name}</strong>
            </span>
            <span style="font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase;">5 Sắc Thái</span>
          </div>
          <div class="product-swatches" id="swatches-${product.id}">
            ${swatchesHtml}
          </div>

          <!-- 5 Mini Photo Thumbnails -->
          <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.35rem;">
            Xem trước 5 sắc thái:
          </div>
          <div class="product-color-thumbs" id="thumbs-${product.id}">
            ${thumbsHtml}
          </div>

          <!-- Size Selector Pills -->
          <div class="product-size-selector" id="sizes-${product.id}">
            <button class="size-pill" data-size="XS">XS</button>
            <button class="size-pill active" data-size="S">S</button>
            <button class="size-pill" data-size="M">M</button>
            <button class="size-pill" data-size="L">L</button>
          </div>

          <button class="btn-add-to-cart" data-add-id="${product.id}" data-color-index="0">
            <i class="fa-solid fa-bag-shopping"></i>
            <span>Thêm Vào Giỏ Hàng</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  bindProductCardEvents();
  bindBannerSwitchEvents();
}

function bindBannerSwitchEvents() {
  const banner = document.getElementById('category-banner-container');
  if (!banner) return;
  banner.querySelectorAll('[data-nav-cat]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = btn.getAttribute('data-nav-cat');
      renderProducts(cat);
      const capsuleSec = document.getElementById('capsule');
      if (capsuleSec) capsuleSec.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Function to synchronize color selection across swatches, thumbnails, and card photos
function selectProductColor(productId, colorIndex, targetCard = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || !product.colors[colorIndex]) return;

  const chosenColor = product.colors[colorIndex];
  const card = targetCard || document.getElementById(`card-${productId}`);
  if (!card) return;

  // Update swatches on this card
  card.querySelectorAll('.swatch-dot').forEach(d => {
    d.classList.toggle('active', parseInt(d.getAttribute('data-color-index')) === colorIndex);
  });

  // Update photo thumbnails
  card.querySelectorAll('.thumb-preview-btn').forEach(t => {
    t.classList.toggle('active', parseInt(t.getAttribute('data-color-index')) === colorIndex);
  });

  // Update color label
  const label = card.querySelector('[id^="card-color-name-"]');
  if (label) label.textContent = chosenColor.name;

  // Crossfade main image
  const mainImg = card.querySelector('.product-img-main');
  const hoverImg = card.querySelector('.product-img-hover');
  if (mainImg) {
    mainImg.style.opacity = '0.5';
    setTimeout(() => {
      mainImg.src = chosenColor.img;
      mainImg.style.opacity = '1';
    }, 100);
  }
  if (hoverImg) {
    hoverImg.src = chosenColor.hoverImg || chosenColor.img;
  }

  // Update add to cart button text & color index
  const addBtn = card.querySelector('.btn-add-to-cart');
  if (addBtn) {
    addBtn.setAttribute('data-color-index', colorIndex);
    const span = addBtn.querySelector('span');
    if (span) span.textContent = `Thêm Màu ${chosenColor.name} Vào Giỏ`;
  }
  const quickViewBtn = card.querySelector('.quick-view-overlay-btn');
  if (quickViewBtn) quickViewBtn.setAttribute('data-color-index', colorIndex);
}

// Render the 5-Color Atelier Showcase (All 5 Colors side by side for all products)
function renderAtelierShowcase() {
  const container = document.getElementById('atelier-rows-container');
  if (!container) return;

  container.innerHTML = PRODUCTS.map(product => {
    const cardsHtml = product.colors.map((c, i) => `
      <div class="atelier-card">
        <div class="atelier-img-wrap">
          <img src="${c.img}" alt="${escapeHTML(product.name)} - ${c.name}" loading="lazy">
        </div>
        <div class="atelier-info">
          <div class="atelier-color-dot" style="background-color: ${c.hex};" title="${c.name}"></div>
          <div class="atelier-color-name">${c.name}</div>
          <div style="font-size: 0.78rem; font-weight: 700; color: var(--mocha-brown); margin-bottom: 0.75rem;">
            ${formatPrice(getSellingPrice(product))}
          </div>
          <button class="btn-atelier-buy" onclick="quickAddAtelierItem('${product.id}', ${i})">
            <i class="fa-solid fa-plus" style="font-size: 0.65rem;"></i> Thêm Nhanh
          </button>
        </div>
      </div>
    `).join('');

    return `
      <div class="atelier-product-row">
        <div class="atelier-row-header">
          <div>
            <div class="product-category" style="margin-bottom: 0.2rem;">${product.categoryLabel}</div>
            <h3 class="atelier-row-title">${escapeHTML(product.name)}</h3>
          </div>
          <div class="atelier-row-price">${formatPrice(getSellingPrice(product))}</div>
        </div>
        <div class="atelier-5-grid">
          ${cardsHtml}
        </div>
      </div>
    `;
  }).join('');
}

window.quickAddAtelierItem = function(productId, colorIndex) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || !product.colors[colorIndex]) return;
  addToCart(product, 'S', product.colors[colorIndex]);
};

// Bind clicks on rendered product cards
function bindProductCardEvents() {
  // Swatch dot click
  document.querySelectorAll('#products-container .swatch-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = dot.getAttribute('data-product-id');
      const cIndex = parseInt(dot.getAttribute('data-color-index'));
      const card = dot.closest('.product-card');
      selectProductColor(pId, cIndex, card);
    });
  });

  // Mini photo thumbnail click
  document.querySelectorAll('#products-container .thumb-preview-btn').forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = thumb.getAttribute('data-product-id');
      const cIndex = parseInt(thumb.getAttribute('data-color-index'));
      const card = thumb.closest('.product-card');
      selectProductColor(pId, cIndex, card);
    });
  });

  // Size pill selection
  document.querySelectorAll('#products-container .product-size-selector .size-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const parent = pill.parentElement;
      parent.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Wishlist toggle
  document.querySelectorAll('#products-container .wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = btn.getAttribute('data-wishlist-id');
      const product = PRODUCTS.find(p => p.id === pId || pId.startsWith(`${p.id}-`));
      if (!product) return;
      if (wishlist.has(pId)) {
        wishlist.delete(pId);
        btn.classList.remove('active');
        btn.querySelector('i').className = 'fa-regular fa-heart';
        showToast(`Đã xóa "${product.name}" khỏi Danh Sách Yêu Thích`);
      } else {
        wishlist.add(pId);
        btn.classList.add('active');
        btn.querySelector('i').className = 'fa-solid fa-heart';
        showToast(`Đã lưu "${product.name}" vào Danh Sách Yêu Thích ❤️`);
      }
      const wlBadge = document.getElementById('wishlist-badge');
      if (wlBadge) wlBadge.textContent = wishlist.size;
      saveStoreState();
    });
  });

  // Add to cart buttons
  document.querySelectorAll('#products-container .btn-add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-add-id');
      const product = PRODUCTS.find(p => p.id === pId);
      if (!product) return;

      const card = btn.closest('.product-card');
      const sizeContainer = card ? card.querySelector('.product-size-selector') : null;
      const activeSize = sizeContainer ? (sizeContainer.querySelector('.size-pill.active')?.getAttribute('data-size') || 'S') : 'S';

      let colorIndex = 0;
      if (btn.hasAttribute('data-color-index') && btn.getAttribute('data-color-index') !== '') {
        colorIndex = parseInt(btn.getAttribute('data-color-index'));
      } else {
        const swatchContainer = card ? card.querySelector('.product-swatches') : null;
        const activeSwatch = swatchContainer ? swatchContainer.querySelector('.swatch-dot.active') : null;
        colorIndex = activeSwatch ? parseInt(activeSwatch.getAttribute('data-color-index')) : 0;
      }
      const colorObj = product.colors[colorIndex] || product.colors[0];

      addToCart(product, activeSize, colorObj);
    });
  });

  // Quick view triggers
  document.querySelectorAll('#products-container .quick-view-overlay-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-quickview-id');
      const cIndex = btn.hasAttribute('data-color-index') ? parseInt(btn.getAttribute('data-color-index')) : 0;
      openQuickView(pId, cIndex);
    });
  });
}

// --- 4. CART & SIDE DRAWER ENGINE ---
function addToCart(product, size = 'S', colorObj = null) {
  const color = colorObj || product.colors[0];
  const price = getSellingPrice(product);
  const cartKey = `${product.id}-${size}-${product.colors.indexOf(color)}`;

  const existing = cart.find(item => item.key === cartKey);
  if (existing) {
    existing.qty = Math.min(99, existing.qty + 1);
  } else {
    cart.push({
      key: cartKey,
      id: product.id,
      name: product.name,
      size: size,
      colorName: color.name,
      img: color.img || product.defaultImg,
      qty: 1
    });
  }

  updateCartUI();
  openCartDrawer();
  showToast(`Đã thêm ${product.name} (${color.name} / Size ${size}) vào Giỏ Hàng`);
}

function updateCartUI() {
  const quote = quoteCart(cart);
  cart = quote.lines;
  saveStoreState();
  const cartList = document.getElementById('cart-items-list');
  const badge = document.getElementById('cart-badge');
  const totalCountEl = document.getElementById('cart-total-count');
  const subtotalEl = document.getElementById('cart-subtotal');
  const grandtotalEl = document.getElementById('cart-grandtotal');

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotalVnd = quote.subtotalVnd;

  if (badge) badge.textContent = totalQty;
  if (totalCountEl) totalCountEl.textContent = totalQty;

  if (cart.length === 0) {
    if (cartList) cartList.innerHTML = `
      <div class="cart-empty-state" id="cart-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Giỏ hàng của bạn đang trống.</p>
        <button class="btn-secondary" style="margin-top: 1rem;" onclick="closeCartDrawer(); window.location.href='#capsule';">
          Khám Phá Sản Phẩm
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatPrice(0);
    if (grandtotalEl) grandtotalEl.textContent = formatPrice(0);
    updateFreeShippingProgress(0);
    return;
  }

  cartList.innerHTML = cart.map(item => `
    <div class="cart-item-row" data-key="${item.key}">
      <img src="${item.img}" alt="${escapeHTML(item.name)}" class="cart-item-thumb">
      <div class="cart-item-info">
        <h5>${escapeHTML(item.name)}</h5>
        <div class="cart-item-meta">${item.colorName} • Size ${item.size}${item.bundleGroupId ? ' • Combo (± cả nhóm)' : ''}</div>
        <div class="cart-item-price">${formatPrice(item.unitPriceVnd * item.qty)}</div>
        <div class="cart-qty-ctrl">
          <button onclick="changeQty('${item.key}', -1)"><i class="fa-solid fa-minus" style="font-size: 0.6rem;"></i></button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.key}', 1)"><i class="fa-solid fa-plus" style="font-size: 0.6rem;"></i></button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeCartItem('${item.key}')" title="Xóa món này">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotalVnd);
  if (grandtotalEl) grandtotalEl.textContent = formatPrice(subtotalVnd);

  updateFreeShippingProgress(subtotalVnd);
}

function updateFreeShippingProgress(subsubtotalVnd) {
  const threshold = SHIPPING_POLICY.thresholdVnd; // 500.000₫
  const msgEl = document.getElementById('shipping-msg');
  const percentEl = document.getElementById('shipping-percent');
  const barEl = document.getElementById('shipping-progress-fill');

  if (!msgEl || !barEl || !percentEl) return;

  if (subsubtotalVnd >= threshold) {
    msgEl.innerHTML = `<strong>✨ Bạn đã mở khóa miễn ship demo (chưa áp dụng giao hàng thật)!</strong>`;
    percentEl.textContent = `100%`;
    barEl.style.width = `100%`;
  } else {
    const diff = threshold - subsubtotalVnd;
    const pct = Math.min(100, Math.round((subsubtotalVnd / threshold) * 100));
    msgEl.textContent = `Thêm ${formatPrice(diff)} để nhận miễn ship demo`;
    percentEl.textContent = `${pct}%`;
    barEl.style.width = `${pct}%`;
  }
}

window.changeQty = function(key, delta) {
  if (![1, -1].includes(delta)) return;
  const item = cart.find(i => i.key === key);
  if (!item) return;
  const group = item.bundleGroupId ? cart.filter(i => i.bundleGroupId === item.bundleGroupId) : [item];
  const qty = Math.min(99, item.qty + delta);
  group.forEach(i => { i.qty = qty; });
  cart = cart.filter(i => i.qty > 0);
  updateCartUI();
};

window.removeCartItem = function(key) {
  cart = cart.filter(i => i.key !== key);
  updateCartUI();
  showToast('Đã xóa sản phẩm. Combo thiếu thành phần được tính lại theo giá lẻ hiện hành.');
};

function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (drawer && backdrop) {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = document.getElementById('cart-drawer')?.classList.contains('open') ? 'hidden' : '';
  }
}

// --- 5. QUICK VIEW MODAL ENGINE ---
let qvActiveProduct = null;
let qvActiveColor = null;
let qvActiveSize = 'S';

function openQuickView(productId, initialColorIndex = 0) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const validColorIdx = (initialColorIndex >= 0 && initialColorIndex < product.colors.length) ? initialColorIndex : 0;
  qvActiveProduct = product;
  qvActiveColor = product.colors[validColorIdx];
  qvActiveSize = 'S';

  const modal = document.getElementById('quickview-modal-backdrop');
  const imgEl = document.getElementById('qv-img');
  const titleEl = document.getElementById('qv-title');
  const catEl = document.getElementById('qv-category');
  const priceEl = document.getElementById('qv-price');
  const descEl = document.getElementById('qv-desc');
  const colorNameEl = document.getElementById('qv-selected-color');
  const swatchesEl = document.getElementById('qv-swatches');

  imgEl.src = qvActiveColor.img;
  titleEl.textContent = product.name;
  catEl.textContent = product.categoryLabel;

  const isSale = product.salePriceVnd != null;
  const salePriceVnd = getSellingPrice(product);
  const origPriceVnd = product.listPriceVnd;

  if (isSale) {
    priceEl.innerHTML = `<span style="color: #C44D34;">${formatPrice(salePriceVnd)}</span> <span style="text-decoration: line-through; color: var(--text-muted); font-size: 0.9rem; margin-left: 0.5rem;">${formatPrice(origPriceVnd)}</span>`;
  } else {
    priceEl.textContent = formatPrice(getSellingPrice(product));
  }

  descEl.textContent = product.desc;
  colorNameEl.textContent = qvActiveColor.name;

  // Render swatches in modal with initial selected color
  swatchesEl.innerHTML = product.colors.map((c, i) => `
    <span class="swatch-dot ${i === validColorIdx ? 'active' : ''}" 
          style="background-color: ${c.hex};" 
          title="${c.name} (${c.enName})" 
          data-color-index="${i}"></span>
  `).join('');

  swatchesEl.querySelectorAll('.swatch-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.colorIndex);
      qvActiveColor = product.colors[idx];
      swatchesEl.querySelectorAll('.swatch-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      colorNameEl.textContent = qvActiveColor.name;
      imgEl.src = qvActiveColor.img;
    });
  });

  // Size pills
  const sizePills = document.querySelectorAll('#qv-sizes .size-pill');
  sizePills.forEach(pill => {
    pill.classList.remove('active');
    if (pill.dataset.size === 'S') pill.classList.add('active');
    pill.onclick = () => {
      sizePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      qvActiveSize = pill.dataset.size;
    };
  });

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quickview-modal-backdrop');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = document.getElementById('cart-drawer')?.classList.contains('open') ? 'hidden' : '';
  }
}

// --- 6. TOAST NOTIFICATION ENGINE ---
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-sparkles" style="color: var(--butter-yellow);"></i> <span>${escapeHTML(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --- 7. DOM READY INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
  if (typeof window.fetch === 'function') {
    try {
      const response = await window.fetch('/api/catalog', { signal: AbortSignal.timeout(5000) });
      if (response.ok) {
        const data = await response.json();
        for (const product of PRODUCTS) {
          const saved = data.products?.find(p => p.id === product.id);
          if (saved && Number.isSafeInteger(saved.listPriceVnd)) {
            product.name = saved.name; product.desc = saved.desc;
            product.listPriceVnd = saved.listPriceVnd; product.salePriceVnd = saved.salePriceVnd ?? undefined;
            product.badges = saved.badges;
          }
        }
      }
    } catch { /* Keep the built-in catalog available when the service is offline. */ }
  }
  restoreStoreState();
  renderProducts('all');
  // Hash Routing Controller
  function handleHashRouting() {
    const rawHash = window.location.hash.toLowerCase();
    const hashToCat = {
      '#quan-tap': 'bottoms',
      '#ao-bra': 'bras',
      '#ao-wrap': 'outerwear',
      '#tat-pilates': 'socks',
      '#bang-do': 'headband',
      '#trang-phuc': 'clothing',
      '#phu-kien': 'accessories',
      '#capsule': 'all',
      '#new': 'all'
    };

    if (hashToCat[rawHash]) {
      const cat = hashToCat[rawHash];
      document.querySelectorAll('.category-pill').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-filter') === cat);
      });
      renderProducts(cat);
      const capsuleSec = document.getElementById('capsule');
      if (capsuleSec) {
        capsuleSec.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (['#bestseller', '#reviews', '#sale', '#lookbook', '#palette', '#atelier'].includes(rawHash)) {
      const targetEl = document.querySelector(rawHash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  window.addEventListener('hashchange', handleHashRouting);
  if (window.location.hash) {
    handleHashRouting();
  } else {
    renderProducts('all');
  }
  renderAtelierShowcase();
  updateGlobalPrices();
  const wishlistBadge = document.getElementById('wishlist-badge');
  if (wishlistBadge) wishlistBadge.textContent = wishlist.size;

  // Currency Selector Listener
  const currencySelector = document.getElementById('currency-selector');
  if (currencySelector) {
    currencySelector.value = currentCurrency;
    currencySelector.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      const mobileCurrSelect = document.getElementById('mobile-currency-select');
      if (mobileCurrSelect) mobileCurrSelect.value = currentCurrency;
      updateGlobalPrices();
      showToast(`Đã chuyển đơn vị tiền tệ sang ${currentCurrency}`);
    });
  }

  // Header Scroll Effect
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // SKIMS Category Filter Pills
  document.querySelectorAll('.category-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderProducts(cat);
      if (activeSpotlightColor !== 'all') {
        applyColorSpotlight(activeSpotlightColor);
      }
    });
  });

  // SKIMS Color Spotlight Filter Buttons
  let activeSpotlightColor = 'all';
  function applyColorSpotlight(colorKey) {
    activeSpotlightColor = colorKey;
    document.querySelectorAll('.color-filter-btn').forEach(btn => {
      const s = btn.getAttribute('data-spotlight');
      if (s === colorKey || (s && s.toLowerCase() === colorKey.toLowerCase())) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (colorKey === 'all') {
      PRODUCTS.forEach(p => selectProductColor(p.id, 0));
      showToast('Đang hiển thị tất cả sắc thái signature');
    } else {
      const q = colorKey.toLowerCase();
      PRODUCTS.forEach(p => {
        const cIndex = p.colors.findIndex(c => 
          c.name.toLowerCase().includes(q) || 
          (c.enName && c.enName.toLowerCase().includes(q)) ||
          q.includes(c.name.toLowerCase()) ||
          (c.enName && q.includes(c.enName.toLowerCase()))
        );
        if (cIndex !== -1) {
          selectProductColor(p.id, cIndex);
        }
      });
      showToast(`Tâm điểm sắc màu: ${colorKey}`);
    }
  }

  document.querySelectorAll('.color-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-spotlight');
      applyColorSpotlight(color);
    });
  });

  // Mega Menu & Navigation Category / Color Deep Links
  document.querySelectorAll('[data-nav-cat]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.getAttribute('data-nav-cat');
      document.querySelectorAll('.category-pill').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-filter') === cat);
      });
      renderProducts(cat);
      if (activeSpotlightColor !== 'all') {
        applyColorSpotlight(activeSpotlightColor);
      }
      closeMobileDrawer();
      document.getElementById('capsule')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-nav-color]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const color = link.getAttribute('data-nav-color');
      applyColorSpotlight(color);
      closeMobileDrawer();
      document.getElementById('capsule')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Live Search Functionality
  const navSearchInput = document.getElementById('nav-search-input');
  const mobileSearchInput = document.getElementById('mobile-search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');

  function handleCatalogSearch(query) {
    const q = query.trim().toLowerCase();
    if (searchClearBtn) searchClearBtn.style.display = q ? 'block' : 'none';
    
    if (!q) {
      renderProducts('all');
      return;
    }

    const matched = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.colors.some(c => 
        c.name.toLowerCase().includes(q) || 
        (c.enName && c.enName.toLowerCase().includes(q))
      )
    );

    const container = document.getElementById('products-container');
    if (!container) return;

    if (matched.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-secondary);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--border-color);"></i>
          <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--mocha-deep); margin-bottom: 0.5rem;">Không Tìm Thấy Sản Phẩm</h3>
          <p style="font-size: 0.9rem;">Không tìm thấy trang phục phù hợp với "${escapeHTML(query)}". Thử tìm kiếm "Bra", "Quần loe", "Áo khoác wrap", "Tất", hoặc "Băng đô".</p>
        </div>
      `;
    } else {
      renderFilteredProducts(matched);
    }
  }

  function renderFilteredProducts(productList) {
    const container = document.getElementById('products-container');
    if (!container) return;
    container.innerHTML = productList.map(product => {
      const isWishlisted = wishlist.has(product.id);
      const swatchesHtml = product.colors.map((c, i) => `
        <span class="swatch-dot ${i === 0 ? 'active' : ''}" 
              style="background-color: ${c.hex};" 
              title="${c.name} (${c.enName})"
              data-product-id="${product.id}"
              data-color-index="${i}"></span>
      `).join('');

      const thumbsHtml = product.colors.map((c, i) => `
        <button type="button" 
                class="thumb-preview-btn ${i === 0 ? 'active' : ''}" 
                data-product-id="${product.id}" 
                data-color-index="${i}" 
                title="${c.name} (${c.enName})">
          <img src="${c.img}" alt="${escapeHTML(product.name)} - ${c.name}">
        </button>
      `).join('');

      const badgesHtml = product.badges.map(b => `<span class="badge">${b}</span>`).join('');

      return `
        <div class="product-card" id="card-${product.id}">
          <div class="product-media">
            <div class="product-badges">${badgesHtml}</div>
            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                    data-wishlist-id="${product.id}" 
                    title="Lưu vào danh sách yêu thích">
              <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            
            <img src="${product.colors[0].img}" alt="${escapeHTML(product.name)}" class="product-img-main" id="img-main-${product.id}">
            <img src="${product.colors[0].hoverImg || product.colors[0].img}" alt="${escapeHTML(product.name)} chi tiết" class="product-img-hover" id="img-hover-${product.id}">

            <button class="quick-view-overlay-btn" data-quickview-id="${product.id}">
              <i class="fa-regular fa-eye"></i> Xem Nhanh
            </button>
          </div>

          <div class="product-details">
            <div class="product-category">${product.categoryLabel}</div>
            <h3 class="product-title">${escapeHTML(product.name)}</h3>
            
            <div class="product-rating">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <span class="count">(${product.reviewCount} đánh giá demo)</span>
            </div>

            <div class="product-price-row">
              <span class="product-price">${formatPrice(getSellingPrice(product))}</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.35rem;">
              <span style="font-size: 0.72rem; color: var(--text-secondary); font-weight: 500;">
                Màu chọn: <strong id="card-color-name-${product.id}" style="color: var(--mocha-deep);">${product.colors[0].name}</strong>
              </span>
              <span style="font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase;">5 Sắc Thái</span>
            </div>
            <div class="product-swatches" id="swatches-${product.id}">
              ${swatchesHtml}
            </div>

            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.35rem;">
              Xem trước 5 sắc thái:
            </div>
            <div class="product-color-thumbs" id="thumbs-${product.id}">
              ${thumbsHtml}
            </div>

            <div class="product-size-selector" id="sizes-${product.id}">
              <button class="size-pill" data-size="XS">XS</button>
              <button class="size-pill active" data-size="S">S</button>
              <button class="size-pill" data-size="M">M</button>
              <button class="size-pill" data-size="L">L</button>
            </div>

            <button class="btn-add-to-cart" data-add-id="${product.id}">
              <i class="fa-solid fa-bag-shopping"></i>
              <span>Thêm Vào Giỏ Hàng</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
    bindProductCardEvents();
  }

  if (navSearchInput) {
    navSearchInput.addEventListener('input', (e) => handleCatalogSearch(e.target.value));
  }
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => handleCatalogSearch(e.target.value));
  }
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (navSearchInput) navSearchInput.value = '';
      if (mobileSearchInput) mobileSearchInput.value = '';
      handleCatalogSearch('');
    });
  }

  // Cart Drawer open/close
  const cartTrigger = document.getElementById('cart-drawer-trigger');
  const cartClose = document.getElementById('cart-close');
  const cartBackdrop = document.getElementById('cart-backdrop');
  if (cartTrigger) cartTrigger.addEventListener('click', openCartDrawer);
  if (cartClose) cartClose.addEventListener('click', closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);

  // Quick View Close
  const qvClose = document.getElementById('quickview-close');
  const qvBackdrop = document.getElementById('quickview-modal-backdrop');
  if (qvClose) qvClose.addEventListener('click', closeQuickView);
  if (qvBackdrop) {
    qvBackdrop.addEventListener('click', (e) => {
      if (e.target === qvBackdrop) closeQuickView();
    });
  }

  // Quick View "Add to Bag"
  const qvAddBtn = document.getElementById('qv-add-btn');
  if (qvAddBtn) {
    qvAddBtn.addEventListener('click', () => {
      if (qvActiveProduct) {
        addToCart(qvActiveProduct, qvActiveSize, qvActiveColor);
        closeQuickView();
      }
    });
  }

  // Size Guide Modals
  const sizeGuideBackdrop = document.getElementById('sizeguide-modal-backdrop');
  const sizeGuideClose = document.getElementById('sizeguide-close');
  const openSizeGuide = (e) => {
    if (e) e.preventDefault();
    sizeGuideBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeSizeGuide = () => {
    sizeGuideBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  const footerSizeLink = document.getElementById('size-guide-footer-link');
  const qvSizeLink = document.getElementById('qv-size-guide-btn');
  const megaSizeLink = document.getElementById('mega-size-guide-link');
  const mobileSizeLink = document.getElementById('mobile-size-guide-link');

  if (footerSizeLink) footerSizeLink.addEventListener('click', openSizeGuide);
  if (qvSizeLink) qvSizeLink.addEventListener('click', openSizeGuide);
  if (megaSizeLink) megaSizeLink.addEventListener('click', openSizeGuide);
  if (mobileSizeLink) mobileSizeLink.addEventListener('click', openSizeGuide);
  if (sizeGuideClose) sizeGuideClose.addEventListener('click', closeSizeGuide);
  if (sizeGuideBackdrop) {
    sizeGuideBackdrop.addEventListener('click', (e) => {
      if (e.target === sizeGuideBackdrop) closeSizeGuide();
    });
  }

  // --- BEST SELLER COMBOS HANDLERS ---
  // Combo 1: Áo Bra + Quần Loe (Tiết kiệm 15%: 550.000₫ thay vì 640.000₫)
  const addOutfitComboBtn = document.getElementById('add-outfit-combo-btn');
  if (addOutfitComboBtn) {
    addOutfitComboBtn.addEventListener('click', () => {
      addBundle('outfit');
    });
  }

  // Combo 2: Combo 3 Đôi Tất Chống Trượt (Tiết kiệm 20%: 199.000₫ thay vì 240.000₫)
  const addSocksComboBtn = document.getElementById('add-socks-combo-btn');
  if (addSocksComboBtn) {
    addSocksComboBtn.addEventListener('click', () => {
      addBundle('socks');
    });
  }

  // Combo 3: Full Set 5 Món Pilates Hoàn Hảo (Tiết kiệm 20%: 950.000₫ thay vì 1.130.000₫)
  const addBundleBtn = document.getElementById('add-bundle-btn');
  if (addBundleBtn) {
    addBundleBtn.addEventListener('click', () => {
      addBundle('full');
    });
  }

  // --- SALE ITEMS HANDLERS ---
  // Sale Item 1: Áo Wrap (Sale -20%: 280.000₫ thay vì 350.000₫)
  const addSaleWrapBtn = document.getElementById('add-sale-wrap-btn');
  if (addSaleWrapBtn) {
    addSaleWrapBtn.addEventListener('click', () => {
      const wrap = PRODUCTS.find(p => p.id === 'ballet-wrap');
      if (wrap) {
        addToCart(wrap, 'S', wrap.colors[saleWrapColorIndex || 0], 11.2);
        showToast('✨ Đã thêm Áo Wrap Crossover (Ưu Đãi Sale 20% - 280.000₫) vào Giỏ Hàng!');
      }
    });
  }

  // Sale Item 2: Băng Đô (Sale -25%: 45.000₫ thay vì 60.000₫)
  const addSaleHeadbandBtn = document.getElementById('add-sale-headband-btn');
  if (addSaleHeadbandBtn) {
    addSaleHeadbandBtn.addEventListener('click', () => {
      const headband = PRODUCTS.find(p => p.id === 'cloud-headband');
      if (headband) {
        addToCart(headband, 'S', headband.colors[saleHeadbandColorIndex || 0], 1.8);
        showToast('✨ Đã thêm Băng Đô Dệt Gân (Ưu Đãi Sale 25% - 45.000₫) vào Giỏ Hàng!');
      }
    });
  }

  // Color Swatcher for Sale Wrap
  let saleWrapColorIndex = 0;
  const wrapProduct = PRODUCTS.find(p => p.id === 'ballet-wrap');
  const saleWrapSwatches = document.getElementById('sale-wrap-swatches');
  if (saleWrapSwatches && wrapProduct) {
    saleWrapSwatches.querySelectorAll('.swatch-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        saleWrapSwatches.querySelectorAll('.swatch-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        const idx = parseInt(dot.getAttribute('data-index'));
        saleWrapColorIndex = idx;
        const color = wrapProduct.colors[idx];
        const imgEl = document.getElementById('sale-wrap-img');
        const nameEl = document.getElementById('sale-wrap-color-name');
        if (imgEl) imgEl.src = color.img;
        if (nameEl) nameEl.textContent = color.name;
      });
    });
  }

  // Color Swatcher for Sale Headband
  let saleHeadbandColorIndex = 0;
  const headbandProduct = PRODUCTS.find(p => p.id === 'cloud-headband');
  const saleHeadbandSwatches = document.getElementById('sale-headband-swatches');
  if (saleHeadbandSwatches && headbandProduct) {
    saleHeadbandSwatches.querySelectorAll('.swatch-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        saleHeadbandSwatches.querySelectorAll('.swatch-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        const idx = parseInt(dot.getAttribute('data-index'));
        saleHeadbandColorIndex = idx;
        const color = headbandProduct.colors[idx];
        const imgEl = document.getElementById('sale-headband-img');
        const nameEl = document.getElementById('sale-headband-color-name');
        if (imgEl) imgEl.src = color.img;
        if (nameEl) nameEl.textContent = color.name;
      });
    });
  }

  // Lookbook Act Tabs
  document.querySelectorAll('.act-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.act-tab-btn').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.lookbook-content-act').forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const actId = `act-${tab.dataset.act}`;
      const content = document.getElementById(actId);
      if (content) content.classList.add('active');
    });
  });

  // Mobile Menu Drawer Logic
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileClose = document.getElementById('mobile-nav-close');

  function openMobileDrawer() {
    mobileToggle?.setAttribute('aria-expanded', 'true');
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (mobileBackdrop) mobileBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    mobileToggle?.setAttribute('aria-expanded', 'false');
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileDrawer);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileDrawer);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileDrawer);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileDrawer?.classList.contains('active')) {
      closeMobileDrawer();
      mobileToggle?.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1180 && mobileDrawer?.classList.contains('active')) closeMobileDrawer();
  });

  // Accordion inside mobile navigation drawer
  document.querySelectorAll('.mobile-accordion-header').forEach(hdr => {
    hdr.addEventListener('click', () => {
      const parentItem = hdr.closest('.mobile-accordion-item');
      if (parentItem) {
        const wasOpen = parentItem.classList.contains('open');
        document.querySelectorAll('.mobile-accordion-item').forEach(it => it.classList.remove('open'));
        if (!wasOpen) parentItem.classList.add('open');
      }
    });
  });

  // Mobile Currency Selector Synced with Top Bar
  const mobileCurrSelect = document.getElementById('mobile-currency-select');
  if (mobileCurrSelect) {
    mobileCurrSelect.value = currentCurrency;
    mobileCurrSelect.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      if (currencySelector) currencySelector.value = currentCurrency;
      updateGlobalPrices();
      showToast(`Đã chuyển đơn vị tiền tệ sang ${currentCurrency}`);
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      showToast('Đăng ký nhận tin đang được hoàn thiện. Email của bạn chưa được gửi hoặc đăng ký.');
    });
  }

  // Checkout Button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Giỏ hàng của bạn đang trống.');
        return;
      }
      showToast('Website đang chạy bản xem trước. Chưa tiếp nhận đơn hàng hoặc thanh toán; giỏ hàng của bạn vẫn được lưu.');
    });
  }

  // Wishlist Header trigger
  const wishlistBtn = document.getElementById('wishlist-trigger');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      if (wishlist.size === 0) {
        showToast('Danh sách yêu thích đang trống. Hãy nhấn biểu tượng trái tim ở từng sản phẩm để lưu lại.');
      } else {
        showToast(`Bạn đang lưu ${wishlist.size} sản phẩm trong Danh Sách Yêu Thích ❤️`);
      }
    });
  }
});
