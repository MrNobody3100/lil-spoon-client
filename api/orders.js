import { query } from '../db.js';

// Route PUBLIQUE : le client (sans compte) crée une commande.
// Pas de GET/PATCH ici — la lecture/gestion des commandes reste côté admin.
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { customerName, customerPhone, customerAddress, customDescription, productId } = req.body || {};

  if (!customerName || !customerName.trim()) {
    return res.status(400).json({ error: 'Nom requis' });
  }
  if (!customerPhone || !customerPhone.trim()) {
    return res.status(400).json({ error: 'Numéro de téléphone requis' });
  }
  if (!customerAddress || !customerAddress.trim()) {
    return res.status(400).json({ error: 'Adresse requise' });
  }
  if (!productId) {
    return res.status(400).json({ error: 'Produit requis' });
  }

  try {
    const { rows } = await query(
      `INSERT INTO orders (customer_name, customer_phone, customer_address, custom_description, product_id, status)
       VALUES ($1, $2, $3, $4, $5, 'nouvelle')
       RETURNING id`,
      [
        customerName.trim(),
        customerPhone.trim(),
        customerAddress.trim(),
        customDescription ? customDescription.trim() : null,
        productId
      ]
    );
    return res.status(200).json({ success: true, id: rows[0].id });
  } catch (err) {
    console.error('❌ POST /api/orders error:', err.message);
    return res.status(500).json({ error: 'Erreur serveur', details: err.message, code: err.code || null });
  }
}
