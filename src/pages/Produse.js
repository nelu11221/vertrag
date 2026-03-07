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

function Modal({ item, onClose, tp }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKey); };
  }, [onClose]);

  if (!item) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', animation: 'fadeIn 0.2s ease' }}>
      <div onClick={e => e.stopPropagation()} className="modal-inner" style={{ background: 'linear-gradient(145deg, #13141f, #0f1019)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, width: '100%', maxWidth: 680, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.8)', animation: 'fadeSlideUp 0.3s cubic-bezier(0.4,0,0.2,1)', position: 'relative' }}>
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
            <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e74c3c' }}>{tp.available}</span>
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: '#fff', letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1.2 }}>{item.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.92rem', lineHeight: 1.85, marginBottom: 28 }}>{item.desc}</p>
          <div className="modal-specs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
            {[
              { label: tp.specAvail,    value: tp.specAvailVal },
              { label: tp.specDelivery, value: tp.specDeliveryVal },
              { label: tp.specMin,      value: tp.specMinVal },
              { label: tp.specCustom,   value: tp.specCustomVal },
            ].map((spec, i) => (
              <div key={i} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{spec.label}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{spec.value}</div>
              </div>
            ))}
          </div>
          <div className="modal-btns" style={{ display: 'flex', gap: 10 }}>
            <Link to="/despre#contact" onClick={onClose} className="btn btn-red" style={{ flex: 1, justifyContent: 'center', borderRadius: 99 }}>{tp.requestBtn}</Link>
            <button onClick={onClose} className="btn btn-outline" style={{ borderRadius: 99, padding: '13px 24px' }}>{tp.closeBtn}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const CATEGORII = {
  ro: [
    { img: '/images/img1.jpg', title: 'Pungi Vid', slug: 'pungi-vid', tag: 'Top vânzări', filter: 'Alimentar', desc: 'Conservă produsele eliminând aerul și menținând un mediu sigilat. Disponibile în multiple dimensiuni și grosimi.', subcategorii: [
      { img: '/images/img1_1.jpg', title: 'Pungi vid netede pentru carne', desc: 'Protecție sigură și prospețime de durată.' },
      { img: '/images/img1_2.jpg', title: 'Pungi vid netede pentru brânzeturi', desc: 'Protecție sigură și prospețime de durată.' },
      { img: '/images/img1_3.jpg', title: 'Pungi vid gofrate', desc: 'Ambalaj flexibil pentru vidat acasă sau profesional.' },
      { img: '/images/img1_4.jpg', title: 'Pungi vid termocontractibile pentru carne', desc: 'Ambalaj cu efect premium pentru protecție maximă.' },
      { img: '/images/img1_5.jpg', title: 'Pungi vid termocontractibile pentru maturare cașcaval', desc: 'Ambalaj cu efect premium pentru protecție maximă.' },
      { img: '/images/img1_6.jpg', title: 'Pungi vid pentru tratamente termice', desc: 'Ambalaj cu efect premium pentru protecție maximă.' },
    ]},
    { img: '/images/img2.jpg', title: 'Filme & Folii Alimentare', slug: 'filme-folii', tag: null, filter: 'Alimentar', desc: 'Protejează și conservă, asigurând igienă și siguranță maximă pentru orice tip de produs alimentar.', subcategorii: [
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
    ]},
    { img: '/images/img3.jpg', title: 'Caserole, Tăvițe, Boluri', slug: 'caserole', tag: null, filter: 'Alimentar', desc: 'Eficiente, sigure și atractive pentru orice tip de aliment. Compatibile cu linia de termoformare.', subcategorii: [
      { img: '/images/img3_1.jpg', title: 'Caserole PP', desc: 'Rezistență termică și versatilitate pentru ambalarea alimentelor.' },
      { img: '/images/img3_2.jpg', title: 'Caserole PET/PE', desc: 'Vizibilitate superioară și protecție eficientă pentru alimentele tale.' },
      { img: '/images/img3_3.jpg', title: 'Caserole Skin', desc: 'Ambalaj premium care pune produsul în valoare.' },
      { img: '/images/img3_4.jpg', title: 'Caserole PSE', desc: 'Ambalaj ușor, igienic și termoizolant pentru produse alimentare.' },
      { img: '/images/img3_5.jpg', title: 'Cartoane Skin', desc: 'Ambalaj sustenabil cu impact vizual puternic.' },
      { img: '/images/img3_6.jpg', title: 'Caserole Mono PET', desc: 'Ambalaj sustenabil, 100% reciclabil, cu claritate și performanță.' },
    ]},
    { img: '/images/img4.jpg', title: 'Membrane Poliamidice', slug: 'membrane', tag: null, filter: 'Industrial', desc: 'Eficiente, durabile, folosite în varii procese industriale și alimentare de înaltă exigență.', subcategorii: [
      { img: '/images/img4_1.jpg', title: 'Membrane poliamidice pentru mezeluri', desc: 'Ambalaj de înaltă performanță pentru produse din carne și nu numai.' },
      { img: '/images/img4_2.jpg', title: 'Membrane poliamidice pentru Pet Food', desc: 'Ambalaj sigur, igienic și adaptat nevoilor industriei de hrană pentru animale.' },
    ]},
    { img: '/images/img5.jpg', title: 'Hârtie & Absorbante', slug: 'hartie', tag: null, filter: 'Alimentar', desc: 'Mențin alimentele proaspete, absorb lichide și grăsimi. Ideal pentru carne, pește și preparate.', subcategorii: [
      { img: '/images/img5_1.jpg', title: 'Absorbante alimentare celulozice', desc: 'Igienă și prospețime pentru produsele alimentare proaspete.' },
      { img: '/images/img5_2.jpg', title: 'Super-absorbante alimentare', desc: 'Performanță maximă pentru produse cu exudat ridicat.' },
      { img: '/images/img5_3.jpg', title: 'Hârtie cerată / Kraft', desc: 'Protecție naturală și prezentare elegantă.' },
    ]},
    { img: '/images/img6.jpg', title: 'Rumeguș pentru Afumare', slug: 'rumegus', tag: null, filter: 'Alimentar', desc: 'Pentru aromă intensă și gust autentic de fum natural. Disponibil în mai multe esențe de lemn.', subcategorii: [
      { img: '/images/img6_1.jpg', title: 'Rumeguș pentru afumare', desc: 'Descoperă secretul aromelor autentice: rumegușul natural pentru afumare!.' },
    ]},
    { img: '/images/img7.jpg', title: 'Echipamente de Ambalare', slug: 'echipamente', tag: 'Nou', filter: 'Echipamente', desc: 'Performante, 100% compatibile cu gama noastră de produse. Service și suport tehnic inclus.', subcategorii: [
      { img: '/images/img7_1.jpg', title: 'Echipamente pentru ambalare', desc: 'Soluții inteligente pentru un proces eficient și sigur.' },
    ]},
  ],
  en: [
    { img: '/images/img1.jpg', title: 'Vacuum Bags', slug: 'pungi-vid', tag: 'Top sales', filter: 'Food', desc: 'Preserve products by removing air and maintaining a sealed environment. Available in multiple sizes and thicknesses.', subcategorii: [
      { img: '/images/img1_1.jpg', title: 'Smooth vacuum bags for meat', desc: 'Safe protection and lasting freshness.' },
      { img: '/images/img1_2.jpg', title: 'Smooth vacuum bags for cheese', desc: 'Safe protection and lasting freshness.' },
      { img: '/images/img1_3.jpg', title: 'Embossed vacuum bags', desc: 'Flexible packaging for home or professional vacuum sealing.' },
      { img: '/images/img1_4.jpg', title: 'Shrink vacuum bags for meat', desc: 'Premium packaging for maximum protection.' },
      { img: '/images/img1_5.jpg', title: 'Shrink vacuum bags for cheese ripening', desc: 'Premium packaging for maximum protection.' },
      { img: '/images/img1_6.jpg', title: 'Vacuum bags for heat treatment', desc: 'Premium packaging for maximum protection.' },
    ]},
    { img: '/images/img2.jpg', title: 'Food Films & Foils', slug: 'filme-folii', tag: null, filter: 'Food', desc: 'Protect and preserve, ensuring maximum hygiene and safety for any type of food product.', subcategorii: [
      { img: '/images/img2_1.jpg', title: 'Flexible films', desc: 'Smart packaging for performance, versatility and optimal protection.' },
      { img: '/images/img2_2.jpg', title: 'Rigid films', desc: 'Solid packaging for superior protection and impeccable presentation.' },
      { img: '/images/img2_3.jpg', title: 'Laminated films', desc: 'Smart packaging with superior protection and impeccable image.' },
      { img: '/images/img2_4.jpg', title: 'Tray sealing films (ATM)', desc: 'Secure sealing and extended freshness.' },
      { img: '/images/img2_5.jpg', title: 'Skin films', desc: 'Premium packaging with total protection and maximum visibility.' },
      { img: '/images/img2_6.jpg', title: 'Laminated Flow-Pack films', desc: 'Fast, safe and attractive packaging for high-volume products.' },
      { img: '/images/img2_7.jpg', title: 'Micro-perforated Flow-Pack films', desc: 'Breathable packaging for natural freshness.' },
      { img: '/images/img2_8.jpg', title: 'Macro-perforated Flow-Pack films', desc: ' ' },
      { img: '/images/img2_9.jpg', title: 'Food stretch films', desc: 'Flexible packaging for daily freshness and hygiene.' },
      { img: '/images/img2_10.jpg', title: 'Manual pallet stretch films', desc: 'Efficient protection, simple wrapping.' },
      { img: '/images/img2_11.jpg', title: 'Automatic pallet stretch films', desc: 'Performance at maximum speed.' },
      { img: '/images/img2_12.jpg', title: 'Polyolefin shrink films', desc: 'Transparent, safe and elegant packaging.' },
      { img: '/images/img2_13.jpg', title: 'FlowVac shrink films', desc: 'High-performance packaging for total freshness and protection.' },
      { img: '/images/img2_14.jpg', title: 'Polyethylene films', desc: 'Simplicity, versatility and protection for any application.' },
      { img: '/images/img2_15.jpg', title: 'Crate liner bags', desc: 'Hygienic and practical protection in food transport.' },
      { img: '/images/img2_16.jpg', title: 'Slaughter bags', desc: 'Hygiene, protection and efficiency in meat processing.' },
    ]},
    { img: '/images/img3.jpg', title: 'Trays, Containers, Bowls', slug: 'caserole', tag: null, filter: 'Food', desc: 'Efficient, safe and attractive for any type of food. Compatible with thermoforming line.', subcategorii: [
      { img: '/images/img3_1.jpg', title: 'PP trays', desc: 'Thermal resistance and versatility for food packaging.' },
      { img: '/images/img3_2.jpg', title: 'PET/PE trays', desc: 'Superior visibility and efficient protection for your food.' },
      { img: '/images/img3_3.jpg', title: 'Skin trays', desc: 'Premium packaging that showcases the product.' },
      { img: '/images/img3_4.jpg', title: 'PSE trays', desc: 'Lightweight, hygienic and thermally insulating food packaging.' },
      { img: '/images/img3_5.jpg', title: 'Skin cartons', desc: 'Sustainable packaging with strong visual impact.' },
      { img: '/images/img3_6.jpg', title: 'Mono PET trays', desc: 'Sustainable, 100% recyclable packaging with clarity and performance.' },
    ]},
    { img: '/images/img4.jpg', title: 'Polyamide Membranes', slug: 'membrane', tag: null, filter: 'Industrial', desc: 'Efficient, durable, used in various high-demand industrial and food processes.', subcategorii: [
      { img: '/images/img4_1.jpg', title: 'Polyamide membranes for deli meats', desc: 'High-performance packaging for meat products and more.' },
      { img: '/images/img4_2.jpg', title: 'Polyamide membranes for Pet Food', desc: 'Safe, hygienic packaging adapted to the pet food industry.' },
    ]},
    { img: '/images/img5.jpg', title: 'Paper & Absorbents', slug: 'hartie', tag: null, filter: 'Food', desc: 'Keep food fresh, absorb liquids and fats. Ideal for meat, fish and prepared foods.', subcategorii: [
      { img: '/images/img5_1.jpg', title: 'Cellulosic food absorbent pads', desc: 'Hygiene and freshness for fresh food products.' },
      { img: '/images/img5_2.jpg', title: 'Super-absorbent food pads', desc: 'Maximum performance for high-exudate products.' },
      { img: '/images/img5_3.jpg', title: 'Waxed / Kraft paper', desc: 'Natural protection and elegant presentation.' },
    ]},
    { img: '/images/img6.jpg', title: 'Smoking Sawdust', slug: 'rumegus', tag: null, filter: 'Food', desc: 'For intense aroma and authentic natural smoke flavor. Available in multiple wood essences.', subcategorii: [
      { img: '/images/img6_1.jpg', title: 'Smoking sawdust', desc: 'Discover the secret of authentic aromas: natural smoking sawdust!' },
    ]},
    { img: '/images/img7.jpg', title: 'Packaging Equipment', slug: 'echipamente', tag: 'New', filter: 'Equipment', desc: 'High-performance, 100% compatible with our entire product range. Service and technical support included.', subcategorii: [
      { img: '/images/img7_1.jpg', title: 'Packaging equipment', desc: 'Smart solutions for an efficient and safe process.' },
    ]},
  ],
  ru: [
    { img: '/images/img1.jpg', title: 'Вакуумные пакеты', slug: 'pungi-vid', tag: 'Топ продаж', filter: 'Пищевые', desc: 'Сохраняют продукты, удаляя воздух и поддерживая герметичную среду. Доступны в различных размерах и толщинах.', subcategorii: [
      { img: '/images/img1_1.jpg', title: 'Гладкие вакуумные пакеты для мяса', desc: 'Надёжная защита и длительная свежесть.' },
      { img: '/images/img1_2.jpg', title: 'Гладкие вакуумные пакеты для сыра', desc: 'Надёжная защита и длительная свежесть.' },
      { img: '/images/img1_3.jpg', title: 'Рифлёные вакуумные пакеты', desc: 'Гибкая упаковка для вакуумирования дома или профессионально.' },
      { img: '/images/img1_4.jpg', title: 'Термоусадочные вакуумные пакеты для мяса', desc: 'Премиум упаковка для максимальной защиты.' },
      { img: '/images/img1_5.jpg', title: 'Термоусадочные пакеты для созревания сыра', desc: 'Премиум упаковка для максимальной защиты.' },
      { img: '/images/img1_6.jpg', title: 'Вакуумные пакеты для термообработки', desc: 'Премиум упаковка для максимальной защиты.' },
    ]},
    { img: '/images/img2.jpg', title: 'Пищевые пленки и фольга', slug: 'filme-folii', tag: null, filter: 'Пищевые', desc: 'Защищают и сохраняют, обеспечивая максимальную гигиену и безопасность для любого пищевого продукта.', subcategorii: [
      { img: '/images/img2_1.jpg', title: 'Гибкие пленки', desc: 'Умная упаковка для производительности, универсальности и оптимальной защиты.' },
      { img: '/images/img2_2.jpg', title: 'Жёсткие пленки', desc: 'Прочная упаковка для превосходной защиты и безупречной презентации.' },
      { img: '/images/img2_3.jpg', title: 'Ламинированные пленки', desc: 'Умная упаковка с превосходной защитой и безупречным внешним видом.' },
      { img: '/images/img2_4.jpg', title: 'Пленки для запечатывания лотков (ATM)', desc: 'Надёжная герметизация и продлённая свежесть.' },
      { img: '/images/img2_5.jpg', title: 'Скин-пленки', desc: 'Премиум упаковка с полной защитой и максимальной видимостью.' },
      { img: '/images/img2_6.jpg', title: 'Ламинированные пленки Flow-Pack', desc: 'Быстрая, безопасная и привлекательная упаковка для интенсивного производства.' },
      { img: '/images/img2_7.jpg', title: 'Микроперфорированные пленки Flow-Pack', desc: 'Дышащая упаковка для естественной свежести.' },
      { img: '/images/img2_8.jpg', title: 'Макроперфорированные пленки Flow-Pack', desc: ' ' },
      { img: '/images/img2_9.jpg', title: 'Пищевые стретч-пленки', desc: 'Гибкая упаковка для ежедневной свежести и гигиены.' },
      { img: '/images/img2_10.jpg', title: 'Стретч-пленки для ручной паллетизации', desc: 'Эффективная защита, простая обмотка.' },
      { img: '/images/img2_11.jpg', title: 'Стретч-пленки для автоматической паллетизации', desc: 'Производительность на максимальной скорости.' },
      { img: '/images/img2_12.jpg', title: 'Термоусадочные пленки из полиолефина', desc: 'Прозрачная, безопасная и элегантная упаковка.' },
      { img: '/images/img2_13.jpg', title: 'Термоусадочные пленки FlowVac', desc: 'Высокопроизводительная упаковка для полной свежести и защиты.' },
      { img: '/images/img2_14.jpg', title: 'Полиэтиленовые пленки', desc: 'Простота, универсальность и защита для любого применения.' },
      { img: '/images/img2_15.jpg', title: 'Мешки для ящиков', desc: 'Гигиеническая и практичная защита при транспортировке продуктов.' },
      { img: '/images/img2_16.jpg', title: 'Мешки для забоя', desc: 'Гигиена, защита и эффективность при переработке мяса.' },
    ]},
    { img: '/images/img3.jpg', title: 'Лотки, контейнеры, миски', slug: 'caserole', tag: null, filter: 'Пищевые', desc: 'Эффективные, безопасные и привлекательные для любого типа продуктов. Совместимы с линией термоформования.', subcategorii: [
      { img: '/images/img3_1.jpg', title: 'Лотки PP', desc: 'Термическая стойкость и универсальность для упаковки продуктов.' },
      { img: '/images/img3_2.jpg', title: 'Лотки PET/PE', desc: 'Превосходная видимость и эффективная защита продуктов.' },
      { img: '/images/img3_3.jpg', title: 'Скин-лотки', desc: 'Премиум упаковка, которая выгодно подчёркивает продукт.' },
      { img: '/images/img3_4.jpg', title: 'Лотки PSE', desc: 'Лёгкая, гигиеничная и теплоизолирующая пищевая упаковка.' },
      { img: '/images/img3_5.jpg', title: 'Скин-картоны', desc: 'Экологичная упаковка с сильным визуальным воздействием.' },
      { img: '/images/img3_6.jpg', title: 'Лотки Mono PET', desc: 'Экологичная, 100% перерабатываемая упаковка с ясностью и производительностью.' },
    ]},
    { img: '/images/img4.jpg', title: 'Полиамидные мембраны', slug: 'membrane', tag: null, filter: 'Промышленные', desc: 'Эффективные, долговечные, применяемые в различных высококачественных промышленных и пищевых процессах.', subcategorii: [
      { img: '/images/img4_1.jpg', title: 'Полиамидные мембраны для колбасных изделий', desc: 'Высокопроизводительная упаковка для мясных продуктов и не только.' },
      { img: '/images/img4_2.jpg', title: 'Полиамидные мембраны для Pet Food', desc: 'Безопасная, гигиеничная упаковка для индустрии кормов для животных.' },
    ]},
    { img: '/images/img5.jpg', title: 'Бумага и абсорбенты', slug: 'hartie', tag: null, filter: 'Пищевые', desc: 'Сохраняют свежесть продуктов, впитывают жидкости и жиры. Идеально для мяса, рыбы и полуфабрикатов.', subcategorii: [
      { img: '/images/img5_1.jpg', title: 'Целлюлозные пищевые абсорбирующие прокладки', desc: 'Гигиена и свежесть для свежих пищевых продуктов.' },
      { img: '/images/img5_2.jpg', title: 'Суперабсорбирующие пищевые прокладки', desc: 'Максимальная производительность для продуктов с высоким выделением жидкости.' },
      { img: '/images/img5_3.jpg', title: 'Вощёная / крафт-бумага', desc: 'Натуральная защита и элегантная презентация.' },
    ]},
    { img: '/images/img6.jpg', title: 'Щепа для копчения', slug: 'rumegus', tag: null, filter: 'Пищевые', desc: 'Для интенсивного аромата и подлинного вкуса натурального дыма. Доступна в нескольких породах дерева.', subcategorii: [
      { img: '/images/img6_1.jpg', title: 'Щепа для копчения', desc: 'Откройте секрет подлинных ароматов: натуральная щепа для копчения!' },
    ]},
    { img: '/images/img7.jpg', title: 'Упаковочное оборудование', slug: 'echipamente', tag: 'Новое', filter: 'Оборудование', desc: 'Высокопроизводительное, 100% совместимое с нашим ассортиментом. Сервис и техническая поддержка включены.', subcategorii: [
      { img: '/images/img7_1.jpg', title: 'Упаковочное оборудование', desc: 'Умные решения для эффективного и безопасного процесса.' },
    ]},
  ],
};

export default function Produse() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const tp = t.produse;
  const cats = CATEGORII[lang];
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedSub, setSelectedSub] = useState(null);

  const FILTERS = [
    { key: 'all',    label: tp.filterAll },
    { key: 'food',   label: tp.filterFood },
    { key: 'ind',    label: tp.filterIndustrial },
    { key: 'equip',  label: tp.filterEquip },
  ];

  const FILTER_MAP = {
    ro: { food: 'Alimentar', ind: 'Industrial', equip: 'Echipamente' },
    en: { food: 'Food',      ind: 'Industrial', equip: 'Equipment' },
    ru: { food: 'Пищевые',   ind: 'Промышленные', equip: 'Оборудование' },
  };

  const filtered = activeFilter === 'all' ? cats : cats.filter(c => c.filter === FILTER_MAP[lang][activeFilter]);

  // SUBCATEGORY PAGE
  if (slug) {
    const cat = cats.find(c => c.slug === slug);
    if (!cat) return (
      <div style={{ padding: '120px 32px', textAlign: 'center' }}>
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>{tp.comingSoon}</div>
        <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 16, marginBottom: 32 }}>{tp.comingSoonDesc}</p>
        <Link to="/produse" className="btn btn-outline" style={{ borderRadius: 99 }}>{tp.backBtn}</Link>
      </div>
    );
    return (
      <div>
        <div style={{ position: 'relative', overflow: 'hidden', background: '#0a0b14' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${cat.img})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07, filter: 'blur(3px)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,9,20,0.97) 40%, rgba(231,76,60,0.05) 100%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.5), transparent)' }} />
          <div className="container page-header-inner" style={{ position: 'relative', zIndex: 1, padding: '80px 32px 64px' }}>
            <div className="breadcrumb">
              <Link to="/">{tp.breadHome}</Link><span className="sep">/</span>
              <Link to="/produse">{t.nav.produse}</Link><span className="sep">/</span>
              <span className="current">{cat.title}</span>
            </div>
            <div className="page-header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginTop: 8 }}>
              <div>
                {cat.tag && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.25)', borderRadius: 99, marginBottom: 20 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#e74c3c', display: 'inline-block' }} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e74c3c' }}>{cat.tag}</span>
                  </div>
                )}
                <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 20 }}>{cat.title}</h1>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 420, marginBottom: 36 }}>{cat.desc}</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>{tp.requestBtn}</Link>
                  <Link to="/produse" className="btn btn-outline" style={{ borderRadius: 99 }}>{tp.backBtn}</Link>
                </div>
              </div>
              <div className="page-header-image" style={{ position: 'relative', height: 320, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,9,20,0.6) 0%, transparent 60%)' }} />
              </div>
            </div>
          </div>
        </div>

        <section className="section" style={{ background: '#080910' }}>
          <div className="container">
            <Reveal style={{ marginBottom: 48 }}>
              <div className="section-eyebrow">{tp.typesAvailable}</div>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em' }}>
                {tp.variantsOf} <span style={{ color: '#e74c3c' }}>{cat.title}</span>
              </h2>
            </Reveal>
            <div className="card-grid">
              {cat.subcategorii.map((sub, i) => (
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
                      <div style={{ marginTop: 16, fontSize: '0.78rem', color: '#e74c3c', fontWeight: 600 }}>{tp.seeDetails}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal style={{ marginTop: 48 }}>
              <div style={{ background: 'linear-gradient(135deg, #0f1019, #0c0d16)', border: '1px solid rgba(231,76,60,0.2)', borderRadius: 20, padding: '40px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.5), transparent)' }} />
                <div>
                  <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.6rem', fontWeight: 400, color: '#fff', marginBottom: 8 }}>{tp.noVariant}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.88rem', lineHeight: 1.7 }}>{tp.noVariantDesc}</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>{tp.contactBtn}</Link>
                  <Link to="/produse" className="btn btn-outline" style={{ borderRadius: 99 }}>{tp.allBtn}</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        {selectedSub && <Modal item={selectedSub} onClose={() => setSelectedSub(null)} tp={tp} />}
      </div>
    );
  }

  // MAIN LISTING PAGE
  const STATS = [
    { value: '20+',   label: tp.statGroups },
    { value: '2,000+', label: tp.statTypes },
    { value: '20+',   label: tp.statYears },
    { value: '6',     label: tp.statMarkets },
  ];

  return (
    <div>
      <div style={{ position: 'relative', overflow: 'hidden', background: '#0a0b14' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/img1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08, filter: 'blur(2px)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,9,20,0.97) 40%, rgba(231,76,60,0.06) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.5), transparent)' }} />
        <div className="container page-header-inner" style={{ position: 'relative', zIndex: 1, padding: '80px 32px 64px' }}>
          <div className="breadcrumb">
            <Link to="/">{tp.breadHome}</Link><span className="sep">/</span>
            <span className="current">{t.nav.produse}</span>
          </div>
          <div className="page-header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="section-eyebrow">{tp.eyebrow}</div>
              <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 20 }}>
                {tp.title1}<br /><span style={{ color: '#e74c3c' }}>{tp.title2}</span> {tp.title3}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 420, marginBottom: 36 }}>{tp.desc}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>{tp.btn1}</Link>
                <Link to="/industrii" className="btn btn-outline" style={{ borderRadius: 99 }}>{tp.btn2}</Link>
              </div>
            </div>
            <div className="page-header-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
                <span style={{ color: '#fff', fontWeight: 600 }}>{filtered.length}</span> {tp.countLabel}
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
                <Link to={`/produse/${p.slug}`} className="card" style={{ display: 'block', height: '100%' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: 200, background: '#0f1019' }}>
                    <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,11,20,0.7) 0%, transparent 50%)' }} />
                    {p.tag && <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 10px', background: 'rgba(231,76,60,0.9)', borderRadius: 99, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff' }}>{p.tag}</div>}
                    <div style={{ position: 'absolute', bottom: 12, left: 12, padding: '3px 10px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', borderRadius: 99, fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {p.subcategorii.length} {tp.typesCount}
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-title" style={{ fontSize: '1rem', marginBottom: 10 }}>{p.title}</div>
                    <div className="card-desc">{p.desc}</div>
                    <div style={{ marginTop: 18, fontSize: '0.78rem', color: '#e74c3c', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>{tp.seeTypes}</div>
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
              <div className="cta-banner" style={{ background: 'linear-gradient(135deg, #0f1019, #0c0d16)', border: '1px solid rgba(231,76,60,0.2)', borderRadius: 20, padding: '52px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 40, flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.5), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: 200, height: 200, background: 'radial-gradient(circle, rgba(231,76,60,0.08), transparent 70%)', pointerEvents: 'none' }} />
                <div>
                  <div className="section-eyebrow">{tp.colabEyebrow}</div>
                  <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: '#fff', letterSpacing: '-0.03em', marginBottom: 8 }}>{tp.ctaTitle}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.88rem', maxWidth: 380, lineHeight: 1.7 }}>{tp.ctaDesc}</p>
                </div>
                <div className="cta-banner-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link to="/despre#contact" className="btn btn-red" style={{ borderRadius: 99 }}>{tp.ctaBtn1}</Link>
                  <Link to="/despre" className="btn btn-outline" style={{ borderRadius: 99 }}>{tp.ctaBtn2}</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
}