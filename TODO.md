# LibraTech outcomes

## 1. Reference-style public entry, reader/admin choice, and dark green visual system
- [x] The first-time entry presents a clear choice between Reader (User) and Admin (Staff), while the site retains the LibraTech reference's professional library-management identity and its Features, How It Works, About, Contact, Login, and Reader access navigation.
- [x] Use a dark black/charcoal and green theme with a subtle light-glitch effect; maintain attractive, readable typography, compact purposeful spacing, responsive layouts, visible keyboard focus, and reduced-motion support. Do not change or redeploy the existing reference site.
- [x] The Reader view lets visitors browse/search the real catalog and see recorded availability; the Admin view provides secure staff sign-in and the library workspace.
- [x] Do not display fabricated operational dashboard totals as facts.

## 2. Real catalog and book/member administration
- [x] Allow an administrator/librarian to add, view, update, and delete books. Each book stores title, author, category, ISBN, quantity, available quantity, and publication year.
- [x] Allow an administrator/librarian to add, view, update, and delete members. Each member stores name, email, phone, address, and membership date.
- [x] Use real book titles, authors, editions, and ISBNs, not dummy book data. On a genuinely empty MongoDB database, seed only the six verified bibliographic records; initialize each with quantity 0 and available quantity 0 until staff confirm physical holdings. Do not seed fictional members or example loans.

## 3. Issue/return operations and dashboard
- [x] A librarian can issue a book only when an available physical copy and a registered member exist, then later mark the issue returned.
- [x] Issuing and returning automatically updates available book quantity; inventory cannot become negative or exceed counted total, and records with active loans cannot be deleted.
- [x] The dashboard displays total books/copies, total members, issued books, returned books, and currently available books using database-backed values.

## 4. MERN persistence, secure access, and setup documentation
- [x] Use React.js, Node.js, Express.js, Mongoose, and MongoDB through a REST API; store application data in MongoDB when the private `MONGODB_URI` is configured.
- [x] Protect staff operations with secure administrator sign-in and signed HTTP-only sessions. Require a per-session CSRF token for every state-changing staff action. Keep `MONGODB_URI`, `SESSION_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` out of Git; provide only safe placeholders and setup instructions.
- [x] For public HTTPS Preview, session cookies use `SameSite=None; Secure`; production uses secure same-site cookie behavior, and plain-HTTP local handling remains separate.
- [x] When the MongoDB/API setup is unavailable, keep the reader catalog honest by showing only real metadata at zero recorded holdings and explain that live availability is not connected; keep staff writes locked.
- [x] Include accurate catalog source documentation and instructions for local build/run.

## 5. Separate public code repository
- [x] Create and push the completed code to a new public GitHub repository, separate from and without modifying `Syeda-Aamna/aurora-library-system` or the existing LibraTech reference deployment.

## 6. Permanent deployment
- [ ] Publish the completed app to a separate permanent Vercel project without changing the existing reference deployment; provide its URL only after the production deployment and database readiness are confirmed.
