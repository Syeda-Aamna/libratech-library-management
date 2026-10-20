import {
  Activity, ArrowRight, ArrowUpRight, BookMarked, BookOpen, CheckCircle2,
  LibraryBig, ShieldCheck, Users,
} from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    eyebrow: 'BOOK COLLECTION',
    title: 'Keep every title in order.',
    text: 'Record title, author, category, ISBN, publication year, and counted physical copies in one searchable collection.',
  },
  {
    icon: Users,
    eyebrow: 'MEMBER REGISTER',
    title: 'Know your readers.',
    text: 'Maintain accurate member contact details and membership dates in a protected staff workspace.',
  },
  {
    icon: Activity,
    eyebrow: 'CIRCULATION',
    title: 'Every handoff accounted for.',
    text: 'Issue available copies, set due dates, and record returns while inventory updates automatically.',
  },
  {
    icon: BookMarked,
    eyebrow: 'CLEAR DASHBOARD',
    title: 'See what is happening.',
    text: 'Review real totals for copies, members, issues, returns, and availability—never fabricated sample counts.',
  },
];

const starterTitles = [
  ['Pride and Prejudice', 'Jane Austen', '1813'],
  ['Frankenstein', 'Mary Shelley', '1818'],
  ['The Hobbit', 'J. R. R. Tolkien', '1937'],
];

