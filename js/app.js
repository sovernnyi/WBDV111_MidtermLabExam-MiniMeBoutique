/*  MiniMe Boutique  */

// ─── CART STATE
let cart;
try {
  cart = JSON.parse(localStorage.getItem('minime-cart')) || [];
} catch {
  cart = [];
}

function saveCart() {
  localStorage.setItem('minime-cart', JSON.stringify(cart));
  updateCartBadges();
}

function updateCartBadges() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

// FIX: addToCart now uses a composite key of id + type + size so the same
//      product in different types/sizes is stored as separate cart entries
function addToCart(product) {
  const cartKey = product.id + (product.selectedType || '') + (product.selectedSize || '');
  const existing = cart.find(i => i.cartKey === cartKey);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1, cartKey });
  }
  saveCart();
  showToast('Added to cart!', product.title);
}

function removeFromCart(cartKey) {
  cart = cart.filter(i => i.cartKey !== cartKey);
  saveCart();
  renderCart();
}

function updateQty(cartKey, delta) {
  const item = cart.find(i => i.cartKey === cartKey);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(cartKey); return; }
  saveCart();
  renderCart();
}

// ─── PRODUCT DATA
// FIX: "Peaach Pink" → "Peach Pink"  (sandra color)
// FIX: "Pruple" → "Purple"           (pinky material)
// FIX: "Gree, Rust" → "Green, Rust"  (ailah details)
// FIX: pinky price corrected to 725  (was 1240, HTML card shows 725)
// NEW: added `description` field to every product
// NEW: added `types` array for Set / Twin / Dad / Son options with per-type pricing
// NEW: added `sizes` arrays per type
const PRODUCTS = {
  sandra: {
    id: 'sandra',
    title: 'Sandra Family Set',
    price: 825,
    color: 'Peach Pink',                          // FIX: was "Peaach Pink"
    material: 'Floral Design • Pink',
    badge: 'SANDRA SET',
    badgeClass: 'badge-gold',
    img: 'images/sandra.png',
    description: 'A soft floral design in dreamy peach pink tones — perfect for family portraits, celebrations, or any beautiful Tuesday. The Sandra set features breathable fabric with a delicate printed floral pattern that photographs beautifully.',
    breakdown: [['Mom & Daughter', '₱825'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Peach Pink, Purple, Denim Blue, Yellow)', 'Mom Size: Small - XL', 'Daughter & Son Size: Small - Large', 'Dad size: Large - XXL'],
    types: [
      { label: 'Full Set (Mom & Daughter)', price: 825, sizes: ['S', 'M', 'L', 'XL'] },
      { label: 'Twin Set (Mom & Daughter)', price: 825, sizes: ['S', 'M', 'L', 'XL'] },
      { label: 'Dad Shirt',                 price: 345, sizes: ['L', 'XL', 'XXL'] },
      { label: "Son's Set",                 price: 245, sizes: ['S', 'M', 'L'] }
    ]
  },
  krizzel: {
    id: 'krizzel',
    title: 'Krizzel Family Set',
    price: 1160,
    color: 'White Linen',
    material: 'Cotton Linen • White',
    badge: 'KRIZZEL',
    badgeClass: 'badge-pink',
    img: 'images/krizzel.png',
    description: 'Crisp white cotton linen with a relaxed, resort-ready silhouette. The Krizzel set is lightweight and airy — ideal for beach outings, family events, and warm weather moments that deserve to be remembered.',
    breakdown: [['Twin Set (Mom)', '₱815'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Indigo, Purple, Red, Forest Green)', 'Mom Size: Medium - XXL', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL'],
    types: [
      { label: 'Twin Set (Mom & Daughter)', price: 815,  sizes: ['M', 'L', 'XL', 'XXL'] },
      { label: 'Dad Shirt',                 price: 345,  sizes: ['M', 'L', 'XL', 'XXL'] },
      { label: "Son's Set",                 price: 245,  sizes: ['S', 'M', 'L'] }
    ]
  },
  mia: {
    id: 'mia',
    title: 'Mia Family Set',
    price: 1140,
    color: 'Black',
    material: 'Black • Flower Embroidery',
    badge: 'MIA',
    badgeClass: 'badge-brown',
    img: 'images/mia.png',
    description: 'Refined black fabric elevated by hand-detailed flower embroidery. The Mia set makes a striking statement — elegant enough for special occasions, comfortable enough for everyday wear.',
    breakdown: [['Mom & Daughter', '₱795'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Nude, White, Black, Red)', 'Mom Size: Small - Large', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL'],
    types: [
      { label: 'Mom & Daughter Set',        price: 795,  sizes: ['S', 'M', 'L'] },
      { label: 'Dad Shirt',                 price: 345,  sizes: ['M', 'L', 'XL', 'XXL'] },
      { label: "Son's Set",                 price: 245,  sizes: ['S', 'M', 'L'] }
    ]
  },
  eula: {
    id: 'eula',
    title: 'Eula Family Set',
    price: 1160,
    color: 'Blush Pink',
    material: 'Linen • Blush Pink',
    badge: 'EULA',
    badgeClass: 'badge-gold',
    img: 'images/eula.png',
    description: 'Soft blush pink linen with a graceful, flowy cut that flatters every body. The Eula set radiates quiet luxury — choose it for your next family portrait or simply to make every day feel special.',
    breakdown: [['Mom & Daughter', '₱815'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Yellow, Red, White, Pink, Blue, Purple)', 'Mom Size: Small - Large', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL'],
    types: [
      { label: 'Mom & Daughter Set',        price: 815,  sizes: ['S', 'M', 'L'] },
      { label: 'Dad Shirt',                 price: 345,  sizes: ['M', 'L', 'XL', 'XXL'] },
      { label: "Son's Set",                 price: 245,  sizes: ['S', 'M', 'L'] }
    ]
  },
  olivia: {
    id: 'olivia',
    title: 'Olivia Family Set',
    price: 1160,
    color: 'Sage Green',
    material: 'Cotton • Sage Green',
    badge: 'OLIVIA',
    badgeClass: 'badge-pink',
    img: 'images/olivia.png',
    description: 'Earthy sage green cotton with a casual-chic silhouette perfect for outdoor family adventures. The Olivia set is made for the modern family who loves nature, comfort, and looking effortlessly put-together.',
    breakdown: [['Mom & Daughter', '₱815'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Red, Blue, Peach, Purple, Pink, Green, Orange)', 'Mom Size: Medium - XXL', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL'],
    types: [
      { label: 'Mom & Daughter Set',        price: 815,  sizes: ['M', 'L', 'XL', 'XXL'] },
      { label: 'Dad Shirt',                 price: 345,  sizes: ['M', 'L', 'XL', 'XXL'] },
      { label: "Son's Set",                 price: 245,  sizes: ['S', 'M', 'L'] }
    ]
  },
  ellery: {
    id: 'ellery',
    title: 'Ellery Family Set',
    price: 1180,
    color: 'Pastel Yellow',
    material: 'Linen • Pastel Yellow',
    badge: 'ELLERY',
    badgeClass: 'badge-brown',
    img: 'images/ellery.png',
    description: 'Sunshine pastel yellow linen that brings warmth and joy to every family photo. The Ellery set is versatile, available in the widest range of colors — a MiniMe best-seller for good reason.',
    breakdown: [['Mom & Daughter', '₱835'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Red, Peach, Green, Dusty Green, Yellow, White, Pink, Pastel Blue, Royal Blue, Dusty Blue, Purple, Cream, Black, Fuschia Pink)', 'Mom Size: Medium - XXL', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL'],
    types: [
      { label: 'Mom & Daughter Set',        price: 835,  sizes: ['M', 'L', 'XL', 'XXL'] },
      { label: 'Dad Shirt',                 price: 345,  sizes: ['M', 'L', 'XL', 'XXL'] },
      { label: "Son's Set",                 price: 245,  sizes: ['S', 'M', 'L'] }
    ]
  },
  paula: {
    id: 'paula',
    title: 'Paula Family Set',           // FIX: was "Puala" in HTML card
    price: 1130,
    color: 'Dusty Pink',
    material: 'Cotton • Dusty Pink',
    badge: 'PAULA',
    badgeClass: 'badge-gold',
    img: 'images/paula.png',
    description: 'Dusty pink cotton with a romantic, muted tone that photographs like a dream. The Paula set is our most popular for christenings, first birthdays, and milestone celebrations.',
    breakdown: [['Mom & Daughter', '₱785'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Peach, Pastel Yellow, Pastel Purple, Emerald Green, Orange, Purple, Red Maroon)', 'Mom Size: Medium - XXXL', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL'],
    types: [
      { label: 'Mom & Daughter Set',        price: 785,  sizes: ['M', 'L', 'XL', 'XXL', 'XXXL'] },
      { label: 'Dad Shirt',                 price: 345,  sizes: ['M', 'L', 'XL', 'XXL'] },
      { label: "Son's Set",                 price: 245,  sizes: ['S', 'M', 'L'] }
    ]
  },
  pinky: {
    id: 'pinky',
    title: 'Pinky Coords Family Set',
    price: 725,                           // FIX: was 1240, correct price is 725 per HTML card
    color: 'Purple',
    material: 'Linen • Purple',           // FIX: was "Pruple"
    badge: 'PINKY COORDS',
    badgeClass: 'badge-pink',
    img: 'images/pinky.png',
    description: 'Playful purple linen coords with a coordinated, mix-and-match style. The Pinky Coords set is casual-cool and perfect for parks, malls, or any outing where your family wants to turn heads.',
    breakdown: [['Mom & Daughter', '₱725'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Green, Fuschia Pink, Yellow, Purple, Black)', 'Mom Size: Small - Large', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL'],
    types: [
      { label: 'Mom & Daughter Set',        price: 725,  sizes: ['S', 'M', 'L'] },
      { label: 'Dad Shirt',                 price: 345,  sizes: ['M', 'L', 'XL', 'XXL'] },
      { label: "Son's Set",                 price: 245,  sizes: ['S', 'M', 'L'] }
    ]
  },
  ailah: {
    id: 'ailah',
    title: 'Ailah Family Set',
    price: 785,
    color: 'Green',
    material: 'Cotton • Green',
    badge: 'AILAH',
    badgeClass: 'badge-brown',
    img: 'images/ailah.png',
    description: 'Fresh cotton green with a clean, contemporary cut. The Ailah set is understated and versatile — easy to style for casual Sundays or semi-formal family gatherings.',
    breakdown: [['Mom & Daughter', '₱785'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Green, Rust)', // FIX: was "Gree, Rust"
              'Mom Size: Medium - XXL', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL'],
    types: [
      { label: 'Mom & Daughter Set',        price: 785,  sizes: ['M', 'L', 'XL', 'XXL'] },
      { label: 'Dad Shirt',                 price: 345,  sizes: ['M', 'L', 'XL', 'XXL'] },
      { label: "Son's Set",                 price: 245,  sizes: ['S', 'M', 'L'] }
    ]
  },
  althea: {
    id: 'althea',
    title: 'Althea Family Set',
    price: 1090,
    color: 'Holiday Red',
    material: 'Cotton • Holiday Red',
    badge: 'ALTHEA',
    badgeClass: 'badge-gold',
    img: 'images/althea.png',
    description: 'Bold holiday red cotton that brings festive energy to every family occasion. The Althea set is a seasonal favorite — vibrant, cheerful, and designed to make your family photos unforgettable.',
    breakdown: [['Mom & Daughter', '₱745'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Red, Brown, Blue, Pink)', 'Mom Size: Medium - XXL', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL'],
    types: [
      { label: 'Mom & Daughter Set',        price: 745,  sizes: ['M', 'L', 'XL', 'XXL'] },
      { label: 'Dad Shirt',                 price: 345,  sizes: ['M', 'L', 'XL', 'XXL'] },
      { label: "Son's Set",                 price: 245,  sizes: ['S', 'M', 'L'] }
    ]
  }
};

// ─── LOCATION DATA
const phLocationData = {
  "NCR": {
    "Metro Manila": {
      "Manila": "1000", "Makati": "1200", "Quezon City": "1100", "Pasig": "1600",
      "Taguig": "1630", "Mandaluyong": "1550", "Marikina": "1800", "Las Piñas": "1740"
    }
  },
  "Region IV-A (CALABARZON)": {
    "Rizal":    { "Antipolo": "1870", "Taytay": "1920", "Cainta": "1900", "Angono": "1930", "Pililla": "1910" },
    "Cavite":   { "Bacoor": "4102", "Dasmariñas": "4114", "Imus": "4103", "Tagaytay": "4120" },
    "Laguna":   { "Calamba": "4027", "Santa Rosa": "4026", "Biñan": "4024", "San Pablo": "4000" },
    "Batangas": { "Batangas City": "4200", "Lipa": "4217", "Tanauan": "4232" },
    "Quezon":   { "Lucena": "4301", "Tayabas": "4327", "Sariaya": "4322", "Candelaria": "4317" }
  },
  "Region III (Central Luzon)": {
    "Bulacan":   { "Malolos": "3000", "Meycauayan": "3020", "San Jose del Monte": "3023" },
    "Pampanga":  { "Angeles": "2009", "San Fernando": "2000", "Mabalacat": "2010" },
    "Tarlac":    { "Tarlac City": "2300" }
  },
  "Region I (Ilocos Region)": {
    "Ilocos Norte": { "Laoag": "2900", "Batac": "2906" },
    "Ilocos Sur":   { "Vigan": "2700", "Candon": "2710" },
    "Pangasinan":   { "Dagupan": "2400", "Urdaneta": "2428", "San Carlos": "2420" }
  }
};

function updateProvinces() {
  const region   = document.getElementById('co-region').value;
  const provSel  = document.getElementById('co-province');
  const citySel  = document.getElementById('co-city');
  const zipInput = document.getElementById('co-zip');
  provSel.innerHTML  = '<option value="" disabled selected>Select Province</option>';
  citySel.innerHTML  = '<option value="" disabled selected>Select City</option>';
  zipInput.value     = '';
  if (phLocationData[region]) {
    Object.keys(phLocationData[region]).forEach(prov => {
      const opt = document.createElement('option');
      opt.value = prov; opt.textContent = prov;
      provSel.appendChild(opt);
    });
  }
}

function updateCities() {
  const region   = document.getElementById('co-region').value;
  const province = document.getElementById('co-province').value;
  const citySel  = document.getElementById('co-city');
  const zipInput = document.getElementById('co-zip');
  citySel.innerHTML = '<option value="" disabled selected>Select City</option>';
  zipInput.value    = '';
  if (phLocationData[region]?.[province]) {
    Object.keys(phLocationData[region][province]).forEach(city => {
      const opt = document.createElement('option');
      opt.value = city; opt.textContent = city;
      citySel.appendChild(opt);
    });
  }
}

function updateZip() {
  const region   = document.getElementById('co-region').value;
  const province = document.getElementById('co-province').value;
  const city     = document.getElementById('co-city').value;
  const zipInput = document.getElementById('co-zip');
  if (phLocationData[region]?.[province]?.[city]) {
    zipInput.value            = phLocationData[region][province][city];
    zipInput.readOnly         = true;
    zipInput.style.background = '#f9f9f9';
  }
}

// ─── TOAST
// FIX: Toast now creates the element dynamically if #toast doesn't exist in HTML.
//      This was the root cause of all broken toast notifications.
function showToast(title, subtitle, type = 'success') {
  let toast = document.getElementById('toast');

  // If the toast container was never added to HTML, create it once and append to body
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div>
        <p class="toast-title" id="toast-title"></p>
        <p class="toast-sub"   id="toast-sub"></p>
      </div>`;
    document.body.appendChild(toast);
  }

  // Set colours based on type
  toast.style.borderLeftColor =
    type === 'error'   ? '#c0392b' :
    type === 'warning' ? 'var(--gold-500)' :
                         'var(--pink-accent)';

  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-sub').textContent   = subtitle;

  // Reset then animate in
  toast.classList.remove('show');
  void toast.offsetWidth; // force reflow so transition replays
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3500);
}

// ─── INLINE FIELD ERROR HELPERS
// NEW: shows a red error message directly under the input field
function setFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.classList.add('input-error');
  let errEl = field.parentElement.querySelector('.field-error-msg');
  if (!errEl) {
    errEl = document.createElement('p');
    errEl.className = 'field-error-msg';
    field.parentElement.appendChild(errEl);
  }
  errEl.textContent = message;
  errEl.style.display = 'block';
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.classList.remove('input-error');
  const errEl = field.parentElement.querySelector('.field-error-msg');
  if (errEl) errEl.style.display = 'none';
}

function clearAllErrors(ids) {
  ids.forEach(id => clearFieldError(id));
}

// ─── PRODUCT MODAL
let currentProduct  = null;
let modalQty        = 1;
let selectedTypeIdx = 0;
let selectedSize    = '';

function openModal(productId) {
  const p = PRODUCTS[productId];
  if (!p) return;
  currentProduct  = p;
  modalQty        = 1;
  selectedTypeIdx = 0;
  selectedSize    = p.types[0].sizes[0];

  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  document.getElementById('modal-colorway').textContent    = p.color.toUpperCase();
  document.getElementById('modal-title').textContent       = p.title;
  document.getElementById('modal-qty-display').textContent = modalQty;

  // Description — NEW
  const descEl = document.getElementById('modal-description');
  if (descEl) descEl.textContent = p.description;

  // Type selector — NEW
  renderModalTypeSelector(p);

  // Details list
  const list = document.getElementById('modal-details-list');
  list.innerHTML = p.details.map(d => `<li>${d}</li>`).join('');

  // Image
  const imgEl = document.getElementById('modal-img');
  imgEl.src = p.img;
  imgEl.onerror = () => { if (p.fallback) imgEl.src = p.fallback; };

  updateModalPrice();
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// NEW: build the type-selector buttons inside the modal
function renderModalTypeSelector(p) {
  const wrap = document.getElementById('modal-type-selector');
  const sizeWrap = document.getElementById('modal-size-selector');
  if (!wrap || !sizeWrap) return;

  wrap.innerHTML = p.types.map((t, i) => `
    <button class="type-btn${i === selectedTypeIdx ? ' active' : ''}"
            onclick="selectType(${i})" type="button">
      ${t.label}
    </button>`).join('');

  renderModalSizeSelector(p);
}

function renderModalSizeSelector(p) {
  const sizeWrap = document.getElementById('modal-size-selector');
  if (!sizeWrap) return;
  const type = p.types[selectedTypeIdx];
  selectedSize = type.sizes[0];
  sizeWrap.innerHTML = `
    <div class="size-label-row">
      <span class="modal-details-label" style="margin-bottom:0;border:none;padding:0">Size</span>
    </div>
    <div class="size-btns">
      ${type.sizes.map(s => `
        <button class="size-btn${s === selectedSize ? ' active' : ''}"
                onclick="selectSize('${s}')" type="button">${s}</button>`).join('')}
    </div>`;
}

function selectType(idx) {
  selectedTypeIdx = idx;
  const p = currentProduct;
  // Refresh type buttons
  document.querySelectorAll('.type-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === idx);
  });
  renderModalSizeSelector(p);
  updateModalPrice();
}

function selectSize(size) {
  selectedSize = size;
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === size);
  });
}

function updateModalPrice() {
  if (!currentProduct) return;
  const type = currentProduct.types[selectedTypeIdx];
  const priceEl = document.getElementById('modal-price');
  if (priceEl) priceEl.textContent = '₱' + type.price.toLocaleString();
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function changeModalQty(delta) {
  modalQty = Math.max(1, modalQty + delta);
  const el = document.getElementById('modal-qty-display');
  if (el) el.textContent = modalQty;
}

// FIX/NEW: modalAddToCart now includes selected type and size in cart entry
function modalAddToCart() {
  if (!currentProduct) return;
  const type = currentProduct.types[selectedTypeIdx];
  const productToAdd = {
    ...currentProduct,
    price:        type.price,
    selectedType: type.label,
    selectedSize: selectedSize,
    material:     `${currentProduct.material} • ${type.label} • Size ${selectedSize}`
  };
  for (let i = 0; i < modalQty; i++) addToCart(productToAdd);
  closeModal();
}

// ─── CART RENDER
function renderCart() {
  const container    = document.getElementById('cart-items-container');
  const emptyState   = document.getElementById('cart-empty-state');
  const summaryCol   = document.getElementById('order-summary-col');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '';
    if (emptyState)  emptyState.classList.remove('hidden');
    if (summaryCol)  summaryCol.classList.add('hidden');
    return;
  }

  if (emptyState)  emptyState.classList.add('hidden');
  if (summaryCol)  summaryCol.classList.remove('hidden');

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.img}" alt="${item.title}"
             onerror="this.src='${item.fallback || ''}'">
      </div>
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.title}</h3>
        <p class="cart-item-material">${item.material}</p>
        <p class="cart-item-price">₱${(item.price * item.qty).toLocaleString()}</p>
        <div class="cart-item-actions">
          <div class="cart-qty-wrap">
            <button class="cart-qty-btn"
                    onclick="updateQty('${item.cartKey}', -1)"
                    aria-label="Decrease">−</button>
            <span class="cart-qty-num">${item.qty}</span>
            <button class="cart-qty-btn"
                    onclick="updateQty('${item.cartKey}', 1)"
                    aria-label="Increase">+</button>
          </div>
          <button class="cart-remove-btn"
                  onclick="removeFromCart('${item.cartKey}')">Remove</button>
        </div>
      </div>
    </div>`).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 2500 ? 0 : 150;
  const total    = subtotal + shipping;

  const setEl = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  setEl('summary-subtotal', '₱' + subtotal.toLocaleString());
  setEl('summary-shipping', shipping === 0 ? 'FREE' : '₱' + shipping.toLocaleString());
  setEl('summary-total',    '₱' + total.toLocaleString());
}

// ─── PROMO CODES
let activeDiscount = 0;

function applyPromo() {
  const input = document.getElementById('promo-input');
  if (!input) return;
  const code  = input.value.trim().toUpperCase();
  const valid = {
    'MINIME10': { msg: '10% off applied!',              pct: 0.10 },
    'FAMILY20': { msg: '20% off for family sets!',      pct: 0.20 },
    'HOLIDAY':  { msg: 'Holiday discount applied (15%)', pct: 0.15 }
  };
  if (valid[code]) {
    activeDiscount = valid[code].pct;
    showToast('Promo applied!', valid[code].msg);
  } else {
    activeDiscount = 0;
    showToast('Invalid code', 'Try MINIME10 or FAMILY20.', 'error');
  }
}

// ─── CONTACT FORM
// FIX: Added inline field-level error display in addition to toast
function handleContact(e) {
  e.preventDefault();

  const nameEl    = document.getElementById('contact-name');
  const emailEl   = document.getElementById('contact-email');
  const messageEl = document.getElementById('contact-message');

  const name    = nameEl?.value.trim()    || '';
  const email   = emailEl?.value.trim()   || '';
  const subject = document.getElementById('contact-subject')?.value.trim() || 'Enquiry from MiniMe website';
  const message = messageEl?.value.trim() || '';

  // Clear previous errors
  clearAllErrors(['contact-name', 'contact-email', 'contact-message']);

  let hasError = false;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) {
    setFieldError('contact-name', 'Please enter your name.');
    hasError = true;
  }
  if (!email) {
    setFieldError('contact-email', 'Please enter your email address.');
    hasError = true;
  } else if (!emailPattern.test(email)) {
    setFieldError('contact-email', 'Please enter a valid email (e.g. you@email.com).');
    hasError = true;
  }
  if (!message) {
    setFieldError('contact-message', 'Please write a message before sending.');
    hasError = true;
  }

  if (hasError) {
    showToast('Please fix the errors', 'Check the highlighted fields.', 'error');
    return;
  }

  const body            = encodeURIComponent(`Hi MiniMe!\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n— Sent via MiniMe Boutique website`);
  const subjectEncoded  = encodeURIComponent(subject);
  window.location.href  = `mailto:deargabclothing@gmail.com?subject=${subjectEncoded}&body=${body}`;

  showToast('Opening your email app!', 'Your message is ready to send.');
  e.currentTarget.reset();
}

