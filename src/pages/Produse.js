import TopProduse from '../components/TopProduse';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import useScrollAnimation from '../hooks/useScrollAnimation';

function Reveal({ children, className = 'scroll-hidden', style = {}, delay = 0 }) {
  const ref = useScrollAnimation();
  return (
    <div ref={ref} className={className} style={{ ...style, transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function Modal({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, #13141f, #0f1019)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 24,
          width: '100%',
          maxWidth: 680,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
          animation: 'fadeSlideUp 0.3s cubic-bezier(0.4,0,0.2,1)',
          position: 'relative',
        }}
      >
        {/* close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 10,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '1.1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.18s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(231,76,60,0.2)'; e.currentTarget.style.color = '#e74c3c'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
        >✕</button>

        {/* image */}
        <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
          <img
            src={item.img}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #13141f 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.4), transparent)' }} />
        </div>

        {/* content */}
        <div style={{ padding: '32px 36px 36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.2)', borderRadius: 99, marginBottom: 16 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#e74c3c', display: 'inline-block' }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e74c3c' }}>Produs disponibil</span>
          </div>

          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: '#fff', letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1.2 }}>
            {item.title}
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.92rem', lineHeight: 1.85, marginBottom: 28 }}>
            {item.desc}
          </p>

          {/* specs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
            {[
              { label: 'Disponibilitate', value: 'Stoc permanent' },
              { label: 'Livrare', value: '24–48h' },
              { label: 'Comandă minimă', value: 'La cerere' },
              { label: 'Personalizare', value: 'Disponibilă' },
            ].map((spec, i) => (
              <div key={i} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{spec.label}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{spec.value}</div>
              </div>
            ))}
          </div>

          {/* actions */}
          <div style={{ display: 'flex', gap: 10 }}>
            <Link
              to="/despre#contact"
              onClick={onClose}
              className="btn btn-red"
              style={{ flex: 1, justifyContent: 'center', borderRadius: 99 }}
            >
              Solicitați ofertă
            </Link>
            <button
              onClick={onClose}
              className="btn btn-outline"
              style={{ borderRadius: 99, padding: '13px 24px' }}
            >
              Închide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const CATEGORII = [
  {
    img: '/images/img1.jpg', title: 'Pungi Vid', slug: 'pungi-vid', tag: 'Top vânzări', filter: 'Alimentar',
    desc: 'Conservă produsele eliminând aerul și menținând un mediu sigilat. Disponibile în multiple dimensiuni și grosimi.',
    subcategorii: [
      { img: '/images/img1_1.jpg', title: 'Pungi vid netede pentru carne', desc: 'Protecție sigură și prospețime de durată.' },
      { img: '/images/img1_2.jpg', title: 'Pungi vid netede pentru brânzeturi', desc: 'Protecție sigură și prospețime de durată.' },
      { img: '/images/img1_3.jpg', title: 'Pungi vid gofrate', desc: 'Ambalaj flexibil pentru vidat acasă sau profesional.' },
      { img: '/images/img1_4.jpg', title: 'Pungi vid termocontractibile pentru carne', desc: 'Ambalaj cu efect premium pentru protecție maximă.' },
      { img: '/images/img1_5.jpg', title: 'Pungi vid termocontractibile pentru maturare cașcaval', desc: 'Ambalaj cu efect premium pentru protecție maximă.' },
      { img: '/images/img1_6.jpg', title: 'Pungi vid pentru tratamente termice', desc: 'Ambalaj cu efect premium pentru protecție maximă.' },
    ],
  },
  {
    img: '/images/img2.jpg', title: 'Filme & Folii Alimentare', slug: 'filme-folii', tag: null, filter: 'Alimentar',
    desc: 'Protejează și conservă, asigurând igienă și siguranță maximă pentru orice tip de produs alimentar.',
    subcategorii: [
      { img: '/images/img2_1.jpg', title: 'Filme flexibile', desc: 'Ambalaj inteligent pentru performanță, versatilitate și protecție optimă.' },
      { img: '/images/img2_2.jpg', title: 'Filme rigide', desc: 'Ambalaj solid pentru protecție superioară și prezentare impecabilă.' },
      { img: '/images/img2_3.jpg', title: 'Filme laminate', desc: 'Ambalaj inteligent cu protecție superioară și imagine impecabilă.' },
      { img: '/images/img2_4.jpg', title: 'Filme pentru termosudare caserole (ATM)', desc: 'Sigilare sigură și prospețime prelungită.' },
      { img: '/images/img2_5.jpg', title: 'Filme Skin', desc: 'Ambalaje premium cu protecție totală și vizibilitate maximă.' },
      { img: '/images/img2_6.jpg', title: 'Filme Flow-Pack laminate', desc: 'Ambalaj rapid, sigur și atrăgător pentru produse cu ritm intens.' },
      { img: '/images/img2_7.jpg', title: 'Filme Flow-Pack microperforate', desc: 'Ambalaj care respiră pentru prospețime naturală.' },
      { img: '/images/img2_8.jpg', title: 'Filme Flow-Pack macroperforate', desc: ' ' },
      { img: '/images/img2_9.jpg', title: 'Folii Stretch alimentare', desc: 'Ambalaj flexibil pentru prospețime și igienă zilnică.' },
      { img: '/images/img2_10.jpg', title: 'Folii Stretch pentru paletizare manuală', desc: 'Protecție eficientă, ambalare simplă.' },
      { img: '/images/img2_11.jpg', title: 'Folii Stretch pentru paletizare automată', desc: 'Performanță la viteză maximă.' },
      { img: '/images/img2_12.jpg', title: 'Folii Poliolefină termocontractibile', desc: 'Ambalaj transparent, sigur și elegant.' },
      { img: '/images/img2_13.jpg', title: 'Folii FlowVac termocontractibile', desc: 'Ambalaj de înaltă performanță pentru prospețime și protecție totală.' },
      { img: '/images/img2_14.jpg', title: 'Folii din polietilenă', desc: 'Simplitate, versatilitate și protecție pentru orice aplicație.' },
      { img: '/images/img2_15.jpg', title: 'Saci pentru navete', desc: 'Protecție igienică și practică în transportul alimentelor.' },
      { img: '/images/img2_16.jpg', title: 'Saci pentru abatorizare', desc: 'Igienă, protecție și eficiență în procesarea cărnii.' },
    ],
  },
  {
    img: '/images/img3.jpg', title: 'Caserole, Tăvițe, Boluri', slug: 'caserole', tag: null, filter: 'Alimentar',
    desc: 'Eficiente, sigure și atractive pentru orice tip de aliment. Compatibile cu linia de termoformare.',
    subcategorii: [
      { img: '/images/img3_1.jpg', title: 'Caserole PP', desc: 'Rezistență termică și versatilitate pentru ambalarea alimentelor.' },
      { img: '/images/img3_2.jpg', title: 'Caserole PET/PE', desc: 'Vizibilitate superioară și protecție eficientă pentru alimentele tale.' },
      { img: '/images/img3_3.jpg', title: 'Caserole Skin', desc: 'Ambalaj premium care pune produsul în valoare.' },
      { img: '/images/img3_4.jpg', title: 'Caserole PSE', desc: 'Ambalaj ușor, igienic și termoizolant pentru produse alimentare.' },
      { img: '/images/img3_5.jpg', title: 'Cartoane Skin', desc: 'Ambalaj sustenabil cu impact vizual puternic.' },
      { img: '/images/img3_6.jpg', title: 'Caserole Mono PET', desc: 'Ambalaj sustenabil, 100% reciclabil, cu claritate și performanță.' },
    ],
  },
  {
    img: '/images/img4.jpg', title: 'Membrane Poliamidice', slug: 'membrane', tag: null, filter: 'Industrial',
    desc: 'Eficiente, durabile, folosite în varii procese industriale și alimentare de înaltă exigență.',
    subcategorii: [
      { img: '/images/img4_1.jpg', title: 'Membrane poliamidice pentru mezeluri', desc: 'Ambalaj de înaltă performanță pentru produse din carne și nu numai.' },
      { img: '/images/img4_2.jpg', title: 'Membrane poliamidice pentru Pet Food', desc: 'Ambalaj sigur, igienic și adaptat nevoilor industriei de hrană pentru animale.' },
    ],
  },
  {
    img: '/images/img5.jpg', title: 'Hârtie & Absorbante', slug: 'hartie', tag: null, filter: 'Alimentar',
    desc: 'Mențin alimentele proaspete, absorb lichide și grăsimi. Ideal pentru carne, pește și preparate.',
    subcategorii: [
      { img: '/images/img5_1.jpg', title: 'Absorbante alimentare celulozice', desc: 'Igienă și prospețime pentru produsele alimentare proaspete.' },
      { img: '/images/img5_2.jpg', title: 'Super-absorbante alimentare', desc: 'Performanță maximă pentru produse cu exudat ridicat.' },
      { img: '/images/img5_3.jpg', title: 'Hârtie cerată / Kraft', desc: 'Protecție naturală și prezentare elegantă.' },
    ],
  },
  {
    img: '/images/img6.jpg', title: 'Rumeguș pentru Afumare', slug: 'rumegus', tag: null, filter: 'Alimentar',
    desc: 'Pentru aromă intensă și gust autentic de fum natural. Disponibil în mai multe esențe de lemn.',
    subcategorii: [
      { img: '/images/img6_1.jpg', title: 'Rumeguș pentru afumare', desc: 'Descoperă secretul aromelor autentice: rumegușul natural pentru afumare!.' },
    ],
  },
  {
    img: '/images/img7.jpg', title: 'Echipamente de Ambalare', slug: 'echipamente', tag: 'Nou', filter: 'Echipamente',
    desc: 'Performante, 100% compatibile cu gama noastră de produse. Service și suport tehnic inclus.',
    subcategorii: [
      { img: '/images/img7_1.jpg', title: 'Echipamente pentru ambalare', desc: 'Soluții inteligente pentru un proces eficient și sigur.' },
    ],
  },
];

const STATS = [
  { value: '20+', label: 'Grupe de produse' },
  { value: '2,000+', label: 'Tipuri de ambalaje' },
  { value: '20+', label: 'Ani experiență' },
  { value: '6', label: 'Piețe europene' },
];

export default function Produse() {
  const { slug } = useParams();
  const [activeFilter, setActiveFilter] = useState('Toate');
  const [selectedSub, setSelectedSub] = useState(null);
  const filtered = activeFilter === 'Toate' ? CATEGORII : CATEGORII.filter(c => c.filter === activeFilter);

  // ── SUBCATEGORY PAGE ──
  if (slug) {
    const cat = CATEGORII.find(c => c.slug === slug);
    return (
      <div>
        {/* Hero */}
        <div style={{ position: 'relative', overflow: 'hidden', background: '#0a0b14' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${cat?.img})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07, filter: 'blur(3px)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,9,20,0.97) 40%, rgba(231,76,60,0.05) 100%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.5), transparent)' }} />

          <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 32px 64px' }}>
            <div className="breadcrumb">
              <Link to="/">Acasă</Link><span className="sep">/</span>
              <Link to="/produse">Produse</Link><span className="sep">/</span>
              <span className="current">{cat?.title}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginTop: 8 }}>
              <div>
                {cat?.tag && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.25)', borderRadius: 99, marginBottom: 20 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#e74c3c', display: 'inline-block' }} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e74c3c' }}>{cat.tag}</span>
                  </div>
                )}
                <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 20 }}>
                  {cat?.title}
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 420, marginBottom: 36 }}>
                  {cat?.desc}
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>Solicitați ofertă</Link>
                  <Link to="/produse" className="btn btn-outline" style={{ borderRadius: 99 }}>← Înapoi la produse</Link>
                </div>
              </div>
              <div style={{ position: 'relative', height: 320, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                <img src={cat?.img} alt={cat?.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,9,20,0.6) 0%, transparent 60%)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories grid */}
        <section className="section" style={{ background: '#080910' }}>
          <div className="container">
            <Reveal style={{ marginBottom: 48 }}>
              <div className="section-eyebrow">Tipuri disponibile</div>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em' }}>
                Variantele de <span style={{ color: '#e74c3c' }}>{cat?.title}</span>
              </h2>
            </Reveal>

            <div className="card-grid">
              {cat?.subcategorii.map((sub, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div
                    className="card"
                    style={{ display: 'block', height: '100%', cursor: 'pointer' }}
                    onClick={() => setSelectedSub(sub)}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(231,76,60,0.3)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                  >
                    <div style={{ position: 'relative', overflow: 'hidden', height: 180, background: '#0f1019' }}>
                      <img src={sub.img} alt={sub.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,11,20,0.7) 0%, transparent 50%)' }} />
                    </div>
                    <div className="card-body">
                      <div className="card-title" style={{ fontSize: '0.95rem', marginBottom: 8 }}>{sub.title}</div>
                      <div className="card-desc" style={{ fontSize: '0.82rem' }}>{sub.desc}</div>
                      <div style={{ marginTop: 16, fontSize: '0.78rem', color: '#e74c3c', fontWeight: 600 }}>
                        Vezi detalii →
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* CTA */}
            <Reveal style={{ marginTop: 48 }}>
              <div style={{ background: 'linear-gradient(135deg, #0f1019, #0c0d16)', border: '1px solid rgba(231,76,60,0.2)', borderRadius: 20, padding: '40px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.5), transparent)' }} />
                <div>
                  <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.6rem', fontWeight: 400, color: '#fff', marginBottom: 8 }}>
                    Nu găsiți varianta potrivită?
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                    Producem și la comandă după specificațiile dumneavoastră.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>Contactați-ne</Link>
                  <Link to="/produse" className="btn btn-outline" style={{ borderRadius: 99 }}>Toate produsele</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Modal */}
        {selectedSub && <Modal item={selectedSub} onClose={() => setSelectedSub(null)} />}
      </div>
    );
  }

  // ── MAIN LISTING PAGE ──
  return (
    <div>

      {/* ════════════ PAGE HERO ════════════ */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#0a0b14' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/img1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08, filter: 'blur(2px)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,9,20,0.97) 40%, rgba(231,76,60,0.06) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.5), transparent)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 32px 64px' }}>
          <div className="breadcrumb">
            <Link to="/">Acasă</Link>
            <span className="sep">/</span>
            <span className="current">Produse</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="section-eyebrow">Gama completă</div>
              <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 20 }}>
                Toate<br /><span style={{ color: '#e74c3c' }}>produsele</span> noastre
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 420, marginBottom: 36 }}>
                Mii de tipuri de pungi, filme și ambalaje flexibile, grupate în aproximativ 20 de grupe de produse.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>Solicitați ofertă</Link>
                <Link to="/industrii" className="btn btn-outline" style={{ borderRadius: 99 }}>Pe industrii →</Link>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ padding: '24px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(231,76,60,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '2.2rem', color: 'transparent', backgroundImage: 'linear-gradient(135deg, #e74c3c, #ff7060)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ GRID ════════════ */}
      <section className="section" style={{ background: '#080910' }}>
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>{filtered.length}</span> categorii disponibile
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Toate', 'Alimentar', 'Industrial', 'Echipamente'].map((f) => (
                  <button key={f} onClick={() => setActiveFilter(f)} style={{
                    padding: '7px 16px', borderRadius: 99,
                    border: `1px solid ${activeFilter === f ? 'rgba(231,76,60,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    background: activeFilter === f ? 'rgba(231,76,60,0.1)' : 'transparent',
                    color: activeFilter === f ? '#e74c3c' : 'rgba(255,255,255,0.4)',
                    fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.18s',
                  }}>{f}</button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="card-grid">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <Link to={`/produse/${p.slug}`} className="card" style={{ display: 'block', height: '100%' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: 200, background: '#0f1019' }}>
                    <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,11,20,0.7) 0%, transparent 50%)' }} />
                    {p.tag && (
                      <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 10px', background: 'rgba(231,76,60,0.9)', borderRadius: 99, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff' }}>{p.tag}</div>
                    )}
                    <div style={{ position: 'absolute', bottom: 12, left: 12, padding: '3px 10px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', borderRadius: 99, fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {p.subcategorii.length} tipuri
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-title" style={{ fontSize: '1rem', marginBottom: 10 }}>{p.title}</div>
                    <div className="card-desc">{p.desc}</div>
                    <div style={{ marginTop: 18, fontSize: '0.78rem', color: '#e74c3c', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                      Vezi tipurile <span>→</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TopProduse />

      {/* ════════════ CTA STRIP ════════════ */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <section className="section" style={{ background: '#0a0b14' }}>
          <div className="container">
            <Reveal className="scroll-hidden-scale">
              <div style={{ background: 'linear-gradient(135deg, #0f1019, #0c0d16)', border: '1px solid rgba(231,76,60,0.2)', borderRadius: 20, padding: '52px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 40, flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.5), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: 200, height: 200, background: 'radial-gradient(circle, rgba(231,76,60,0.08), transparent 70%)', pointerEvents: 'none' }} />
                <div>
                  <div className="section-eyebrow">Colaborare</div>
                  <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: '#fff', letterSpacing: '-0.03em', marginBottom: 8 }}>
                    Nu găsiți ce căutați?
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.88rem', maxWidth: 380, lineHeight: 1.7 }}>
                    Contactați-ne pentru o ofertă personalizată. Producem și la comandă în funcție de specificațiile dumneavoastră.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>Contactați-ne</Link>
                  <Link to="/despre" className="btn btn-outline" style={{ borderRadius: 99 }}>Despre noi</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>

    </div>
  );
}