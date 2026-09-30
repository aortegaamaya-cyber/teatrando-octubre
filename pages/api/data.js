import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('parrilla_data')
      .select('data')
      .eq('id', 'octubre_2026')
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data: data?.data || '{}' });
  }
  if (req.method === 'POST') {
    const { data: body } = req.body;
    const { error } = await supabase
      .from('parrilla_data')
      .update({ data: body })
      .eq('id', 'octubre_2026');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true });
  }
  res.status(405).end();
}
