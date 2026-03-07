import React from 'react';
import { useLang } from '../context/LanguageContext';

const LANGS = [
  { code: 'ro', label: 'RO' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
];

export default function LanguageSwitcher() {
  const { lang, switchLang } = useLang();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 99,
      padding: '3px',
    }}>
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchLang(code)}
          style={{
            padding: '5px 10px',
            borderRadius: 99,
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            transition: 'all 0.18s',
            background: lang === code
              ? 'linear-gradient(135deg, #e74c3c, #c0392b)'
              : 'transparent',
            color: lang === code ? '#fff' : 'rgba(255,255,255,0.35)',
            boxShadow: lang === code ? '0 2px 8px rgba(231,76,60,0.35)' : 'none',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}