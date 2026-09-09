# Frontend

This folder is the deployment boundary for the existing Next.js website.

Move the current frontend files here when the backend is installed:

- `src/`
- `public/`
- `package.json` and `package-lock.json`
- `next.config.ts`, `tsconfig.json`, `next-env.d.ts`
- `eslint.config.mjs`, `postcss.config.mjs`

Add `NEXT_PUBLIC_API_URL` to `frontend/.env.local`, pointing to `http://localhost:4000` locally and the deployed backend URL in production.

The Next.js frontend must send a Firebase ID token in the `Authorization: Bearer <token>` header for every `/api/admin/*` backend call.
