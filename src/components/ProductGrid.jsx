import React from 'react'
import { Star, Truck, Shield, Zap } from 'lucide-react'

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
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover high-quality chemicals from trusted suppliers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="product-image h-48 relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-gray-600 font-medium">Chemical Compound</p>
                </div>
                {product.featured && (
                  <div className="featured-badge">
                    <Star className="w-3 h-3 inline mr-1" />
                    Featured
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                  {product.purity}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{product.supplier}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-blue-700">{product.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-gray-600 text-sm ml-1">{product.unit}</span>
                  </div>
                  <div className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                    {product.delivery}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      <span>Free shipping</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                  </div>
                  <span className="text-gray-500">{product.reviews} reviews</span>
                </div>

                <div className="flex gap-3">
                  <button className="btn btn-primary flex-1">
                    Add to Cart
                  </button>
                  <button className="btn btn-outline px-4">
                    Sample
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 fade-in">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse different categories.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductGrid