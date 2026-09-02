import { query } from '../db.js';

// Route PUBLIQUE (pas d'authentification) : renvoie les catégories et les
// produits disponibles, pour le site client (menu / boutique).
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const [categoriesResult, productsResult] = await Promise.all([
      query('SELECT id, name, slug, sort_order FROM categories ORDER BY sort_order ASC, name ASC'),
      query(
        `SELECT id, name, description, price, image_url, category_id
         FROM products
         WHERE is_available = true
         ORDER BY created_at DESC`
      )
    ]);

    return res.status(200).json({
      categories: categoriesResult.rows,
      products: productsResult.rows
    });
  } catch (err) {
    console.error('❌ GET /api/catalog error:', err.message);
    return res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
}
