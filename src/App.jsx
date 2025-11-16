import React, { useState, useEffect, useMemo, useCallback, useRef, useContext, createContext } from 'react';
import './index.css';

// --- CONSTANTS & DATA ---
// NOTE: Branding is "ChemMarket", news feed is "chemical industry"
const translations = {
  en: {
  	products: 'Products', insights: 'Industry Insights', suppliers: 'Suppliers', contact: 'Contact',
  	heroTitle: 'Global Chemical', heroMarketplace: 'Marketplace',
  	heroDescription: 'Connect with trusted suppliers and discover premium-quality chemicals for your industry needs. Fast, reliable, and secure global transactions.',
  	exploreProducts: '🚀 Explore Products', industryInsights: '📈 Industry Insights', trustedBy: 'Trusted by 5,000+ Chemical Companies Worldwide',
  	productsCount: '50K+', productsLabel: 'Products', suppliersCount: '500+', suppliersLabel: 'Suppliers',
  	countriesCount: '120+', countriesLabel: 'Countries', satisfactionCount: '99.9%', satisfactionLabel: 'Satisfaction',
  	searchPlaceholder: '🔍 Search 50,000+ chemicals, products, suppliers...',
  	allCategories: 'All Categories', solvents: 'Solvents', inorganic: 'Inorganic Chemicals', pharma: 'Pharmaceuticals',
  	agro: 'Agrochemicals', polymers: 'Polymers', premiumProducts: '🛍️ PREMIUM PRODUCTS', productsTitle: 'Premium Chemical Products',
  	productsDescription: 'Discover our curated selection of high-purity chemicals from verified global suppliers', featured: '⭐ Featured',
  	moq: 'MOQ', addToCart: '🛒 Add to Cart', requestQuote: '💰 Quote', viewSupplier: 'View Supplier',
  	qualityCertified: '🛡️ Quality Certified', globalShipping: '🌍 Global Shipping', bulkDiscounts: '📦 Bulk Discounts',
  	securePayment: '🔒 Secure Payment', noProductsFound: 'No products found', resetFilters: '🔄 Reset Filters',
  	industryIntelligence: '📈 INDUSTRY INTELLIGENCE', insightsTitle: 'Chemical Industry Insights',
  	insightsDescription: 'Stay ahead with the latest trends, innovations and market analysis from the chemical industry',
  	marketTrends: '🔥 Market Trends', innovations: '💡 Innovations', marketAnalysis: '🌍 Market Analysis',
  	readMore: 'Read More', subscribeTitle: '📬 Stay Informed', subscribeDescription: 'Get weekly insights and market analysis delivered to your inbox',
  	subscribe: 'Subscribe', contactTitle: 'Contact Our Sales Team',
  	contactDescription: 'Have questions? Our chemical experts are here to help you find the perfect solutions.',
  	name: 'Your Name', email: 'Your Email', message: 'Your Message', sendMessage: '📨 Send Message',
  	supplierTitle: 'Become a Verified Supplier', supplierDescription: 'Join our network of trusted chemical suppliers and reach global customers',
  	companyName: 'Company Name', businessEmail: 'Business Email', phone: 'Phone Number', productsSupply: 'Products You Supply',
  	companyDescription: 'Company Description', submitApplication: '🏢 Submit Application',
  	welcomeBack: 'Welcome Back', signInTo: 'Sign in to your ChemMarket account',
  	emailAddress: 'Email Address', password: 'Password',
  	signIn: '🔐 Sign In', signingIn: 'Signing In...', noAccount: 'Don\'t have an account?', signUpNow: 'Sign up now',
  	joinChemMarket: 'Join ChemMarket', createAccount: 'Create your account to start trading chemicals', fullName: 'Full Name',
  	confirmPassword: 'Confirm Password', createStrongPassword: 'Create a strong password', getStarted: '🚀 Get Started',
  	creatingAccount: 'Creating Account...', haveAccount: 'Already have an account?', signInHere: 'Sign in',
  	roleBuyer: '🧪 Buyer', roleSupplier: '🏭 Supplier', roleBoth: '🔄 Both', roleDescriptionBuyer: 'Purchase chemicals',
  	roleDescriptionSupplier: 'Sell chemicals', roleDescriptionBoth: 'Buy and sell', welcome: '🎉 Welcome back, {name}!',
  	welcomeNew: '🚀 Welcome to ChemMarket, {name}!', loggedOut: '👋 You have been logged out successfully.',
  	addedToCart: '✅ {product} added to cart!', quoteRequested: '📧 Quote request sent for {product}! Our sales team will contact you shortly.',
  	footerDescription: 'The world\'s most trusted chemical marketplace. Connecting premium suppliers with quality-focused buyers across 120+ countries.',
  	marketplace: 'Marketplace', browseProducts: 'Browse Products', qualityStandards: 'Quality Standards', support: 'Support',
  	helpCenter: 'Help Center', documentation: 'Documentation', apiAccess: 'API Access', statusPage: 'Status Page',
  	company: 'Company', aboutUs: 'About Us', careers: 'Careers', pressKit: 'Press Kit', sustainability: 'Sustainability',
  	partners: 'Partners', copyright: '© 2024 ChemMarket. All rights reserved. | Making chemical trading better. 🌟',
  	privacyPolicy: 'Privacy Policy', termsOfService: 'Terms of Service', cookiePolicy: 'Cookie Policy', compliance: 'Compliance',
  	// New translations for blog section
  	loadingInsights: 'Loading chemical industry news...',
  	errorLoadingInsights: 'Failed to load insights',
  	noArticlesFound: 'No articles found for this topic.'
  }
};

const API_BASE = 'http://localhost:5000/api';
// Using NewsAPI for real-time blog posts. Requires an API key.
const NEWS_API_BASE = 'https://newsapi.org/v2';

// --- ROBUST API HANDLER ---
const handleResponse = async (response) => {
  if (!response.ok) {
  	const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
  	// NewsAPI uses 'message' for errors, your backend uses 'error'
  	throw new Error(errorData.error || errorData.message || 'API request failed');
  }
  return response.json();
};

const api = {
  healthCheck: async () => handleResponse(await fetch(`${API_BASE}/health`)),
  register: async (userData) => handleResponse(await fetch(`${API_BASE}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userData) })),
  login: async (credentials) => handleResponse(await fetch(`${API_BASE}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(credentials) })),
  getProducts: async (filters = {}) => handleResponse(await fetch(`${API_BASE}/products?${new URLSearchParams(filters).toString()}`)),
  getCategories: async () => handleResponse(await fetch(`${API_BASE}/categories`)),
  addToCart: async (productId, quantity, token) => handleResponse(await fetch(`${API_BASE}/cart`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': token }, body: JSON.stringify({ productId, quantity }) })),
  toggleFavorite: async (productId, token) => handleResponse(await fetch(`${API_BASE}/favorites`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': token }, body: JSON.stringify({ productId }) })),
  submitContact: async (contactData) => handleResponse(await fetch(`${API_BASE}/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(contactData) })),
  registerSupplier: async (supplierData) => handleResponse(await fetch(`${API_BASE}/suppliers/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(supplierData) })),
  
  // NEW FUNCTION to fetch real-time news
  getNews: async (query, apiKey) => {
  	const url = `${NEWS_API_BASE}/everything?${new URLSearchParams({
  	  q: query,
  	  apiKey: apiKey,
  	  language: 'en',
  	  sortBy: 'publishedAt',
  	  pageSize: 6 // Fetch 6 articles
  	}).toString()}`;
  	return handleResponse(await fetch(url));
  }
};

// --- STATIC PRODUCTS WITH CORRECTED imageURL PATHS ---
const staticProducts = [
  { id: 1, name: 'Acetone 99.5% Ultra Pure', category: 'solvents', supplier: 'ChemSupply Global Inc.', price: 45.00, unit: '20L drum', rating: 4.8, reviews: 124, featured: true, delivery: '24h Express', purity: '99.9%', moq: '5 drums', inStock: true, description: 'High-purity acetone suitable for laboratory and industrial use.', image: '🧪', supplierWebsite: 'https://chemsupply.com', safetyData: 'Available', certifications: ['ISO 9001', 'GMP'], imageURL: '/images/acetone.jpg' },
  { id: 2, name: 'Sodium Hydroxide Pearl', category: 'inorganic', supplier: 'BaseChem Laboratories', price: 28.50, unit: '25kg bag', rating: 4.6, reviews: 89, delivery: '48h Standard', purity: '99%', moq: '10 bags', inStock: true, description: 'Sodium hydroxide pearls for various industrial applications.', image: '⚗️', supplierWebsite: 'https://basechemlabs.com', safetyData: 'Available', certifications: ['ISO 14001'], imageURL: '/images/sodium-hydroxide.jpg' },
  { id: 3, name: 'Ethanol Absolute 99.9%', category: 'solvents', supplier: 'PureChem Solutions', price: 62.00, unit: '10L bottle', rating: 4.9, reviews: 156, featured: true, delivery: '24h Express', purity: '99.9%', moq: '3 bottles', inStock: true, description: 'Absolute ethanol for pharmaceutical and research applications.', image: '🧴', supplierWebsite: 'https://purechemsolutions.com', safetyData: 'Available', certifications: ['USP', 'Ph Eur'], imageURL: '/images/ethanol.jpg' },
  { id: 4, name: 'Polyethylene Granules', category: 'polymers', supplier: 'PolymerTech Global', price: 1.25, unit: 'per kg', rating: 4.4, reviews: 67, delivery: '72h Standard', purity: '99.5%', moq: '1000 kg', inStock: true, description: 'High-quality polyethylene granules for manufacturing.', image: '🔗', supplierWebsite: 'https://polymertech.com', safetyData: 'Available', certifications: ['FDA', 'ISO 9001'], imageURL: '/images/polyethylene.jpg' },
  { id: 5, name: 'Sulfuric Acid 98%', category: 'inorganic', supplier: 'BaseChem Laboratories', price: 220.00, unit: '200L drum', rating: 4.7, reviews: 76, featured: false, delivery: '72h Standard', purity: '98%', moq: '1 drum', inStock: true, description: 'Concentrated sulfuric acid for industrial and battery use.', image: '☣️', supplierWebsite: 'https://basechemlabs.com', safetyData: 'Available', certifications: ['ISO 9001'], imageURL: '/images/sulfuric-acid.jpg' },
  { id: 6, name: 'Toluene (Reagent Grade)', category: 'solvents', supplier: 'PureChem Solutions', price: 55.00, unit: '4L bottle', rating: 4.8, reviews: 91, featured: true, delivery: '48h Standard', purity: '99.8%', moq: '4 bottles', inStock: true, description: 'High-purity Toluene for use as a solvent in labs.', image: '💧', supplierWebsite: 'https://purechemsolutions.com', safetyData: 'Available', certifications: ['ACS'], imageURL: '/images/toluene.jpg' },
  { id: 7, name: 'Glyphosate 41% SL', category: 'agro', supplier: 'AgroPrime', price: 15.50, unit: '5L bottle', rating: 4.3, reviews: 54, featured: false, delivery: '72h Standard', purity: '41% SL', moq: '50 bottles', inStock: true, description: 'Broad-spectrum systemic herbicide and crop desiccant.', image: '🌱', supplierWebsite: 'https://agroprime.com', safetyData: 'Available', certifications: ['EPA'], imageURL: '/images/glyphosate.jpg' },
  { id: 8, name: 'Paracetamol (Acetaminophen) Powder', category: 'pharma', supplier: 'PharmaCore', price: 35.00, unit: 'per kg', rating: 4.9, reviews: 210, featured: true, delivery: '24h Express', purity: '99.5% BP', moq: '25 kg', inStock: true, description: 'Pharmaceutical grade Paracetamol powder for drug formulation.', image: '💊', supplierWebsite: 'https://pharmacore.com', safetyData: 'Available', certifications: ['BP', 'USP', 'GMP'], imageURL: '/images/paracetamol.jpg' },
  { id: 9, name: 'Hydrochloric Acid 37%', category: 'inorganic', supplier: 'AcidSolutions Ltd.', price: 75.00, unit: '2.5L bottle', rating: 4.5, reviews: 60, featured: false, delivery: '48h Standard', purity: '37%', moq: '4 bottles', inStock: true, description: 'Concentrated hydrochloric acid for various laboratory and industrial cleaning applications.', image: '⚡', supplierWebsite: 'https://acidsolutions.com', safetyData: 'Available', certifications: ['ACS', 'Reagent Grade'], imageURL: '/images/hydrochloric-acid.jpg' },
  { id: 10, name: 'Methanol 99.8%', category: 'solvents', supplier: 'GlobalSolvents', price: 30.00, unit: '200L drum', rating: 4.7, reviews: 95, featured: true, delivery: '72h Standard', purity: '99.8%', moq: '1 drum', inStock: true, description: 'High-grade methanol for industrial and chemical synthesis.', image: '🔥', supplierWebsite: 'https://globalsolvents.com', safetyData: 'Available', certifications: ['ISO 9001'], imageURL: '/images/methanol.jpg' },
  { id: 11, name: 'Urea Fertilizer Granular', category: 'agro', supplier: 'AgriNutrient Corp.', price: 0.85, unit: 'per kg', rating: 4.2, reviews: 110, featured: false, delivery: 'Bulk Shipping', purity: '46% Nitrogen', moq: '1000 kg', inStock: true, description: 'High-nitrogen fertilizer for agricultural use.', image: '🌾', supplierWebsite: 'https://agrinutrient.com', safetyData: 'Available', certifications: ['EEC Fertilizer'], imageURL: '/images/urea.jpg' },
  { id: 12, name: 'Aspirin (Acetylsalicylic Acid)', category: 'pharma', supplier: 'MediBulk Pharma', price: 40.00, unit: 'per kg', rating: 4.8, reviews: 180, featured: true, delivery: '24h Express', purity: '99% EP', moq: '10 kg', inStock: true, description: 'Pharmaceutical grade Aspirin powder for tablet manufacturing.', image: '💊', supplierWebsite: 'https://medibulk.com', safetyData: 'Available', certifications: ['EP', 'USP', 'GMP'], imageURL: '/images/aspirin.jpg' },
  { id: 13, name: 'Dimethylformamide (DMF)', category: 'solvents', supplier: 'ChemPure Distributors', price: 90.00, unit: '5L bottle', rating: 4.6, reviews: 70, featured: false, delivery: '48h Standard', purity: '99.9%', moq: '2 bottles', inStock: true, description: 'Versatile organic solvent for chemical reactions and industrial cleaning.', image: '🧪', supplierWebsite: 'https://chempuredist.com', safetyData: 'Available', certifications: ['Reagent Grade'], imageURL: '/images/dmf.jpg' },
  { id: 14, name: 'Potassium Permanganate', category: 'inorganic', supplier: 'Oxidation Solutions', price: 55.00, unit: '1kg jar', rating: 4.7, reviews: 50, featured: false, delivery: '48h Standard', purity: '99.5%', moq: '5 jars', inStock: true, description: 'Strong oxidizing agent for water treatment and synthesis.', image: '🟣', supplierWebsite: 'https://oxidationsolutions.com', safetyData: 'Available', certifications: ['Food Grade'], imageURL: '/images/potassium-permanganate.jpg' },
  { id: 15, name: 'Polystyrene Pellets (GPPS)', category: 'polymers', supplier: 'PlasticForm Inc.', price: 1.10, unit: 'per kg', rating: 4.3, reviews: 80, featured: true, delivery: '72h Standard', purity: '99%', moq: '500 kg', inStock: true, description: 'General purpose polystyrene pellets for injection molding and extrusion.', image: '♻️', supplierWebsite: 'https://plasticform.com', safetyData: 'Available', certifications: ['RoHS', 'REACH'], imageURL: '/images/polystyrene.jpg' },
  { id: 16, name: 'Ammonium Nitrate', category: 'agro', supplier: 'Fertilizer Innovations', price: 0.95, unit: 'per kg', rating: 4.1, reviews: 90, featured: false, delivery: 'Bulk Shipping', purity: '34% Nitrogen', moq: '2000 kg', inStock: true, description: 'High-quality granular fertilizer for agricultural applications.', image: '🌱', supplierWebsite: 'https://fertilizerinnovations.com', safetyData: 'Available', certifications: ['EEC Fertilizer'], imageURL: '/images/ammonium-nitrate.jpg' },
];

// --- AUTHENTICATION CONTEXT ---
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [t] = useState(translations.en); 

  useEffect(() => {
  	const savedUser = localStorage.getItem('chemmarket-user');
  	if (savedUser) {
  	  const userData = JSON.parse(savedUser);
  	  setUser(userData);
  	  setIsLoggedIn(true);
  	}
  }, []);

  const login = async (credentials) => {
  	setAuthLoading(true);
  	try {
  	  const result = await api.login(credentials);
  	  const userData = { ...result.user, token: result.token };
  	  
  	  localStorage.setItem('chemmarket-user', JSON.stringify(userData));
  	  setUser(userData);
  	  setIsLoggedIn(true);
  	  alert(t.welcome.replace('{name}', userData.name));
  	  return { success: true };
  	} catch (error) {
  	  console.error('Login failed:', error);
  	  alert(`Login failed: ${error.message}`);
  	  return { success: false };
  	} finally {
  	  setAuthLoading(false);
  	}
  };

  const signup = async (signupData) => {
  	setAuthLoading(true);
  	try {
  	  const result = await api.register(signupData);
  	  const userData = { ...result.user, token: result.token };

  	  localStorage.setItem('chemmarket-user', JSON.stringify(userData));
  	  setUser(userData);
  	  setIsLoggedIn(true);
  	  alert(t.welcomeNew.replace('{name}', userData.name));
  	  return { success: true };
  	} catch (error) {
  	  console.error('Signup failed:', error);
  	  alert(`Registration failed: ${error.message}`);
  	  return { success: false };
  	} finally {
  	  setAuthLoading(false);
  	}
  };

  const logout = () => {
  	localStorage.removeItem('chemmarket-user');
  	setUser(null);
  	setIsLoggedIn(false);
  	alert(t.loggedOut);
  };

  const value = {
  	user,
  	isLoggedIn,
  	authLoading,
  	login,
  	signup,
  	logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
  	throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// --- SHARED COMPONENTS ---
const GoogleTranslate = () => {
  useEffect(() => {
  	const scriptId = 'google-translate-script';
  	if (!document.getElementById(scriptId)) {
  	  const script = document.createElement('script');
  	  script.id = scriptId;
  	  script.type = 'text/javascript';
  	  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  	  script.async = true;
  	  document.head.appendChild(script);
  	}
  	window.googleTranslateElementInit = () => {
  	  if (window.google && window.google.translate) {
  		new window.google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'en,fa,ar,es,fr,de,it,zh-CN,ru,ja,ko,tr,hi', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false, gaTrack: true }, 'google_translate_element');
  	  }
  	};
  	return () => { if (window.googleTranslateElementInit) delete window.googleTranslateElementInit; };
  }, []);
  return <div id="google_translate_element" style={{ display: 'inline-block', margin: '0 var(--space-2)', verticalAlign: 'middle' }} />;
};

const Header = React.memo(({ isScrolled, t, activeNav, setActiveNav, scrollToSection, favorites, cartItems, handleSignIn, handleGetStarted }) => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
  	<header style={{ background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'var(--white)', backdropFilter: 'blur(20px)', borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid var(--gray-200)', padding: 'var(--space-4) 0', position: 'sticky', top: 0, zIndex: 100, transition: 'all 0.4s var(--ease-out)' }}>
  	  <div className="container">
  		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
  		  {/* --- THIS IS THE INTEGRATION --- */}
  		  {/* This is the "ChemMarket" logo, but it links to chemibazar.com */}
  		  <a
  			href="https://chemibazar.com/"
  			target="_blank"
  			rel="noopener noreferrer"
  			style={{
  			  fontSize: 'var(--text-2xl)',
  			  fontWeight: 'bold',
  			  background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--accent-500) 100%)',
  			  WebkitBackgroundClip: 'text',
  			  WebkitTextFillColor: 'transparent',
  			  backgroundClip: 'text',
  			  cursor: 'pointer',
  			  transition: 'all 0.3s var(--ease-out)',
  			  textDecoration: 'none'
  			}}
  			className="animate-pulse-slow"
  		  >
  			ChemMarket
  		  </a>
  		  {/* --- END OF INTEGRATION --- */}
  		  <nav style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center', flexDirection: 'row' }}>
  			{[{ id: 'products', name: t.products }, { id: 'blog', name: t.insights }, { id: 'suppliers', name: t.suppliers }, { id: 'contact', name: t.contact }].map((item) => (
  			  <button key={item.id} onClick={() => { setActiveNav(item.id); scrollToSection(item.id); }} style={{ background: 'none', border: 'none', color: activeNav === item.id ? 'var(--primary-600)' : 'var(--gray-700)', fontWeight: '500', fontSize: 'var(--text-sm)', padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-lg)', transition: 'all 0.3s var(--ease-out)', cursor: 'pointer', position: 'relative' }} onMouseEnter={(e) => { if (activeNav !== item.id) { e.target.style.color = 'var(--primary-600)'; e.target.style.background = 'var(--primary-50)'; } }} onMouseLeave={(e) => { if (activeNav !== item.id) { e.target.style.color = 'var(--gray-700)'; e.target.style.background = 'transparent'; } }}>
  				{item.name}
  				{activeNav === item.id && <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '2px', background: 'var(--primary-500)', borderRadius: 'var(--radius-sm)' }}></div>}
  			  </button>
  			))}
  		  </nav>
  		  <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexDirection: 'row' }}>
  			<GoogleTranslate />
  			{isLoggedIn ? (
  			  <>
  				<div style={{ position: 'relative', cursor: 'pointer', padding: 'var(--space-2)', borderRadius: 'var(--radius-lg)', transition: 'all 0.3s var(--ease-out)' }} onMouseEnter={(e) => e.target.style.background = 'var(--primary-50)'} onMouseLeave={(e) => e.target.style.background = 'transparent'}>
  				  ❤️ {favorites.length > 0 && <span style={{ position: 'absolute', top: '-2px', right: '-2px', background: 'var(--accent-500)', color: 'var(--white)', borderRadius: '50%', width: '16px', height: '16px', fontSize: 'var(--text-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{favorites.length}</span>}
  				</div>
  				<div style={{ position: 'relative', cursor: 'pointer', padding: 'var(--space-2)', borderRadius: 'var(--radius-lg)', transition: 'all 0.3s var(--ease-out)' }} onMouseEnter={(e) => e.target.style.background = 'var(--primary-50)'} onMouseLeave={(e) => e.target.style.background = 'transparent'}>
  				  🛒 {cartItems.length > 0 && <span style={{ position: 'absolute', top: '-2px', right: '-2px', background: 'var(--accent-500)', color: 'var(--white)', borderRadius: '50%', width: '16px', height: '16px', fontSize: 'var(--text-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{cartItems.length}</span>}
  				</div>
  				<div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-3)', background: 'var(--primary-50)', borderRadius: 'var(--radius-xl)', cursor: 'pointer', transition: 'all 0.3s var(--ease-out)', flexDirection: 'row' }} onMouseEnter={(e) => e.target.style.background = 'var(--primary-100)'} onMouseLeave={(e) => e.target.style.background = 'var(--primary-50)'}>
  				  <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', fontWeight: '600', fontSize: 'var(--text-sm)' }}>{user?.name?.charAt(0).toUpperCase()}</div>
  				  <span style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--gray-700)' }}>{user?.name}</span>
  				  <button onClick={logout} className="btn btn-secondary" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)' }}>Logout</button>
  				</div>
  			  </>
  			) : (
  			  <>
  				<button className="btn btn-secondary" style={{ padding: 'var(--space-3) var(--space-6)' }} onClick={handleSignIn}>Sign In</button>
  				<button className="btn btn-primary" onClick={handleGetStarted}>{t.getStarted}</button>
  			  </>
  			)}
  		  </div>
  		</div>
  	  </div>
  	</header>
  )
});

const Hero = React.memo(({ t, scrollToSection }) => (
  <section style={{
  	background: `linear-gradient(135deg, rgba(41, 59, 95, 0.85) 0%, rgba(41, 59, 95, 0.9) 100%), url("/images/hero-chemicals.jpg")`,
  	backgroundSize: 'cover',
  	backgroundPosition: 'center',
  	backgroundRepeat: 'no-repeat',
  	color: 'var(--white)',
  	padding: 'var(--space-20) 0 var(--space-16)',
  	position: 'relative',
  	overflow: 'hidden'
  }}>
  	<div style={{ position: 'absolute', top: '15%', right: '10%', fontSize: 'var(--text-3xl)', opacity: 0.2, animation: 'float-slow 10s ease-in-out infinite' }}>⚗️</div>
  	<div style={{ position: 'absolute', bottom: '20%', left: '8%', fontSize: 'var(--text-3xl)', opacity: 0.2, animation: 'float-slow 12s ease-in-out infinite 2s' }}>🧪</div>
  	<div className="container">
  	  <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
  		<div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255, 255, 255, 0.2)', fontSize: 'var(--text-sm)', fontWeight: '500', marginBottom: 'var(--space-8)', animation: 'fadeInUp 0.8s var(--ease-out)', color: 'var(--white)', flexDirection: 'row' }}>
  		  <span style={{ width: '8px', height: '8px', background: 'var(--emerald-500)', borderRadius: '50%', animation: 'pulse 2s infinite' }}></span>{t.trustedBy}
  		</div>
  		<h1 style={{ fontSize: 'var(--text-5xl)', fontWeight: '800', marginBottom: 'var(--space-6)', lineHeight: '1.1', background: 'linear-gradient(135deg, var(--white) 0%, rgba(255,255,255,0.9) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'fadeInUp 0.8s var(--ease-out) 0.2s both' }}>
  		  {t.heroTitle}<br /><span style={{ background: 'linear-gradient(135deg, var(--accent-500) 0%, #ff6b35 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t.heroMarketplace}</span>
  		</h1>
  		<p style={{ fontSize: 'var(--text-xl)', opacity: 0.9, marginBottom: 'var(--space-8)', lineHeight: '1.6', animation: 'fadeInUp 0.8s var(--ease-out) 0.4s both', color: 'var(--white)' }}>{t.heroDescription}</p>
  		<div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeInUp 0.8s var(--ease-out) 0.6s both', flexDirection: 'row' }}>
  		  <button className="btn btn-primary" style={{ padding: 'var(--space-5) var(--space-10)', fontSize: 'var(--text-lg)' }} onClick={() => scrollToSection('products')}>{t.exploreProducts}</button>
  		  <button className="btn btn-secondary" style={{ padding: 'var(--space-5) var(--space-10)', fontSize: 'var(--text-lg)', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(20px)', border: '2px solid rgba(255, 255, 255, 0.3)', color: 'var(--white)' }} onClick={() => scrollToSection('blog')}>{t.industryInsights}</button>
  		</div>
  		<div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-8)', marginTop: 'var(--space-12)', animation: 'fadeInUp 0.8s var(--ease-out) 0.8s both', flexDirection: 'row' }}>
  		  {[{ number: t.productsCount, label: t.productsLabel }, { number: t.suppliersCount, label: t.suppliersLabel }, { number: t.countriesCount, label: t.countriesLabel }, { number: t.satisfactionCount, label: t.satisfactionLabel }].map((stat) => (
  			<div key={stat.label} style={{ textAlign: 'center', color: 'var(--white)' }}>
  			  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', marginBottom: 'var(--space-1)', color: 'var(--white)' }}>{stat.number}</div>
  			  <div style={{ fontSize: 'var(--text-sm)', opacity: 0.8, color: 'var(--white)' }}>{stat.label}</div>
  			</div>
  		  ))}
  		</div>
  	  </div>
  	</div>
  </section>
));

const SearchFilters = React.memo(({ t, searchInput, handleSearchInputChange, categories, selectedCategory, setSelectedCategory }) => (
  <section style={{ background: 'var(--white)', padding: 'var(--space-8) 0', borderBottom: '1px solid var(--gray-200)', position: 'sticky', top: '72px', zIndex: 90 }}>
  	<div className="container">
  	  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'center' }}>
  		<div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
  		  <input type="text" placeholder={t.searchPlaceholder} value={searchInput} onChange={handleSearchInputChange} style={{ width: '100%', padding: 'var(--space-5) var(--space-5) var(--space-5) var(--space-12)', border: '2px solid var(--gray-300)', borderRadius: 'var(--radius-2xl)', fontSize: 'var(--text-lg)', background: 'var(--white)', boxShadow: 'var(--shadow-lg)', transition: 'all 0.3s var(--ease-out)', textAlign: 'left' }} onFocus={(e) => { e.target.style.borderColor = 'var(--primary-500)'; e.target.style.boxShadow = 'var(--shadow-xl), var(--glow-primary)'; }} onBlur={(e) => { e.target.style.borderColor = 'var(--gray-300)'; e.target.style.boxShadow = 'var(--shadow-lg)'; }} />
  		  <div style={{ position: 'absolute', left: 'var(--space-5)', top: '50%', transform: 'translateY(-50%)', fontSize: 'var(--text-xl)' }}>🔍</div>
  		</div>
  		<div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row' }}>
  		  {categories.map((category, index) => (
  			<button key={category.id} onClick={() => setSelectedCategory(category.id)} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3) var(--space-5)', border: '2px solid', borderColor: selectedCategory === category.id ? 'var(--primary-500)' : 'var(--gray-300)', background: selectedCategory === category.id ? 'linear-gradient(135deg, var(--primary-500), var(--primary-600))' : 'var(--white)', color: selectedCategory === category.id ? 'var(--white)' : 'var(--gray-700)', borderRadius: 'var(--radius-2xl)', fontSize: 'var(--text-sm)', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s var(--ease-out)', animation: `fadeInUp 0.6s var(--ease-out) ${index * 0.1}s both`, flexDirection: 'row' }} onMouseEnter={(e) => { if (selectedCategory !== category.id) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = 'var(--shadow-md)'; } }} onMouseLeave={(e) => { if (selectedCategory !== category.id) { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; } }}>
  			  <span>{category.id === 'solvents' ? '💧' : category.id === 'inorganic' ? '⚗️' : category.id === 'pharma' ? '💊' : category.id === 'agro' ? '🌱' : category.id === 'polymers' ? '🔗' : '🔬'}</span>
  			  {category.name}
  			  {category.count > 0 && <span style={{ background: selectedCategory === category.id ? 'rgba(255,255,255,0.2)' : 'var(--gray-100)', color: selectedCategory === category.id ? 'var(--white)' : 'var(--gray-600)', padding: '2px 8px', borderRadius: '12px', fontSize: 'var(--text-xs)', fontWeight: '600' }}>{category.count}</span>}
  			</button>
  		  ))}
  		</div>
  	  </div>
  	</div>
  </section>
));

