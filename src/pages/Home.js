import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useLang } from '../context/LanguageContext';

/* ── SVG Icons ── */
const Icons = {
  bag: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  film: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>,
  box: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  layers: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  paper: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  smoke: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15c0 0 1-1 2-1s2 1 3 1 2-1 3-1 2 1 3 1 2-1 3-1 2 1 2 1"/><path d="M4 19c0 0 1-1 2-1s2 1 3 1 2-1 3-1 2 1 3 1 2-1 3-1 2 1 2 1"/><path d="M9 6c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3c-1.7 0-3 1.3-3 3"/></svg>,
  settings: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  globe: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  meat: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 5 5c0 3-2 5-5 8-3-3-5-5-5-8a5 5 0 0 1 5-5z"/><path d="M12 15v7"/><path d="M9 19h6"/></svg>,
  cheese: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14l9-12 9 12H3z"/><path d="M3 14v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-5"/><circle cx="10" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="17" r="1" fill="currentColor"/></svg>,
  snowflake: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 7l-5-5-5 5"/><path d="M17 17l-5 5-5-5"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M7 7l-5 5 5 5"/><path d="M17 7l5 5-5 5"/></svg>,
  bread: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14.5A4.5 4.5 0 0 0 12.5 5h-1A4.5 4.5 0 0 0 7 9.5c0 1.5.7 2.8 1.8 3.7L8 21h8l-.8-7.8A4.5 4.5 0 0 0 17 14.5z"/></svg>,
  factory: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20V9l7-4v4l7-4v4l4-2v13H2z"/><line x1="2" y1="20" x2="22" y2="20"/><rect x="6" y="14" width="3" height="6"/><rect x="11" y="14" width="3" height="6"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  car: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h11l4 4 2 2v4a2 2 0 0 1-2 2h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>,
};

const PRODUSE_DATA = {
  ro: [
    { img: '/images/img1.jpg', icon: Icons.bag,      title: 'Pungi Vid',                  desc: 'Conservă produsele eliminând aerul și menținând un mediu sigilat.',              slug: 'pungi-vid' },
    { img: '/images/img2.jpg', icon: Icons.film,     title: 'Filme & Folii Alimentare',    desc: 'Protejează și conservă, asigurând igienă și siguranță maximă.',                 slug: 'filme-folii' },
    { img: '/images/img3.jpg', icon: Icons.box,      title: 'Caserole, Tăvițe, Boluri',   desc: 'Eficiente, sigure și atractive pentru orice tip de aliment.',                   slug: 'caserole' },
    { img: '/images/img4.jpg', icon: Icons.layers,   title: 'Membrane Poliamidice',        desc: 'Eficiente, durabile, folosite în varii procese industriale.',                   slug: 'membrane' },
    { img: '/images/img5.jpg', icon: Icons.paper,    title: 'Hârtie & Absorbante',         desc: 'Mențin alimentele proaspete, absorb lichide și grăsimi.',                       slug: 'hartie' },
    { img: '/images/img6.jpg', icon: Icons.smoke,    title: 'Rumeguș pentru Afumare',      desc: 'Pentru aromă intensă și gust autentic de fum natural.',                         slug: 'rumegus' },
    { img: '/images/img7.jpg', icon: Icons.settings, title: 'Echipamente de Ambalare',     desc: 'Performante, 100% compatibile cu gama noastră de produse.',                    slug: 'echipamente' },
  ],
  en: [
    { img: '/images/img1.jpg', icon: Icons.bag,      title: 'Vacuum Bags',                desc: 'Preserve products by removing air and maintaining a sealed environment.',        slug: 'pungi-vid' },
    { img: '/images/img2.jpg', icon: Icons.film,     title: 'Food Films & Foils',          desc: 'Protect and preserve, ensuring maximum hygiene and safety.',                    slug: 'filme-folii' },
    { img: '/images/img3.jpg', icon: Icons.box,      title: 'Trays, Containers, Bowls',   desc: 'Efficient, safe and attractive for any type of food.',                          slug: 'caserole' },
    { img: '/images/img4.jpg', icon: Icons.layers,   title: 'Polyamide Membranes',         desc: 'Efficient, durable, used in various industrial processes.',                     slug: 'membrane' },
    { img: '/images/img5.jpg', icon: Icons.paper,    title: 'Paper & Absorbents',          desc: 'Keep food fresh, absorb liquids and fats.',                                     slug: 'hartie' },
    { img: '/images/img6.jpg', icon: Icons.smoke,    title: 'Smoking Sawdust',             desc: 'For intense aroma and authentic natural smoke flavor.',                         slug: 'rumegus' },
    { img: '/images/img7.jpg', icon: Icons.settings, title: 'Packaging Equipment',         desc: 'High-performance, 100% compatible with our entire product range.',              slug: 'echipamente' },
  ],
  ru: [
    { img: '/images/img1.jpg', icon: Icons.bag,      title: 'Вакуумные пакеты',            desc: 'Сохраняют продукты, удаляя воздух и поддерживая герметичную среду.',           slug: 'pungi-vid' },
    { img: '/images/img2.jpg', icon: Icons.film,     title: 'Пищевые пленки и фольга',     desc: 'Защищают и сохраняют, обеспечивая максимальную гигиену и безопасность.',       slug: 'filme-folii' },
    { img: '/images/img3.jpg', icon: Icons.box,      title: 'Лотки, контейнеры, миски',   desc: 'Эффективные, безопасные и привлекательные для любого типа продуктов.',         slug: 'caserole' },
    { img: '/images/img4.jpg', icon: Icons.layers,   title: 'Полиамидные мембраны',        desc: 'Эффективные, долговечные, применяемые в различных промышленных процессах.',    slug: 'membrane' },
    { img: '/images/img5.jpg', icon: Icons.paper,    title: 'Бумага и абсорбенты',         desc: 'Сохраняют свежесть продуктов, впитывают жидкости и жиры.',                     slug: 'hartie' },
    { img: '/images/img6.jpg', icon: Icons.smoke,    title: 'Щепа для копчения',           desc: 'Для интенсивного аромата и подлинного вкуса натурального дыма.',               slug: 'rumegus' },
    { img: '/images/img7.jpg', icon: Icons.settings, title: 'Упаковочное оборудование',    desc: 'Высокопроизводительное, 100% совместимое с нашим ассортиментом.',              slug: 'echipamente' },
  ],
};

const FEATURED_DATA = {
  ro: [
    { img: '/images/section2img1.jpg', title: 'Pungi vid netede pentru carne',    slug: 'pungi-vid' },
    { img: '/images/section2img2.jpg', title: 'Hârtie cerată / Kraft',            slug: 'hartie' },
    { img: '/images/section2img3.jpg', title: 'Pungi vid termocontractibile',     slug: 'pungi-vid' },
    { img: '/images/section2img4.jpg', title: 'Filme flexibile',                  slug: 'filme-folii' },
    { img: '/images/section2img5.jpg', title: 'Filme Flow-Pack laminate',         slug: 'filme-folii' },
    { img: '/images/section2img6.jpg', title: 'Pungi vid gofrate',                slug: 'pungi-vid' },
    { img: '/images/section2img7.jpg', title: 'Pungi vid tratamente termice',     slug: 'pungi-vid' },
    { img: '/images/section2img8.jpg', title: 'Filme rigide',                     slug: 'filme-folii' },
  ],
  en: [
    { img: '/images/section2img1.jpg', title: 'Smooth vacuum bags for meat',      slug: 'pungi-vid' },
    { img: '/images/section2img2.jpg', title: 'Waxed / Kraft paper',              slug: 'hartie' },
    { img: '/images/section2img3.jpg', title: 'Shrink vacuum bags',               slug: 'pungi-vid' },
    { img: '/images/section2img4.jpg', title: 'Flexible films',                   slug: 'filme-folii' },
    { img: '/images/section2img5.jpg', title: 'Laminated Flow-Pack films',        slug: 'filme-folii' },
    { img: '/images/section2img6.jpg', title: 'Embossed vacuum bags',             slug: 'pungi-vid' },
    { img: '/images/section2img7.jpg', title: 'Heat treatment vacuum bags',       slug: 'pungi-vid' },
    { img: '/images/section2img8.jpg', title: 'Rigid films',                      slug: 'filme-folii' },
  ],
  ru: [
    { img: '/images/section2img1.jpg', title: 'Гладкие вакуумные пакеты для мяса',         slug: 'pungi-vid' },
    { img: '/images/section2img2.jpg', title: 'Вощёная / крафт-бумага',                    slug: 'hartie' },
    { img: '/images/section2img3.jpg', title: 'Термоусадочные вакуумные пакеты',           slug: 'pungi-vid' },
    { img: '/images/section2img4.jpg', title: 'Гибкие пленки',                             slug: 'filme-folii' },
    { img: '/images/section2img5.jpg', title: 'Ламинированные пленки Flow-Pack',           slug: 'filme-folii' },
    { img: '/images/section2img6.jpg', title: 'Рифлёные вакуумные пакеты',                 slug: 'pungi-vid' },
    { img: '/images/section2img7.jpg', title: 'Вакуумные пакеты для термообработки',       slug: 'pungi-vid' },
    { img: '/images/section2img8.jpg', title: 'Жёсткие пленки',                            slug: 'filme-folii' },
  ],
};

const MARKETS = [
  { flag: '🇷🇴', name: { ro: 'România',  en: 'Romania',  ru: 'Румыния'  } },
  { flag: '🇬🇷', name: { ro: 'Grecia',   en: 'Greece',   ru: 'Греция'   } },
  { flag: '🇩🇪', name: { ro: 'Germania', en: 'Germany',  ru: 'Германия' } },
  { flag: '🇪🇸', name: { ro: 'Spania',   en: 'Spain',    ru: 'Испания'  } },
  { flag: '🇫🇷', name: { ro: 'Franța',   en: 'France',   ru: 'Франция'  } },
  { flag: '🇵🇱', name: { ro: 'Polonia',  en: 'Poland',   ru: 'Польша'   } },
];

function Reveal({ children, className = 'scroll-hidden', style = {}, delay = 0 }) {
  const ref = useScrollAnimation();
  return <div ref={ref} className={className} style={{ ...style, transitionDelay: `${delay}s` }}>{children}</div>;
}

function MockupCard({ icon, label, sub, tag, style, animDelay = 0 }) {
  return (
    <div style={{ background: 'linear-gradient(145deg, #13141f, #0f1019)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 18, padding: '20px', width: 210, boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)', animation: `floatCard 6s ease-in-out ${animDelay}s infinite`, ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ width: 38, height: 38, background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e74c3c' }}>{icon}</div>
        {tag && <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 99, background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.22)', color: '#e74c3c' }}>{tag}</span>}
      </div>
      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', marginBottom: 5, lineHeight: 1.3 }}>{label}</div>
      <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)', lineHeight: 1.55 }}>{sub}</div>
      <div style={{ marginTop: 16, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #e74c3c, rgba(231,76,60,0.15))' }} />
    </div>
  );
}

function StatChip({ value, label, style, animDelay = 0 }) {
  return (
    <div style={{ background: 'linear-gradient(145deg, #13141f, #0f1019)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 20px', boxShadow: '0 16px 40px rgba(0,0,0,0.5)', animation: `floatCard 6s ease-in-out ${animDelay}s infinite`, ...style }}>
      <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '1.7rem', color: 'transparent', backgroundImage: 'linear-gradient(135deg, #e74c3c, #ff7060)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.28)', whiteSpace: 'nowrap' }}>{label}</div>
    </div>
  );
}

function IndustryTag({ icon, label, style, animDelay = 0 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', background: 'linear-gradient(145deg, #13141f, #0f1019)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.4)', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', animation: `floatCard 6s ease-in-out ${animDelay}s infinite`, ...style }}>
      <span style={{ color: '#e74c3c' }}>{icon}</span> {label}
    </div>
  );
}

export default function Home() {
  const { lang, t } = useLang();
  const h = t.home;
  const PRODUSE = PRODUSE_DATA[lang];
  const FEATURED = FEATURED_DATA[lang];
  const STATS = [
    { value: '20+', label: h.statsYears },
    { value: '2',   label: h.statsFactories },
    { value: '20+', label: h.statsGroups },
    { value: '6',   label: h.statsMarkets },
  ];

  useEffect(() => {
    const id = 'vertrag-keyframes';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes floatCard { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      .hero-animate { animation: fadeSlideUp 0.7s cubic-bezier(0.4,0,0.2,1) both; }
      .hero-animate-1 { animation-delay: 0.1s; }
      .hero-animate-2 { animation-delay: 0.22s; }
      .hero-animate-3 { animation-delay: 0.34s; }
      .hero-animate-4 { animation-delay: 0.46s; }
      .hero-animate-5 { animation-delay: 0.58s; }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="hero-section" style={{ position: 'relative', minHeight: '94vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden', padding: '120px 32px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(231,76,60,0.1) 0%, rgba(100,40,120,0.06) 35%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(8,9,16,1), transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* LEFT floating cards */}
        <div className="hero-float-left" style={{ position: 'absolute', left: '8%', top: '50%', transform: 'translateY(-50%)', width: 260, height: 620, pointerEvents: 'none', animation: 'fadeIn 1s ease 0.3s both' }}>
          <div style={{ position: 'absolute', top: 0, left: 20 }}><MockupCard icon={Icons.bag} label={h.floatCard1} sub={h.floatCard1sub} tag={h.floatTagTop} animDelay={0} style={{ transform: 'rotate(-6deg)' }} /></div>
          <div style={{ position: 'absolute', top: 185, left: 60 }}><StatChip value="2,000+" label={h.floatStat} animDelay={1.2} style={{ transform: 'rotate(4deg)' }} /></div>
          <div style={{ position: 'absolute', top: 330, left: 10 }}><MockupCard icon={Icons.film} label={h.floatCard2} sub={h.floatCard2sub} animDelay={0.7} style={{ transform: 'rotate(-2deg)', opacity: 0.88 }} /></div>
          <div style={{ position: 'absolute', top: 160, left: -10 }}><IndustryTag icon={Icons.meat} label={h.floatTag1} animDelay={0.4} style={{ transform: 'rotate(5deg)' }} /></div>
        </div>

        {/* RIGHT floating cards */}
        <div className="hero-float-right" style={{ position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)', width: 260, height: 620, pointerEvents: 'none', animation: 'fadeIn 1s ease 0.5s both' }}>
          <div style={{ position: 'absolute', top: 0, right: 0 }}><MockupCard icon={Icons.globe} label={h.floatCard3} sub={h.floatCard3sub} tag={h.floatTagInt} animDelay={0.5} style={{ transform: 'rotate(5deg)' }} /></div>
          <div style={{ position: 'absolute', top: 175, right: 50 }}><IndustryTag icon={Icons.cheese} label={h.floatTag2} animDelay={0.9} style={{ transform: 'rotate(-4deg)' }} /></div>
          <div style={{ position: 'absolute', top: 235, right: 0 }}><MockupCard icon={Icons.box} label={h.floatCard4} sub={h.floatCard4sub} animDelay={1.3} style={{ transform: 'rotate(-5deg)', opacity: 0.88 }} /></div>
          <div style={{ position: 'absolute', top: 430, right: 70 }}><IndustryTag icon={Icons.snowflake} label={h.floatTag3} animDelay={0.6} style={{ transform: 'rotate(3deg)' }} /></div>
          <div style={{ position: 'absolute', top: 490, right: 10 }}><IndustryTag icon={Icons.bread} label={h.floatTag4} animDelay={1.6} style={{ transform: 'rotate(-6deg)' }} /></div>
        </div>

        {/* CENTER */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 780 }}>
          <div className="hero-animate hero-animate-1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', background: 'rgba(231,76,60,0.08)', border: '1px solid rgba(231,76,60,0.22)', borderRadius: 99, marginBottom: 40 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e74c3c', boxShadow: '0 0 8px rgba(231,76,60,0.8)', display: 'inline-block' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e74c3c' }}>{h.heroBadge}</span>
          </div>
          <h1 className="hero-animate hero-animate-2" style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: 1.02, letterSpacing: '-0.04em', color: '#fff', marginBottom: 32, fontWeight: 400 }}>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>{h.heroTitle1}</span>{' '}
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>{h.heroTitle2}</span><br />
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: 'transparent', backgroundImage: 'linear-gradient(135deg, #e74c3c 0%, #ff7060 50%, #c0392b 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{h.heroTitle3}</span>{' '}
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>{h.heroTitle4}</span>
          </h1>
          <p className="hero-animate hero-animate-3" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'rgba(255,255,255,0.38)', maxWidth: 520, margin: '0 auto 44px', lineHeight: 1.8 }}>{h.heroDesc}</p>
          <div className="hero-animate hero-animate-4" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 72 }}>
            <Link to="/produse" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '0.9rem', borderRadius: 99 }}>{h.heroBtn1}</Link>
            <Link to="/despre#contact" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: '0.9rem' }}>{h.heroBtn2}</Link>
          </div>
          <div className="hero-animate hero-animate-5" style={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
            {MARKETS.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 99, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                <span>{m.flag}</span> {m.name[lang]}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0a0b14' }}>
        <div className="container">
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {STATS.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ padding: '40px 24px', textAlign: 'center', borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '3rem', color: 'transparent', backgroundImage: 'linear-gradient(135deg, #e74c3c, #ff7060)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <section className="section">
        <div className="container">
          <Reveal className="scroll-hidden" style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>{h.productsEyebrow}</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em', marginBottom: 14 }}>{h.productsTitle}</h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.28)', maxWidth: 480, margin: '0 auto' }}>{h.productsDesc}</p>
          </Reveal>
          <div className="card-grid">
            {PRODUSE.map((p, i) => (
              <Reveal key={i} delay={i * 0.08} className="scroll-hidden">
                <Link to={`/produse/${p.slug}`} className="card" style={{ display: 'block' }}>
                  <div className="card-img" style={{ padding: 0, overflow: 'hidden' }}>
                    <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  </div>
                  <div className="card-body">
                    <div className="card-title">{p.title}</div>
                    <div className="card-desc">{p.desc}</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/produse" style={{ fontSize: '0.83rem', color: '#e74c3c', fontWeight: 600 }}>{h.productsAll}</Link>
          </Reveal>
        </div>
      </section>

      {/* OFFERS */}
      <section className="section" style={{ background: '#080910' }}>
        <div className="container">
          <Reveal className="scroll-hidden-left">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div className="section-eyebrow">{h.offersEyebrow}</div>
                <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em' }}>{h.offersTitle}</h2>
              </div>
              <Link to="/produse" style={{ fontSize: '0.82rem', color: '#e74c3c', fontWeight: 600, whiteSpace: 'nowrap' }}>{h.offersAll}</Link>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px,1fr))', gap: 10 }}>
            {FEATURED.map((f, i) => (
              <Reveal key={i} delay={i * 0.07} className="scroll-hidden">
                <Link to={`/produse/${f.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px 10px 10px', background: 'linear-gradient(135deg, #10111c, #0d0e18)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, transition: 'all 0.22s', cursor: 'pointer', overflow: 'hidden' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(231,76,60,0.3)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <div style={{ width: 52, height: 52, minWidth: 52, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
                    <img src={f.img} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <span style={{ fontSize: '0.86rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', flex: 1, lineHeight: 1.4 }}>{f.title}</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', flexShrink: 0 }}>→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ABOUT */}
      <section className="section">
        <div className="container">
          <div className="about-grid" style={{ background: 'linear-gradient(135deg, #0f1019 0%, #0c0d16 100%)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 24, padding: '64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 300, height: 300, background: 'radial-gradient(circle at top right, rgba(231,76,60,0.08), transparent 65%)', pointerEvents: 'none' }} />
            <Reveal className="scroll-hidden-left" style={{ position: 'relative', zIndex: 1 }}>
              <div className="section-eyebrow">{h.aboutEyebrow}</div>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 20 }}>
                {h.aboutTitle1}{' '}<em style={{ fontStyle: 'italic', color: '#e74c3c' }}>{h.aboutTitle2}</em>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.32)', lineHeight: 1.9, marginBottom: 16, fontSize: '0.92rem' }}>{h.aboutDesc1}</p>
              <p style={{ color: 'rgba(255,255,255,0.32)', lineHeight: 1.9, marginBottom: 36, fontSize: '0.92rem' }}>{h.aboutDesc2}</p>
              <Link to="/despre" className="btn btn-outline" style={{ borderRadius: 99 }}>{h.aboutBtn}</Link>
            </Reveal>
            <Reveal className="scroll-hidden-right" style={{ position: 'relative', zIndex: 1 }}>
              <div className="about-cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { icon: Icons.factory, label: h.aboutCard1, sub: h.aboutCard1sub },
                  { icon: Icons.box,     label: h.aboutCard2, sub: h.aboutCard2sub },
                  { icon: Icons.globe,   label: h.aboutCard3, sub: h.aboutCard3sub },
                  { icon: Icons.meat,    label: h.aboutCard4, sub: h.aboutCard4sub },
                  { icon: Icons.car,     label: h.aboutCard5, sub: h.aboutCard5sub },
                  { icon: Icons.check,   label: h.aboutCard6, sub: h.aboutCard6sub },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '16px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, transition: 'border-color 0.18s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(231,76,60,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                  >
                    <div style={{ color: '#e74c3c', marginBottom: 10 }}>{item.icon}</div>
                    <div style={{ fontSize: '0.83rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)', marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.22)' }}>{item.sub}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: '#080910' }}>
        <section className="section">
          <div className="container">
            <Reveal className="scroll-hidden-scale">
              <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
                <div className="section-eyebrow" style={{ justifyContent: 'center' }}>{h.newsletterEyebrow}</div>
                <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em', marginBottom: 14 }}>{h.newsletterTitle}</h2>
                <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.9rem', marginBottom: 32, lineHeight: 1.75 }}>{h.newsletterDesc}</p>
                <div className="newsletter-row" style={{ display: 'flex', gap: 10, maxWidth: 460, margin: '0 auto' }}>
                  <input type="email" placeholder={h.newsletterPlaceholder} className="input" style={{ flex: 1 }} />
                  <button className="btn btn-red" style={{ flexShrink: 0, borderRadius: 99, padding: '13px 24px' }}>{h.newsletterBtn}</button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
}