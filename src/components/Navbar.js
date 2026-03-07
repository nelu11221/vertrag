import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useLang } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const PRODUSE_SLUGS = [
  { label: 'Pungi Vid',               sub: 'Ambalare în vid, conservare optimă',          slug: 'pungi-vid'    },
  { label: 'Filme & Folii Alimentare', sub: 'Protecție și conservare alimentară',          slug: 'filme-folii'  },
  { label: 'Caserole, Tăvițe, Boluri', sub: 'Ambalaje rigide pentru alimente',             slug: 'caserole'     },
  { label: 'Membrane Poliamidice',     sub: 'Procese industriale de înaltă exigență',      slug: 'membrane'     },
  { label: 'Hârtie & Absorbante',      sub: 'Absorb lichide, mențin prospețimea',          slug: 'hartie'       },
  { label: 'Rumeguș pentru Afumare',   sub: 'Aromă naturală autentică',                    slug: 'rumegus'      },
  { label: 'Echipamente de Ambalare',  sub: 'Compatibile cu toată gama noastră',           slug: 'echipamente'  },
];

const INDUSTRII_SLUGS = [
  { label: 'Carne',                   sub: 'Vacuum & termocontractibil',                  slug: 'carne'        },
  { label: 'Brânzeturi',              sub: 'Maturare & ambalare',                         slug: 'branzeturi'   },
  { label: 'Congelate',               sub: 'Rezistență la temperaturi joase',             slug: 'congelate'    },
  { label: 'Panificație & Cofetărie', sub: 'Flow-pack & folii termosudabile',             slug: 'panificatie'  },
  { label: 'HoReCa & Catering',       sub: 'Porționare și prezentare premium',            slug: 'horeca'       },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded]   = useState(null);
  const location = useLocation();
  const { t } = useLang();

  // Close on navigation
  useEffect(() => {
    setMenuOpen(false);
    setExpanded(null);
  }, [location.pathname]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (path) => location.pathname.startsWith(path);
  const toggle   = (key)  => setExpanded(expanded === key ? null : key);
  const close    = ()     => setMenuOpen(false);

  /* Desktop dropdown */
  const Dropdown = ({ items, link, label }) => (
    <div className="dropdown">
      <div className="dropdown-grid">
        {items.map(item => (
          <Link key={item.slug} to={`${link}/${item.slug}`} className="dropdown-item" onClick={close}>
            <span className="dd-label">{item.label}</span>
            <span className="dd-sub">{item.sub}</span>
          </Link>
        ))}
      </div>
      <div className="dropdown-footer-row">
        <Link to={link} className="dropdown-all-link" onClick={close}>
          {label} <span>→</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-inner">

            {/* Logo */}
            <Link to="/" className="navbar-logo">
              <img src="/images/logo.svg" alt="Vertrag Plus" style={{ height: 36 }} />
            </Link>

            {/* Desktop links */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <span className={`nav-link ${isActive('/produse') ? 'active' : ''}`}>
                  {t.nav.produse} <span className="nav-arrow">▾</span>
                </span>
                <Dropdown items={PRODUSE_SLUGS} link="/produse" label={t.nav.toateProdusele} />
              </li>
              <li className="nav-item">
                <span className={`nav-link ${isActive('/industrii') ? 'active' : ''}`}>
                  {t.nav.industrii} <span className="nav-arrow">▾</span>
                </span>
                <Dropdown items={INDUSTRII_SLUGS} link="/industrii" label={t.nav.toateIndustriile} />
              </li>
              <li className="nav-item">
                <Link to="/despre" className={`nav-link ${isActive('/despre') ? 'active' : ''}`}>
                  {t.nav.despre}
                </Link>
              </li>
            </ul>

            {/* Desktop right */}
            <div className="navbar-right">
              <LanguageSwitcher />
              <Link to="/despre#contact" className="nav-cta">
                {t.nav.contact}
                <span className="nav-cta-arrow">›</span>
              </Link>
            </div>

            {/* Hamburger — mobile only */}
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span />
              <span />
              <span />
            </button>

          </div>
        </div>
      </nav>

      {/* ── Mobile overlay (separate from navbar in DOM) ── */}
      <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-overlay-inner">

          {/* Header row */}
          <div className="mobile-overlay-header">
            <Link to="/" className="navbar-logo" onClick={close}>
              <img src="/images/logo.svg" alt="Vertrag Plus" style={{ height: 32 }} />
            </Link>
            <button className="mobile-close" onClick={close} aria-label="Close menu">✕</button>
          </div>

          {/* Nav items */}
          <div className="mobile-nav-items">

            {/* Produse */}
            <div className="mobile-accordion">
              <button className="mobile-accordion-trigger" onClick={() => toggle('produse')}>
                <span>{t.nav.produse}</span>
                <span className={`mobile-accordion-arrow ${expanded === 'produse' ? 'open' : ''}`}>›</span>
              </button>
              {expanded === 'produse' && (
                <div className="mobile-accordion-body">
                  {PRODUSE_SLUGS.map(item => (
                    <Link key={item.slug} to={`/produse/${item.slug}`} className="mobile-sub-link" onClick={close}>
                      <span className="mobile-sub-link-label">{item.label}</span>
                      <span className="mobile-sub-link-sub">{item.sub}</span>
                    </Link>
                  ))}
                  <Link to="/produse" className="mobile-see-all" onClick={close}>
                    {t.nav.toateProdusele} →
                  </Link>
                </div>
              )}
            </div>

            {/* Industrii */}
            <div className="mobile-accordion">
              <button className="mobile-accordion-trigger" onClick={() => toggle('industrii')}>
                <span>{t.nav.industrii}</span>
                <span className={`mobile-accordion-arrow ${expanded === 'industrii' ? 'open' : ''}`}>›</span>
              </button>
              {expanded === 'industrii' && (
                <div className="mobile-accordion-body">
                  {INDUSTRII_SLUGS.map(item => (
                    <Link key={item.slug} to={`/industrii/${item.slug}`} className="mobile-sub-link" onClick={close}>
                      <span className="mobile-sub-link-label">{item.label}</span>
                      <span className="mobile-sub-link-sub">{item.sub}</span>
                    </Link>
                  ))}
                  <Link to="/industrii" className="mobile-see-all" onClick={close}>
                    {t.nav.toateIndustriile} →
                  </Link>
                </div>
              )}
            </div>

            {/* Despre */}
            <Link to="/despre" className="mobile-main-link" onClick={close}>
              {t.nav.despre}
            </Link>

          </div>

          {/* Footer */}
          <div className="mobile-overlay-footer">
            <div style={{ marginBottom: 16 }}>
              <LanguageSwitcher />
            </div>
            <Link
              to="/despre#contact"
              className="btn btn-red"
              style={{ width: '100%', justifyContent: 'center', borderRadius: 99, fontSize: '0.95rem', padding: '15px 24px' }}
              onClick={close}
            >
              {t.nav.contact} ›
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}