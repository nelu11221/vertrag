import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useLang } from '../context/LanguageContext';

const MARKETS = [
  { flag: '🇷🇴', name: 'România' },
  { flag: '🇬🇷', name: 'Grecia' },
  { flag: '🇩🇪', name: 'Germania' },
  { flag: '🇪🇸', name: 'Spania' },
  { flag: '🇫🇷', name: 'Franța' },
  { flag: '🇵🇱', name: 'Polonia' },
];

const CERTS = ['ISO 9001:2015', 'ISO 22000', 'BRC Packaging', 'FSSC 22000'];

export default function Despre() {
  const { t } = useLang();
  const td = t.despre;

  const STATS = [
    { value: '20+', label: td.statYears },
    { value: '2',   label: td.statFactories },
    { value: '20+', label: td.statGroups },
    { value: '6',   label: td.statMarkets },
  ];

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">{td.breadHome}</Link>
            <span className="sep">/</span>
            <span className="current">{td.title}</span>
          </div>
          <h1>{td.title}</h1>
          <p>{td.subtitle}</p>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: '#0e0e0e', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '40px 0', gap: 0 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '12px 16px', borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
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
              <div className="section-eyebrow">{td.storyEyebrow}</div>
              <h2 className="section-title">{td.storyTitle}</h2>
              <p style={{ color: '#666', lineHeight: 1.85, marginBottom: 18, fontSize: '0.95rem' }}>{td.storyP1}</p>
              <p style={{ color: '#666', lineHeight: 1.85, marginBottom: 18, fontSize: '0.95rem' }}>{td.storyP2}</p>
              <p style={{ color: '#666', lineHeight: 1.85, fontSize: '0.95rem' }}>{td.storyP3}</p>
            </div>
            <div style={{ background: 'linear-gradient(145deg, #131313, #0f0f0f)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '36px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '🏭', title: td.fact1, desc: td.fact1sub },
                { icon: '📦', title: td.fact2, desc: td.fact2sub },
                { icon: '🥩', title: td.fact3, desc: td.fact3sub },
                { icon: '🚗', title: td.fact4, desc: td.fact4sub },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
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
          <div className="section-eyebrow">{td.marketsEyebrow}</div>
          <h2 className="section-title">{td.marketsTitle}</h2>
          <p className="section-subtitle">{td.marketsSubtitle}</p>
          <div className="card-grid">
            {MARKETS.map((m, i) => (
              <div key={i} className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: '2.5rem' }}>{m.flag}</span>
                <div>
                  <div className="card-title">{m.name}</div>
                  <div className="card-desc">{i === 0 ? td.marketMain : td.marketExport}</div>
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
          <div className="section-eyebrow">{td.certsEyebrow}</div>
          <h2 className="section-title">{td.certsTitle}</h2>
          <p className="section-subtitle">{td.certsSubtitle}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 8 }}>
            {CERTS.map((c, i) => (
              <div key={i} style={{ padding: '14px 28px', background: 'rgba(231,76,60,0.06)', border: '1px solid rgba(231,76,60,0.25)', borderRadius: 10, color: '#e74c3c', fontWeight: 700, fontSize: '0.9rem' }}>{c}</div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Contact */}
      <section className="section" id="contact">
        <div className="container">
          <div className="section-eyebrow">{td.contactEyebrow}</div>
          <h2 className="section-title">{td.contactTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <p style={{ color: '#666', marginBottom: 32, lineHeight: 1.75, fontSize: '0.95rem' }}>{td.contactDesc}</p>
              {[
                { icon: '📍', text: 'B-dul Biruinței nr. 334–336' },
                { icon: '📞', text: '+40 755 021 000' },
                { icon: '✉️', text: 'contact@vertragplus.ro' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem', color: '#888' }}>
                  <span style={{ fontSize: '1.1rem', width: 24 }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
            <div style={{ background: 'linear-gradient(145deg, #131313, #0f0f0f)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '36px' }}>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: 24, fontSize: '1.1rem' }}>{td.formTitle}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input type="text" placeholder={td.formName} className="input" />
                <input type="email" placeholder={td.formEmail} className="input" />
                <input type="text" placeholder={td.formCompany} className="input" />
                <textarea placeholder={td.formMessage} rows={4} className="input" style={{ resize: 'vertical' }} />
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>{td.formBtn}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}