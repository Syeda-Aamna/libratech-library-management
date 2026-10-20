# LibraTech Library Management — Implementation Plan

## Product scope and serving model

Build a separate, production-oriented MERN library-management website modeled on the public LibraTech reference page and the user's requested library workflows. Keep the LibraTech identity, black/green palette, and subtle light-glitch effect while making the reader/admin paths usable. The first screen presents Reader (User) and Admin (Staff) choices within a marketing-style homepage that retains Features, How It Works, About, Contact, Login, and honest Reader access navigation. The root page must not present fabricated operational totals as real data.

Use React 18 and Vite for the client, Node.js/Express for the REST API, and MongoDB through Mongoose for persistence. The existing proven library-system code is the read-only template for book/member/circulation flows, validation, signed HTTP-only administrator sessions, and the verified starter catalog. The public catalog can show verified bibliographic metadata at zero recorded physical copies if the API/database is not configured; staff operations remain unavailable until real MongoDB and administrator environment variables are supplied. No credentials, fake members, demo loans, or invented stock go in the repository.

During development, Vite serves the client on the project's configured Preview port and proxies relative `/api` calls to the Express listener. Keep browser-facing URLs relative so the Preview proxy works. Preserve the Vercel-compatible API/static build files for a future separate deployment, but do not alter or redeploy the existing reference project. Required secrets are documented as variable names and placeholders only in `.env.example` and README; private values must be provided through environment configuration, never committed.

## Design direction

- **Design movement:** Modern dark digital-library interface: quiet editorial typography, precise product-dashboard framing, and a restrained cyber-emerald accent.
- **Core principles:** Trustworthy data first; strong contrast and readable type; compact, purposeful spacing; understated motion rather than decorative noise.
- **Color philosophy:** Near-black and charcoal surfaces communicate focus and permanence; rich forest green anchors the library identity; bright emerald is reserved for key actions, availability, and a small glancing highlight.
- **Layout paradigm:** Reference-style full-width navigation and split hero with copy on the left and a crafted dashboard preview on the right; the staff app uses a stable left rail and a flexible work canvas. Keep vertical rhythm compact and use deliberate grouping rather than oversized gaps.
- **Signature elements:** A custom book-spine/L mark with a green edge; thin emerald inventory/status rules; a brief light sweep/glitch at the wordmark or hero accent, not across body text.
- **Interaction philosophy:** Reader and staff actions are explicit, direct, and reversible where possible. Show availability from recorded copies only; use focused inline status, clear confirmation for deletion, and safe empty states.
- **Animation:** Low-intensity green shimmer/glitch is limited to a short logo/hero accent and runs infrequently. Use quick hover/focus transitions for controls; respect `prefers-reduced-motion` by removing nonessential motion. Never blink or distort operational text.
- **Typography system:** Space Grotesk for headings and display labels; DM Sans for UI/body text. Use a clear 16px+ body baseline, readable table labels, and restrained uppercase eyebrow text. Avoid tiny, low-contrast typography and excessive whitespace.
- **Brand essence:** A precise, composed, modern operations desk for libraries that need accurate collection and lending records.
- **Brand voice:** Clear, useful, and confident. Example headlines: “Your library, in clear view.” “Every copy counted. Every loan accounted for.”
- **Wordmark & logo:** “LibraTech” wordmark paired with an original book-spine/L mark; use a small emerald light line as the distinguishing detail, not an Aurora asset.
- **Signature brand color:** Electric emerald `#46F59A`, used sparingly against deep charcoal.

## Project structure

- `src/`: React application, public marketing/role entry, reader catalog, secure staff sign-in, shared CSRF-aware API client, dashboard, books, members, and circulation UI.
- `api/`: Express entry point, signed session/auth middleware, same-site request and CSRF guard, public catalog route, REST CRUD/circulation endpoints, and Mongoose models.
- `shared/catalog-data.js`: Six verified real book editions; all start at zero copies until staff count holdings.
- `public/`: Route manifest, favicon, and static assets.
- `CATALOG_SOURCES.md`: Open Library edition/cover and independent publication references.
- `.env.example`: Safe placeholders for `MONGODB_URI`, `SESSION_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`; no live values.
- `README.md`: Setup, environment, security, API, catalog, and build instructions.
- `plan.md` and `TODO.md`: Implementation record and outcome tracking.

## Implementation decisions and constraints

Reuse the existing tested MERN library flows without changing the existing Aurora repository. Rebrand the new copy as LibraTech and restyle its entry, reader, login, and staff pages. Maintain accurate book/member CRUD, inventory-aware issue/return transitions, due dates, and database-driven dashboard totals. Seed only the six verified bibliographic records on an actually empty database, with quantity and available quantity both zero; never seed example members, loans, or fake holdings. Protect staff operations with signed HTTP-only sessions and per-session CSRF verification on state-changing requests. Use `SameSite=None; Secure` only for public HTTPS Preview; use secure same-site cookies for production and separate plain-HTTP local handling. The new source is to be pushed to a new public GitHub repository requested by the user. Permanent Vercel publication remains separate and is not claimed unless project-scope access is available and the deployment is verified.
