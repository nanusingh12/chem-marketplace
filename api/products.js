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

export default function handler(req, res) {
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
}