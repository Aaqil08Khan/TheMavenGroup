import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const verticals = [
  { label: 'Business Services', path: '/verticals/business-services' },
  { label: 'AI Tech', path: '/verticals/ai-tech' },
  { label: 'Contractors', path: '/verticals/contractors' },
  { label: 'E-Commerce', path: '/verticals/ecommerce' },
]

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Global Presence', path: '/presence' },
  { label: 'Verticals', path: null, children: verticals },
  { label: 'Impact', path: '/impact' },
  { label: 'Investors', path: '/investors' },
  { label: 'Initiative', path: '/initiative' },
]

// ── Scroll to top on every route change ──────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileVerticalsOpen, setMobileVerticalsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
    setMobileVerticalsOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (path) => location.pathname === path

  return (
    <>
      <ScrollToTop />

      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: '0 24px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled || mobileOpen ? 'rgba(11,28,45,0.97)' : 'transparent',
        backdropFilter: scrolled || mobileOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled || mobileOpen ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 1001 }}>
          <div style={{
            width: '34px', height: '34px', flexShrink: 0,
            background: 'linear-gradient(135deg, #1A56DB, #22D3EE)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: '800', fontSize: '15px' }}>M</span>
          </div>
          <span style={{
            fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '17px',
            color: '#F8FAFC', letterSpacing: '0.5px', whiteSpace: 'nowrap',
          }}>
            The Maven's Group
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="tmg-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {navLinks.map((link) =>
            link.children ? (
              <div
                key="verticals"
                style={{ position: 'relative', paddingBottom: '8px', marginBottom: '-8px' }}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '8px 12px', borderRadius: '8px',
                  color: dropdownOpen ? '#22D3EE' : '#94A3B8',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '500',
                  display: 'flex', alignItems: 'center', gap: '5px', transition: 'color 0.2s',
                }}>
                  Verticals
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <div style={{
                  position: 'absolute', top: '100%', left: '50%',
                  transform: dropdownOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-8px)',
                  background: 'rgba(11,28,45,0.98)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px', padding: '8px', minWidth: '200px',
                  backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  opacity: dropdownOpen ? 1 : 0, pointerEvents: dropdownOpen ? 'all' : 'none',
                  transition: 'all 0.2s ease',
                }}>
                  {verticals.map((v) => (
                    <Link key={v.path} to={v.path} style={{
                      display: 'block', padding: '10px 14px', borderRadius: '8px',
                      textDecoration: 'none',
                      color: isActive(v.path) ? '#22D3EE' : '#94A3B8',
                      fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '500',
                      background: isActive(v.path) ? 'rgba(34,211,238,0.08)' : 'transparent',
                      transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#F8FAFC'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = isActive(v.path) ? '#22D3EE' : '#94A3B8'; e.currentTarget.style.background = isActive(v.path) ? 'rgba(34,211,238,0.08)' : 'transparent' }}
                    >
                      {v.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={link.path} to={link.path} style={{
                padding: '8px 12px', borderRadius: '8px', textDecoration: 'none',
                color: isActive(link.path) ? '#22D3EE' : '#94A3B8',
                fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '500',
                background: isActive(link.path) ? 'rgba(34,211,238,0.08)' : 'transparent',
                transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => { if (!isActive(link.path)) { e.currentTarget.style.color = '#F8FAFC'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' } }}
                onMouseLeave={e => { if (!isActive(link.path)) { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'transparent' } }}
              >
                {link.label}
              </Link>
            )
          )}
          <Link to="/investors" style={{
            marginLeft: '8px', padding: '10px 18px', borderRadius: '8px',
            textDecoration: 'none', color: '#fff',
            fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '600',
            background: 'linear-gradient(135deg, #1A56DB, #3B82F6)',
            boxShadow: '0 0 20px rgba(26,86,219,0.3)', transition: 'all 0.2s', whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 32px rgba(26,86,219,0.6)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(26,86,219,0.3)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Partner With Us
          </Link>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="tmg-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none', background: 'none',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px',
            padding: '0', cursor: 'pointer', zIndex: 1001,
            width: '40px', height: '40px',
            flexDirection: 'column', gap: '5px',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{ display: 'block', width: '18px', height: '2px', background: '#F8FAFC', borderRadius: '2px', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: 'transform 0.3s ease' }} />
          <span style={{ display: 'block', width: '18px', height: '2px', background: '#F8FAFC', borderRadius: '2px', opacity: mobileOpen ? 0 : 1, transition: 'opacity 0.3s ease' }} />
          <span style={{ display: 'block', width: '18px', height: '2px', background: '#F8FAFC', borderRadius: '2px', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: 'transform 0.3s ease' }} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className="tmg-mobile-menu" style={{
        position: 'fixed', top: '72px', left: 0, right: 0, bottom: 0,
        background: 'rgba(6,15,26,0.98)', backdropFilter: 'blur(24px)',
        zIndex: 999, padding: '16px 20px 32px', overflowY: 'auto',
        display: 'none', flexDirection: 'column', gap: '2px',
        opacity: mobileOpen ? 1 : 0,
        transform: mobileOpen ? 'translateY(0)' : 'translateY(-12px)',
        pointerEvents: mobileOpen ? 'all' : 'none',
        transition: 'all 0.3s ease',
      }}>
        {navLinks.map((link) =>
          link.children ? (
            <div key="verticals-mobile">
              <button
                onClick={() => setMobileVerticalsOpen(!mobileVerticalsOpen)}
                style={{
                  width: '100%', background: mobileVerticalsOpen ? 'rgba(34,211,238,0.06)' : 'transparent',
                  border: 'none', cursor: 'pointer', padding: '14px 16px', borderRadius: '12px',
                  color: mobileVerticalsOpen ? '#22D3EE' : '#94A3B8',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: '500',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transition: 'all 0.2s',
                }}
              >
                Verticals
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none"
                  style={{ transform: mobileVerticalsOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s' }}>
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {mobileVerticalsOpen && (
                <div style={{ paddingLeft: '12px', marginTop: '2px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {verticals.map((v) => (
                    <Link key={v.path} to={v.path} style={{
                      display: 'block', padding: '12px 16px', borderRadius: '10px',
                      textDecoration: 'none',
                      color: isActive(v.path) ? '#22D3EE' : '#64748B',
                      fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: '500',
                      background: isActive(v.path) ? 'rgba(34,211,238,0.08)' : 'transparent',
                      borderLeft: '2px solid rgba(34,211,238,0.2)',
                    }}>
                      {v.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link key={link.path} to={link.path} style={{
              display: 'block', padding: '14px 16px', borderRadius: '12px',
              textDecoration: 'none',
              color: isActive(link.path) ? '#22D3EE' : '#94A3B8',
              fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: '500',
              background: isActive(link.path) ? 'rgba(34,211,238,0.08)' : 'transparent',
              transition: 'all 0.15s',
            }}>
              {link.label}
            </Link>
          )
        )}
        <div style={{ marginTop: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <Link to="/investors" style={{
            display: 'block', padding: '16px', borderRadius: '12px',
            textDecoration: 'none', color: '#fff', textAlign: 'center',
            fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: '600',
            background: 'linear-gradient(135deg, #1A56DB, #3B82F6)',
            boxShadow: '0 0 24px rgba(26,86,219,0.3)',
          }}>
            Partner With Us
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .tmg-desktop-nav { display: none !important; }
          .tmg-hamburger { display: flex !important; }
          .tmg-mobile-menu { display: flex !important; }
        }
      `}</style>
    </>
  )
}