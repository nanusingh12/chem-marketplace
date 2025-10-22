import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import SearchFilters from './components/SearchFilters'
import Footer from './components/Footer'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <SearchFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductGrid 
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />
      <Footer />
    </div>
  )
}

export default App