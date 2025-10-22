import React from 'react'
import { Star, Truck, Shield, Flask } from 'lucide-react'

const ProductGrid = ({ searchTerm, selectedCategory }) => {
  const products = [
    {
      id: 1,
      name: 'Acetone 99.5%',
      category: 'solvents',
      supplier: 'ChemSupply Inc.',
      price: '$45.00',
      unit: '/ 20L drum',
      rating: 4.8,
      reviews: 124,
      featured: true,
      delivery: '24h',
      purity: '99.5%'
    },
    {
      id: 2,
      name: 'Sodium Hydroxide',
      category: 'inorganic',
      supplier: 'BaseChem Ltd.',
      price: '$28.50',
      unit: '/ 25kg bag',
      rating: 4.6,
      reviews: 89,
      delivery: '48h',
      purity: '99%'
    },
    {
      id: 3,
      name: 'Ethanol Absolute',
      category: 'solvents',
      supplier: 'PureSolvents Co.',
      price: '$62.00',
      unit: '/ 20L drum',
      rating: 4.9,
      reviews: 156,
      featured: true,
      delivery: '24h',
      purity: '99.9%'
    },
    {
      id: 4,
      name: 'Polyethylene Granules',
      category: 'polymers',
      supplier: 'PolyTech Industries',
      price: '$1.25',
      unit: '/ kg',
      rating: 4.4,
      reviews: 67,
      delivery: '72h',
      purity: 'Food Grade'
    },
    {
      id: 5,
      name: 'Aspirin BP',
      category: 'pharma',
      supplier: 'MediChem Pharma',
      price: '$120.00',
      unit: '/ kg',
      rating: 4.7,
      reviews: 203,
      delivery: '48h',
      purity: 'BP Grade'
    },
    {
      id: 6,
      name: 'Ammonium Nitrate',
      category: 'agro',
      supplier: 'AgroGrowth Solutions',
      price: '$0.85',
      unit: '/ kg',
      rating: 4.3,
      reviews: 45,
      delivery: '72h',
      purity: '34.5% N'
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <section className="products">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">
            High-quality chemicals from verified suppliers worldwide
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Badge */}
              {product.featured && (
                <div className="product-badge">Featured</div>
              )}

              {/* Image */}
              <div className="product-image">
                <div className="product-image-content">
                  <div className="product-image-icon">
                    <Flask size={24} />
                  </div>
                  <div className="text-caption">Chemical Compound</div>
                </div>
              </div>

              {/* Content */}
              <div className="product-content">
                {/* Header */}
                <div className="product-header">
                  <h3 className="product-title">{product.name}</h3>
                  <div className="product-rating">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>

                {/* Supplier */}
                <p className="product-supplier">{product.supplier}</p>

                {/* Price & Delivery */}
                <div className="product-price">
                  <div>
                    <span className="price">{product.price}</span>
                    <span className="price-unit">{product.unit}</span>
                  </div>
                  <div className="delivery-badge">{product.delivery}</div>
                </div>

                {/* Features */}
                <div className="product-features">
                  <div className="feature">
                    <Truck size={16} />
                    <span>Free Shipping</span>
                  </div>
                  <div className="feature">
                    <Shield size={16} />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="product-actions">
                  <button className="btn btn-primary">Add to Cart</button>
                  <button className="btn btn-secondary">Sample</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flask size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or browse different categories.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductGrid