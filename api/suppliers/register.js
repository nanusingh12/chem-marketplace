export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { companyName, email, phone, products, description } = req.body;
    
    // Log the registration (in real app, save to database)
    console.log('Supplier registration:', { 
      companyName, email, phone, products, description 
    });
    
    res.json({
      success: true,
      message: 'Thank you for your interest! Our team will contact you shortly.'
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}