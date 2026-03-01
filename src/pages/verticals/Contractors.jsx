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

const services = [
  {
    icon: '⚡',
    title: 'Electrical Infrastructure',
    desc: 'High-voltage installations, grid connectivity, and industrial electrical systems for large-scale Saudi projects.',
    color: '#F59E0B',
    tags: ['HV Systems', 'Grid', 'Industrial'],
  },
  {
    icon: '🏗️',
    title: 'Civil Construction',
    desc: 'Foundation works, structural builds, and civil engineering aligned with KSA Vision 2030 mega-projects.',
    color: '#3B82F6',
    tags: ['Foundation', 'Structural', 'Civil Eng'],
  },
  {
    icon: '🔧',
    title: 'Mechanical Works',
    desc: 'Piping, HVAC, and mechanical systems installation for industrial and commercial facilities.',
    color: '#22D3EE',
    tags: ['Piping', 'HVAC', 'Mechanical'],
  },
  {
    icon: '🛡️',
    title: 'HSE Compliance',
    desc: 'Full Health, Safety & Environment compliance management across all active sites and contracts.',
    color: '#A78BFA',
    tags: ['Safety', 'HSE', 'Compliance'],
  },
  {
    icon: '📋',
    title: 'Contract Management',
    desc: 'End-to-end project contracting from bid to handover — EPC, lump sum, and unit-rate models.',
    color: '#34D399',
    tags: ['EPC', 'Lump Sum', 'Unit Rate'],
  },
  {
    icon: '🌐',
    title: 'Cross-Border Sourcing',
    desc: 'Material and manpower sourcing from India to Saudi Arabia — cost-optimized and compliant.',
    color: '#FB7185',
    tags: ['India-KSA', 'Manpower', 'Sourcing'],
  },
]

const compliance = [
  { icon: '✅', label: 'IQAMA Registered', desc: 'Fully registered workforce in KSA' },
  { icon: '📜', label: 'CR Certified', desc: 'Commercial Registration active' },
  { icon: '🔰', label: 'ARAMCO Approved', desc: 'Vendor approval in progress' },
  { icon: '⚖️', label: 'Labor Compliant', desc: 'KSA labor law adherence' },
]

const contractModels = [
  { label: 'EPC Contracts', color: '#3B82F6', desc: 'Engineering, Procurement & Construction' },
  { label: 'Lump Sum', color: '#22D3EE', desc: 'Fixed-scope turnkey delivery' },
  { label: 'Unit Rate', color: '#F59E0B', desc: 'Measurable unit-based billing' },
  { label: 'Manpower Supply', color: '#A78BFA', desc: 'Skilled workforce deployment' },
]

const stats = [
  { value: '5+', label: 'Projects Scoped', color: '#F59E0B' },
  { value: 'KSA', label: 'Primary Market', color: '#3B82F6' },
  { value: '2025', label: 'Operational Year', color: '#22D3EE' },
  { value: '100%', label: 'HSE Compliance', color: '#34D399' },
]

export default function Contractors() {
  const [heroRef, heroInView] = useInView(0.1)
  const [servicesRef, servicesInView] = useInView(0.1)
  const [complianceRef, complianceInView] = useInView(0.2)
  const [contractRef, contractInView] = useInView(0.2)
  const [hoveredService, setHoveredService] = useState(null)
  const [hoveredContract, setHoveredContract] = useState(null)

  return (
    <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px' }}>

      {/* HERO BANNER */}
      <section
        ref={heroRef}
        style={{
          padding: '80px 0 60px',
          position: 'relative',
          background: 'radial-gradient(ellipse at 30% 50%, #0D1F10 0%, #0B1C2D 70%)',
          overflow: 'hidden',
        }}
      >
        {/* Blueprint grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px),
            linear-gradient(rgba(245,158,11,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          animation: 'blueprintScroll 20s linear infinite',
        }} />

        {/* Glow orb */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 2 }}>

          {/* Breadcrumb */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            marginBottom: '32px',
            opacity: heroInView ? 1 : 0,
            transition: 'all 0.5s ease',
          }}>
            <span style={{ color: '#475569', fontSize: '13px' }}>The Maven's Group</span>
            <span style={{ color: '#334155' }}>→</span>
            <span style={{ color: '#475569', fontSize: '13px' }}>Verticals</span>
            <span style={{ color: '#334155' }}>→</span>
            <span style={{ color: '#F59E0B', fontSize: '13px' }}>Contractors</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

            {/* LEFT */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px', borderRadius: '100px',
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.25)',
                marginBottom: '24px',
                opacity: heroInView ? 1 : 0,
                transition: 'all 0.5s ease 0.1s',
              }}>
                <span style={{ fontSize: '16px' }}>⚡</span>
                <span style={{ color: '#F59E0B', fontSize: '12px', fontWeight: '600', letterSpacing: '2px' }}>
                  VERTICAL 03 · INDUSTRIAL
                </span>
              </div>

              <h1 style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontWeight: '800', lineHeight: '1.15',
                color: '#F8FAFC', marginBottom: '20px',
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.6s ease 0.2s',
              }}>
                Maven{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Contractors
                </span>
              </h1>

              <p style={{
                color: '#94A3B8', fontSize: '1rem',
                lineHeight: '1.8', maxWidth: '480px',
                marginBottom: '32px',
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.35s',
              }}>
                Our industrial and infrastructure arm operating in the Kingdom of Saudi Arabia —
                delivering electrical, civil, and mechanical contracting services aligned with
                <span style={{ color: '#F59E0B' }}> Vision 2030</span> development corridors.
              </p>

              <div style={{
                display: 'flex', gap: '12px', flexWrap: 'wrap',
                opacity: heroInView ? 1 : 0,
                transition: 'all 0.6s ease 0.5s',
              }}>
                {['Saudi Arabia', 'Vision 2030', 'EPC', 'Infrastructure', 'HSE'].map(tag => (
                  <span key={tag} style={{
                    padding: '6px 14px', borderRadius: '100px',
                    background: 'rgba(245,158,11,0.08)',
                    border: '1px solid rgba(245,158,11,0.2)',
                    color: '#FCD34D', fontSize: '12px', fontWeight: '500',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — Industrial Visual */}
            <div style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.8s ease 0.3s',
            }}>
              <div style={{
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(245,158,11,0.12)',
                padding: '32px',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Blueprint bg inside card */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px',
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.07) 0%, transparent 60%)',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Project status card */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '24px',
                  }}>
                    <div>
                      <div style={{ color: '#64748B', fontSize: '11px', letterSpacing: '1px', marginBottom: '4px' }}>
                        PRIMARY MARKET
                      </div>
                      <div style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: '800', fontSize: '1.4rem', color: '#F8FAFC',
                        display: 'flex', alignItems: 'center', gap: '10px',
                      }}>
                        🇸🇦 Saudi Arabia
                      </div>
                    </div>
                    <div style={{
                      padding: '6px 12px', borderRadius: '100px',
                      background: 'rgba(245,158,11,0.12)',
                      border: '1px solid rgba(245,158,11,0.25)',
                      color: '#F59E0B', fontSize: '12px', fontWeight: '600',
                    }}>
                      ● ACTIVE
                    </div>
                  </div>

                  {/* Vertical progress bars */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', height: '80px', marginBottom: '16px' }}>
                    {[
                      { label: 'Electrical', h: 90, color: '#F59E0B' },
                      { label: 'Civil', h: 70, color: '#3B82F6' },
                      { label: 'Mechanical', h: 60, color: '#22D3EE' },
                      { label: 'HSE', h: 100, color: '#34D399' },
                      { label: 'Contracts', h: 75, color: '#A78BFA' },
                    ].map((bar, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <div style={{
                          width: '100%', height: `${bar.h}%`,
                          borderRadius: '4px 4px 0 0',
                          background: `linear-gradient(180deg, ${bar.color}, ${bar.color}55)`,
                          boxShadow: `0 0 8px ${bar.color}44`,
                        }} />
                        <span style={{ color: '#475569', fontSize: '9px', textAlign: 'center' }}>{bar.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Vision 2030 badge */}
                  <div style={{
                    marginTop: '16px', padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(245,158,11,0.08)',
                    border: '1px solid rgba(245,158,11,0.15)',
                    display: 'flex', alignItems: 'center', gap: '10px',
                  }}>
                    <span style={{ fontSize: '20px' }}>🏙️</span>
                    <div>
                      <div style={{ color: '#F59E0B', fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '13px' }}>
                        Vision 2030 Aligned
                      </div>
                      <div style={{ color: '#64748B', fontSize: '11px' }}>
                        Targeting KSA infrastructure mega-projects
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <section style={{
        padding: '50px 0',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '28px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${0.3 + i * 0.1}s`,
              }}>
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: '800', fontSize: '2rem',
                  color: stat.color, marginBottom: '8px',
                }}>
                  {stat.value}
                </div>
                <div style={{ color: '#64748B', fontSize: '13px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section ref={servicesRef} style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px',
            opacity: servicesInView ? 1 : 0, transition: 'all 0.5s ease',
          }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #F59E0B, #FCD34D)' }} />
            <span style={{ color: '#F59E0B', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Our Services
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: '800',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            color: '#F8FAFC', marginBottom: '48px',
            opacity: servicesInView ? 1 : 0,
            transform: servicesInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            What We Build & Deliver
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}>
            {services.map((service, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                style={{
                  padding: '28px',
                  borderRadius: '16px',
                  background: hoveredService === i ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                  border: hoveredService === i
                    ? `1px solid ${service.color}44`
                    : '1px solid rgba(255,255,255,0.05)',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                  transform: hoveredService === i
                    ? 'translateY(-6px)'
                    : servicesInView ? 'translateY(0)' : 'translateY(24px)',
                  opacity: servicesInView ? 1 : 0,
                  boxShadow: hoveredService === i ? `0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px ${service.color}11` : 'none',
                  transitionDelay: servicesInView ? `${i * 0.08}s` : '0s',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Glow on hover */}
                {hoveredService === i && (
                  <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: '150px', height: '150px', borderRadius: '50%',
                    background: `radial-gradient(circle, ${service.color}15 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />
                )}

                <div style={{
                  fontSize: '32px', marginBottom: '16px',
                  filter: hoveredService === i ? `drop-shadow(0 0 8px ${service.color})` : 'none',
                  transition: 'filter 0.3s ease',
                }}>
                  {service.icon}
                </div>

                <h3 style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: '700',
                  fontSize: '15px', color: '#F8FAFC', marginBottom: '10px',
                }}>
                  {service.title}
                </h3>

                <p style={{
                  color: '#64748B', fontSize: '13px',
                  lineHeight: '1.7', marginBottom: '16px',
                }}>
                  {service.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {service.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '3px 10px', borderRadius: '100px',
                      background: `${service.color}12`,
                      border: `1px solid ${service.color}25`,
                      color: service.color, fontSize: '10px', fontWeight: '500',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE SECTION */}
      <section
        ref={complianceRef}
        style={{
          padding: '80px 0',
          background: 'radial-gradient(ellipse at 50% 0%, #0D1A10 0%, #0B1C2D 70%)',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px',
            opacity: complianceInView ? 1 : 0, transition: 'all 0.5s ease',
          }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #34D399, #22D3EE)' }} />
            <span style={{ color: '#34D399', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Compliance & Certifications
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: '800',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            color: '#F8FAFC', marginBottom: '48px',
            opacity: complianceInView ? 1 : 0,
            transform: complianceInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            Built to KSA Standards
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }}>
            {compliance.map((item, i) => (
              <div key={i} style={{
                padding: '28px 24px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(52,211,153,0.12)',
                textAlign: 'center',
                opacity: complianceInView ? 1 : 0,
                transform: complianceInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                <div style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: '700',
                  fontSize: '14px', color: '#F8FAFC', marginBottom: '6px',
                }}>
                  {item.label}
                </div>
                <div style={{ color: '#64748B', fontSize: '12px' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTRACT MODELS */}
      <section ref={contractRef} style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px',
            opacity: contractInView ? 1 : 0, transition: 'all 0.5s ease',
          }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #F59E0B, #FCD34D)' }} />
            <span style={{ color: '#F59E0B', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>
              How We Work
            </span>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '60px', alignItems: 'center',
          }}>
            <div>
              <h2 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: '800',
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                color: '#F8FAFC', marginBottom: '16px',
                opacity: contractInView ? 1 : 0,
                transform: contractInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.1s',
              }}>
                Contract Models We Operate
              </h2>
              <p style={{
                color: '#64748B', lineHeight: '1.8', marginBottom: '36px',
                opacity: contractInView ? 1 : 0,
                transition: 'all 0.6s ease 0.2s',
              }}>
                Flexible engagement structures designed for Saudi project owners,
                developers, and government authorities — from small civil works to
                large-scale EPC contracts.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {contractModels.map((model, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredContract(i)}
                    onMouseLeave={() => setHoveredContract(null)}
                    style={{
                      padding: '18px 20px',
                      borderRadius: '12px',
                      background: hoveredContract === i ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                      border: hoveredContract === i
                        ? `1px solid ${model.color}44`
                        : '1px solid rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', gap: '16px',
                      cursor: 'default',
                      transition: 'all 0.3s ease',
                      transform: hoveredContract === i ? 'translateX(6px)' : 'translateX(0)',
                      opacity: contractInView ? 1 : 0,
                      transitionDelay: contractInView ? `${0.2 + i * 0.1}s` : '0s',
                    }}
                  >
                    <div style={{
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: model.color,
                      boxShadow: `0 0 8px ${model.color}`,
                      flexShrink: 0,
                    }} />
                    <div>
                      <div style={{
                        fontFamily: 'Syne, sans-serif', fontWeight: '700',
                        fontSize: '14px', color: '#F8FAFC', marginBottom: '2px',
                      }}>
                        {model.label}
                      </div>
                      <div style={{ color: '#64748B', fontSize: '12px' }}>{model.desc}</div>
                    </div>
                    <div style={{
                      marginLeft: 'auto',
                      color: model.color, fontSize: '16px',
                      opacity: hoveredContract === i ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }}>
                      →
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — India to KSA flow diagram */}
            <div style={{
              opacity: contractInView ? 1 : 0,
              transform: contractInView ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.8s ease 0.3s',
            }}>
              <div style={{
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(245,158,11,0.1)',
                padding: '36px',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `linear-gradient(rgba(245,158,11,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.02) 1px, transparent 1px)`,
                  backgroundSize: '25px 25px',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    color: '#64748B', fontSize: '11px',
                    letterSpacing: '2px', marginBottom: '24px', textTransform: 'uppercase',
                  }}>
                    Cross-Border Operations
                  </div>

                  {/* Flow: India → KSA */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    {/* India node */}
                    <div style={{
                      flex: 1, padding: '16px',
                      borderRadius: '12px',
                      background: 'rgba(59,130,246,0.1)',
                      border: '1px solid rgba(59,130,246,0.2)',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '28px', marginBottom: '6px' }}>🇮🇳</div>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '13px', color: '#F8FAFC' }}>India</div>
                      <div style={{ color: '#64748B', fontSize: '10px', marginTop: '4px' }}>Manpower & Materials</div>
                    </div>

                    {/* Arrow */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <div style={{
                        width: '40px', height: '2px',
                        background: 'linear-gradient(90deg, #3B82F6, #F59E0B)',
                        position: 'relative',
                      }}>
                        <div style={{
                          position: 'absolute', right: '-4px', top: '-3px',
                          color: '#F59E0B', fontSize: '8px',
                        }}>▶</div>
                      </div>
                      <span style={{ color: '#475569', fontSize: '9px' }}>DEPLOY</span>
                    </div>

                    {/* KSA node */}
                    <div style={{
                      flex: 1, padding: '16px',
                      borderRadius: '12px',
                      background: 'rgba(245,158,11,0.1)',
                      border: '1px solid rgba(245,158,11,0.2)',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '28px', marginBottom: '6px' }}>🇸🇦</div>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '13px', color: '#F8FAFC' }}>Saudi Arabia</div>
                      <div style={{ color: '#64748B', fontSize: '10px', marginTop: '4px' }}>Project Execution</div>
                    </div>
                  </div>

                  {/* What flows */}
                  {[
                    { icon: '👷', label: 'Skilled Manpower', color: '#3B82F6' },
                    { icon: '📦', label: 'Materials & Equipment', color: '#22D3EE' },
                    { icon: '📋', label: 'Project Management', color: '#F59E0B' },
                    { icon: '🔩', label: 'Technical Expertise', color: '#34D399' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '10px 14px', borderRadius: '8px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.04)',
                      marginBottom: '8px',
                    }}>
                      <span style={{ fontSize: '16px' }}>{item.icon}</span>
                      <span style={{ color: '#94A3B8', fontSize: '13px' }}>{item.label}</span>
                      <div style={{
                        marginLeft: 'auto',
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: item.color,
                        boxShadow: `0 0 6px ${item.color}`,
                      }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes blueprintScroll {
          from { background-position: 0 0, 0 0, 0 0, 0 0; }
          to { background-position: 100px 100px, 100px 100px, 20px 20px, 20px 20px; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}