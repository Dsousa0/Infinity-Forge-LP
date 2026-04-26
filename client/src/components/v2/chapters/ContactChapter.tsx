// client/src/components/v2/chapters/ContactChapter.tsx
import { useState } from 'react';
import type { I18nContent } from '@/lib/i18n-v2';

interface ContactChapterProps {
  t: I18nContent;
}

export default function ContactChapter({ t }: ContactChapterProps) {
  const [sent, setSent] = useState(false);

  return (
    <div className="v2-chapter">
      <div className="v2-contact">
        <div>
          <div className="sec-eyebrow">{t.contact.eyebrow}</div>
          <h2 className="sec-title" style={{ fontSize: 'clamp(36px, 4.2vw, 60px)' }}>
            {t.contact.title}
          </h2>
          <p className="sec-sub">{t.contact.sub}</p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 16,
            padding: '10px 16px', border: '1px solid rgba(201,138,75,0.3)',
            borderRadius: 999, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ember)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ember)', boxShadow: '0 0 8px var(--ember)', flexShrink: 0 }} />
            {t.contact.email}
          </div>
        </div>

        <form
          className="v2-contact-form"
          onSubmit={e => { e.preventDefault(); setSent(true); }}
        >
          <input className="v2-contact-input" placeholder={t.contact.ph_name} required />
          <input className="v2-contact-input" type="email" placeholder={t.contact.ph_email} required />
          <input className="v2-contact-input" placeholder={t.contact.ph_company} />
          <textarea className="v2-contact-textarea" placeholder={t.contact.ph_msg} required />
          <button
            type="submit"
            className="v2-cta v2-cta-primary v2-contact-submit"
            disabled={sent}
          >
            {sent ? 'Recebido ✓' : t.contact.cta}
            {!sent && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
