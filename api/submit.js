const { createClient } = require('@supabase/supabase-js');

// This allows Vercel to read the body of your form
module.exports = async (req, res) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const { name, age, destination, budget, party_size, travel_date, phone, message } = req.body;

    const { data, error } = await supabase
      .from('inquiries') // <--- DOUBLE CHECK THIS matches Supabase exactly
      .insert([{ 
          name, 
          age: parseInt(age), 
          destination, 
          budget: parseInt(budget), 
          party_size: parseInt(party_size), 
          travel_date, 
          phone, 
          message 
      }]);

    if (error) throw error;

    res.send("<h1>Success!</h1><p>Your tropical escape is being planned.</p><a href='/'>Back</a>");
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: error.message });
  }
};
