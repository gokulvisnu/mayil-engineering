# Mayil Engineering Backend

Standalone Express API for project content, enquiries, reviews, and Supabase Storage uploads.

## Setup

```cmd
cd backend
npm install
copy .env.example .env
npm run dev
```

Set the variables in `.env`. `FIREBASE_*` values must come from a Firebase **service account**; do not use the browser Firebase configuration values here.

## Routes

- `GET /health`
- `GET /api/content`
- `POST /api/enquiries`
- `POST /api/reviews`
- `GET /api/admin/inbox` (Firebase admin token required)
- `PATCH /api/admin/inbox/:kind/:id` (Firebase admin token required)
- `POST /api/admin/uploads` (Firebase admin token required)
