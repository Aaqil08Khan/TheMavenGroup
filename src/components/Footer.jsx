import { Link } from 'react-router-dom'
import {
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const verticals = [
  { label: 'Maven Business Services', path: '/verticals/business-services', color: '#3B82F6' },
  { label: 'Maven AI Tech', path: '/verticals/ai-tech', color: '#22D3EE' },
  { label: 'Maven Contractors', path: '/verticals/contractors', color: '#F59E0B' },
  { label: 'Maven E-Commerce', path: '/verticals/ecommerce', color: '#FB7185' },
]

const company = [
  { label: 'About The Group', path: '/about' },
  { label: 'Global Presence', path: '/presence' },
  { label: 'Social Impact', path: '/impact' },
  { label: 'Investors', path: '/investors' },
  { label: 'The Islamic Family', path: '/initiative' },
]

const markets = [
  { flag: '🇮🇳', label: 'India', sub: 'Headquarters & Market Operations' },
  { flag: '🇸🇦', label: 'Saudi Arabia', sub: 'AI Tech & Infrastructure' },
  { flag: '🇦🇪', label: 'UAE', sub: 'Investment & E-Commerce' },
]

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/mavenaitech/', label: 'Facebook' },
  { icon: Linkedin, href: 'https://linkedin.com/company/maven-ai-tech', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/maven_aitech?igsh=MTFsZWtpMXNuZXYwMA==', label: 'Instagram' },
]

export default function Footer() {
  return (
    <>
      <footer style={{
        background: '#060F1A',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Top glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: '600px', height: '1px',
          background: 'linear-gradient(90deg, transparent, #3B82F6, #22D3EE, transparent)',
        }} />

        {/* Background radial */}
        <div style={{
          position: 'absolute', top: '-100px', left: '50%',
          transform: 'translateX(-50%)',
          width: '800px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(26,86,219,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* MAIN CONTENT */}
        <div className="tmg-footer-wrap">

          {/* 4-col grid */}
          <div className="tmg-footer-grid">

            {/* Col 1 — Brand */}
            <div className="tmg-footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                  background: 'linear-gradient(135deg, #1A56DB, #22D3EE)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Syne, sans-serif', fontWeight: '800', fontSize: '16px', color: 'white',
                }}>
                  TM
                </div>
                <div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '15px', color: '#F8FAFC', lineHeight: '1.1' }}>
                    The Maven's Group
                  </div>
                  <div style={{ fontSize: '10px', color: '#22D3EE', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    Global Holdings
                  </div>
                </div>
              </div>

              <p style={{ color: '#475569', fontSize: '13px', lineHeight: '1.8', marginBottom: '24px' }}>
                A diversified global holding group engineering growth across India,
                Saudi Arabia, UAE and international markets through technology,
                operations, and strategic partnerships.
              </p>

              {/* Market presence */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
                {markets.map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '16px' }}>{m.flag}</span>
                    <div>
                      <span style={{ color: '#64748B', fontSize: '12px', fontWeight: '500' }}>{m.label}</span>
                      <span style={{ color: '#334155', fontSize: '11px', marginLeft: '6px' }}>· {m.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label} href={href}
                    target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#475569', cursor: 'pointer',
                      transition: 'all 0.2s ease', textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(59,130,246,0.1)'
                      e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.color = '#ffffff'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.color = '#475569'
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Verticals */}
            <div>
              <div className="tmg-footer-col-title">Verticals</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {verticals.map((item, i) => (
                  <Link key={i} to={item.path}
                    style={{
                      color: '#475569', fontSize: '13px', textDecoration: 'none',
                      transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '8px',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = item.color; e.currentTarget.style.paddingLeft = '4px' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.paddingLeft = '0px' }}
                  >
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 3 — Company */}
            <div>
              <div className="tmg-footer-col-title">Company</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {company.map((item, i) => (
                  <Link key={i} to={item.path}
                    style={{
                      color: '#475569', fontSize: '13px', textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#3B82F6'; e.currentTarget.style.paddingLeft = '4px' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.paddingLeft = '0px' }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 4 — Connect */}
            <div>
              <div className="tmg-footer-col-title">Connect</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <a href="mailto:info@mavenaitech.com"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569', fontSize: '12px', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'}
                  onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                >
                  <Mail size={15} style={{ flexShrink: 0 }} />
                  info@mavenaitech.com
                </a>

                <a href="tel:+919381472914"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569', fontSize: '12px', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'}
                  onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                >
                  <Phone size={15} style={{ flexShrink: 0 }} />
                  +91 9381472914
                </a>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <MapPin size={15} style={{ flexShrink: 0, marginTop: '2px', color: '#475569' }} />
                  <span style={{ color: '#475569', fontSize: '12px', lineHeight: '1.7' }}>
                    5th floor, Bait al Rahma, Shaikpet,<br />
                    Hyderabad, Telangana - 500008
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div style={{ marginTop: '28px' }}>
                <Link to="/investors" style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      padding: '12px 20px',
                      background: 'linear-gradient(135deg, rgba(26,86,219,0.2), rgba(34,211,238,0.1))',
                      border: '1px solid rgba(59,130,246,0.25)',
                      borderRadius: '10px', cursor: 'pointer', transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(26,86,219,0.3), rgba(34,211,238,0.15))'
                      e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(26,86,219,0.2), rgba(34,211,238,0.1))'
                      e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '13px', color: '#60A5FA', marginBottom: '2px' }}>
                      Investor Relations →
                    </div>
                    <div style={{ color: '#334155', fontSize: '11px' }}>View strategy overview</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
            marginBottom: '28px',
          }} />

          {/* Bottom bar */}
          <div className="tmg-footer-bottom">
            <div style={{ color: '#334155', fontSize: '12px' }}>
              © {new Date().getFullYear()} The Maven's Group. All rights reserved. · Engineered for global growth.
            </div>

            <div className="tmg-footer-legal">
              {['Privacy Policy', 'Terms of Use', 'Governance'].map((item, i) => (
                <span key={i}
                  style={{ color: '#334155', fontSize: '12px', cursor: 'pointer', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'}
                  onMouseLeave={e => e.currentTarget.style.color = '#334155'}
                >
                  {item}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#34D399', animation: 'tmgPulse 2s infinite',
                boxShadow: '0 0 6px #34D399', flexShrink: 0,
              }} />
              <span style={{ color: '#334155', fontSize: '11px', whiteSpace: 'nowrap' }}>All systems live</span>
            </div>
          </div>

        </div>
      </footer>

      <style>{`
        @keyframes tmgPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .tmg-footer-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 72px 32px 40px;
          position: relative;
          z-index: 1;
        }

        /* ── Desktop: 4-col ── */
        .tmg-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .tmg-footer-col-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 12px;
          color: #F8FAFC;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .tmg-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .tmg-footer-legal {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        /* ── Tablet ≤ 960px: 2-col ── */
        @media (max-width: 960px) {
          .tmg-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px 32px;
          }
          /* Brand spans full row */
          .tmg-footer-brand {
            grid-column: 1 / -1;
          }
        }

        /* ── Mobile ≤ 600px: single col ── */
        @media (max-width: 600px) {
          .tmg-footer-wrap {
            padding: 48px 20px 32px;
          }

          .tmg-footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
            margin-bottom: 40px;
          }

          .tmg-footer-brand {
            grid-column: auto;
          }

          /* Divider lines between sections */
          .tmg-footer-grid > div:not(.tmg-footer-brand) {
            padding-top: 24px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
          }

          .tmg-footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }

          .tmg-footer-legal {
            gap: 16px;
          }
        }

        /* ── Small mobile ≤ 380px ── */
        @media (max-width: 380px) {
          .tmg-footer-wrap {
            padding: 36px 16px 28px;
          }
        }
      `}</style>
    </>
  )
}