/* MiniMe Boutique  */

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
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  showToast('Added to cart!', product.title);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  saveCart();
  renderCart();
}

// ─── PRODUCT DATA 
const PRODUCTS = {
  sandra: {
    id: 'sandra',
    title: 'Sandra Family Set',
    price: 825,
    color: 'Peaach Pink',
    material: 'Floral Design • Pink',
    badge: 'SANDRA SET',
    badgeClass: 'badge-gold',
    img: 'images/sandra.png',
    breakdown: [['Mom & Daughter', '₱825'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Peach Pink, Purple, Denim Blue, Yellow)','Mom Size: Small - XL', 'Daughter & Son Size: Small - Large', 'Dad size: Large -XXL']
  },
  krizzel: {
    id: 'krizzel',
    title: 'Krizzel Family Set',
    price: 1160,
    color: 'White Linen',
    material: 'Cotton Linen • White',
    badge: 'Krizzel',
    badgeClass: 'badge-pink',
    img: 'images/krizzel.png',
    breakdown: [['Twin Set (Mom)', '₱815'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Indigo, Purple, Red, Forest Green)','Mom Size: Medium - XXL', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL']
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
    breakdown: [['Mom & Daughter', '₱795'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Nude, White, Black, Red)','Mom Size: Small - Large', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL']
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
    breakdown: [['Mom & Daughter', '₱815'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Yellow, Red, White, Pink, Blue, Purple)','Mom Size: Small - Large', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL']
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
    fallback: 'https://images.unsplash.com/photo-1536640712247-c45474762ef4?q=80&w=800',
    breakdown: [['Mom & Daughter', '₱815'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Red, Blue, Peach, Purple, Pink, Green, Orange)','Mom Size: Medium - XXL', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL']
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
    breakdown: [['Mom & Daughter', '₱835'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Red, Peach, Green, Dusty Green, Yellow, White, Pink, Pastel Blue, Royal Blue, Dusty Blue, Purple, Cream, Black, Fuschia Pink)','Mom Size: Medium - XXL', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL']
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
    breakdown: [['Mom & Daughter', '₱785'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Peach, Pastel Yellow, Pastel Purple, Emerald green, Orange, Purple, Red maroon)','Mom Size: Medium - XXXL', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL']
  },
  pinky: {
    id: 'pinky',
    title: 'Pinky Coords Family Set',
    price: 1240,
    color: 'Purple',
    material: 'Linen • Pruple',
    badge: 'PINKY COORDS',
    badgeClass: 'badge-pink',
    img: 'images/pinky.png',
    breakdown: [['Mom & Daughter', '₱725'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Green, Fuschia Pink, Yellow, Purple, Black)','Mom Size: Small - Large', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL']
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
    breakdown: [['Mom & Daughter', '₱785'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Gree, Rust)','Mom Size: Medium - XXL', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL']
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
    breakdown: [['Mom & Daughter', '₱745'], ['Dad Shirt', '₱345'], ["Son's Set", '₱245']],
    details: ['Also available in different colors (Red, Brown, Blue, Pink)','Mom Size: Medium - XXL', 'Daughter & Son Size: Small - Large', 'Dad size: Medium - XXL']
  }
};

// ─── PRODUCT MODAL 
let currentProduct = null;
let modalQty = 1;

function openModal(productId) {
  const p = PRODUCTS[productId];
  if (!p) return;
  currentProduct = p;
  modalQty = 1;

  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  document.getElementById('modal-colorway').textContent  = p.color.toUpperCase();
  document.getElementById('modal-title').textContent     = p.title;
  document.getElementById('modal-price').textContent     = '₱' + p.price.toLocaleString();
  document.getElementById('modal-qty-display').textContent = modalQty;

  const imgEl = document.getElementById('modal-img');
  imgEl.src = p.img;
  imgEl.onerror = () => { imgEl.src = p.fallback; };

  const list = document.getElementById('modal-details-list');
  list.innerHTML = p.details.map(d => `<li>${d}</li>`).join('');

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
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
  for (let i = 0; i < modalQty; i++) addToCart(currentProduct);
  closeModal();
}

// ─── CART RENDER 
function renderCart() {
  const container = document.getElementById('cart-items-container');
  const emptyState = document.getElementById('cart-empty-state');
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
        <img src="${item.img}" alt="${item.title}"
             onerror="this.src='${item.fallback}'">
      </div>
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.title}</h3>
        <p class="cart-item-material">${item.material}</p>
        <p class="cart-item-price">₱${(item.price * item.qty).toLocaleString()}</p>
        <div class="cart-item-actions">
          <div class="cart-qty-wrap">
            <button class="cart-qty-btn" onclick="updateQty('${item.id}', -1)" aria-label="Decrease">−</button>
            <span class="cart-qty-num">${item.qty}</span>
            <button class="cart-qty-btn" onclick="updateQty('${item.id}', 1)" aria-label="Increase">+</button>
          </div>
          <button class="cart-remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = subtotal >= 2500 ? 0 : 150;
  const total     = subtotal + shipping;

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
    'MINIME10':  { msg: '10% off applied!',                  pct: 0.10 },
    'FAMILY20':  { msg: '20% off for family sets!',          pct: 0.20 },
    'HOLIDAY':   { msg: 'Holiday discount applied! (15%)',   pct: 0.15 }
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
function showToast(title, subtitle) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-sub').textContent   = subtitle;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ─── CONTACT FORM (opens email client) 
function handleContact(e) {
  e.preventDefault();
  const name    = document.getElementById('contact-name')?.value.trim()    || '';
  const email   = document.getElementById('contact-email')?.value.trim()   || '';
  const subject = document.getElementById('contact-subject')?.value.trim() || 'Enquiry from MiniMe website';
  const message = document.getElementById('contact-message')?.value.trim() || '';

  if (!name || !email || !message) {
    showToast('Please fill in all fields', 'Name, email and message are required.');
    return;
  }

  const body = encodeURIComponent(
    `Hi MiniMe!\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n— Sent via MiniMe Boutique website`
  );
  const subjectEncoded = encodeURIComponent(subject);
  // Opens the user's default email app with the message pre-filled
  window.location.href = `mailto:deargabclothing@gmail.com?subject=${subjectEncoded}&body=${body}`;

  showToast('Opening your email app!', 'Your message is ready to send.');
  e.currentTarget.reset();
}

// ─── NEWSLETTER ─
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.currentTarget.querySelector('input[type="email"]');
  const val   = input ? input.value.trim() : '';
  if (!val) return;
  showToast('Subscribed!', 'Thank you for joining the MiniMe family.');
  if (input) input.value = '';
}

// ─── CHECKOUT MODAL 
function openCheckoutModal() {
  if (cart.length === 0) return;
  const overlay = document.getElementById('checkout-overlay');
  if (!overlay) return;
  checkoutStep(1);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const overlay = document.getElementById('checkout-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function checkoutStep(step) {
  // Hide all panels
  document.querySelectorAll('.checkout-step-panel').forEach(p => p.classList.add('hidden'));
  // Show target panel
  const panel = document.getElementById('checkout-step-' + step);
  if (panel) panel.classList.remove('hidden');

  // Update step indicators
  document.querySelectorAll('.checkout-step').forEach(el => {
    const s = parseInt(el.dataset.step);
    el.classList.remove('active', 'done');
    if (s === step) el.classList.add('active');
    else if (s < step) el.classList.add('done');
  });

  // If step 3, build the order review
  if (step === 3) buildOrderReview();

  // Scroll to top of checkout box
  const box = document.querySelector('.checkout-box');
  if (box) box.scrollTo({ top: 0, behavior: 'smooth' });
}

function buildOrderReview() {
  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount  = Math.round(subtotal * activeDiscount);
  const discounted = subtotal - discount;
  const shipping  = discounted >= 2500 ? 0 : 150;
  const total     = discounted + shipping;

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
  // Gather all fields
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

  // Build a readable order number
  const orderNum = 'MM-' + Date.now().toString().slice(-6);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount  = Math.round(subtotal * activeDiscount);
  const discounted = subtotal - discount;
  const shipping  = discounted >= 2500 ? 0 : 150;
  const total     = discounted + shipping;

  // Show tracking info
  const trackEl = document.getElementById('order-tracking-info');
  if (trackEl) {
    trackEl.innerHTML = `
      <strong>Order Reference</strong>
      Order #${orderNum}<br/>
      ${fname} ${lname} • ${email} • ${phone}<br/>
      ${address}, ${city}, ${prov} ${zip}<br/>
      Payment: ${payment.toUpperCase()} • Total: ₱${total.toLocaleString()}
    `;
  }

  // Build email body for the store owner
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

  // Open email to store
  window.open(
    `mailto:deargabclothing@gmail.com?subject=${encodeURIComponent('New Order #' + orderNum + ' — MiniMe Boutique')}&body=${emailBody}`,
    '_blank'
  );

  // Clear cart and show success
  cart = [];
  activeDiscount = 0;
  saveCart();
  checkoutStep('success');
  showToast('Order placed! 🎉', 'Check your email for confirmation.');
}

// ─── PAGE NAVIGATION (SPA) 
function showPage(pageName, scrollTo) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const target = document.getElementById('page-' + pageName);
  if (target) target.classList.remove('hidden');

  // Update active nav link
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active',
      a.dataset.page === pageName && !a.dataset.scrollTo
    );
  });

  if (scrollTo) {
    // Small delay to allow page to render first
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

  // Product card clicks → open modal
  document.querySelectorAll('[data-product]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.product));
  });

  // Nav page links
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const page     = el.dataset.page;
      const scrollTo = el.dataset.scrollTo || null;
      const scrollTop = el.dataset.scrollTop;

      if (scrollTop) {
        showPage(page);            // scrolls to top
      } else {
        showPage(page, scrollTo);  // optionally scrolls to section
      }
    });
  });

  // Close product modal on backdrop click or Escape
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

  // Show home page by default
  showPage('home');
});

// ─── MOBILE MENU 
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });
});
