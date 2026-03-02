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

const projectStreams = [
  { id: 'capital', title: 'Capital Engine', value: '₹1.60Cr+', note: 'Portfolio Momentum', color: '#3B82F6', icon: '📈' },
  { id: 'tech', title: 'AI Venture Lab', value: '3 Products', note: 'Investigat · OmniX · Aura', color: '#22D3EE', icon: '🤖' },
  { id: 'infra', title: 'Saudi Infra', value: 'Live Ops', note: 'Execution + Compliance', color: '#A78BFA', icon: '🏗️' },
  { id: 'commerce', title: 'Global Commerce', value: 'Cross-border', note: 'Brand Expansion Layer', color: '#F59E0B', icon: '🌐' },
]

// ─── useInView Hook ───────────────────────────────────────────
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

// ─── Animated Counter ─────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView(0.3)
  const started = useRef(false)
  useEffect(() => {
    if (inView && !started.current) {
      started.current = true
      const isDecimal = String(target).includes('.')
      const steps = 60
      const increment = target / steps
      let current = 0
      const interval = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(interval)
        } else {
          setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current))
        }
      }, duration / steps)
    }
  }, [inView, target, duration])
  return (
    <span ref={ref}>
      {prefix}{typeof target === 'number' && String(target).includes('.') ? count.toFixed(2) : count}{suffix}
    </span>
  )
}

// ─── Section Label ────────────────────────────────────────────
function SectionLabel({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
      <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #3B82F6, #22D3EE)' }} />
      <span style={{ color: '#22D3EE', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
        {text}
      </span>
    </div>
  )
}

// ─── HOME PAGE ────────────────────────────────────────────────
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

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
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

      <div style={{
        maxWidth: '1280px', margin: '0 auto', padding: '0 32px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px',
        alignItems: 'center', position: 'relative', zIndex: 2, width: '100%', paddingTop: '100px',
      }}>
        {/* LEFT */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', marginBottom: '32px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.1s' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22D3EE', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#22D3EE', fontSize: '12px', fontWeight: '500', letterSpacing: '1px', fontFamily: 'DM Sans, sans-serif' }}>GLOBAL HOLDING GROUP · EST. 2024</span>
          </div>

          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: '800', lineHeight: '1.1', color: '#F8FAFC', marginBottom: '12px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.2s' }}>Engineering Growth</h1>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '28px', background: 'linear-gradient(135deg, #3B82F6, #22D3EE, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.35s' }}>Across Borders.</h1>

          <p style={{ color: '#94A3B8', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '480px', marginBottom: '40px', fontFamily: 'DM Sans, sans-serif', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.5s' }}>
            A diversified holding group building scalable enterprises across
            <span style={{ color: '#60A5FA' }}> India</span>,
            <span style={{ color: '#22D3EE' }}> Saudi Arabia</span>, and
            <span style={{ color: '#A78BFA' }}> global markets</span> — through technology, operations, and strategic partnerships.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.65s' }}>
            {/* Explore Our Verticals → /verticals/ai-tech (first vertical) */}
            <button
              style={primaryBtn}
              onClick={() => navigate('/verticals/ai-tech')}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(59,130,246,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = '0 0 25px rgba(59,130,246,0.35)' }}
            >
              Explore Our Verticals →
            </button>

            {/* Partner With TMG → /about */}
            <button
              style={secondaryBtn}
              onClick={() => navigate('/about')}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'; e.currentTarget.style.color = '#F8FAFC' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#94A3B8' }}
            >
              Partner With TMG
            </button>
          </div>

          <div style={{ display: 'flex', gap: '32px', marginTop: '52px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.07)', opacity: visible ? 1 : 0, transition: 'all 0.7s ease 0.8s' }}>
            {[{ value: '4', label: 'Active Verticals' }, { value: '3', label: 'Global Markets' }].map(stat => (
              <div key={stat.label}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.6rem', fontWeight: '800', background: 'linear-gradient(135deg, #3B82F6, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{stat.value}</div>
                <div style={{ color: '#64748B', fontSize: '12px', marginTop: '2px', fontFamily: 'DM Sans, sans-serif' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Animated Project Matrix */}
        <ProjectPulsePanel visible={visible} />
      </div>

      {/* Scroll indicator */}
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
    <section ref={ref} style={{ padding: '120px 32px', maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(26,86,219,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', marginBottom: '80px', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
        <SectionLabel text="What We Do" />
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: '#F8FAFC', lineHeight: '1.15', marginBottom: '20px' }}>
          One Group. Four Engines.<br />
          <span style={{ background: 'linear-gradient(135deg, #3B82F6, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Infinite Potential.</span>
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '540px', margin: '0 auto', fontFamily: 'DM Sans, sans-serif' }}>
          TMG operates through four distinct verticals, each built to be independently powerful — and exponentially stronger together.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
        {pillars.map((p, i) => (
          <div key={p.title} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px',
            padding: '36px 28px',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'default',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(32px)',
            transition: `all 0.7s ease ${0.1 + i * 0.1}s`,
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.border = `1px solid ${p.color}33`
              e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px ${p.color}22`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
            <div style={{ fontSize: '32px', marginBottom: '20px' }}>{p.icon}</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '1.15rem', color: '#F8FAFC', marginBottom: '12px' }}>{p.title}</h3>
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
    {
      id: 'business-services',
      name: 'Maven Business Services',
      tag: 'Finance & Strategy',
      color: '#3B82F6',
      gradient: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(34,211,238,0.08))',
      icon: '📈',
      headline: 'Markets. Compounded.',
      description: 'Systematic deployment across Indian equities, international instruments, and Saudi real estate — with discipline and conviction.',
      stats: [{ label: 'AUM Growth', value: '18%', suffix: '+' }, { label: 'Markets', value: '3' }, { label: 'Strategy', value: 'Multi-asset' }],
      href: '/verticals/business-services',
    },
    {
      id: 'ai-tech',
      name: 'Maven AI Tech',
      tag: 'Artificial Intelligence',
      color: '#22D3EE',
      gradient: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.08))',
      icon: '🧠',
      headline: 'AI Built for the Real World.',
      description: 'Three flagship products: Investigat (legal intelligence), OmniX (enterprise AI), and Aura (human-centered AI). Now expanding from India to Saudi Arabia.',
      stats: [{ label: 'Products', value: '3' }, { label: 'Markets', value: 'IN → KSA' }, { label: 'Focus', value: 'Enterprise' }],
      href: '/verticals/ai-tech',
    },
    {
      id: 'contractors',
      name: 'Maven Contractors',
      tag: 'Infrastructure',
      color: '#A78BFA',
      gradient: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(59,130,246,0.08))',
      icon: '🏗️',
      headline: "Building the Gulf's Future.",
      description: 'Infrastructure contracting in Saudi Arabia — navigating Iqama, Kafala, and compliance complexities to deliver critical projects with precision and trust.',
      stats: [{ label: 'Region', value: 'KSA' }, { label: 'Focus', value: 'Infrastructure' }, { label: 'Status', value: 'Active' }],
      href: '/verticals/contractors',
    },
    {
      id: 'ecommerce',
      name: 'Maven E-Commerce',
      tag: 'Commerce & Retail',
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(59,130,246,0.08))',
      icon: '📦',
      headline: 'Unboxing Wonders.',
      description: 'Curated e-commerce experiences that transcend transactions. Bringing quality products to customers across India and global markets.',
      stats: [{ label: 'Brand', value: 'Unboxing Wonders' }, { label: 'Model', value: 'D2C' }, { label: 'Markets', value: 'Global' }],
      href: '/verticals/ecommerce',
    },
  ]

  const v = verticals[activeVertical]

  return (
    <section ref={ref} style={{ padding: '80px 32px 120px', position: 'relative', background: 'radial-gradient(ellipse at 50% 50%, rgba(11,28,45,0.8) 0%, var(--navy) 100%)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
          <SectionLabel text="Our Verticals" />
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: '#F8FAFC', lineHeight: '1.15' }}>
            The <span style={{ background: 'linear-gradient(135deg, #A78BFA, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Four Pillars</span> of TMG
          </h2>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '4px', opacity: inView ? 1 : 0, transition: 'all 0.7s ease 0.2s' }}>
          {verticals.map((vert, i) => (
            <button key={vert.id} onClick={() => setActiveVertical(i)} style={{
              padding: '10px 20px',
              borderRadius: '100px',
              border: activeVertical === i ? `1px solid ${vert.color}66` : '1px solid rgba(255,255,255,0.08)',
              background: activeVertical === i ? `${vert.color}18` : 'transparent',
              color: activeVertical === i ? vert.color : '#64748B',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: '500',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
            }}>
              {vert.icon} {vert.name}
            </button>
          ))}
        </div>

        {/* Active vertical card */}
        <div key={activeVertical} style={{
          background: v.gradient,
          border: `1px solid ${v.color}22`,
          borderRadius: '24px',
          padding: '56px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
          opacity: inView ? 1 : 0,
          transition: 'all 0.5s ease',
          animation: 'fadeInCard 0.4s ease',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, ${v.color}18 0%, transparent 70%)`, pointerEvents: 'none' }} />

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '100px', background: `${v.color}18`, border: `1px solid ${v.color}33`, marginBottom: '24px' }}>
              <span style={{ color: v.color, fontSize: '11px', fontWeight: '600', letterSpacing: '2px', fontFamily: 'DM Sans, sans-serif' }}>{v.tag.toUpperCase()}</span>
            </div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '800', color: '#F8FAFC', lineHeight: '1.2', marginBottom: '20px' }}>{v.headline}</h3>
            <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: '1.8', marginBottom: '36px', fontFamily: 'DM Sans, sans-serif' }}>{v.description}</p>
            <a href={v.href} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 26px', borderRadius: '10px',
              background: `linear-gradient(135deg, ${v.color}, ${v.color}99)`,
              color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: '600', fontSize: '14px',
              textDecoration: 'none', transition: 'all 0.3s ease',
              boxShadow: `0 0 24px ${v.color}44`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 0 40px ${v.color}66` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 0 24px ${v.color}44` }}
            >
              Explore {v.name} →
            </a>
          </div>

          <div>
            <div style={{ textAlign: 'center', fontSize: '80px', marginBottom: '40px', filter: `drop-shadow(0 0 40px ${v.color}66)` }}>{v.icon}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {v.stats.map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px 14px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: '800', fontSize: '1.1rem', color: v.color, marginBottom: '6px' }}>{s.value}{s.suffix || ''}</div>
                  <div style={{ color: '#64748B', fontSize: '11px', fontFamily: 'DM Sans, sans-serif' }}>{s.label}</div>
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
    { prefix: '', value: 4, suffix: '+', label: 'Active Verticals', color: '#3B82F6' },
    { value: 4, suffix: '', label: 'Business Verticals', color: '#22D3EE' },
    { value: 3, suffix: '+', label: 'Active Global Markets', color: '#A78BFA' },
    { value: 100, suffix: '%', label: 'Founder-Led, Independent', color: '#F59E0B' },
  ]

  return (
    <section ref={ref} style={{ padding: '100px 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(26,86,219,0.07) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '72px', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
          <SectionLabel text="By The Numbers" />
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: '#F8FAFC' }}>
            Measured in <span style={{ background: 'linear-gradient(135deg, #3B82F6, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Milestones</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              padding: '40px 28px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(32px)',
              transition: `all 0.7s ease ${i * 0.12}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${s.color}33`; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
              <div style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', width: '120px', height: '120px', borderRadius: '50%', background: `radial-gradient(circle, ${s.color}12 0%, transparent 70%)`, pointerEvents: 'none' }} />
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: '800', color: s.color, marginBottom: '12px', letterSpacing: '-1px' }}>
                <AnimatedCounter target={s.value} prefix={s.prefix || ''} suffix={s.suffix} />
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.5' }}>{s.label}</div>
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
    { icon: '🌍', title: 'Cross-Border DNA', desc: "Built from day one to operate across jurisdictions — India, Gulf, and beyond. We speak every market's language.", color: '#22D3EE' },
    { icon: '⚙️', title: 'Systems Over Hustle', desc: 'Scalable frameworks, not heroic effort. We build systems that compound.', color: '#A78BFA' },
    { icon: '🤝', title: 'Trust as Infrastructure', desc: 'Relationships in business are infrastructure. We build trust the way we build companies — with patience and precision.', color: '#F59E0B' },
    { icon: '📐', title: 'Disciplined Execution', desc: 'Every move has a role. No speculative bets — just strategic, principled allocation.', color: '#22D3EE' },
    { icon: '🌱', title: 'Long-Term Thinking', desc: 'We measure success in decades, not quarters. Every vertical is built to outlast.', color: '#3B82F6' },
  ]

  return (
    <section ref={ref} style={{ padding: '100px 32px', position: 'relative', background: 'linear-gradient(180deg, var(--navy) 0%, #060F1A 100%)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-24px)', transition: 'all 0.7s ease' }}>
            <SectionLabel text="Why TMG" />
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: '800', color: '#F8FAFC', lineHeight: '1.15', marginBottom: '24px' }}>
              We Don't Just Invest.<br />
              <span style={{ background: 'linear-gradient(135deg, #3B82F6, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>We Build.</span>
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: '1.85', fontFamily: 'DM Sans, sans-serif', marginBottom: '32px' }}>
              TMG is not a fund. It's not an agency. It's not a consultancy. It's a holding group built by operators — for operators. We build products and create presence in markets others overlook.
            </p>
            <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: '1.8', fontFamily: 'DM Sans, sans-serif' }}>
              From India's markets to Saudi Arabia's infrastructure boom — we go where conviction leads, and we stay until we've built something that matters.
            </p>

            <div style={{ marginTop: '48px', padding: '28px 32px', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderLeft: '3px solid #3B82F6', borderRadius: '12px' }}>
              <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: '1.7', fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic', margin: 0 }}>
                "We're not chasing markets. We're building the infrastructure that markets will depend on."
              </p>
              <div style={{ marginTop: '16px', color: '#64748B', fontSize: '12px', letterSpacing: '1px', fontFamily: 'DM Sans, sans-serif' }}>— THE MAVEN'S GROUP FOUNDING PRINCIPLE</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {values.map((v, i) => (
              <div key={v.title} style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '24px 20px',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${0.1 + i * 0.08}s`,
                cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${v.color}33`; e.currentTarget.style.background = `rgba(${v.color === '#3B82F6' ? '59,130,246' : v.color === '#22D3EE' ? '34,211,238' : '167,139,250'},0.04)` }}
                onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
              >
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>{v.icon}</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '0.9rem', color: '#F8FAFC', marginBottom: '8px' }}>{v.title}</div>
                <div style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: '1.6', fontFamily: 'DM Sans, sans-serif' }}>{v.desc}</div>
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
    <section ref={ref} style={{ padding: '100px 32px 120px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(26,86,219,0.14) 0%, transparent 65%)' }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
        <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, #3B82F6)', margin: '0 auto 40px' }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', marginBottom: '32px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22D3EE', animation: 'pulse 2s infinite' }} />
          <span style={{ color: '#22D3EE', fontSize: '11px', fontWeight: '600', letterSpacing: '2px', fontFamily: 'DM Sans, sans-serif' }}>LET'S BUILD TOGETHER</span>
        </div>

        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: '800', color: '#F8FAFC', lineHeight: '1.1', marginBottom: '24px' }}>
          Ready to Grow<br />
          <span style={{ background: 'linear-gradient(135deg, #3B82F6, #22D3EE, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Across Borders?</span>
        </h2>

        <p style={{ color: '#94A3B8', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '520px', margin: '0 auto 48px', fontFamily: 'DM Sans, sans-serif' }}>
          Whether you're an investor, a partner, or a builder — there's a place for you in the TMG ecosystem. Let's talk.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Investor Relations → /investors */}
          <button
            style={{ ...primaryBtn, padding: '16px 36px', fontSize: '15px' }}
            onClick={() => navigate('/investors')}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(59,130,246,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = '0 0 25px rgba(59,130,246,0.35)' }}
          >
            Investor Relations →
          </button>

          {/* Partner With TMG → /about */}
          <button
            style={{ ...secondaryBtn, padding: '16px 36px', fontSize: '15px' }}
            onClick={() => navigate('/about')}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'; e.currentTarget.style.color = '#F8FAFC' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#94A3B8' }}
          >
            Partner With TMG
          </button>
        </div>

        <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, #3B82F6, transparent)', margin: '60px auto 0' }} />
      </div>
    </section>
  )
}

// ─── SHARED COMPONENTS ────────────────────────────────────────
function ProjectPulsePanel({ visible }) {
  return (
    <div style={{ position: 'relative', height: '500px', opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(40px)', transition: 'all 0.9s ease 0.4s' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.16) 0%, rgba(26,86,219,0.08) 45%, transparent 72%)', animation: 'orbPulse 4s ease-in-out infinite' }} />

      <div style={{ position: 'absolute', inset: 0, borderRadius: '20px', background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', backdropFilter: 'blur(5px)', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <p style={{ color: '#22D3EE', letterSpacing: '2px', fontSize: '11px', fontWeight: '600', marginBottom: '4px', fontFamily: 'DM Sans, sans-serif' }}>LIVE EXECUTION MATRIX</p>
            <h3 style={{ color: '#F8FAFC', fontFamily: 'Syne, sans-serif', fontSize: '1.2rem' }}>TMG Growth Engine</h3>
          </div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22D3EE', boxShadow: '0 0 14px #22D3EE', animation: 'pulse 2s infinite' }} />
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {projectStreams.map((stream, idx) => (
            <div key={stream.id} style={{ border: `1px solid ${stream.color}44`, borderRadius: '12px', padding: '12px 14px', background: 'rgba(11,28,45,0.65)', boxShadow: `inset 0 0 0 1px ${stream.color}22`, animation: `fadeInCard 0.6s ${0.15 * idx}s both` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>{stream.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#E2E8F0', fontFamily: 'Syne, sans-serif', fontSize: '13px', fontWeight: '700' }}>{stream.title}</p>
                  <p style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif', fontSize: '11px' }}>{stream.note}</p>
                </div>
                <p style={{ color: stream.color, fontFamily: 'Syne, sans-serif', fontSize: '12px', fontWeight: '700' }}>{stream.value}</p>
              </div>
              <div style={{ marginTop: '8px', height: '4px', borderRadius: '10px', background: 'rgba(148,163,184,0.18)', overflow: 'hidden' }}>
                <div style={{ width: `${75 + idx * 6}%`, height: '100%', borderRadius: '10px', background: `linear-gradient(90deg, ${stream.color}, rgba(255,255,255,0.2))`, animation: `dataFlow 3s ${0.3 * idx}s ease-in-out infinite` }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 10px #3B82F6' }} />
          <p style={{ color: '#94A3B8', fontFamily: 'DM Sans, sans-serif', fontSize: '11px' }}>Synchronized capital, AI products, infrastructure, and commerce in one operating rhythm.</p>
        </div>
      </div>
    </div>
  )
}

// ─── STYLES ───────────────────────────────────────────────────
const primaryBtn = {
  padding: '14px 28px',
  background: 'linear-gradient(135deg, #1A56DB, #22D3EE)',
  border: 'none',
  borderRadius: '10px',
  color: 'white',
  fontFamily: 'Syne, sans-serif',
  fontWeight: '600',
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 0 25px rgba(59,130,246,0.35)',
}

const secondaryBtn = {
  padding: '14px 28px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '10px',
  color: '#94A3B8',
  fontFamily: 'Syne, sans-serif',
  fontWeight: '600',
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
}

function GlobalStyles() {
  return (
    <style>{`
      @keyframes float {
        from { transform: translateY(0px) translateX(0px); }
        to { transform: translateY(-20px) translateX(10px); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(0.8); }
      }
      @keyframes ping {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
        50% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
      }
      @keyframes orbPulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
      }
      @keyframes dashMove {
        from { stroke-dashoffset: 0; }
        to { stroke-dashoffset: -20; }
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
      @keyframes dataFlow {
        0%, 100% { opacity: 0.75; transform: translateX(0); }
        50% { opacity: 1; transform: translateX(3%); }
      }
    `}</style>
  )
}