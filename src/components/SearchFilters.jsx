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
    <section className="filters">
      <div className="container">
        <div className="filters-content">
          {/* Categories */}
          <div className="categories">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchFilters