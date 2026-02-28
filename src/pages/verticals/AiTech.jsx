import { useRef, useState, useEffect } from 'react'

// ─── useInView ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

// ─── Neural network node positions ────────────────────────────────────────────
const NEURAL_NODES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: 8 + Math.random() * 84,
  y: 8 + Math.random() * 84,
  r: Math.random() * 2.2 + 1,
  delay: Math.random() * 4,
  dur: Math.random() * 3 + 2,
}))

const NEURAL_EDGES = NEURAL_NODES.flatMap((n, i) =>
  NEURAL_NODES.slice(i + 1)
    .filter(m => {
      const dx = n.x - m.x, dy = n.y - m.y
      return Math.sqrt(dx * dx + dy * dy) < 22
    })
    .map(m => ({ x1: n.x, y1: n.y, x2: m.x, y2: m.y, id: `${i}-${m.id}` }))
)

// ─── Products ─────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'investigat',
    name: 'Investigat',
    tagline: 'Intelligence at scale.',
    type: 'Investigative AI Platform',
    color: '#3B82F6',
    glow: 'rgba(59,130,246,0.35)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 20L28 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="3" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
    desc: 'An AI-powered research and investigative platform designed to surface patterns, connections, and insights from complex data — built for professionals who need depth, not noise.',
    features: ['Deep pattern recognition', 'Multi-source data fusion', 'Real-time intelligence feeds', 'Secure, auditable outputs'],
    status: 'In Development',
    market: 'India · KSA',
  },
  {
    id: 'omnix',
    name: 'OmniX',
    tagline: 'One platform. Every channel.',
    type: 'Omnichannel SaaS Suite',
    color: '#22D3EE',
    glow: 'rgba(34,211,238,0.35)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="18" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="4" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="18" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 9H18M9 14V18M23 14V18M14 23H18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    desc: 'A unified SaaS suite that connects every customer touchpoint — CRM, commerce, communication, and analytics — into a single intelligent operating layer for modern businesses.',
    features: ['Unified customer data', 'AI-driven segmentation', 'Cross-channel automation', 'Gulf-market ready'],
    status: 'Beta',
    market: 'India · UAE · KSA',
  },
  {
    id: 'aura',
    name: 'Aura',
    tagline: 'Presence without effort.',
    type: 'AI Brand Intelligence',
    color: '#A78BFA',
    glow: 'rgba(167,139,250,0.5)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="5" fill="currentColor" opacity="0.8"/>
        <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="0.6" opacity="0.25"
          strokeDasharray="2 3"/>
      </svg>
    ),
    desc: 'Aura gives brands a persistent, intelligent presence across digital surfaces — managing perception, automating engagement, and surfacing brand insights with minimal human intervention.',
    features: ['Autonomous brand monitoring', 'Sentiment analysis engine', 'Competitive intelligence', 'Always-on digital presence'],
    status: 'Launching 2026',
    market: 'KSA · UAE',
    featured: true,
  },
]

// ─── Capabilities ─────────────────────────────────────────────────────────────
const CAPABILITIES = [
  { label: 'Natural Language Processing', pct: 92, color: '#3B82F6' },
  { label: 'Predictive Analytics',         pct: 85, color: '#22D3EE' },
  { label: 'Computer Vision',              pct: 78, color: '#A78BFA' },
  { label: 'Autonomous Agents',            pct: 70, color: '#F59E0B' },
]

// ─── Launch flow steps ────────────────────────────────────────────────────────
const FLOW = [
  { label: 'R&D', sub: 'Bangalore, India',    color: '#3B82F6', icon: '◈' },
  { label: 'Build', sub: 'Remote-first team', color: '#22D3EE', icon: '⬡' },
  { label: 'Beta',  sub: 'India market',      color: '#A78BFA', icon: '◉' },
  { label: 'Launch', sub: 'Saudi Arabia',     color: '#F59E0B', icon: '★' },
]

