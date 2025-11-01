import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import './index.css';

// Import translations
const translations = {
  en: {
    // Navigation
    products: 'Products',
    insights: 'Industry Insights',
    suppliers: 'Suppliers',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Global Chemical',
    heroMarketplace: 'Marketplace',
    heroDescription: 'Connect with trusted suppliers and discover premium-quality chemicals for your industry needs. Fast, reliable, and secure global transactions.',
    exploreProducts: '🚀 Explore Products',
    industryInsights: '📈 Industry Insights',
    trustedBy: 'Trusted by 5,000+ Chemical Companies Worldwide',
    
    // Stats
    productsCount: '50K+',
    productsLabel: 'Products',
    suppliersCount: '500+',
    suppliersLabel: 'Suppliers',
    countriesCount: '120+',
    countriesLabel: 'Countries',
    satisfactionCount: '99.9%',
    satisfactionLabel: 'Satisfaction',
    
    // Search & Filters
    searchPlaceholder: '🔍 Search 50,000+ chemicals, products, suppliers...',
    allCategories: 'All Categories',
    solvents: 'Solvents',
    inorganic: 'Inorganic Chemicals',
    pharma: 'Pharmaceuticals',
    agro: 'Agrochemicals',
    polymers: 'Polymers',
    
    // Products
    premiumProducts: '🛍️ PREMIUM PRODUCTS',
    productsTitle: 'Premium Chemical Products',
    productsDescription: 'Discover our curated selection of high-purity chemicals from verified global suppliers',
    featured: '⭐ Featured',
    moq: 'MOQ',
    addToCart: '🛒 Add to Cart',
    requestQuote: '💰 Quote',
    viewSupplier: 'View Supplier',
    qualityCertified: '🛡️ Quality Certified',
    globalShipping: '🌍 Global Shipping',
    bulkDiscounts: '📦 Bulk Discounts',
    securePayment: '🔒 Secure Payment',
    noProductsFound: 'No products found',
    resetFilters: '🔄 Reset Filters',
    
    // Blog
    industryIntelligence: '📈 INDUSTRY INTELLIGENCE',
    insightsTitle: 'Chemical Industry Insights',
    insightsDescription: 'Stay ahead with the latest trends, innovations and market analysis from the chemical industry',
    marketTrends: '🔥 Market Trends',
    innovations: '💡 Innovations',
    marketAnalysis: '🌍 Market Analysis',
    readMore: 'Read More',
    subscribeTitle: '📬 Stay Informed',
    subscribeDescription: 'Get weekly insights and market analysis delivered to your inbox',
    subscribe: 'Subscribe',
    
    // Contact & Supplier
    contactTitle: 'Contact Our Sales Team',
    contactDescription: 'Have questions? Our chemical experts are here to help you find the perfect solutions.',
    name: 'Your Name',
    email: 'Your Email',
    message: 'Your Message',
    sendMessage: '📨 Send Message',
    supplierTitle: 'Become a Verified Supplier',
    supplierDescription: 'Join our network of trusted chemical suppliers and reach global customers',
    companyName: 'Company Name',
    businessEmail: 'Business Email',
    phone: 'Phone Number',
    productsSupply: 'Products You Supply',
    companyDescription: 'Company Description',
    submitApplication: '🏢 Submit Application',
    
    // Auth
    welcomeBack: 'Welcome Back',
    signInTo: 'Sign in to your ChemMarket account',
    emailAddress: 'Email Address',
    password: 'Password',
    signIn: '🔐 Sign In',
    signingIn: 'Signing In...',
    noAccount: 'Don\'t have an account?',
    signUpNow: 'Sign up now',
    joinChemMarket: 'Join ChemMarket',
    createAccount: 'Create your account to start trading chemicals',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    createStrongPassword: 'Create a strong password',
    getStarted: '🚀 Get Started',
    creatingAccount: 'Creating Account...',
    haveAccount: 'Already have an account?',
    signInHere: 'Sign in',
    roleBuyer: '🧪 Buyer',
    roleSupplier: '🏭 Supplier',
    roleBoth: '🔄 Both',
    roleDescriptionBuyer: 'Purchase chemicals',
    roleDescriptionSupplier: 'Sell chemicals',
    roleDescriptionBoth: 'Buy and sell',
    
    // User
    welcome: '🎉 Welcome back, {name}!',
    welcomeNew: '🚀 Welcome to ChemMarket, {name}!',
    loggedOut: '👋 You have been logged out successfully.',
    addedToCart: '✅ {product} added to cart!',
    quoteRequested: '📧 Quote request sent for {product}! Our sales team will contact you shortly.',

    // Footer
    footerDescription: 'The world\'s most trusted chemical marketplace. Connecting premium suppliers with quality-focused buyers across 120+ countries.',
    marketplace: 'Marketplace',
    browseProducts: 'Browse Products',
    qualityStandards: 'Quality Standards',
    globalShipping: 'Global Shipping',
    support: 'Support',
    helpCenter: 'Help Center',
    documentation: 'Documentation',
    apiAccess: 'API Access',
    statusPage: 'Status Page',
    company: 'Company',
    aboutUs: 'About Us',
    careers: 'Careers',
    pressKit: 'Press Kit',
    sustainability: 'Sustainability',
    partners: 'Partners',
    copyright: '© 2024 ChemMarket. All rights reserved. | Making chemical trading better. 🌟',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
    compliance: 'Compliance'
  },
  fa: {
    // Navigation - ناوبری
    products: 'محصولات',
    insights: 'اخبار صنعت',
    suppliers: 'تامین کنندگان',
    contact: 'تماس با ما',
    
    // Hero Section - بخش اصلی
    heroTitle: 'بازار جهانی',
    heroMarketplace: 'مواد شیمیایی',
    heroDescription: 'با تامین کنندگان معتبر ارتباط برقرار کنید و مواد شیمیایی با کیفیت بالا برای نیازهای صنعتی خود کشف کنید. معاملات جهانی سریع، قابل اعتماد و امن.',
    exploreProducts: '🚀 مشاهده محصولات',
    industryInsights: '📈 اخبار صنعت',
    trustedBy: 'مورد اعتماد ۵۰۰۰+ شرکت مواد شیمیایی در سراسر جهان',
    
    // Stats - آمار
    productsCount: '۵۰ هزار+',
    productsLabel: 'محصول',
    suppliersCount: '۵۰۰+',
    suppliersLabel: 'تامین کننده',
    countriesCount: '۱۲۰+',
    countriesLabel: 'کشور',
    satisfactionCount: '۹۹.۹٪',
    satisfactionLabel: 'رضایت',
    
    // Search & Filters - جستجو و فیلترها
    searchPlaceholder: '🔍 جستجو در ۵۰,۰۰۰+ مواد شیمیایی، محصولات، تامین کنندگان...',
    allCategories: 'همه دسته‌ها',
    solvents: 'حلال‌ها',
    inorganic: 'مواد شیمیایی معدنی',
    pharma: 'دارویی',
    agro: 'کشاورزی',
    polymers: 'پلیمرها',
    
    // Products - محصولات
    premiumProducts: '🛍️ محصولات ویژه',
    productsTitle: 'محصولات شیمیایی ممتاز',
    productsDescription: 'انتخابی دستچین شده از مواد شیمیایی با خلوص بالا از تامین کنندگان معتبر جهانی را کشف کنید',
    featured: '⭐ ویژه',
    moq: 'حداقل سفارش',
    addToCart: '🛒 افزودن به سبد',
    requestQuote: '💰 استعلام قیمت',
    viewSupplier: 'مشاهده تامین کننده',
    qualityCertified: '🛡️ گواهی کیفیت',
    globalShipping: '🌍 ارسال جهانی',
    bulkDiscounts: '📦 تخفیف عمده',
    securePayment: '🔒 پرداخت امن',
    noProductsFound: 'محصولی یافت نشد',
    resetFilters: '🔄 بازنشانی فیلترها',
    
    // Blog - وبلاگ
    industryIntelligence: '📈 اخبار صنعت',
    insightsTitle: 'بینش‌های صنعت شیمی',
    insightsDescription: 'با آخرین روندها، نوآوری‌ها و تحلیل‌های بازار از صنعت شیمی به روز بمانید',
    marketTrends: '🔥 روندهای بازار',
    innovations: '💡 نوآوری‌ها',
    marketAnalysis: '🌍 تحلیل بازار',
    readMore: 'مطالعه بیشتر',
    subscribeTitle: '📬 informed بمانید',
    subscribeDescription: 'تحلیل‌های هفتگی بازار و بینش‌ها را در ایمیل خود دریافت کنید',
    subscribe: 'عضویت',
    
    // Contact & Supplier - تماس و تامین کننده
    contactTitle: 'با تیم فروش ما تماس بگیرید',
    contactDescription: 'سوالی دارید؟ متخصصان شیمی ما اینجا هستند تا به شما در یافتن راه‌حل‌های کامل کمک کنند.',
    name: 'نام شما',
    email: 'ایمیل شما',
    message: 'پیام شما',
    sendMessage: '📨 ارسال پیام',
    supplierTitle: 'یک تامین کننده تایید شده شوید',
    supplierDescription: 'به شبکه تامین کنندگان معتبر مواد شیمیایی ما بپیوندید و به مشتریان جهانی دسترسی پیدا کنید',
    companyName: 'نام شرکت',
    businessEmail: 'ایمیل تجاری',
    phone: 'شماره تلفن',
    productsSupply: 'محصولات عرضه شده',
    companyDescription: 'توضیحات شرکت',
    submitApplication: '🏢 ارسال درخواست',
    
    // Auth - احراز هویت
    welcomeBack: 'خوش آمدید',
    signInTo: 'به حساب ChemMarket خود وارد شوید',
    emailAddress: 'آدرس ایمیل',
    password: 'رمز عبور',
    signIn: '🔐 ورود',
    signingIn: 'در حال ورود...',
    noAccount: 'حساب کاربری ندارید؟',
    signUpNow: 'همین حالا ثبت نام کنید',
    joinChemMarket: 'به ChemMarket بپیوندید',
    createAccount: 'حساب کاربری خود را ایجاد کنید تا معاملات شیمیایی را شروع کنید',
    fullName: 'نام کامل',
    confirmPassword: 'تکرار رمز عبور',
    createStrongPassword: 'یک رمز عبور قوی ایجاد کنید',
    getStarted: '🚀 شروع کنید',
    creatingAccount: 'در حال ایجاد حساب...',
    haveAccount: 'قبلاً حساب کاربری دارید؟',
    signInHere: 'وارد شوید',
    roleBuyer: '🧪 خریدار',
    roleSupplier: '🏭 تامین کننده',
    roleBoth: '🔄 هر دو',
    roleDescriptionBuyer: 'خرید مواد شیمیایی',
    roleDescriptionSupplier: 'فروش مواد شیمیایی',
    roleDescriptionBoth: 'خرید و فروش',
    
    // User - کاربر
    welcome: '🎉 خوش آمدید, {name}!',
    welcomeNew: '🚀 به ChemMarket خوش آمدید, {name}!',
    loggedOut: '👋 با موفقیت از سیستم خارج شدید.',
    addedToCart: '✅ {product} به سبد خرید اضافه شد!',
    quoteRequested: '📧 درخواست استعلام قیمت برای {product} ارسال شد! تیم فروش ما به زودی با شما تماس خواهد گرفت.',
    
    // Footer - پاورقی
    footerDescription: 'مورد اعتمادترین بازار مواد شیمیایی جهان. ارتباط تامین کنندگان ممتاز با خریداران متمرکز بر کیفیت در ۱۲۰+ کشور.',
    marketplace: 'بازار',
    browseProducts: 'مرور محصولات',
    qualityStandards: 'استانداردهای کیفیت',
    globalShipping: 'ارسال جهانی',
    support: 'پشتیبانی',
    helpCenter: 'مرکز راهنما',
    documentation: 'مستندات',
    apiAccess: 'دسترسی API',
    statusPage: 'صفحه وضعیت',
    company: 'شرکت',
    aboutUs: 'درباره ما',
    careers: 'فرصت‌های شغلی',
    pressKit: 'کیت مطبوعاتی',
    sustainability: 'پایداری',
    partners: 'شرکا',
    copyright: '© 2024 ChemMarket. تمام حقوق محفوظ است. | ساختن تجارت مواد شیمیایی بهتر. 🌟',
    privacyPolicy: 'سیاست حفظ حریم خصوصی',
    termsOfService: 'شرایط استفاده از خدمات',
    cookiePolicy: 'سیاست کوکی',
    compliance: 'انطباق'
  }
};

// API Base URL
const API_BASE = 'http://localhost:5000/api';

// API Utility Functions
const api = {
  healthCheck: async () => {
    const response = await fetch(`${API_BASE}/health`);
    return response.json();
  },
  register: async (userData) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },
  login: async (credentials) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },
  getProducts: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE}/products?${queryParams}`);
    return response.json();
  },
  getCategories: async () => {
    const response = await fetch(`${API_BASE}/categories`);
    return response.json();
  },
  addToCart: async (productId, quantity, token) => {
    const response = await fetch(`${API_BASE}/cart`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ productId, quantity })
    });
    return response.json();
  },
  toggleFavorite: async (productId, token) => {
    const response = await fetch(`${API_BASE}/favorites`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ productId })
    });
    return response.json();
  },
  submitContact: async (contactData) => {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    return response.json();
  },
  registerSupplier: async (supplierData) => {
    const response = await fetch(`${API_BASE}/suppliers/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(supplierData)
    });
    return response.json();
  }
};

// Google Translate Component
const GoogleTranslate = () => {
  useEffect(() => {
    // Load Google Translate script
    const scriptId = 'google-translate-script';
    
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    }

    // Define the callback function globally
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'fa',
          includedLanguages: 'en,fa,ar,es,fr,de,it,zh-CN,ru,ja,ko,tr,hi',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          gaTrack: true,
        }, 'google_translate_element');
      }
    };

    // Cleanup function
    return () => {
      if (window.googleTranslateElementInit) {
        delete window.googleTranslateElementInit;
      }
    };
  }, []);

  return (
    <div 
      id="google_translate_element" 
      style={{ 
        display: 'inline-block',
        margin: '0 var(--space-2)',
        verticalAlign: 'middle'
      }}
    />
  );
};

