import { useRef, useState, useEffect } from 'react'

function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

const pillars = [
  {
    icon: '◈',
    title: 'Capital Intelligence',
    desc: 'We deploy capital where conviction meets clarity — across Indian equity markets, Saudi real estate, and emerging Gulf opportunities. Every rupee and riyal is placed with purpose.',
    color: '#1A56DB',
  },
  {
    icon: '⬡',
    title: 'Operational Depth',
    desc: 'Behind every vertical is a team that understands the ground. We don\'t just invest — we build, operate, and scale businesses that create lasting value in local markets.',
    color: '#22D3EE',
  },
  {
    icon: '◉',
    title: 'Cross-Border Edge',
    desc: 'With active presence across India, Saudi Arabia, UAE, and Bahrain, we connect capital, talent, and opportunity across borders that others treat as barriers.',
    color: '#A78BFA',
  },
  {
    icon: '⬢',
    title: 'Ethical Foundation',
    desc: 'Governance, transparency, and values are not constraints — they are our competitive advantage. Every decision is held to a standard that earns long-term trust.',
    color: '#F59E0B',
  },
]

const verticals = [
  { name: 'Maven Business Services', tag: 'Finance & Capital Markets', color: '#1A56DB' },
  { name: 'Maven AI Tech', tag: 'Artificial Intelligence & SaaS', color: '#22D3EE' },
  { name: 'Maven Contractors', tag: 'Infrastructure & Construction', color: '#A78BFA' },
  { name: 'Maven E-Commerce', tag: 'Retail & Digital Commerce', color: '#F59E0B' },
]

export default function About() {
  const [heroRef, heroInView] = useInView(0.1)
  const [pillarsRef, pillarsInView] = useInView(0.1)
  const [verticalsRef, verticalsInView] = useInView(0.1)
  const [closingRef, closingInView] = useInView(0.1)

  return (
    <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px' }}>

      {/* Page Hero Banner */}
      <section ref={heroRef} style={{
        padding: '80px 80px 100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background radial */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(26,86,219,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '32px',
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s ease',
          }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #3B82F6, #22D3EE)' }} />
            <span style={{ color: '#22D3EE', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
              About The Group
            </span>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #22D3EE, #3B82F6)' }} />
          </div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: '800',
            color: '#F8FAFC',
            lineHeight: '1.1',
            marginBottom: '24px',
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease 0.1s',
          }}>
            Built to Move.{' '}
            <span className="gradient-text">Built to Last.</span>
          </h1>

          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '18px',
            color: '#94A3B8',
            lineHeight: '1.8',
            maxWidth: '600px',
            margin: '0 auto',
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            The Maven's Group is a diversified global holding group with capital, operations, and ambitions 
            stretching from South Asia to the Gulf.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section style={{ padding: '0 80px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}>
          <div ref={heroRef}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #3B82F6, #22D3EE)' }} />
              <span style={{ color: '#22D3EE', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
                Our Story
              </span>
            </div>

            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: '800',
              color: '#F8FAFC',
              lineHeight: '1.2',
              marginBottom: '24px',
            }}>
              From a Single Idea to a{' '}
              <span className="gradient-text">Multi-Market Group</span>
            </h2>

            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#94A3B8', lineHeight: '1.9', marginBottom: '20px' }}>
              The Maven's Group didn't start with a masterplan. It started with a conviction — that capital, 
              when paired with clarity of purpose and operational discipline, can build something meaningful 
              across borders.
            </p>

            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#94A3B8', lineHeight: '1.9', marginBottom: '20px' }}>
              We began in Indian financial markets. Over time, that evolved into a structured group with 
              verticals spanning AI technology, construction, e-commerce, and social impact — operating 
              across India, Saudi Arabia, UAE, and Bahrain.
            </p>

            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#94A3B8', lineHeight: '1.9' }}>
              Today, TMG is not just an investment vehicle. It is an operating group — with people on the 
              ground, capital at work, and a long-term view that refuses to trade values for velocity.
            </p>
          </div>

          {/* Stats Card */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}>
            {[
              { value: '₹1.9Cr+', label: 'Capital Deployed', color: '#1A56DB' },
              { value: '4', label: 'Active Markets', color: '#22D3EE' },
              { value: '4', label: 'Business Verticals', color: '#A78BFA' },
              { value: '2026', label: 'Gulf Expansion', color: '#F59E0B' },
            ].map((stat, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                padding: '28px 24px',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.borderColor = stat.color + '40'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                }}
              >
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '28px',
                  fontWeight: '800',
                  color: stat.color,
                  marginBottom: '8px',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px',
                  color: '#94A3B8',
                  lineHeight: '1.4',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section ref={pillarsRef} style={{
        padding: '100px 80px',
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '64px' }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #3B82F6, #22D3EE)' }} />
            <span style={{ color: '#22D3EE', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
              What Drives Us
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: '800',
            color: '#F8FAFC',
            marginBottom: '64px',
            maxWidth: '500px',
          }}>
            Four Pillars.<br />One Direction.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {pillars.map((p, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                padding: '32px 28px',
                opacity: pillarsInView ? 1 : 0,
                transform: pillarsInView ? 'translateY(0)' : 'translateY(32px)',
                transition: `all 0.7s ease ${i * 0.1}s`,
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.borderColor = p.color + '50'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }}
              >
                <div style={{
                  fontSize: '28px',
                  color: p.color,
                  marginBottom: '20px',
                  filter: `drop-shadow(0 0 12px ${p.color}60)`,
                }}>
                  {p.icon}
                </div>
                <h3 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '17px',
                  fontWeight: '700',
                  color: '#F8FAFC',
                  marginBottom: '12px',
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '14px',
                  color: '#94A3B8',
                  lineHeight: '1.8',
                }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verticals Overview */}
      <section ref={verticalsRef} style={{ padding: '100px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '64px' }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #3B82F6, #22D3EE)' }} />
            <span style={{ color: '#22D3EE', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
              Our Verticals
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {verticals.map((v, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                padding: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: verticalsInView ? 1 : 0,
                transform: verticalsInView ? 'translateX(0)' : 'translateX(-24px)',
                transition: `all 0.6s ease ${i * 0.1}s`,
                cursor: 'pointer',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateX(8px)'
                  e.currentTarget.style.borderColor = v.color + '50'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }}
              >
                <div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    color: v.color,
                    fontWeight: '600',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                  }}>
                    {v.tag}
                  </div>
                  <div style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#F8FAFC',
                  }}>
                    {v.name}
                  </div>
                </div>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: v.color + '15',
                  border: `1px solid ${v.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: v.color,
                  fontSize: '18px',
                  flexShrink: 0,
                }}>
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section ref={closingRef} style={{
        padding: '100px 80px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(26,86,219,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
          <p style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(22px, 4vw, 36px)',
            fontWeight: '700',
            color: '#F8FAFC',
            lineHeight: '1.5',
            marginBottom: '40px',
            opacity: closingInView ? 1 : 0,
            transform: closingInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.8s ease',
          }}>
            "We don't chase trends. We build institutions — 
            <span className="gradient-text"> one disciplined decision at a time."</span>
          </p>
        </div>
      </section>

    </div>
  )
}