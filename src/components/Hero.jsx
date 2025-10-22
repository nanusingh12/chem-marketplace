import React from 'react'
import { ArrowRight, Shield, Clock, Globe } from 'lucide-react'

const Hero = () => {
  return (
    <section className="hero text-white py-20">
      <div className="container">
        <div className="hero-content max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Trusted by 500+ chemical companies worldwide
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Global Chemical
              <span className="block bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-transparent">
                Marketplace
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Connect with trusted suppliers and discover high-quality chemicals 
              for your industry needs. Fast, reliable, and secure transactions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="btn btn-secondary text-lg px-8 py-4">
              Browse Products
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="btn bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 text-lg px-8 py-4">
              Become a Supplier
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center slide-in">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-blue-200 text-sm">24-72 hour shipping worldwide</p>
            </div>
            
            <div className="text-center slide-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Quality Assured</h3>
              <p className="text-blue-200 text-sm">Verified suppliers & products</p>
            </div>
            
            <div className="text-center slide-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Global Network</h3>
              <p className="text-blue-200 text-sm">Connect with 50+ countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero