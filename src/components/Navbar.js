import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useLang } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const PRODUSE_SLUGS = [
  { label: 'Pungi Vid', sub: 'Ambalare în vid, conservare optimă', slug: 'pungi-vid' },
  { label: 'Filme & Folii Alimentare', sub: 'Protecție și conservare alimentară', slug: 'filme-folii' },
  { label: 'Caserole, Tăvițe, Boluri', sub: 'Ambalaje rigide pentru alimente', slug: 'caserole' },
  { label: 'Membrane Poliamidice', sub: 'Procese industriale de înaltă exigență', slug: 'membrane' },
  { label: 'Hârtie & Absorbante', sub: 'Absorb lichide, mențin prospețimea', slug: 'hartie' },
  { label: 'Rumeguș pentru Afumare', sub: 'Aromă naturală autentică', slug: 'rumegus' },
  { label: 'Echipamente de Ambalare', sub: 'Compatibile cu toată gama noastră', slug: 'echipamente' },
];

const INDUSTRII_SLUGS = [
  { label: 'Carne', sub: 'Vacuum & termocontractibil', slug: 'carne' },
  { label: 'Brânzeturi', sub: 'Maturare & ambalare', slug: 'branzeturi' },
  { label: 'Congelate', sub: 'Rezistență la temperaturi joase', slug: 'congelate' },
  { label: 'Panificație & Cofetărie', sub: 'Flow-pack & folii termosudabile', slug: 'panificatie' },
  { label: 'HoReCa & Catering', sub: 'Porționare și prezentare premium', slug: 'horeca' },
  { label: 'Non-Food & Auto', sub: 'Industrie & automotive', slug: 'non-food' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const { t } = useLang();

  useEffect(() => {
    setMenuOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (path) => location.pathname.startsWith(path);
  const toggle = (key) => setMobileExpanded(mobileExpanded === key ? null : key);

  const Dropdown = ({ items, link, label }) => (
    <div className="dropdown">
      <div className="dropdown-grid">
        {items.map(item => (
          <Link key={item.slug} to={`${link}/${item.slug}`} className="dropdown-item" onClick={() => setMenuOpen(false)}>
            <span className="dd-label">{item.label}</span>
            <span className="dd-sub">{item.sub}</span>
          </Link>
        ))}
      </div>
      <div className="dropdown-footer-row">
        <Link to={link} className="dropdown-all-link" onClick={() => setMenuOpen(false)}>
          {label} <span>→</span>
        </Link>
      </div>
    </div>
  );

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <img src="/images/logo.svg" alt="Vertrag Plus" style={{ height: 36 }} />
          </Link>

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

          <div className="navbar-right">
            <LanguageSwitcher />
            <Link to="/despre#contact" className="nav-cta">
              {t.nav.contact}
              <span className="nav-cta-arrow">›</span>
            </Link>
          </div>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-overlay-inner">

          <div className="mobile-overlay-header">
            <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
              <img src="/images/logo.svg" alt="Vertrag Plus" style={{ height: 32 }} />
            </Link>
            <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
          </div>

          <div className="mobile-nav-items">

            <div className="mobile-accordion">
              <button className="mobile-accordion-trigger" onClick={() => toggle('produse')}>
                <span>{t.nav.produse}</span>
                <span className={`mobile-accordion-arrow ${mobileExpanded === 'produse' ? 'open' : ''}`}>›</span>
              </button>
              {mobileExpanded === 'produse' && (
                <div className="mobile-accordion-body">
                  {PRODUSE_SLUGS.map(item => (
                    <Link key={item.slug} to={`/produse/${item.slug}`} className="mobile-sub-link" onClick={() => setMenuOpen(false)}>
                      <span className="mobile-sub-link-label">{item.label}</span>
                      <span className="mobile-sub-link-sub">{item.sub}</span>
                    </Link>
                  ))}
                  <Link to="/produse" className="mobile-see-all" onClick={() => setMenuOpen(false)}>
                    {t.nav.toateProdusele} →
                  </Link>
                </div>
              )}
            </div>

            <div className="mobile-accordion">
              <button className="mobile-accordion-trigger" onClick={() => toggle('industrii')}>
                <span>{t.nav.industrii}</span>
                <span className={`mobile-accordion-arrow ${mobileExpanded === 'industrii' ? 'open' : ''}`}>›</span>
              </button>
              {mobileExpanded === 'industrii' && (
                <div className="mobile-accordion-body">
                  {INDUSTRII_SLUGS.map(item => (
                    <Link key={item.slug} to={`/industrii/${item.slug}`} className="mobile-sub-link" onClick={() => setMenuOpen(false)}>
                      <span className="mobile-sub-link-label">{item.label}</span>
                      <span className="mobile-sub-link-sub">{item.sub}</span>
                    </Link>
                  ))}
                  <Link to="/industrii" className="mobile-see-all" onClick={() => setMenuOpen(false)}>
                    {t.nav.toateIndustriile} →
                  </Link>
                </div>
              )}
            </div>

            <Link to="/despre" className="mobile-main-link" onClick={() => setMenuOpen(false)}>
              {t.nav.despre}
            </Link>

          </div>

          <div className="mobile-overlay-footer">
            <div style={{ marginBottom: 16 }}>
              <LanguageSwitcher />
            </div>
            <Link
              to="/despre#contact"
              className="btn btn-red"
              style={{ width: '100%', justifyContent: 'center', borderRadius: 99, fontSize: '0.95rem', padding: '15px 24px' }}
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.contact} ›
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}