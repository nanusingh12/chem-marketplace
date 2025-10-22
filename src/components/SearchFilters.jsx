import React from 'react'

const SearchFilters = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'organic', name: 'Organic Chemicals' },
    { id: 'inorganic', name: 'Inorganic Chemicals' },
    { id: 'solvents', name: 'Solvents' },
    { id: 'pharma', name: 'Pharmaceuticals' },
    { id: 'agro', name: 'Agrochemicals' },
    { id: 'polymers', name: 'Polymers' },
  ]

  return (
    <section className="bg-gray-50 py-8 border-b border-gray-200">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchFilters