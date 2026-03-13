import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../App.css';
import { useLang } from '../context/LanguageContext';

// ─── EmailJS config — replace with your real IDs ────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_gnklx0m';
const EMAILJS_TEMPLATE_ID = 'template_5pzo8t1';
const EMAILJS_PUBLIC_KEY  = 'eaYBP9qbOZZvDivin';
// ────────────────────────────────────────────────────────────────────────────

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

  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    formData.name,
          from_email:   formData.email,
          from_company: formData.company,
          message:      formData.message,
          reply_to:     formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

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
          <div className="despre-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '40px 0', gap: 0 }}>
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
          <div className="despre-about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="section-eyebrow">{td.storyEyebrow}</div>
              <h2 className="section-title">{td.storyTitle}</h2>
              <p style={{ color: '#666', lineHeight: 1.85, marginBottom: 18, fontSize: '0.95rem' }}>{td.storyP1}</p>
              <p style={{ color: '#666', lineHeight: 1.85, marginBottom: 18, fontSize: '0.95rem' }}>{td.storyP2}</p>
              <p style={{ color: '#666', lineHeight: 1.85, fontSize: '0.95rem' }}>{td.storyP3}</p>
            </div>
            <div style={{ background: 'linear-gradient(145deg, #131313, #0f0f0f)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '36px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="15" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9" y1="14.5" x2="15" y2="14.5"/>
                    </svg>
                  ), title: td.fact1, desc: td.fact1sub },
                { icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                  ), title: td.fact2, desc: td.fact2sub },
                { icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12h8M12 8v8"/>
                    </svg>
                  ), title: td.fact3, desc: td.fact3sub },
                { icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                  ), title: td.fact4, desc: td.fact4sub },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
                  <span style={{ color: '#e74c3c', flexShrink: 0 }}>{item.icon}</span>
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
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', marginBottom: 48, height: 320 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1829.6100339772538!2d28.827864481454114!3d47.09220192934533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1773434518094!5m2!1sru!2s"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', filter: 'grayscale(30%) invert(92%) hue-rotate(180deg) brightness(0.85) contrast(0.9)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vertrag Plus location"
            />
          </div>
          <div className="despre-contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <p style={{ color: '#666', marginBottom: 32, lineHeight: 1.75, fontSize: '0.95rem' }}>{td.contactDesc}</p>
              {[
                { icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  ), text: 'Chișinău, Grătiești, str.Prieteniei 1B' },
                { icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  ), text: '+373 69 141 398' },
                { icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  ), text: '+373 69 934 458' },
                { icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ), text: 'vertrag.plus@gmail.com' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem', color: '#888' }}>
                  <span style={{ color: '#e74c3c', flexShrink: 0 }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            <div style={{ background: 'linear-gradient(145deg, #131313, #0f0f0f)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '36px' }}>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: 24, fontSize: '1.1rem' }}>{td.formTitle}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input
                  type="text"
                  name="name"
                  placeholder={td.formName}
                  className="input"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={td.formEmail}
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="company"
                  placeholder={td.formCompany}
                  className="input"
                  value={formData.company}
                  onChange={handleChange}
                />
                <textarea
                  name="message"
                  placeholder={td.formMessage}
                  rows={4}
                  className="input"
                  style={{ resize: 'vertical' }}
                  value={formData.message}
                  onChange={handleChange}
                />

                <button
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
                  onClick={handleSubmit}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? '⏳ Se trimite...' : td.formBtn}
                </button>

                {status === 'success' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'rgba(46,213,115,0.08)', border: '1px solid rgba(46,213,115,0.25)', borderRadius: 10, color: '#2ed573', fontSize: '0.875rem', fontWeight: 500 }}>
                    ✅ {td.formSuccess || 'Mesaj trimis cu succes! Vă vom contacta în curând.'}
                  </div>
                )}

                {status === 'error' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'rgba(231,76,60,0.08)', border: '1px solid rgba(231,76,60,0.25)', borderRadius: 10, color: '#e74c3c', fontSize: '0.875rem', fontWeight: 500 }}>
                    ❌ {td.formError || 'Eroare la trimitere. Completați câmpurile obligatorii și încercați din nou.'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}