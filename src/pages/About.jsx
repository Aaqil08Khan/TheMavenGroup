import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
    title: 'Strategic Intelligence',
    desc: 'We deploy resources where conviction meets clarity — across Saudi and Gulf real estate, Indian equity markets, and emerging cross-border opportunities.',
    color: '#1A56DB',
  },
  {
    icon: '⬡',
    title: 'Operational Depth',
    desc: "Behind every vertical is a team that understands the ground. We don't just invest — we build, operate, and scale businesses that create lasting value in local markets.",
    color: '#22D3EE',
  },
  {
    icon: '◉',
    title: 'Cross-Border Edge',
    desc: 'With active presence across India, Saudi Arabia, UAE, and Bahrain, we connect talent and opportunity across borders that others treat as barriers.',
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
  { name: 'Maven Business Services', tag: 'Finance & Markets',            color: '#1A56DB', route: '/verticals/business-services' },
  { name: 'Maven AI Tech',           tag: 'Artificial Intelligence & SaaS', color: '#22D3EE', route: '/verticals/ai-tech' },
  { name: 'Maven Contractors',       tag: 'Infrastructure & Construction', color: '#A78BFA', route: '/verticals/contractors' },
  { name: 'Maven E-Commerce',        tag: 'Retail & Digital Commerce',     color: '#F59E0B', route: '/verticals/ecommerce' },
]



