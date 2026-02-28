import { Link } from 'react-router-dom'

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
  { flag: '🇮🇳', label: 'India', sub: 'Headquarters & Capital Markets' },
  { flag: '🇸🇦', label: 'Saudi Arabia', sub: 'AI Tech & Infrastructure' },
  { flag: '🇦🇪', label: 'UAE', sub: 'Investment & E-Commerce' },
]

export default function Footer() {
  return (
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

      {/* MAIN FOOTER CONTENT */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 32px 40px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '60px', marginBottom: '60px' }}>

          {/* Col 1 — Brand */}
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #1A56DB, #22D3EE)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Syne, sans-serif', fontWeight: '800',
                fontSize: '16px', color: 'white',
              }}>
                TM
              </div>
              <div>
                <div style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: '700',
                  fontSize: '15px', color: '#F8FAFC', lineHeight: '1.1',
                }}>
                  The Maven's Group
                </div>
                <div style={{ fontSize: '10px', color: '#22D3EE', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Global Holdings
                </div>
              </div>
            </div>

            <p style={{
              color: '#475569', fontSize: '13px', lineHeight: '1.8',
              maxWidth: '280px', marginBottom: '24px',
            }}>
              A diversified global holding group engineering growth across India,
              Saudi Arabia, UAE and international markets through technology,
              capital, and strategic partnerships.
            </p>

            {/* Market presence */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
              {markets.map((m, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <span style={{ fontSize: '16px' }}>{m.flag}</span>
                  <div>
                    <span style={{ color: '#64748B', fontSize: '12px', fontWeight: '500' }}>{m.label}</span>
                    <span style={{ color: '#334155', fontSize: '11px', marginLeft: '6px' }}>· {m.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: '💼', label: 'LinkedIn' },
                { icon: '🐦', label: 'Twitter' },
                { icon: '📸', label: 'Instagram' },
              ].map((social, i) => (
                <div key={i} style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(59,130,246,0.1)'
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {social.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Col 2 — Verticals */}
          <div>
            <div style={{
              fontFamily: 'Syne, sans-serif', fontWeight: '700',
              fontSize: '12px', color: '#F8FAFC',
              letterSpacing: '2px', textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Verticals
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {verticals.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  style={{
                    color: '#475569', fontSize: '13px',
                    textDecoration: 'none', transition: 'all 0.2s ease',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = item.color
                    e.currentTarget.style.paddingLeft = '4px'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#475569'
                    e.currentTarget.style.paddingLeft = '0px'
                  }}
                >
                  <div style={{
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: item.color, flexShrink: 0,
                  }} />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 — Company */}
          <div>
            <div style={{
              fontFamily: 'Syne, sans-serif', fontWeight: '700',
              fontSize: '12px', color: '#F8FAFC',
              letterSpacing: '2px', textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Company
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {company.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  style={{
                    color: '#475569', fontSize: '13px',
                    textDecoration: 'none', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#3B82F6'
                    e.currentTarget.style.paddingLeft = '4px'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#475569'
                    e.currentTarget.style.paddingLeft = '0px'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <div style={{
              fontFamily: 'Syne, sans-serif', fontWeight: '700',
              fontSize: '12px', color: '#F8FAFC',
              letterSpacing: '2px', textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Connect
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: '📧', label: 'partnerships@themavengroup.com', color: '#3B82F6' },
                { icon: '📍', label: 'India · Saudi Arabia · UAE', color: '#22D3EE' },
                { icon: '🕌', label: 'The Islamic Family Initiative', color: '#C8A96E' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '14px', marginTop: '1px' }}>{item.icon}</span>
                  <span style={{ color: '#475569', fontSize: '12px', lineHeight: '1.6' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: '28px' }}>
              <Link to="/investors" style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '12px 20px',
                  background: 'linear-gradient(135deg, rgba(26,86,219,0.2), rgba(34,211,238,0.1))',
                  border: '1px solid rgba(59,130,246,0.25)',
                  borderRadius: '10px',
                  cursor: 'pointer', transition: 'all 0.3s ease',
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
                  <div style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: '700',
                    fontSize: '13px', color: '#60A5FA', marginBottom: '2px',
                  }}>
                    Investor Relations →
                  </div>
                  <div style={{ color: '#334155', fontSize: '11px' }}>
                    View strategy & capital allocation
                  </div>
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
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        }}>
          <div style={{ color: '#334155', fontSize: '12px' }}>
            © {new Date().getFullYear()} The Maven's Group. All rights reserved. · Engineered for global growth.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Use', 'Governance'].map((item, i) => (
              <span key={i} style={{
                color: '#334155', fontSize: '12px', cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'}
                onMouseLeave={e => e.currentTarget.style.color = '#334155'}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Live indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#34D399',
              animation: 'pulse 2s infinite',
              boxShadow: '0 0 6px #34D399',
            }} />
            <span style={{ color: '#334155', fontSize: '11px' }}>All systems live</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </footer>
  )
}