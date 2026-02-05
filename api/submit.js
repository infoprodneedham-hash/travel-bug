const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  // 1. Initialize Supabase inside the handler
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  // 2. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 3. Destructure the form data
    const { name, age, destination, budget, party_size, travel_date, phone, message } = req.body;

    // 4. Send to Supabase
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        { 
          name, 
          age: age ? parseInt(age) : null, 
          destination, 
          budget: budget ? parseInt(budget) : null, 
          party_size: party_size ? parseInt(party_size) : null, 
          travel_date: travel_date || null, 
          phone, 
          message 
        }
      ]);

    if (error) {
      console.error("Supabase Error:", error.message);
      throw error;
    }

    // 5. Success Response
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <div style="text-align:center; font-family:sans-serif; padding:50px; background:#f4e4bc; height:100vh;">
        <h1 style="color:#00afaf;">🌴 Aloha!</h1>
        <p>Your tropical getaway inquiry has been received.</p>
        <a href="/" style="color:#ff7e5f; font-weight:bold;">Return Home</a>
      </div>
    `);

  } catch (err) {
    // This will show up in your Vercel "Logs" tab
    console.error("Function Crash Details:", err);
    res.status(500).json({ 
      error: "Internal Server Error", 
      details: err.message 
    });
  }
};
