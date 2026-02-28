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

function AnimatedCounter({ target, prefix = '', suffix = '', duration = 2000, inView }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, target, duration])
  return <span>{prefix}{count}{suffix}</span>
}

const impactStats = [
  { icon: '🎓', value: 12, suffix: '+', label: 'Institutions Supported', color: '#3B82F6', desc: 'Schools, colleges and madrasas receiving financial and material support' },
  { icon: '👨‍👩‍👧‍👦', value: 500, suffix: '+', label: 'Families Impacted', color: '#34D399', desc: 'Direct beneficiary families across India and Gulf communities' },
  { icon: '📚', value: 300, suffix: '+', label: 'Students Supported', color: '#A78BFA', desc: 'Scholarships, books, and educational resources provided annually' },
  { icon: '🌍', value: 3, suffix: '', label: 'Countries Reached', color: '#22D3EE', desc: 'Social programs active across India, Saudi Arabia and UAE' },
]

const initiatives = [
  {
    icon: '📖',
    title: 'Education Access',
    desc: 'Funding infrastructure, scholarships, and learning materials for underprivileged students in India and the Gulf.',
    color: '#3B82F6',
    points: ['School infrastructure funding', 'Annual scholarship programs', 'Book & stationery drives'],
  },
  {
    icon: '🕌',
    title: 'Community Institutions',
    desc: 'Supporting mosques, madrasas, and community centers that serve as the backbone of Islamic family life.',
    color: '#34D399',
    points: ['Madrasa infrastructure support', 'Mosque renovation funding', 'Community hall development'],
  },
  {
    icon: '🤲',
    title: 'Zakat & Sadaqah',
    desc: 'Structured religious giving programs ensuring funds reach verified beneficiaries with full transparency.',
    color: '#F59E0B',
    points: ['Verified beneficiary network', 'Transparent disbursement', 'Annual impact reporting'],
  },
  {
    icon: '👩‍⚕️',
    title: 'Health & Wellness',
    desc: 'Medical camps, health awareness programs, and emergency medical support for low-income communities.',
    color: '#FB7185',
    points: ['Free medical camps', 'Health awareness drives', 'Emergency medical aid'],
  },
  {
    icon: '💼',
    title: 'Livelihood Support',
    desc: 'Skill development and micro-enterprise support helping families achieve financial independence.',
    color: '#A78BFA',
    points: ['Vocational training', 'Micro-enterprise grants', 'Women empowerment programs'],
  },
  {
    icon: '🌱',
    title: 'Sustainable Giving',
    desc: 'Long-term community investment models designed to create self-sustaining impact ecosystems.',
    color: '#22D3EE',
    points: ['Waqf-based funding models', 'Community ownership', 'Long-term partnerships'],
  },
]

const stories = [
  {
    quote: 'The scholarship changed everything for our family. My daughter now studies engineering.',
    name: 'Parent, Tamil Nadu',
    icon: '👨‍👩‍👧',
    color: '#3B82F6',
  },
  {
    quote: 'The madrasa renovation meant 200 more children could learn their deen with dignity.',
    name: 'Imam, Kerala',
    icon: '🕌',
    color: '#34D399',
  },
  {
    quote: 'Small support, big change. The medical camp reached our entire village in one day.',
    name: 'Community Leader, Rajasthan',
    icon: '🏥',
    color: '#A78BFA',
  },
]

