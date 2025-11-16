import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import XLSX from 'xlsx'; // Import the Excel reader
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// --- IN-MEMORY DATABASE ---
let users = [];
// Initial product list
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
    stock: 150,
    imageURL: '/images/acetone.jpg'
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
    stock: 300,
    imageURL: '/images/sodium-hydroxide.jpg'
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
    stock: 75,
    imageURL: '/images/ethanol.jpg'
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
    stock: 50000,
    imageURL: '/images/polyethylene.jpg'
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
    stock: 1000,
    imageURL: '/images/aspirin.jpg'
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
    stock: 100000,
    imageURL: '/images/ammonium-nitrate.jpg'
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

// --- EXCEL DATA SYNCHRONIZER ---

/**
 * Reads 'prices.xlsx' and updates:
 * 1. Prices
 * 2. Stock levels
 * 3. Adds NEW products if found in Excel
 */
function updateDataFromExcel() {
  const filePath = path.resolve('prices.xlsx');

  if (!fs.existsSync(filePath)) {
    console.log(`[${new Date().toISOString()}] ⚠️ 'prices.xlsx' not found. Skipping update.`);
    return;
  }

  try {
    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const excelData = XLSX.utils.sheet_to_json(worksheet);
    
    let updatesCount = 0;
    let newProductsCount = 0;

    excelData.forEach(row => {
      const product = products.find(p => p.id === row.id);
      
      if (product) {
        // --- UPDATE EXISTING PRODUCT ---
        let updated = false;

        // Update Price
        if (row.price && product.price !== row.price) {
          console.log(`   💰 Price Change (${product.name}): $${product.price} -> $${row.price}`);
          product.price = parseFloat(row.price);
          updated = true;
        }

        // Update Stock (New Feature)
        if (row.stock !== undefined && product.stock !== row.stock) {
          console.log(`   📦 Stock Change (${product.name}): ${product.stock} -> ${row.stock}`);
          product.stock = parseInt(row.stock);
          product.inStock = product.stock > 0; // Auto-update inStock status
          updated = true;
        }

        if (updated) updatesCount++;

      } else {
        // --- ADD NEW PRODUCT (New Feature) ---
        // If ID in Excel doesn't exist in app, create it
        if (row.id && row.name && row.price) {
          const newProduct = {
            id: row.id,
            name: row.name,
            category: 'general', // Default category
            supplier: 'New Supplier', // Default
            price: parseFloat(row.price),
            unit: 'unit',
            rating: 0,
            reviews: 0,
            featured: false,
            delivery: 'Standard Shipping',
            purity: 'Standard',
            moq: '1 unit',
            inStock: (row.stock || 0) > 0,
            description: 'New product added via Excel sync.',
            image: '📦', // Default emoji
            stock: parseInt(row.stock || 0),
            imageURL: '/images/placeholder.jpg' // Default image
          };
          
          products.push(newProduct);
          console.log(`   ✨ New Product Created: ${row.name} (ID: ${row.id})`);
          newProductsCount++;
        }
      }
    });

    if (updatesCount > 0 || newProductsCount > 0) {
      console.log(`[${new Date().toISOString()}] 🔄 Sync Complete: ${updatesCount} updates, ${newProductsCount} new products.`);
    }

  } catch (error) {
    console.error("❌ Error reading Excel file:", error.message);
  }
}

// --- END EXCEL SYNCHRONIZER ---


// Utility functions
const generateId = () => Math.random().toString(36).substr(2, 9);
const findUserByEmail = (email) => users.find(user => user.email === email);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Access token required' });
  
  const user = users.find(u => u.token === token);
  if (!user) return res.status(403).json({ error: 'Invalid token' });
  
  req.user = user;
  next();
};

// --- ROUTES ---

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ChemMarket Backend is running!', timestamp: new Date().toISOString() });
});

// Auth
app.post('/api/auth/register', (req, res) => {
  const { fullName, email, password, company, role } = req.body;
  if (!fullName || !email || !password || !company) return res.status(400).json({ error: 'All fields required' });
  if (findUserByEmail(email)) return res.status(409).json({ error: 'User exists' });
  
  const user = {
    id: generateId(), fullName, email, password, company, role: role || 'buyer',
    token: generateId(), createdAt: new Date().toISOString()
  };
  users.push(user);
  carts[user.id] = []; favorites[user.id] = [];
  res.status(201).json({ message: 'Registered', user: { id: user.id, name: fullName, email, company, role }, token: user.token });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  if (!user || user.password !== password) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ message: 'Login successful', user: { id: user.id, name: user.fullName, email: user.email, company: user.company, role: user.role }, token: user.token });
});