// --- PRODUCT GRID (FIXED) ---
const ProductGrid = React.memo(({ t, loading, products, favorites, addToCart, requestQuote, toggleFavorite, viewSupplier, setSearchTerm, setSearchInput, setSelectedCategory }) => (
  <section id="products" style={{
  	padding: 'var(--space-20) 0',
  	backgroundColor: 'var(--gray-50)', // Fallback color
  	backgroundImage: `
  	  linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)), 
  	  url("/images/product-section-bg.jpg")
  	`,
  	backgroundSize: 'cover',
  	backgroundPosition: 'center',
  	backgroundAttachment: 'fixed'
  }}>
  	<div className="container">
  	  <div className="text-center mb-16">
  		<div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', background: 'var(--primary-50)', color: 'var(--primary-700)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-2xl)', fontSize: 'var(--text-sm)', fontWeight: '600', marginBottom: 'var(--space-6)', border: '1px solid var(--primary-200)', flexDirection: 'row' }}>{t.premiumProducts}</div>
  		<h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: '800', marginBottom: 'var(--space-4)', background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--primary-600) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t.productsTitle}</h2>
  		<p style={{ fontSize: 'var(--text-xl)', color: 'var(--gray-600)', maxWidth: '600px', margin: '0 auto' }}>{t.productsDescription}</p>
  	  </div>
  	  {loading && <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--gray-600)' }}><div style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)', animation: 'spin 2s linear infinite' }}>⚗️</div><p>Loading products...</p></div>}
  	  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
  		{products.map((product, index) => (
  		  <div key={product.id} className="card" style={{ animation: `fadeInUp 0.8s var(--ease-out) ${index * 0.1}s both` }}>
  			<div style={{ padding: 'var(--space-6) var(--space-6) 0', position: 'relative' }}>
  			  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-4)', flexDirection: 'row' }}>
  				<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexDirection: 'row' }}>
  				  {product.featured && <span style={{ background: 'linear-gradient(135deg, var(--accent-500), var(--accent-600))', color: 'var(--white)', padding: 'var(--space-1) var(--space-3)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-xs)', fontWeight: '700', textTransform: 'uppercase' }}>{t.featured}</span>}
  				  <span style={{ background: 'var(--emerald-50)', color: 'var(--emerald-700)', padding: 'var(--space-1) var(--space-3)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-xs)', fontWeight: '600', border: '1px solid var(--emerald-200)' }}>{product.purity}</span>
  				</div>
  				<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', background: 'var(--gray-50)', padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-200)', flexDirection: 'row' }}>
  				  <span style={{ color: '#f59e0b', fontSize: 'var(--text-lg)' }}>★</span><span style={{ fontSize: 'var(--text-sm)', fontWeight: '700', color: 'var(--gray-900)' }}>{product.rating}</span><span style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>({product.reviews})</span>
  				</div>
  			  </div>
  			  <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: '700', color: 'var(--gray-900)', marginBottom: 'var(--space-2)', lineHeight: '1.3', textAlign: 'left' }}>{product.name}</h3>
  			  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--primary-600)', fontWeight: '600', marginBottom: 'var(--space-4)', cursor: 'pointer', textDecoration: 'underline', textAlign: 'left' }} onClick={() => viewSupplier(product.supplierWebsite)}>{product.supplier}</p>
  			</div>

  			{/* --- THIS IS THE FIXED IMAGE BLOCK --- */}
  			<div style={{ height: '200px', background: 'var(--gray-100)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
  			  <img 
  				src={product.imageURL} 
  				alt={product.name} 
  				style={{ 
  				  width: '100%', 
  				  height: '100%', 
  				  objectFit: 'cover', // This makes the image cover the area
  				  transition: 'transform 0.3s var(--ease-out)' 
  				}}
  				onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
  				onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
  			  />
  			  <div style={{ position: 'absolute', bottom: 'var(--space-4)', right: 'var(--space-4)', background: product.delivery.includes('Express') ? 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))' : 'var(--gray-600)', color: 'var(--white)', padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-xs)', fontWeight: '700', boxShadow: 'var(--shadow-md)' }}>🚚 {product.delivery}</div>
  			</div>
  			{/* --- END OF FIXED BLOCK --- */}

  			<div style={{ padding: 'var(--space-6)' }}>
  			  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-4)', borderBottom: '2px solid var(--gray-100)', flexDirection: 'row' }}>
  				<div><span style={{ fontSize: 'var(--text-2xl)', fontWeight: '800', color: 'var(--gray-900)' }}>${product.price}</span><span style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-500)', marginLeft: 'var(--space-2)' }}>/ {product.unit}</span></div>
  				<div style={{ background: 'var(--primary-50)', color: 'var(--primary-700)', padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-xs)', fontWeight: '600', border: '1px solid var(--primary-200)' }}>{t.moq}: {product.moq}</div>
  			  </div>
  			  {product.description && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)', marginBottom: 'var(--space-4)', lineHeight: '1.5', textAlign: 'left' }}>{product.description}</p>}
  			  {product.certifications && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexDirection: 'row' }}>{product.certifications.map((cert, idx) => <span key={idx} style={{ background: 'var(--emerald-50)', color: 'var(--emerald-700)', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', fontWeight: '600', border: '1px solid var(--emerald-200)' }}>{cert}</span>)}</div>}
  			  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>{[{ icon: '🛡️', text: t.qualityCertified }, { icon: '🌍', text: t.globalShipping }, { icon: '📦', text: t.bulkDiscounts }, { icon: '🔒', text: t.securePayment }].map((feature, idx) => <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--gray-600)', flexDirection: 'row' }}><span>{feature.icon}</span><span>{feature.text}</span></div>)}</div>
  			  <div style={{ display: 'flex', gap: 'var(--space-3)', flexDirection: 'row' }}>
  				<button className="btn btn-primary" style={{ flex: 1 }} onClick={() => addToCart(product)}>{t.addToCart}</button>
  				<button className="btn btn-accent" onClick={() => requestQuote(product)}>{t.requestQuote}</button>
  				<button className="btn btn-secondary" style={{ padding: 'var(--space-3)', background: favorites.includes(product.id) ? 'var(--accent-500)' : 'var(--gray-100)', color: favorites.includes(product.id) ? 'var(--white)' : 'var(--gray-700)' }} onClick={() => toggleFavorite(product.id)}>{favorites.includes(product.id) ? '💖' : '❤️'}</button>
  			  </div>
  			</div>
  		  </div>
  		))}
  	  </div>
  	  {!loading && products.length === 0 && (
  		<div className="text-center" style={{ padding: 'var(--space-20)', background: 'var(--white)', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-lg)' }}>
  		  <div style={{ fontSize: 'var(--text-6xl)', marginBottom: 'var(--space-6)' }}>🔍</div>
  		  <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: '700', color: 'var(--gray-900)', marginBottom: 'var(--space-3)' }}>{t.noProductsFound}</h3>
  		  <p style={{ fontSize: 'var(--text-lg)', color: 'var(--gray-600)', marginBottom: 'var(--space-6)' }}>Try adjusting your search criteria or browse different categories</p>
  		  <button className="btn btn-primary" onClick={() => { setSearchTerm(''); setSearchInput(''); setSelectedCategory('all'); }}>{t.resetFilters}</button>
  		</div>
  	  )}
  	</div>
  </section>
));