export default function Impact() {
  const [heroRef, heroInView] = useInView(0.1)
  const [statsRef, statsInView] = useInView(0.2)
  const [initiativesRef, initiativesInView] = useInView(0.1)
  const [storiesRef, storiesInView] = useInView(0.2)
  const [ctaRef, ctaInView] = useInView(0.2)
  const [hoveredInit, setHoveredInit] = useState(null)
  const [activeStory, setActiveStory] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory(prev => (prev + 1) % stories.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px' }}>

      {/* HERO */}
      <section
        ref={heroRef}
        style={{
          padding: '80px 0 60px',
          position: 'relative',
          background: 'radial-gradient(ellipse at 40% 50%, #0A1F15 0%, #0B1C2D 70%)',
          overflow: 'hidden',
        }}
      >
        {/* Soft floating orbs */}
        <div style={{
          position: 'absolute', top: '-80px', right: '10%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '5%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Subtle dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(52,211,153,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
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
            <span style={{ color: '#34D399', fontSize: '13px' }}>Social Impact</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

            {/* LEFT */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px', borderRadius: '100px',
                background: 'rgba(52,211,153,0.1)',
                border: '1px solid rgba(52,211,153,0.25)',
                marginBottom: '24px',
                opacity: heroInView ? 1 : 0,
                transition: 'all 0.5s ease 0.1s',
              }}>
                <span style={{ fontSize: '16px' }}>🤲</span>
                <span style={{ color: '#34D399', fontSize: '12px', fontWeight: '600', letterSpacing: '2px' }}>
                  SOCIAL IMPACT · GIVING BACK
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
                Growth That{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #34D399, #22D3EE)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Gives Back
                </span>
              </h1>

              <p style={{
                color: '#94A3B8', fontSize: '1rem',
                lineHeight: '1.8', maxWidth: '480px',
                marginBottom: '16px',
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.35s',
              }}>
                At The Maven's Group, we believe that every rupee earned carries a
                responsibility. Our social impact work is not a footnote — it is woven
                into the fabric of how we build and operate.
              </p>
              <p style={{
                color: '#64748B', fontSize: '0.95rem',
                lineHeight: '1.8', maxWidth: '480px',
                marginBottom: '32px',
                opacity: heroInView ? 1 : 0,
                transition: 'all 0.6s ease 0.45s',
              }}>
                From education funding to community health programs, from madrasa
                support to livelihood development — we invest in people as much as we
                invest in markets.
              </p>

              <div style={{
                display: 'flex', gap: '12px', flexWrap: 'wrap',
                opacity: heroInView ? 1 : 0,
                transition: 'all 0.6s ease 0.55s',
              }}>
                {['Education', 'Health', 'Community', 'Zakat', 'Waqf'].map(tag => (
                  <span key={tag} style={{
                    padding: '6px 14px', borderRadius: '100px',
                    background: 'rgba(52,211,153,0.08)',
                    border: '1px solid rgba(52,211,153,0.2)',
                    color: '#34D399', fontSize: '12px', fontWeight: '500',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — Visual */}
            <div style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.8s ease 0.3s',
            }}>
              <div style={{
                borderRadius: '24px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(52,211,153,0.1)',
                padding: '32px',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(ellipse at 70% 20%, rgba(52,211,153,0.07) 0%, transparent 60%)',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Heart icon */}
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '16px',
                    background: 'rgba(52,211,153,0.12)',
                    border: '1px solid rgba(52,211,153,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '30px', marginBottom: '20px',
                    animation: 'heartbeat 2s ease-in-out infinite',
                  }}>
                    🤲
                  </div>

                  <div style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: '800',
                    fontSize: '1.3rem', color: '#F8FAFC', marginBottom: '8px',
                  }}>
                    Profit with Purpose
                  </div>
                  <p style={{ color: '#64748B', fontSize: '13px', lineHeight: '1.7', marginBottom: '24px' }}>
                    A fixed percentage of group profits is allocated annually to verified
                    social impact programs — with full accountability and transparent reporting.
                  </p>

                  {/* Allocation bar */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#94A3B8', fontSize: '12px' }}>Annual Impact Allocation</span>
                      <span style={{ color: '#34D399', fontFamily: 'Syne, sans-serif', fontWeight: '700' }}>10%+</span>
                    </div>
                    <div style={{
                      height: '8px', borderRadius: '100px',
                      background: 'rgba(255,255,255,0.05)',
                    }}>
                      <div style={{
                        height: '100%', width: '100%', borderRadius: '100px',
                        background: 'linear-gradient(90deg, #34D399, #22D3EE)',
                        animation: 'growBar 2s ease 0.5s both',
                      }} />
                    </div>
                  </div>

                  {/* Mini impact rows */}
                  {[
                    { icon: '🎓', label: 'Education Programs', color: '#3B82F6' },
                    { icon: '🕌', label: 'Community Institutions', color: '#34D399' },
                    { icon: '💊', label: 'Health Initiatives', color: '#FB7185' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '10px 14px', borderRadius: '8px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.04)',
                      marginBottom: '8px',
                    }}>
                      <span style={{ fontSize: '16px' }}>{item.icon}</span>
                      <span style={{ color: '#94A3B8', fontSize: '13px', flex: 1 }}>{item.label}</span>
                      <div style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: item.color,
                        boxShadow: `0 0 6px ${item.color}`,
                        animation: 'pulse 2s infinite',
                      }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANIMATED COUNTERS */}
      <section
        ref={statsRef}
        style={{
          padding: '70px 0',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
            {impactStats.map((stat, i) => (
              <div key={i} style={{
                padding: '32px 24px', borderRadius: '20px',
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${stat.color}15`,
                textAlign: 'center',
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.6s ease ${i * 0.12}s`,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: `linear-gradient(90deg, ${stat.color}, ${stat.color}44)`,
                }} />
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{stat.icon}</div>
                <div style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: '800',
                  fontSize: '2.4rem', color: stat.color, marginBottom: '8px',
                  lineHeight: '1',
                }}>
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    inView={statsInView}
                    duration={1800}
                  />
                </div>
                <div style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: '600',
                  fontSize: '14px', color: '#F8FAFC', marginBottom: '8px',
                }}>
                  {stat.label}
                </div>
                <div style={{ color: '#475569', fontSize: '12px', lineHeight: '1.6' }}>
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INITIATIVES GRID */}
      <section ref={initiativesRef} style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px',
            opacity: initiativesInView ? 1 : 0, transition: 'all 0.5s ease',
          }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #34D399, #22D3EE)' }} />
            <span style={{ color: '#34D399', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Our Programs
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: '800',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            color: '#F8FAFC', marginBottom: '12px',
            opacity: initiativesInView ? 1 : 0,
            transform: initiativesInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            Where We Focus
          </h2>
          <p style={{
            color: '#64748B', marginBottom: '48px', maxWidth: '500px',
            opacity: initiativesInView ? 1 : 0,
            transition: 'all 0.6s ease 0.2s',
          }}>
            Six pillars of impact that guide how we give, invest, and engage with communities.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {initiatives.map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredInit(i)}
                onMouseLeave={() => setHoveredInit(null)}
                style={{
                  padding: '28px',
                  borderRadius: '18px',
                  background: hoveredInit === i ? `${item.color}08` : 'rgba(255,255,255,0.02)',
                  border: hoveredInit === i
                    ? `1px solid ${item.color}35`
                    : '1px solid rgba(255,255,255,0.05)',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                  transform: hoveredInit === i
                    ? 'translateY(-6px)'
                    : initiativesInView ? 'translateY(0)' : 'translateY(24px)',
                  opacity: initiativesInView ? 1 : 0,
                  transitionDelay: initiativesInView ? `${i * 0.08}s` : '0s',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {hoveredInit === i && (
                  <div style={{
                    position: 'absolute', top: '-30px', right: '-30px',
                    width: '120px', height: '120px', borderRadius: '50%',
                    background: `radial-gradient(circle, ${item.color}15 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />
                )}

                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', marginBottom: '16px',
                  transition: 'all 0.3s ease',
                  boxShadow: hoveredInit === i ? `0 0 20px ${item.color}25` : 'none',
                }}>
                  {item.icon}
                </div>

                <h3 style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: '700',
                  fontSize: '15px', color: '#F8FAFC', marginBottom: '10px',
                }}>
                  {item.title}
                </h3>

                <p style={{
                  color: '#64748B', fontSize: '13px',
                  lineHeight: '1.7', marginBottom: '16px',
                }}>
                  {item.desc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {item.points.map((point, j) => (
                    <div key={j} style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                    }}>
                      <div style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: item.color, flexShrink: 0,
                      }} />
                      <span style={{ color: '#94A3B8', fontSize: '12px' }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section ref={storiesRef} style={{
        padding: '80px 0',
        background: 'radial-gradient(ellipse at 50% 0%, #0A1F15 0%, #0B1C2D 70%)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              marginBottom: '16px',
              opacity: storiesInView ? 1 : 0, transition: 'all 0.5s ease',
            }}>
              <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #34D399, #22D3EE)' }} />
              <span style={{ color: '#34D399', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>
                Human Stories
              </span>
              <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #22D3EE, #34D399)' }} />
            </div>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: '800',
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              color: '#F8FAFC',
              opacity: storiesInView ? 1 : 0,
              transform: storiesInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.1s',
            }}>
              Lives We've Touched
            </h2>
          </div>

          {/* Story cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {stories.map((story, i) => (
              <div
                key={i}
                onClick={() => setActiveStory(i)}
                style={{
                  padding: '32px',
                  borderRadius: '20px',
                  background: activeStory === i ? `${story.color}08` : 'rgba(255,255,255,0.02)',
                  border: activeStory === i
                    ? `1px solid ${story.color}35`
                    : '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  transform: activeStory === i ? 'translateY(-6px)' : storiesInView ? 'translateY(0)' : 'translateY(24px)',
                  opacity: storiesInView ? 1 : 0,
                  transitionDelay: storiesInView ? `${i * 0.12}s` : '0s',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {activeStory === i && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(ellipse at 50% 0%, ${story.color}08 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Quote mark */}
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '4rem', lineHeight: '1',
                  color: story.color,
                  opacity: 0.3,
                  marginBottom: '8px',
                }}>
                  "
                </div>

                <p style={{
                  color: activeStory === i ? '#94A3B8' : '#64748B',
                  fontSize: '14px', lineHeight: '1.8',
                  fontStyle: 'italic', marginBottom: '24px',
                  transition: 'color 0.3s ease',
                }}>
                  {story.quote}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: `${story.color}15`,
                    border: `1px solid ${story.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px',
                  }}>
                    {story.icon}
                  </div>
                  <div style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: '600',
                    fontSize: '13px',
                    color: activeStory === i ? story.color : '#475569',
                    transition: 'color 0.3s ease',
                  }}>
                    {story.name}
                  </div>
                </div>

                {/* Active indicator dots */}
                {activeStory === i && (
                  <div style={{
                    position: 'absolute', bottom: '16px', right: '16px',
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: story.color,
                    boxShadow: `0 0 8px ${story.color}`,
                    animation: 'pulse 2s infinite',
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Story dots nav */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
            {stories.map((story, i) => (
              <div
                key={i}
                onClick={() => setActiveStory(i)}
                style={{
                  width: activeStory === i ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '100px',
                  background: activeStory === i ? story.color : 'rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(52,211,153,0.08) 0%, rgba(34,211,238,0.05) 100%)',
            border: '1px solid rgba(52,211,153,0.15)',
            padding: '60px',
            textAlign: 'center',
            position: 'relative', overflow: 'hidden',
            opacity: ctaInView ? 1 : 0,
            transform: ctaInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}>
            <div style={{
              position: 'absolute', top: '-60px', left: '50%',
              transform: 'translateX(-50%)',
              width: '300px', height: '300px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🤲</div>
              <h2 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: '800',
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                color: '#F8FAFC', marginBottom: '16px',
              }}>
                Partner in Purpose
              </h2>
              <p style={{
                color: '#64748B', fontSize: '1rem',
                lineHeight: '1.8', maxWidth: '500px',
                margin: '0 auto 36px',
              }}>
                If you're an institution, NGO, or individual looking to collaborate on
                impactful community programs — we'd love to connect.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button style={{
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg, #34D399, #22D3EE)',
                  border: 'none', borderRadius: '10px',
                  color: '#0B1C2D',
                  fontFamily: 'Syne, sans-serif', fontWeight: '700',
                  fontSize: '14px', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 24px rgba(52,211,153,0.3)',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(52,211,153,0.5)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 0 24px rgba(52,211,153,0.3)'
                  }}
                >
                  Get Involved →
                </button>
                <button style={{
                  padding: '14px 32px',
                  background: 'transparent',
                  border: '1px solid rgba(52,211,153,0.25)',
                  borderRadius: '10px', color: '#34D399',
                  fontFamily: 'Syne, sans-serif', fontWeight: '600',
                  fontSize: '14px', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(52,211,153,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(52,211,153,0.4)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'rgba(52,211,153,0.25)'
                  }}
                >
                  View Impact Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.1); }
          28% { transform: scale(1); }
          42% { transform: scale(1.08); }
          70% { transform: scale(1); }
        }
        @keyframes growBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}