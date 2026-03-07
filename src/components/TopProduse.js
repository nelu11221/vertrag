import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const FEATURED = [
  { img: '/images/section2img1.jpg', title: { ro: 'Pungi vid netede pentru carne',      en: 'Smooth vacuum bags for meat',      ru: 'Гладкие вакуумные пакеты для мяса'            }, slug: 'pungi-vid' },
  { img: '/images/section2img2.jpg', title: { ro: 'Hârtie cerată / Kraft',               en: 'Waxed / Kraft paper',              ru: 'Вощёная / крафт-бумага'                       }, slug: 'hartie' },
  { img: '/images/section2img3.jpg', title: { ro: 'Pungi vid termocontractibile',         en: 'Shrink vacuum bags',               ru: 'Термоусадочные вакуумные пакеты'              }, slug: 'pungi-vid' },
  { img: '/images/section2img4.jpg', title: { ro: 'Filme flexibile',                      en: 'Flexible films',                   ru: 'Гибкие пленки'                                }, slug: 'filme-folii' },
  { img: '/images/section2img5.jpg', title: { ro: 'Filme Flow-Pack laminate',             en: 'Laminated Flow-Pack films',        ru: 'Ламинированные пленки Flow-Pack'              }, slug: 'filme-folii' },
  { img: '/images/section2img6.jpg', title: { ro: 'Pungi vid gofrate',                    en: 'Embossed vacuum bags',             ru: 'Рифлёные вакуумные пакеты'                    }, slug: 'pungi-vid' },
  { img: '/images/section2img7.jpg', title: { ro: 'Pungi vid tratamente termice',         en: 'Heat treatment vacuum bags',       ru: 'Вакуумные пакеты для термообработки'          }, slug: 'pungi-vid' },
  { img: '/images/section2img8.jpg', title: { ro: 'Filme rigide',                         en: 'Rigid films',                      ru: 'Жёсткие пленки'                               }, slug: 'filme-folii' },
];

export default function TopProduse() {
  const { lang, t } = useLang();

  return (
    <section style={{ background: '#0a0b14', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container" style={{ padding: '80px 32px' }}>

        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>{t.topProduse.eyebrow}</div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '-0.03em', marginBottom: 0 }}>
            {t.topProduse.title}
          </h2>
          <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #e74c3c, rgba(231,76,60,0.2))', borderRadius: 2, margin: '20px auto 0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {FEATURED.map((f, i) => (
            <Link to={`/produse/${f.slug}`} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ cursor: 'pointer' }}
                onMouseEnter={e => {
                  e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
                  e.currentTarget.querySelector('.feat-title').style.color = '#e74c3c';
                }}
                onMouseLeave={e => {
                  e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                  e.currentTarget.querySelector('.feat-title').style.color = '#fff';
                }}
              >
                <div style={{ overflow: 'hidden', borderRadius: 12, marginBottom: 16, background: '#0f1019', border: '1px solid rgba(255,255,255,0.06)', aspectRatio: '4/3' }}>
                  <img src={f.img} alt={f.title[lang]} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)' }} />
                </div>
                <div className="feat-title" style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', lineHeight: 1.4, transition: 'color 0.18s' }}>
                  {f.title[lang]}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/produse"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 600, color: '#e74c3c', padding: '10px 24px', border: '1px solid rgba(231,76,60,0.3)', borderRadius: 99, transition: 'all 0.18s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(231,76,60,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            {t.topProduse.allBtn}
          </Link>
        </div>
      </div>
    </section>
  );
}