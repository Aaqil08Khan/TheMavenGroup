import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const verticals = [
  { label: 'Business Services', path: '/verticals/business-services' },
  { label: 'AI Tech', path: '/verticals/ai-tech' },
  { label: 'Contractors', path: '/verticals/contractors' },
  { label: 'E-Commerce', path: '/verticals/ecommerce' },
]

const navLinks = [
  { label: 'Home', path: '/' }, // <-- add this
  { label: 'About', path: '/about' },
  { label: 'Global Presence', path: '/presence' },
  { label: 'Verticals', path: null, children: verticals },
  { label: 'Impact', path: '/impact' },
  { label: 'Investors', path: '/investors' },
  { label: 'Initiative', path: '/initiative' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location])

  const isActive = (path) => location.pathname === path

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '0 48px',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled
        ? 'rgba(11,28,45,0.95)'
        : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled
        ? '1px solid rgba(255,255,255,0.06)'
        : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>

      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px', height: '36px',
          background: 'linear-gradient(135deg, #1A56DB, #22D3EE)',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: '800', fontSize: '16px' }}>M</span>
        </div>
        <span style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: '700',
          fontSize: '18px',
          color: '#F8FAFC',
          letterSpacing: '0.5px',
        }}>
          The Maven's Group
        </span>
      </Link>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {navLinks.map((link) =>
          link.children ? (
            // Verticals dropdown
            <div
              key="verticals"
              style={{ position: 'relative' }}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 14px',
                borderRadius: '8px',
                color: dropdownOpen ? '#22D3EE' : '#94A3B8',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}>
                Verticals
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                  style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Dropdown */}
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '8px',
                background: 'rgba(11,28,45,0.98)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '8px',
                minWidth: '200px',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                opacity: dropdownOpen ? 1 : 0,
                pointerEvents: dropdownOpen ? 'all' : 'none',
                transform: dropdownOpen
                  ? 'translateX(-50%) translateY(0)'
                  : 'translateX(-50%) translateY(-8px)',
                transition: 'all 0.2s ease',
              }}>
                {verticals.map((v) => (
                  <Link
                    key={v.path}
                    to={v.path}
                    style={{
                      display: 'block',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: isActive(v.path) ? '#22D3EE' : '#94A3B8',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '14px',
                      fontWeight: '500',
                      background: isActive(v.path) ? 'rgba(34,211,238,0.08)' : 'transparent',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#F8FAFC'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = isActive(v.path) ? '#22D3EE' : '#94A3B8'
                      e.currentTarget.style.background = isActive(v.path) ? 'rgba(34,211,238,0.08)' : 'transparent'
                    }}
                  >
                    {v.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: isActive(link.path) ? '#22D3EE' : '#94A3B8',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
                background: isActive(link.path) ? 'rgba(34,211,238,0.08)' : 'transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.color = '#F8FAFC'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.color = '#94A3B8'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {link.label}
            </Link>
          )
        )}

        {/* CTA */}
        <Link to="/investors" style={{
          marginLeft: '8px',
          padding: '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none',
          color: '#fff',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '14px',
          fontWeight: '600',
          background: 'linear-gradient(135deg, #1A56DB, #3B82F6)',
          boxShadow: '0 0 20px rgba(26,86,219,0.3)',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 32px rgba(26,86,219,0.6)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(26,86,219,0.3)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Partner With Us
        </Link>
      </div>
    </nav>
  )
}