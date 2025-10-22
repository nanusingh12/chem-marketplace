import React from 'react'
import { Shield, ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <Shield size={16} />
            Trusted by 500+ chemical companies
          </div>

          {/* Title */}
          <h1 className="hero-title">
            Global Chemical Marketplace
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Connect with trusted suppliers and discover high-quality chemicals 
            for your industry needs. Fast, reliable, and secure transactions.
          </p>

          {/* Actions */}
          <div className="hero-actions">
            <button className="btn btn-primary">
              Browse Products
              <ArrowRight size={16} />
            </button>
            <button className="btn btn-secondary">
              Become a Supplier
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero