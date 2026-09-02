# The Little Spoon — Site Client

Site public de commande (sans compte). Séparé du repo admin.

## Variables d'environnement à configurer sur Vercel

Les mêmes que le repo admin (connexion à la même base Supabase) :
- `POSTGRES_PRISMA_URL` (ou `POSTGRES_URL_NON_POOLING` / `POSTGRES_URL` / `DATABASE_URL`)

Pas besoin de `SESSION_SECRET` ici — ce site n'a pas d'authentification, tout est public en lecture seule sur le catalogue, et la création de commande est ouverte à tous (comme prévu pour un site client sans compte).

## Structure

- `public/index.html` — la page catalogue + commande
- `public/logo.jpg` — logo affiché en header
- `api/catalog.js` — GET public : catégories + produits disponibles
- `api/orders.js` — POST public : création d'une commande
- `db.js` — connexion Postgres partagée (identique au repo admin)

## Déploiement

1. Crée le repo sur GitHub, push ce contenu.
2. Importe le repo dans Vercel comme nouveau projet.
3. Ajoute la variable d'env Postgres (copie-la depuis le projet admin).
4. Déploie. Le site sera accessible à la racine du domaine Vercel généré.
