/* MiniMe Boutique — app.js (fixed) */

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

function addToCart(product) {
  const key = product.cartKey || product.id;
  const existing = cart.find(i => i.cartKey === key);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, cartKey: key, qty: 1 });
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
const PRODUCTS = {
  sandra: {
    id: 'sandra',
    title: 'Sandra Family Set',
    price: 825,
    color: 'Peach Pink',
    material: 'Floral Design • Pink',
    badge: 'SANDRA SET',
    badgeClass: 'badge-gold',
    img: 'images/sandra.png',
    description: 'The Sandra set features a delicate floral print in soft peach pink — perfect for family portraits and special occasions. Light and breathable, it drapes beautifully on every body type. Also available in Purple, Denim Blue, and Yellow.',
    breakdown: [['Mom & Daughter', '₱825'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: [
      'Also available in: Peach Pink, Purple, Denim Blue, Yellow',
      'Mom Size: Small – XL',
      'Daughter & Son Size: Small – Large',
      'Dad Size: Large – XXL'
    ],
    variants: {
      'Mom & Daughter Set': { sizes: ['S', 'M', 'L', 'XL'], price: 825 },
      'Dad Shirt':          { sizes: ['L', 'XL', 'XXL'],    price: 345 },
      "Son's Set":          { sizes: ['S', 'M', 'L'],       price: 245 }
    }
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
    description: 'Clean, crisp white cotton linen for the whole family. The Krizzel twin set is our most versatile collection — effortlessly elegant for beach trips, family events, or Sunday outings. Also available in Indigo, Purple, Red, and Forest Green.',
    breakdown: [['Twin Set (Mom)', '₱815'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: [
      'Also available in: Indigo, Purple, Red, Forest Green',
      'Mom Size: Medium – XXL',
      'Daughter & Son Size: Small – Large',
      'Dad Size: Medium – XXL'
    ],
    variants: {
      'Twin Set (Mom & Daughter)': { sizes: ['M', 'L', 'XL', 'XXL'], price: 815 },
      'Dad Shirt':                 { sizes: ['M', 'L', 'XL', 'XXL'], price: 345 },
      "Son's Set":                 { sizes: ['S', 'M', 'L'],         price: 245 }
    }
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
    description: 'Sophisticated black with hand-inspired flower embroidery. The Mia set makes a bold statement — timeless, elegant, and completely unforgettable in photos. Available in Nude, White, Black, and Red.',
    breakdown: [['Mom & Daughter', '₱795'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: [
      'Also available in: Nude, White, Black, Red',
      'Mom Size: Small – Large',
      'Daughter & Son Size: Small – Large',
      'Dad Size: Medium – XXL'
    ],
    variants: {
      'Mom & Daughter Set': { sizes: ['S', 'M', 'L'],         price: 795 },
      'Dad Shirt':          { sizes: ['M', 'L', 'XL', 'XXL'], price: 345 },
      "Son's Set":          { sizes: ['S', 'M', 'L'],         price: 245 }
    }
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
    description: 'Soft blush pink linen that catches the light beautifully. The Eula set is airy, romantic, and perfect for golden hour family shoots or intimate celebrations. Also available in Yellow, Red, White, Blue, and Purple.',
    breakdown: [['Mom & Daughter', '₱815'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: [
      'Also available in: Yellow, Red, White, Pink, Blue, Purple',
      'Mom Size: Small – Large',
      'Daughter & Son Size: Small – Large',
      'Dad Size: Medium – XXL'
    ],
    variants: {
      'Mom & Daughter Set': { sizes: ['S', 'M', 'L'],         price: 815 },
      'Dad Shirt':          { sizes: ['M', 'L', 'XL', 'XXL'], price: 345 },
      "Son's Set":          { sizes: ['S', 'M', 'L'],         price: 245 }
    }
  },
  olivia: {
    id: 'olivia',
    title: 'Olivia Family Set',
    price: 1160,
    color: 'Peach Floral',
    material: 'Cotton Floral • Peach',
    badge: 'OLIVIA',
    badgeClass: 'badge-pink',
    img: 'images/olivia.png',
    description: 'Fresh peach cotton floral with a cottagecore spirit. Olivia is made for families who love nature, warmth, and outfits that feel as good as they look. Available in Red, Blue, Purple, Pink, Green, and Orange.',
    breakdown: [['Mom & Daughter', '₱815'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: [
      'Also available in: Red, Blue, Peach, Purple, Pink, Green, Orange',
      'Mom Size: Medium – XXL',
      'Daughter & Son Size: Small – Large',
      'Dad Size: Medium – XXL'
    ],
    variants: {
      'Mom & Daughter Set': { sizes: ['M', 'L', 'XL', 'XXL'], price: 815 },
      'Dad Shirt':          { sizes: ['M', 'L', 'XL', 'XXL'], price: 345 },
      "Son's Set":          { sizes: ['S', 'M', 'L'],         price: 245 }
    }
  },
  ellery: {
    id: 'ellery',
    title: 'Ellery Family Set',
    price: 1180,
    color: 'Pastel Yellow',
    material: 'Linen • Yellow',
    badge: 'ELLERY',
    badgeClass: 'badge-brown',
    img: 'images/ellery.png',
    description: 'Pastel yellow linen that radiates sunshine. Ellery is our widest color selection — from Fuschia Pink to Royal Blue — making it easy to find the perfect shade for your family aesthetic.',
    breakdown: [['Mom & Daughter', '₱835'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: [
      'Also available in: Red, Peach, Green, Yellow, White, Pink, Pastel Blue, Royal Blue, Purple, Cream, Black, Fuschia Pink',
      'Mom Size: Medium – XXL',
      'Daughter & Son Size: Small – Large',
      'Dad Size: Medium – XXL'
    ],
    variants: {
      'Mom & Daughter Set': { sizes: ['M', 'L', 'XL', 'XXL'], price: 835 },
      'Dad Shirt':          { sizes: ['M', 'L', 'XL', 'XXL'], price: 345 },
      "Son's Set":          { sizes: ['S', 'M', 'L'],         price: 245 }
    }
  },
  paula: {
    id: 'paula',
    title: 'Paula Family Set',
    price: 1130,
    color: 'Dusty Pink',
    material: 'Cotton • Dusty Pink',
    badge: 'PAULA',
    badgeClass: 'badge-gold',
    img: 'images/paula.png',
    description: 'Dusty pink cotton with a muted, editorial tone. Paula is the go-to for families who prefer understated beauty — subtle, refined, and endlessly photogenic. Also available in Pastel Yellow, Pastel Purple, Emerald Green, and Red Maroon.',
    breakdown: [['Mom & Daughter', '₱785'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: [
      'Also available in: Peach, Pastel Yellow, Pastel Purple, Emerald Green, Orange, Purple, Red Maroon',
      'Mom Size: Medium – XXXL',
      'Daughter & Son Size: Small – Large',
      'Dad Size: Medium – XXL'
    ],
    variants: {
      'Mom & Daughter Set': { sizes: ['M', 'L', 'XL', 'XXL', 'XXXL'], price: 785 },
      'Dad Shirt':          { sizes: ['M', 'L', 'XL', 'XXL'],         price: 345 },
      "Son's Set":          { sizes: ['S', 'M', 'L'],                 price: 245 }
    }
  },
  pinky: {
    id: 'pinky',
    title: 'Pinky Coords Family Set',
    price: 1240,
    color: 'Purple',
    material: 'Linen • Purple',
    badge: 'PINKY COORDS',
    badgeClass: 'badge-pink',
    img: 'images/pinky.png',
    description: 'Bold purple linen coords with a modern, fashion-forward silhouette. Pinky Coords is for the family that dresses with intention — statement-making without trying too hard. Also available in Green, Fuschia Pink, Yellow, and Black.',
    breakdown: [['Mom & Daughter', '₱725'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: [
      'Also available in: Green, Fuschia Pink, Yellow, Purple, Black',
      'Mom Size: Small – Large',
      'Daughter & Son Size: Small – Large',
      'Dad Size: Medium – XXL'
    ],
    variants: {
      'Mom & Daughter Set': { sizes: ['S', 'M', 'L'],         price: 725 },
      'Dad Shirt':          { sizes: ['M', 'L', 'XL', 'XXL'], price: 345 },
      "Son's Set":          { sizes: ['S', 'M', 'L'],         price: 245 }
    }
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
    description: 'Earthy green cotton that feels as natural as it looks. Ailah is grounded, warm, and perfect for families who love the outdoors, parks, and relaxed weekend togetherness. Also available in Rust.',
    breakdown: [['Mom & Daughter', '₱785'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: [
      'Also available in: Green, Rust',
      'Mom Size: Medium – XXL',
      'Daughter & Son Size: Small – Large',
      'Dad Size: Medium – XXL'
    ],
    variants: {
      'Mom & Daughter Set': { sizes: ['M', 'L', 'XL', 'XXL'], price: 785 },
      'Dad Shirt':          { sizes: ['M', 'L', 'XL', 'XXL'], price: 345 },
      "Son's Set":          { sizes: ['S', 'M', 'L'],         price: 245 }
    }
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
    description: 'Rich holiday red cotton that turns heads at every gathering. Althea is your go-to for Christmas celebrations, family reunions, and every cherished milestone in between. Also available in Brown, Blue, and Pink.',
    breakdown: [['Mom & Daughter', '₱745'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: [
      'Also available in: Red, Brown, Blue, Pink',
      'Mom Size: Medium – XXL',
      'Daughter & Son Size: Small – Large',
      'Dad Size: Medium – XXL'
    ],
    variants: {
      'Mom & Daughter Set': { sizes: ['M', 'L', 'XL', 'XXL'], price: 745 },
      'Dad Shirt':          { sizes: ['M', 'L', 'XL', 'XXL'], price: 345 },
      "Son's Set":          { sizes: ['S', 'M', 'L'],         price: 245 }
    }
  }
};

// ─── PRODUCT MODAL
let currentProduct = null;
let modalQty = 1;
let selectedVariant = null;
let selectedSize = null;

function openModal(productId) {
  const p = PRODUCTS[productId];
  if (!p) return;
  currentProduct = p;
  modalQty = 1;
  selectedVariant = null;
  selectedSize = null;

  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  document.getElementById('modal-colorway').textContent    = p.color.toUpperCase();
  document.getElementById('modal-title').textContent       = p.title;
  document.getElementById('modal-price').textContent       = '₱' + p.price.toLocaleString();
  document.getElementById('modal-qty-display').textContent = '1';

  // Description
  const descEl = document.getElementById('modal-description');
  if (descEl) descEl.textContent = p.description || '';

  // Image
  const imgEl = document.getElementById('modal-img');
  imgEl.src = p.img;
  imgEl.alt = p.title;

  // Details list
  const list = document.getElementById('modal-details-list');
  list.innerHTML = p.details.map(d => `<li>${d}</li>`).join('');

  // Build variant pills
  const variantWrap = document.getElementById('modal-variant-wrap');
  if (variantWrap && p.variants) {
    variantWrap.innerHTML = Object.keys(p.variants).map(v =>
      `<button class="variant-pill" data-variant="${v.replace(/"/g, '&quot;')}">${v}</button>`
    ).join('');

    // Attach click listeners
    variantWrap.querySelectorAll('.variant-pill').forEach(btn => {
      btn.addEventListener('click', () => selectVariant(btn.dataset.variant));
    });
  }

  // Hide size group until variant selected
  const sizeGroup = document.getElementById('modal-size-group');
  if (sizeGroup) sizeGroup.style.display = 'none';

  // Clear old errors
  hideModalError('modal-variant-error');
  hideModalError('modal-size-error');

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function selectVariant(variantName) {
  if (!currentProduct || !currentProduct.variants) return;
  selectedVariant = variantName;
  selectedSize = null;

  hideModalError('modal-variant-error');

  // Update variant pill styles
  document.querySelectorAll('#modal-variant-wrap .variant-pill').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.variant === variantName);
  });

  // Update price
  const variantData = currentProduct.variants[variantName];
  const priceEl = document.getElementById('modal-price');
  if (priceEl && variantData) priceEl.textContent = '₱' + variantData.price.toLocaleString();

  // Show and populate sizes
  const sizeGroup = document.getElementById('modal-size-group');
  const sizeWrap  = document.getElementById('modal-size-wrap');
  if (sizeGroup && sizeWrap && variantData) {
    sizeWrap.innerHTML = variantData.sizes.map(s =>
      `<button class="variant-pill" data-size="${s}">${s}</button>`
    ).join('');

    sizeWrap.querySelectorAll('.variant-pill').forEach(btn => {
      btn.addEventListener('click', () => selectSize(btn.dataset.size));
    });

    sizeGroup.style.display = 'block';
    hideModalError('modal-size-error');
  }
}

function selectSize(size) {
  selectedSize = size;
  hideModalError('modal-size-error');
  document.querySelectorAll('#modal-size-wrap .variant-pill').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.size === size);
  });
}

function hideModalError(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('visible');
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

function modalAddToCart() {
  if (!currentProduct) return;

  // Must select a variant
  if (currentProduct.variants && !selectedVariant) {
    const errEl = document.getElementById('modal-variant-error');
    if (errEl) errEl.classList.add('visible');
    showToast('Select a variant', 'Choose Mom & Daughter, Dad Shirt, or Son\'s Set first.');
    return;
  }

  // Must select a size
  if (selectedVariant && !selectedSize) {
    const errEl = document.getElementById('modal-size-error');
    if (errEl) errEl.classList.add('visible');
    showToast('Select a size', 'Please choose a size before adding to cart.');
    return;
  }

  const variantData = currentProduct.variants ? currentProduct.variants[selectedVariant] : null;
  const cartKey = `${currentProduct.id}__${selectedVariant || 'default'}__${selectedSize || 'one-size'}`;

  const cartProduct = {
    ...currentProduct,
    cartKey,
    price:    variantData ? variantData.price : currentProduct.price,
    title:    selectedVariant
                ? `${currentProduct.title} — ${selectedVariant} (Size ${selectedSize})`
                : currentProduct.title,
    material: selectedSize
                ? `${currentProduct.material} • Size ${selectedSize}`
                : currentProduct.material
  };

  for (let i = 0; i < modalQty; i++) addToCart(cartProduct);
  closeModal();
}

// ─── CART RENDER
function renderCart() {
  const container      = document.getElementById('cart-items-container');
  const emptyState     = document.getElementById('cart-empty-state');
  const summarySection = document.getElementById('order-summary-col');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '';
    if (emptyState)     emptyState.classList.remove('hidden');
    if (summarySection) summarySection.classList.add('hidden');
    return;
  }

  if (emptyState)     emptyState.classList.add('hidden');
  if (summarySection) summarySection.classList.remove('hidden');

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.img}" alt="${item.title}">
      </div>
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.title}</h3>
        <p class="cart-item-material">${item.material}</p>
        <p class="cart-item-price">₱${(item.price * item.qty).toLocaleString()}</p>
        <div class="cart-item-actions">
          <div class="cart-qty-wrap">
            <button class="cart-qty-btn" onclick="updateQty('${item.cartKey}', -1)" aria-label="Decrease">−</button>
            <span class="cart-qty-num">${item.qty}</span>
            <button class="cart-qty-btn" onclick="updateQty('${item.cartKey}', 1)" aria-label="Increase">+</button>
          </div>
          <button class="cart-remove-btn" onclick="removeFromCart('${item.cartKey}')">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

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
  const code = input.value.trim().toUpperCase();
  const valid = {
    'MINIME10': { msg: '10% discount applied!',        pct: 0.10 },
    'FAMILY20': { msg: '20% off for family sets!',     pct: 0.20 },
    'HOLIDAY':  { msg: 'Holiday discount applied! (15%)', pct: 0.15 }
  };
  if (valid[code]) {
    activeDiscount = valid[code].pct;
    showToast('Promo applied!', valid[code].msg);
  } else {
    activeDiscount = 0;
    showToast('Invalid code', 'Try MINIME10 or FAMILY20.');
  }
}

// ─── TOAST
// Toast must fire AFTER DOM is ready; we keep a queue just in case
let toastTimer = null;

function showToast(title, subtitle) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const titleEl = document.getElementById('toast-title');
  const subEl   = document.getElementById('toast-sub');
  if (titleEl) titleEl.textContent = title;
  if (subEl)   subEl.textContent   = subtitle || '';

  // Clear any existing timer so overlapping calls restart the animation
  if (toastTimer) clearTimeout(toastTimer);
  toast.classList.remove('show');

  // Force reflow so removing/re-adding .show always triggers the CSS transition
  void toast.offsetWidth;

  toast.classList.add('show');
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    toastTimer = null;
  }, 3000);
}

// ─── CONTACT FORM VALIDATION
function handleContact(e) {
  e.preventDefault();
  const nameEl    = document.getElementById('contact-name');
  const emailEl   = document.getElementById('contact-email');
  const messageEl = document.getElementById('contact-message');

  clearFieldError(nameEl,    'err-contact-name');
  clearFieldError(emailEl,   'err-contact-email');
  clearFieldError(messageEl, 'err-contact-message');

  let valid = true;

  // Name: letters and spaces only, minimum 2 characters
  const nameVal = nameEl.value.trim();
  if (!nameVal || !/^[A-Za-zÀ-ÿ\s]{2,}$/.test(nameVal)) {
    showFieldError(nameEl, 'err-contact-name');
    valid = false;
  }

  // Email: must contain @ and a dot after it
  const emailVal = emailEl.value.trim();
  if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    showFieldError(emailEl, 'err-contact-email');
    valid = false;
  }

  // Message: required
  if (!messageEl.value.trim()) {
    showFieldError(messageEl, 'err-contact-message');
    valid = false;
  }

  if (!valid) {
    showToast('Please check the form', 'Some fields need your attention.');
    return;
  }

  const subject = document.getElementById('contact-subject')?.value.trim() || 'Enquiry from MiniMe website';
  const body    = encodeURIComponent(
    `Hi MiniMe!\n\nName: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageEl.value.trim()}\n\n— Sent via MiniMe Boutique website`
  );
  window.location.href = `mailto:deargabclothing@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  showToast('Opening your email app!', 'Your message is ready to send.');
  e.currentTarget.reset();
}

// ─── NEWSLETTER
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.currentTarget.querySelector('input[type="email"]');
  const val   = input ? input.value.trim() : '';
  if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    showToast('Invalid email', 'Please enter a valid email address.');
    return;
  }
  showToast('Subscribed!', 'Thank you for joining the MiniMe family.');
  if (input) input.value = '';
}

// ─── FIELD ERROR HELPERS
function showFieldError(inputEl, errorId) {
  if (inputEl) inputEl.classList.add('error');
  const errEl = document.getElementById(errorId);
  if (errEl) errEl.classList.add('visible');
}

function clearFieldError(inputEl, errorId) {
  if (inputEl) inputEl.classList.remove('error');
  const errEl = document.getElementById(errorId);
  if (errEl) errEl.classList.remove('visible');
}

function attachInputClearers() {
  document.querySelectorAll('.form-input, .form-textarea').forEach(el => {
    ['input', 'change'].forEach(evt => {
      el.addEventListener(evt, () => {
        el.classList.remove('error');
        const errEl = el.parentElement.querySelector('.field-error');
        if (errEl) errEl.classList.remove('visible');
      });
    });
  });
}

// ─── CHECKOUT MODAL
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast('Cart is empty', 'Add a family set before checking out.');
    return;
  }
  const overlay = document.getElementById('checkout-overlay');
  if (!overlay) return;
  checkoutStep(1, true);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const overlay = document.getElementById('checkout-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function checkoutStep(step, skipValidation) {
  // ── Validate Step 1 → 2
  if (step === 2 && !skipValidation) {
    const fname = document.getElementById('co-fname');
    const lname = document.getElementById('co-lname');
    const email = document.getElementById('co-email');
    const phone = document.getElementById('co-phone');

    [['co-fname','err-fname'], ['co-lname','err-lname'],
     ['co-email','err-email'], ['co-phone','err-phone']].forEach(([id, eid]) => {
      clearFieldError(document.getElementById(id), eid);
    });

    let valid = true;

    // Names: letters only
    if (!fname.value.trim() || !/^[A-Za-zÀ-ÿ\s]{1,}$/.test(fname.value.trim())) {
      showFieldError(fname, 'err-fname');
      valid = false;
    }
    if (!lname.value.trim() || !/^[A-Za-zÀ-ÿ\s]{1,}$/.test(lname.value.trim())) {
      showFieldError(lname, 'err-lname');
      valid = false;
    }

    // Email
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showFieldError(email, 'err-email');
      valid = false;
    }

    // Phone: Philippine mobile (09xxxxxxxxx or +639xxxxxxxxx) or at least 10 digits
    const phoneVal = phone.value.trim().replace(/[\s\-()]/g, '');
    if (!phoneVal || !/^(\+?63|0)9\d{9}$/.test(phoneVal)) {
      showFieldError(phone, 'err-phone');
      // Update error message text to be more helpful
      const phoneErrEl = document.getElementById('err-phone');
      if (phoneErrEl) phoneErrEl.textContent = 'Enter a valid PH number (e.g. 09XX XXX XXXX).';
      valid = false;
    }

    if (!valid) {
      showToast('Please check your details', 'Some required fields are incomplete or invalid.');
      return;
    }
  }

  // ── Validate Step 2 → 3
  if (step === 3 && !skipValidation) {
    const region   = document.getElementById('co-region');
    const province = document.getElementById('co-province');
    const city     = document.getElementById('co-city');
    const address  = document.getElementById('co-address');

    [['co-region','err-region'], ['co-province','err-province'],
     ['co-city','err-city'], ['co-address','err-address']].forEach(([id, eid]) => {
      clearFieldError(document.getElementById(id), eid);
    });

    let valid = true;
    if (!region.value)          { showFieldError(region,   'err-region');   valid = false; }
    if (!province.value)        { showFieldError(province, 'err-province'); valid = false; }
    if (!city.value)            { showFieldError(city,     'err-city');     valid = false; }
    if (!address.value.trim())  { showFieldError(address,  'err-address');  valid = false; }

    if (!valid) {
      showToast('Please complete your address', 'All address fields are required.');
      return;
    }
  }

  // ── Show the right panel
  document.querySelectorAll('.checkout-step-panel').forEach(p => p.classList.add('hidden'));
  const panel = document.getElementById('checkout-step-' + step);
  if (panel) panel.classList.remove('hidden');

  // ── Update step indicators
  document.querySelectorAll('.checkout-step[data-step]').forEach(el => {
    const s = parseInt(el.dataset.step);
    el.classList.remove('active', 'done');
    if (s === step)      el.classList.add('active');
    else if (s < step)   el.classList.add('done');
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

  const fname = document.getElementById('co-fname')?.value || '';
  const lname = document.getElementById('co-lname')?.value || '';
  const addr  = document.getElementById('co-address')?.value || '';
  const city  = document.getElementById('co-city')?.value || '';
  const prov  = document.getElementById('co-province')?.value || '';
  const zip   = document.getElementById('co-zip')?.value || '';

  const summaryEl = document.getElementById('checkout-order-summary');
  if (summaryEl) {
    let rows = cart.map(i =>
      `<div class="checkout-order-row"><span>${i.title} × ${i.qty}</span><span>₱${(i.price * i.qty).toLocaleString()}</span></div>`
    ).join('');
    if (discount > 0) {
      rows += `<div class="checkout-order-row" style="color:var(--pink-accent)"><span>Promo Discount</span><span>−₱${discount.toLocaleString()}</span></div>`;
    }
    rows += `<div class="checkout-order-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : '₱' + shipping}</span></div>`;
    rows += `<div class="checkout-order-row"><span>Total</span><span>₱${total.toLocaleString()}</span></div>`;
    summaryEl.innerHTML = `<h4>Order Items</h4>${rows}`;
  }

  const addrEl = document.getElementById('checkout-address-summary');
  if (addrEl) {
    addrEl.innerHTML = `
      <strong>Shipping To</strong>
      ${fname} ${lname}<br/>
      ${addr}, ${city}, ${prov} ${zip}
    `;
  }
}

function confirmOrder() {
  const fname   = document.getElementById('co-fname')?.value.trim();
  const lname   = document.getElementById('co-lname')?.value.trim();
  const email   = document.getElementById('co-email')?.value.trim();
  const phone   = document.getElementById('co-phone')?.value.trim();
  const address = document.getElementById('co-address')?.value.trim();
  const city    = document.getElementById('co-city')?.value.trim();
  const prov    = document.getElementById('co-province')?.value.trim();
  const zip     = document.getElementById('co-zip')?.value.trim();
  const notes   = document.getElementById('co-notes')?.value.trim() || 'None';
  const payment = document.querySelector('input[name="payment"]:checked')?.value || 'cod';

  if (!fname || !lname || !email || !phone || !address || !city || !prov || !zip) {
    showToast('Missing info', 'Please complete all required fields.');
    return;
  }

  const orderNum   = 'MM-' + Date.now().toString().slice(-6);
  const subtotal   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount   = Math.round(subtotal * activeDiscount);
  const discounted = subtotal - discount;
  const shipping   = discounted >= 2500 ? 0 : 150;
  const total      = discounted + shipping;

  const setEl = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  setEl('res-order-num', orderNum);
  setEl('res-items',     cart.map(i => `${i.title} ×${i.qty}`).join(', '));
  setEl('res-total',     '₱' + total.toLocaleString());
  setEl('res-payment',   payment.toUpperCase());

  const itemList = cart.map(i => `  - ${i.title} × ${i.qty} = ₱${(i.price * i.qty).toLocaleString()}`).join('\n');
  const emailBody = encodeURIComponent(
`🎉 NEW ORDER #${orderNum}

CUSTOMER:
  Name:    ${fname} ${lname}
  Email:   ${email}
  Phone:   ${phone}

SHIPPING ADDRESS:
  ${address}
  ${city}, ${prov} ${zip}

ITEMS:
${itemList}

  Discount:  -₱${discount.toLocaleString()}
  Shipping:  ${shipping === 0 ? 'FREE' : '₱' + shipping}
  TOTAL:     ₱${total.toLocaleString()}

PAYMENT METHOD: ${payment.toUpperCase()}

NOTES: ${notes}

Sent via MiniMe Boutique website.`
  );

  window.open(
    `mailto:deargabclothing@gmail.com?subject=${encodeURIComponent('New Order #' + orderNum + ' — MiniMe Boutique')}&body=${emailBody}`,
    '_blank'
  );

  cart = [];
  activeDiscount = 0;
  saveCart();
  checkoutStep('success', true);
  showToast('Order placed! 🎉', 'Check your email for confirmation.');
}

// ─── LOCATION DROPDOWNS
const locationData = {
  'NCR': {
    provinces: {
      'Metro Manila': {
        cities: {
          'Manila': '1000', 'Quezon City': '1100', 'Makati': '1200',
          'Taguig': '1630', 'Pasig': '1600', 'Mandaluyong': '1550',
          'Marikina': '1800', 'Parañaque': '1700', 'Las Piñas': '1740',
          'Muntinlupa': '1770', 'Caloocan': '1400', 'Malabon': '1470',
          'Navotas': '1485', 'Valenzuela': '1440', 'Pasay': '1300', 'Pateros': '1620'
        }
      }
    }
  },
  'Region IV-A (CALABARZON)': {
    provinces: {
      'Cavite':  { cities: { 'Bacoor': '4102', 'Dasmariñas': '4114', 'Imus': '4103', 'Kawit': '4104', 'Tagaytay': '4120', 'Trece Martires': '4109', 'General Trias': '4107', 'Silang': '4118' } },
      'Laguna':  { cities: { 'Santa Rosa': '4026', 'Biñan': '4024', 'Cabuyao': '4025', 'San Pedro': '4023', 'Calamba': '4027', 'Los Baños': '4030', 'Pagsanjan': '4008', 'San Pablo': '4000' } },
      'Batangas':{ cities: { 'Batangas City': '4200', 'Lipa': '4217', 'Tanauan': '4232', 'Santo Tomas': '4234', 'Nasugbu': '4231', 'Rosario': '4225' } },
      'Rizal':   { cities: { 'Antipolo': '1870', 'Cainta': '1900', 'Taytay': '1920', 'Angono': '1930', 'Binangonan': '1940', 'San Mateo': '1850', 'Pililla': '1910', 'Cardona': '1950', 'Morong': '1960', 'Teresa': '1880' } },
      'Quezon':  { cities: { 'Lucena': '4301', 'Tayabas': '4327', 'Sariaya': '4322', 'Candelaria': '4323', 'Atimonan': '4331' } }
    }
  },
  'Region III (Central Luzon)': {
    provinces: {
      'Bulacan':    { cities: { 'Malolos': '3000', 'Meycauayan': '3020', 'San Jose del Monte': '3023', 'Marilao': '3019', 'Bocaue': '3018', 'Balagtas': '3016' } },
      'Pampanga':   { cities: { 'Angeles': '2009', 'San Fernando': '2000', 'Mabalacat': '2010', 'Porac': '2008', 'Guagua': '2003' } },
      'Nueva Ecija':{ cities: { 'Cabanatuan': '3100', 'Palayan': '3132', 'San Jose': '3121', 'Gapan': '3105', 'Munoz': '3119' } }
    }
  },
  'Region I (Ilocos Region)': {
    provinces: {
      'Ilocos Norte': { cities: { 'Laoag': '2900', 'Batac': '2906', 'Paoay': '2910', 'Pagudpud': '2919' } },
      'Ilocos Sur':   { cities: { 'Vigan': '2700', 'Candon': '2710', 'Santa': '2703', 'Caoayan': '2702' } },
      'La Union':     { cities: { 'San Fernando': '2500', 'Bauang': '2501', 'Agoo': '2504', 'Naguilian': '2511' } },
      'Pangasinan':   { cities: { 'Dagupan': '2400', 'Urdaneta': '2428', 'San Carlos': '2420', 'Lingayen': '2401', 'Alaminos': '2404' } }
    }
  }
};

function updateProvinces() {
  const region   = document.getElementById('co-region').value;
  const provSel  = document.getElementById('co-province');
  const citySel  = document.getElementById('co-city');
  const zipInput = document.getElementById('co-zip');

  provSel.innerHTML = '<option value="" disabled selected>Select Province</option>';
  citySel.innerHTML = '<option value="" disabled selected>Select City</option>';
  if (zipInput) zipInput.value = '';

  if (!region || !locationData[region]) return;
  Object.keys(locationData[region].provinces).forEach(prov => {
    const opt = document.createElement('option');
    opt.value = prov; opt.textContent = prov;
    provSel.appendChild(opt);
  });
}

function updateCities() {
  const region   = document.getElementById('co-region').value;
  const province = document.getElementById('co-province').value;
  const citySel  = document.getElementById('co-city');
  const zipInput = document.getElementById('co-zip');

  citySel.innerHTML = '<option value="" disabled selected>Select City</option>';
  if (zipInput) zipInput.value = '';

  if (!region || !province) return;
  const cities = locationData[region]?.provinces[province]?.cities;
  if (!cities) return;
  Object.keys(cities).forEach(city => {
    const opt = document.createElement('option');
    opt.value = city; opt.textContent = city;
    citySel.appendChild(opt);
  });
}

function updateZip() {
  const region   = document.getElementById('co-region').value;
  const province = document.getElementById('co-province').value;
  const city     = document.getElementById('co-city').value;
  const zipInput = document.getElementById('co-zip');
  if (!zipInput) return;
  zipInput.value = locationData[region]?.provinces[province]?.cities[city] || '';
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
  attachInputClearers();

  // Product card clicks → open modal (whole card area)
  document.querySelectorAll('[data-product]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.product));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.product);
      }
    });
  });

  // "Add to Cart" quick-add buttons on the cards should open the modal instead,
  // so the user picks a variant & size first
  document.querySelectorAll('.product-add-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card = btn.closest('[data-product]');
      if (card) openModal(card.dataset.product);
    });
  });

  // Nav page links
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const page     = el.dataset.page;
      const scrollTo = el.dataset.scrollTo || null;
      const scrollTop = el.dataset.scrollTop;
      showPage(page, scrollTop ? null : scrollTo);
    });
  });

  // Close product modal on backdrop click
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Close checkout modal on backdrop click
  const checkoutOverlay = document.getElementById('checkout-overlay');
  if (checkoutOverlay) {
    checkoutOverlay.addEventListener('click', e => {
      if (e.target === checkoutOverlay) closeCheckoutModal();
    });
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeCheckoutModal(); }
  });

  showPage('home');
});

// ─── MOBILE MENU
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded',
        navLinks.classList.contains('mobile-open').toString()
      );
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });
});
