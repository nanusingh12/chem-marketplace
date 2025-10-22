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
  // ... include ALL your products
];

export default function handler(req, res) {
  const { category, search } = req.query;
  
  let filteredProducts = products;
  
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category === category
    );
  }
  
  if (search) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.supplier.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.json({
    success: true,
    data: filteredProducts,
    total: filteredProducts.length
  });
}