// --- NEW DYNAMIC BLOG SECTION ---
const BlogSection = React.memo(({ t, activeBlogTab, setActiveBlogTab, blogPosts, blogLoading, blogError }) => (
  <section id="blog" style={{
  	padding: 'var(--space-20) 0',
  	background: 'transparent',
  	position: 'relative',
  	overflow: 'hidden'
  }}>
  	<div style={{ position: 'absolute', top: '10%', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(41,59,95,0.1) 0%, transparent 70%)', borderRadius: '50%', animation: 'float 8s ease-in-out infinite' }}></div>
  	<div className="container">
  	  <div className="text-center mb-16">
  		<div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', background: 'var(--primary-50)', color: 'var(--primary-700)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-2xl)', fontSize: 'var(--text-sm)', fontWeight: '600', marginBottom: 'var(--space-6)', border: '1px solid var(--primary-200)', flexDirection: 'row' }}>{t.industryIntelligence}</div>
  		<h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: '800', marginBottom: 'var(--space-4)', background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--primary-600) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t.insightsTitle}</h2>
  		<p style={{ fontSize: 'var(--text-xl)', color: 'var(--gray-600)', maxWidth: '600px', margin: '0 auto' }}>{t.insightsDescription}</p>
  	  </div>
  	  <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-12)', flexWrap: 'wrap', flexDirection: 'row' }}>
  		{[{ id: 'trends', name: t.marketTrends, icon: '📊' }, { id: 'innovations', name: t.innovations, icon: '⚡' }, { id: 'market', name: t.marketAnalysis, icon: '📈' }].map((tab) => (
  		  <button key={tab.id} onClick={() => setActiveBlogTab(tab.id)} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-4) var(--space-6)', border: '2px solid', borderColor: activeBlogTab === tab.id ? 'var(--primary-500)' : 'var(--gray-300)', background: activeBlogTab === tab.id ? 'linear-gradient(135deg, var(--primary-500), var(--primary-600))' : 'var(--white)', color: activeBlogTab === tab.id ? 'var(--white)' : 'var(--gray-700)', borderRadius: 'var(--radius-2xl)', fontSize: 'var(--text-base)', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s var(--ease-out)', boxShadow: activeBlogTab === tab.id ? 'var(--shadow-lg)' : 'var(--shadow-sm)', flexDirection: 'row' }} onMouseEnter={(e) => { if (activeBlogTab !== tab.id) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = 'var(--shadow-md)'; } }} onMouseLeave={(e) => { if (activeBlogTab !== tab.id) { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'var(--shadow-sm)'; } }}>
  			<span>{tab.icon}</span>{tab.name}
  		  </button>
  		))}
  	  </div>

  	  {/* --- DYNAMIC CONTENT AREA --- */}
  	  {blogLoading && (
  		<div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--gray-600)' }}>
  		  <div className="chemical-loading" style={{ margin: '0 auto var(--space-4)' }}></div>
  		  <p>{t.loadingInsights}</p>
  		</div>
  	  )}

  	  {blogError && (
  		<div style={{ textAlign: 'center', padding: 'var(--space-12)', background: 'var(--accent-50)', border: '1px solid var(--accent-200)', borderRadius: 'var(--radius-lg)', maxWidth: '600px', margin: '0 auto' }}>
  		  <p style={{color: 'var(--accent-700)', fontWeight: '600'}}>{t.errorLoadingInsights}:</p>
  		  <p style={{ color: 'var(--gray-700)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>{blogError}</p>
  		  <p style={{ color: 'var(--gray-500)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-4)' }}> (Please ensure you have added a valid NewsAPI.org key to App.jsx)</p>
  		</div>
  	  )}

  	  {!blogLoading && !blogError && blogPosts.length === 0 && (
  		  <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
  			<p style={{ fontSize: 'var(--text-lg)', color: 'var(--gray-600)' }}>{t.noArticlesFound}</p>
  		  </div>
  	  )}
  	  
  	  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
  		{!blogLoading && !blogError && blogPosts.map((post, index) => (
  		  <a 
  			href={post.url} 
  			target="_blank" 
  			rel="noopener noreferrer" 
  			key={post.id} 
  			className="card" 
  			style={{ textDecoration: 'none', color: 'inherit', animation: `fadeInUp 0.8s var(--ease-out) ${index * 0.1}s both`, display: 'flex', flexDirection: 'column' }}
  		  >
  			{post.imageUrl && (
  			  <div style={{ height: '200px', background: `url(${post.imageUrl}) center center / cover`, borderBottom: '1px solid var(--gray-200)', flexShrink: 0 }}></div>
  			)}
  			{!post.imageUrl && (
  			  <div style={{ height: '100px', background: 'var(--gray-100)', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)', fontSize: 'var(--text-4xl)', flexShrink: 0 }}>
  				📰
  			  </div>
  			)}
  			<div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
  			  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--primary-600)', fontWeight: '600', marginBottom: 'var(--space-2)' }}>{post.category}</p>
  			  <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: '700', color: 'var(--gray-900)', marginBottom: 'var(--space-4)', lineHeight: '1.3', flexGrow: 1, textAlign: 'left' }}>
  				{post.title}
  			  </h4>
  			  <p style={{ fontSize: 'var(--text-base)', color: 'var(--gray-600)', marginBottom: 'var(--space-4)', lineHeight: '1.6', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
  				{post.excerpt}
  			  </p>
  			  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 'auto' }}>
  				<div style={{ textAlign: 'left' }}>
  				  <div style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--gray-900)', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.author}</div>
  				  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>{post.date}</div>
  				</div>
  				<span className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>{t.readMore}</span>
  			  </div>
  			</div>
  		  </a>
  		))}
  	  </div>
  	  {/* --- END DYNAMIC CONTENT AREA --- */}

  	  <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-12)', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
  		<h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: '800', marginBottom: 'var(--space-4)', color: 'var(--gray-900)' }}>{t.subscribeTitle}</h3>
  		<p style={{ fontSize: 'var(--text-lg)', color: 'var(--gray-600)', marginBottom: 'var(--space-6)' }}>{t.subscribeDescription}</p>
  		<div style={{ display: 'flex', gap: 'var(--space-3)', maxWidth: '400px', margin: '0 auto', flexDirection: 'row' }}>
  		  <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: 'var(--space-3) var(--space-4)', border: '2px solid var(--gray-300)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-base)', transition: 'all 0.3s var(--ease-out)', textAlign: 'left' }} />
  		  <button className="btn btn-primary">{t.subscribe}</button>
  		</div>
  	  </div>
  	</div>
  </section>
));