export default function AITech() {
  const [visible, setVisible]       = useState(false)
  const [activeProduct, setActive]  = useState('aura')
  const [heroRef,   heroInView]     = useInView(0.1)
  const [prodRef,   prodInView]     = useInView(0.1)
  const [capRef,    capInView]      = useInView(0.2)
  const [flowRef,   flowInView]     = useInView(0.2)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const active = PRODUCTS.find(p => p.id === activeProduct)

  return (
    <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px', overflow: 'hidden' }}>

      <style>{`
        @keyframes neuralPulse {
          0%,100% { opacity: .18; }
          50%      { opacity: .55; }
        }
        @keyframes nodeFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
        @keyframes auraRing {
          0%   { transform: scale(1);   opacity: .5; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes softPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: .4; transform: scale(.8); }
        }
        @keyframes dashFlow {
          to { stroke-dashoffset: -40; }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes capBar {
          from { width: 0; }
        }
        .prod-card { transition: transform .3s ease, border-color .3s ease, background .3s ease; }
        .prod-card:hover { transform: translateY(-6px) !important; }
      `}</style>

      {/* ── NEURAL NETWORK BACKGROUND ──────────────────────────────────────── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {NEURAL_EDGES.map(e => (
            <line key={e.id}
              x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke="#3B82F6" strokeWidth="0.08"
              style={{ animation: `neuralPulse ${3 + Math.random() * 2}s ${Math.random() * 3}s ease-in-out infinite` }}
            />
          ))}
          {NEURAL_NODES.map(n => (
            <circle key={n.id} cx={n.x} cy={n.y} r={n.r * 0.18}
              fill="#3B82F6"
              style={{ animation: `neuralPulse ${n.dur}s ${n.delay}s ease-in-out infinite` }}
            />
          ))}
        </svg>
        {/* Radial vignette so it fades at edges */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, var(--navy) 75%)',
        }}/>
      </div>

      {/* Mesh gradients */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 20% 30%, rgba(167,139,250,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(34,211,238,0.06) 0%, transparent 50%)',
      }}/>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ padding: '80px 80px 60px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 18px', borderRadius: '100px',
            background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.22)',
            marginBottom: '40px',
            opacity: visible?1:0, transform: visible?'translateY(0)':'translateY(16px)',
            transition: 'all .6s ease .1s',
          }}>
            <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#A78BFA', animation:'softPulse 2s infinite' }}/>
            <span style={{ color:'#A78BFA', fontSize:'12px', fontWeight:'600', letterSpacing:'2px', fontFamily:'DM Sans, sans-serif' }}>
              MAVEN AI TECH
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: '800', color: '#F8FAFC', lineHeight: '1.08',
            marginBottom: '12px', letterSpacing: '-1px',
            opacity: visible?1:0, transform: visible?'translateY(0)':'translateY(30px)',
            transition: 'all .75s ease .2s',
          }}>
            Intelligence,
          </h1>
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: '800', lineHeight: '1.08',
            marginBottom: '36px', letterSpacing: '-1px',
            background: 'linear-gradient(135deg, #A78BFA 0%, #22D3EE 60%, #3B82F6 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            opacity: visible?1:0, transform: visible?'translateY(0)':'translateY(30px)',
            transition: 'all .75s ease .32s',
          }}>
            Productised.
          </h1>

          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: '#94A3B8',
            lineHeight: '1.85', maxWidth: '560px', margin: '0 auto 52px',
            opacity: visible?1:0, transform: visible?'translateY(0)':'translateY(20px)',
            transition: 'all .7s ease .45s',
          }}>
            We build AI products that work in the real world — deployed across
            India and the Gulf, solving real problems with clean, reliable software.
          </p>

          {/* 3 quick stats */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '48px',
            paddingTop: '36px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            opacity: visible?1:0, transition: 'all .7s ease .6s',
          }}>
            {[
              { val: '3', label: 'AI Products', color: '#A78BFA' },
              { val: '2', label: 'Markets Active', color: '#22D3EE' },
              { val: '2026', label: 'Gulf Launch', color: '#3B82F6' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Syne, sans-serif', fontSize: '32px', fontWeight: '800',
                  color: s.color, marginBottom: '4px',
                  filter: `drop-shadow(0 0 10px ${s.color}55)`,
                }}>{s.val}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#64748B' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT CARDS ──────────────────────────────────────────────────── */}
      <section ref={prodRef} style={{ padding: '40px 80px 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '56px' }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg,#A78BFA,#22D3EE)' }}/>
            <span style={{ color: '#A78BFA', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
              Our Products
            </span>
          </div>

          {/* Product selector tabs */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '48px' }}>
            {PRODUCTS.map(p => (
              <button key={p.id} onClick={() => setActive(p.id)} style={{
                padding: '10px 22px', borderRadius: '100px',
                border: `1px solid ${activeProduct===p.id ? p.color+'66' : 'rgba(255,255,255,0.08)'}`,
                background: activeProduct===p.id ? p.color+'15' : 'transparent',
                color: activeProduct===p.id ? p.color : '#64748B',
                fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '600',
                cursor: 'pointer', transition: 'all .2s ease',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:p.color, opacity: activeProduct===p.id?1:.4 }}/>
                {p.name}
                {p.featured && <span style={{ fontSize:'10px', padding:'2px 7px', borderRadius:'100px', background:p.color+'20', color:p.color }}>Featured</span>}
              </button>
            ))}
          </div>

          {/* Active product — large detail view */}
          <div key={active.id} style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center',
            animation: 'fadeUp .4s ease',
          }}>
            {/* Left — Info */}
            <div>
              {/* Product icon */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '72px', height: '72px', borderRadius: '20px',
                background: active.color + '15', border: `1px solid ${active.color}35`,
                color: active.color, marginBottom: '28px',
                boxShadow: `0 0 30px ${active.glow}`,
              }}>
                {active.icon}
              </div>

              <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:active.color, fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'10px' }}>
                {active.type}
              </div>

              <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:'800', color:'#F8FAFC', lineHeight:'1.1', marginBottom:'8px' }}>
                {active.name}
              </h2>
              <p style={{ fontFamily:'Syne, sans-serif', fontSize:'18px', color:active.color, fontWeight:'600', marginBottom:'24px', opacity:0.8 }}>
                {active.tagline}
              </p>
              <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'16px', color:'#94A3B8', lineHeight:'1.9', marginBottom:'36px' }}>
                {active.desc}
              </p>

              {/* Features */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '36px' }}>
                {active.features.map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '12px 16px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:active.color, flexShrink:0, boxShadow:`0 0 6px ${active.color}` }}/>
                    <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', color:'#94A3B8' }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Meta row */}
              <div style={{ display:'flex', gap:'16px', alignItems:'center' }}>
                <span style={{
                  padding:'6px 16px', borderRadius:'100px',
                  background: active.color+'15', border:`1px solid ${active.color}35`,
                  color:active.color, fontFamily:'DM Sans, sans-serif', fontSize:'12px', fontWeight:'700',
                }}>
                  {active.status}
                </span>
                <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'12px', color:'#64748B' }}>
                  {active.market}
                </span>
              </div>
            </div>

            {/* Right — Visual card */}
            <div style={{ position:'relative' }}>
              {/* Aura-specific: concentric glow rings */}
              {active.id === 'aura' && (
                <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none', zIndex:0 }}>
                  {[1,2,3].map(i => (
                    <div key={i} style={{
                      position:'absolute',
                      width:`${140+i*80}px`, height:`${140+i*80}px`,
                      borderRadius:'50%',
                      border:`1px solid ${active.color}`,
                      opacity:0,
                      animation:`auraRing 3s ${i*.8}s ease-out infinite`,
                    }}/>
                  ))}
                </div>
              )}

              <div style={{
                background:'rgba(11,28,45,0.7)',
                border:`1px solid ${active.color}22`,
                borderRadius:'24px', padding:'40px',
                backdropFilter:'blur(16px)',
                boxShadow:`0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px ${active.color}10, 0 0 60px ${active.glow}20`,
                position:'relative', zIndex:1,
                textAlign:'center',
              }}>
                {/* Large product icon */}
                <div style={{
                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                  width:'100px', height:'100px', borderRadius:'28px',
                  background:`linear-gradient(135deg,${active.color}25,${active.color}08)`,
                  border:`1px solid ${active.color}35`,
                  color:active.color, marginBottom:'28px',
                  boxShadow:`0 0 40px ${active.glow}`,
                  transform:'scale(1.5)',
                }}>
                  {active.icon}
                </div>

                <h3 style={{ fontFamily:'Syne, sans-serif', fontSize:'28px', fontWeight:'800', color:'#F8FAFC', marginBottom:'8px', marginTop:'20px' }}>
                  {active.name}
                </h3>
                <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', color:active.color, marginBottom:'32px' }}>
                  {active.tagline}
                </p>

                {/* Status indicator */}
                <div style={{
                  display:'inline-flex', alignItems:'center', gap:'8px',
                  padding:'10px 20px', borderRadius:'100px',
                  background:active.color+'10', border:`1px solid ${active.color}25`,
                }}>
                  <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:active.color, animation:'softPulse 1.8s infinite', boxShadow:`0 0 8px ${active.color}` }}/>
                  <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'12px', color:active.color, fontWeight:'600' }}>
                    {active.status}
                  </span>
                </div>

                {/* Market tags */}
                <div style={{ marginTop:'20px', display:'flex', justifyContent:'center', gap:'8px', flexWrap:'wrap' }}>
                  {active.market.split(' · ').map((m, i) => (
                    <span key={i} style={{
                      padding:'4px 12px', borderRadius:'100px',
                      background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
                      fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:'#64748B', fontWeight:'600',
                    }}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* All 3 product mini-cards below */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px', marginTop:'60px' }}>
            {PRODUCTS.map((p, i) => (
              <div key={p.id}
                className="prod-card"
                onClick={() => setActive(p.id)}
                style={{
                  padding:'28px', borderRadius:'18px', cursor:'pointer',
                  border:`1px solid ${activeProduct===p.id ? p.color+'50' : 'rgba(255,255,255,0.06)'}`,
                  background: activeProduct===p.id ? p.color+'0D' : 'rgba(255,255,255,0.02)',
                  opacity: prodInView?1:0,
                  transform: prodInView?'translateY(0)':'translateY(24px)',
                  transition:`opacity .6s ease ${i*.1}s, transform .6s ease ${i*.1}s`,
                  position:'relative', overflow:'hidden',
                }}
              >
                {activeProduct===p.id && (
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(90deg,transparent,${p.color},transparent)` }}/>
                )}
                <div style={{ color:p.color, marginBottom:'16px', filter:`drop-shadow(0 0 8px ${p.color}50)` }}>
                  {p.icon}
                </div>
                <div style={{ fontFamily:'Syne, sans-serif', fontSize:'17px', fontWeight:'700', color:'#F8FAFC', marginBottom:'6px' }}>{p.name}</div>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'12px', color:'#64748B', marginBottom:'14px' }}>{p.type}</div>
                <span style={{
                  padding:'4px 10px', borderRadius:'100px', fontSize:'11px',
                  fontFamily:'DM Sans, sans-serif', fontWeight:'600',
                  background:p.color+'12', border:`1px solid ${p.color}28`, color:p.color,
                }}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ───────────────────────────────────────────────────── */}
      <section ref={capRef} style={{
        padding:'80px 80px',
        background:'rgba(255,255,255,0.015)',
        borderTop:'1px solid rgba(255,255,255,0.05)',
        borderBottom:'1px solid rgba(255,255,255,0.05)',
        position:'relative', zIndex:1,
      }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }}>

          {/* Left */}
          <div style={{
            opacity:capInView?1:0, transform:capInView?'translateX(0)':'translateX(-28px)',
            transition:'all .8s ease',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'28px' }}>
              <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#A78BFA,#22D3EE)' }}/>
              <span style={{ color:'#A78BFA', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>
                Core Capabilities
              </span>
            </div>
            <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(24px,3.5vw,38px)', fontWeight:'800', color:'#F8FAFC', marginBottom:'16px', lineHeight:'1.2' }}>
              What Our AI<br/>
              <span style={{ background:'linear-gradient(135deg,#A78BFA,#22D3EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                Can Actually Do
              </span>
            </h2>
            <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'15px', color:'#94A3B8', lineHeight:'1.9', marginBottom:'0' }}>
              Our products are built on a shared AI core — purpose-trained for the Gulf and South Asian market context, not just adapted from Western models.
            </p>
          </div>

          {/* Right — Capability bars */}
          <div style={{
            opacity:capInView?1:0, transform:capInView?'translateX(0)':'translateX(28px)',
            transition:'all .8s ease .15s',
          }}>
            {CAPABILITIES.map((c, i) => (
              <div key={i} style={{ marginBottom: i < CAPABILITIES.length-1 ? '28px' : 0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'10px' }}>
                  <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', fontWeight:'600', color:'#F8FAFC' }}>{c.label}</span>
                  <span style={{ fontFamily:'Syne, sans-serif', fontSize:'14px', fontWeight:'700', color:c.color }}>{c.pct}%</span>
                </div>
                <div style={{ height:'5px', borderRadius:'5px', background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
                  <div style={{
                    height:'100%', borderRadius:'5px',
                    background:`linear-gradient(90deg,${c.color},${c.color}88)`,
                    width: capInView ? `${c.pct}%` : '0%',
                    transition:`width 1.2s ease ${.2+i*.15}s`,
                    boxShadow:`0 0 10px ${c.color}55`,
                  }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDIA → SAUDI LAUNCH FLOW ──────────────────────────────────────── */}
      <section ref={flowRef} style={{ padding:'100px 80px 120px', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:'1000px', margin:'0 auto', textAlign:'center' }}>

          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'12px', marginBottom:'28px' }}>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#A78BFA,#22D3EE)' }}/>
            <span style={{ color:'#A78BFA', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>
              Go-To-Market
            </span>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#22D3EE,#A78BFA)' }}/>
          </div>

          <h2 style={{
            fontFamily:'Syne, sans-serif', fontSize:'clamp(24px,4vw,42px)',
            fontWeight:'800', color:'#F8FAFC', marginBottom:'16px',
          }}>
            From India to the Gulf
          </h2>
          <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'16px', color:'#94A3B8', lineHeight:'1.8', maxWidth:'480px', margin:'0 auto 72px' }}>
            Every product is built and validated in India first, then expanded into Saudi Arabia, UAE, and beyond.
          </p>

          {/* Flow steps */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0', position:'relative' }}>
            {/* Connecting line */}
            <svg style={{ position:'absolute', top:'32px', left:'10%', width:'80%', height:'4px', zIndex:0 }} viewBox="0 0 400 4" preserveAspectRatio="none">
              <line x1="0" y1="2" x2="400" y2="2"
                stroke="url(#flowGrad)" strokeWidth="1.5"
                strokeDasharray="8 5"
                style={{ animation: flowInView ? 'dashFlow 2s linear infinite' : 'none' }}
              />
              <defs>
                <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#3B82F6"/>
                  <stop offset="100%" stopColor="#F59E0B"/>
                </linearGradient>
              </defs>
            </svg>

            {FLOW.map((step, i) => (
              <div key={i} style={{
                flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'16px',
                position:'relative', zIndex:1,
                opacity: flowInView?1:0,
                transform: flowInView?'translateY(0)':'translateY(24px)',
                transition:`all .7s ease ${i*.15}s`,
              }}>
                {/* Step circle */}
                <div style={{
                  width:'64px', height:'64px', borderRadius:'50%',
                  background:`radial-gradient(circle,${step.color}25,${step.color}08)`,
                  border:`1px solid ${step.color}50`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'22px', color:step.color,
                  boxShadow:`0 0 24px ${step.color}35`,
                  transition:'all .3s ease',
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.boxShadow=`0 0 40px ${step.color}65`; e.currentTarget.style.transform='scale(1.1)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.boxShadow=`0 0 24px ${step.color}35`; e.currentTarget.style.transform='scale(1)' }}
                >
                  {step.icon}
                </div>

                <div>
                  <div style={{ fontFamily:'Syne, sans-serif', fontSize:'16px', fontWeight:'700', color:'#F8FAFC', marginBottom:'4px' }}>{step.label}</div>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'12px', color:'#64748B' }}>{step.sub}</div>
                </div>

                {/* Step number */}
                <div style={{
                  position:'absolute', top:'-10px', right:'calc(50% - 32px)',
                  width:'18px', height:'18px', borderRadius:'50%',
                  background:step.color, display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:'DM Sans, sans-serif', fontSize:'10px', fontWeight:'700', color:'#fff',
                }}>
                  {i+1}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{
            marginTop:'80px', padding:'40px 48px', borderRadius:'20px',
            background:'linear-gradient(135deg,rgba(167,139,250,0.08),rgba(34,211,238,0.05))',
            border:'1px solid rgba(167,139,250,0.18)',
            opacity: flowInView?1:0, transition:'all .7s ease .6s',
          }}>
            <h3 style={{ fontFamily:'Syne, sans-serif', fontSize:'22px', fontWeight:'800', color:'#F8FAFC', marginBottom:'10px' }}>
              Interested in our products?
            </h3>
            <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', color:'#64748B', marginBottom:'24px' }}>
              We're onboarding early partners and beta users for Investigat and OmniX.
            </p>
            <div style={{ display:'flex', gap:'12px', justifyContent:'center' }}>
              <button style={{
                padding:'12px 28px', borderRadius:'10px',
                background:'linear-gradient(135deg,#A78BFA,#7C3AED)',
                border:'none', color:'#fff',
                fontFamily:'Syne, sans-serif', fontWeight:'600', fontSize:'14px',
                cursor:'pointer', transition:'all .25s ease',
                boxShadow:'0 0 24px rgba(167,139,250,0.4)',
              }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 0 40px rgba(167,139,250,0.6)' }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 0 24px rgba(167,139,250,0.4)' }}
              >
                Request Early Access →
              </button>
              <button style={{
                padding:'12px 28px', borderRadius:'10px',
                background:'transparent', border:'1px solid rgba(255,255,255,0.1)',
                color:'#94A3B8', fontFamily:'Syne, sans-serif', fontWeight:'600', fontSize:'14px',
                cursor:'pointer', transition:'all .25s ease',
              }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(167,139,250,0.4)'; e.currentTarget.style.color='#F8FAFC' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='#94A3B8' }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}