export default function About() {
  const navigate = useNavigate()
  const [heroRef, heroInView] = useInView(0.1)
  const [storyRef, storyInView] = useInView(0.1)
  const [pillarsRef, pillarsInView] = useInView(0.1)
  const [verticalsRef, verticalsInView] = useInView(0.1)
  const [closingRef, closingInView] = useInView(0.1)

  return (
    <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px' }}>

      {/* HERO */}
      <section ref={heroRef} style={{ padding: '80px 20px 100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(26,86,219,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
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

          <h1 className="about-hero-h1" style={{
            fontFamily: 'Syne, sans-serif',
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
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#94A3B8',
            lineHeight: '1.8',
            maxWidth: '600px',
            margin: '0 auto',
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            The Maven's Group is a diversified global holding group with operations and ambitions
            stretching from South Asia to the Gulf.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section ref={storyRef} className="about-two-col">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #3B82F6, #22D3EE)' }} />
            <span style={{ color: '#22D3EE', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
              Our Story
            </span>
          </div>

          <h2 className="about-section-h2" style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: '800',
            color: '#F8FAFC',
            lineHeight: '1.2',
            marginBottom: '24px',
          }}>
            From a Single Idea to a{' '}
            <span className="gradient-text">Multi-Market Group</span>
          </h2>

          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(14px, 1.8vw, 16px)', color: '#94A3B8', lineHeight: '1.9', marginBottom: '20px' }}>
            The Maven's Group didn't start with a masterplan. It started with a conviction — that conviction,
            when paired with clarity of purpose and operational discipline, can build something meaningful
            across borders.
          </p>

          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(14px, 1.8vw, 16px)', color: '#94A3B8', lineHeight: '1.9', marginBottom: '20px' }}>
            Headquartered in Saudi Arabia and registered in the UAE, our roots trace back to Indian
            financial markets — where the group first deployed capital and built its investment discipline.
            Over time, that evolved into a structured group spanning AI technology, construction,
            e-commerce, and social impact.
          </p>

          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(14px, 1.8vw, 16px)', color: '#94A3B8', lineHeight: '1.9' }}>
            Today, TMG is not just an investment vehicle. It is an operating group — with tech operations
            running out of India, headquarters anchored in Saudi Arabia, and our legal and commercial
            structure registered in the UAE. People on the ground, real execution, and a long-term view
            that refuses to trade values for velocity.
          </p>
        </div>

        
        
      </section>

      {/* PILLARS */}
      <section ref={pillarsRef} style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)',
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #3B82F6, #22D3EE)' }} />
            <span style={{ color: '#22D3EE', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
              What Drives Us
            </span>
          </div>

          <h2 className="about-section-h2" style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: '800',
            color: '#F8FAFC',
            marginBottom: '64px',
          }}>
            Four Pillars. One Direction.
          </h2>

          <div className="about-pillars-grid">
            {pillars.map((p, i) => (
              <div key={i}
                className="pillar-card"
                style={{
                  opacity: pillarsInView ? 1 : 0,
                  transform: pillarsInView ? 'translateY(0)' : 'translateY(32px)',
                  transition: `all 0.7s ease ${i * 0.1}s`,
                  '--pillar-color': p.color,
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
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(14px, 1.8vw, 17px)', fontWeight: '700', color: '#F8FAFC', marginBottom: '12px' }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(13px, 1.5vw, 14px)', color: '#94A3B8', lineHeight: '1.8' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VERTICALS */}
      <section ref={verticalsRef} style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '64px' }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #3B82F6, #22D3EE)' }} />
            <span style={{ color: '#22D3EE', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
              Our Verticals
            </span>
          </div>

          <div className="about-verticals-grid">
            {verticals.map((v, i) => (
              <div key={i}
                className="vertical-card"
                style={{
                  opacity: verticalsInView ? 1 : 0,
                  transform: verticalsInView ? 'translateX(0)' : 'translateX(-24px)',
                  transition: `all 0.6s ease ${i * 0.1}s`,
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
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: v.color, fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
                    {v.tag}
                  </div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(15px, 2vw, 20px)', fontWeight: '700', color: '#F8FAFC' }}>
                    {v.name}
                  </div>
                </div>
                <div
                  onClick={() => navigate(v.route)}
                  style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: v.color + '15', border: `1px solid ${v.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: v.color, fontSize: '18px', flexShrink: 0,
                  cursor: 'pointer', transition: 'all .25s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = v.color + '30'; e.currentTarget.style.transform = 'scale(1.12)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = v.color + '15'; e.currentTarget.style.transform = 'scale(1)' }}
                >
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section ref={closingRef} style={{
        padding: 'clamp(60px, 8vw, 100px) 20px',
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
          <p className="about-closing-quote" style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: '700',
            color: '#F8FAFC',
            lineHeight: '1.5',
            opacity: closingInView ? 1 : 0,
            transform: closingInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.8s ease',
          }}>
            "We don't chase trends. We build institutions —{' '}
            <span className="gradient-text">one disciplined decision at a time."</span>
          </p>
        </div>
      </section>

      <style>{`
        .about-hero-h1 {
          font-size: clamp(28px, 6vw, 72px);
        }
        .about-section-h2 {
          font-size: clamp(22px, 4vw, 44px);
        }
        .about-closing-quote {
          font-size: clamp(18px, 4vw, 36px);
        }

        .about-two-col {
          display: flex;
          gap: 80px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(20px, 6vw, 80px) clamp(60px, 8vw, 100px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .stat-card {
          padding: 30px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          background: rgba(255,255,255,0.03);
          transition: border-color 0.3s ease, background 0.3s ease;
        }

        .stat-card:hover {
          border-color: rgba(26,86,219,0.4);
          background: rgba(255,255,255,0.05);
        }

        .about-pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .pillar-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 32px 28px;
          cursor: default;
          transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }

        .about-verticals-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .vertical-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }

        @media (max-width: 900px) {
          .about-two-col {
            flex-direction: column;
            gap: 48px;
            padding: 0 20px 80px;
          }

          .about-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .about-verticals-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .about-hero-h1 {
            font-size: clamp(22px, 8vw, 36px);
          }
          .about-section-h2 {
            font-size: clamp(18px, 6vw, 28px);
          }
          .about-closing-quote {
            font-size: clamp(16px, 5vw, 22px);
          }

          .about-pillars-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .vertical-card {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  )
}