const ContactAndSupplierSections = React.memo(({ t, contactForm, setContactForm, handleContactSubmit, supplierForm, setSupplierForm, handleSupplierRegister, contactLoading, supplierLoading }) => (
  <section style={{
  	padding: 'var(--space-20) 0',
  	background: 'transparent'
  }}>
  	<div className="container">
  	  <div id="contact" style={{ background: 'var(--white)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-12)', marginBottom: 'var(--space-12)', boxShadow: 'var(--shadow-lg)' }}>
  		<div className="text-center mb-8"><h3 style={{ fontSize: 'var(--text-3xl)', fontWeight: '800', marginBottom: 'var(--space-4)', color: 'var(--gray-900)' }}>{t.contactTitle}</h3><p style={{ fontSize: 'var(--text-lg)', color: 'var(--gray-600)' }}>{t.contactDescription}</p></div>
  		<form onSubmit={handleContactSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
  		  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
  			<input type="text" placeholder={t.name} value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} style={{ padding: 'var(--space-4)', border: '2px solid var(--gray-300)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-base)', transition: 'all 0.3s var(--ease-out)', textAlign: 'left' }} required />
  			<input type="email" placeholder={t.email} value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} style={{ padding: 'var(--space-4)', border: '2px solid var(--gray-300)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-base)', transition: 'all 0.3s var(--ease-out)', textAlign: 'left' }} required />
  			<textarea placeholder={t.message} rows="4" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} style={{ padding: 'var(--space-4)', border: '2px solid var(--gray-300)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-base)', transition: 'all 0.3s var(--ease-out)', resize: 'vertical', textAlign: 'left' }} required></textarea>
  			<button type="submit" className="btn btn-primary" disabled={contactLoading}>
  			  {contactLoading ? 'Sending...' : t.sendMessage}
  			</button>
  		  </div>
  		</form>
  	  </div>
  	  <div id="suppliers" style={{ background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-12)', textAlign: 'center', color: 'var(--white)', boxShadow: 'var(--shadow-2xl)' }}>
  		<h3 style={{ fontSize: 'var(--text-3xl)', fontWeight: '800', marginBottom: 'var(--space-4)' }}>{t.supplierTitle}</h3>
  		<p style={{ fontSize: 'var(--text-xl)', opacity: 0.9, marginBottom: 'var(--space-8)', maxWidth: '600px', margin: '0 auto' }}>{t.supplierDescription}</p>
  		<form onSubmit={handleSupplierRegister} style={{ maxWidth: '500px', margin: '0 auto' }}>
  		  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
  			<input type="text" placeholder={t.companyName} value={supplierForm.companyName} onChange={(e) => setSupplierForm({ ...supplierForm, companyName: e.target.value })} style={{ padding: 'var(--space-4)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-base)', background: 'rgba(255,255,255,0.1)', color: 'var(--white)', backdropFilter: 'blur(10px)', textAlign: 'left' }} required />
  			<input type="email" placeholder={t.businessEmail} value={supplierForm.email} onChange={(e) => setSupplierForm({ ...supplierForm, email: e.target.value })} style={{ padding: 'var(--space-4)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-base)', background: 'rgba(255,255,255,0.1)', color: 'var(--white)', backdropFilter: 'blur(10px)', textAlign: 'left' }} required />
  			<input type="tel" placeholder={t.phone} value={supplierForm.phone} onChange={(e) => setSupplierForm({ ...supplierForm, phone: e.target.value })} style={{ padding: 'var(--space-4)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-base)', background: 'rgba(255,255,255,0.1)', color: 'var(--white)', backdropFilter: 'blur(10px)', textAlign: 'left' }} required />
  			<input type="text" placeholder={t.productsSupply} value={supplierForm.products} onChange={(e) => setSupplierForm({ ...supplierForm, products: e.target.value })} style={{ padding: 'var(--space-4)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-base)', background: 'rgba(255,255,255,0.1)', color: 'var(--white)', backdropFilter: 'blur(10px)', textAlign: 'left' }} required />
  			<textarea placeholder={t.companyDescription} rows="3" value={supplierForm.description} onChange={(e) => setSupplierForm({ ...supplierForm, description: e.target.value })} style={{ padding: 'var(--space-4)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-base)', background: 'rgba(255,255,255,0.1)', color: 'var(--white)', backdropFilter: 'blur(10px)', resize: 'vertical', textAlign: 'left' }} required></textarea>
  			<button type="submit" className="btn" style={{ background: 'var(--white)', color: 'var(--primary-600)', fontWeight: '700' }} disabled={supplierLoading}>
  			  {supplierLoading ? 'Submitting...' : t.submitApplication}
  			</button>
  		  </div>
  		</form>
  	  </div>
  	</div>
  </section>
));

const Footer = React.memo(({ t, scrollToSection }) => (
  <footer style={{ background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%)', color: 'var(--white)', padding: 'var(--space-16) 0 var(--space-8)', position: 'relative', overflow: 'hidden' }}>
  	<div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)', borderRadius: '50%' }}></div>
  	<div className="container-wide">
  	  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-12)', marginBottom: 'var(--space-12)', position: 'relative', zIndex: 10 }}>
  		<div>
  		  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: '800', background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--accent-500) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 'var(--space-6)' }}>ChemMarket</div>
  		  <p style={{ color: 'var(--gray-400)', lineHeight: '1.7', marginBottom: 'var(--space-6)', fontSize: 'var(--text-lg)', textAlign: 'left' }}>{t.footerDescription}</p>
  		  <div style={{ display: 'flex', gap: 'var(--space-4)', flexDirection: 'row' }}>
  			{[{ icon: '📧', label: 'Email', link: 'mailto:info@chemmarket.com' }, { icon: '📱', label: 'Phone', link: 'tel:+989120351143' }, { icon: '🐦', label: 'Twitter', link: 'https://twitter.com/chemmarket' }, { icon: '💼', label: 'LinkedIn', link: 'https://linkedin.com/company/chemmarket' }].map((social, index) => (
  			  <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" style={{ width: '50px', height: '50px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xl)', cursor: 'pointer', transition: 'all 0.3s var(--ease-out)', textDecoration: 'none', color: 'var(--white)' }} onMouseEnter={(e) => { e.target.style.background = 'var(--primary-500)'; e.target.style.transform = 'translateY(-3px)'; }} onMouseLeave={(e) => { e.target.style.background = 'rgba(255, 255, 255, 0.1)'; e.target.style.transform = 'translateY(0)'; }}>{social.icon}</a>
  			))}
  		  </div>
  		</div>
  		<div>
  		  <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: '700', marginBottom: 'var(--space-6)', color: 'var(--white)', textAlign: 'left' }}>{t.marketplace}</h4>
  		  <ul style={{ listStyle: 'none' }}>
  			{[{ name: t.browseProducts, action: () => scrollToSection('products') }, { name: t.insights, action: () => scrollToSection('blog') }, { name: t.suppliers, action: () => scrollToSection('suppliers') }, { name: t.qualityStandards, action: () => alert('Quality standards information coming soon!') }, { name: t.globalShipping, action: () => alert('Shipping information coming soon!') }].map((item, index) => (
  			  <li key={index} style={{ marginBottom: 'var(--space-3)' }}><button onClick={item.action} style={{ background: 'none', border: 'none', color: 'var(--gray-400)', fontSize: 'var(--text-base)', transition: 'all 0.3s var(--ease-out)', display: 'block', padding: 'var(--space-1) 0', cursor: 'pointer', textAlign: 'left', width: '100%' }} onMouseEnter={(e) => { e.target.style.color = 'var(--primary-300)'; e.target.style.transform = 'translateX(8px)'; }} onMouseLeave={(e) => { e.target.style.color = 'var(--gray-400)'; e.target.style.transform = 'translateX(0)'; }}>→ {item.name}</button></li>
  			))}
  		  </ul>
  		</div>
  		<div>
  		  <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: '700', marginBottom: 'var(--space-6)', color: 'var(--white)', textAlign: 'left' }}>{t.support}</h4>
  		  <ul style={{ listStyle: 'none' }}>
  			{[{ name: t.helpCenter, action: () => alert('Help center coming soon!') }, { name: t.contact, action: () => scrollToSection('contact') }, { name: t.documentation, action: () => alert('Documentation coming soon!') }, { name: t.apiAccess, action: () => alert('API access coming soon!') }, { name: t.statusPage, action: () => alert('System status: All systems operational!') }].map((item, index) => (
  			  <li key={index} style={{ marginBottom: 'var(--space-3)' }}><button onClick={item.action} style={{ background: 'none', border: 'none', color: 'var(--gray-400)', fontSize: 'var(--text-base)', transition: 'all 0.3s var(--ease-out)', display: 'block', padding: 'var(--space-1) 0', cursor: 'pointer', textAlign: 'left', width: '100%' }} onMouseEnter={(e) => { e.target.style.color = 'var(--primary-300)'; e.target.style.transform = 'translateX(8px)'; }} onMouseLeave={(e) => { e.target.style.color = 'var(--gray-400)'; e.target.style.transform = 'translateX(0)'; }}>⚡ {item.name}</button></li>
  			))}
  		  </ul>
  		</div>
  		<div>
  		  <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: '700', marginBottom: 'var(--space-6)', color: 'var(--white)', textAlign: 'left' }}>{t.company}</h4>
  		  <ul style={{ listStyle: 'none' }}>
  			{[{ name: t.aboutUs, action: () => alert('About ChemMarket: Leading chemical marketplace since 2024!') }, { name: t.careers, action: () => alert('Career opportunities coming soon!') }, { name: t.pressKit, action: () => alert('Press kit available upon request.') }, { name: t.sustainability, action: () => alert('Sustainability initiatives coming soon!') }, { name: t.partners, action: () => alert('Partnership program details coming soon!') }].map((item, index) => (
  			  <li key={index} style={{ marginBottom: 'var(--space-3)' }}><button onClick={item.action} style={{ background: 'none', border: 'none', color: 'var(--gray-400)', fontSize: 'var(--text-base)', transition: 'all 0.3s var(--ease-out)', display: 'block', padding: 'var(--space-1) 0', cursor: 'pointer', textAlign: 'left', width: '100%' }} onMouseEnter={(e) => { e.target.style.color = 'var(--primary-300)'; e.target.style.transform = 'translateX(8px)'; }} onMouseLeave={(e) => { e.target.style.color = 'var(--gray-400)'; e.target.style.transform = 'translateX(0)'; }}>🏢 {item.name}</button></li>
  			))}
  		  </ul>
  		</div>
  	  </div>
  	  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: 'var(--space-8)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', color: 'var(--gray-400)', fontSize: 'var(--text-sm)', flexDirection: 'row' }}>
  		<div>{t.copyright}</div>
  		<div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center', flexDirection: 'row' }}>
  		  {[{ name: t.privacyPolicy, action: () => alert('Privacy policy details coming soon!') }, { name: t.termsOfService, action: () => alert('Terms of service details coming soon!') }, { name: t.cookiePolicy, action: () => alert('Cookie policy details coming soon!') }, { name: t.compliance, action: () => alert('Compliance information coming soon!') }].map((item, index) => (
  			<button key={index} onClick={item.action} style={{ background: 'none', border: 'none', color: 'var(--gray-400)', textDecoration: 'none', transition: 'color 0.3s var(--ease-out)', cursor: 'pointer', fontSize: 'var(--text-sm)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-300)'} onMouseLeave={(e) => e.target.style.color = 'var(--gray-400)'}>{item.name}</button>
  		  ))}
  		</div>
  	  </div>
  	</div>
  </footer>
));