function App() {
  // Language state
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);

  // Update RTL when language changes
  useEffect(() => {
    const isPersian = currentLanguage === 'fa';
    setIsRTL(isPersian);
    document.documentElement.dir = isPersian ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    
    // Add/remove persian-lang class to body
    if (isPersian) {
      document.body.classList.add('persian-lang');
    } else {
      document.body.classList.remove('persian-lang');
    }
  }, [currentLanguage]);

  // Get current translations
  const t = useMemo(() => translations[currentLanguage], [currentLanguage]);

  // Toggle language function
  const toggleLanguage = useCallback(() => {
    setCurrentLanguage(prev => prev === 'en' ? 'fa' : 'en');
  }, []);

  // Language Switcher Component
  const LanguageSwitcher = useCallback(() => (
    <button 
      className="language-switcher"
      onClick={toggleLanguage}
      aria-label={currentLanguage === 'en' ? 'Switch to Persian' : 'Switch to English'}
    >
      <span className="language-flag">
        {currentLanguage === 'en' ? '🇮🇷' : '🇺🇸'}
      </span>
      <span className="language-text">
        {currentLanguage === 'en' ? 'فارسی' : 'English'}
      </span>
    </button>
  ), [currentLanguage, toggleLanguage]);

  // Application states
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [supplierForm, setSupplierForm] = useState({ companyName: '', email: '', phone: '', products: '', description: '' });
  const [activeNav, setActiveNav] = useState('products');
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeBlogTab, setActiveBlogTab] = useState('trends');
  
  // Authentication States
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ 
    fullName: '', 
    email: '', 
    password: '', 
    company: '', 
    role: 'buyer' 
  });

  // Data States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Search debouncing ref
  const searchTimeoutRef = useRef(null);

  // Handle search input with debouncing
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set new timeout to update searchTerm after delay
    searchTimeoutRef.current = setTimeout(() => {
      setSearchTerm(value);
    }, 300); // 300ms delay
  };

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Static fallback data
  const staticProducts = [
    {
      id: 1,
      name: currentLanguage === 'en' ? 'Acetone 99.5% Ultra Pure' : 'استون ۹۹.۵٪ فوق خالص',
      category: 'solvents',
      supplier: 'ChemSupply Global Inc.',
      price: 45.00,
      unit: currentLanguage === 'en' ? '20L drum' : 'ظرف ۲۰ لیتری',
      rating: 4.8,
      reviews: 124,
      featured: true,
      delivery: currentLanguage === 'en' ? '24h Express' : 'ارسال اکسپرس ۲۴ ساعته',
      purity: '99.9%',
      moq: currentLanguage === 'en' ? '5 drums' : '۵ ظرف',
      inStock: true,
      description: currentLanguage === 'en' 
        ? 'High-purity acetone suitable for laboratory and industrial use.'
        : 'استون با خلوص بالا مناسب برای استفاده آزمایشگاهی و صنعتی.',
      image: '🧪',
      supplierWebsite: 'https://chemsupply.com',
      safetyData: 'Available',
      certifications: ['ISO 9001', 'GMP']
    },
    {
      id: 2,
      name: currentLanguage === 'en' ? 'Sodium Hydroxide Pearl' : 'سود سوزآور مرواریدی',
      category: 'inorganic',
      supplier: 'BaseChem Laboratories',
      price: 28.50,
      unit: currentLanguage === 'en' ? '25kg bag' : 'کیسه ۲۵ کیلویی',
      rating: 4.6,
      reviews: 89,
      delivery: currentLanguage === 'en' ? '48h Standard' : 'ارسال استاندارد ۴۸ ساعته',
      purity: '99%',
      moq: currentLanguage === 'en' ? '10 bags' : '۱۰ کیسه',
      inStock: true,
      description: currentLanguage === 'en' 
        ? 'Sodium hydroxide pearls for various industrial applications.'
        : 'سود سوزآور مرواریدی برای کاربردهای صنعتی مختلف.',
      image: '⚗️',
      supplierWebsite: 'https://basechemlabs.com',
      safetyData: 'Available',
      certifications: ['ISO 14001']
    },
    {
      id: 3,
      name: currentLanguage === 'en' ? 'Ethanol Absolute 99.9%' : 'اتانول مطلق ۹۹.۹٪',
      category: 'solvents',
      supplier: 'PureChem Solutions',
      price: 62.00,
      unit: currentLanguage === 'en' ? '10L bottle' : 'بطری ۱۰ لیتری',
      rating: 4.9,
      reviews: 156,
      featured: true,
      delivery: currentLanguage === 'en' ? '24h Express' : 'ارسال اکسپرس ۲۴ ساعته',
      purity: '99.9%',
      moq: currentLanguage === 'en' ? '3 bottles' : '۳ بطری',
      inStock: true,
      description: currentLanguage === 'en' 
        ? 'Absolute ethanol for pharmaceutical and research applications.'
        : 'اتانول مطلق برای کاربردهای دارویی و تحقیقاتی.',
      image: '🧴',
      supplierWebsite: 'https://purechemsolutions.com',
      safetyData: 'Available',
      certifications: ['USP', 'Ph Eur']
    },
    {
      id: 4,
      name: currentLanguage === 'en' ? 'Polyethylene Granules' : 'دانه‌های پلی اتیلن',
      category: 'polymers',
      supplier: 'PolymerTech Global',
      price: 1.25,
      unit: currentLanguage === 'en' ? 'per kg' : 'به ازای هر کیلو',
      rating: 4.4,
      reviews: 67,
      delivery: currentLanguage === 'en' ? '72h Standard' : 'ارسال استاندارد ۷۲ ساعته',
      purity: '99.5%',
      moq: currentLanguage === 'en' ? '1000 kg' : '۱۰۰۰ کیلو',
      inStock: true,
      description: currentLanguage === 'en' 
        ? 'High-quality polyethylene granules for manufacturing.'
        : 'دانه‌های پلی اتیلن با کیفیت بالا برای تولید.',
      image: '🔗',
      supplierWebsite: 'https://polymertech.com',
      safetyData: 'Available',
      certifications: ['FDA', 'ISO 9001']
    }
  ];

  const staticBlogPosts = {
    trends: [
      {
        id: 1,
        title: currentLanguage === 'en' 
          ? 'Green Chemistry Revolution: Sustainable Alternatives Gaining Market Share'
          : 'انقلاب شیمی سبز: جایگزین‌های پایدار در حال کسب سهم بازار',
        excerpt: currentLanguage === 'en'
          ? 'Bio-based chemicals projected to capture 25% of market by 2025 as companies prioritize sustainability.'
          : 'پیش‌بینی می‌شود مواد شیمیایی زیست‌پایه تا سال ۲۰۲۵، ۲۵٪ از بازار را به خود اختصاص دهند.',
        image: '🌿',
        category: currentLanguage === 'en' ? 'Sustainability' : 'پایداری',
        date: '2024-01-15',
        readTime: currentLanguage === 'en' ? '4 min read' : '۴ دقیقه مطالعه',
        author: currentLanguage === 'en' ? 'Dr. Sarah Chen' : 'دکتر سارا چن',
        authorRole: currentLanguage === 'en' ? 'Sustainability Expert' : 'متخصص پایداری',
        trending: true,
        views: '2.4K'
      },
      {
        id: 2,
        title: currentLanguage === 'en' 
          ? 'Digital Transformation in Chemical Supply Chain'
          : 'تحول دیجیتال در زنجیره تامین مواد شیمیایی',
        excerpt: currentLanguage === 'en'
          ? 'Blockchain and AI are revolutionizing chemical logistics and quality control processes.'
          : 'بلاکچین و هوش مصنوعی در حال متحول کردن لجستیک مواد شیمیایی و فرآیندهای کنترل کیفیت هستند.',
        image: '🤖',
        category: currentLanguage === 'en' ? 'Technology' : 'فناوری',
        date: '2024-01-12',
        readTime: currentLanguage === 'en' ? '6 min read' : '۶ دقیقه مطالعه',
        author: currentLanguage === 'en' ? 'Mike Rodriguez' : 'مایک رودریگز',
        authorRole: currentLanguage === 'en' ? 'Tech Analyst' : 'تحلیلگر فناوری',
        trending: true,
        views: '1.8K'
      }
    ],
    innovations: [
      {
        id: 1,
        title: currentLanguage === 'en' 
          ? 'Breakthrough in Catalyst Technology Boosts Efficiency'
          : 'پیشرفت در فناوری کاتالیزور باعث افزایش کارایی می‌شود',
        excerpt: currentLanguage === 'en'
          ? 'New catalyst design reduces energy consumption by 40% in key industrial processes.'
          : 'طرح جدید کاتالیزور مصرف انرژی را در فرآیندهای صنعتی کلیدی ۴۰٪ کاهش می‌دهد.',
        image: '⚡',
        category: currentLanguage === 'en' ? 'Innovation' : 'نوآوری',
        date: '2024-01-10',
        readTime: currentLanguage === 'en' ? '5 min read' : '۵ دقیقه مطالعه',
        author: currentLanguage === 'en' ? 'Dr. Emily Watson' : 'دکتر امیلی واتسون',
        authorRole: currentLanguage === 'en' ? 'Research Director' : 'مدیر تحقیقات',
        trending: false,
        views: '1.2K'
      }
    ],
    market: [
      {
        id: 1,
        title: currentLanguage === 'en' 
          ? 'Asia-Pacific Chemical Market Growth Outlook 2024'
          : 'چشم‌انداز رشد بازار مواد شیمیایی آسیا-اقیانوسیه ۲۰۲۴',
        excerpt: currentLanguage === 'en'
          ? 'China and India lead regional expansion with 8.2% projected growth rate.'
          : 'چین و هند با نرخ رشد پیش‌بینی شده ۸.۲٪ پیشتاز گسترش منطقه‌ای هستند.',
        image: '📊',
        category: currentLanguage === 'en' ? 'Market Analysis' : 'تحلیل بازار',
        date: '2024-01-08',
        readTime: currentLanguage === 'en' ? '7 min read' : '۷ دقیقه مطالعه',
        author: currentLanguage === 'en' ? 'James Kim' : 'جیمز کیم',
        authorRole: currentLanguage === 'en' ? 'Market Analyst' : 'تحلیلگر بازار',
        trending: false,
        views: '980'
      }
    ]
  };

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        const health = await api.healthCheck();
        console.log('✅ Backend connected:', health);

        const productsResult = await api.getProducts();
        setProducts(productsResult.products || staticProducts);

        const categoriesResult = await api.getCategories();
        setCategories(categoriesResult || []);
      } catch (error) {
        console.error('❌ Backend connection failed, using static data:', error);
        setProducts(staticProducts);
        setCategories([
          { id: 'all', name: t.allCategories, count: staticProducts.length },
          { id: 'solvents', name: t.solvents, count: staticProducts.filter(p => p.category === 'solvents').length },
          { id: 'inorganic', name: t.inorganic, count: staticProducts.filter(p => p.category === 'inorganic').length },
          { id: 'pharma', name: t.pharma, count: staticProducts.filter(p => p.category === 'pharma').length },
          { id: 'agro', name: t.agro, count: staticProducts.filter(p => p.category === 'agro').length },
          { id: 'polymers', name: t.polymers, count: staticProducts.filter(p => p.category === 'polymers').length },
        ]);
      }
    };

    initializeData();
  }, [currentLanguage, t]);

  // Filter products when category or search term changes
  useEffect(() => {
    const loadFilteredProducts = async () => {
      setLoading(true);
      try {
        const filters = {};
        if (selectedCategory !== 'all') filters.category = selectedCategory;
        if (searchTerm) filters.search = searchTerm;
        
        const result = await api.getProducts(filters);
        setProducts(result.products || []);
      } catch (error) {
        console.error('Failed to load filtered products, using client-side filtering:', error);
        let filteredProducts = staticProducts;
        
        if (selectedCategory !== 'all') {
          filteredProducts = filteredProducts.filter(product => 
            product.category === selectedCategory
          );
        }
        
        if (searchTerm) {
          filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        setProducts(filteredProducts);
      } finally {
        setLoading(false);
      }
    };

    loadFilteredProducts();
  }, [selectedCategory, searchTerm, currentLanguage]);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Authentication Functions
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await api.login(loginForm);
      
      if (result.error) {
        alert(`Login failed: ${result.error}`);
        return;
      }

      const userData = {
        name: result.user.name,
        email: result.user.email,
        company: result.user.company,
        role: result.user.role,
        token: result.token
      };
      
      setUser(userData);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '' });
      alert(t.welcome.replace('{name}', userData.name));
    } catch (error) {
      alert(currentLanguage === 'en' 
        ? 'Login failed. Please check your connection and try again.'
        : 'ورود ناموفق بود. لطفاً اتصال خود را بررسی کرده و دوباره تلاش کنید.'
      );
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await api.register(signupForm);
      
      if (result.error) {
        alert(`Registration failed: ${result.error}`);
        return;
      }

      const userData = {
        name: result.user.name,
        email: result.user.email,
        company: result.user.company,
        role: result.user.role,
        token: result.token
      };
      
      setUser(userData);
      setIsLoggedIn(true);
      setShowSignupModal(false);
      setSignupForm({ 
        fullName: '', 
        email: '', 
        password: '', 
        company: '', 
        role: 'buyer' 
      });
      alert(t.welcomeNew.replace('{name}', userData.name));
    } catch (error) {
      alert(currentLanguage === 'en'
        ? 'Registration failed. Please try again.'
        : 'ثبت نام ناموفق بود. لطفاً دوباره تلاش کنید.'
      );
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCartItems([]);
    setFavorites([]);
    alert(t.loggedOut);
  };

  const handleGetStarted = () => {
    setShowSignupModal(true);
  };

  const handleSignIn = () => {
    setShowLoginModal(true);
  };

  // Interactive Functions
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.submitContact(contactForm);
      alert(currentLanguage === 'en'
        ? 'Thank you for your message! We will get back to you soon.'
        : 'با تشکر از پیام شما! به زودی با شما تماس خواهیم گرفت.'
      );
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      alert(currentLanguage === 'en'
        ? 'Thank you for your message! We will get back to you soon.'
        : 'با تشکر از پیام شما! به زودی با شما تماس خواهیم گرفت.'
      );
      setContactForm({ name: '', email: '', message: '' });
    }
  };

  const handleSupplierRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await api.registerSupplier(supplierForm);
      alert(currentLanguage === 'en'
        ? 'Thank you for your interest! Our team will contact you shortly.'
        : 'با تشکر از ابراز علاقه شما! تیم ما به زودی با شما تماس خواهد گرفت.'
      );
      setSupplierForm({ companyName: '', email: '', phone: '', products: '', description: '' });
    } catch (error) {
      alert(currentLanguage === 'en'
        ? 'Thank you for your interest! Our team will contact you shortly.'
        : 'با تشکر از ابراز علاقه شما! تیم ما به زودی با شما تماس خواهد گرفت.'
      );
      setSupplierForm({ companyName: '', email: '', phone: '', products: '', description: '' });
    }
  };

  const addToCart = async (product) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    try {
      const result = await api.addToCart(product.id, 1, user.token);
      setCartItems(prev => [...prev, product]);
      alert(t.addedToCart.replace('{product}', product.name));
    } catch (error) {
      setCartItems(prev => [...prev, product]);
      alert(t.addedToCart.replace('{product}', product.name));
    }
  };

  const toggleFavorite = async (productId) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    try {
      const result = await api.toggleFavorite(productId, user.token);
      setFavorites(prev => 
        prev.includes(productId) 
          ? prev.filter(id => id !== productId)
          : [...prev, productId]
      );
    } catch (error) {
      setFavorites(prev => 
        prev.includes(productId) 
          ? prev.filter(id => id !== productId)
          : [...prev, productId]
      );
    }
  };

  const requestQuote = (product) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    alert(t.quoteRequested.replace('{product}', product.name));
  };

  const viewSupplier = (website) => {
    window.open(website, '_blank');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Authentication Modals
  const LoginModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      display: showLoginModal ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 'var(--space-6)'
    }}>
      <div style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--space-8)',
        maxWidth: '450px',
        width: '100%',
        boxShadow: 'var(--shadow-2xl)',
        position: 'relative',
        animation: 'fadeInUp 0.5s var(--ease-out)'
      }}>
        <button
          onClick={() => setShowLoginModal(false)}
          style={{
            position: 'absolute',
            top: 'var(--space-4)',
            [isRTL ? 'left' : 'right']: 'var(--space-4)',
            background: 'var(--gray-100)',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 'var(--text-lg)',
            transition: 'all 0.3s var(--ease-out)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--accent-500)';
            e.target.style.color = 'var(--white)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'var(--gray-100)';
            e.target.style.color = 'inherit';
          }}
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h3 style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: '800',
            marginBottom: 'var(--space-2)',
            color: 'var(--gray-900)'
          }}>
            {t.welcomeBack}
          </h3>
          <p style={{
            color: 'var(--gray-600)',
            fontSize: 'var(--text-base)'
          }}>
            {t.signInTo}
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-6)'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                marginBottom: 'var(--space-2)',
                color: 'var(--gray-700)'
              }}>
                {t.emailAddress}
              </label>
              <input
                type="email"
                placeholder={currentLanguage === 'en' ? 'Enter your email' : 'ایمیل خود را وارد کنید'}
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                marginBottom: 'var(--space-2)',
                color: 'var(--gray-700)'
              }}>
                {t.password}
              </label>
              <input
                type="password"
                placeholder={currentLanguage === 'en' ? 'Enter your password' : 'رمز عبور خود را وارد کنید'}
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                style={{
                  width: '100%',
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: 'var(--space-4)' }}
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{ animation: 'spin 1s linear infinite' }}>⏳</div>
                {t.signingIn}
              </span>
            ) : (
              t.signIn
            )}
          </button>

          <div className="text-center">
            <p style={{
              color: 'var(--gray-600)',
              fontSize: 'var(--text-sm)',
              marginBottom: 'var(--space-4)'
            }}>
              {t.noAccount}{' '}
              <button
                type="button"
                onClick={() => {
                  setShowLoginModal(false);
                  setShowSignupModal(true);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-600)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {t.signUpNow}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );

  const SignupModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      display: showSignupModal ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 'var(--space-6)'
    }}>
      <div style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--space-8)',
        maxWidth: '500px',
        width: '100%',
        boxShadow: 'var(--shadow-2xl)',
        position: 'relative',
        animation: 'fadeInUp 0.5s var(--ease-out)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <button
          onClick={() => setShowSignupModal(false)}
          style={{
            position: 'absolute',
            top: 'var(--space-4)',
            [isRTL ? 'left' : 'right']: 'var(--space-4)',
            background: 'var(--gray-100)',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 'var(--text-lg)',
            transition: 'all 0.3s var(--ease-out)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--accent-500)';
            e.target.style.color = 'var(--white)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'var(--gray-100)';
            e.target.style.color = 'inherit';
          }}
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h3 style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: '800',
            marginBottom: 'var(--space-2)',
            color: 'var(--gray-900)'
          }}>
            {t.joinChemMarket}
          </h3>
          <p style={{
            color: 'var(--gray-600)',
            fontSize: 'var(--text-base)'
          }}>
            {t.createAccount}
          </p>
        </div>

        <form onSubmit={handleSignup}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-6)'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                marginBottom: 'var(--space-2)',
                color: 'var(--gray-700)'
              }}>
                {t.fullName}
              </label>
              <input
                type="text"
                placeholder={currentLanguage === 'en' ? 'Enter your full name' : 'نام کامل خود را وارد کنید'}
                value={signupForm.fullName}
                onChange={(e) => setSignupForm({...signupForm, fullName: e.target.value})}
                style={{
                  width: '100%',
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                marginBottom: 'var(--space-2)',
                color: 'var(--gray-700)'
              }}>
                {t.emailAddress}
              </label>
              <input
                type="email"
                placeholder={currentLanguage === 'en' ? 'Enter your business email' : 'ایمیل تجاری خود را وارد کنید'}
                value={signupForm.email}
                onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                marginBottom: 'var(--space-2)',
                color: 'var(--gray-700)'
              }}>
                {t.password}
              </label>
              <input
                type="password"
                placeholder={currentLanguage === 'en' ? 'Create a strong password' : 'یک رمز عبور قوی ایجاد کنید'}
                value={signupForm.password}
                onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                style={{
                  width: '100%',
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                marginBottom: 'var(--space-2)',
                color: 'var(--gray-700)'
              }}>
                {currentLanguage === 'en' ? 'Company Name' : 'نام شرکت'}
              </label>
              <input
                type="text"
                placeholder={currentLanguage === 'en' ? 'Enter your company name' : 'نام شرکت خود را وارد کنید'}
                value={signupForm.company}
                onChange={(e) => setSignupForm({...signupForm, company: e.target.value})}
                style={{
                  width: '100%',
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                marginBottom: 'var(--space-2)',
                color: 'var(--gray-700)'
              }}>
                {currentLanguage === 'en' ? 'I am a:' : 'من یک:'}
              </label>
              <div style={{
                display: 'flex',
                gap: 'var(--space-4)',
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                {[
                  { value: 'buyer', label: t.roleBuyer, description: t.roleDescriptionBuyer },
                  { value: 'supplier', label: t.roleSupplier, description: t.roleDescriptionSupplier },
                  { value: 'both', label: t.roleBoth, description: t.roleDescriptionBoth }
                ].map((option) => (
                  <label key={option.value} style={{
                    flex: 1,
                    border: `2px solid ${signupForm.role === option.value ? 'var(--primary-500)' : 'var(--gray-300)'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-4)',
                    cursor: 'pointer',
                    transition: 'all 0.3s var(--ease-out)',
                    background: signupForm.role === option.value ? 'var(--primary-50)' : 'var(--white)',
                    textAlign: 'center'
                  }}>
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={signupForm.role === option.value}
                      onChange={(e) => setSignupForm({...signupForm, role: e.target.value})}
                      style={{ display: 'none' }}
                    />
                    <div>
                      <div style={{
                        fontWeight: '600',
                        marginBottom: 'var(--space-1)',
                        color: 'var(--gray-900)'
                      }}>
                        {option.label}
                      </div>
                      <div style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--gray-600)'
                      }}>
                        {option.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: 'var(--space-4)' }}
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{ animation: 'spin 1s linear infinite' }}>⏳</div>
                {t.creatingAccount}
              </span>
            ) : (
              t.getStarted
            )}
          </button>

          <div className="text-center">
            <p style={{
              color: 'var(--gray-600)',
              fontSize: 'var(--text-sm)',
              marginBottom: 'var(--space-4)'
            }}>
              {t.haveAccount}{' '}
              <button
                type="button"
                onClick={() => {
                  setShowSignupModal(false);
                  setShowLoginModal(true);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-600)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {t.signInHere}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );

  // Header Component
  const Header = useCallback(() => (
    <header style={{
      background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'var(--white)',
      backdropFilter: 'blur(20px)',
      borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid var(--gray-200)',
      padding: 'var(--space-4) 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'all 0.4s var(--ease-out)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }}>
          <div 
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--accent-500) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              cursor: 'pointer',
              transition: 'all 0.3s var(--ease-out)'
            }} 
            className="animate-pulse-slow"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ChemMarket
          </div>

          <nav style={{
            display: 'flex',
            gap: 'var(--space-6)',
            alignItems: 'center',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            {[
              { id: 'products', name: t.products },
              { id: 'blog', name: t.insights },
              { id: 'suppliers', name: t.suppliers },
              { id: 'contact', name: t.contact }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  scrollToSection(item.id);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeNav === item.id ? 'var(--primary-600)' : 'var(--gray-700)',
                  fontWeight: '500',
                  fontSize: 'var(--text-sm)',
                  padding: 'var(--space-2) var(--space-3)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'all 0.3s var(--ease-out)',
                  cursor: 'pointer',
                  position: 'relative',
                  fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
                }}
                onMouseEnter={(e) => {
                  if (activeNav !== item.id) {
                    e.target.style.color = 'var(--primary-600)';
                    e.target.style.background = 'var(--primary-50)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeNav !== item.id) {
                    e.target.style.color = 'var(--gray-700)';
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {item.name}
                {activeNav === item.id && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '2px',
                    background: 'var(--primary-500)',
                    borderRadius: 'var(--radius-sm)'
                  }}></div>
                )}
              </button>
            ))}
          </nav>

          <div style={{
            display: 'flex',
            gap: 'var(--space-4)',
            alignItems: 'center',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            {/* GOOGLE TRANSLATE COMPONENT */}
            <GoogleTranslate />
            
            {/* LANGUAGE SWITCHER */}
            <LanguageSwitcher />
            
            {isLoggedIn ? (
              <>
                <div style={{
                  position: 'relative',
                  cursor: 'pointer',
                  padding: 'var(--space-2)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'all 0.3s var(--ease-out)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--primary-50)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}>
                  ❤️
                  {favorites.length > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-2px',
                      [isRTL ? 'left' : 'right']: '-2px',
                      background: 'var(--accent-500)',
                      color: 'var(--white)',
                      borderRadius: '50%',
                      width: '16px',
                      height: '16px',
                      fontSize: 'var(--text-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}>
                      {favorites.length}
                    </span>
                  )}
                </div>
                
                <div style={{
                  position: 'relative',
                  cursor: 'pointer',
                  padding: 'var(--space-2)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'all 0.3s var(--ease-out)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--primary-50)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}>
                  🛒
                  {cartItems.length > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-2px',
                      [isRTL ? 'left' : 'right']: '-2px',
                      background: 'var(--accent-500)',
                      color: 'var(--white)',
                      borderRadius: '50%',
                      width: '16px',
                      height: '16px',
                      fontSize: 'var(--text-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}>
                      {cartItems.length}
                    </span>
                  )}
                </div>

                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-2) var(--space-3)',
                  background: 'var(--primary-50)',
                  borderRadius: 'var(--radius-xl)',
                  cursor: 'pointer',
                  transition: 'all 0.3s var(--ease-out)',
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--primary-100)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'var(--primary-50)';
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--white)',
                    fontWeight: '600',
                    fontSize: 'var(--text-sm)'
                  }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: '600',
                    color: 'var(--gray-700)'
                  }}>
                    {user?.name}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-secondary"
                    style={{
                      padding: 'var(--space-2) var(--space-4)',
                      fontSize: 'var(--text-sm)'
                    }}
                  >
                    {currentLanguage === 'en' ? 'Logout' : 'خروج'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <button 
                  className="btn btn-secondary" 
                  style={{
                    padding: 'var(--space-3) var(--space-6)'
                  }}
                  onClick={handleSignIn}
                >
                  {currentLanguage === 'en' ? 'Sign In' : 'ورود'}
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleGetStarted}
                >
                  {t.getStarted}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  ), [isRTL, isScrolled, activeNav, isLoggedIn, user, favorites, cartItems, t, currentLanguage]);

  // Hero Component
  const Hero = () => (
    <section style={{
      background: `linear-gradient(135deg, rgba(41, 59, 95, 0.85) 0%, rgba(41, 59, 95, 0.9) 100%), url("/images/chemical-logistics.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: 'var(--white)',
      padding: 'var(--space-20) 0 var(--space-16)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        fontSize: 'var(--text-3xl)',
        opacity: 0.2,
        animation: 'float-slow 10s ease-in-out infinite'
      }}>⚗️</div>
      
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '8%',
        fontSize: 'var(--text-3xl)',
        opacity: 0.2,
        animation: 'float-slow 12s ease-in-out infinite 2s'
      }}>🧪</div>

      <div className="container">
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            padding: 'var(--space-2) var(--space-4)',
            borderRadius: 'var(--radius-2xl)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: 'var(--text-sm)',
            fontWeight: '500',
            marginBottom: 'var(--space-8)',
            animation: 'fadeInUp 0.8s var(--ease-out)',
            color: 'var(--white)',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              background: 'var(--emerald-500)',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}></span>
            {t.trustedBy}
          </div>

          <h1 style={{
            fontSize: 'var(--text-5xl)',
            fontWeight: '800',
            marginBottom: 'var(--space-6)',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, var(--white) 0%, rgba(255,255,255,0.9) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'fadeInUp 0.8s var(--ease-out) 0.2s both',
            fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
          }}>
            {t.heroTitle}
            <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-500) 0%, #ff6b35 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {t.heroMarketplace}
            </span>
          </h1>

          <p style={{
            fontSize: 'var(--text-xl)',
            opacity: 0.9,
            marginBottom: 'var(--space-8)',
            lineHeight: '1.6',
            animation: 'fadeInUp 0.8s var(--ease-out) 0.4s both',
            color: 'var(--white)',
            fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
          }}>
            {t.heroDescription}
          </p>

          <div style={{
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.8s var(--ease-out) 0.6s both',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            <button 
              className="btn btn-primary" 
              style={{
                padding: 'var(--space-5) var(--space-10)',
                fontSize: 'var(--text-lg)'
              }}
              onClick={() => scrollToSection('products')}
            >
              {t.exploreProducts}
            </button>
            <button 
              className="btn btn-secondary" 
              style={{
                padding: 'var(--space-5) var(--space-10)',
                fontSize: 'var(--text-lg)',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'var(--white)'
              }}
              onClick={() => scrollToSection('blog')}
            >
              {t.industryInsights}
            </button>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-8)',
            marginTop: 'var(--space-12)',
            animation: 'fadeInUp 0.8s var(--ease-out) 0.8s both',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            {[
              { number: t.productsCount, label: t.productsLabel },
              { number: t.suppliersCount, label: t.suppliersLabel },
              { number: t.countriesCount, label: t.countriesLabel },
              { number: t.satisfactionCount, label: t.satisfactionLabel }
            ].map((stat, index) => (
              <div key={stat.label} style={{ textAlign: 'center', color: 'var(--white)' }}>
                <div style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'bold',
                  marginBottom: 'var(--space-1)',
                  color: 'var(--white)',
                  fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  opacity: 0.8,
                  color: 'var(--white)',
                  fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // SearchFilters Component
  const SearchFilters = () => (
    <section style={{
      background: 'var(--white)',
      padding: 'var(--space-8) 0',
      borderBottom: '1px solid var(--gray-200)',
      position: 'sticky',
      top: '72px',
      zIndex: 90
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
          alignItems: 'center'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '600px'
          }}>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchInput}
              onChange={handleSearchInputChange}
              style={{
                width: '100%',
                padding: `var(--space-5) var(--space-5) var(--space-5) ${isRTL ? 'var(--space-5)' : 'var(--space-12)'}`,
                border: '2px solid var(--gray-300)',
                borderRadius: 'var(--radius-2xl)',
                fontSize: 'var(--text-lg)',
                background: 'var(--white)',
                boxShadow: 'var(--shadow-lg)',
                transition: 'all 0.3s var(--ease-out)',
                textAlign: isRTL ? 'right' : 'left',
                paddingLeft: isRTL ? 'var(--space-5)' : 'var(--space-12)',
                paddingRight: isRTL ? 'var(--space-12)' : 'var(--space-5)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-500)';
                e.target.style.boxShadow = 'var(--shadow-xl), var(--glow-primary)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--gray-300)';
                e.target.style.boxShadow = 'var(--shadow-lg)';
              }}
            />
            <div style={{
              position: 'absolute',
              [isRTL ? 'right' : 'left']: 'var(--space-5)',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 'var(--text-xl)'
            }}>
              🔍
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: 'var(--space-3)',
            flexWrap: 'wrap',
            justifyContent: 'center',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-5)',
                  border: '2px solid',
                  borderColor: selectedCategory === category.id ? 'var(--primary-500)' : 'var(--gray-300)',
                  background: selectedCategory === category.id 
                    ? 'linear-gradient(135deg, var(--primary-500), var(--primary-600))' 
                    : 'var(--white)',
                  color: selectedCategory === category.id ? 'var(--white)' : 'var(--gray-700)',
                  borderRadius: 'var(--radius-2xl)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s var(--ease-out)',
                  animation: `fadeInUp 0.6s var(--ease-out) ${index * 0.1}s both`,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = 'var(--shadow-md)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                <span>{
                  category.id === 'solvents' ? '💧' :
                  category.id === 'inorganic' ? '⚗️' :
                  category.id === 'pharma' ? '💊' :
                  category.id === 'agro' ? '🌱' :
                  category.id === 'polymers' ? '🔗' : '🔬'
                }</span>
                {category.name}
                {category.count > 0 && (
                  <span style={{
                    background: selectedCategory === category.id ? 'rgba(255,255,255,0.2)' : 'var(--gray-100)',
                    color: selectedCategory === category.id ? 'var(--white)' : 'var(--gray-600)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '600'
                  }}>
                    {category.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // ProductGrid Component
  const ProductGrid = () => (
    <section id="products" style={{ 
      padding: 'var(--space-20) 0',
      background: 'linear-gradient(135deg, var(--white) 0%, var(--gray-50) 50%, var(--white) 100%)'
    }}>
      <div className="container">
        <div className="text-center mb-16">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            background: 'var(--primary-50)',
            color: 'var(--primary-700)',
            padding: 'var(--space-2) var(--space-4)',
            borderRadius: 'var(--radius-2xl)',
            fontSize: 'var(--text-sm)',
            fontWeight: '600',
            marginBottom: 'var(--space-6)',
            border: '1px solid var(--primary-200)',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            {t.premiumProducts}
          </div>
          <h2 style={{
            fontSize: 'var(--text-4xl)',
            fontWeight: '800',
            marginBottom: 'var(--space-4)',
            background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--primary-600) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
          }}>
            {t.productsTitle}
          </h2>
          <p style={{
            fontSize: 'var(--text-xl)',
            color: 'var(--gray-600)',
            maxWidth: '600px',
            margin: '0 auto',
            fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
          }}>
            {t.productsDescription}
          </p>
        </div>

        {loading && (
          <div style={{
            textAlign: 'center',
            padding: 'var(--space-12)',
            color: 'var(--gray-600)'
          }}>
            <div style={{
              fontSize: 'var(--text-4xl)',
              marginBottom: 'var(--space-4)',
              animation: 'spin 2s linear infinite'
            }}>
              ⚗️
            </div>
            <p style={{ fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit' }}>
              {currentLanguage === 'en' ? 'Loading products...' : 'در حال بارگذاری محصولات...'}
            </p>
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: 'var(--space-8)',
          marginBottom: 'var(--space-12)'
        }}>
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="card"
              style={{
                animation: `fadeInUp 0.8s var(--ease-out) ${index * 0.1}s both`
              }}
            >
              <div style={{
                padding: 'var(--space-6) var(--space-6) 0',
                position: 'relative'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-4)',
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }}>
                    {product.featured && (
                      <span style={{
                        background: 'linear-gradient(135deg, var(--accent-500), var(--accent-600))',
                        color: 'var(--white)',
                        padding: 'var(--space-1) var(--space-3)',
                        borderRadius: 'var(--radius-lg)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: '700',
                        textTransform: 'uppercase'
                      }}>
                        {t.featured}
                      </span>
                    )}
                    <span style={{
                      background: 'var(--emerald-50)',
                      color: 'var(--emerald-700)',
                      padding: 'var(--space-1) var(--space-3)',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '600',
                      border: '1px solid var(--emerald-200)'
                    }}>
                      {product.purity}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-1)',
                    background: 'var(--gray-50)',
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--gray-200)',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }}>
                    <span style={{ 
                      color: '#f59e0b',
                      fontSize: 'var(--text-lg)'
                    }}>★</span>
                    <span style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: '700',
                      color: 'var(--gray-900)'
                    }}>
                      {product.rating}
                    </span>
                    <span style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--gray-500)'
                    }}>
                      ({product.reviews})
                    </span>
                  </div>
                </div>

                <h3 style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: '700',
                  color: 'var(--gray-900)',
                  marginBottom: 'var(--space-2)',
                  lineHeight: '1.3',
                  fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit',
                  textAlign: isRTL ? 'right' : 'left'
                }}>
                  {product.name}
                </h3>
                
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--primary-600)',
                  fontWeight: '600',
                  marginBottom: 'var(--space-4)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                onClick={() => viewSupplier(product.supplierWebsite)}>
                  {product.supplier}
                </p>
              </div>

              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-lg)',
                  fontSize: 'var(--text-2xl)'
                }}>
                  {product.image}
                </div>
                
                <div style={{
                  position: 'absolute',
                  bottom: 'var(--space-4)',
                  [isRTL ? 'left' : 'right']: 'var(--space-4)',
                  background: product.delivery.includes('Express') 
                    ? 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))'
                    : 'var(--gray-600)',
                  color: 'var(--white)',
                  padding: 'var(--space-2) var(--space-3)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '700',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  🚚 {product.delivery}
                </div>
              </div>

              <div style={{ padding: 'var(--space-6)' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-4)',
                  paddingBottom: 'var(--space-4)',
                  borderBottom: '2px solid var(--gray-100)',
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <div>
                    <span style={{
                      fontSize: 'var(--text-2xl)',
                      fontWeight: '800',
                      color: 'var(--gray-900)'
                    }}>
                      ${product.price}
                    </span>
                    <span style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--gray-500)',
                      marginLeft: 'var(--space-2)'
                    }}>
                      / {product.unit}
                    </span>
                  </div>
                  <div style={{
                    background: 'var(--primary-50)',
                    color: 'var(--primary-700)',
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '600',
                    border: '1px solid var(--primary-200)'
                  }}>
                    {t.moq}: {product.moq}
                  </div>
                </div>

                {product.description && (
                  <p style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--gray-600)',
                    marginBottom: 'var(--space-4)',
                    lineHeight: '1.5',
                    textAlign: isRTL ? 'right' : 'left',
                    fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
                  }}>
                    {product.description}
                  </p>
                )}

                {product.certifications && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-2)',
                    marginBottom: 'var(--space-4)',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }}>
                    {product.certifications.map((cert, idx) => (
                      <span key={idx} style={{
                        background: 'var(--emerald-50)',
                        color: 'var(--emerald-700)',
                        padding: 'var(--space-1) var(--space-2)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: '600',
                        border: '1px solid var(--emerald-200)'
                      }}>
                        {cert}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--space-3)',
                  marginBottom: 'var(--space-6)'
                }}>
                  {[
                    { icon: '🛡️', text: t.qualityCertified },
                    { icon: '🌍', text: t.globalShipping },
                    { icon: '📦', text: t.bulkDiscounts },
                    { icon: '🔒', text: t.securePayment }
                  ].map((feature, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--gray-600)',
                      flexDirection: isRTL ? 'row-reverse' : 'row'
                    }}>
                      <span>{feature.icon}</span>
                      <span style={{ fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit' }}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  gap: 'var(--space-3)',
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <button 
                    className="btn btn-primary" 
                    style={{ flex: 1 }}
                    onClick={() => addToCart(product)}
                  >
                    {t.addToCart}
                  </button>
                  <button 
                    className="btn btn-accent"
                    onClick={() => requestQuote(product)}
                  >
                    {t.requestQuote}
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    style={{
                      padding: 'var(--space-3)',
                      background: favorites.includes(product.id) ? 'var(--accent-500)' : 'var(--gray-100)',
                      color: favorites.includes(product.id) ? 'var(--white)' : 'var(--gray-700)'
                    }}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {favorites.includes(product.id) ? '💖' : '❤️'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && products.length === 0 && (
          <div className="text-center" style={{ 
            padding: 'var(--space-20)',
            background: 'var(--white)',
            borderRadius: 'var(--radius-2xl)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{
              fontSize: 'var(--text-6xl)',
              marginBottom: 'var(--space-6)'
            }}>
              🔍
            </div>
            <h3 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: '700',
              color: 'var(--gray-900)',
              marginBottom: 'var(--space-3)',
              fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
            }}>
              {t.noProductsFound}
            </h3>
            <p style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--gray-600)',
              marginBottom: 'var(--space-6)',
              fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
            }}>
              {currentLanguage === 'en' 
                ? 'Try adjusting your search criteria or browse different categories'
                : 'سعی کنید معیارهای جستجوی خود را تنظیم کنید یا دسته‌های مختلف را مرور کنید'
              }
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm('');
                setSearchInput('');
                setSelectedCategory('all');
              }}
            >
              {t.resetFilters}
            </button>
          </div>
        )}
      </div>
    </section>
  );

  // BlogSection Component
  const BlogSection = () => (
    <section id="blog" style={{
      padding: 'var(--space-20) 0',
      background: 'linear-gradient(135deg, var(--gray-50) 0%, var(--white) 50%, var(--primary-50) 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '10%',
        [isRTL ? 'left' : 'right']: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(41,59,95,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      
      <div className="container">
        <div className="text-center mb-16">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            background: 'var(--primary-50)',
            color: 'var(--primary-700)',
            padding: 'var(--space-2) var(--space-4)',
            borderRadius: 'var(--radius-2xl)',
            fontSize: 'var(--text-sm)',
            fontWeight: '600',
            marginBottom: 'var(--space-6)',
            border: '1px solid var(--primary-200)',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            {t.industryIntelligence}
          </div>
          <h2 style={{
            fontSize: 'var(--text-4xl)',
            fontWeight: '800',
            marginBottom: 'var(--space-4)',
            background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--primary-600) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
          }}>
            {t.insightsTitle}
          </h2>
          <p style={{
            fontSize: 'var(--text-xl)',
            color: 'var(--gray-600)',
            maxWidth: '600px',
            margin: '0 auto',
            fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
          }}>
            {t.insightsDescription}
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-12)',
          flexWrap: 'wrap',
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }}>
          {[
            { id: 'trends', name: t.marketTrends, icon: '📊' },
            { id: 'innovations', name: t.innovations, icon: '⚡' },
            { id: 'market', name: t.marketAnalysis, icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveBlogTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-4) var(--space-6)',
                border: '2px solid',
                borderColor: activeBlogTab === tab.id ? 'var(--primary-500)' : 'var(--gray-300)',
                background: activeBlogTab === tab.id 
                  ? 'linear-gradient(135deg, var(--primary-500), var(--primary-600))' 
                  : 'var(--white)',
                color: activeBlogTab === tab.id ? 'var(--white)' : 'var(--gray-700)',
                borderRadius: 'var(--radius-2xl)',
                fontSize: 'var(--text-base)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s var(--ease-out)',
                boxShadow: activeBlogTab === tab.id ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}
              onMouseEnter={(e) => {
                if (activeBlogTab !== tab.id) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = 'var(--shadow-md)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeBlogTab !== tab.id) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'var(--shadow-sm)';
                }
              }}
            >
              <span>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: 'var(--space-8)',
          marginBottom: 'var(--space-12)'
        }}>
          {staticBlogPosts[activeBlogTab]?.map((post, index) => (
            <div 
              key={post.id} 
              className="card"
              style={{
                animation: `fadeInUp 0.8s var(--ease-out) ${index * 0.1}s both`
              }}
            >
              <div style={{ padding: 'var(--space-6)' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  marginBottom: 'var(--space-4)',
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <span style={{
                    fontSize: 'var(--text-3xl)'
                  }}>
                    {post.image}
                  </span>
                  <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                    <h4 style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: '700',
                      color: 'var(--gray-900)',
                      marginBottom: 'var(--space-1)',
                      fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
                    }}>
                      {post.title}
                    </h4>
                    <p style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--primary-600)',
                      fontWeight: '600'
                    }}>
                      {post.category}
                    </p>
                </div>
                </div>
                
                <p style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--gray-600)',
                  marginBottom: 'var(--space-4)',
                  lineHeight: '1.6',
                  textAlign: isRTL ? 'right' : 'left',
                  fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
                }}>
                  {post.excerpt}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: '600',
                      color: 'var(--gray-900)'
                    }}>
                      {post.author}
                    </div>
                    <div style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--gray-500)'
                    }}>
                      {post.date}
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm">
                    {t.readMore}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-12)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <h3 style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: '800',
            marginBottom: 'var(--space-4)',
            color: 'var(--gray-900)',
            fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
          }}>
            {t.subscribeTitle}
          </h3>
          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--gray-600)',
            marginBottom: 'var(--space-6)',
            fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
          }}>
            {t.subscribeDescription}
          </p>
          <div style={{
            display: 'flex',
            gap: 'var(--space-3)',
            maxWidth: '400px',
            margin: '0 auto',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            <input
              type="email"
              placeholder={currentLanguage === 'en' ? 'Enter your email' : 'ایمیل خود را وارد کنید'}
              style={{
                flex: 1,
                padding: 'var(--space-3) var(--space-4)',
                border: '2px solid var(--gray-300)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--text-base)',
                transition: 'all 0.3s var(--ease-out)',
                textAlign: isRTL ? 'right' : 'left'
              }}
            />
            <button className="btn btn-primary">
              {t.subscribe}
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  // ContactAndSupplierSections Component
  const ContactAndSupplierSections = () => (
    <section style={{
      padding: 'var(--space-20) 0',
      background: 'linear-gradient(135deg, var(--gray-50) 0%, var(--white) 100%)'
    }}>
      <div className="container">
        <div id="contact" style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-12)',
          marginBottom: 'var(--space-12)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div className="text-center mb-8">
            <h3 style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: '800',
              marginBottom: 'var(--space-4)',
              color: 'var(--gray-900)',
              fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
            }}>
              {t.contactTitle}
            </h3>
            <p style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--gray-600)',
              fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
            }}>
              {t.contactDescription}
            </p>
          </div>
          
          <form onSubmit={handleContactSubmit} style={{
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)'
            }}>
              <input
                type="text"
                placeholder={t.name}
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                style={{
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                required
              />
              <input
                type="email"
                placeholder={t.email}
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                style={{
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                required
              />
              <textarea
                placeholder={t.message}
                rows="4"
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                style={{
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)',
                  resize: 'vertical',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                required
              ></textarea>
              <button type="submit" className="btn btn-primary">
                {t.sendMessage}
              </button>
            </div>
          </form>
        </div>

        <div id="suppliers" style={{
          background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-12)',
          textAlign: 'center',
          color: 'var(--white)',
          boxShadow: 'var(--shadow-2xl)'
        }}>
          <h3 style={{
            fontSize: 'var(--text-3xl)',
            fontWeight: '800',
            marginBottom: 'var(--space-4)',
            fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
          }}>
            {t.supplierTitle}
          </h3>
          <p style={{
            fontSize: 'var(--text-xl)',
            opacity: 0.9,
            marginBottom: 'var(--space-8)',
            maxWidth: '600px',
            margin: '0 auto',
            fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
          }}>
            {t.supplierDescription}
          </p>
          
          <form onSubmit={handleSupplierRegister} style={{
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)'
            }}>
              <input
                type="text"
                placeholder={t.companyName}
                value={supplierForm.companyName}
                onChange={(e) => setSupplierForm({...supplierForm, companyName: e.target.value})}
                style={{
                  padding: 'var(--space-4)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'var(--white)',
                  backdropFilter: 'blur(10px)',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                required
              />
              <input
                type="email"
                placeholder={t.businessEmail}
                value={supplierForm.email}
                onChange={(e) => setSupplierForm({...supplierForm, email: e.target.value})}
                style={{
                  padding: 'var(--space-4)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'var(--white)',
                  backdropFilter: 'blur(10px)',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                required
              />
              <input
                type="tel"
                placeholder={t.phone}
                value={supplierForm.phone}
                onChange={(e) => setSupplierForm({...supplierForm, phone: e.target.value})}
                style={{
                  padding: 'var(--space-4)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'var(--white)',
                  backdropFilter: 'blur(10px)',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                required
              />
              <input
                type="text"
                placeholder={t.productsSupply}
                value={supplierForm.products}
                onChange={(e) => setSupplierForm({...supplierForm, products: e.target.value})}
                style={{
                  padding: 'var(--space-4)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'var(--white)',
                  backdropFilter: 'blur(10px)',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                required
              />
              <textarea
                placeholder={t.companyDescription}
                rows="3"
                value={supplierForm.description}
                onChange={(e) => setSupplierForm({...supplierForm, description: e.target.value})}
                style={{
                  padding: 'var(--space-4)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'var(--white)',
                  backdropFilter: 'blur(10px)',
                  resize: 'vertical',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                required
              ></textarea>
              <button type="submit" className="btn" style={{
                background: 'var(--white)',
                color: 'var(--primary-600)',
                fontWeight: '700'
              }}>
                {t.submitApplication}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );

  // Footer Component
  const Footer = () => (
    <footer style={{
      background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%)',
      color: 'var(--white)',
      padding: 'var(--space-16) 0 var(--space-8)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '-100px',
        [isRTL ? 'left' : 'right']: '-100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }}></div>
      
      <div className="container-wide">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-12)',
          marginBottom: 'var(--space-12)',
          position: 'relative',
          zIndex: 10
        }}>
          <div>
            <div style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: '800',
              background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--accent-500) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 'var(--space-6)'
            }}>
              ChemMarket
            </div>
            <p style={{
              color: 'var(--gray-400)',
              lineHeight: '1.7',
              marginBottom: 'var(--space-6)',
              fontSize: 'var(--text-lg)',
              fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit',
              textAlign: isRTL ? 'right' : 'left'
            }}>
              {t.footerDescription}
            </p>
            <div style={{
              display: 'flex',
              gap: 'var(--space-4)',
              flexDirection: isRTL ? 'row-reverse' : 'row'
            }}>
              {[
                { icon: '📧', label: 'Email', link: 'mailto:info@chemmarket.com' },
                { icon: '📱', label: 'Phone', link: 'tel:+989120351143' },
                { icon: '🐦', label: 'Twitter', link: 'https://twitter.com/chemmarket' },
                { icon: '💼', label: 'LinkedIn', link: 'https://linkedin.com/company/chemmarket' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-xl)',
                    cursor: 'pointer',
                    transition: 'all 0.3s var(--ease-out)',
                    textDecoration: 'none',
                    color: 'var(--white)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--primary-500)';
                    e.target.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: '700',
              marginBottom: 'var(--space-6)',
              color: 'var(--white)',
              fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit',
              textAlign: isRTL ? 'right' : 'left'
            }}>
              {t.marketplace}
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {[
                { name: t.browseProducts, action: () => scrollToSection('products') },
                { name: t.insights, action: () => scrollToSection('blog') },
                { name: t.suppliers, action: () => scrollToSection('suppliers') },
                { name: t.qualityStandards, action: () => alert(currentLanguage === 'en' ? 'Quality standards information coming soon!' : 'اطلاعات استانداردهای کیفیت به زودی ارائه خواهد شد!') },
                { name: t.globalShipping, action: () => alert(currentLanguage === 'en' ? 'Shipping information coming soon!' : 'اطلاعات ارسال به زودی ارائه خواهد شد!') }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: 'var(--space-3)' }}>
                  <button
                    onClick={item.action}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--gray-400)',
                      fontSize: 'var(--text-base)',
                      transition: 'all 0.3s var(--ease-out)',
                      display: 'block',
                      padding: 'var(--space-1) 0',
                      cursor: 'pointer',
                      textAlign: isRTL ? 'right' : 'left',
                      width: '100%',
                      fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--primary-300)';
                      e.target.style.transform = `translateX(${isRTL ? '-' : ''}8px)`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'var(--gray-400)';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    {isRTL ? '←' : '→'} {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: '700',
              marginBottom: 'var(--space-6)',
              color: 'var(--white)',
              fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit',
              textAlign: isRTL ? 'right' : 'left'
            }}>
              {t.support}
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {[
                { name: t.helpCenter, action: () => alert(currentLanguage === 'en' ? 'Help center coming soon!' : 'مرکز راهنما به زودی ارائه خواهد شد!') },
                { name: t.contact, action: () => scrollToSection('contact') },
                { name: t.documentation, action: () => alert(currentLanguage === 'en' ? 'Documentation coming soon!' : 'مستندات به زودی ارائه خواهد شد!') },
                { name: t.apiAccess, action: () => alert(currentLanguage === 'en' ? 'API access coming soon!' : 'دسترسی API به زودی ارائه خواهد شد!') },
                { name: t.statusPage, action: () => alert(currentLanguage === 'en' ? 'System status: All systems operational!' : 'وضعیت سیستم: تمام سیستم‌ها فعال هستند!') }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: 'var(--space-3)' }}>
                  <button
                    onClick={item.action}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--gray-400)',
                      fontSize: 'var(--text-base)',
                      transition: 'all 0.3s var(--ease-out)',
                      display: 'block',
                      padding: 'var(--space-1) 0',
                      cursor: 'pointer',
                      textAlign: isRTL ? 'right' : 'left',
                      width: '100%',
                      fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--primary-300)';
                      e.target.style.transform = `translateX(${isRTL ? '-' : ''}8px)`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'var(--gray-400)';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    ⚡ {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: '700',
              marginBottom: 'var(--space-6)',
              color: 'var(--white)',
              fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit',
              textAlign: isRTL ? 'right' : 'left'
            }}>
              {t.company}
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {[
                { name: t.aboutUs, action: () => alert(currentLanguage === 'en' ? 'About ChemMarket: Leading chemical marketplace since 2024!' : 'درباره ChemMarket: بازار پیشرو مواد شیمیایی از سال ۲۰۲۴!') },
                { name: t.careers, action: () => alert(currentLanguage === 'en' ? 'Career opportunities coming soon!' : 'فرصت‌های شغلی به زودی ارائه خواهد شد!') },
                { name: t.pressKit, action: () => alert(currentLanguage === 'en' ? 'Press kit available upon request.' : 'کیت مطبوعاتی به درخواست موجود است.') },
                { name: t.sustainability, action: () => alert(currentLanguage === 'en' ? 'Sustainability initiatives coming soon!' : 'ابتکارات پایداری به زودی ارائه خواهد شد!') },
                { name: t.partners, action: () => alert(currentLanguage === 'en' ? 'Partnership program details coming soon!' : 'جزئیات برنامه مشارکت به زودی ارائه خواهد شد!') }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: 'var(--space-3)' }}>
                  <button
                    onClick={item.action}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--gray-400)',
                      fontSize: 'var(--text-base)',
                      transition: 'all 0.3s var(--ease-out)',
                      display: 'block',
                      padding: 'var(--space-1) 0',
                      cursor: 'pointer',
                      textAlign: isRTL ? 'right' : 'left',
                      width: '100%',
                      fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--primary-300)';
                      e.target.style.transform = `translateX(${isRTL ? '-' : ''}8px)`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'var(--gray-400)';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    🏢 {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: 'var(--space-8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          color: 'var(--gray-400)',
          fontSize: 'var(--text-sm)',
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }}>
          <div style={{ fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit' }}>
            {t.copyright}
          </div>
          <div style={{
            display: 'flex',
            gap: 'var(--space-6)',
            alignItems: 'center',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            {[
              { name: t.privacyPolicy, action: () => alert(currentLanguage === 'en' ? 'Privacy policy details coming soon!' : 'جزئیات سیاست حفظ حریم خصوصی به زودی ارائه خواهد شد!') },
              { name: t.termsOfService, action: () => alert(currentLanguage === 'en' ? 'Terms of service details coming soon!' : 'جزئیات شرایط استفاده از خدمات به زودی ارائه خواهد شد!') },
              { name: t.cookiePolicy, action: () => alert(currentLanguage === 'en' ? 'Cookie policy details coming soon!' : 'جزئیات سیاست کوکی به زودی ارائه خواهد شد!') },
              { name: t.compliance, action: () => alert(currentLanguage === 'en' ? 'Compliance information coming soon!' : 'اطلاعات انطباق به زودی ارائه خواهد شد!') }
            ].map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--gray-400)',
                  textDecoration: 'none',
                  transition: 'color 0.3s var(--ease-out)',
                  cursor: 'pointer',
                  fontSize: 'var(--text-sm)',
                  fontFamily: isRTL ? 'B Nazanin, Tahoma, Arial, sans-serif' : 'inherit'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--primary-300)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--gray-400)'}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );

  // Main App Render
  return (
    <div style={{ minHeight: '100vh', direction: isRTL ? 'rtl' : 'ltr' }}>
      <Header />
      <Hero />
      <SearchFilters />
      <ProductGrid />
      <BlogSection />
      <ContactAndSupplierSections />
      <Footer />
      
      <LoginModal />
      <SignupModal />
    </div>
  );
}

export default App;