export default function LandingPage({ onScreen }) {
  return (
    <main className="landing-shell" id="top">
      <header className="landing-header">
        <a className="landing-brand" href="#top" aria-label="LibraTech home">
          <span className="landing-brand-mark"><LibraryBig size={21} strokeWidth={1.7} /><i /></span>
          <span className="landing-brand-copy"><strong>LibraTech</strong><small>LIBRARY MANAGEMENT</small></span>
        </a>
        <nav className="landing-nav" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="landing-nav-actions">
          <button className="landing-login" onClick={() => onScreen('admin')}>Login</button>
          <button className="landing-signup" onClick={() => onScreen('reader')}>Reader access <ArrowUpRight size={14} /></button>
        </div>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <div className="landing-kicker"><i /> SMART LIBRARY MANAGEMENT</div>
          <h1>Manage your library <span className="glitch-word">smarter.</span></h1>
          <p className="landing-lede">A clear, calm workspace for your books, members, and lending desk—built around accurate records, not guesswork.</p>
          <div className="landing-hero-actions">
            <button className="landing-btn landing-btn-primary" onClick={() => onScreen('reader')}>Browse as a reader <ArrowRight size={16} /></button>
            <button className="landing-btn landing-btn-secondary" onClick={() => onScreen('admin')}><ShieldCheck size={16} /> Admin sign-in</button>
          </div>
          <div className="landing-proof"><CheckCircle2 size={16} /><span>Real titles. Counted copies. Clear circulation.</span></div>
        </div>

        <div className="landing-hero-visual" aria-label="Preview of the LibraTech library workspace">
          <div className="hero-halo" />
          <div className="dashboard-preview">
            <div className="preview-topbar">
              <div className="preview-brand-mini"><span><BookOpen size={14} /></span><strong>LibraTech <small>/ overview</small></strong></div>
              <span className="preview-state"><i /> WORKSPACE PREVIEW</span>
            </div>
            <div className="preview-body">
              <aside className="preview-rail" aria-hidden="true">
                <span className="rail-mark active"><LibraryBig size={16} /></span>
                <span className="rail-mark"><BookOpen size={16} /></span>
                <span className="rail-mark"><Users size={16} /></span>
                <span className="rail-mark"><Activity size={16} /></span>
              </aside>
              <div className="preview-content">
                <div className="preview-heading">
                  <div><span>THE LIBRARY DESK</span><h2>Everything in view.</h2></div>
                  <span className="preview-chip">REAL CATALOG</span>
                </div>
                <div className="preview-metrics">
                  <div><span>COLLECTION</span><strong>Book records</strong><small>Search and manage</small></div>
                  <div><span>INVENTORY</span><strong>Counted copies</strong><small>Availability stays honest</small></div>
                  <div><span>ACTIVITY</span><strong>Issues & returns</strong><small>Every movement recorded</small></div>
                </div>
                <div className="preview-list">
                  <div className="preview-list-head"><span>VERIFIED STARTER TITLES</span><span>ISBN EDITIONS</span></div>
                  {starterTitles.map(([title, author, year], index) => (
                    <div className="preview-book-row" key={title}>
                      <span className={`preview-book-cover cover-tone-${index}`}><BookOpen size={15} /></span>
                      <span className="preview-book-copy"><strong>{title}</strong><small>{author}</small></span>
                      <span className="preview-book-year">{year}</span>
                    </div>
                  ))}
                </div>
                <div className="preview-note"><span className="preview-note-dot" /> Physical copy counts begin at zero until staff record holdings.</div>
              </div>
            </div>
          </div>
          <div className="preview-caption"><span>Designed for clear, accountable library work</span><span>01 / 04</span></div>
        </div>
      </section>

      <div className="landing-trust-strip" aria-label="LibraTech principles">
        <div><CheckCircle2 size={17} /><span><strong>Real bibliographic records</strong><small>Verified titles and authors</small></span></div>
        <div><Activity size={17} /><span><strong>Inventory-aware lending</strong><small>Only counted copies can be issued</small></span></div>
        <div><ShieldCheck size={17} /><span><strong>Protected staff access</strong><small>Private member and circulation records</small></span></div>
      </div>

      <section className="landing-section features-section" id="features">
        <div className="section-intro">
          <div className="landing-kicker"><i /> BUILT FOR THE EVERYDAY</div>
          <h2>All the essentials.<br /><span>Nothing made up.</span></h2>
          <p>From the first catalog entry to the final return, LibraTech keeps the important details connected.</p>
        </div>
        <div className="feature-list">
          {features.map(({ icon: Icon, eyebrow, title, text }, index) => (
            <article className="feature-card" key={eyebrow}>
              <div className="feature-card-top"><span className="feature-icon"><Icon size={18} /></span><span className="feature-number">0{index + 1}</span></div>
              <span className="feature-eyebrow">{eyebrow}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-how" id="how-it-works">
        <div className="how-heading">
          <div><div className="landing-kicker"><i /> HOW IT WORKS</div><h2>Start with what’s real.</h2></div>
          <p>Set up your records, count your shelves, and let every issue and return update the same library register.</p>
        </div>
        <div className="how-steps">
          <article><span className="step-number">01</span><div><strong>Add real titles</strong><p>Use ISBN-backed book records. Starter catalog metadata never implies physical stock.</p></div></article>
          <article><span className="step-number">02</span><div><strong>Record members and copies</strong><p>Staff enter member details and count the copies actually held by the library.</p></div></article>
          <article><span className="step-number">03</span><div><strong>Issue, return, stay current</strong><p>Track due dates and returns while available quantities reconcile automatically.</p></div></article>
        </div>
      </section>

      <section className="landing-about" id="about">
        <div className="about-mark"><span><LibraryBig size={32} strokeWidth={1.4} /></span><i className="about-lightline" /></div>
        <div className="about-copy">
          <div className="landing-kicker"><i /> ABOUT LIBRATECH</div>
          <h2>Good library work starts with a record you can trust.</h2>
          <p>LibraTech brings the public catalog and staff circulation desk into one clear system. Bibliographic data stays separate from physical inventory, so a real title is never mistaken for a copy on the shelf.</p>
          <div className="about-points"><span><CheckCircle2 size={15} /> No invented holdings</span><span><CheckCircle2 size={15} /> Accurate issue and return history</span><span><CheckCircle2 size={15} /> Member records stay staff-only</span></div>
        </div>
      </section>

      <section className="landing-contact" id="contact">
        <div><div className="landing-kicker"><i /> YOUR NEXT STEP</div><h2>Choose how you want to enter.</h2><p>Browse the public collection or open the secure staff workspace.</p></div>
        <div className="contact-actions"><button className="landing-btn landing-btn-primary" onClick={() => onScreen('reader')}>Open reader catalog <ArrowRight size={16} /></button><button className="landing-btn landing-btn-secondary" onClick={() => onScreen('admin')}>Staff sign-in <ShieldCheck size={16} /></button></div>
      </section>

      <footer className="landing-footer">
        <a className="landing-brand" href="#top"><span className="landing-brand-mark"><LibraryBig size={20} strokeWidth={1.7} /><i /></span><span className="landing-brand-copy"><strong>LibraTech</strong><small>LIBRARY MANAGEMENT</small></span></a>
        <span className="landing-footer-note">A clear record for every book, member, and loan.</span>
        <div className="landing-footer-links"><a href="#features">Features</a><a href="#about">About</a><button onClick={() => onScreen('reader')}>Reader catalog</button><button onClick={() => onScreen('admin')}>Staff sign-in <ArrowUpRight size={12} /></button></div>
      </footer>
    </main>
  );
}