const LoginModal = React.memo(({ showLoginModal, setShowLoginModal, t, setShowSignupModal }) => {
  const { login, authLoading } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
  	e.preventDefault();
  	const result = await login(loginForm);
  	if (result.success) {
  	  setShowLoginModal(false);
  	  setLoginForm({ email: '', password: '' });
  	}
  };

  return (
  	<div className={`modal-overlay ${showLoginModal ? 'show' : ''}`} onClick={() => setShowLoginModal(false)}>
  	  <div className="modal-content" style={{ maxWidth: '450px' }} onClick={(e) => e.stopPropagation()}>
  		<button onClick={() => setShowLoginModal(false)} style={{ position: 'absolute', top: 'var(--space-4)', right: 'var(--space-4)', background: 'var(--gray-100)', border: 'none', borderRadius: 'var(--radius-lg)', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 'var(--text-lg)', transition: 'all 0.3s var(--ease-out)' }} onMouseEnter={(e) => { e.target.style.background = 'var(--accent-500)'; e.target.style.color = 'var(--white)'; }} onMouseLeave={(e) => { e.target.style.background = 'var(--gray-100)'; e.target.style.color = 'inherit'; }}>✕</button>
  		<div className="text-center mb-6"><h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: '800', marginBottom: 'var(--space-2)', color: 'var(--gray-900)' }}>{t.welcomeBack}</h3><p style={{ color: 'var(--gray-600)', fontSize: 'var(--text-base)' }}>{t.signInTo}</p></div>
  		<form onSubmit={handleLogin}>
  		  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
  			<div><label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: '600', marginBottom: 'var(--space-2)', color: 'var(--gray-700)' }}>{t.emailAddress}</label><input type="email" placeholder="Enter your email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} style={{ width: '100%', padding: 'var(--space-4)', border: '2px solid var(--gray-300)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-base)', transition: 'all 0.3s var(--ease-out)', textAlign: 'left' }} required /></div>
  			<div><label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: '600', marginBottom: 'var(--space-2)', color: 'var(--gray-700)' }}>{t.password}</label><input type="password" placeholder="Enter your password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} style={{ width: '100%', padding: 'var(--space-4)', border: '2px solid var(--gray-300)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-base)', transition: 'all 0.3s var(--ease-out)', textAlign: 'left' }} required /></div>
  		  </div>
  		  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: 'var(--space-4)' }} disabled={authLoading}>{authLoading ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)' }}><div style={{ animation: 'spin 1s linear infinite' }}>⏳</div>{t.signingIn}</span> : t.signIn}</button>
  		  <div className="text-center"><p style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>{t.noAccount} <button type="button" onClick={() => { setShowLoginModal(false); setShowSignupModal(true); }} style={{ background: 'none', border: 'none', color: 'var(--primary-600)', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}>{t.signUpNow}</button></p></div>
  		</form>
  	  </div>
  	</div>
  )
});

const SignupModal = React.memo(({ showSignupModal, setShowSignupModal, t, setShowLoginModal }) => {
  const { signup, authLoading } = useAuth();
  const [signupForm, setSignupForm] = useState({ fullName: '', email: '', password: '', company: '', role: 'buyer' });

  const handleSignup = async (e) => {
  	e.preventDefault();
  	const result = await signup({
  	  name: signupForm.fullName,
  	  email: signupForm.email,
  	  password: signupForm.password,
  	  company: signupForm.company,
  	  role: signupForm.role,
  	});
  	if (result.success) {
  	  setShowSignupModal(false);
  	  setSignupForm({ fullName: '', email: '', password: '', company: '', role: 'buyer' });
  	}
  };

  return (
  	<div className={`modal-overlay ${showSignupModal ? 'show' : ''}`} onClick={() => setShowSignupModal(false)}>
  	  <div className="modal-content" style={{ maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
  		<button onClick={() => setShowSignupModal(false)} style={{ position: 'absolute', top: 'var(--space-4)', right: 'var(--space-4)', background: 'var(--gray-100)', border: 'none', borderRadius: 'var(--radius-lg)', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 'var(--text-lg)', transition: 'all 0.3s var(--ease-out)' }} onMouseEnter={(e) => { e.target.style.background = 'var(--accent-500)'; e.target.style.color = 'var(--white)'; }} onMouseLeave={(e) => { e.target.style.background = 'var(--gray-100)'; e.target.style.color = 'inherit'; }}>✕</button>
  		<div className="text-center mb-6"><h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: '800', marginBottom: 'var(--space-2)', color: 'var(--gray-900)' }}>{t.joinChemMarket}</h3><p style={{ color: 'var(--gray-600)', fontSize: 'var(--text-base)' }}>{t.createAccount}</p></div>
  		<form onSubmit={handleSignup}>
  		  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
  			<div><label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: '600', marginBottom: 'var(--space-2)', color: 'var(--gray-700)' }}>{t.fullName}</label><input type="text" placeholder="Enter your full name" value={signupForm.fullName} onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })} style={{ width: '100%', padding: 'var(--space-4)', border: '2px solid var(--gray-300)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-base)', transition: 'all 0.3s var(--ease-out)', textAlign: 'left' }} required /></div>
  			<div><label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: '600', marginBottom: 'var(--space-2)', color: 'var(--gray-700)' }}>{t.emailAddress}</label><input type="email" placeholder="Enter your business email" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} style={{ width: '100%', padding: 'var(--space-4)', border: '2px solid var(--gray-300)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-base)', transition: 'all 0.3s var(--ease-out)', textAlign: 'left' }} required /></div>
  			<div><label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: '600', marginBottom: 'var(--space-2)', color: 'var(--gray-700)' }}>{t.password}</label><input type="password" placeholder="Create a strong password" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} style={{ width: '100%', padding: 'var(--space-4)', border: '2px solid var(--gray-300)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-base)', transition: 'all 0.3s var(--ease-out)', textAlign: 'left' }} required /></div>
  			<div><label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: '600', marginBottom: 'var(--space-2)', color: 'var(--gray-700)' }}>Company Name</label><input type="text" placeholder="Enter your company name" value={signupForm.company} onChange={(e) => setSignupForm({ ...signupForm, company: e.target.value })} style={{ width: '100%', padding: 'var(--space-4)', border: '2px solid var(--gray-300)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-base)', transition: 'all 0.3s var(--ease-out)', textAlign: 'left' }} required /></div>
  			<div><label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: '600', marginBottom: 'var(--space-2)', color: 'var(--gray-700)' }}>I am a:</label><div style={{ display: 'flex', gap: 'var(--space-4)', flexDirection: 'row' }}>{[{ value: 'buyer', label: t.roleBuyer, description: t.roleDescriptionBuyer }, { value: 'supplier', label: t.roleSupplier, description: t.roleDescriptionSupplier }, { value: 'both', label: t.roleBoth, description: t.roleDescriptionBoth }].map((option) => (<label key={option.value} style={{ flex: 1, border: `2px solid ${signupForm.role === option.value ? 'var(--primary-500)' : 'var(--gray-300)'}`, borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', cursor: 'pointer', transition: 'all 0.3s var(--ease-out)', background: signupForm.role === option.value ? 'var(--primary-50)' : 'var(--white)', textAlign: 'center' }}><input type="radio" name="role" value={option.value} checked={signupForm.role === option.value} onChange={(e) => setSignupForm({ ...signupForm, role: e.target.value })} style={{ display: 'none' }} /><div><div style={{ fontWeight: '600', marginBottom: 'var(--space-1)', color: 'var(--gray-900)' }}>{option.label}</div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-600)' }}>{option.description}</div></div></label>))}</div></div>
  		  </div>
  		  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: 'var(--space-4)' }} disabled={authLoading}>{authLoading ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)' }}><div style={{ animation: 'spin 1s linear infinite' }}>⏳</div>{t.creatingAccount}</span> : t.getStarted}</button>
  		  <div className="text-center"><p style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>{t.haveAccount} <button type="button" onClick={() => { setShowSignupModal(false); setShowLoginModal(true); }} style={{ background: 'none', border: 'none', color: 'var(--primary-600)', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}>{t.signInHere}</button></p></div>
  		</form>
  	  </div>
  	</div>
  )
});

