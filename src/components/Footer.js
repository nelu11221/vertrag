import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { useLang } from '../context/LanguageContext';

const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          <div>
            <img src="/images/logo.svg" alt="Vertrag Plus" style={{ height: 32, marginBottom: 12 }} />
            <p className="footer-desc">{t.footer.desc}</p>
            <div className="footer-contact">
              <div className="footer-contact-row"><IconPin /> Chișinău, Grătiești, str.Prieteniei 1B</div>
              <div className="footer-contact-row"><IconPhone /> +373 69 141 398</div>
              <div className="footer-contact-row"><IconPhone /> +373 69 934 458</div>
              <div className="footer-contact-row"><IconMail /> vertrag.plus@gmail.com</div>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t.footer.produse}</h4>
            <ul>
              <li><Link to="/produse/pungi-vid">Pungi Vid</Link></li>
              <li><Link to="/produse/filme-folii">Filme & Folii</Link></li>
              <li><Link to="/produse/caserole">Caserole & Tăvițe</Link></li>
              <li><Link to="/produse/membrane">Membrane Poliamidice</Link></li>
              <li><Link to="/produse/hartie">Hârtie & Absorbante</Link></li>
              <li><Link to="/produse/echipamente">Echipamente</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t.footer.industrii}</h4>
            <ul>
              <li><Link to="/industrii/carne">Carne</Link></li>
              <li><Link to="/industrii/branzeturi">Brânzeturi</Link></li>
              <li><Link to="/industrii/congelate">Congelate</Link></li>
              <li><Link to="/industrii/panificatie">Panificație</Link></li>
              <li><Link to="/industrii/horeca">HoReCa</Link></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© {new Date().getFullYear()} Vertrag Plus. {t.footer.copy}</div>
          <div className="footer-bottom-links">
            <Link to="/despre#certificari">{t.footer.certificari}</Link>
            <Link to="/despre#contact">{t.footer.contact}</Link>
            <a href="https://anpc.ro" target="_blank" rel="noreferrer">{t.footer.protectia}</a>
            <Link to="/despre">{t.footer.faq}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}