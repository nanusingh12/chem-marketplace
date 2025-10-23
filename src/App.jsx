import React, { useState, useEffect } from 'react';
import './index.css';
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

function App() {
  const [searchTerm, setSearchTerm] = useState('');
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

  // Static fallback data
  const staticProducts = [
    {
      id: 1,
      name: 'Acetone 99.5% Ultra Pure',
      category: 'solvents',
      supplier: 'ChemSupply Global Inc.',
      price: 45.00,
      unit: '20L drum',
      rating: 4.8,
      reviews: 124,
      featured: true,
      delivery: '24h Express',
      purity: '99.9%',
      moq: '5 drums',
      inStock: true,
      description: 'High-purity acetone suitable for laboratory and industrial use.',
      image: '🧪',
      supplierWebsite: 'https://chemsupply.com',
      safetyData: 'Available',
      certifications: ['ISO 9001', 'GMP']
    },
    {
      id: 2,
      name: 'Sodium Hydroxide Pearl',
      category: 'inorganic',
      supplier: 'BaseChem Laboratories',
      price: 28.50,
      unit: '25kg bag',
      rating: 4.6,
      reviews: 89,
      delivery: '48h Standard',
      purity: '99%',
      moq: '10 bags',
      inStock: true,
      description: 'Sodium hydroxide pearls for various industrial applications.',
      image: '⚗️',
      supplierWebsite: 'https://basechemlabs.com',
      safetyData: 'Available',
      certifications: ['ISO 14001']
    },
    {
      id: 3,
      name: 'Ethanol Absolute ACS',
      category: 'solvents',
      supplier: 'PureSolvents International',
      price: 62.00,
      unit: '20L drum',
      rating: 4.9,
      reviews: 156,
      featured: true,
      delivery: '24h Express',
      purity: '99.9%',
      moq: '2 drums',
      inStock: true,
      description: 'Absolute ethanol meeting ACS specifications.',
      image: '💧',
      supplierWebsite: 'https://puresolvents.com',
      safetyData: 'Available',
      certifications: ['ACS Grade', 'ISO 9001']
    },
    {
      id: 4,
      name: 'Polyethylene HDPE Granules',
      category: 'polymers',
      supplier: 'PolyTech Global',
      price: 1.25,
      unit: 'kg',
      rating: 4.4,
      reviews: 67,
      delivery: '72h Economy',
      purity: 'Food Grade',
      moq: '1000 kg',
      inStock: true,
      description: 'High-density polyethylene granules for manufacturing.',
      image: '🔗',
      supplierWebsite: 'https://polytechglobal.com',
      safetyData: 'Available',
      certifications: ['FDA Approved', 'Food Grade']
    },
    {
      id: 5,
      name: 'Aspirin BP/USP Grade',
      category: 'pharma',
      supplier: 'MediChem Pharmaceuticals',
      price: 120.00,
      unit: 'kg',
      rating: 4.7,
      reviews: 203,
      featured: true,
      delivery: '48h Standard',
      purity: 'BP Grade',
      moq: '25 kg',
      inStock: true,
      description: 'Pharmaceutical grade aspirin meeting BP and USP standards.',
      image: '💊',
      supplierWebsite: 'https://medichem.com',
      safetyData: 'Available',
      certifications: ['BP Grade', 'USP Grade', 'GMP']
    },
    {
      id: 6,
      name: 'Ammonium Nitrate Fertilizer',
      category: 'agro',
      supplier: 'AgroGrowth Solutions',
      price: 0.85,
      unit: 'kg',
      rating: 4.3,
      reviews: 45,
      delivery: '72h Economy',
      purity: '34.5% N',
      moq: '5000 kg',
      inStock: true,
      description: 'High-nitrogen fertilizer for agricultural use.',
      image: '🌱',
      supplierWebsite: 'https://agrogrowth.com',
      safetyData: 'Available',
      certifications: ['Organic Certified']
    }
  ];

  const staticBlogPosts = {
    trends: [
      {
        id: 1,
        title: 'Green Chemistry Revolution: Sustainable Alternatives Gaining Market Share',
        excerpt: 'Bio-based chemicals projected to capture 25% of market by 2025 as companies prioritize sustainability.',
        image: '🌿',
        category: 'Sustainability',
        date: '2024-01-15',
        readTime: '4 min read',
        author: 'Dr. Sarah Chen',
        authorRole: 'Sustainability Expert',
        trending: true,
        views: '2.4K'
      },
      {
        id: 2,
        title: 'AI-Driven Chemical Discovery Accelerates Drug Development',
        excerpt: 'Machine learning algorithms reducing discovery time from years to months in pharmaceutical research.',
        image: '🤖',
        category: 'Innovation',
        date: '2024-01-12',
        readTime: '6 min read',
        author: 'Prof. Michael Rodriguez',
        authorRole: 'AI Research Director',
        trending: true,
        views: '1.8K'
      }
    ],
    innovations: [
      {
        id: 3,
        title: 'Carbon Capture Breakthrough: New Catalysts Convert CO2 to Valuable Chemicals',
        excerpt: 'Revolutionary catalyst technology turns industrial emissions into profitable chemical products.',
        image: '⚡',
        category: 'Breakthrough',
        date: '2024-01-08',
        readTime: '7 min read',
        author: 'Dr. James Thompson',
        authorRole: 'Catalysis Researcher',
        trending: true,
        views: '3.1K'
      }
    ],
    market: [
      {
        id: 4,
        title: 'Specialty Chemicals Market to Reach $1.2 Trillion by 2026',
        excerpt: 'Electronics and automotive sectors driving unprecedented growth in high-value chemical segments.',
        image: '📈',
        category: 'Market Report',
        date: '2024-01-03',
        readTime: '8 min read',
        author: 'Robert Kim',
        authorRole: 'Market Strategist',
        trending: true,
        views: '2.7K'
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
          { id: 'all', name: 'All Categories', count: staticProducts.length },
          { id: 'solvents', name: 'Solvents', count: staticProducts.filter(p => p.category === 'solvents').length },
          { id: 'inorganic', name: 'Inorganic Chemicals', count: staticProducts.filter(p => p.category === 'inorganic').length },
          { id: 'pharma', name: 'Pharmaceuticals', count: staticProducts.filter(p => p.category === 'pharma').length },
          { id: 'agro', name: 'Agrochemicals', count: staticProducts.filter(p => p.category === 'agro').length },
          { id: 'polymers', name: 'Polymers', count: staticProducts.filter(p => p.category === 'polymers').length },
        ]);
      }
    };

    initializeData();
  }, []);

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
  }, [selectedCategory, searchTerm]);

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
      alert(`🎉 Welcome back, ${userData.name}!`);
    } catch (error) {
      alert('Login failed. Please check your connection and try again.');
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
      alert(`🚀 Welcome to ChemMarket, ${userData.name}!`);
    } catch (error) {
      alert('Registration failed. Please try again.');
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
    alert('👋 You have been logged out successfully.');
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
      alert(result.message || 'Thank you for your message! We will get back to you soon.');
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Thank you for your message! We will get back to you soon.');
      setContactForm({ name: '', email: '', message: '' });
    }
  };

  const handleSupplierRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await api.registerSupplier(supplierForm);
      alert(result.message || 'Thank you for your interest! Our team will contact you shortly.');
      setSupplierForm({ companyName: '', email: '', phone: '', products: '', description: '' });
    } catch (error) {
      alert('Thank you for your interest! Our team will contact you shortly.');
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
      alert(`✅ ${product.name} added to cart!`);
    } catch (error) {
      setCartItems(prev => [...prev, product]);
      alert(`✅ ${product.name} added to cart!`);
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
    alert(`📧 Quote request sent for ${product.name}! Our sales team will contact you shortly.`);
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
            right: 'var(--space-4)',
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
            Welcome Back
          </h3>
          <p style={{
            color: 'var(--gray-600)',
            fontSize: 'var(--text-base)'
          }}>
            Sign in to your ChemMarket account
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
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)'
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
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                style={{
                  width: '100%',
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)'
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
                Signing In...
              </span>
            ) : (
              '🔐 Sign In'
            )}
          </button>

          <div className="text-center">
            <p style={{
              color: 'var(--gray-600)',
              fontSize: 'var(--text-sm)',
              marginBottom: 'var(--space-4)'
            }}>
              Don't have an account?{' '}
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
                Sign up now
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
            right: 'var(--space-4)',
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
            Join ChemMarket
          </h3>
          <p style={{
            color: 'var(--gray-600)',
            fontSize: 'var(--text-base)'
          }}>
            Create your account to start trading chemicals
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
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={signupForm.fullName}
                onChange={(e) => setSignupForm({...signupForm, fullName: e.target.value})}
                style={{
                  width: '100%',
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)'
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
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your business email"
                value={signupForm.email}
                onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)'
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
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                value={signupForm.password}
                onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                style={{
                  width: '100%',
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)'
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
                Company Name
              </label>
              <input
                type="text"
                placeholder="Enter your company name"
                value={signupForm.company}
                onChange={(e) => setSignupForm({...signupForm, company: e.target.value})}
                style={{
                  width: '100%',
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)'
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
                I am a:
              </label>
              <div style={{
                display: 'flex',
                gap: 'var(--space-4)'
              }}>
                {[
                  { value: 'buyer', label: '🧪 Buyer', description: 'Purchase chemicals' },
                  { value: 'supplier', label: '🏭 Supplier', description: 'Sell chemicals' },
                  { value: 'both', label: '🔄 Both', description: 'Buy and sell' }
                ].map((option) => (
                  <label key={option.value} style={{
                    flex: 1,
                    border: `2px solid ${signupForm.role === option.value ? 'var(--primary-500)' : 'var(--gray-300)'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-4)',
                    cursor: 'pointer',
                    transition: 'all 0.3s var(--ease-out)',
                    background: signupForm.role === option.value ? 'var(--primary-50)' : 'var(--white)'
                  }}>
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={signupForm.role === option.value}
                      onChange={(e) => setSignupForm({...signupForm, role: e.target.value})}
                      style={{ display: 'none' }}
                    />
                    <div style={{ textAlign: 'center' }}>
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
                Creating Account...
              </span>
            ) : (
              '🚀 Get Started'
            )}
          </button>

          <div className="text-center">
            <p style={{
              color: 'var(--gray-600)',
              fontSize: 'var(--text-sm)',
              marginBottom: 'var(--space-4)'
            }}>
              Already have an account?{' '}
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
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );

  // Header Component
  const Header = () => (
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
          justifyContent: 'space-between'
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
            alignItems: 'center'
          }}>
            {[
              { id: 'products', name: 'Products' },
              { id: 'blog', name: 'Industry Insights' },
              { id: 'suppliers', name: 'Suppliers' },
              { id: 'contact', name: 'Contact' }
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
                  position: 'relative'
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
            alignItems: 'center'
          }}>
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
                      right: '-2px',
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
                      right: '-2px',
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
                  transition: 'all 0.3s var(--ease-out)'
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
                    Logout
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
                  Sign In
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleGetStarted}
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  // Hero Component
  const Hero = () => (
    <section style={{
      background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 50%, var(--primary-700) 100%)',
      color: 'var(--white)',
      padding: 'var(--space-20) 0 var(--space-16)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255,64,0,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite 1s'
      }}></div>

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
            color: 'var(--white)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              background: 'var(--emerald-500)',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}></span>
            Trusted by 5,000+ Chemical Companies Worldwide
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
            animation: 'fadeInUp 0.8s var(--ease-out) 0.2s both'
          }}>
            Global Chemical
            <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-500) 0%, #ff6b35 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Marketplace
            </span>
          </h1>

          <p style={{
            fontSize: 'var(--text-xl)',
            opacity: 0.9,
            marginBottom: 'var(--space-8)',
            lineHeight: '1.6',
            animation: 'fadeInUp 0.8s var(--ease-out) 0.4s both',
            color: 'var(--white)'
          }}>
            Connect with trusted suppliers and discover premium-quality chemicals 
            for your industry needs. Fast, reliable, and secure global transactions.
          </p>

          <div style={{
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.8s var(--ease-out) 0.6s both'
          }}>
            <button 
              className="btn btn-primary" 
              style={{
                padding: 'var(--space-5) var(--space-10)',
                fontSize: 'var(--text-lg)'
              }}
              onClick={() => scrollToSection('products')}
            >
              🚀 Explore Products
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
              📈 Industry Insights
            </button>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-8)',
            marginTop: 'var(--space-12)',
            animation: 'fadeInUp 0.8s var(--ease-out) 0.8s both'
          }}>
            {[
              { number: '50K+', label: 'Products' },
              { number: '500+', label: 'Suppliers' },
              { number: '120+', label: 'Countries' },
              { number: '99.9%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <div key={stat.label} style={{ textAlign: 'center', color: 'var(--white)' }}>
                <div style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'bold',
                  marginBottom: 'var(--space-1)',
                  color: 'var(--white)'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  opacity: 0.8,
                  color: 'var(--white)'
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
              placeholder="🔍 Search 50,000+ chemicals, products, suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--space-5) var(--space-5) var(--space-5) var(--space-12)',
                border: '2px solid var(--gray-300)',
                borderRadius: 'var(--radius-2xl)',
                fontSize: 'var(--text-lg)',
                background: 'var(--white)',
                boxShadow: 'var(--shadow-lg)',
                transition: 'all 0.3s var(--ease-out)'
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
              left: 'var(--space-5)',
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
            justifyContent: 'center'
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
                  animation: `fadeInUp 0.6s var(--ease-out) ${index * 0.1}s both`
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
            border: '1px solid var(--primary-200)'
          }}>
            🛍️ PREMIUM PRODUCTS
          </div>
          <h2 style={{
            fontSize: 'var(--text-4xl)',
            fontWeight: '800',
            marginBottom: 'var(--space-4)',
            background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--primary-600) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Premium Chemical Products
          </h2>
          <p style={{
            fontSize: 'var(--text-xl)',
            color: 'var(--gray-600)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover our curated selection of high-purity chemicals from verified global suppliers
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
            <p>Loading products...</p>
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
                  marginBottom: 'var(--space-4)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)'
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
                        ⭐ Featured
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
                    border: '1px solid var(--gray-200)'
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
                  lineHeight: '1.3'
                }}>
                  {product.name}
                </h3>
                
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--primary-600)',
                  fontWeight: '600',
                  marginBottom: 'var(--space-4)',
                  cursor: 'pointer',
                  textDecoration: 'underline'
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
                  right: 'var(--space-4)',
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
                  borderBottom: '2px solid var(--gray-100)'
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
                    MOQ: {product.moq}
                  </div>
                </div>

                {product.description && (
                  <p style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--gray-600)',
                    marginBottom: 'var(--space-4)',
                    lineHeight: '1.5'
                  }}>
                    {product.description}
                  </p>
                )}

                {product.certifications && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-2)',
                    marginBottom: 'var(--space-4)'
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
                    { icon: '🛡️', text: 'Quality Certified' },
                    { icon: '🌍', text: 'Global Shipping' },
                    { icon: '📦', text: 'Bulk Discounts' },
                    { icon: '🔒', text: 'Secure Payment' }
                  ].map((feature, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--gray-600)'
                    }}>
                      <span>{feature.icon}</span>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  gap: 'var(--space-3)'
                }}>
                  <button 
                    className="btn btn-primary" 
                    style={{ flex: 1 }}
                    onClick={() => addToCart(product)}
                  >
                    🛒 Add to Cart
                  </button>
                  <button 
                    className="btn btn-accent"
                    onClick={() => requestQuote(product)}
                  >
                    💰 Quote
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
              marginBottom: 'var(--space-3)'
            }}>
              No products found
            </h3>
            <p style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--gray-600)',
              marginBottom: 'var(--space-6)'
            }}>
              Try adjusting your search criteria or browse different categories
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              🔄 Reset Filters
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
        right: '5%',
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
            border: '1px solid var(--primary-200)'
          }}>
            📈 INDUSTRY INTELLIGENCE
          </div>
          <h2 style={{
            fontSize: 'var(--text-4xl)',
            fontWeight: '800',
            marginBottom: 'var(--space-4)',
            background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--primary-600) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Chemical Industry Insights
          </h2>
          <p style={{
            fontSize: 'var(--text-xl)',
            color: 'var(--gray-600)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Stay ahead with the latest trends, innovations, and market analysis from the chemical industry
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-12)',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'trends', name: '🔥 Market Trends', icon: '📊' },
            { id: 'innovations', name: '💡 Innovations', icon: '⚡' },
            { id: 'market', name: '🌍 Market Analysis', icon: '📈' }
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
                boxShadow: activeBlogTab === tab.id ? 'var(--shadow-lg)' : 'var(--shadow-sm)'
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
          background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-8)',
          marginBottom: 'var(--space-12)',
          color: 'var(--white)',
          boxShadow: 'var(--shadow-2xl)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%'
          }}></div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-8)',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-4)'
              }}>
                <span style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-xl)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)'
                }}>
                  🔥 TRENDING
                </span>
                <span style={{
                  opacity: 0.9,
                  fontSize: 'var(--text-sm)'
                }}>
                  {staticBlogPosts.trends[0].date}
                </span>
              </div>
              <h3 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: '800',
                marginBottom: 'var(--space-4)',
                lineHeight: '1.3'
              }}>
                {staticBlogPosts.trends[0].title}
              </h3>
              <p style={{
                fontSize: 'var(--text-lg)',
                opacity: 0.9,
                marginBottom: 'var(--space-6)',
                lineHeight: '1.6'
              }}>
                {staticBlogPosts.trends[0].excerpt}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-6)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}>
                    👤
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      fontSize: 'var(--text-sm)'
                    }}>
                      {staticBlogPosts.trends[0].author}
                    </div>
                    <div style={{
                      fontSize: 'var(--text-xs)',
                      opacity: 0.8
                    }}>
                      {staticBlogPosts.trends[0].authorRole}
                    </div>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  fontSize: 'var(--text-sm)',
                  opacity: 0.8
                }}>
                  <span>⏱️ {staticBlogPosts.trends[0].readTime}</span>
                  <span>👁️ {staticBlogPosts.trends[0].views}</span>
                </div>
              </div>
              <button className="btn" style={{
                background: 'var(--white)',
                color: 'var(--primary-600)',
                fontWeight: '700'
              }}>
                📖 Read Full Analysis
              </button>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                width: '200px',
                height: '200px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-2xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--text-6xl)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.2)'
              }}>
                {staticBlogPosts.trends[0].image}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 'var(--space-8)',
          marginBottom: 'var(--space-12)'
        }}>
          {staticBlogPosts[activeBlogTab].slice(1).map((post, index) => (
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
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-4)'
                }}>
                  <span style={{
                    background: 'var(--primary-50)',
                    color: 'var(--primary-700)',
                    padding: 'var(--space-1) var(--space-3)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '600',
                    border: '1px solid var(--primary-200)'
                  }}>
                    {post.category}
                  </span>
                  {post.trending && (
                    <span style={{
                      background: 'var(--accent-500)',
                      color: 'var(--white)',
                      padding: 'var(--space-1) var(--space-3)',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '700'
                    }}>
                      🔥 TRENDING
                    </span>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-4)'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'var(--primary-100)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-2xl)'
                  }}>
                    {post.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: '700',
                      marginBottom: 'var(--space-2)',
                      lineHeight: '1.3',
                      color: 'var(--gray-900)'
                    }}>
                      {post.title}
                    </h4>
                  </div>
                </div>

                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--gray-600)',
                  marginBottom: 'var(--space-4)',
                  lineHeight: '1.5'
                }}>
                  {post.excerpt}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 'var(--space-4)',
                  borderTop: '2px solid var(--gray-100)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--gray-500)'
                  }}>
                    <span>👤 {post.author.split(' ')[0]}</span>
                    <span>⏱️ {post.readTime}</span>
                    <span>👁️ {post.views}</span>
                  </div>
                  <button className="btn btn-primary" style={{
                    padding: 'var(--space-2) var(--space-4)',
                    fontSize: 'var(--text-sm)'
                  }}>
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'linear-gradient(135deg, var(--accent-500) 0%, var(--accent-600) 100%)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-12)',
          textAlign: 'center',
          color: 'var(--white)',
          boxShadow: 'var(--shadow-2xl)'
        }}>
          <h3 style={{
            fontSize: 'var(--text-3xl)',
            fontWeight: '800',
            marginBottom: 'var(--space-4)'
          }}>
            📬 Stay Informed
          </h3>
          <p style={{
            fontSize: 'var(--text-xl)',
            opacity: 0.9,
            marginBottom: 'var(--space-8)',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Get weekly insights and market analysis delivered to your inbox
          </p>
          <div style={{
            display: 'flex',
            gap: 'var(--space-4)',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: 'var(--space-4)',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--text-base)',
                background: 'rgba(255,255,255,0.1)',
                color: 'var(--white)',
                backdropFilter: 'blur(10px)'
              }}
            />
            <button className="btn" style={{
              background: 'var(--white)',
              color: 'var(--accent-600)',
              fontWeight: '700'
            }}>
              Subscribe
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
              color: 'var(--gray-900)'
            }}>
              Contact Our Sales Team
            </h3>
            <p style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--gray-600)'
            }}>
              Have questions? Our chemical experts are here to help you find the perfect solutions.
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
                placeholder="Your Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                style={{
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)'
                }}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                style={{
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)'
                }}
                required
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                style={{
                  padding: 'var(--space-4)',
                  border: '2px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s var(--ease-out)',
                  resize: 'vertical'
                }}
                required
              ></textarea>
              <button type="submit" className="btn btn-primary">
                📨 Send Message
              </button>
            </div>
          </form>
        </div>

        <div id="supplier-registration" style={{
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
            marginBottom: 'var(--space-4)'
          }}>
            Become a Verified Supplier
          </h3>
          <p style={{
            fontSize: 'var(--text-xl)',
            opacity: 0.9,
            marginBottom: 'var(--space-8)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Join our network of trusted chemical suppliers and reach global customers
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
                placeholder="Company Name"
                value={supplierForm.companyName}
                onChange={(e) => setSupplierForm({...supplierForm, companyName: e.target.value})}
                style={{
                  padding: 'var(--space-4)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'var(--white)',
                  backdropFilter: 'blur(10px)'
                }}
                required
              />
              <input
                type="email"
                placeholder="Business Email"
                value={supplierForm.email}
                onChange={(e) => setSupplierForm({...supplierForm, email: e.target.value})}
                style={{
                  padding: 'var(--space-4)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'var(--white)',
                  backdropFilter: 'blur(10px)'
                }}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={supplierForm.phone}
                onChange={(e) => setSupplierForm({...supplierForm, phone: e.target.value})}
                style={{
                  padding: 'var(--space-4)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'var(--white)',
                  backdropFilter: 'blur(10px)'
                }}
                required
              />
              <input
                type="text"
                placeholder="Products You Supply"
                value={supplierForm.products}
                onChange={(e) => setSupplierForm({...supplierForm, products: e.target.value})}
                style={{
                  padding: 'var(--space-4)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'var(--white)',
                  backdropFilter: 'blur(10px)'
                }}
                required
              />
              <textarea
                placeholder="Company Description"
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
                  resize: 'vertical'
                }}
                required
              ></textarea>
              <button type="submit" className="btn" style={{
                background: 'var(--white)',
                color: 'var(--primary-600)',
                fontWeight: '700'
              }}>
                🏢 Submit Application
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
        right: '-100px',
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
              fontSize: 'var(--text-lg)'
            }}>
              The world's most trusted chemical marketplace. Connecting premium suppliers 
              with quality-focused buyers across 120+ countries.
            </p>
            <div style={{
              display: 'flex',
              gap: 'var(--space-4)'
            }}>
              {[
                { icon: '📧', label: 'Email', link: 'mailto:info@chemmarket.com' },
                { icon: '📱', label: 'Phone', link: 'tel:+1-555-CHEMICAL' },
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
              color: 'var(--white)'
            }}>
              Marketplace
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {[
                { name: 'Browse Products', action: () => scrollToSection('products') },
                { name: 'Industry Insights', action: () => scrollToSection('blog') },
                { name: 'Featured Suppliers', action: () => setActiveNav('suppliers') },
                { name: 'Quality Standards', action: () => alert('Quality standards information coming soon!') },
                { name: 'Global Shipping', action: () => alert('Shipping information coming soon!') }
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
                      textAlign: 'left',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--primary-300)';
                      e.target.style.transform = 'translateX(8px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'var(--gray-400)';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    → {item.name}
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
              color: 'var(--white)'
            }}>
              Support
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {[
                { name: 'Help Center', action: () => alert('Help center coming soon!') },
                { name: 'Contact Sales', action: () => scrollToSection('contact') },
                { name: 'Documentation', action: () => alert('Documentation coming soon!') },
                { name: 'API Access', action: () => alert('API access coming soon!') },
                { name: 'Status Page', action: () => alert('System status: All systems operational!') }
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
                      textAlign: 'left',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--primary-300)';
                      e.target.style.transform = 'translateX(8px)';
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
              color: 'var(--white)'
            }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {[
                { name: 'About Us', action: () => alert('About ChemMarket: Leading chemical marketplace since 2024!') },
                { name: 'Careers', action: () => alert('Career opportunities coming soon!') },
                { name: 'Press Kit', action: () => alert('Press kit available upon request.') },
                { name: 'Sustainability', action: () => alert('Sustainability initiatives coming soon!') },
                { name: 'Partners', action: () => alert('Partnership program details coming soon!') }
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
                      textAlign: 'left',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--primary-300)';
                      e.target.style.transform = 'translateX(8px)';
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
          fontSize: 'var(--text-sm)'
        }}>
          <div>
            © 2024 ChemMarket. All rights reserved. | Making chemical trading better. 🌟
          </div>
          <div style={{
            display: 'flex',
            gap: 'var(--space-6)',
            alignItems: 'center'
          }}>
            {[
              { name: 'Privacy Policy', action: () => alert('Privacy policy details coming soon!') },
              { name: 'Terms of Service', action: () => alert('Terms of service details coming soon!') },
              { name: 'Cookie Policy', action: () => alert('Cookie policy details coming soon!') },
              { name: 'Compliance', action: () => alert('Compliance information coming soon!') }
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
                  fontSize: 'var(--text-sm)'
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
    <div style={{ minHeight: '100vh' }}>
 
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