// --- MAIN APP COMPONENT ---
function App() {
  const [currentLanguage] = useState('en');
  const [, setIsRTL] = useState(false);
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
  	setIsRTL(false);
  	document.documentElement.dir = 'ltr';
  	document.documentElement.lang = 'en';
  	document.body.classList.remove('persian-lang');
  }, []);

  const t = useMemo(() => translations[currentLanguage], [currentLanguage]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [supplierLoading, setSupplierLoading] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [supplierForm, setSupplierForm] = useState({ companyName: '', email: '', phone: '', products: '', description: '' });
  const [activeNav, setActiveNav] = useState('products');
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeBlogTab, setActiveBlogTab] = useState('trends');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // --- NEW STATE FOR BLOGS ---
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogError, setBlogError] = useState(null);

  const searchTimeoutRef = useRef(null);

  const handleSearchInputChange = useCallback((e) => {
  	const value = e.target.value;
  	setSearchInput(value);
  	if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
  	searchTimeoutRef.current = setTimeout(() => setSearchTerm(value), 300);
  }, []);

  useEffect(() => { return () => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current); }; }, []);

  useEffect(() => {
  	const initializeData = async () => {
  	  setProductsLoading(true);
  	  try {
  		await api.healthCheck();
  		const productsResult = await api.getProducts();
  		setProducts(productsResult.products || staticProducts);
  		const categoriesResult = await api.getCategories();
  		setCategories(categoriesResult || []);
  	  } catch (error) {
  		console.error('Backend connection failed, using static data:', error);
  		setProducts(staticProducts);
  		const cats = [
  		  { id: 'all', name: t.allCategories, count: staticProducts.length },
  		  { id: 'solvents', name: t.solvents, count: staticProducts.filter(p => p.category === 'solvents').length },
  		  { id: 'inorganic', name: t.inorganic, count: staticProducts.filter(p => p.category === 'inorganic').length },
  		  { id: 'pharma', name: t.pharma, count: staticProducts.filter(p => p.category === 'pharma').length },
  		  { id: 'agro', name: t.agro, count: staticProducts.filter(p => p.category === 'agro').length },
  		  { id: 'polymers', name: t.polymers, count: staticProducts.filter(p => p.category === 'polymers').length },
  		];
  		setCategories(cats);
  	  } finally {
  		setProductsLoading(false);
  	  }
  	};
  	initializeData();
  }, [t]);

  // --- NEW useEffect to FETCH REAL-TIME BLOGS ---
  useEffect(() => {
  	const fetchBlogPosts = async () => {
  	  setBlogLoading(true);
  	  setBlogError(null);
  	  
  	  // ------------------------------------------------------------------
  	  // --- ⚠️ YOUR API KEY IS NOW CORRECTLY PLACED HERE ---
  	  // ------------------------------------------------------------------
  	  const NEWS_API_KEY = 'f70d40b84fb947ffa0517bcf8e45cde7';
  	  // ------------------------------------------------------------------

  	  // THIS IS THE FIXED LOGIC. It checks for the placeholder, not your key.
  	  if (NEWS_API_KEY === 'YOUR_NEWS_API_KEY_HERE') {
  		console.error('No News API Key provided. Please add it to App.jsx to fetch real data.');
  		setBlogError('API Key not configured. Please add your NewsAPI.org key to App.jsx.');
  		setBlogPosts([]);
  		setBlogLoading(false);
  		return;
  	  }

  	  // --- REVERTED NEWS QUERY ---
  	  // This query is now back to the original "chemical industry" search.
  	  let query = 'chemical industry';
  	  if (activeBlogTab === 'trends') {
  		query = '"chemical industry" market trends';
  	  } else if (activeBlogTab === 'innovations') {
  		query = '"chemical industry" innovations OR "green chemistry"';
  	  } else if (activeBlogTab === 'market') {
  		query = '"chemical industry" market analysis OR "chemical prices"';
  	  }

  	  try {
  		const data = await api.getNews(query, NEWS_API_KEY);
  		// Adapt NewsAPI data to the structure our component expects
  		const adaptedPosts = data.articles.map(article => ({
  		  id: article.url, // Use URL as a unique ID
  		  title: article.title,
  		  excerpt: article.description || 'No description available.',
  		  imageUrl: article.urlToImage,
  		  category: article.source.name, // e.g., "Reuters", "Bloomberg"
  		  date: new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  		  author: article.author || article.source.name,
  		  url: article.url, // Link to the full article
  		}));
  		setBlogPosts(adaptedPosts);
  	  } catch (error) {
  		console.error('Failed to fetch blog posts:', error);
  		setBlogError(error.message);
  		setBlogPosts([]);
  	  } finally {
  		setBlogLoading(false);
  	  }
  	};

  	fetchBlogPosts();
  }, [activeBlogTab]); // Re-fetch when the tab changes

  useEffect(() => {
  	const loadFilteredProducts = async () => {
  	  setProductsLoading(true);
  	  try {
  		const filters = {};
  		if (selectedCategory !== 'all') filters.category = selectedCategory;
  		if (searchTerm) filters.search = searchTerm;
  		const result = await api.getProducts(filters);
  		setProducts(result.products || []);
  	  } catch (error) {
  		let filteredProducts = staticProducts;
  		if (selectedCategory !== 'all') filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
  		if (searchTerm) filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.supplier.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase()));
  		setProducts(filteredProducts);
  	  } finally {
  		setProductsLoading(false);
  	  }
  	};
  	loadFilteredProducts();
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
  	const handleScroll = () => setIsScrolled(window.scrollY > 50);
  	window.addEventListener('scroll', handleScroll);
  	return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = useCallback(() => setShowSignupModal(true), []);
  const handleSignIn = useCallback(() => setShowLoginModal(true), []);

  const handleContactSubmit = useCallback(async (e) => {
  	e.preventDefault();
  	setContactLoading(true);
  	try {
  	  await api.submitContact(contactForm);
  	  alert('Thank you for your message! We will get back to you soon.');
  	  setContactForm({ name: '', email: '', message: '' });
  	} catch (error) {
  	  console.error('Contact submit failed:', error);
  	  alert(`Error: ${error.message}. Please try again.`);
  	} finally {
  	  setContactLoading(false);
  	}
  }, [contactForm]);

  const handleSupplierRegister = useCallback(async (e) => {
  	e.preventDefault();
  	setSupplierLoading(true);
  	try {
  	  await api.registerSupplier(supplierForm);
  	  alert('Thank you for your interest! Our team will contact you shortly.');
  	  setSupplierForm({ companyName: '', email: '', phone: '', products: '', description: '' });
  	} catch (error) {
  	  console.error('Supplier register failed:', error);
  	  alert(`Error: ${error.message}. Please try again.`);
  	} finally {
  	  setSupplierLoading(false);
  	}
  }, [supplierForm]);

  const addToCart = useCallback(async (product) => {
  	if (!isLoggedIn) {
  	  setShowLoginModal(true);
  	  return;
  	}
  	try {
  	  await api.addToCart(product.id, 1, user.token);
  	  setCartItems(prev => [...prev, product]);
  	  alert(t.addedToCart.replace('{product}', product.name));
  	} catch (error) {
  	  console.error('Add to cart failed:', error);
  	  alert(`Error: ${error.message}. Could not add item to cart.`);
  	}
  }, [isLoggedIn, user, t]);

  const toggleFavorite = useCallback(async (productId) => {
  	if (!isLoggedIn) {
  	  setShowLoginModal(true);
  	  return;
  	}
  	try {
  	  await api.toggleFavorite(productId, user.token);
  	  setFavorites(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  	} catch (error) {
  	  console.error('Toggle favorite failed:', error);
  	  alert(`Error: ${error.message}. Could not update favorites.`);
  	  setFavorites(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  	}
  }, [isLoggedIn, user]);

  const requestQuote = useCallback((product) => {
  	if (!isLoggedIn) {
  	  setShowLoginModal(true);
  	  return;
  	}
  	alert(t.quoteRequested.replace('{product}', product.name));
  }, [isLoggedIn, t]);

  const viewSupplier = useCallback((website) => window.open(website, '_blank'), []);
  const scrollToSection = useCallback((sectionId) => { const element = document.getElementById(sectionId); if (element) element.scrollIntoView({ behavior: 'smooth' }); }, []);

  return (
  	// **** This div includes the fix for the CSS shadow background ****
  	<div style={{ minHeight: '100vh', direction: 'ltr', position: 'relative', isolation: 'isolate' }}>
  	  <Header
  		isScrolled={isScrolled}
  		t={t}
  		activeNav={activeNav}
  		setActiveNav={setActiveNav}
  		scrollToSection={scrollToSection}
  		favorites={favorites}
  		cartItems={cartItems}
  		handleSignIn={handleSignIn}
  		handleGetStarted={handleGetStarted}
  	  />
  	  <Hero t={t} scrollToSection={scrollToSection} />
  	  <SearchFilters
  		t={t}
  		searchInput={searchInput}
  		handleSearchInputChange={handleSearchInputChange}
  		categories={categories}
  		selectedCategory={selectedCategory}
  		setSelectedCategory={setSelectedCategory}
  	  />
  	  <ProductGrid
  		t={t}
  		loading={productsLoading}
  		products={products}
  		favorites={favorites}
  		addToCart={addToCart}
  		requestQuote={requestQuote}
  		toggleFavorite={toggleFavorite}
  		viewSupplier={viewSupplier}
  		setSearchTerm={setSearchTerm}
  		setSearchInput={setSearchInput}
  		setSelectedCategory={setSelectedCategory}
  	  />
  	  {/* Pass new blog props to the BlogSection */}
  	  <BlogSection 
  		  t={t} 
  		  activeBlogTab={activeBlogTab}
  		  setActiveBlogTab={setActiveBlogTab}
  		  blogPosts={blogPosts}
  		  blogLoading={blogLoading}
  		  blogError={blogError}
  	  />
  	  <ContactAndSupplierSections
  		t={t}
  		contactForm={contactForm}
  		setContactForm={setContactForm}
  		handleContactSubmit={handleContactSubmit}
  		supplierForm={supplierForm}
  		setSupplierForm={setSupplierForm}
  		handleSupplierRegister={handleSupplierRegister}
  		contactLoading={contactLoading}
  		supplierLoading={supplierLoading}
  	  />
  	  <Footer t={t} scrollToSection={scrollToSection} />

  	  <LoginModal
  		showLoginModal={showLoginModal}
  		setShowLoginModal={setShowLoginModal}
Two-Step   		t={t}
  		setShowSignupModal={setShowSignupModal}
  	  />
  	  <SignupModal
  		showSignupModal={showSignupModal}
  		setShowSignupModal={setShowSignupModal}
  		t={t}
  		setShowLoginModal={setShowLoginModal}
  	  />
  	</div>
  );
}

// Wrap the App in the AuthProvider
const AppWrapper = () => (
  <AuthProvider>
  	<App />
  </AuthProvider>
);

export default AppWrapper;