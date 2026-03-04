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

        <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
          <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #13141f 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.4), transparent)' }} />
        </div>

        <div style={{ padding: '32px 36px 36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.2)', borderRadius: 99, marginBottom: 16 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#e74c3c', display: 'inline-block' }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e74c3c' }}>Tehnologie disponibilă</span>
          </div>

          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: '#fff', letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1.2 }}>
            {item.title}
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.92rem', lineHeight: 1.85, marginBottom: 28 }}>
            {item.desc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
            {[
              { label: 'Disponibilitate', value: 'Stoc permanent' },
              { label: 'Consultanță', value: 'Gratuită' },
              { label: 'Compatibilitate', value: 'Toate produsele' },
              { label: 'Personalizare', value: 'Disponibilă' },
            ].map((spec, i) => (
              <div key={i} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{spec.label}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{spec.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/despre#contact" onClick={onClose} className="btn btn-red" style={{ flex: 1, justifyContent: 'center', borderRadius: 99 }}>
              Solicitați ofertă
            </Link>
            <button onClick={onClose} className="btn btn-outline" style={{ borderRadius: 99, padding: '13px 24px' }}>
              Închide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ALL = [
  {
    img: '/images/app1.jpg', title: 'Vacuum', slug: 'vacuum', tag: 'Popular', filter: 'Conservare',
    desc: 'Ambalarea în vid elimină aerul din ambalaj, prelungind durata de viață a produselor și prevenind oxidarea.',
    subcategorii: [
      { img: '/images/app1.jpg', title: 'Vacuum Simplu', desc: 'Evacuarea aerului din ambalaj fără adăugarea altor gaze. Ideal pentru carne, brânzeturi și mezeluri.' },
      { img: '/images/app1.jpg', title: 'Vacuum cu Gaz Inert', desc: 'Combinație vacuum + gaz inert (N₂) pentru produse sensibile la presiune.' },
      { img: '/images/app1.jpg', title: 'Vacuum Skin', desc: 'Filmul se mulează perfect pe produs în vid, oferind prezentare premium și protecție superioară.' },
      { img: '/images/app1.jpg', title: 'Vacuum Termic', desc: 'Vacuumare combinată cu tratament termic pentru produse pasteurizate sau sterilizate.' },
    ],
  },
  {
    img: '/images/app2.jpg', title: 'Flow Pack', slug: 'flow-pack', tag: null, filter: 'Automat',
    desc: 'Ambalare continuă în folie flexibilă, ideală pentru produse de panificație, cofetărie și snack-uri.',
    subcategorii: [
      { img: '/images/app2.jpg', title: 'Flow Pack Orizontal', desc: 'Ambalare orizontală continuă pentru produse solide cu forme regulate. Viteză ridicată de producție.' },
      { img: '/images/app2.jpg', title: 'Flow Pack Vertical', desc: 'Ideal pentru produse pulverulente, granulate sau lichide. Formare pungă din rolă.' },
      { img: '/images/app2.jpg', title: 'Flow Pack cu Atmosferă Modificată', desc: 'Combinație flow-pack cu injectare gaze pentru durată de valabilitate extinsă.' },
      { img: '/images/app2.jpg', title: 'Flow Pack Multistrat', desc: 'Filme laminate cu barieră ridicată pentru produse sensibile la oxigen și umiditate.' },
    ],
  },
  {
    img: '/images/app3.jpg', title: 'Atmosferă Protectoare (ATM)', slug: 'atm', tag: null, filter: 'Conservare',
    desc: 'Înlocuirea aerului cu un amestec de gaze protective pentru conservarea optimă a produselor proaspete.',
    subcategorii: [
      { img: '/images/app3.jpg', title: 'MAP pentru Carne', desc: 'Amestec O₂/CO₂/N₂ optimizat pentru conservarea culorii și prospețimii cărnii roșii.' },
      { img: '/images/app3.jpg', title: 'MAP pentru Produse de Panificație', desc: 'CO₂ și N₂ pentru prevenirea mucegaiului și prelungirea duratei de valabilitate.' },
      { img: '/images/app3.jpg', title: 'MAP pentru Brânzeturi', desc: 'Atmosferă controlată pentru maturare uniformă și prevenirea oxidării.' },
      { img: '/images/app3.jpg', title: 'MAP pentru Fructe & Legume', desc: 'Atmosferă adaptată pentru respirația produselor vegetale proaspete.' },
    ],
  },
  {
    img: '/images/app4.jpg', title: 'Skin', slug: 'skin', tag: null, filter: 'Prezentare',
    desc: 'Filmul se mulează perfect pe produs, oferind o prezentare premium și protecție superioară.',
    subcategorii: [
      { img: '/images/app4.jpg', title: 'Skin pe Carton', desc: 'Film skin aplicat pe suport cartonat pentru prezentare elegantă la raft.' },
      { img: '/images/app4.jpg', title: 'Skin pe Casoletă', desc: 'Sigilare skin pe caserole rigide pentru o combinație perfectă de prezentare și protecție.' },
      { img: '/images/app4.jpg', title: 'Skin Transparent', desc: 'Vizibilitate maximă a produsului cu protecție completă și durată de valabilitate extinsă.' },
      { img: '/images/app4.jpg', title: 'Skin cu Vacuum', desc: 'Combinație skin + vacuum pentru aderență perfectă și eliminarea totală a aerului.' },
    ],
  },
  {
    img: '/images/app5.jpg', title: 'Stretch', slug: 'stretch', tag: null, filter: 'Prezentare',
    desc: 'Ambalare prin întindere, ideală pentru produse cu forme neregulate. Simplă și eficientă.',
    subcategorii: [
      { img: '/images/app5.jpg', title: 'Stretch Manual', desc: 'Folii stretch pentru ambalare manuală rapidă. Ideal pentru volume mici și medii.' },
      { img: '/images/app5.jpg', title: 'Stretch Automat', desc: 'Folii compatibile cu mașini automate de stretch pentru productivitate ridicată.' },
      { img: '/images/app5.jpg', title: 'Stretch cu Barieră', desc: 'Proprietăți de barieră superioare pentru produse sensibile la oxigen.' },
      { img: '/images/app5.jpg', title: 'Stretch Antibrumă', desc: 'Tratament anti-aburire pentru vizibilitate perfectă a produsului la temperaturi scăzute.' },
    ],
  },
  {
    img: '/images/app6.jpg', title: 'Termocontracție', slug: 'termocontractie', tag: null, filter: 'Automat',
    desc: 'Folia se contractă sub acțiunea căldurii, adaptându-se perfect formei produsului.',
    subcategorii: [
      { img: '/images/app6.jpg', title: 'Termocontracție pentru Carne', desc: 'Membrane și pungi termocontractibile pentru cârnați, mezeluri și produse afumate.' },
      { img: '/images/app6.jpg', title: 'Termocontracție pentru Brânzeturi', desc: 'Folii care se contractă uniform pentru ambalarea roților și blocurilor de brânză.' },
      { img: '/images/app6.jpg', title: 'Termocontracție Colectivă', desc: 'Gruparea mai multor produse sub un film contractibil comun pentru transport și display.' },
      { img: '/images/app6.jpg', title: 'Termocontracție Transparentă', desc: 'Vizibilitate maximă după contracție pentru prezentare atractivă la raft.' },
    ],
  },
  {
    img: '/images/app7.jpg', title: 'Alte Aplicații', slug: 'alte-aplicatii', tag: null, filter: 'Specializat',
    desc: 'Soluții personalizate pentru nevoi specifice de ambalare. Consultanță tehnică specializată.',
    subcategorii: [
      { img: '/images/app7.jpg', title: 'Termoformare', desc: 'Formarea ambalajului direct din rolă de film pe linia de producție.' },
      { img: '/images/app7.jpg', title: 'Retortare', desc: 'Ambalaje rezistente la sterilizare în autoclavă pentru conserve și produse cu durată lungă.' },
      { img: '/images/app7.jpg', title: 'Sous-Vide', desc: 'Pungi speciale pentru gătire în vacuum la temperaturi controlate.' },
      { img: '/images/app7.jpg', title: 'Ambalare Aseptică', desc: 'Soluții sterile pentru produse lactate lichide, sucuri și produse fără conservanți.' },
    ],
  },
];

const STATS = [
  { value: '7+', label: 'Tehnologii de ambalare' },
  { value: '20+', label: 'Ani experiență' },
  { value: '2,000+', label: 'Tipuri de ambalaje' },
  { value: '6', label: 'Piețe europene' },
];

export default function Aplicatii() {
  const { slug } = useParams();
  const [activeFilter, setActiveFilter] = useState('Toate');
  const [selectedSub, setSelectedSub] = useState(null);
  const filtered = activeFilter === 'Toate' ? ALL : ALL.filter(a => a.filter === activeFilter);
  const item = slug ? ALL.find(a => a.slug === slug) : null;

  // ── SUBCATEGORY PAGE ──
  if (item) {
    return (
      <div>
        <div style={{ position: 'relative', overflow: 'hidden', background: '#0a0b14' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07, filter: 'blur(3px)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,9,20,0.97) 40%, rgba(231,76,60,0.05) 100%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.5), transparent)' }} />

          <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 32px 64px' }}>
            <div className="breadcrumb">
              <Link to="/">Acasă</Link><span className="sep">/</span>
              <Link to="/aplicatii">Aplicații</Link><span className="sep">/</span>
              <span className="current">{item.title}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginTop: 8 }}>
              <div>
                {item.tag && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.25)', borderRadius: 99, marginBottom: 20 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#e74c3c', display: 'inline-block' }} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e74c3c' }}>{item.tag}</span>
                  </div>
                )}
                <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 20 }}>
                  {item.title}
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 420, marginBottom: 36 }}>
                  {item.desc} Gama noastră de produse este perfect compatibilă cu această tehnologie.
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>Solicitați ofertă</Link>
                  <Link to="/aplicatii" className="btn btn-outline" style={{ borderRadius: 99 }}>← Înapoi</Link>
                </div>
              </div>
              <div style={{ position: 'relative', height: 320, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,9,20,0.6) 0%, transparent 60%)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories grid */}
        <section className="section" style={{ background: '#080910' }}>
          <div className="container">
            <Reveal style={{ marginBottom: 48 }}>
              <div className="section-eyebrow">Variante disponibile</div>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em' }}>
                Variante de <span style={{ color: '#e74c3c' }}>{item.title}</span>
              </h2>
            </Reveal>

            <div className="card-grid">
              {item.subcategorii.map((sub, i) => (
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
                    Oferim consultanță tehnică gratuită pentru alegerea celei mai potrivite soluții.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>Contactați-ne</Link>
                  <Link to="/aplicatii" className="btn btn-outline" style={{ borderRadius: 99 }}>Toate aplicațiile</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {selectedSub && <Modal item={selectedSub} onClose={() => setSelectedSub(null)} />}
      </div>
    );
  }

  // ── MAIN LISTING PAGE ──
  return (
    <div>

      {/* ════════════ PAGE HERO ════════════ */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#0a0b14' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/app1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08, filter: 'blur(2px)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,9,20,0.97) 40%, rgba(231,76,60,0.06) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.5), transparent)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 32px 64px' }}>
          <div className="breadcrumb">
            <Link to="/">Acasă</Link>
            <span className="sep">/</span>
            <span className="current">Aplicații</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="section-eyebrow">Tehnologii de ambalare</div>
              <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 20 }}>
                Toate<br /><span style={{ color: '#e74c3c' }}>aplicațiile</span> noastre
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 420, marginBottom: 36 }}>
                Tehnologii moderne de ambalare pentru fiecare tip de produs și cerință industrială.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>Consultanță gratuită</Link>
                <Link to="/produse" className="btn btn-outline" style={{ borderRadius: 99 }}>Vezi produse →</Link>
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
                <span style={{ color: '#fff', fontWeight: 600 }}>{filtered.length}</span> aplicații disponibile
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Toate', 'Conservare', 'Automat', 'Prezentare', 'Specializat'].map((f) => (
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
                <Link to={`/aplicatii/${p.slug}`} className="card" style={{ display: 'block', height: '100%' }}>
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
                      {p.subcategorii.length} variante
                    </div>
                    <div style={{ position: 'absolute', top: 12, left: 12, padding: '3px 10px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', borderRadius: 99, fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {p.filter}
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-title" style={{ fontSize: '1rem', marginBottom: 10 }}>{p.title}</div>
                    <div className="card-desc">{p.desc}</div>
                    <div style={{ marginTop: 18, fontSize: '0.78rem', color: '#e74c3c', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                      Vezi variantele <span>→</span>
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
                  <div className="section-eyebrow">Consultanță</div>
                  <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: '#fff', letterSpacing: '-0.03em', marginBottom: 8 }}>
                    Nu știți ce tehnologie se potrivește?
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.88rem', maxWidth: 380, lineHeight: 1.7 }}>
                    Echipa noastră tehnică vă ajută să alegeți cea mai potrivită soluție de ambalare pentru produsele dumneavoastră.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>Consultanță gratuită</Link>
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