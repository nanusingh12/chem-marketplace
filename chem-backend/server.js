import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Enhanced product database
const products = [
  {
    id: 1,
    name: 'Acetone 99.5% Ultra Pure',
    category: 'solvents',
    supplier: 'ChemSupply Global Inc.',
    price: 45.00,
    unit: '20L drum',
    rating: 4.8,
    reviews: 124,
    featured: true,
    delivery: '24h Express',
    purity: '99.9%',
    moq: '5 drums',
    inStock: true,
    description: 'High-purity acetone suitable for laboratory and industrial use.',
    image: '🧪'
  },
  {
    id: 2,
    name: 'Sodium Hydroxide Pearl',
    category: 'inorganic',
    supplier: 'BaseChem Laboratories',
    price: 28.50,
    unit: '25kg bag',
    rating: 4.6,
    reviews: 89,
    delivery: '48h Standard',
    purity: '99%',
    moq: '10 bags',
    inStock: true,
    description: 'Sodium hydroxide pearls for various industrial applications.',
    image: '⚗️'
  },
  {
    id: 3,
    name: 'Ethanol Absolute ACS',
    category: 'solvents',
    supplier: 'PureSolvents International',
    price: 62.00,
    unit: '20L drum',
    rating: 4.9,
    reviews: 156,
    featured: true,
    delivery: '24h Express',
    purity: '99.9%',
    moq: '2 drums',
    inStock: true,
    description: 'Absolute ethanol meeting ACS specifications.',
    image: '💧'
  },
  {
    id: 4,
    name: 'Polyethylene HDPE Granules',
    category: 'polymers',
    supplier: 'PolyTech Global',
    price: 1.25,
    unit: 'kg',
    rating: 4.4,
    reviews: 67,
    delivery: '72h Economy',
    purity: 'Food Grade',
    moq: '1000 kg',
    inStock: true,
    description: 'High-density polyethylene granules for manufacturing.',
    image: '🔗'
  },
  {
    id: 5,
    name: 'Aspirin BP/USP Grade',
    category: 'pharma',
    supplier: 'MediChem Pharmaceuticals',
    price: 120.00,
    unit: 'kg',
    rating: 4.7,
    reviews: 203,
    featured: true,
    delivery: '48h Standard',
    purity: 'BP Grade',
    moq: '25 kg',
    inStock: true,
    description: 'Pharmaceutical grade aspirin meeting BP and USP standards.',
    image: '💊'
  },
  {
    id: 6,
    name: 'Ammonium Nitrate Fertilizer',
    category: 'agro',
    supplier: 'AgroGrowth Solutions',
    price: 0.85,
    unit: 'kg',
    rating: 4.3,
    reviews: 45,
    delivery: '72h Economy',
    purity: '34.5% N',
    moq: '5000 kg',
    inStock: true,
    description: 'High-nitrogen fertilizer for agricultural use.',
    image: '🌱'
  }
];

// API Routes

// Get all products with filtering
app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  
  let filteredProducts = products;
  
  // Filter by category
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category === category
    );
  }
  
  // Filter by search term
  if (search) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.supplier.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json({
    success: true,
    data: filteredProducts,
    total: filteredProducts.length
  });
});

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  res.json({
    success: true,
    data: product
  });
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message, type = 'general' } = req.body;
  
  try {
    // Here you would typically save to database
    console.log('📧 Contact form submission:', { name, email, message, type });
    
    // Simulate email sending (remove nodemailer for now)
    console.log('📨 Email would be sent to: your-email@gmail.com');
    console.log('📋 Message:', message);
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.'
    });
  }
});

// Supplier registration
app.post('/api/suppliers/register', async (req, res) => {
  const { companyName, email, phone, products, description } = req.body;
  
  try {
    console.log('🏢 Supplier registration:', { 
      companyName, email, phone, products, description 
    });
    
    // Simulate email sending
    console.log('📨 Supplier registration email would be sent');
    console.log('🏭 Company:', companyName);
    console.log('📧 Email:', email);
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.json({
      success: true,
      message: 'Thank you for your interest! Our team will contact you shortly.'
    });
  } catch (error) {
    console.error('Supplier registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
});

// Get categories
app.get('/api/categories', (req, res) => {
  const categories = [
    { id: 'all', name: 'All Categories', count: products.length },
    { id: 'organic', name: 'Organic Chemicals', count: products.filter(p => p.category === 'organic').length },
    { id: 'inorganic', name: 'Inorganic Chemicals', count: products.filter(p => p.category === 'inorganic').length },
    { id: 'solvents', name: 'Solvents', count: products.filter(p => p.category === 'solvents').length },
    { id: 'pharma', name: 'Pharmaceuticals', count: products.filter(p => p.category === 'pharma').length },
    { id: 'agro', name: 'Agrochemicals', count: products.filter(p => p.category === 'agro').length },
    { id: 'polymers', name: 'Polymers', count: products.filter(p => p.category === 'polymers').length },
  ];
  
  res.json({
    success: true,
    data: categories
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Chemical Marketplace API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    products: products.length
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is working perfectly! 🚀',
    data: {
      server: 'Express.js',
      status: 'Running',
      port: PORT
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Chemical Marketplace Backend running on http://localhost:${PORT}`);
  console.log(`📦 API Endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/test`);
  console.log(`   GET  /api/products`);
  console.log(`   GET  /api/products/:id`);
  console.log(`   GET  /api/categories`);
  console.log(`   POST /api/contact`);
  console.log(`   POST /api/suppliers/register`);
  console.log(`\n💡 Test the API by visiting: http://localhost:${PORT}/api/health`);
});