// ─── NEWSLETTER
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.currentTarget.querySelector('input[type="email"]');
  const val   = input ? input.value.trim() : '';
  if (!val) {
    showToast('Enter your email', 'Please type your email address first.', 'warning');
    return;
  }
  showToast('Subscribed!', 'Thank you for joining the MiniMe family.');
  if (input) input.value = '';
}

// ─── CHECKOUT MODAL
function openCheckoutModal() {
  if (cart.length === 0) return;
  const overlay = document.getElementById('checkout-overlay');
  if (!overlay) return;
  checkoutStep(1);
  // Show the step indicators again if they were hidden after a previous order
  const stepHeader = document.getElementById('checkout-steps');
  if (stepHeader) stepHeader.style.display = '';
  // Hide success screen
  const successPanel = document.getElementById('checkout-step-success');
  if (successPanel) successPanel.classList.add('hidden');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const overlay = document.getElementById('checkout-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function checkoutStep(step) {
  if (step === 2 && !isStepValid(1)) return;
  if (step === 3 && !isStepValid(2)) return;

  document.querySelectorAll('.checkout-step-panel').forEach(p => p.classList.add('hidden'));
  const panel = document.getElementById('checkout-step-' + step);
  if (panel) panel.classList.remove('hidden');

  document.querySelectorAll('.checkout-step').forEach(el => {
    const s = parseInt(el.dataset.step);
    el.classList.remove('active', 'done');
    if (s === step)     el.classList.add('active');
    else if (s < step)  el.classList.add('done');
  });

  if (step === 3) buildOrderReview();

  const box = document.querySelector('.checkout-box');
  if (box) box.scrollTo({ top: 0, behavior: 'smooth' });
}

function buildOrderReview() {
  const subtotal   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount   = Math.round(subtotal * activeDiscount);
  const discounted = subtotal - discount;
  const shipping   = discounted >= 2500 ? 0 : 150;
  const total      = discounted + shipping;

  const fname  = document.getElementById('co-fname')?.value    || '';
  const lname  = document.getElementById('co-lname')?.value    || '';
  const addr   = document.getElementById('co-address')?.value  || '';
  const city   = document.getElementById('co-city')?.value     || '';
  const region = document.getElementById('co-region')?.value   || '';
  const zip    = document.getElementById('co-zip')?.value      || '';

  const summaryEl = document.getElementById('checkout-order-summary');
  if (summaryEl) {
    let rows = cart.map(i =>
      `<div class="checkout-order-row"><span>${i.title} × ${i.qty}</span><span>₱${(i.price * i.qty).toLocaleString()}</span></div>`
    ).join('');
    if (discount > 0)
      rows += `<div class="checkout-order-row" style="color:var(--pink-accent)"><span>Promo Discount</span><span>−₱${discount.toLocaleString()}</span></div>`;
    rows += `<div class="checkout-order-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : '₱' + shipping}</span></div>`;
    rows += `<div class="checkout-order-row"><span>Total</span><span>₱${total.toLocaleString()}</span></div>`;
    summaryEl.innerHTML = `<h4>Order Items</h4>${rows}`;
  }

  const addrEl = document.getElementById('checkout-address-summary');
  if (addrEl)
    addrEl.innerHTML = `<strong>Shipping To</strong><br/>${fname} ${lname}<br/>${addr}, ${city}, ${region} ${zip}`;
}

// ─── STEP VALIDATION (with inline errors)
// FIX: Now shows inline field errors AND toast for better UX
function isStepValid(step) {
  const lettersOnly  = /^[A-Za-z\s]+$/;
  const phonePattern = /^(09|\+639)\d{9}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (step === 1) {
    const fname = document.getElementById('co-fname')?.value.trim();
    const lname = document.getElementById('co-lname')?.value.trim();
    const phone = document.getElementById('co-phone')?.value.trim();
    const email = document.getElementById('co-email')?.value.trim();

    clearAllErrors(['co-fname', 'co-lname', 'co-phone', 'co-email']);
    let valid = true;

    if (!fname) { setFieldError('co-fname', 'First name is required.');             valid = false; }
    else if (!lettersOnly.test(fname)) { setFieldError('co-fname', 'Numbers not allowed in name.'); valid = false; }

    if (!lname) { setFieldError('co-lname', 'Last name is required.');              valid = false; }
    else if (!lettersOnly.test(lname)) { setFieldError('co-lname', 'Numbers not allowed in name.'); valid = false; }

    if (!phone) { setFieldError('co-phone', 'Phone number is required.');           valid = false; }
    else if (!phonePattern.test(phone)) { setFieldError('co-phone', 'Use a valid PH number (e.g. 09123456789).'); valid = false; }

    if (!email) { setFieldError('co-email', 'Email address is required.');          valid = false; }
    else if (!emailPattern.test(email)) { setFieldError('co-email', 'Enter a valid email with @.'); valid = false; }

    if (!valid) showToast('Check your details', 'Please fix the highlighted fields.', 'error');
    return valid;
  }

  if (step === 2) {
    const region = document.getElementById('co-region')?.value;
    const prov   = document.getElementById('co-province')?.value;
    const city   = document.getElementById('co-city')?.value;
    const addr   = document.getElementById('co-address')?.value.trim();
    const zip    = document.getElementById('co-zip')?.value.trim();

    clearAllErrors(['co-address']);
    let valid = true;

    if (!region) { showToast('Select region', 'Please choose your region.', 'error');       return false; }
    if (!prov)   { showToast('Select province', 'Please choose your province.', 'error');   return false; }
    if (!city)   { showToast('Select city', 'Please choose your city.', 'error');           return false; }
    if (!addr)   { setFieldError('co-address', 'Street address is required.');  valid = false; }
    if (!zip)    { showToast('ZIP missing', 'Please select a city to auto-fill ZIP.', 'error'); return false; }

    if (!valid) showToast('Check your address', 'Please fill in the street address.', 'error');
    return valid;
  }

  return true;
}

function confirmOrder() {
  if (!isStepValid(1) || !isStepValid(2)) return;

  const orderNum   = 'MM-' + Date.now().toString().slice(-6);
  const subtotal   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total      = subtotal + (subtotal >= 2500 ? 0 : 150);
  const payment    = document.querySelector('input[name="payment"]:checked')?.value || 'cod';
  const itemsSummary = cart.map(i => `${i.title} (x${i.qty})`).join(', ');

  // FIX: These elements must exist in HTML (added in index.html fix)
  const setResEl = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  setResEl('res-order-num', `#${orderNum}`);
  setResEl('res-items',     itemsSummary);
  setResEl('res-total',     `₱${total.toLocaleString()}`);
  setResEl('res-payment',   payment.toUpperCase());

  const stepHeader = document.getElementById('checkout-steps');
  if (stepHeader) stepHeader.style.display = 'none';

  document.getElementById('checkout-step-3').classList.add('hidden');
  const successPanel = document.getElementById('checkout-step-success');
  if (successPanel) successPanel.classList.remove('hidden');

  cart = [];
  activeDiscount = 0;
  saveCart();
  renderCart();
  updateCartBadges();

  showToast('Order placed! 🎉', `Order ${orderNum} confirmed.`);

  const box = document.querySelector('.checkout-box');
  if (box) box.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── PAGE NAVIGATION (SPA)
function showPage(pageName, scrollTo) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const target = document.getElementById('page-' + pageName);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageName && !a.dataset.scrollTo);
  });

  if (scrollTo) {
    setTimeout(() => {
      const section = document.getElementById(scrollTo);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (pageName === 'cart') renderCart();
}

// ─── INIT
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadges();

  // Product card click → open modal
  document.querySelectorAll('[data-product]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.product));
  });

  // Navigation
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      showPage(el.dataset.page, el.dataset.scrollTo || null);
    });
  });

  // Close modals on overlay click
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay)
    modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

  const checkoutOverlay = document.getElementById('checkout-overlay');
  if (checkoutOverlay)
    checkoutOverlay.addEventListener('click', e => { if (e.target === checkoutOverlay) closeCheckoutModal(); });

  // Escape key closes modals
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeCheckoutModal(); }
  });

  // Clear field errors on input (live feedback)
  ['co-fname', 'co-lname', 'co-phone', 'co-email',
   'co-address', 'contact-name', 'contact-email', 'contact-message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearFieldError(id));
  });

  showPage('home');
});

// ─── MOBILE MENU
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));
  }
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
  });
});
