import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const STATS = [
  { value: '20+', label: 'Ani de experiență' },
  { value: '2', label: 'Fabrici proprii' },
  { value: '20+', label: 'Grupe de produse' },
  { value: '6', label: 'Piețe europene' },
];

const MARKETS = [
  { flag: '🇷🇴', name: 'România', desc: 'Piața principală' },
  { flag: '🇬🇷', name: 'Grecia', desc: 'Export activ' },
  { flag: '🇩🇪', name: 'Germania', desc: 'Export activ' },
  { flag: '🇪🇸', name: 'Spania', desc: 'Export activ' },
  { flag: '🇫🇷', name: 'Franța', desc: 'Export activ' },
  { flag: '🇵🇱', name: 'Polonia', desc: 'Export activ' },
];

const CERTS = ['ISO 9001:2015', 'ISO 22000', 'BRC Packaging', 'FSSC 22000'];

export default function Despre() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Acasă</Link>
            <span className="sep">/</span>
            <span className="current">Despre noi</span>
          </div>
          <h1>Despre Vertrag Plus</h1>
          <p>Unul dintre cei mai mari producători locali de ambalaje, cu peste 20 de ani de experiență și prezență pe 6 piețe europene.</p>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: '#0e0e0e', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '40px 0', gap: 0 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '12px 16px',
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#e74c3c', letterSpacing: '-0.03em', marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: '0.82rem', color: '#555' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="section-eyebrow">Povestea noastră</div>
              <h2 className="section-title">Producție locală de calitate europeană</h2>
              <p style={{ color: '#666', lineHeight: 1.85, marginBottom: 18, fontSize: '0.95rem' }}>
                Cu peste 20 de ani de experiență în producția de ambalaje, Vertrag Plus produce în cele două fabrici proprii și comercializează mii de tipuri de pungi, filme și ambalaje flexibile, grupate în aproximativ 20 de grupe de produse.
              </p>
              <p style={{ color: '#666', lineHeight: 1.85, marginBottom: 18, fontSize: '0.95rem' }}>
                Produsele sunt destinate în principal sectorului alimentar, dar și operatorilor din domeniile tehnologic și industrial, cum ar fi industria auto.
              </p>
              <p style={{ color: '#666', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Pe lângă piața locală, exportăm întreaga gamă de ambalaje pe piețele din Grecia, Germania, Spania, Franța și Polonia.
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(145deg, #131313, #0f0f0f)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16,
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}>
              {[
                { icon: '🏭', title: '2 Fabrici proprii', desc: 'Producție internă controlată' },
                { icon: '📦', title: 'Mii de produse', desc: '~20 grupe de produse' },
                { icon: '🥩', title: 'Sector alimentar', desc: 'Focus principal' },
                { icon: '🚗', title: 'Industrie auto', desc: 'Sector secundar' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10,
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>{item.title}</div>
                    <div style={{ fontSize: '0.78rem', color: '#555' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Markets */}
      <section className="section">
        <div className="container">
          <div className="section-eyebrow">Prezență internațională</div>
          <h2 className="section-title">Piețe de desfacere</h2>
          <p className="section-subtitle">Exportăm întreaga gamă de ambalaje pe piețele europene cheie.</p>
          <div className="card-grid">
            {MARKETS.map((m, i) => (
              <div key={i} className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: '2.5rem' }}>{m.flag}</span>
                <div>
                  <div className="card-title">{m.name}</div>
                  <div className="card-desc">{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Certifications */}
      <section className="section" id="certificari">
        <div className="container">
          <div className="section-eyebrow">Calitate garantată</div>
          <h2 className="section-title">Certificări</h2>
          <p className="section-subtitle">Standarde internaționale care garantează calitatea și siguranța produselor noastre.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 8 }}>
            {CERTS.map((c, i) => (
              <div key={i} style={{
                padding: '14px 28px',
                background: 'rgba(231,76,60,0.06)',
                border: '1px solid rgba(231,76,60,0.25)',
                borderRadius: 10,
                color: '#e74c3c',
                fontWeight: 700,
                fontSize: '0.9rem',
              }}>{c}</div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Contact */}
      <section className="section" id="contact">
        <div className="container">
          <div className="section-eyebrow">Luați legătura</div>
          <h2 className="section-title">Contact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <p style={{ color: '#666', marginBottom: 32, lineHeight: 1.75, fontSize: '0.95rem' }}>
                Suntem disponibili de Luni până Vineri, între orele 08:00 – 17:00. Nu ezitați să ne contactați pentru orice întrebare legată de produsele sau serviciile noastre.
              </p>
              {[
                { icon: '📍', text: 'B-dul Biruinței nr. 334–336' },
                { icon: '📞', text: '+40 755 021 000' },
                { icon: '✉️', text: 'contact@vertragplus.ro' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  fontSize: '0.9rem', color: '#888',
                }}>
                  <span style={{ fontSize: '1.1rem', width: 24 }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
            <div style={{
              background: 'linear-gradient(145deg, #131313, #0f0f0f)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16,
              padding: '36px',
            }}>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: 24, fontSize: '1.1rem' }}>Trimiteți un mesaj</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input type="text" placeholder="Nume complet" className="input" />
                <input type="email" placeholder="Adresa de email" className="input" />
                <input type="text" placeholder="Companie (opțional)" className="input" />
                <textarea placeholder="Mesajul dumneavoastră..." rows={4} className="input" style={{ resize: 'vertical' }} />
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Trimite mesajul →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}