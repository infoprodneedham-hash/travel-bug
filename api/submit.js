const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

  if (req.method === 'POST') {
    const { name, age, destination, budget, party_size, travel_date, phone, message } = req.body;

    const { error } = await supabase
      .from('inquiries')
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

    if (error) {
        return res.status(500).send("Database Error: " + error.message);
    }

    // Success! Go back to the home page or a success message
    res.send("<h1>🌴 Success! Your trip is being planned.</h1><a href='/'>Go Back</a>");
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
