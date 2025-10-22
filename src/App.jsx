import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Premium Header Component
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
          {/* Animated Logo */}
          <div style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--accent-500) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            cursor: 'pointer',
            transition: 'all 0.3s var(--ease-out)'
          }} className="animate-pulse-slow">
            ChemMarket
          </div>

          {/* Premium Navigation */}
          <nav style={{
            display: 'flex',
            gap: 'var(--space-8)',
            alignItems: 'center'
          }}>
            {['Products', 'Suppliers', 'Industries', 'Resources'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{
                textDecoration: 'none',
                color: 'var(--gray-700)',
                fontWeight: '500',
                fontSize: 'var(--text-sm)',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all 0.3s var(--ease-out)',
                position: 'relative'
              }} className="animate-fade-in-up"
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--primary-600)';
                e.target.style.background = 'var(--primary-50)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--gray-700)';
                e.target.style.background = 'transparent';
              }}>
                {item}
              </a>
            ))}
          </nav>

          {/* Premium Actions */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-4)',
            alignItems: 'center'
          }}>
            <button className="btn btn-secondary" style={{
              padding: 'var(--space-3) var(--space-6)'
            }}>
              Sign In
            </button>
            <button className="btn btn-primary">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  // Amazing Hero Component
  const Hero = () => (
    <section style={{
      background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 50%, var(--primary-800) 100%)',
      color: 'var(--white)',
      padding: 'var(--space-20) 0 var(--space-16)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
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
        background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)',
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
          {/* Premium Badge */}
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
            animation: 'fadeInUp 0.8s var(--ease-out)'
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

          {/* Animated Main Heading */}
          <h1 style={{
            fontSize: 'var(--text-5xl)',
            fontWeight: '800',
            marginBottom: 'var(--space-6)',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, var(--white) 0%, var(--primary-100) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'fadeInUp 0.8s var(--ease-out) 0.2s both'
          }}>
            Global Chemical
            <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-500) 0%, var(--emerald-500) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Marketplace
            </span>
          </h1>

          {/* Animated Subtitle */}
          <p style={{
            fontSize: 'var(--text-xl)',
            opacity: 0.9,
            marginBottom: 'var(--space-8)',
            lineHeight: '1.6',
            animation: 'fadeInUp 0.8s var(--ease-out) 0.4s both'
          }}>
            Connect with trusted suppliers and discover premium-quality chemicals 
            for your industry needs. Fast, reliable, and secure global transactions.
          </p>

          {/* Premium CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.8s var(--ease-out) 0.6s both'
          }}>
            <button className="btn btn-primary" style={{
              padding: 'var(--space-5) var(--space-10)',
              fontSize: 'var(--text-lg)'
            }}>
              🚀 Explore Products
            </button>
            <button className="btn btn-secondary" style={{
              padding: 'var(--space-5) var(--space-10)',
              fontSize: 'var(--text-lg)'
            }}>
              ⭐ Become Supplier
            </button>
          </div>

          {/* Trust Indicators */}
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
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'bold',
                  marginBottom: 'var(--space-1)'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  opacity: 0.8
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

  // Advanced SearchFilters Component
  const SearchFilters = () => {
    const categories = [
      { id: 'all', name: 'All Categories', icon: '🔬' },
      { id: 'organic', name: 'Organic Chemicals', icon: '🌿' },
      { id: 'inorganic', name: 'Inorganic Chemicals', icon: '⚗️' },
      { id: 'solvents', name: 'Solvents', icon: '💧' },
      { id: 'pharma', name: 'Pharmaceuticals', icon: '💊' },
      { id: 'agro', name: 'Agrochemicals', icon: '🌱' },
      { id: 'polymers', name: 'Polymers', icon: '🔗' },
    ];

    return (
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
            {/* Advanced Search Bar */}
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

            {/* Animated Category Filters */}
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
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Ultra ProductGrid Component
  const ProductGrid = () => {
    const products = [
      {
        id: 1,
        name: 'Acetone 99.5% Ultra Pure',
        category: 'solvents',
        supplier: 'ChemSupply Global Inc.',
        price: '$45.00',
        unit: '/ 20L drum',
        rating: 4.8,
        reviews: 124,
        featured: true,
        delivery: '24h Express',
        purity: '99.9%',
        moq: '5 drums'
      },
      {
        id: 2,
        name: 'Sodium Hydroxide Pearl',
        category: 'inorganic',
        supplier: 'BaseChem Laboratories',
        price: '$28.50',
        unit: '/ 25kg bag',
        rating: 4.6,
        reviews: 89,
        delivery: '48h Standard',
        purity: '99%',
        moq: '10 bags'
      },
      {
        id: 3,
        name: 'Ethanol Absolute ACS',
        category: 'solvents',
        supplier: 'PureSolvents International',
        price: '$62.00',
        unit: '/ 20L drum',
        rating: 4.9,
        reviews: 156,
        featured: true,
        delivery: '24h Express',
        purity: '99.9%',
        moq: '2 drums'
      },
      {
        id: 4,
        name: 'Polyethylene HDPE Granules',
        category: 'polymers',
        supplier: 'PolyTech Global',
        price: '$1.25',
        unit: '/ kg',
        rating: 4.4,
        reviews: 67,
        delivery: '72h Economy',
        purity: 'Food Grade',
        moq: '1000 kg'
      },
      {
        id: 5,
        name: 'Aspirin BP/USP Grade',
        category: 'pharma',
        supplier: 'MediChem Pharmaceuticals',
        price: '$120.00',
        unit: '/ kg',
        rating: 4.7,
        reviews: 203,
        featured: true,
        delivery: '48h Standard',
        purity: 'BP Grade',
        moq: '25 kg'
      },
      {
        id: 6,
        name: 'Ammonium Nitrate Fertilizer',
        category: 'agro',
        supplier: 'AgroGrowth Solutions',
        price: '$0.85',
        unit: '/ kg',
        rating: 4.3,
        reviews: 45,
        delivery: '72h Economy',
        purity: '34.5% N',
        moq: '5000 kg'
      }
    ];

    const filteredProducts = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return (
      <section style={{ 
        padding: 'var(--space-16) 0',
        background: 'linear-gradient(135deg, var(--gray-50) 0%, var(--white) 50%, var(--gray-50) 100%)'
      }}>
        <div className="container">
          {/* Premium Section Header */}
          <div className="text-center mb-12">
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

          {/* Advanced Product Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: 'var(--space-8)',
            marginBottom: 'var(--space-12)'
          }}>
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="card"
                style={{
                  animation: `fadeInUp 0.8s var(--ease-out) ${index * 0.1}s both`
                }}
              >
                {/* Premium Product Header */}
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
                    marginBottom: 'var(--space-4)'
                  }}>
                    {product.supplier}
                  </p>
                </div>

                {/* Premium Product Image */}
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
                    {product.category === 'solvents' && '💧'}
                    {product.category === 'inorganic' && '⚗️'}
                    {product.category === 'pharma' && '💊'}
                    {product.category === 'agro' && '🌱'}
                    {product.category === 'polymers' && '🔗'}
                  </div>
                  
                  {/* Delivery Badge */}
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

                {/* Premium Product Info */}
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
                        {product.price}
                      </span>
                      <span style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--gray-500)',
                        marginLeft: 'var(--space-2)'
                      }}>
                        {product.unit}
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

                  {/* Premium Features */}
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

                  {/* Premium Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: 'var(--space-3)'
                  }}>
                    <button className="btn btn-primary" style={{ flex: 1 }}>
                      🛒 Add to Cart
                    </button>
                    <button className="btn btn-accent">
                      💰 Quote
                    </button>
                    <button className="btn btn-secondary" style={{
                      padding: 'var(--space-3)'
                    }}>
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
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

          {/* Premium CTA Section */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-12)',
            textAlign: 'center',
            color: 'var(--white)',
            marginTop: 'var(--space-12)',
            boxShadow: 'var(--shadow-2xl)'
          }}>
            <h3 style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: '800',
              marginBottom: 'var(--space-4)'
            }}>
              Ready to Transform Your Chemical Sourcing?
            </h3>
            <p style={{
              fontSize: 'var(--text-xl)',
              opacity: 0.9,
              marginBottom: 'var(--space-8)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Join thousands of companies that trust ChemMarket for their chemical supply chain needs
            </p>
            <div style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button className="btn" style={{
                background: 'var(--white)',
                color: 'var(--primary-600)',
                padding: 'var(--space-5) var(--space-10)',
                fontSize: 'var(--text-lg)',
                fontWeight: '700'
              }}>
                🚀 Start Sourcing Today
              </button>
              <button className="btn btn-secondary" style={{
                padding: 'var(--space-5) var(--space-10)',
                fontSize: 'var(--text-lg)'
              }}>
                📞 Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Luxury Footer Component
  const Footer = () => (
    <footer style={{
      background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%)',
      color: 'var(--white)',
      padding: 'var(--space-16) 0 var(--space-8)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Footer Background Elements */}
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
          {/* Premium Brand Section */}
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
              {['📧', '📱', '🐦', '💼'].map((icon, index) => (
                <div key={index} style={{
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
                  transition: 'all 0.3s var(--ease-out)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--primary-500)';
                  e.target.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
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
              {['Browse Products', 'Featured Suppliers', 'Industry Solutions', 'Quality Standards', 'Global Shipping'].map((item) => (
                <li key={item} style={{ marginBottom: 'var(--space-3)' }}>
                  <a href="#" style={{
                    color: 'var(--gray-400)',
                    textDecoration: 'none',
                    fontSize: 'var(--text-base)',
                    transition: 'all 0.3s var(--ease-out)',
                    display: 'block',
                    padding: 'var(--space-1) 0'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--primary-300)';
                    e.target.style.transform = 'translateX(8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'var(--gray-400)';
                    e.target.style.transform = 'translateX(0)';
                  }}>
                    → {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
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
              {['Help Center', 'Contact Sales', 'Documentation', 'API Access', 'Status Page'].map((item) => (
                <li key={item} style={{ marginBottom: 'var(--space-3)' }}>
                  <a href="#" style={{
                    color: 'var(--gray-400)',
                    textDecoration: 'none',
                    fontSize: 'var(--text-base)',
                    transition: 'all 0.3s var(--ease-out)',
                    display: 'block',
                    padding: 'var(--space-1) 0'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--primary-300)';
                    e.target.style.transform = 'translateX(8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'var(--gray-400)';
                    e.target.style.transform = 'translateX(0)';
                  }}>
                    ⚡ {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
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
              {['About Us', 'Careers', 'Press Kit', 'Sustainability', 'Partners'].map((item) => (
                <li key={item} style={{ marginBottom: 'var(--space-3)' }}>
                  <a href="#" style={{
                    color: 'var(--gray-400)',
                    textDecoration: 'none',
                    fontSize: 'var(--text-base)',
                    transition: 'all 0.3s var(--ease-out)',
                    display: 'block',
                    padding: 'var(--space-1) 0'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--primary-300)';
                    e.target.style.transform = 'translateX(8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'var(--gray-400)';
                    e.target.style.transform = 'translateX(0)';
                  }}>
                    🏢 {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Premium Footer Bottom */}
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
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Compliance'].map((item) => (
              <a key={item} href="#" style={{
                color: 'var(--gray-400)',
                textDecoration: 'none',
                transition: 'color 0.3s var(--ease-out)'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--primary-300)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--gray-400)'}>
                {item}
              </a>
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
      <Footer />
    </div>
  );
}

export default App;