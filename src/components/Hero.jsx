import React from 'react'

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="container">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Global Chemical Marketplace
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Connect with trusted suppliers and discover high-quality chemicals 
            for your industry needs. Fast, reliable, and secure transactions.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="btn bg-white text-blue-600 hover:bg-blue-50">
              Browse Products
            </button>
            <button className="btn border-white text-white hover:bg-blue-700">
              Become a Supplier
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero