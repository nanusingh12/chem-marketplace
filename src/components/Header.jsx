import React from 'react'
import { Search, ShoppingCart, User, Menu } from 'lucide-react'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <a href="/" className="logo">
            ChemMarket
          </a>

          {/* Navigation */}
          <nav className="nav">
            <a href="#products" className="nav-link active">
              Products
            </a>
            <a href="#suppliers" className="nav-link">
              Suppliers
            </a>
            <a href="#industries" className="nav-link">
              Industries
            </a>
            <a href="#resources" className="nav-link">
              Resources
            </a>
          </nav>

          {/* Search */}
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search chemicals, products, suppliers..."
              className="search-input"
            />
          </div>

          {/* Actions */}
          <div className="header-actions">
            <button className="icon-btn">
              <ShoppingCart size={20} />
            </button>
            <button className="icon-btn">
              <User size={20} />
            </button>
            <button className="btn btn-secondary hidden">
              Sign In
            </button>
            <button className="btn btn-primary hidden">
              Register
            </button>
            <button className="icon-btn">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header