// Products
app.get('/api/products', (req, res) => {
  const { category, search, featured } = req.query;
  let filtered = [...products];
  if (category && category !== 'all') filtered = filtered.filter(p => p.category === category);
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(s) || p.supplier.toLowerCase().includes(s));
  }
  if (featured === 'true') filtered = filtered.filter(p => p.featured);
  res.json({ products: filtered, total: filtered.length });
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

// Cart & Favorites
app.get('/api/cart', authenticateToken, (req, res) => res.json(carts[req.user.id] || []));
app.post('/api/cart', authenticateToken, (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  if (!carts[req.user.id]) carts[req.user.id] = [];
  const existing = carts[req.user.id].find(i => i.product.id === parseInt(productId));
  if (existing) existing.quantity += quantity;
  else carts[req.user.id].push({ id: generateId(), product, quantity });
  res.json({ message: 'Added to cart', cart: carts[req.user.id] });
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

app.get('/api/favorites', authenticateToken, (req, res) => res.json(favorites[req.user.id] || []));
app.post('/api/favorites', authenticateToken, (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return res.status(404).json({ error: 'Not found' });
  if (!favorites[req.user.id]) favorites[req.user.id] = [];
  const index = favorites[req.user.id].findIndex(f => f.id === parseInt(productId));
  if (index > -1) {
    favorites[req.user.id].splice(index, 1);
    res.json({ message: 'Removed from favorites', favorites: favorites[req.user.id], isFavorite: false });
  } else {
    favorites[req.user.id].push(product);
    res.json({ message: 'Added to favorites', favorites: favorites[req.user.id], isFavorite: true });
  }
});

// Order Routes
app.post('/api/orders', authenticateToken, (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;
  if (!items || !items.length) return res.status(400).json({ error: 'No items in order' });
  const order = {
    id: generateId(),
    userId: req.user.id,
    items: items.map(item => ({ ...item, total: item.product.price * item.quantity })),
    total: items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
    status: 'pending', shippingAddress, paymentMethod, createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  };
  orders.push(order);
  carts[req.user.id] = [];
  res.status(201).json({ message: 'Order created successfully', order });
});

app.get('/api/orders', authenticateToken, (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.user.id);
  res.json(userOrders);
});

// Blog Routes
app.get('/api/blog/posts', (req, res) => {
  const { category, limit } = req.query;
  let filteredPosts = [...blogPosts];
  if (category) filteredPosts = filteredPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
  if (limit) filteredPosts = filteredPosts.slice(0, parseInt(limit));
  res.json({ posts: filteredPosts, total: filteredPosts.length });
});

app.post('/api/contact', (req, res) => res.json({ message: 'Message sent', submissionId: generateId() }));
app.post('/api/suppliers/register', (req, res) => res.status(201).json({ message: 'Application received', applicationId: generateId() }));

// Analytics
app.get('/api/analytics/overview', authenticateToken, (req, res) => {
  const totalProducts = products.length;
  const totalUsers = users.length;
  const totalOrders = orders.length;
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  res.json({
    totalProducts, totalUsers, totalOrders, revenue: Math.round(revenue * 100) / 100,
    popularCategories: [
      { name: 'Solvents', count: products.filter(p => p.category === 'solvents').length },
      { name: 'Pharmaceuticals', count: products.filter(p => p.category === 'pharma').length },
      { name: 'Polymers', count: products.filter(p => p.category === 'polymers').length }
    ]
  });
});

// Error handling
app.use((err, req, res, next) => { console.error(err.stack); res.status(500).json({ error: 'Something went wrong!' }); });
app.use((req, res) => { res.status(404).json({ error: 'Endpoint not found' }); });

// --- SCHEDULER ---

// Run the update immediately on startup
console.log('🚀 Server starting... syncing with Excel (Prices + Stock)...');
updateDataFromExcel();

// Schedule checking every 60 seconds
console.log('📅 Data sync scheduler running (checks prices.xlsx every 60s)');
cron.schedule('*/60 * * * * *', () => {
  updateDataFromExcel();
});

app.listen(PORT, () => {
  console.log(`🚀 ChemMarket Backend running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});