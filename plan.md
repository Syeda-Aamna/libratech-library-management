# LibraTech Library Management — Implementation Plan

## Product scope and serving model

Build a separate, production-oriented MERN library-management website modeled on the public LibraTech reference page and the user's requested library workflows. Keep the LibraTech identity, black/green palette, and subtle light-glitch effect while making the reader/admin paths usable. The first screen presents Reader (User) and Admin (Staff) choices within a marketing-style homepage that retains Features, How It Works, About, Contact, Login, and honest Reader access navigation. The root page must not present fabricated operational totals as real data.

Use React 18 and Vite for the client, Node.js/Express for the REST API, and MongoDB through Mongoose for persistence. Reuse the tested library-system flows for book/member/circulation management, validation, signed HTTP-only staff sessions, and the real starter catalog. The 25-title catalog uses ISBN-backed records: it retains five prior titles other than *Frankenstein* and adds 20 books. Every starter title begins with zero recorded stock, and the catalog UI never presents book metadata as proof of physical holdings. If the API/database is not configured, the reader sees a verified metadata preview while staff operations remain locked. No credentials, fake members, demo loans, or invented stock go in the repository.

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
- `shared/catalog-data.js`: 25 verified real-book editions; all starter records initialize at zero copies until staff count holdings.
- `scripts/check-catalog.js`: invariant check for count, removal of Frankenstein, unique ISBNs, and zero initial holdings.
- `public/`: Route manifest, favicon, and static assets.
- `CATALOG_SOURCES.md`: Open Library ISBN/edition records and catalog inventory policy.
- `.env.example`: Safe placeholders for `MONGODB_URI`, `SESSION_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`; no live values.
- `README.md`: Setup, environment, security, API, catalog, and build instructions.
- `plan.md` and `TODO.md`: Implementation record and outcome tracking.

## Implementation decisions and constraints

The catalog starter initializer uses a versioned setting. A genuinely empty library receives the full verified 25-title zero-stock catalog. A database marked as initialized by the previous v1 starter catalog receives new ISBN records only via insert-only writes, so existing inventory values are not overwritten. *Frankenstein* is removed from a migrated starter library only when its total/available stock is zero and there is no loan history; existing physical stock or circulation history is preserved. An unrelated populated database is not overwritten or populated with sample data. Seed initialization remains opt-out with `SEED_STARTER_CATALOG=false`.

Maintain accurate book/member CRUD, inventory-aware issue/return transitions, due dates, and database-driven dashboard totals. Protect staff operations with signed HTTP-only sessions and per-session CSRF verification on state-changing requests. Use `SameSite=None; Secure` only for public HTTPS Preview; use secure same-site cookies for production and separate plain-HTTP local handling. The project remains in a separate repository from both the original Aurora source and the LibraTech reference deployment. Permanent Vercel publication remains separate and is not claimed unless project-scope access is available and deployment is verified.
