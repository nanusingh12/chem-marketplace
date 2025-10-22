import React from 'react'
import { Star, Truck, Shield } from 'lucide-react'

const ProductGrid = ({ searchTerm, selectedCategory }) => {
  // Sample product data
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
      image: '/api/placeholder/300/200',
      featured: true
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
      image: '/api/placeholder/300/200'
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
      image: '/api/placeholder/300/200',
      featured: true
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
      image: '/api/placeholder/300/200'
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
      image: '/api/placeholder/300/200'
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
      image: '/api/placeholder/300/200'
    }
  ]

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Products
          </h2>
          <div className="text-sm text-gray-600">
            Showing {filteredProducts.length} products
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Product Image */}
              <div className="h-48 bg-gray-200 relative">
                {product.featured && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3">{product.supplier}</p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-gray-600 text-sm ml-1">{product.unit}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    <span>Free shipping</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="btn btn-primary flex-1">
                    Add to Cart
                  </button>
                  <button className="btn btn-outline">
                    Sample
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductGrid