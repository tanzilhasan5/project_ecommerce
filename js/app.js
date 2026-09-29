// Storly Multipurpose eCommerce Engine

let currentCurrency = 'USD';
const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1 },
  BDT: { symbol: '৳', rate: 120 },
  EUR: { symbol: '€', rate: 0.92 }
};

let activeCategory = 'all';
let heroCurrentIndex = 0;
let heroTimer = null;
let appliedDiscountPercent = 0;

// Cart & Wishlist state from LocalStorage
let cartState = JSON.parse(localStorage.getItem('storly_cart') || '[]');
let wishlistState = JSON.parse(localStorage.getItem('storly_wishlist') || '[]');

// Quick view active item
let activeQvProduct = null;
let activeQvQty = 1;

// Currency Formatter
function formatPrice(amountInUSD) {
  const curr = CURRENCY_RATES[currentCurrency] || CURRENCY_RATES.USD;
  const converted = amountInUSD * curr.rate;
  if (currentCurrency === 'BDT') {
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${curr.symbol}${converted.toFixed(2)}`;
}

// ================= HERO SLIDER =================
function initHeroSlider() {
  const container = document.getElementById('hero-slider');
  const indicators = document.getElementById('slide-indicators');
  if (!container || !HERO_SLIDES.length) return;

  container.innerHTML = HERO_SLIDES.map((slide, idx) => `
    <div class="hero-slide absolute inset-0 transition-opacity duration-700 ${idx === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}" data-slide="${idx}">
      <img src="${slide.image}" alt="${slide.title}" class="w-full h-full object-cover object-center absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-r ${slide.bgGradient}"></div>
      
      <div class="relative z-10 h-full flex flex-col justify-center px-8 md:px-14 max-w-xl text-white">
        <div class="inline-flex items-center gap-2 mb-3">
          <span class="bg-brand-500 text-white font-extrabold text-[11px] tracking-widest uppercase px-3 py-1 rounded-full shadow-sm">${slide.tag}</span>
          <span class="text-xs font-semibold text-emerald-200 hidden sm:inline">${slide.badge}</span>
        </div>
        <h1 class="text-2xl sm:text-4xl md:text-5xl font-black font-heading leading-tight mb-4 text-shadow">${slide.title}</h1>
        <p class="text-xs sm:text-sm text-slate-200 line-clamp-2 md:line-clamp-3 mb-6 font-normal">${slide.desc}</p>
        <div class="flex items-center gap-3">
          <button onclick="window.filterByCategory('${slide.categoryTarget}')" class="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-lg shadow-brand-500/30 flex items-center gap-2">
            <span>${slide.cta}</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  indicators.innerHTML = HERO_SLIDES.map((_, idx) => `
    <button onclick="window.goToHeroSlide(${idx})" class="indicator-dot w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-white w-7' : 'bg-white/40'}" aria-label="Go to slide ${idx + 1}"></button>
  `).join('');

  startHeroAutoSlide();
}

function showHeroSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.indicator-dot');
  if (!slides.length) return;

  heroCurrentIndex = (index + slides.length) % slides.length;

  slides.forEach((s, i) => {
    if (i === heroCurrentIndex) {
      s.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
      s.classList.add('opacity-100', 'z-10');
    } else {
      s.classList.remove('opacity-100', 'z-10');
      s.classList.add('opacity-0', 'pointer-events-none', 'z-0');
    }
  });

  dots.forEach((dot, i) => {
    if (i === heroCurrentIndex) {
      dot.className = "indicator-dot h-2.5 rounded-full transition-all duration-300 bg-white w-7";
    } else {
      dot.className = "indicator-dot h-2.5 rounded-full transition-all duration-300 bg-white/40 w-2.5";
    }
  });

  if (window.lucide) lucide.createIcons();
}

function nextHeroSlide() {
  showHeroSlide(heroCurrentIndex + 1);
}
function prevHeroSlide() {
  showHeroSlide(heroCurrentIndex - 1);
}
function goToHeroSlide(idx) {
  showHeroSlide(idx);
}
function startHeroAutoSlide() {
  if (heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    nextHeroSlide();
  }, 6000);
}

// ================= FLASH DEAL COUNTDOWN TIMER =================
function startCountdownTimer() {
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');

  let totalSeconds = 8 * 3600 + 42 * 60 + 19; // initial 8h 42m 19s

  setInterval(() => {
    if (totalSeconds <= 0) {
      totalSeconds = 24 * 3600; // reset
    }
    totalSeconds--;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(m).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// ================= RENDER FLASH DEALS =================
function renderFlashDeals() {
  const container = document.getElementById('flash-deals-container');
  if (!container) return;

  const deals = PRODUCTS_DATA.filter(p => p.isFlashDeal).slice(0, 4);

  container.innerHTML = deals.map(product => {
    const isWished = wishlistState.some(w => w.id === product.id);
    const progressPercent = Math.min(100, Math.round((product.soldCount / (product.stockCount + product.soldCount)) * 100));

    return `
      <div class="product-card bg-white rounded-3xl p-4 border border-slate-100 flex flex-col justify-between relative group shadow-sm hover:shadow-lg">
        
        <!-- Image & Badges -->
        <div class="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square mb-3">
          <img src="${product.image}" alt="${product.name}" class="product-img w-full h-full object-cover">
          
          <!-- Discount Badge -->
          <span class="absolute top-3 left-3 bg-rose-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-sm">
            -${product.discount}% OFF
          </span>

          <!-- Quick Actions on Hover -->
          <div class="quick-action-bar absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 z-10">
            <button onclick="window.openQuickView('${product.id}')" class="w-9 h-9 rounded-xl bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition" title="Quick View">
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
            <button onclick="window.toggleWishlist('${product.id}')" class="w-9 h-9 rounded-xl bg-white/90 hover:bg-white ${isWished ? 'text-rose-500' : 'text-slate-800'} shadow-md flex items-center justify-center transition" title="Wishlist">
              <i data-lucide="heart" class="w-4 h-4 ${isWished ? 'fill-rose-500' : ''}"></i>
            </button>
          </div>
        </div>

        <!-- Info -->
        <div class="flex-1 flex flex-col">
          <span class="text-[10px] uppercase font-bold text-slate-400 mb-1">${product.categoryLabel}</span>
          <h3 onclick="window.openQuickView('${product.id}')" class="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2 hover:text-brand-600 cursor-pointer transition mb-2">
            ${product.name}
          </h3>

          <!-- Rating -->
          <div class="flex items-center gap-1.5 mb-2.5 text-xs text-amber-500">
            <div class="flex items-center">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>
            </div>
            <span class="font-bold text-slate-800 text-[11px]">${product.rating}</span>
            <span class="text-slate-400 text-[10px]">(${product.reviewsCount})</span>
          </div>

          <!-- Stock Progress -->
          <div class="mb-3 space-y-1">
            <div class="flex justify-between text-[11px] font-semibold text-slate-500">
              <span>Sold: <strong>${product.soldCount}</strong></span>
              <span class="text-emerald-600">Stock: ${product.stockCount}</span>
            </div>
            <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div class="bg-rose-500 h-full rounded-full" style="width: ${progressPercent}%"></div>
            </div>
          </div>

          <!-- Price & Action -->
          <div class="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span class="text-base font-extrabold text-slate-900 font-heading block leading-none">${formatPrice(product.price)}</span>
              <span class="text-[11px] text-slate-400 line-through leading-tight">${formatPrice(product.originalPrice)}</span>
            </div>
            <button onclick="window.addToCart('${product.id}', 1)" class="w-9 h-9 rounded-xl bg-brand-50 hover:bg-brand-600 text-brand-600 hover:text-white flex items-center justify-center transition shadow-sm" title="Add to Cart">
              <i data-lucide="shopping-cart" class="w-4 h-4"></i>
            </button>
          </div>

        </div>

      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

// ================= RENDER MAIN PRODUCTS GRID =================
function renderProducts() {
  const container = document.getElementById('products-grid');
  const emptyMsg = document.getElementById('no-products-msg');
  if (!container) return;

  const filtered = activeCategory === 'all' 
    ? PRODUCTS_DATA 
    : PRODUCTS_DATA.filter(p => p.category === activeCategory);

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyMsg) emptyMsg.classList.remove('hidden');
    return;
  }

  if (emptyMsg) emptyMsg.classList.add('hidden');

  container.innerHTML = filtered.map(product => {
    const isWished = wishlistState.some(w => w.id === product.id);

    return `
      <div class="product-card bg-white rounded-3xl p-4 border border-slate-100 flex flex-col justify-between relative group shadow-sm hover:shadow-xl">
        
        <!-- Image & Badges -->
        <div class="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square mb-3">
          <img src="${product.image}" alt="${product.name}" class="product-img w-full h-full object-cover">
          
          <div class="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            ${product.badge ? `
              <span class="bg-brand-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-sm">
                ${product.badge}
              </span>
            ` : ''}
            ${product.discount ? `
              <span class="bg-rose-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                -${product.discount}%
              </span>
            ` : ''}
          </div>

          <!-- Quick Action Bar -->
          <div class="quick-action-bar absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 z-10">
            <button onclick="window.openQuickView('${product.id}')" class="w-9 h-9 rounded-xl bg-white/95 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition hover:scale-105" title="Quick View">
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
            <button onclick="window.toggleWishlist('${product.id}')" class="w-9 h-9 rounded-xl bg-white/95 hover:bg-white ${isWished ? 'text-rose-500' : 'text-slate-800'} shadow-md flex items-center justify-center transition hover:scale-105" title="Wishlist">
              <i data-lucide="heart" class="w-4 h-4 ${isWished ? 'fill-rose-500' : ''}"></i>
            </button>
          </div>
        </div>

        <!-- Info -->
        <div class="flex-1 flex flex-col">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] uppercase font-bold text-slate-400">${product.categoryLabel}</span>
            <div class="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
              <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i>
              <span>${product.rating}</span>
            </div>
          </div>

          <h3 onclick="window.openQuickView('${product.id}')" class="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2 hover:text-brand-600 cursor-pointer transition mb-2">
            ${product.name}
          </h3>

          <p class="text-[11px] text-slate-400 line-clamp-2 mb-3 leading-relaxed">${product.description}</p>

          <!-- Price & Add Button -->
          <div class="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span class="text-base font-extrabold text-slate-900 font-heading block leading-none">${formatPrice(product.price)}</span>
              ${product.originalPrice ? `<span class="text-[11px] text-slate-400 line-through">${formatPrice(product.originalPrice)}</span>` : ''}
            </div>

            <button onclick="window.addToCart('${product.id}', 1)" class="flex items-center gap-1.5 px-3 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition shadow-sm shadow-brand-500/20 active:scale-95">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              <span>Add</span>
            </button>
          </div>

        </div>

      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

// ================= RENDER TRENDING & BEST SELLERS COLUMNS =================
function renderCuratedColumns() {
  const trendEl = document.getElementById('col-trending');
  const bestEl = document.getElementById('col-bestsellers');
  const topEl = document.getElementById('col-toprated');

  const renderMiniCard = (product) => `
    <div onclick="window.openQuickView('${product.id}')" class="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-slate-50 transition cursor-pointer group">
      <div class="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition">
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-slate-800 truncate group-hover:text-brand-600 transition">${product.name}</h4>
        <div class="flex items-center gap-1 text-[11px] text-amber-500 my-0.5">
          <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i>
          <span class="font-bold">${product.rating}</span>
          <span class="text-slate-400">(${product.reviewsCount})</span>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-xs font-extrabold text-slate-900 font-heading">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="text-[10px] text-slate-400 line-through">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
      </div>
    </div>
  `;

  if (trendEl) {
    const items = PRODUCTS_DATA.filter(p => p.isTrending).slice(0, 3);
    trendEl.innerHTML = items.map(renderMiniCard).join('');
  }
  if (bestEl) {
    const items = PRODUCTS_DATA.filter(p => p.isBestSeller).slice(0, 3);
    bestEl.innerHTML = items.map(renderMiniCard).join('');
  }
  if (topEl) {
    const items = PRODUCTS_DATA.filter(p => p.rating >= 4.8).slice(0, 3);
    topEl.innerHTML = items.map(renderMiniCard).join('');
  }

  if (window.lucide) lucide.createIcons();
}

// ================= TESTIMONIALS =================
function renderTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container || !TESTIMONIALS.length) return;

  container.innerHTML = TESTIMONIALS.map(t => `
    <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition">
      <div class="flex items-center gap-1 text-amber-400 mb-3">
        ${Array(t.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>').join('')}
      </div>
      <p class="text-xs text-slate-600 leading-relaxed italic mb-5">"${t.comment}"</p>
      <div class="flex items-center gap-3">
        <img src="${t.avatar}" alt="${t.name}" class="w-10 h-10 rounded-full object-cover">
        <div>
          <h4 class="text-xs font-bold text-slate-900">${t.name}</h4>
          <span class="text-[10px] text-brand-600 font-semibold flex items-center gap-1">
            <i data-lucide="badge-check" class="w-3 h-3"></i> ${t.role}
          </span>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// ================= CATEGORY FILTERING =================
function filterByCategory(catId) {
  activeCategory = catId;

  // Update tabs UI
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    if (btn.dataset.cat === catId) {
      btn.className = "tab-btn active px-4 py-2 rounded-xl text-xs font-bold transition bg-white text-brand-600 shadow-sm";
    } else {
      btn.className = "tab-btn px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition";
    }
  });

  // Close mega dropdown if open
  const dropdown = document.getElementById('category-mega-dropdown');
  if (dropdown) dropdown.classList.add('hidden');

  renderProducts();

  // Scroll gently to products section if clicked from menu/banners
  const sec = document.getElementById('products-section');
  if (sec) {
    sec.scrollIntoView({ behavior: 'smooth' });
  }
}

// ================= LIVE OMNIBAR SEARCH =================
function initSearch() {
  const input = document.getElementById('search-input');
  const dropdown = document.getElementById('search-dropdown');
  const filterCat = document.getElementById('header-category-filter');

  if (!input || !dropdown) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    const cat = filterCat ? filterCat.value : 'all';

    if (q.length < 1) {
      dropdown.classList.add('hidden');
      return;
    }

    const matches = PRODUCTS_DATA.filter(p => {
      const matchCat = cat === 'all' || p.category === cat;
      const matchText = p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return matchCat && matchText;
    });

    if (matches.length === 0) {
      dropdown.innerHTML = `
        <div class="p-4 text-center text-xs text-slate-400">
          No products found for "<strong>${q}</strong>"
        </div>
      `;
    } else {
      dropdown.innerHTML = `
        <div class="p-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Found ${matches.length} matching products
        </div>
        <div class="divide-y divide-slate-100">
          ${matches.slice(0, 5).map(m => `
            <div onclick="window.selectSearchProduct('${m.id}')" class="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer transition">
              <img src="${m.image}" class="w-10 h-10 rounded-lg object-cover bg-slate-100">
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-800 truncate">${m.name}</p>
                <span class="text-[10px] text-slate-400">${m.categoryLabel}</span>
              </div>
              <span class="text-xs font-bold text-brand-600">${formatPrice(m.price)}</span>
            </div>
          `).join('')}
        </div>
      `;
    }
    dropdown.classList.remove('hidden');
  });

  // Close search dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#search-form') && !e.target.closest('#search-dropdown')) {
      dropdown.classList.add('hidden');
    }
  });
}

function handleSearchSubmit() {
  const input = document.getElementById('search-input');
  const dropdown = document.getElementById('search-dropdown');
  if (dropdown) dropdown.classList.add('hidden');

  if (input && input.value.trim()) {
    const q = input.value.trim().toLowerCase();
    const matched = PRODUCTS_DATA.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    
    const container = document.getElementById('products-grid');
    const emptyMsg = document.getElementById('no-products-msg');
    
    if (matched.length === 0) {
      if (container) container.innerHTML = '';
      if (emptyMsg) emptyMsg.classList.remove('hidden');
    } else {
      if (emptyMsg) emptyMsg.classList.add('hidden');
      if (container) {
        container.innerHTML = matched.map(product => {
          const isWished = wishlistState.some(w => w.id === product.id);
          return `
            <div class="product-card bg-white rounded-3xl p-4 border border-slate-100 flex flex-col justify-between relative group shadow-sm hover:shadow-xl">
              <div class="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square mb-3">
                <img src="${product.image}" alt="${product.name}" class="product-img w-full h-full object-cover">
              </div>
              <h3 onclick="window.openQuickView('${product.id}')" class="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2 hover:text-brand-600 cursor-pointer mb-2">${product.name}</h3>
              <div class="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                <span class="text-base font-extrabold text-slate-900">${formatPrice(product.price)}</span>
                <button onclick="window.addToCart('${product.id}', 1)" class="px-3 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold">Add</button>
              </div>
            </div>
          `;
        }).join('');
      }
    }
    const sec = document.getElementById('products-section');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
    if (window.lucide) lucide.createIcons();
  }
}

function selectSearchProduct(productId) {
  const dropdown = document.getElementById('search-dropdown');
  if (dropdown) dropdown.classList.add('hidden');
  openQuickView(productId);
}

// Mobile Search toggle
function toggleMobileSearch() {
  const bar = document.getElementById('mobile-search-bar');
  if (bar) bar.classList.toggle('hidden');
}

function handleMobileSearch() {
  const input = document.getElementById('mobile-search-input');
  if (input && input.value) {
    const mainInput = document.getElementById('search-input');
    if (mainInput) mainInput.value = input.value;
    handleSearchSubmit();
    toggleMobileSearch();
  }
}

// ================= CART MANAGEMENT =================
function saveCart() {
  localStorage.setItem('storly_cart', JSON.stringify(cartState));
  updateCartBadges();
  renderCartDrawer();
}

function updateCartBadges() {
  const count = cartState.reduce((sum, item) => sum + item.qty, 0);
  const total = cartState.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const badge = document.getElementById('cart-badge');
  const drawerCount = document.getElementById('cart-drawer-count');
  const headerTotal = document.getElementById('cart-header-total');

  if (badge) badge.textContent = count;
  if (drawerCount) drawerCount.textContent = count;
  if (headerTotal) headerTotal.textContent = formatPrice(total);
}

function addToCart(productId, qty = 1, selectedVariant = null) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existing = cartState.find(item => item.id === productId && item.variant === selectedVariant);
  if (existing) {
    existing.qty += qty;
  } else {
    cartState.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.categoryLabel,
      variant: selectedVariant || (product.sizes ? product.sizes[0] : null),
      qty: qty
    });
  }

  saveCart();
  showToast(`Added "${product.name}" to cart!`, 'success');
}

function updateCartQty(productId, delta) {
  const item = cartState.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
}

function removeFromCart(productId) {
  cartState = cartState.filter(i => i.id !== productId);
  saveCart();
  showToast("Item removed from cart", "info");
}

function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const emptyMsg = document.getElementById('cart-empty-msg');
  const footer = document.getElementById('cart-footer');
  const subtotalEl = document.getElementById('cart-subtotal');
  const discountRow = document.getElementById('cart-discount-row');
  const discountVal = document.getElementById('cart-discount-val');
  const shippingEl = document.getElementById('cart-shipping');
  const totalEl = document.getElementById('cart-total');

  // Shipping progress
  const progressBar = document.getElementById('shipping-progress-bar');
  const progressText = document.getElementById('shipping-progress-text');

  if (!container) return;

  if (cartState.length === 0) {
    container.innerHTML = '';
    if (emptyMsg) emptyMsg.classList.remove('hidden');
    if (footer) footer.classList.add('hidden');
    if (progressBar) progressBar.style.width = '0%';
    if (progressText) progressText.textContent = 'Add $50 more for Free Shipping!';
    return;
  }

  if (emptyMsg) emptyMsg.classList.add('hidden');
  if (footer) footer.classList.remove('hidden');

  container.innerHTML = cartState.map(item => `
    <div class="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
      <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover bg-white shrink-0">
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-slate-800 truncate">${item.name}</h4>
        ${item.variant ? `<span class="text-[10px] text-slate-400 block">${item.variant}</span>` : ''}
        <span class="text-xs font-extrabold text-brand-600 font-heading block mt-0.5">${formatPrice(item.price)}</span>
      </div>

      <!-- Quantity controls -->
      <div class="flex items-center border border-slate-200 rounded-lg bg-white p-0.5 shrink-0">
        <button onclick="window.updateCartQty('${item.id}', -1)" class="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800">
          <i data-lucide="minus" class="w-3 h-3"></i>
        </button>
        <span class="w-6 text-center text-xs font-bold text-slate-800">${item.qty}</span>
        <button onclick="window.updateCartQty('${item.id}', 1)" class="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800">
          <i data-lucide="plus" class="w-3 h-3"></i>
        </button>
      </div>

      <!-- Remove button -->
      <button onclick="window.removeFromCart('${item.id}')" class="text-slate-300 hover:text-rose-500 p-1 transition" title="Remove">
        <i data-lucide="trash-2" class="w-4 h-4"></i>
      </button>
    </div>
  `).join('');

  // Calculations
  const subtotal = cartState.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const discountAmount = subtotal * (appliedDiscountPercent / 100);
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 4.99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
  if (totalEl) totalEl.textContent = formatPrice(finalTotal);

  if (appliedDiscountPercent > 0 && discountRow && discountVal) {
    discountRow.classList.remove('hidden');
    discountVal.textContent = `-${formatPrice(discountAmount)} (${appliedDiscountPercent}%)`;
  } else if (discountRow) {
    discountRow.classList.add('hidden');
  }

  // Free shipping bar ($50 threshold)
  if (progressBar && progressText) {
    const progress = Math.min(100, Math.round((subtotal / 50) * 100));
    progressBar.style.width = `${progress}%`;
    if (subtotal >= 50) {
      progressText.innerHTML = '<span class="text-brand-600 font-bold">🎉 You unlocked FREE Shipping!</span>';
    } else {
      progressText.textContent = `Add ${formatPrice(50 - subtotal)} more for Free Shipping!`;
    }
  }

  if (window.lucide) lucide.createIcons();
}

