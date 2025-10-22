import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">ChemMarket</div>
            <p className="footer-description">
              Connecting chemical suppliers with buyers worldwide through our 
              trusted marketplace platform. Quality assured, delivery guaranteed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li className="footer-link"><a href="#products">Browse Products</a></li>
              <li className="footer-link"><a href="#suppliers">Become a Supplier</a></li>
              <li className="footer-link"><a href="#safety">Safety Guidelines</a></li>
              <li className="footer-link"><a href="#quality">Quality Standards</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li className="footer-link"><a href="#help">Help Center</a></li>
              <li className="footer-link"><a href="#contact">Contact Us</a></li>
              <li className="footer-link"><a href="#shipping">Shipping Info</a></li>
              <li className="footer-link"><a href="#returns">Returns</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li className="footer-link"><a href="#privacy">Privacy Policy</a></li>
              <li className="footer-link"><a href="#terms">Terms of Service</a></li>
              <li className="footer-link"><a href="#cookies">Cookie Policy</a></li>
              <li className="footer-link"><a href="#compliance">Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 ChemMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer