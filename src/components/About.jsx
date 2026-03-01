import { useEffect, useRef, useState } from 'react'

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

const stats = [
  { icon: '🌍', title: 'Sector-Agnostic Model', desc: 'We invest and build across verticals — finance, tech, infrastructure, and commerce.' },
  { icon: '🤝', title: 'Partnership-Led', desc: 'Every venture is built on long-term relationships, not short-term transactions.' },
  { icon: '⚖️', title: 'Ethical Governance', desc: 'Transparent, principled decision-making at every level of the group.' },
  { icon: '🚀', title: 'Cross-Border Execution', desc: 'Operational presence across India, KSA, UAE and growing Gulf markets.' },
]

const lines = [
  'The Maven\'s Group is a diversified global holding company',
  'built on one conviction: that the most valuable enterprises',
  'are those that create real impact across real borders.',
  '',
  'Founded with execution across Indian markets,',
  'Gulf infrastructure, and AI-driven technology —',
  'we operate where others see complexity.',
  '',
  'Our model is simple: identify high-potential sectors,',
  'build operational units, and scale through strategic',
  'partnerships that create lasting value.',
]

export default function About() {
  const [sectionRef, inView] = useInView(0.15)
  const [cardRefs, setCardRefs] = useState([])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: '120px 0',
        position: 'relative',
        background: 'radial-gradient(ellipse at 80% 50%, #0D2137 0%, #0B1C2D 60%)',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-100px', right: '-100px',
        width: '500px', height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,86,219,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-100px', left: '-100px',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(13,148,136,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 32px',
      }}>

        {/* Section label */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '64px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease',
        }}>
          <div style={{
            width: '32px', height: '2px',
            background: 'linear-gradient(90deg, #3B82F6, #22D3EE)',
          }} />
          <span style={{
            color: '#22D3EE',
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}>
            About The Group
          </span>
        </div>

        {/* Split layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start',
          marginBottom: '80px',
        }}>

          {/* LEFT — Animated text lines */}
          <div>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              marginBottom: '36px',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s ease 0.1s',
            }}>
              A Holding Group{' '}
              <span style={{
                background: 'linear-gradient(135deg, #3B82F6, #22D3EE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Built for the World
              </span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {lines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    color: line === '' ? undefined : '#94A3B8',
                    fontSize: '1rem',
                    lineHeight: '1.9',
                    minHeight: line === '' ? '12px' : undefined,
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s ease ${0.2 + i * 0.06}s`,
                  }}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div style={{
              marginTop: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              opacity: inView ? 1 : 0,
              transition: 'all 0.6s ease 0.9s',
            }}>
              <button style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #1A56DB, #22D3EE)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontFamily: 'Syne, sans-serif',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 20px rgba(59,130,246,0.3)',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(59,130,246,0.5)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59,130,246,0.3)'
                }}
              >
                Our Story →
              </button>
              <span style={{ color: '#475569', fontSize: '13px' }}>
                Founded 2024 · 4 Verticals · 3 Markets
              </span>
            </div>
          </div>

          {/* RIGHT — Visual card */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s ease 0.3s',
          }}>
            {/* Main visual block */}
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              height: '340px',
              background: 'linear-gradient(135deg, #0D2137 0%, #112338 50%, #0D2137 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              {/* Abstract boardroom visual using CSS */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 30% 40%, rgba(26,86,219,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(13,148,136,0.1) 0%, transparent 50%)',
              }} />

              {/* Grid lines decoration */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }} />

              {/* Center content of the visual */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '16px',
              }}>
                {/* Globe icon */}
                <div style={{
                  width: '80px', height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(26,86,219,0.3), rgba(34,211,238,0.2))',
                  border: '2px solid rgba(59,130,246,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '36px',
                  boxShadow: '0 0 40px rgba(59,130,246,0.2)',
                  animation: 'orbPulse 3s ease-in-out infinite',
                }}>
                  🌐
                </div>
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: '700',
                  fontSize: '1.2rem',
                  color: '#F8FAFC',
                  textAlign: 'center',
                }}>
                  The Maven's Group
                </div>
                <div style={{ color: '#64748B', fontSize: '13px', textAlign: 'center' }}>
                  India · Saudi Arabia · UAE · Gulf
                </div>

                {/* Market indicators */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '8px',
                }}>
                  {[
                    { flag: '🇮🇳', color: '#3B82F6' },
                    { flag: '🇸🇦', color: '#22D3EE' },
                    { flag: '🇦🇪', color: '#A78BFA' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      width: '40px', height: '40px',
                      borderRadius: '10px',
                      background: `rgba(${item.color === '#3B82F6' ? '59,130,246' : item.color === '#22D3EE' ? '34,211,238' : '167,139,250'},0.1)`,
                      border: `1px solid ${item.color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '20px',
                    }}>
                      {item.flag}
                    </div>
                  ))}
                </div>
              </div>

              {/* Corner decorations */}
              <div style={{
                position: 'absolute', top: '16px', right: '16px',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22D3EE', animation: 'pulse 2s infinite' }} />
                <span style={{ color: '#22D3EE', fontSize: '10px', letterSpacing: '1px' }}>LIVE</span>
              </div>
            </div>

            {/* Mini stats below visual */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginTop: '16px',
            }}>
              {[
                { num: '2024', label: 'Year Founded', color: '#3B82F6' },
                { num: '4', label: 'Business Verticals', color: '#22D3EE' },
                { num: '3+', label: 'Active Markets', color: '#A78BFA' },
                { num: '4+', label: 'Active Verticals', color: '#F59E0B' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(10px)',
                  transition: `all 0.5s ease ${0.6 + i * 0.1}s`,
                }}>
                  <div style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: '800',
                    fontSize: '1.3rem',
                    color: item.color,
                    marginBottom: '4px',
                  }}>
                    {item.num}
                  </div>
                  <div style={{ color: '#64748B', fontSize: '11px' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom — Stat Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}>
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} inView={inView} delay={0.4 + i * 0.12} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes orbPulse {
          0%, 100% { box-shadow: 0 0 40px rgba(59,130,246,0.2); }
          50% { box-shadow: 0 0 60px rgba(59,130,246,0.4); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  )
}

function StatCard({ stat, inView, delay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '24px',
        borderRadius: '16px',
        background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
        border: hovered ? '1px solid rgba(59,130,246,0.25)' : '1px solid rgba(255,255,255,0.05)',
        cursor: 'default',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : inView ? 'translateY(0)' : 'translateY(20px)',
        opacity: inView ? 1 : 0,
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.3)' : 'none',
        transitionDelay: `${delay}s`,
      }}
    >
      <div style={{ fontSize: '28px', marginBottom: '14px' }}>{stat.icon}</div>
      <div style={{
        fontFamily: 'Syne, sans-serif',
        fontWeight: '700',
        fontSize: '14px',
        color: '#F8FAFC',
        marginBottom: '8px',
      }}>
        {stat.title}
      </div>
      <div style={{ color: '#64748B', fontSize: '12px', lineHeight: '1.7' }}>
        {stat.desc}
      </div>
    </div>
  )
}