function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  const panel = document.getElementById('cart-panel');
  if (!drawer || !backdrop || !panel) return;

  renderCartDrawer();
  drawer.classList.remove('pointer-events-none');
  backdrop.classList.remove('opacity-0', 'invisible');
  backdrop.classList.add('opacity-100');
  panel.classList.remove('translate-x-full');
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  const panel = document.getElementById('cart-panel');
  if (!drawer || !backdrop || !panel) return;

  panel.classList.add('translate-x-full');
  backdrop.classList.remove('opacity-100');
  backdrop.classList.add('opacity-0', 'invisible');
  drawer.classList.add('pointer-events-none');
}

function applyCoupon() {
  const input = document.getElementById('coupon-input');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (code === 'STORLY15') {
    appliedDiscountPercent = 15;
    showToast('Promo code STORLY15 applied: 15% OFF!', 'success');
    renderCartDrawer();
  } else if (code === 'WELCOME') {
    appliedDiscountPercent = 10;
    showToast('Promo code WELCOME applied: 10% OFF!', 'success');
    renderCartDrawer();
  } else {
    showToast('Invalid promo code. Try "STORLY15"', 'error');
  }
}

// ================= WISHLIST MANAGEMENT =================
function saveWishlist() {
  localStorage.setItem('storly_wishlist', JSON.stringify(wishlistState));
  updateWishlistBadges();
  renderProducts();
  renderFlashDeals();
}

