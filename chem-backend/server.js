import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (replace with real database in production)
let users = [];
let products = [
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
    image: '🧪',
    supplierWebsite: 'https://chemsupply.com',
    safetyData: 'Available',
    certifications: ['ISO 9001', 'GMP'],
    stock: 150
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
    image: '⚗️',
    supplierWebsite: 'https://basechemlabs.com',
    safetyData: 'Available',
    certifications: ['ISO 14001'],
    stock: 300
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
    image: '💧',
    supplierWebsite: 'https://puresolvents.com',
    safetyData: 'Available',
    certifications: ['ACS Grade', 'ISO 9001'],
    stock: 75
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
    image: '🔗',
    supplierWebsite: 'https://polytechglobal.com',
    safetyData: 'Available',
    certifications: ['FDA Approved', 'Food Grade'],
    stock: 50000
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
    image: '💊',
    supplierWebsite: 'https://medichem.com',
    safetyData: 'Available',
    certifications: ['BP Grade', 'USP Grade', 'GMP'],
    stock: 1000
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
    image: '🌱',
    supplierWebsite: 'https://agrogrowth.com',
    safetyData: 'Available',
    certifications: ['Organic Certified'],
    stock: 100000
  }
];

let carts = {};
let favorites = {};
let orders = [];
let blogPosts = [
  {
    id: 1,
    title: 'Green Chemistry Revolution: Sustainable Alternatives Gaining Market Share',
    excerpt: 'Bio-based chemicals projected to capture 25% of market by 2025 as companies prioritize sustainability.',
    content: 'Full article content about green chemistry trends and market analysis...',
    image: '🌿',
    category: 'Sustainability',
    date: '2024-01-15',
    readTime: '4 min read',
    author: 'Dr. Sarah Chen',
    authorRole: 'Sustainability Expert',
    trending: true,
    views: 2400,
    tags: ['green-chemistry', 'sustainability', 'market-trends']
  },
  {
    id: 2,
    title: 'AI-Driven Chemical Discovery Accelerates Drug Development',
    excerpt: 'Machine learning algorithms reducing discovery time from years to months in pharmaceutical research.',
    content: 'Detailed analysis of AI applications in chemical research and drug discovery...',
    image: '🤖',
    category: 'Innovation',
    date: '2024-01-12',
    readTime: '6 min read',
    author: 'Prof. Michael Rodriguez',
    authorRole: 'AI Research Director',
    trending: true,
    views: 1800,
    tags: ['ai', 'drug-discovery', 'innovation']
  }
];

// Utility functions
const generateId = () => Math.random().toString(36).substr(2, 9);
const findUserByEmail = (email) => users.find(user => user.email === email);

// Authentication Middleware (simple version)
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  const user = users.find(u => u.token === token);
  if (!user) {
    return res.status(403).json({ error: 'Invalid token' });
  }
  
  req.user = user;
  next();
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'ChemMarket Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Authentication Routes
app.post('/api/auth/register', (req, res) => {
  const { fullName, email, password, company, role } = req.body;
  
  if (!fullName || !email || !password || !company) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  if (findUserByEmail(email)) {
    return res.status(409).json({ error: 'User already exists' });
  }
  
  const user = {
    id: generateId(),
    fullName,
    email,
    password, // In production, hash this!
    company,
    role: role || 'buyer',
    token: generateId(),
    createdAt: new Date().toISOString()
  };
  
  users.push(user);
  
  // Initialize user cart and favorites
  carts[user.id] = [];
  favorites[user.id] = [];
  
  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user.id,
      name: user.fullName,
      email: user.email,
      company: user.company,
      role: user.role
    },
    token: user.token
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  const user = findUserByEmail(email);
  if (!user || user.password !== password) { // In production, use bcrypt!
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.fullName,
      email: user.email,
      company: user.company,
      role: user.role
    },
    token: user.token
  });
});

// Product Routes
app.get('/api/products', (req, res) => {
  const { category, search, featured } = req.query;
  
  let filteredProducts = [...products];
  
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category === category
    );
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.supplier.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  }
  
  if (featured === 'true') {
    filteredProducts = filteredProducts.filter(product => product.featured);
  }
  
  res.json({
    products: filteredProducts,
    total: filteredProducts.length
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

app.get('/api/categories', (req, res) => {
  const categories = [
    { id: 'all', name: 'All Categories', count: products.length },
    { id: 'solvents', name: 'Solvents', count: products.filter(p => p.category === 'solvents').length },
    { id: 'inorganic', name: 'Inorganic Chemicals', count: products.filter(p => p.category === 'inorganic').length },
    { id: 'pharma', name: 'Pharmaceuticals', count: products.filter(p => p.category === 'pharma').length },
    { id: 'agro', name: 'Agrochemicals', count: products.filter(p => p.category === 'agro').length },
    { id: 'polymers', name: 'Polymers', count: products.filter(p => p.category === 'polymers').length },
  ];
  res.json(categories);
});

// Cart Routes
app.get('/api/cart', authenticateToken, (req, res) => {
  const userCart = carts[req.user.id] || [];
  res.json(userCart);
});

app.post('/api/cart', authenticateToken, (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  if (!carts[req.user.id]) {
    carts[req.user.id] = [];
  }
  
  const existingItem = carts[req.user.id].find(item => item.product.id === parseInt(productId));
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    carts[req.user.id].push({
      id: generateId(),
      product,
      quantity,
      addedAt: new Date().toISOString()
    });
  }
  
  res.json({
    message: 'Product added to cart',
    cart: carts[req.user.id]
  });
});

app.delete('/api/cart/:itemId', authenticateToken, (req, res) => {
  if (!carts[req.user.id]) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  
  carts[req.user.id] = carts[req.user.id].filter(item => item.id !== req.params.itemId);
  
  res.json({
    message: 'Item removed from cart',
    cart: carts[req.user.id]
  });
});

app.put('/api/cart/:itemId', authenticateToken, (req, res) => {
  const { quantity } = req.body;
  
  if (!carts[req.user.id]) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  
  const item = carts[req.user.id].find(item => item.id === req.params.itemId);
  if (!item) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }
  
  item.quantity = quantity;
  
  res.json({
    message: 'Cart updated',
    cart: carts[req.user.id]
  });
});

// Favorites Routes
app.get('/api/favorites', authenticateToken, (req, res) => {
  const userFavorites = favorites[req.user.id] || [];
  res.json(userFavorites);
});

app.post('/api/favorites', authenticateToken, (req, res) => {
  const { productId } = req.body;
  
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  if (!favorites[req.user.id]) {
    favorites[req.user.id] = [];
  }
  
  const isAlreadyFavorite = favorites[req.user.id].some(fav => fav.id === parseInt(productId));
  
  if (isAlreadyFavorite) {
    // Remove from favorites
    favorites[req.user.id] = favorites[req.user.id].filter(fav => fav.id !== parseInt(productId));
    res.json({
      message: 'Product removed from favorites',
      isFavorite: false,
      favorites: favorites[req.user.id]
    });
  } else {
    // Add to favorites
    favorites[req.user.id].push(product);
    res.json({
      message: 'Product added to favorites',
      isFavorite: true,
      favorites: favorites[req.user.id]
    });
  }
});

// Order Routes
app.post('/api/orders', authenticateToken, (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;
  
  if (!items || !items.length) {
    return res.status(400).json({ error: 'No items in order' });
  }
  
  const order = {
    id: generateId(),
    userId: req.user.id,
    items: items.map(item => ({
      ...item,
      total: item.product.price * item.quantity
    })),
    total: items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
    status: 'pending',
    shippingAddress,
    paymentMethod,
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
  };
  
  orders.push(order);
  
  // Clear user's cart after successful order
  carts[req.user.id] = [];
  
  res.status(201).json({
    message: 'Order created successfully',
    order
  });
});

app.get('/api/orders', authenticateToken, (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.user.id);
  res.json(userOrders);
});

app.get('/api/orders/:id', authenticateToken, (req, res) => {
  const order = orders.find(o => o.id === req.params.id && o.userId === req.user.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// Blog Routes
app.get('/api/blog/posts', (req, res) => {
  const { category, limit } = req.query;
  
  let filteredPosts = [...blogPosts];
  
  if (category) {
    filteredPosts = filteredPosts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (limit) {
    filteredPosts = filteredPosts.slice(0, parseInt(limit));
  }
  
  res.json({
    posts: filteredPosts,
    total: filteredPosts.length
  });
});

app.get('/api/blog/posts/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  
  // Increment views
  post.views += 1;
  
  res.json(post);
});

// Contact Form Route
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // In production, you would save this to a database and send an email
  console.log('Contact form submission:', { name, email, message });
  
  res.json({
    message: 'Thank you for your message! We will get back to you soon.',
    submissionId: generateId()
  });
});

// Supplier Registration Route
app.post('/api/suppliers/register', (req, res) => {
  const { companyName, email, phone, products, description } = req.body;
  
  if (!companyName || !email || !phone || !products) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // In production, you would save this to a database
  console.log('Supplier registration:', { companyName, email, phone, products, description });
  
  res.status(201).json({
    message: 'Thank you for your interest! Our team will contact you shortly.',
    applicationId: generateId()
  });
});

// Analytics Route (for dashboard)
app.get('/api/analytics/overview', authenticateToken, (req, res) => {
  const totalProducts = products.length;
  const totalUsers = users.length;
  const totalOrders = orders.length;
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  
  res.json({
    totalProducts,
    totalUsers,
    totalOrders,
    revenue: Math.round(revenue * 100) / 100,
    popularCategories: [
      { name: 'Solvents', count: products.filter(p => p.category === 'solvents').length },
      { name: 'Pharmaceuticals', count: products.filter(p => p.category === 'pharma').length },
      { name: 'Polymers', count: products.filter(p => p.category === 'polymers').length }
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ChemMarket Backend running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📚 API Documentation:`);
  console.log(`   GET  /api/products - Get all products`);
  console.log(`   POST /api/auth/register - User registration`);
  console.log(`   POST /api/auth/login - User login`);
  console.log(`   GET  /api/cart - Get user cart (authenticated)`);
  console.log(`   POST /api/orders - Create order (authenticated)`);
});