import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Particles ───────────────────────────────────────────────
const particles = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 20 + 10,
  delay: Math.random() * 10,
  opacity: Math.random() * 0.5 + 0.1,
}))


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

function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView(0.3)
  const started = useRef(false)
  useEffect(() => {
    if (inView && !started.current) {
      started.current = true
      const steps = 60
      const increment = target / steps
      let current = 0
      const interval = setInterval(() => {
        current += increment
        if (current >= target) { setCount(target); clearInterval(interval) }
        else setCount(Math.floor(current))
      }, duration / steps)
    }
  }, [inView, target, duration])
  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

function SectionLabel({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
      <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #3B82F6, #22D3EE)', flexShrink: 0 }} />
      <span style={{ color: '#22D3EE', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
        {text}
      </span>
    </div>
  )
}

export default function Home() {
  return (
    <div style={{ background: 'var(--navy)', minHeight: '100vh' }}>
      <HeroSection />
      <WhatWeDoSection />
      <VerticalsSection />
      <GlobalStatsSection />
      <WhyTMGSection />
      <CTASection />
      <GlobalStyles />
    </div>
  )
}

// ─── 1. HERO ──────────────────────────────────────────────────
function HeroSection() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  return (
    <section style={{
      minHeight: '100vh', position: 'relative',
      display: 'flex', alignItems: 'center', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 20% 50%, #0D2137 0%, #0B1C2D 60%, #060F1A 100%)',
    }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at 70% 30%, rgba(26,86,219,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(13,148,136,0.08) 0%, transparent 50%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
          background: p.id % 3 === 0 ? '#3B82F6' : p.id % 3 === 1 ? '#22D3EE' : '#A78BFA',
          opacity: p.opacity, animation: `float ${p.duration}s ${p.delay}s ease-in-out infinite alternate`, zIndex: 1,
        }} />
      ))}

      <div className="home-hero-grid">
        {/* LEFT */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', marginBottom: '32px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.1s' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22D3EE', animation: 'pulse 2s infinite', flexShrink: 0 }} />
            <span style={{ color: '#22D3EE', fontSize: '11px', fontWeight: '500', letterSpacing: '1px', fontFamily: 'DM Sans, sans-serif' }}>GLOBAL HOLDING GROUP · EST. 2024</span>
          </div>

          <h1 className="home-hero-h1" style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: '400', letterSpacing: '2px', lineHeight: '1.0', color: '#F8FAFC', marginBottom: '12px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.2s' }}>Engineering Growth</h1>
          <h1 className="home-hero-h1" style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: '400', letterSpacing: '2px', lineHeight: '1.0', marginBottom: '28px', background: 'linear-gradient(135deg, #3B82F6, #22D3EE, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.35s' }}>Across Borders.</h1>

          <p style={{ color: '#94A3B8', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: '1.8', maxWidth: '480px', marginBottom: '40px', fontFamily: 'DM Sans, sans-serif', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.5s' }}>
            A diversified holding group building scalable enterprises across
            <span style={{ color: '#60A5FA' }}> India</span>,
            <span style={{ color: '#22D3EE' }}> Saudi Arabia</span>, and
            <span style={{ color: '#A78BFA' }}> global markets</span> — through technology, operations, and strategic partnerships.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.65s' }}>
            <button className="home-btn-primary" onClick={() => navigate('/verticals/ai-tech')}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(59,130,246,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = '0 0 25px rgba(59,130,246,0.35)' }}>
              Explore Our Verticals →
            </button>
            <button className="home-btn-secondary" onClick={() => navigate('/about')}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'; e.currentTarget.style.color = '#F8FAFC' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#94A3B8' }}>
              Partner With TMG
            </button>
          </div>

          
        </div>

        {/* RIGHT — hidden on mobile */}
        <div className="home-hero-panel">
          <ProjectPulsePanel visible={visible} />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.5, zIndex: 2 }}>
        <span style={{ color: '#64748B', fontSize: '11px', letterSpacing: '2px', fontFamily: 'DM Sans, sans-serif' }}>SCROLL</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #3B82F6, transparent)', animation: 'scrollLine 2s ease-in-out infinite' }} />
      </div>
    </section>
  )
}

// ─── 2. WHAT WE DO ────────────────────────────────────────────
function WhatWeDoSection() {
  const [ref, inView] = useInView(0.15)

  const pillars = [
    { icon: '💼', title: 'Strategic Deployment', desc: 'Systematic allocation across Indian equities, international markets, and Gulf real estate — with a compounding-first philosophy.', color: '#3B82F6' },
    { icon: '🤖', title: 'Technology Ventures', desc: 'Building AI-native products for legal intelligence, enterprise operations, and human-centered experiences.', color: '#22D3EE' },
    { icon: '🏗️', title: 'Infrastructure & Contracting', desc: 'Delivering critical infrastructure projects across Saudi Arabia — from compliance to execution.', color: '#A78BFA' },
    { icon: '🌐', title: 'Global Commerce', desc: 'Curating and scaling e-commerce brands that carry the essence of quality across borders.', color: '#F59E0B' },
  ]

  return (
    <section ref={ref} style={{ padding: 'clamp(60px, 10vw, 120px) 24px', maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(26,86,219,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', marginBottom: '60px', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
        <SectionLabel text="What We Do" />
        <h2 className="home-section-h2" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', color: '#F8FAFC', lineHeight: '1.15', marginBottom: '20px' }}>
          One Group. Four Engines.{' '}
          <span className="home-h2-break" />
          <span style={{ background: 'linear-gradient(135deg, #3B82F6, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Infinite Potential.</span>
        </h2>
        <p style={{ color: '#94A3B8', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', lineHeight: '1.8', maxWidth: '540px', margin: '0 auto', fontFamily: 'DM Sans, sans-serif' }}>
          TMG operates through four distinct verticals, each built to be independently powerful — and exponentially stronger together.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {pillars.map((p, i) => (
          <div key={p.title} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px', padding: 'clamp(24px, 4vw, 36px) clamp(20px, 3vw, 28px)',
            position: 'relative', overflow: 'hidden', cursor: 'default',
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
            transition: `all 0.7s ease ${0.1 + i * 0.1}s`,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.border = `1px solid ${p.color}33`; e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px ${p.color}22` }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
            <div style={{ fontSize: '32px', marginBottom: '20px' }}>{p.icon}</div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700', fontSize: '1.1rem', color: '#F8FAFC', marginBottom: '12px' }}>{p.title}</h3>
            <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.7', fontFamily: 'DM Sans, sans-serif' }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── 3. VERTICALS SHOWCASE ────────────────────────────────────
function VerticalsSection() {
  const [ref, inView] = useInView(0.1)
  const [activeVertical, setActiveVertical] = useState(0)

  const verticals = [
    { id: 'business-services', name: 'Maven Business Services', tag: 'Finance & Strategy', color: '#3B82F6', gradient: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(34,211,238,0.08))', icon: '📈', headline: 'Markets. Compounded.', description: 'Systematic deployment across Indian equities, international instruments, and Saudi real estate — with discipline and conviction.', stats: [{ label: 'Markets', value: '3' }, { label: 'Approach', value: 'Long-Term' }, { label: 'Strategy', value: 'Multi-asset' }], href: '/verticals/business-services' },
    { id: 'ai-tech', name: 'Maven AI Tech', tag: 'Artificial Intelligence', color: '#22D3EE', gradient: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.08))', icon: '🧠', headline: 'AI Built for the Real World.', description: 'Three flagship products: Investigat (legal intelligence), OmniX (enterprise AI), and Aura (human-centered AI). Now expanding from India to Saudi Arabia.', stats: [{ label: 'Products', value: '3' }, { label: 'Markets', value: 'IN → KSA' }, { label: 'Focus', value: 'Enterprise' }], href: '/verticals/ai-tech' },
    { id: 'contractors', name: 'Maven Contractors', tag: 'Infrastructure', color: '#A78BFA', gradient: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(59,130,246,0.08))', icon: '🏗️', headline: "Building the Gulf's Future.", description: 'Infrastructure contracting in Saudi Arabia — navigating Iqama, Kafala, and compliance complexities to deliver critical projects with precision and trust.', stats: [{ label: 'Region', value: 'KSA' }, { label: 'Focus', value: 'Infrastructure' }, { label: 'Status', value: 'Active' }], href: '/verticals/contractors' },
    { id: 'ecommerce', name: 'Maven E-Commerce', tag: 'Commerce & Retail', color: '#F59E0B', gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(59,130,246,0.08))', icon: '📦', headline: 'Unboxing Wonders.', description: 'Curated e-commerce experiences that transcend transactions. Bringing quality products to customers across India and global markets.', stats: [{ label: 'Brand', value: 'Unboxing Wonders' }, { label: 'Model', value: 'D2C' }, { label: 'Markets', value: 'Global' }], href: '/verticals/ecommerce' },
  ]

  const v = verticals[activeVertical]

  return (
    <section ref={ref} style={{ padding: 'clamp(60px, 8vw, 80px) 24px clamp(60px, 10vw, 120px)', position: 'relative', background: 'radial-gradient(ellipse at 50% 50%, rgba(11,28,45,0.8) 0%, var(--navy) 100%)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
          <SectionLabel text="Our Verticals" />
          <h2 className="home-section-h2" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', color: '#F8FAFC', lineHeight: '1.15' }}>
            The <span style={{ background: 'linear-gradient(135deg, #A78BFA, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Four Pillars</span> of TMG
          </h2>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px', opacity: inView ? 1 : 0, transition: 'all 0.7s ease 0.2s', WebkitOverflowScrolling: 'touch' }}>
          {verticals.map((vert, i) => (
            <button key={vert.id} onClick={() => setActiveVertical(i)} style={{
              padding: '9px 14px', borderRadius: '100px', flexShrink: 0,
              border: activeVertical === i ? `1px solid ${vert.color}66` : '1px solid rgba(255,255,255,0.08)',
              background: activeVertical === i ? `${vert.color}18` : 'transparent',
              color: activeVertical === i ? vert.color : '#64748B',
              fontFamily: 'DM Sans, sans-serif', fontWeight: '500', fontSize: '13px',
              cursor: 'pointer', transition: 'all 0.3s ease', whiteSpace: 'nowrap',
            }}>
              {vert.icon} {vert.name}
            </button>
          ))}
        </div>

        {/* Vertical card */}
        <div key={activeVertical} className="home-vertical-card" style={{
          background: v.gradient, border: `1px solid ${v.color}22`,
          borderRadius: '24px', padding: 'clamp(28px, 5vw, 56px) clamp(20px, 4vw, 48px)',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 60px)',
          alignItems: 'center', opacity: inView ? 1 : 0, transition: 'all 0.5s ease',
          animation: 'fadeInCard 0.4s ease', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, ${v.color}18 0%, transparent 70%)`, pointerEvents: 'none' }} />

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '100px', background: `${v.color}18`, border: `1px solid ${v.color}33`, marginBottom: '24px' }}>
              <span style={{ color: v.color, fontSize: '11px', fontWeight: '600', letterSpacing: '2px', fontFamily: 'DM Sans, sans-serif' }}>{v.tag.toUpperCase()}</span>
            </div>
            <h3 className="home-vertical-h3" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', color: '#F8FAFC', lineHeight: '1.2', marginBottom: '20px' }}>{v.headline}</h3>
            <p style={{ color: '#94A3B8', fontSize: 'clamp(0.88rem, 1.8vw, 1rem)', lineHeight: '1.8', marginBottom: '32px', fontFamily: 'DM Sans, sans-serif' }}>{v.description}</p>
            <a href={v.href} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 24px', borderRadius: '10px',
              background: `linear-gradient(135deg, ${v.color}, ${v.color}99)`,
              color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: '600', fontSize: '14px',
              textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: `0 0 24px ${v.color}44`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 0 40px ${v.color}66` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 0 24px ${v.color}44` }}>
              Explore {v.name} →
            </a>
          </div>

          <div className="home-vertical-right">
            <div style={{ textAlign: 'center', fontSize: 'clamp(48px, 8vw, 80px)', marginBottom: '28px', filter: `drop-shadow(0 0 40px ${v.color}66)` }}>{v.icon}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {v.stats.map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: 'clamp(10px, 2vw, 18px) clamp(6px, 1.5vw, 14px)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', fontSize: 'clamp(0.78rem, 1.5vw, 1.1rem)', color: v.color, marginBottom: '6px', wordBreak: 'break-word' }}>{s.value}{s.suffix || ''}</div>
                  <div style={{ color: '#64748B', fontSize: '10px', fontFamily: 'DM Sans, sans-serif' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 4. GLOBAL STATS ──────────────────────────────────────────
function GlobalStatsSection() {
  const [ref, inView] = useInView(0.2)
  const stats = [
    { value: 4, suffix: '+', label: 'Active Verticals', color: '#3B82F6' },
    { value: 4, suffix: '', label: 'Business Verticals', color: '#22D3EE' },
    { value: 3, suffix: '+', label: 'Active Global Markets', color: '#A78BFA' },
    { value: 100, suffix: '%', label: 'Founder-Led, Independent', color: '#F59E0B' },
  ]

  return (
    <section ref={ref} style={{ padding: 'clamp(60px, 10vw, 100px) 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(26,86,219,0.07) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
          <SectionLabel text="By The Numbers" />
          <h2 className="home-section-h2" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', color: '#F8FAFC' }}>
            Measured in <span style={{ background: 'linear-gradient(135deg, #3B82F6, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Milestones</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px', padding: 'clamp(24px, 4vw, 40px) clamp(16px, 3vw, 28px)',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
              opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
              transition: `all 0.7s ease ${i * 0.12}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${s.color}33`; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: '800', color: s.color, marginBottom: '12px', letterSpacing: '-1px' }}>
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.5' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 5. WHY TMG ───────────────────────────────────────────────
function WhyTMGSection() {
  const [ref, inView] = useInView(0.1)
  const values = [
    { icon: '🧭', title: 'Founder-Led Vision', desc: 'Every decision is made by builders who have skin in the game — not committees or bureaucracies.', color: '#3B82F6' },
    { icon: '🌍', title: 'Cross-Border DNA', desc: "Built from day one to operate across jurisdictions — India, Gulf, and beyond.", color: '#22D3EE' },
    { icon: '⚙️', title: 'Systems Over Hustle', desc: 'Scalable frameworks, not heroic effort. We build systems that compound.', color: '#A78BFA' },
    { icon: '🤝', title: 'Trust as Infrastructure', desc: 'Relationships in business are infrastructure. We build trust with patience and precision.', color: '#F59E0B' },
    { icon: '📐', title: 'Disciplined Execution', desc: 'Every move has a role. No speculative bets — just strategic, principled allocation.', color: '#22D3EE' },
    { icon: '🌱', title: 'Long-Term Thinking', desc: 'We measure success in decades, not quarters. Every vertical is built to outlast.', color: '#3B82F6' },
  ]

  return (
    <section ref={ref} style={{ padding: 'clamp(60px, 10vw, 100px) 24px', position: 'relative', background: 'linear-gradient(180deg, var(--navy) 0%, #060F1A 100%)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="home-why-grid">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-24px)', transition: 'all 0.7s ease' }}>
            <SectionLabel text="Why TMG" />
            <h2 className="home-why-h2" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', color: '#F8FAFC', lineHeight: '1.15', marginBottom: '24px' }}>
              We Don't Just Invest.{' '}
              <span className="home-h2-break" />
              <span style={{ background: 'linear-gradient(135deg, #3B82F6, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>We Build.</span>
            </h2>
            <p style={{ color: '#94A3B8', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', lineHeight: '1.85', fontFamily: 'DM Sans, sans-serif', marginBottom: '32px' }}>
              TMG is not a fund. It's not an agency. It's not a consultancy. It's a holding group built by operators — for operators.
            </p>
            <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: '1.8', fontFamily: 'DM Sans, sans-serif' }}>
              From India's markets to Saudi Arabia's infrastructure boom — we go where conviction leads.
            </p>
            <div style={{ marginTop: '40px', padding: 'clamp(18px, 3vw, 28px) clamp(18px, 3vw, 32px)', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderLeft: '3px solid #3B82F6', borderRadius: '12px' }}>
              <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: '1.7', fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic', margin: 0 }}>
                "We're not chasing markets. We're building the infrastructure that markets will depend on."
              </p>
              <div style={{ marginTop: '16px', color: '#64748B', fontSize: '11px', letterSpacing: '1px', fontFamily: 'DM Sans, sans-serif' }}>— THE MAVEN'S GROUP FOUNDING PRINCIPLE</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {values.map((v, i) => (
              <div key={v.title} style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px', padding: 'clamp(14px, 2.5vw, 24px) clamp(12px, 2vw, 20px)',
                opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${0.1 + i * 0.08}s`, cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${v.color}33`; e.currentTarget.style.background = 'rgba(59,130,246,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
              >
                <div style={{ fontSize: '22px', marginBottom: '10px' }}>{v.icon}</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700', fontSize: '0.88rem', color: '#F8FAFC', marginBottom: '8px' }}>{v.title}</div>
                <div style={{ color: '#64748B', fontSize: '0.78rem', lineHeight: '1.6', fontFamily: 'DM Sans, sans-serif' }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 6. CTA ───────────────────────────────────────────────────
function CTASection() {
  const [ref, inView] = useInView(0.2)
  const navigate = useNavigate()

  return (
    <section ref={ref} style={{ padding: 'clamp(60px, 10vw, 100px) 24px clamp(80px, 12vw, 120px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(26,86,219,0.14) 0%, transparent 65%)' }} />
      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
        <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, #3B82F6)', margin: '0 auto 40px' }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', marginBottom: '32px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22D3EE', animation: 'pulse 2s infinite', flexShrink: 0 }} />
          <span style={{ color: '#22D3EE', fontSize: '11px', fontWeight: '600', letterSpacing: '2px', fontFamily: 'DM Sans, sans-serif' }}>LET'S BUILD TOGETHER</span>
        </div>
        <h2 className="home-cta-h2" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', color: '#F8FAFC', lineHeight: '1.1', marginBottom: '24px' }}>
          Ready to Grow{' '}
          <span className="home-h2-break" />
          <span style={{ background: 'linear-gradient(135deg, #3B82F6, #22D3EE, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Across Borders?</span>
        </h2>
        <p style={{ color: '#94A3B8', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: '1.8', maxWidth: '520px', margin: '0 auto 48px', fontFamily: 'DM Sans, sans-serif' }}>
          Whether you're an investor, a partner, or a builder — there's a place for you in the TMG ecosystem. Let's talk.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="home-btn-primary"
            style={{ padding: 'clamp(13px, 2vw, 16px) clamp(24px, 4vw, 36px)', fontSize: 'clamp(14px, 2vw, 15px)' }}
            onClick={() => navigate('/investors')}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(59,130,246,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = '0 0 25px rgba(59,130,246,0.35)' }}>
            Investor Relations →
          </button>
          <button className="home-btn-secondary"
            style={{ padding: 'clamp(13px, 2vw, 16px) clamp(24px, 4vw, 36px)', fontSize: 'clamp(14px, 2vw, 15px)' }}
            onClick={() => navigate('/about')}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'; e.currentTarget.style.color = '#F8FAFC' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#94A3B8' }}>
            Partner With TMG
          </button>
        </div>
        <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, #3B82F6, transparent)', margin: '60px auto 0' }} />
      </div>
    </section>
  )
}

// ─── HERO IMAGE PANEL ─────────────────────────────────────────
function ProjectPulsePanel({ visible }) {
  return (
    <div style={{
      position: 'relative', height: '500px',
      opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(40px)',
      transition: 'all 0.9s ease 0.4s',
    }}>
      {/* Image container */}
      <div style={{ borderRadius: '20px', overflow: 'hidden', height: '100%', position: 'relative', boxShadow: '0 32px 80px rgba(0,0,0,0.55)' }}>
        <img
          src="../images/landingpage.avif"
          alt="Global network"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Blue tint overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,86,219,0.5) 0%, rgba(11,28,45,0.6) 100%)' }} />
        {/* Top accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #3B82F6, #22D3EE, transparent)' }} />
        {/* Bottom caption card */}
        <div style={{
          position: 'absolute', bottom: '24px', left: '24px', right: '24px',
          background: 'rgba(11,28,45,0.88)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(59,130,246,0.25)', borderRadius: '16px',
          padding: '20px 24px',
        }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#64748B', letterSpacing: '2px', fontWeight: '600', marginBottom: '8px' }}>OUR MANDATE</div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', fontWeight: '600', color: '#F8FAFC', lineHeight: '1.6' }}>
            "Engineering growth across borders —<br/>one disciplined decision at a time."
          </div>
        </div>
        {/* Top-right badge */}
        <div style={{
          position: 'absolute', top: '24px', right: '24px',
          background: 'rgba(11,28,45,0.85)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(34,211,238,0.25)', borderRadius: '12px',
          padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22D3EE', animation: 'pulse 2s infinite', boxShadow: '0 0 8px #22D3EE' }} />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: '700', color: '#22D3EE', letterSpacing: '1px' }}>EST. 2024 · GLOBAL</span>
        </div>
      </div>
    </div>
  )
}

// ─── STYLES ───────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@400;500;600;700;800&display=swap');

      @keyframes float {
        from { transform: translateY(0px) translateX(0px); }
        to { transform: translateY(-20px) translateX(10px); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(0.8); }
      }
      @keyframes orbPulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
      }
      @keyframes scrollLine {
        0% { opacity: 0; transform: scaleY(0); transform-origin: top; }
        50% { opacity: 1; transform: scaleY(1); }
        100% { opacity: 0; transform: scaleY(1); transform-origin: bottom; }
      }
      @keyframes fadeInCard {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* ── Heading sizes ── */
      .home-hero-h1 {
        font-size: clamp(1.75rem, 5vw, 4.2rem);
      }
      .home-section-h2 {
        font-size: clamp(1.5rem, 4vw, 3rem);
      }
      .home-why-h2 {
        font-size: clamp(1.5rem, 3.5vw, 2.8rem);
      }
      .home-cta-h2 {
        font-size: clamp(1.6rem, 5vw, 3.8rem);
      }
      .home-vertical-h3 {
        font-size: clamp(1.1rem, 3vw, 2.4rem);
      }

      /* ── Shared buttons ── */
      .home-btn-primary {
        padding: 14px 28px;
        background: linear-gradient(135deg, #1A56DB, #22D3EE);
        border: none; border-radius: 10px;
        color: white; font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 14px;
        cursor: pointer; transition: all 0.3s ease;
        box-shadow: 0 0 25px rgba(59,130,246,0.35);
        white-space: nowrap;
      }
      .home-btn-secondary {
        padding: 14px 28px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.12); border-radius: 10px;
        color: #94A3B8; font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 14px;
        cursor: pointer; transition: all 0.3s ease;
        white-space: nowrap;
      }

      /* ── Hero grid ── */
      .home-hero-grid {
        max-width: 1280px; margin: 0 auto; padding: 0 24px;
        display: grid; grid-template-columns: 1fr 1fr; gap: 60px;
        align-items: center; position: relative; z-index: 2;
        width: 100%; padding-top: 100px;
      }

      /* ── Why grid ── */
      .home-why-grid {
        display: grid; grid-template-columns: 1fr 1fr;
        gap: clamp(40px, 6vw, 80px); align-items: start;
      }

      /* ── Vertical card ── */
      .home-vertical-card {
        display: grid; grid-template-columns: 1fr 1fr;
        gap: clamp(32px, 5vw, 60px);
      }

      /* ── br helper: shows on desktop, hides on mobile ── */
      .home-h2-break { display: block; }

      /* ────────────────────────────
         TABLET  ≤ 900px
      ──────────────────────────── */
      @media (max-width: 900px) {
        .home-hero-grid {
          grid-template-columns: 1fr !important;
          padding-top: 120px !important;
          padding-bottom: 60px !important;
          gap: 0 !important;
        }
        .home-hero-panel { display: none !important; }

        .home-vertical-card {
          grid-template-columns: 1fr !important;
          gap: 32px !important;
        }
        .home-vertical-right { order: -1; }

        .home-why-grid {
          grid-template-columns: 1fr !important;
          gap: 48px !important;
        }
      }

      /* ────────────────────────────
         MOBILE  ≤ 600px
      ──────────────────────────── */
      @media (max-width: 600px) {
        .home-hero-grid {
          padding: 100px 20px 48px !important;
        }
        .home-btn-primary, .home-btn-secondary {
          width: 100%; text-align: center;
          padding: 14px 20px !important;
          box-sizing: border-box;
        }

        /* Collapse line-break helpers on mobile */
        .home-h2-break { display: inline; }

        /* Tighten hero heading on small phones */
        .home-hero-h1 {
          font-size: clamp(1.6rem, 8vw, 2.4rem);
        }
        .home-section-h2 {
          font-size: clamp(1.35rem, 6vw, 1.8rem);
        }
        .home-why-h2 {
          font-size: clamp(1.35rem, 6vw, 1.8rem);
        }
        .home-cta-h2 {
          font-size: clamp(1.5rem, 7vw, 2.2rem);
        }
        .home-vertical-h3 {
          font-size: clamp(1rem, 5vw, 1.4rem);
        }
      }

      /* ── Scrollbar ── */
      ::-webkit-scrollbar { height: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 4px; }
    `}</style>
  )
}