import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          <div>
            <img src="/images/logo.svg" alt="Vertrag Plus" style={{ height: 32, marginBottom: 12 }} />
            <p className="footer-desc">
              Producător local de ambalaje cu peste 20 de ani experiență. Două fabrici proprii, mii de produse pentru industria alimentară și industrială.
            </p>
            <div className="footer-contact">
              <div className="footer-contact-row">📍 B-dul Biruinței nr. 334–336</div>
              <div className="footer-contact-row">📞 +40 755 021 000</div>
              <div className="footer-contact-row">✉️ contact@vertragplus.ro</div>
            </div>
          </div>

          <div className="footer-col">
            <h4>Produse</h4>
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
            <h4>Industrii</h4>
            <ul>
              <li><Link to="/industrii/carne">Carne</Link></li>
              <li><Link to="/industrii/branzeturi">Brânzeturi</Link></li>
              <li><Link to="/industrii/congelate">Congelate</Link></li>
              <li><Link to="/industrii/panificatie">Panificație</Link></li>
              <li><Link to="/industrii/horeca">HoReCa</Link></li>
              <li><Link to="/industrii/non-food">Non-Food</Link></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© {new Date().getFullYear()} Vertrag Plus. Toate drepturile rezervate.</div>
          <div className="footer-bottom-links">
            <Link to="/despre#certificari">Certificări</Link>
            <Link to="/despre#contact">Contact</Link>
            <a href="https://anpc.ro" target="_blank" rel="noreferrer">Protecția Consumatorilor</a>
            <Link to="/despre">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}