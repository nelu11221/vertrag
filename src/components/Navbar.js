import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const PRODUSE = [
  { label: 'Pungi Vid', sub: 'Ambalare în vid, conservare optimă', slug: 'pungi-vid' },
  { label: 'Filme & Folii Alimentare', sub: 'Protecție și conservare alimentară', slug: 'filme-folii' },
  { label: 'Caserole, Tăvițe, Boluri', sub: 'Ambalaje rigide pentru alimente', slug: 'caserole' },
  { label: 'Membrane Poliamidice', sub: 'Procese industriale de înaltă exigență', slug: 'membrane' },
  { label: 'Hârtie & Absorbante', sub: 'Absorb lichide, mențin prospețimea', slug: 'hartie' },
  { label: 'Rumeguș pentru Afumare', sub: 'Aromă naturală autentică', slug: 'rumegus' },
  { label: 'Echipamente de Ambalare', sub: 'Compatibile cu toată gama noastră', slug: 'echipamente' },
];

const INDUSTRII = [
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

  const isActive = (path) => location.pathname.startsWith(path);
  const toggle = (key) => setMobileExpanded(mobileExpanded === key ? null : key);

  const Dropdown = ({ items, link, label, narrow }) => (
    <div className={`dropdown${narrow ? ' narrow' : ''}`}>
      <div className={`dropdown-grid${narrow ? ' single' : ''}`}>
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
                Produse <span className="nav-arrow">▾</span>
              </span>
              <Dropdown items={PRODUSE} link="/produse" label="Toate produsele" />
            </li>
            <li className="nav-item">
              <span className={`nav-link ${isActive('/industrii') ? 'active' : ''}`}>
                Industrii <span className="nav-arrow">▾</span>
              </span>
              <Dropdown items={INDUSTRII} link="/industrii" label="Toate industriile" />
            </li>
            <li className="nav-item">
              <Link to="/despre" className={`nav-link ${isActive('/despre') ? 'active' : ''}`}>
                Despre noi
              </Link>
            </li>
          </ul>

          <div className="navbar-right">
            <Link to="/despre#contact" className="nav-cta">
              Contact Us
              <span className="nav-cta-arrow">›</span>
            </Link>
          </div>

          <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-group">
          {[
            { key: 'produse', label: 'Produse', items: PRODUSE, link: '/produse' },
            { key: 'industrii', label: 'Industrii', items: INDUSTRII, link: '/industrii' },
          ].map(({ key, label, items, link }) => (
            <div key={key}>
              <div className="mobile-nav-link" onClick={() => toggle(key)}>
                {label} <span style={{ fontSize: '0.7rem', opacity: 0.4 }}>{mobileExpanded === key ? '▴' : '▾'}</span>
              </div>
              {mobileExpanded === key && (
                <div className="mobile-sub">
                  {items.map(i => (
                    <Link key={i.slug} to={`${link}/${i.slug}`} className="mobile-sub-item" onClick={() => setMenuOpen(false)}>
                      <span className="mobile-sub-label">{i.label}</span>
                      <span className="mobile-sub-desc">{i.sub}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to="/despre" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Despre noi</Link>
        </div>
        <Link to="/despre#contact" className="mobile-cta" onClick={() => setMenuOpen(false)}>
          Contact Us <span style={{ color: '#e74c3c' }}>›</span>
        </Link>
      </div>
    </nav>
  );
}