function updateWishlistBadges() {
  const count = wishlistState.length;
  const badge = document.getElementById('wishlist-badge');
  const modalCount = document.getElementById('wishlist-modal-count');

  if (badge) badge.textContent = count;
  if (modalCount) modalCount.textContent = count;
}

function toggleWishlist(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const idx = wishlistState.findIndex(w => w.id === productId);
  if (idx >= 0) {
    wishlistState.splice(idx, 1);
    showToast(`Removed "${product.name}" from wishlist`, 'info');
  } else {
    wishlistState.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.categoryLabel
    });
    showToast(`Saved "${product.name}" to wishlist!`, 'success');
  }

  saveWishlist();
  renderWishlistModal();
}

function openWishlistDrawer() {
  const modal = document.getElementById('wishlist-modal');
  if (!modal) return;
  renderWishlistModal();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeWishlistDrawer() {
  const modal = document.getElementById('wishlist-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function renderWishlistModal() {
  const container = document.getElementById('wishlist-items-container');
  const emptyMsg = document.getElementById('wishlist-empty-msg');
  if (!container) return;

  if (wishlistState.length === 0) {
    container.innerHTML = '';
    if (emptyMsg) emptyMsg.classList.remove('hidden');
    return;
  }

  if (emptyMsg) emptyMsg.classList.add('hidden');

  container.innerHTML = wishlistState.map(item => `
    <div class="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
      <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover bg-white shrink-0">
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-slate-800 truncate">${item.name}</h4>
        <span class="text-[10px] text-slate-400">${item.category}</span>
        <span class="text-xs font-extrabold text-brand-600 block mt-0.5">${formatPrice(item.price)}</span>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="window.addToCart('${item.id}', 1); window.toggleWishlist('${item.id}');" class="px-3 py-1.5 bg-brand-600 text-white rounded-lg text-xs font-bold hover:bg-brand-700 transition">
          Move to Cart
        </button>
        <button onclick="window.toggleWishlist('${item.id}')" class="p-1.5 text-slate-400 hover:text-rose-500">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// ================= QUICK VIEW MODAL =================
function openQuickView(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  activeQvProduct = product;
  activeQvQty = 1;

  const modal = document.getElementById('quickview-modal');
  const mainImg = document.getElementById('qv-main-img');
  const thumbs = document.getElementById('qv-thumbs');
  const badge = document.getElementById('qv-badge');
  const category = document.getElementById('qv-category');
  const title = document.getElementById('qv-title');
  const rating = document.getElementById('qv-rating');
  const reviews = document.getElementById('qv-reviews');
  const price = document.getElementById('qv-price');
  const origPrice = document.getElementById('qv-original-price');
  const discount = document.getElementById('qv-discount');
  const desc = document.getElementById('qv-desc');
  const options = document.getElementById('qv-options');
  const qtyEl = document.getElementById('qv-qty');

  if (mainImg) mainImg.src = product.image;
  if (badge) {
    badge.textContent = product.badge || 'Featured';
    badge.className = `px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-brand-100 text-brand-700`;
  }
  if (category) category.textContent = product.categoryLabel;
  if (title) title.textContent = product.name;
  if (rating) rating.textContent = product.rating;
  if (reviews) reviews.textContent = `${product.reviewsCount} customer reviews`;
  if (price) price.textContent = formatPrice(product.price);
  if (origPrice) origPrice.textContent = product.originalPrice ? formatPrice(product.originalPrice) : '';
  if (discount) discount.textContent = product.discount ? `Save ${product.discount}%` : '';
  if (desc) desc.textContent = product.description;
  if (qtyEl) qtyEl.textContent = '1';

  // Thumbs gallery
  if (thumbs && product.gallery) {
    thumbs.innerHTML = product.gallery.map((img, i) => `
      <img src="${img}" onclick="document.getElementById('qv-main-img').src = '${img}'" class="w-14 h-14 rounded-xl object-cover cursor-pointer border border-slate-200 hover:border-brand-500 shrink-0 transition">
    `).join('');
  }

  // Options / Sizes / Colors
  if (options) {
    let html = '';
    if (product.colors) {
      html += `
        <div>
          <span class="text-[11px] font-bold text-slate-700 uppercase block mb-1.5">Color:</span>
          <div class="flex items-center gap-2">
            ${product.colors.map((c, i) => `
              <button class="w-6 h-6 rounded-full border-2 border-white shadow-md focus:ring-2 focus:ring-brand-500" style="background-color: ${c}"></button>
            `).join('')}
          </div>
        </div>
      `;
    }
    if (product.sizes) {
      html += `
        <div>
          <span class="text-[11px] font-bold text-slate-700 uppercase block mb-1.5">Options / Size:</span>
          <div class="flex flex-wrap items-center gap-2">
            ${product.sizes.map((s, i) => `
              <span class="text-xs font-semibold px-3 py-1 bg-slate-100 rounded-lg text-slate-700 border border-slate-200 cursor-pointer hover:border-brand-500">${s}</span>
            `).join('')}
          </div>
        </div>
      `;
    }
    options.innerHTML = html;
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  if (window.lucide) lucide.createIcons();
}

function closeQuickView() {
  const modal = document.getElementById('quickview-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function incrementQvQty() {
  activeQvQty++;
  const el = document.getElementById('qv-qty');
  if (el) el.textContent = activeQvQty;
}

function decrementQvQty() {
  if (activeQvQty > 1) {
    activeQvQty--;
    const el = document.getElementById('qv-qty');
    if (el) el.textContent = activeQvQty;
  }
}

function addQvToCart() {
  if (activeQvProduct) {
    addToCart(activeQvProduct.id, activeQvQty);
    closeQuickView();
    openCartDrawer();
  }
}

// ================= CHECKOUT FLOW =================
function openCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  const formScreen = document.getElementById('checkout-form-container');
  const successScreen = document.getElementById('checkout-success-container');
  const countEl = document.getElementById('chk-item-count');
  const totalEl = document.getElementById('chk-total');

  if (cartState.length === 0) {
    showToast("Your cart is empty! Please add items to checkout.", "warning");
    return;
  }

  const subtotal = cartState.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const discountAmount = subtotal * (appliedDiscountPercent / 100);
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);
  const totalCount = cartState.reduce((sum, i) => sum + i.qty, 0);

  if (countEl) countEl.textContent = totalCount;
  if (totalEl) totalEl.textContent = formatPrice(finalTotal);

  if (formScreen) formScreen.classList.remove('hidden');
  if (successScreen) successScreen.classList.add('hidden');

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function processCheckout() {
  const formScreen = document.getElementById('checkout-form-container');
  const successScreen = document.getElementById('checkout-success-container');
  const randNum = Math.floor(10000 + Math.random() * 90000);
  const orderId = `#STR-${randNum}`;

  const confirmedEl = document.getElementById('confirmed-order-id');
  const receiptEl = document.getElementById('order-receipt-id');

  if (confirmedEl) confirmedEl.textContent = orderId;
  if (receiptEl) receiptEl.textContent = orderId;

  // Clear cart
  cartState = [];
  saveCart();

  if (formScreen) formScreen.classList.add('hidden');
  if (successScreen) successScreen.classList.remove('hidden');

  showToast(`Order ${orderId} confirmed successfully!`, 'success');
}

function closeCheckoutSuccess() {
  closeCheckoutModal();
}

// ================= UI MENUS =================
function toggleCategoryMegaMenu() {
  const dropdown = document.getElementById('category-mega-dropdown');
  if (dropdown) dropdown.classList.toggle('hidden');
}

function toggleUserMenu() {
  const dropdown = document.getElementById('user-menu-dropdown');
  if (dropdown) dropdown.classList.toggle('hidden');
}

function handleNewsletterSubmit(form) {
  showToast("Thank you for subscribing! Your 15% discount code is: STORLY15", "success");
  if (form) form.reset();
}

// ================= TOAST SYSTEM =================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const colors = {
    success: 'bg-emerald-600 text-white shadow-emerald-500/20',
    error: 'bg-rose-600 text-white shadow-rose-500/20',
    warning: 'bg-amber-500 text-white shadow-amber-500/20',
    info: 'bg-slate-900 text-white shadow-slate-900/20'
  };

  const icons = {
    success: 'check-circle-2',
    error: 'alert-circle',
    warning: 'alert-triangle',
    info: 'info'
  };

  toast.className = `toast-item flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold ${colors[type] || colors.info}`;
  toast.innerHTML = `
    <i data-lucide="${icons[type] || 'info'}" class="w-4 h-4 shrink-0"></i>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ================= CURRENCY SELECTOR =================
function initCurrencySelector() {
  const select = document.getElementById('currency-select');
  if (!select) return;

  select.addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    updateCartBadges();
    renderProducts();
    renderFlashDeals();
    renderCuratedColumns();
    renderCartDrawer();
    showToast(`Currency changed to ${currentCurrency}`, 'info');
  });
}

// Close menus when clicking outside
document.addEventListener('click', (e) => {
  const megaBtn = document.getElementById('category-menu-btn');
  const megaMenu = document.getElementById('category-mega-dropdown');
  if (megaBtn && megaMenu && !megaBtn.contains(e.target) && !megaMenu.contains(e.target)) {
    megaMenu.classList.add('hidden');
  }

  const userBtn = e.target.closest('[onclick="window.toggleUserMenu()"]');
  const userMenu = document.getElementById('user-menu-dropdown');
  if (!userBtn && userMenu && !userMenu.contains(e.target)) {
    userMenu.classList.add('hidden');
  }
});

// ================= APP INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  startCountdownTimer();
  renderFlashDeals();
  renderProducts();
  renderCuratedColumns();
  renderTestimonials();
  initSearch();
  initCurrencySelector();
  updateCartBadges();
  updateWishlistBadges();

  if (window.lucide) lucide.createIcons();
});

// Expose functions globally for inline HTML events
window.initHeroSlider = initHeroSlider;
window.nextHeroSlide = nextHeroSlide;
window.prevHeroSlide = prevHeroSlide;
window.goToHeroSlide = goToHeroSlide;
window.filterByCategory = filterByCategory;
window.handleSearchSubmit = handleSearchSubmit;
window.selectSearchProduct = selectSearchProduct;
window.toggleMobileSearch = toggleMobileSearch;
window.handleMobileSearch = handleMobileSearch;
window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;
window.addToCart = addToCart;
window.updateCartQty = updateCartQty;
window.removeFromCart = removeFromCart;
window.applyCoupon = applyCoupon;
window.toggleWishlist = toggleWishlist;
window.openWishlistDrawer = openWishlistDrawer;
window.closeWishlistDrawer = closeWishlistDrawer;
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.incrementQvQty = incrementQvQty;
window.decrementQvQty = decrementQvQty;
window.addQvToCart = addQvToCart;
window.openCheckoutModal = openCheckoutModal;
window.closeCheckoutModal = closeCheckoutModal;
window.processCheckout = processCheckout;
window.closeCheckoutSuccess = closeCheckoutSuccess;
window.toggleCategoryMegaMenu = toggleCategoryMegaMenu;
window.toggleUserMenu = toggleUserMenu;
window.handleNewsletterSubmit = handleNewsletterSubmit;
window.showToast = showToast;
