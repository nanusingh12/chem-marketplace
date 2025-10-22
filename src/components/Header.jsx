import React from 'react'
import { Search, ShoppingCart, User } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-blue-600">
              ChemMarket
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#products" className="text-gray-600 hover:text-gray-900 font-medium">
                Products
              </a>
              <a href="#suppliers" className="text-gray-600 hover:text-gray-900 font-medium">
                Suppliers
              </a>
              <a href="#industries" className="text-gray-600 hover:text-gray-900 font-medium">
                Industries
              </a>
              <a href="#resources" className="text-gray-600 hover:text-gray-900 font-medium">
                Resources
              </a>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search chemicals, products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <User className="w-5 h-5" />
            </button>
            <button className="btn btn-outline hidden md:flex">
              Sign In
            </button>
            <button className="btn btn-primary hidden md:flex">
              Register
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header