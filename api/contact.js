export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    
    // In a real app, you'd save to database or send email
    // For now, just return success
    console.log('Contact form received:', { name, email, message });
    
    res.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}