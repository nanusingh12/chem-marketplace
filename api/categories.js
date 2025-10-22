const products = [
  // Same products array as in products.js
];

export default function handler(req, res) {
  const categories = [
    { id: 'all', name: 'All Categories', count: products.length },
    { id: 'organic', name: 'Organic Chemicals', count: 0 },
    { id: 'inorganic', name: 'Inorganic Chemicals', count: products.filter(p => p.category === 'inorganic').length },
    { id: 'solvents', name: 'Solvents', count: products.filter(p => p.category === 'solvents').length },
    { id: 'pharma', name: 'Pharmaceuticals', count: products.filter(p => p.category === 'pharma').length },
    { id: 'agro', name: 'Agrochemicals', count: products.filter(p => p.category === 'agro').length },
    { id: 'polymers', name: 'Polymers', count: products.filter(p => p.category === 'polymers').length },
  ];
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.json({
    success: true,
    data: categories
  });
}