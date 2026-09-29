// Storly Multipurpose eCommerce Product Database
const PRODUCTS_DATA = [
  // --- Groceries & Organic ---
  {
    id: "groc-1",
    name: "Organic Farm Fresh Avocados (Box of 4)",
    category: "grocery",
    categoryLabel: "Fresh Groceries",
    price: 6.99,
    originalPrice: 9.50,
    discount: 26,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Organic",
    badgeColor: "emerald",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    stockCount: 45,
    soldCount: 88,
    isFlashDeal: true,
    isTrending: true,
    isBestSeller: true,
    sku: "ORG-AVO-004",
    unit: "4 pcs / pack",
    description: "Hand-picked pesticide-free Haas avocados from organic certified orchards. Creamy texture, rich in healthy omega-3 fatty acids, vitamins E and C.",
    sizes: ["Standard Box", "Family Box (8 pcs)"]
  },
  {
    id: "groc-2",
    name: "Pure Cold-Pressed Virgin Olive Oil 750ml",
    category: "grocery",
    categoryLabel: "Fresh Groceries",
    price: 18.50,
    originalPrice: 24.00,
    discount: 22,
    rating: 4.8,
    reviewsCount: 89,
    badge: "100% Pure",
    badgeColor: "emerald",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    stockCount: 30,
    soldCount: 65,
    isFlashDeal: false,
    isTrending: true,
    isBestSeller: false,
    sku: "OIL-EVOO-750",
    unit: "750 ml",
    description: "Authentic Mediterranean extra virgin olive oil harvested through cold-pressing methods to maintain full polyphenols, aroma, and delicate herbal notes.",
    sizes: ["500 ml", "750 ml", "1 Liter"]
  },
  {
    id: "groc-3",
    name: "Wildflower Raw Natural Honey Jar 500g",
    category: "grocery",
    categoryLabel: "Fresh Groceries",
    price: 12.40,
    originalPrice: 15.00,
    discount: 17,
    rating: 4.9,
    reviewsCount: 210,
    badge: "Best Seller",
    badgeColor: "amber",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    stockCount: 60,
    soldCount: 140,
    isFlashDeal: true,
    isTrending: false,
    isBestSeller: true,
    sku: "HNY-RAW-500",
    unit: "500 g",
    description: "Unfiltered and unheated wildflower honey directly from ethical apiaries. Packed with enzymes, antioxidants and a soothing sweet flavor.",
    sizes: ["250 g", "500 g", "1000 g"]
  },

  // --- Electronics & Tech ---
  {
    id: "tech-1",
    name: "Aura Pro Wireless ANC Studio Headphones",
    category: "electronics",
    categoryLabel: "Electronics",
    price: 189.00,
    originalPrice: 249.00,
    discount: 24,
    rating: 4.9,
    reviewsCount: 384,
    badge: "Flash Deal",
    badgeColor: "rose",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    stockCount: 28,
    soldCount: 112,
    isFlashDeal: true,
    isTrending: true,
    isBestSeller: true,
    sku: "TECH-HP-AURA",
    description: "Industry-leading active noise cancellation, 45-hour battery life, immersive spatial audio with head tracking, and memory foam comfort ear cushions.",
    colors: ["#0f172a", "#f8fafc", "#0284c7"],
    sizes: ["Standard", "Pro Kit with Case"]
  },
  {
    id: "tech-2",
    name: "UltraSlim Smart Watch Series 8 GPS + Fitness",
    category: "electronics",
    categoryLabel: "Electronics",
    price: 129.99,
    originalPrice: 179.99,
    discount: 28,
    rating: 4.7,
    reviewsCount: 228,
    badge: "Popular",
    badgeColor: "indigo",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    stockCount: 19,
    soldCount: 78,
    isFlashDeal: false,
    isTrending: true,
    isBestSeller: true,
    sku: "TECH-SW-SER8",
    description: "AMOLED edge-to-edge display with blood oxygen tracking, heart rate monitor, 50m water resistance, and 7-day battery life on a single charge.",
    colors: ["#0f172a", "#cbd5e1", "#f43f5e"],
    sizes: ["40mm", "44mm"]
  },
  {
    id: "tech-3",
    name: "Lumix Portable Magnetic Wireless Power Bank 10,000mAh",
    category: "electronics",
    categoryLabel: "Electronics",
    price: 39.99,
    originalPrice: 55.00,
    discount: 27,
    rating: 4.6,
    reviewsCount: 97,
    badge: "New",
    badgeColor: "sky",
    image: "https://images.unsplash.com/photo-1609592424307-88d447a1c77c?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609592424307-88d447a1c77c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    stockCount: 50,
    soldCount: 35,
    isFlashDeal: false,
    isTrending: false,
    isBestSeller: false,
    sku: "TECH-PB-LUM10",
    description: "Fast 15W wireless snap charging with MagSafe compatibility, 20W PD USB-C fast port, LED battery percentage indicator and aircraft-grade aluminum body.",
    colors: ["#334155", "#e2e8f0"],
    sizes: ["10,000 mAh", "20,000 mAh"]
  },

  // --- Fashion & Apparel ---
  {
    id: "fash-1",
    name: "Minimalist Oversized French Terry Cotton Hoodie",
    category: "fashion",
    categoryLabel: "Fashion & Apparel",
    price: 54.00,
    originalPrice: 75.00,
    discount: 28,
    rating: 4.8,
    reviewsCount: 165,
    badge: "Trending",
    badgeColor: "emerald",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    stockCount: 24,
    soldCount: 92,
    isFlashDeal: true,
    isTrending: true,
    isBestSeller: true,
    sku: "FASH-HD-420",
    description: "Heavyweight 420 GSM French terry cotton with drop shoulder silhouette, kangaroo pocket, ribbed cuffs, and pre-shrunk softness.",
    colors: ["#475569", "#f1f5f9", "#1e293b", "#78350f"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "fash-2",
    name: "Classic Italian Leather Minimalist Sneaker",
    category: "fashion",
    categoryLabel: "Fashion & Apparel",
    price: 110.00,
    originalPrice: 150.00,
    discount: 26,
    rating: 4.9,
    reviewsCount: 312,
    badge: "Premium",
    badgeColor: "amber",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    stockCount: 15,
    soldCount: 130,
    isFlashDeal: false,
    isTrending: true,
    isBestSeller: true,
    sku: "FASH-SNK-ITL",
    description: "Handcrafted full-grain leather low-tops with cushioned Ortholite insoles and durable Margom-inspired rubber cupsole.",
    colors: ["#ffffff", "#0f172a", "#d97706"],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"]
  },
  {
    id: "fash-3",
    name: "Water-Resistant Urban Travel Commuter Backpack 22L",
    category: "fashion",
    categoryLabel: "Fashion & Apparel",
    price: 78.50,
    originalPrice: 99.00,
    discount: 21,
    rating: 4.7,
    reviewsCount: 88,
    badge: "Hot",
    badgeColor: "rose",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    stockCount: 35,
    soldCount: 67,
    isFlashDeal: false,
    isTrending: false,
    isBestSeller: false,
    sku: "FASH-BP-URB22",
    description: "Cordura ballistic nylon backpack with dedicated 16-inch padded laptop sleeve, waterproof YKK zippers, hidden passport pocket, and luggage strap.",
    colors: ["#1e293b", "#334155", "#14532d"],
    sizes: ["22 Liters", "28 Liters (Extended)"]
  },

  // --- Home & Living ---
  {
    id: "home-1",
    name: "Nordic Ceramic Pour-Over Coffee Dripper Set",
    category: "home",
    categoryLabel: "Home & Living",
    price: 42.00,
    originalPrice: 58.00,
    discount: 27,
    rating: 4.9,
    reviewsCount: 114,
    badge: "Eco Choice",
    badgeColor: "emerald",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    stockCount: 22,
    soldCount: 54,
    isFlashDeal: true,
    isTrending: false,
    isBestSeller: true,
    sku: "HME-CF-NDK",
    description: "Matte ceramic dripper with spiral ribbing for uniform brew extraction, heat-resistant borosilicate glass server (600ml), and bamboo coaster.",
    colors: ["#f8fafc", "#1e293b", "#78716c"],
    sizes: ["1-2 Cups", "2-4 Cups"]
  },
  {
    id: "home-2",
    name: "Ultrasonic Aroma Essential Oil Diffuser with Ambient Light",
    category: "home",
    categoryLabel: "Home & Living",
    price: 34.99,
    originalPrice: 48.00,
    discount: 27,
    rating: 4.8,
    reviewsCount: 178,
    badge: "Popular",
    badgeColor: "indigo",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    stockCount: 40,
    soldCount: 90,
    isFlashDeal: false,
    isTrending: true,
    isBestSeller: false,
    sku: "HME-DIF-500",
    description: "Whisper-quiet ultrasonic mist generator with 500ml water capacity, auto shut-off, timer settings, and 7-color soothing ambient night lighting.",
    colors: ["#fafaf9", "#78350f"],
    sizes: ["300 ml", "500 ml"]
  },

  // --- Beauty & Health ---
  {
    id: "beau-1",
    name: "Hydrating Botanical Rosewater Facial Mist & Toner",
    category: "beauty",
    categoryLabel: "Beauty & Health",
    price: 22.00,
    originalPrice: 30.00,
    discount: 26,
    rating: 4.9,
    reviewsCount: 194,
    badge: "Clean Beauty",
    badgeColor: "rose",
    image: "https://images.unsplash.com/photo-1608248597359-54379a29633e?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608248597359-54379a29633e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    stockCount: 38,
    soldCount: 110,
    isFlashDeal: true,
    isTrending: true,
    isBestSeller: true,
    sku: "BEA-ROSE-150",
    unit: "150 ml spray",
    description: "Pure organic Damask rose hydrosol combined with hyaluronic acid and witch hazel. Balances pH, locks in moisture, and instantly refreshes skin.",
    sizes: ["100 ml Travel", "150 ml Regular"]
  },
  {
    id: "beau-2",
    name: "Nourishing Moroccan Argan & Jojoba Hair Elixir 100ml",
    category: "beauty",
    categoryLabel: "Beauty & Health",
    price: 28.50,
    originalPrice: 38.00,
    discount: 25,
    rating: 4.8,
    reviewsCount: 132,
    badge: "Organic",
    badgeColor: "emerald",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    stockCount: 25,
    soldCount: 75,
    isFlashDeal: false,
    isTrending: false,
    isBestSeller: false,
    sku: "BEA-ARGAN-100",
    unit: "100 ml",
    description: "Non-greasy restorative hair serum enriched with vitamin E, argan oil and organic jojoba. Tames frizz, seals split ends, and adds high-gloss shine.",
    sizes: ["50 ml", "100 ml"]
  }
];

const CATEGORIES_DATA = [
  { id: "all", name: "All Categories", icon: "grid", count: 12 },
  { id: "grocery", name: "Groceries & Organic", icon: "shopping-bag", count: 3, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80" },
  { id: "electronics", name: "Electronics & Tech", icon: "cpu", count: 3, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80" },
  { id: "fashion", name: "Fashion & Apparel", icon: "shirt", count: 3, image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80" },
  { id: "home", name: "Home & Living", icon: "home", count: 2, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80" },
  { id: "beauty", name: "Beauty & Health", icon: "sparkles", count: 2, image: "https://images.unsplash.com/photo-1608248597359-54379a29633e?auto=format&fit=crop&w=200&q=80" }
];

const HERO_SLIDES = [
  {
    tag: "SEASONAL SUPER SALE",
    title: "Fresh 100% Organic Groceries to Your Doorstep",
    desc: "Natural farm-picked vegetables, fresh fruits, and premium pantry staples at wholesale discounts with same-day express delivery.",
    badge: "Save Up To 45% Off",
    cta: "Shop Groceries Now",
    categoryTarget: "grocery",
    bgGradient: "from-emerald-950/85 via-emerald-900/60 to-transparent",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80"
  },
  {
    tag: "NEXT-GEN TECH GEAR",
    title: "Elevate Your Sound & Daily Smart Living",
    desc: "Experience high-fidelity wireless audio, sports smartwatches, and cutting-edge mobile gadgets crafted for peak everyday performance.",
    badge: "Exclusive Launch Offer",
    cta: "Explore Tech Deals",
    categoryTarget: "electronics",
    bgGradient: "from-slate-950/90 via-slate-900/60 to-transparent",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80"
  },
  {
    tag: "URBAN ESSENTIALS 2026",
    title: "Contemporary Minimalist Fashion & Streetwear",
    desc: "Curated collection of sustainable organic cotton essentials, tailored jackets, and handcrafted leather footwear.",
    badge: "Trending Collection",
    cta: "Discover Fashion",
    categoryTarget: "fashion",
    bgGradient: "from-stone-950/85 via-stone-900/60 to-transparent",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80"
  }
];

const TESTIMONIALS = [
  {
    name: "Tanvir Hasan",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    comment: "The shopping experience on Storly is buttery smooth! Ordered the organic avocados and headphones, arrived in less than 24 hours with pristine packaging.",
    rating: 5,
    date: "2 days ago"
  },
  {
    name: "Sarah Jenkins",
    role: "Lifestyle Blogger",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    comment: "I love the clean Tailwind design and ease of checkout. The product descriptions and photo quality match exactly what arrived. Highly recommended!",
    rating: 5,
    date: "1 week ago"
  },
  {
    name: "Arif Chowdhury",
    role: "Tech Enthusiast",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    comment: "Best multi-category store I've used. Fast search, instant cart drawer, and the quick view modal makes comparing gadgets super convenient.",
    rating: 5,
    date: "2 weeks ago"
  }
];
