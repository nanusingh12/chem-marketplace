export default function handler(req, res) {
  res.json({ 
    message: "API is working!", 
    success: true,
    timestamp: new Date().toISOString()
  });
}