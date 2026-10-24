# LibraTech Library Management

A professional MERN library-management website with a public reader catalog and a secure staff workspace. This is a separate LibraTech codebase; it does not modify the existing reference site or repository.

## Features

- React and Vite frontend, Express REST API, MongoDB persistence through Mongoose.
- First-screen paths for Reader/User and Admin/Staff, with a public searchable book catalog and protected staff sign-in. The “Reader access” control opens the public catalog; it does not claim to create a reader account.
- Book records include title, author, category, ISBN, publication year, total quantity, and available quantity. Staff can add, view, update, and delete books.
- Member records include name, email, phone, address, and membership date. Staff can add, view, update, and delete members.
- Inventory-aware issue and return operations update availability automatically; active loans are preserved.
- Dashboard totals are backed by MongoDB records, not demo counters.
- Staff sessions are signed and HTTP-only; state-changing requests require an app-only request marker and a per-session CSRF token.
- Dark black and emerald LibraTech visual system with a restrained light-glitch accent and reduced-motion support.

## Real catalog and inventory policy

The starter catalog has **25 real, ISBN-backed books**: the five retained original titles and 20 additions, with *Frankenstein* removed. Bibliographic sources and edition ISBN links are in [`CATALOG_SOURCES.md`](./CATALOG_SOURCES.md). On a truly empty MongoDB database, the initializer adds all 25 titles with `quantity=0` and `availableQuantity=0`. Staff must record actual physical holdings before any copy is available to issue. No fictional titles, members, loans, or sample holdings are seeded. Set `SEED_STARTER_CATALOG=false` to disable initialization.

A database initialized with the previous v1 starter catalog receives missing starter titles using insert-only writes; staff-entered quantities are not overwritten. The obsolete *Frankenstein* entry is removed only when it has no counted copies and no loan history. Existing stock or history is preserved.

If the database or API is unavailable, the reader view may show the verified bibliographic records, but it does not represent them as physical stock. Staff write operations remain locked until the database and administrator configuration are ready.

## Local development

Use Node.js 22 and the npm version pinned in `package.json` (`npm@10.9.2`). Copy `.env.example` to `.env` and fill the values privately:

```sh
npm ci
cp .env.example .env
npm run dev
```

The Vite website listens on `http://localhost:3000` and proxies `/api` to the local Express server on port `3001`. Configure these environment variables in `.env` or the hosting provider's encrypted runtime settings:

- `MONGODB_URI` — private MongoDB connection URI.
- `SESSION_SECRET` — random signing secret of at least 32 characters.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` — administrator credentials.
- `SEED_STARTER_CATALOG` — optional initializer toggle described above.
- `PUBLIC_HTTPS_PREVIEW` — optional local proxy override; the hosted Preview normally identifies itself through the browser request header.

Never commit `.env`, MongoDB credentials, session secrets, or administrator credentials. Only placeholders belong in `.env.example`.

For public HTTPS Preview, the staff session cookie is `SameSite=None; Secure` so the embedded app can use it; same-site production uses `Secure; SameSite=Lax`, while plain-HTTP localhost uses separate development handling. Every state-changing browser request also carries a per-session CSRF token; permissive cross-origin CORS is not enabled.

## Checks and production build

```sh
npm run check
npm run build
```

## Vercel compatibility

`vercel.json` and `api/index.js` are retained for a separate Vercel deployment. Before production use, create a new LibraTech project and configure the private runtime variables listed above in its Production environment. Do not use credentials from any other project or commit secrets. A production URL should be shared only after deployment and database readiness have been confirmed.

## Catalog source notes

See [`CATALOG_SOURCES.md`](./CATALOG_SOURCES.md) for the ISBNs, Open Library metadata/cover endpoints, bibliographic verification references, and zero-stock seeding policy.
