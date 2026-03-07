import TopProduse from '../components/TopProduse';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useLang } from '../context/LanguageContext';

function Reveal({ children, className = 'scroll-hidden', style = {}, delay = 0 }) {
  const ref = useScrollAnimation();
  return <div ref={ref} className={className} style={{ ...style, transitionDelay: `${delay}s` }}>{children}</div>;
}

function Modal({ item, onClose, ti }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKey); };
  }, [onClose]);

  if (!item) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', animation: 'fadeIn 0.2s ease' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #13141f, #0f1019)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, width: '100%', maxWidth: 680, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.8)', animation: 'fadeSlideUp 0.3s cubic-bezier(0.4,0,0.2,1)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.18s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(231,76,60,0.2)'; e.currentTarget.style.color = '#e74c3c'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}>✕</button>
        <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
          <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #13141f 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.4), transparent)' }} />
        </div>
        <div style={{ padding: '32px 36px 36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.2)', borderRadius: 99, marginBottom: 16 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#e74c3c', display: 'inline-block' }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e74c3c' }}>{ti.available}</span>
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: '#fff', letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1.2 }}>{item.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.92rem', lineHeight: 1.85, marginBottom: 28 }}>{item.desc}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
            {[
              { label: ti.specAvail,    value: ti.specAvailVal },
              { label: ti.specDelivery, value: ti.specDeliveryVal },
              { label: ti.specMin,      value: ti.specMinVal },
              { label: ti.specCustom,   value: ti.specCustomVal },
            ].map((spec, i) => (
              <div key={i} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{spec.label}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{spec.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/despre#contact" onClick={onClose} className="btn btn-red" style={{ flex: 1, justifyContent: 'center', borderRadius: 99 }}>{ti.requestBtn}</Link>
            <button onClick={onClose} className="btn btn-outline" style={{ borderRadius: 99, padding: '13px 24px' }}>{ti.closeBtn}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Industry data — titles/descriptions stay in Romanian (technical packaging terms)
// but UI strings (buttons, labels) come from translation context
const ALL = [
  {
    img: '/images/ind1.jpg', title: 'Carne', slug: 'carne', tag: 'Popular', filter: 'Alimentar',
    desc: 'Ambalaje specializate pentru carne proaspătă, procesată și produse din carne. Soluții vacuum și termocontractibile.',
    subcategorii: [
      { img: '/images/ind1_1.jpg', title: 'Pungi vid netede', desc: 'Barieră și înaltă barieră · Grosimi cuprinse între 50 și 300 μm.' },
      { img: '/images/ind1_2.jpg', title: 'Pungi vid gofrate', desc: 'Barieră și înaltă barieră · Grosimi cuprinse între 50 și 300 μm.' },
      { img: '/images/ind1_3.jpg', title: 'Pungi vid termocontractibile', desc: 'Luciul deosebit și transparența pungilor maximizeaza vizibilitatea și fac produsul ambalat extrem de atractiv.' },
      { img: '/images/ind1_4.jpg', title: 'Pungi vid pentru tratamente termice', desc: ' ' },
      { img: '/images/ind1_5.jpg', title: 'Filme flexibile', desc: 'Filmele de Termoformare flexibile tip PA/PE, PP/PA/PE sau PP/PE.' },
      { img: '/images/ind1_6.jpg', title: 'Filme rigide', desc: 'Foarte important, filmele PET sunt supuse unei reciclări eficiente.' },
      { img: '/images/ind1_7.jpg', title: 'Filme laminate', desc: 'FILMELE pentru Flow-Pack – în variantele laminate sau nelaminate.' },
      { img: '/images/ind1_8.jpg', title: 'Filme pentru termosudare caserole (ATM)', desc: 'FILME SUPERIOARE pentru ambalarea în atmosferă modificată.' },
      { img: '/images/ind1_9.jpg', title: 'Filme Skin', desc: 'FILME SUPERIOARE pentru ambalarea în vacuum / vid.' },
      { img: '/images/ind1_10.jpg', title: 'Filme Flow-Pack laminate', desc: 'FILMELE pentru Flow-Pack – în variantele laminate sau nelaminate.' },
      { img: '/images/ind1_11.jpg', title: 'Filme Flow-Pack microperforate', desc: 'Filme destinate special produselor crud-uscate, produselor leguminoase, de panificație.' },
      { img: '/images/ind1_12.jpg', title: 'Folii Stretch alimentare', desc: 'Filmele de Termoformare flexibile tip PA/PE, PP/PA/PE sau PP/PE.' },
      { img: '/images/ind1_13.jpg', title: 'Folii Poliolefină termocontractibile', desc: ' ' },
      { img: '/images/ind1_14.jpg', title: 'Folii FlowVac termocontractibile', desc: 'Produse care acoperă o gamă variată de aplicații.' },
      { img: '/images/ind1_15.jpg', title: 'Folii din polietilenă', desc: 'Pungile termocontractibile garantează ambalajul produsului.' },
      { img: '/images/ind1_16.jpg', title: 'Saci pentru navete', desc: 'Filmele de Termoformare flexibile tip PA/PE, PP/PA/PE sau PP/PE.' },
      { img: '/images/ind1_17.jpg', title: 'Saci pentru abatorizare', desc: 'Filmele de Termoformare flexibile tip PA/PE, PP/PA/PE sau PP/PE.' },
      { img: '/images/ind1_18.jpg', title: 'Caserole PP', desc: 'Caserolele PET/PE, mono PET și PP sunt proiectate pentru ambalare MAP.' },
      { img: '/images/ind1_19.jpg', title: 'Caserole PET/PE', desc: ' ' },
      { img: '/images/ind1_20.jpg', title: 'Caserole Skin', desc: 'EXPANDATE SAU RIGIDE, PP / PET/PE.' },
      { img: '/images/ind1_21.jpg', title: 'Caserole PSE', desc: 'EXPANDATE SAU RIGIDE, PP / PET/PE.' },
      { img: '/images/ind1_22.jpg', title: 'Cartoane Skin', desc: ' ' },
      { img: '/images/ind1_23.jpg', title: 'Caserole Mono PET', desc: 'Caserolele PET/PE, mono PET și PP sunt proiectate pentru ambalare MAP.' },
      { img: '/images/ind1_24.jpg', title: 'Membrane poliamidice pentru mezeluri', desc: 'Membranele poliamidice sunt membrane multistrat, fabricate din poliamidă și poliolefină.' },
      { img: '/images/ind1_25.jpg', title: 'Membrane poliamidice pentru Pet Food', desc: ' ' },
      { img: '/images/ind1_26.jpg', title: 'Absorbante alimentare celulozice', desc: 'Păstrează prospețimea și îmbunătățește imaginea la raft.' },
      { img: '/images/ind1_27.jpg', title: 'Super-absorbante alimentare', desc: 'Păstrează prospețimea și îmbunătățește imaginea la raft.' },
      { img: '/images/ind1_28.jpg', title: 'Hârtie cerată / Kraft', desc: 'Păstrează prospețimea și îmbunătățește imaginea la raft.' },
      { img: '/images/ind1_29.jpg', title: 'Rumeguș pentru afumare', desc: 'Esența lemnului pur, pentru o aromă tradițională inconfundabilă.' },
    ],
  },
  {
    img: '/images/ind2.jpg', title: 'Brânzeturi', slug: 'branzeturi', tag: null, filter: 'Alimentar',
    desc: 'Folii și pungi pentru maturare și ambalare brânzeturi. Controlul umidității și permeabilității gazelor.',
    subcategorii: [
      { img: '/images/ind2_1.jpg', title: 'Pungi vid netede', desc: 'Barieră și înaltă barieră · Grosimi cuprinse între 50 și 300 μm.' },
      { img: '/images/ind2_2.jpg', title: 'Pungi vid gofrate', desc: 'Barieră și înaltă barieră · Grosimi cuprinse între 50 și 300 μm.' },
      { img: '/images/ind2_3.jpg', title: 'Pungi vid termocontractibile pentru maturare cașcaval', desc: ' ' },
      { img: '/images/ind2_4.jpg', title: 'Filme flexibile', desc: 'Filmele de Termoformare flexibile tip PA/PE, PP/PA/PE sau PP/PE.' },
      { img: '/images/ind1_2.jpg', title: 'Filme rigide', desc: 'Utilizate pentru producerea ambalajelor prin termoformare.' },
      { img: '/images/ind1_2.jpg', title: 'Filme laminate', desc: 'FILMELE pentru Flow-Pack – în variantele laminate sau nelaminate.' },
      { img: '/images/ind1_2.jpg', title: 'Filme pentru termosudare caserole (ATM)', desc: 'FILME SUPERIOARE pentru ambalarea în atmosferă modificată.' },
      { img: '/images/ind1_2.jpg', title: 'Filme Skin', desc: 'FILME SUPERIOARE pentru ambalarea în vacuum / vid.' },
      { img: '/images/ind1_2.jpg', title: 'Filme Flow-Pack laminate', desc: 'FILMELE pentru Flow-Pack – în variantele laminate sau nelaminate.' },
      { img: '/images/ind2_5.jpg', title: 'Caserole PP', desc: 'Proiectate pentru ambalarea cu atmosferă modificată.' },
      { img: '/images/ind2_6.jpg', title: 'Caserole PSE', desc: 'EXPANDATE SAU RIGIDE, PP / PET/PE.' },
      { img: '/images/ind1_2.jpg', title: 'Membrane poliamidice pentru brânzeturi', desc: ' ' },
      { img: '/images/ind1_2.jpg', title: 'Rumeguș pentru afumare', desc: 'Esența lemnului pur, pentru o aromă tradițională inconfundabilă.' },
    ],
  },
  {
    img: '/images/ind3.jpg', title: 'Congelate', slug: 'congelate', tag: null, filter: 'Alimentar',
    desc: 'Ambalaje rezistente la temperaturi scăzute pentru produse congelate. Etanșeitate perfectă.',
    subcategorii: [
      { img: '/images/ind1_2.jpg', title: 'Pungi vid gofrate', desc: 'Barieră și înaltă barieră · Grosimi cuprinse între 50 și 300 μm.' },
      { img: '/images/ind3_1.jpg', title: 'Pungi vid termocontractibile pentru carne', desc: 'Acoperă o gamă variată de aplicații – ambalarea produselor din carne, pește și brânzeturi fermentate.' },
      { img: '/images/ind1_2.jpg', title: 'Filme flexibile', desc: 'Filmele de Termoformare flexibile tip PA/PE, PP/PA/PE sau PP/PE.' },
      { img: '/images/ind3_7.jpg', title: 'Filme Skin', desc: 'FILME SUPERIOARE pentru ambalarea în vacuum / vid.' },
      { img: '/images/ind3_2.jpg', title: 'Folii Poliolefină termocontractibile', desc: ' ' },
      { img: '/images/ind3_3.jpg', title: 'Folii din polietilenă', desc: 'Acoperă o gamă variată de aplicații.' },
      { img: '/images/ind3_4.jpg', title: 'Caserole PP', desc: 'Proiectate pentru ambalarea cu atmosferă modificată.' },
      { img: '/images/ind3_5.jpg', title: 'Caserole Skin', desc: 'EXPANDATE SAU RIGIDE, PP / PET/PE.' },
      { img: '/images/ind3_6.jpg', title: 'Caserole PSE', desc: 'EXPANDATE SAU RIGIDE, PP / PET/PE.' },
    ],
  },
  {
    img: '/images/ind4.jpg', title: 'Panificație & Cofetărie', slug: 'panificatie', tag: null, filter: 'Alimentar',
    desc: 'Soluții de ambalare pentru pâine, produse de patiserie și cofetărie. Flow-pack și folii termosudabile.',
    subcategorii: [
      { img: '/images/ind4_3.jpg', title: 'Filme laminate', desc: 'FILMELE pentru Flow-Pack – în variantele laminate sau nelaminate.' },
      { img: '/images/ind4_4.jpg', title: 'Filme pentru termosudare caserole (ATM)', desc: 'FILME SUPERIOARE pentru ambalarea în atmosferă modificată.' },
      { img: '/images/ind4_5.jpg', title: 'Filme Flow-Pack laminate', desc: 'FILMELE pentru Flow-Pack – în variantele laminate sau nelaminate.' },
      { img: '/images/ind1_29.jpg', title: 'Filme Flow-Pack microperforate', desc: 'Filme destinate special produselor de panificație.' },
      { img: '/images/ind4_11.jpg', title: 'Caserole PP', desc: 'Proiectate pentru ambalarea cu atmosferă modificată.' },
      { img: '/images/ind4_13.jpg', title: 'Caserole PSE', desc: 'EXPANDATE SAU RIGIDE, PP / PET/PE.' },
      { img: '/images/ind4_14.jpg', title: 'Caserole Mono PET', desc: 'Proiectate pentru ambalarea cu atmosferă modificată.' },
    ],
  },
  {
    img: '/images/ind5.jpg', title: 'Oleaginoase', slug: 'oleaginoase', tag: null, filter: 'Alimentar',
    desc: 'Ambalaje pentru uleiuri, semințe și produse oleaginoase. Barieră împotriva oxidării.',
    subcategorii: [
      { img: '/images/ind5_1.jpg', title: 'Pungi vid netede', desc: 'Barieră și înaltă barieră · Grosimi cuprinse între 50 și 300 μm.' },
      { img: '/images/ind5_5.jpg', title: 'Filme Flow-Pack laminate', desc: 'FILMELE pentru Flow-Pack – în variantele laminate sau nelaminate.' },
      { img: '/images/ind1_29.jpg', title: 'Caserole PP', desc: 'Proiectate pentru ambalarea cu atmosferă modificată.' },
      { img: '/images/ind1_29.jpg', title: 'Caserole PSE', desc: 'EXPANDATE SAU RIGIDE, PP / PET/PE.' },
    ],
  },
  {
    img: '/images/ind6.jpg', title: 'Fructe, Legume & Murături', slug: 'fructe-legume', tag: null, filter: 'Alimentar',
    desc: 'Folii și caserole pentru fructe și legume proaspete. Atmosferă protectoare pentru prospețime maximă.',
    subcategorii: [
      { img: '/images/ind6_2.jpg', title: 'Filme flexibile', desc: 'Filmele de Termoformare flexibile tip PA/PE, PP/PA/PE sau PP/PE.' },
      { img: '/images/ind6_6.jpg', title: 'Filme Flow-Pack laminate', desc: 'FILMELE pentru Flow-Pack – în variantele laminate sau nelaminate.' },
      { img: '/images/ind6_8.jpg', title: 'Filme Flow-Pack macroperforate', desc: 'Filme destinate special produselor leguminoase, de panificație.' },
      { img: '/images/ind6_9.jpg', title: 'Folii Stretch alimentare', desc: 'Filmele de Termoformare flexibile tip PA/PE, PP/PA/PE sau PP/PE.' },
      { img: '/images/ind6_10.jpg', title: 'Folii Poliolefină termocontractibilă', desc: 'Acoperă o gamă variată de aplicații.' },
      { img: '/images/ind6_16.jpg', title: 'Mono PET', desc: 'Proiectate pentru ambalarea cu atmosferă modificată.' },
    ],
  },
  {
    img: '/images/ind7.jpg', title: 'HoReCa & Catering', slug: 'horeca', tag: null, filter: 'HoReCa',
    desc: 'Soluții complete pentru restaurante, hoteluri și servicii de catering. Porționare și prezentare premium.',
    subcategorii: [
      { img: '/images/ind7_1.jpg', title: 'Pungi vid gofrate', desc: 'Barieră și înaltă barieră · Grosimi cuprinse între 50 și 300 μm.' },
      { img: '/images/ind7_4.jpg', title: 'Filme flexibile', desc: 'Filmele de Termoformare flexibile tip PA/PE, PP/PA/PE sau PP/PE.' },
      { img: '/images/ind7_6.jpg', title: 'Filme laminate', desc: 'FILMELE pentru Flow-Pack – în variantele laminate sau nelaminate.' },
      { img: '/images/ind7_7.jpg', title: 'Filme pentru termosudare caserole (ATM)', desc: 'FILME SUPERIOARE pentru ambalarea în atmosferă modificată.' },
      { img: '/images/ind7_9.jpg', title: 'Filme Flow-Pack laminate', desc: 'FILMELE pentru Flow-Pack – în variantele laminate sau nelaminate.' },
      { img: '/images/ind7_18.jpg', title: 'Caserole PP', desc: 'Proiectate pentru ambalarea cu atmosferă modificată.' },
      { img: '/images/ind7_20.jpg', title: 'Caserole Skin', desc: 'EXPANDATE SAU RIGIDE, PP / PET/PE.' },
      { img: '/images/ind7_21.jpg', title: 'Caserole PSE', desc: 'EXPANDATE SAU RIGIDE, PP / PET/PE.' },
      { img: '/images/ind7_23.jpg', title: 'Mono PET', desc: 'Proiectate pentru ambalarea cu atmosferă modificată.' },
      { img: '/images/ind1_29.jpg', title: 'Rumeguș pentru afumare', desc: 'Esența lemnului pur, pentru o aromă tradițională inconfundabilă.' },
    ],
  },
  {
    img: '/images/ind8.jpg', title: 'Non-Food', slug: 'non-food', tag: null, filter: 'Industrial',
    desc: 'Ambalaje pentru industria auto, componente electronice și alte produse industriale.',
    subcategorii: [
      { img: '/images/ind8.jpg', title: 'Industrie Auto', desc: 'Ambalaje antistatice și de protecție pentru piese auto și componente metalice.' },
      { img: '/images/ind8.jpg', title: 'Componente Electronice', desc: 'Pungi antistatice ESD pentru protecția componentelor electronice sensibile.' },
      { img: '/images/ind8.jpg', title: 'Produse Chimice', desc: 'Ambalaje rezistente chimic pentru produse de curățenie și substanțe industriale.' },
      { img: '/images/ind8.jpg', title: 'Textile & Îmbrăcăminte', desc: 'Pungi transparente și opace pentru ambalarea și transportul produselor textile.' },
    ],
  },
  {
    img: '/images/ind9.jpg', title: 'Alte Industrii', slug: 'alte-industrii', tag: null, filter: 'Industrial',
    desc: 'Soluții personalizate pentru industrii specifice. Consultanță și dezvoltare de produse la comandă.',
    subcategorii: [
      { img: '/images/ind9.jpg', title: 'Agricultură', desc: 'Folii și saci pentru produse agricole, semințe și îngrășăminte.' },
      { img: '/images/ind9.jpg', title: 'Farmacie & Medical', desc: 'Ambalaje sterile și conforme cu normele medicale pentru produse farmaceutice.' },
      { img: '/images/ind9.jpg', title: 'Cosmetice & Îngrijire', desc: 'Ambalaje elegante pentru produse cosmetice și de îngrijire personală.' },
      { img: '/images/ind9.jpg', title: 'Soluții La Comandă', desc: 'Dezvoltăm ambalaje personalizate pentru orice industrie, după specificațiile clientului.' },
    ],
  },
];


export default function Industrii() {
  const { slug } = useParams();
  const { t } = useLang();
  const ti = t.industrii;
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedSub, setSelectedSub] = useState(null);

  const FILTERS = [
    { key: 'all',   label: ti.filterAll },
    { key: 'food',  label: ti.filterFood },
    { key: 'horeca', label: ti.filterHoreca },
    { key: 'ind',   label: ti.filterIndustrial },
  ];
  const FILTER_MAP = { food: 'Alimentar', horeca: 'HoReCa', ind: 'Industrial' };
  const filtered = activeFilter === 'all' ? ALL : ALL.filter(i => i.filter === FILTER_MAP[activeFilter]);
  const item = slug ? ALL.find(i => i.slug === slug) : null;

  // SUBCATEGORY PAGE
  if (item) {
    return (
      <div>
        <div style={{ position: 'relative', overflow: 'hidden', background: '#0a0b14' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07, filter: 'blur(3px)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,9,20,0.97) 40%, rgba(231,76,60,0.05) 100%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.5), transparent)' }} />
          <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 32px 64px' }}>
            <div className="breadcrumb">
              <Link to="/">{ti.breadHome}</Link><span className="sep">/</span>
              <Link to="/industrii">{t.nav.industrii}</Link><span className="sep">/</span>
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
                <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 20 }}>{item.title}</h1>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 420, marginBottom: 36 }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>{ti.requestBtn}</Link>
                  <Link to="/industrii" className="btn btn-outline" style={{ borderRadius: 99 }}>{ti.backBtn}</Link>
                </div>
              </div>
              <div style={{ position: 'relative', height: 320, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,9,20,0.6) 0%, transparent 60%)' }} />
              </div>
            </div>
          </div>
        </div>

        <section className="section" style={{ background: '#080910' }}>
          <div className="container">
            <Reveal style={{ marginBottom: 48 }}>
              <div className="section-eyebrow">{ti.solutionsAvailable}</div>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em' }}>
                {ti.solutionsFor} <span style={{ color: '#e74c3c' }}>{item.title}</span>
              </h2>
            </Reveal>
            <div className="card-grid">
              {item.subcategorii.map((sub, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="card" style={{ display: 'block', height: '100%', cursor: 'pointer' }} onClick={() => setSelectedSub(sub)}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(231,76,60,0.3)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                    <div style={{ position: 'relative', overflow: 'hidden', height: 180, background: '#0f1019' }}>
                      <img src={sub.img} alt={sub.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,11,20,0.7) 0%, transparent 50%)' }} />
                    </div>
                    <div className="card-body">
                      <div className="card-title" style={{ fontSize: '0.95rem', marginBottom: 8 }}>{sub.title}</div>
                      <div className="card-desc" style={{ fontSize: '0.82rem' }}>{sub.desc}</div>
                      <div style={{ marginTop: 16, fontSize: '0.78rem', color: '#e74c3c', fontWeight: 600 }}>{ti.seeDetails}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal style={{ marginTop: 48 }}>
              <div style={{ background: 'linear-gradient(135deg, #0f1019, #0c0d16)', border: '1px solid rgba(231,76,60,0.2)', borderRadius: 20, padding: '40px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.5), transparent)' }} />
                <div>
                  <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.6rem', fontWeight: 400, color: '#fff', marginBottom: 8 }}>{ti.noSolution}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.88rem', lineHeight: 1.7 }}>{ti.noSolutionDesc}</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>{ti.ctaBtn1}</Link>
                  <Link to="/industrii" className="btn btn-outline" style={{ borderRadius: 99 }}>{ti.allBtn}</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        {selectedSub && <Modal item={selectedSub} onClose={() => setSelectedSub(null)} ti={ti} />}
      </div>
    );
  }

  // MAIN LISTING PAGE
  const STATS = [
    { value: '9+',    label: ti.statIndustries },
    { value: '20+',   label: ti.statYears },
    { value: '2,000+', label: ti.statTypes },
    { value: '6',     label: ti.statMarkets },
  ];

  return (
    <div>
      <div style={{ position: 'relative', overflow: 'hidden', background: '#0a0b14' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/ind1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08, filter: 'blur(2px)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,9,20,0.97) 40%, rgba(231,76,60,0.06) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.5), transparent)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 32px 64px' }}>
          <div className="breadcrumb">
            <Link to="/">{ti.breadHome}</Link><span className="sep">/</span>
            <span className="current">{t.nav.industrii}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="section-eyebrow">{ti.eyebrow}</div>
              <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 20 }}>
                {ti.title1}<br /><span style={{ color: '#e74c3c' }}>{ti.title2}</span> {ti.title3}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 420, marginBottom: 36 }}>{ti.desc}</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>{ti.btn1}</Link>
                <Link to="/produse" className="btn btn-outline" style={{ borderRadius: 99 }}>{ti.btn2}</Link>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ padding: '24px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(231,76,60,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
                  <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '2.2rem', color: 'transparent', backgroundImage: 'linear-gradient(135deg, #e74c3c, #ff7060)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="section" style={{ background: '#080910' }}>
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>{filtered.length}</span> {ti.countLabel}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {FILTERS.map(f => (
                  <button key={f.key} onClick={() => setActiveFilter(f.key)} style={{ padding: '7px 16px', borderRadius: 99, border: `1px solid ${activeFilter === f.key ? 'rgba(231,76,60,0.5)' : 'rgba(255,255,255,0.08)'}`, background: activeFilter === f.key ? 'rgba(231,76,60,0.1)' : 'transparent', color: activeFilter === f.key ? '#e74c3c' : 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.18s' }}>{f.label}</button>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="card-grid">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <Link to={`/industrii/${p.slug}`} className="card" style={{ display: 'block', height: '100%' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: 200, background: '#0f1019' }}>
                    <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,11,20,0.7) 0%, transparent 50%)' }} />
                    {p.tag && <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 10px', background: 'rgba(231,76,60,0.9)', borderRadius: 99, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff' }}>{p.tag}</div>}
                    <div style={{ position: 'absolute', bottom: 12, left: 12, padding: '3px 10px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', borderRadius: 99, fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {p.subcategorii.length} {ti.solutionsCount}
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-title" style={{ fontSize: '1rem', marginBottom: 10 }}>{p.title}</div>
                    <div className="card-desc">{p.desc}</div>
                    <div style={{ marginTop: 18, fontSize: '0.78rem', color: '#e74c3c', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>{ti.seeSolutions}</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TopProduse />

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <section className="section" style={{ background: '#0a0b14' }}>
          <div className="container">
            <Reveal className="scroll-hidden-scale">
              <div style={{ background: 'linear-gradient(135deg, #0f1019, #0c0d16)', border: '1px solid rgba(231,76,60,0.2)', borderRadius: 20, padding: '52px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 40, flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.5), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: 200, height: 200, background: 'radial-gradient(circle, rgba(231,76,60,0.08), transparent 70%)', pointerEvents: 'none' }} />
                <div>
                  <div className="section-eyebrow">{ti.colabEyebrow}</div>
                  <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: '#fff', letterSpacing: '-0.03em', marginBottom: 8 }}>{ti.ctaTitle}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.88rem', maxWidth: 380, lineHeight: 1.7 }}>{ti.ctaDesc}</p>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>{ti.ctaBtn1}</Link>
                  <Link to="/despre" className="btn btn-outline" style={{ borderRadius: 99 }}>{ti.ctaBtn2}</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
}