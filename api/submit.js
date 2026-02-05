import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { name, age, destination, budget, party_size, travel_date, phone, message } = req.body;

  const { data, error } = await supabase
    .from('inquiries')
    .insert([{ name, age, destination, budget, party_size, travel_date, phone, message }]);

  if (error) return res.status(500).json({ error: error.message });

  res.send("<h1>Success!</h1><p>Your tropical escape is being planned.</p><a href='/'>Back</a>");
}
