import { useRef, useState, useEffect } from 'react'

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

function Counter({ to, suffix = '', prefix = '', duration = 1600, inView }) {
  const [val, setVal] = useState(0)
  const done = useRef(false)
  useEffect(() => {
    if (!inView || done.current) return
    done.current = true
    let step = 0
    const steps = 55
    const id = setInterval(() => {
      step++
      const p = 1 - Math.pow(1 - step / steps, 3)
      setVal(Math.floor(p * to))
      if (step >= steps) { setVal(to); clearInterval(id) }
    }, duration / steps)
    return () => clearInterval(id)
  }, [inView, to, duration])
  return <>{prefix}{val}{suffix}</>
}

// ── Data ──────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    icon: '◈', color: '#3B82F6',
    title: 'Capital Preservation First',
    desc: 'We never risk what we cannot afford to lose. Every allocation starts with a downside scenario before we model upside. Preservation is not a constraint — it is the strategy.',
  },
  {
    icon: '⬡', color: '#22D3EE',
    title: 'Conviction Over Diversification',
    desc: 'We make fewer bets and make them well. Concentrated positions in high-conviction opportunities outperform scattered exposure over a long enough horizon.',
  },
  {
    icon: '◉', color: '#A78BFA',
    title: 'Cross-Border Compounding',
    desc: 'Returns in one market fund expansion into the next. India funds Gulf. Gulf funds scale. Scale funds the next vertical. This is how compounding works across borders.',
  },
  {
    icon: '⬢', color: '#F59E0B',
    title: 'Ethical Non-Negotiables',
    desc: 'No leverage beyond mandate. No speculation disguised as investment. No conflicts of interest without full disclosure. These are not policies — they are how we sleep at night.',
  },
]

const ROADMAP = [
  {
    year: '2024',
    title: 'Foundation Year',
    color: '#3B82F6',
    items: [
      'Maven Business Services established',
      'Initial Indian equity portfolio deployed',
      'Group holding structure formalized',
      'R&D begun on AI product suite',
    ],
    status: 'complete',
  },
  {
    year: '2025',
    title: 'Build & Expand',
    color: '#22D3EE',
    items: [
      'Maven AI Tech vertical launched',
      'OmniX beta release to select clients',
      'Saudi Arabia market entry initiated',
      'HNI advisory services opened',
    ],
    status: 'active',
  },
  {
    year: '2026',
    title: 'Gulf Offensive',
    color: '#A78BFA',
    items: [
      'Full KSA & UAE operations active',
      'Aura AI product public launch',
      'Maven Contractors first Saudi project',
      'E-Commerce Gulf market entry',
    ],
    status: 'upcoming',
  },
  {
    year: '2027',
    title: 'Scale & Institutionalise',
    color: '#F59E0B',
    items: [
      'Institutional investor onboarding',
      'Regional HQ established in Gulf',
      'AI products expanded to Bahrain',
      'Group revenue diversification complete',
    ],
    status: 'upcoming',
  },
]

const GOVERNANCE = [
  {
    icon: '◈', color: '#3B82F6',
    title: 'Investment Committee',
    desc: 'All allocations above threshold reviewed by a structured investment committee before execution. No single-person decisions on material positions.',
  },
  {
    icon: '⬡', color: '#22D3EE',
    title: 'Risk Framework',
    desc: 'Proprietary risk scoring applied to every opportunity. Position sizing, stop-loss levels, and correlation limits enforced at the portfolio level.',
  },
  {
    icon: '◉', color: '#A78BFA',
    title: 'Reporting Standards',
    desc: 'Quarterly performance reports to all stakeholders. Full transparency on fees, returns, drawdowns, and forward-looking positioning.',
  },
  {
    icon: '⬢', color: '#F59E0B',
    title: 'Compliance & Ethics',
    desc: 'Fully compliant with SEBI regulations in India and applicable Gulf market regulations. External legal counsel retained across jurisdictions.',
  },
]

const PARTNER_TYPES = [
  {
    type: 'HNI Investors',
    desc: 'High net-worth individuals seeking access to Indian equity, international instruments, and Gulf real estate through a single disciplined partner.',
    min: 'By discussion',
    color: '#3B82F6',
    icon: '◈',
  },
  {
    type: 'Family Offices',
    desc: 'Multi-generational wealth structures looking for a cross-border operating group that aligns capital with business-building, not just financial returns.',
    min: 'By discussion',
    color: '#22D3EE',
    icon: '⬡',
  },
  {
    type: 'Strategic Partners',
    desc: 'Businesses and operators in India, KSA, or UAE who want to co-develop verticals, share infrastructure, or access TMG\'s market networks.',
    min: 'Operational',
    color: '#A78BFA',
    icon: '◉',
  },
]

// ── Floating particles (lightweight) ─────────────────────────────────────────
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 2 + 1, dur: Math.random() * 18 + 10, delay: Math.random() * 8,
  opacity: Math.random() * 0.3 + 0.06,
}))

export default function Investors() {
  const [visible, setVisible]         = useState(false)
  const [activeYear, setActiveYear]   = useState('2025')
  const [heroRef,  heroInView]        = useInView(0.1)
  const [statsRef, statsInView]       = useInView(0.2)
  const [pillRef,  pillInView]        = useInView(0.1)
  const [roadRef,  roadInView]        = useInView(0.1)
  const [govRef,   govInView]         = useInView(0.1)
  const [partRef,  partInView]        = useInView(0.1)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const activeRoadmap = ROADMAP.find(r => r.year === activeYear)

  return (
    <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px', overflow: 'hidden' }}>

      <style>{`
        @keyframes floatP {
          from { transform: translateY(0) translateX(0); }
          to   { transform: translateY(-16px) translateX(6px); }
        }
        @keyframes softPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(.78); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes lineGrow {
          from { height: 0; }
          to   { height: 100%; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .partner-card { transition: transform .3s ease, border-color .3s ease, background .3s ease; }
        .partner-card:hover { transform: translateY(-6px) !important; }
        .gov-item { transition: all .25s ease; }
        .gov-item:hover { transform: translateX(6px) !important; }
      `}</style>

      {/* Particles */}
      {PARTICLES.map(p => (
        <div key={p.id} style={{
          position: 'fixed', left: `${p.x}%`, top: `${p.y}%`,
          width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
          background: p.id % 3 === 0 ? '#3B82F6' : p.id % 3 === 1 ? '#22D3EE' : '#A78BFA',
          opacity: p.opacity,
          animation: `floatP ${p.dur}s ${p.delay}s ease-in-out infinite alternate`,
          pointerEvents: 'none', zIndex: 0,
        }}/>
      ))}

      {/* Mesh */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none',
        background:'radial-gradient(ellipse at 75% 25%,rgba(26,86,219,.10) 0%,transparent 55%),radial-gradient(ellipse at 15% 75%,rgba(34,211,238,.06) 0%,transparent 50%)',
      }}/>
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none',
        backgroundImage:`linear-gradient(rgba(59,130,246,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.022) 1px,transparent 1px)`,
        backgroundSize:'60px 60px',
      }}/>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ padding:'72px 80px 80px', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }}>

          {/* Left */}
          <div>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:'8px',
              padding:'6px 16px', borderRadius:'100px',
              background:'rgba(59,130,246,.10)', border:'1px solid rgba(59,130,246,.25)',
              marginBottom:'32px',
              opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(20px)',
              transition:'all .6s ease .1s',
            }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#3B82F6', animation:'softPulse 2s infinite' }}/>
              <span style={{ color:'#3B82F6', fontSize:'12px', fontWeight:'600', letterSpacing:'2px', fontFamily:'DM Sans, sans-serif' }}>
                INVESTOR & STRATEGY
              </span>
            </div>

            <h1 style={{
              fontFamily:'Syne, sans-serif', fontSize:'clamp(2.2rem,4.5vw,3.8rem)',
              fontWeight:'800', color:'#F8FAFC', lineHeight:'1.08',
              marginBottom:'14px', letterSpacing:'-0.5px',
              opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(30px)',
              transition:'all .7s ease .2s',
            }}>
              Building for<br/>the Long Term.
            </h1>
            <h1 style={{
              fontFamily:'Syne, sans-serif', fontSize:'clamp(2.2rem,4.5vw,3.8rem)',
              fontWeight:'800', lineHeight:'1.08', marginBottom:'28px', letterSpacing:'-0.5px',
              background:'linear-gradient(135deg,#3B82F6,#22D3EE)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(30px)',
              transition:'all .7s ease .32s',
            }}>
              Not the Next Quarter.
            </h1>

            <p style={{
              fontFamily:'DM Sans, sans-serif', fontSize:'17px', color:'#94A3B8',
              lineHeight:'1.85', maxWidth:'460px', marginBottom:'40px',
              opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(20px)',
              transition:'all .7s ease .45s',
            }}>
              TMG is a long-horizon holding group. We do not chase quarters.
              We build verticals, deploy capital with conviction, and create
              compounding value across India and the Gulf.
            </p>

            <div style={{
              display:'flex', gap:'14px',
              opacity:visible?1:0, transition:'all .7s ease .58s',
            }}>
              <button style={{
                padding:'13px 26px', borderRadius:'10px',
                background:'linear-gradient(135deg,#1A56DB,#3B82F6)',
                border:'none', color:'#fff',
                fontFamily:'Syne, sans-serif', fontWeight:'600', fontSize:'14px',
                cursor:'pointer', transition:'all .25s ease',
                boxShadow:'0 0 24px rgba(26,86,219,.4)',
              }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 0 40px rgba(26,86,219,.65)' }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 0 24px rgba(26,86,219,.4)' }}
              >
                Partner With TMG →
              </button>
              <button style={{
                padding:'13px 26px', borderRadius:'10px',
                background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.1)',
                color:'#94A3B8', fontFamily:'Syne, sans-serif', fontWeight:'600', fontSize:'14px',
                cursor:'pointer', transition:'all .25s ease',
              }}
                onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,.08)'; e.currentTarget.style.borderColor='rgba(59,130,246,.4)'; e.currentTarget.style.color='#F8FAFC' }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,.04)'; e.currentTarget.style.borderColor='rgba(255,255,255,.1)'; e.currentTarget.style.color='#94A3B8' }}
              >
                View Strategy Deck
              </button>
            </div>
          </div>

          {/* Right — Philosophy card */}
          <div style={{
            opacity:visible?1:0, transform:visible?'translateX(0)':'translateX(36px)',
            transition:'all .9s ease .4s',
          }}>
            <div style={{
              background:'rgba(11,28,45,.85)',
              border:'1px solid rgba(59,130,246,.18)',
              borderRadius:'24px', padding:'36px',
              backdropFilter:'blur(16px)',
              boxShadow:'0 24px 80px rgba(0,0,0,.45), 0 0 0 1px rgba(59,130,246,.07)',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'28px' }}>
                <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#3B82F6', animation:'softPulse 1.8s infinite', boxShadow:'0 0 8px #3B82F6' }}/>
                <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:'#64748B', letterSpacing:'2px', fontWeight:'600' }}>
                  INVESTMENT PHILOSOPHY
                </span>
              </div>

              <blockquote style={{
                fontFamily:'Syne, sans-serif', fontSize:'20px', fontWeight:'700',
                color:'#F8FAFC', lineHeight:'1.55', marginBottom:'28px',
                borderLeft:'3px solid #3B82F6', paddingLeft:'20px',
              }}>
                "We are not traders. We are builders who understand capital."
              </blockquote>

              <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', color:'#94A3B8', lineHeight:'1.8', marginBottom:'28px' }}>
                Every rupee and riyal we deploy is backed by a business thesis — not a price target.
                We invest in markets we operate in, and we operate in markets we understand deeply.
              </p>

              {/* Principle tags */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                {['Long horizon', 'Operational edge', 'Cross-border', 'Ethical mandate', 'Conviction-based'].map((tag, i) => (
                  <span key={i} style={{
                    padding:'5px 14px', borderRadius:'100px',
                    background:'rgba(59,130,246,.1)', border:'1px solid rgba(59,130,246,.22)',
                    fontFamily:'DM Sans, sans-serif', fontSize:'12px', color:'#3B82F6', fontWeight:'600',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section ref={statsRef} style={{ padding:'0 80px 80px', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'18px' }}>
          {[
            { to:4,    suffix:'',   label:'Active Verticals',    sub:'Across all markets',    color:'#3B82F6' },
            { to:4,    suffix:'',   label:'Markets Covered',     sub:'India · KSA · UAE · BH', color:'#22D3EE' },
            { to:2026, suffix:'',   label:'Gulf Expansion',      sub:'Full operations target', color:'#A78BFA' },
            { to:10,   suffix:'yr', label:'Investment Horizon',  sub:'Minimum hold period',    color:'#F59E0B' },
          ].map((s, i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,.03)', border:`1px solid ${s.color}20`,
              borderRadius:'18px', padding:'28px 24px', position:'relative', overflow:'hidden',
              opacity:statsInView?1:0, transform:statsInView?'translateY(0)':'translateY(28px)',
              transition:`all .65s ease ${i*.1}s`, cursor:'default',
            }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.borderColor=s.color+'50'; e.currentTarget.style.background=s.color+'0C' }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)';    e.currentTarget.style.borderColor=s.color+'20'; e.currentTarget.style.background='rgba(255,255,255,.03)' }}
            >
              <div style={{ position:'absolute', top:'-16px', right:'-16px', width:'70px', height:'70px', borderRadius:'50%', background:`radial-gradient(circle,${s.color}25 0%,transparent 70%)`, pointerEvents:'none' }}/>
              <div style={{ fontFamily:'Syne, sans-serif', fontSize:'36px', fontWeight:'800', color:s.color, marginBottom:'6px', filter:`drop-shadow(0 0 10px ${s.color}55)` }}>
                <Counter to={s.to} suffix={s.suffix} inView={statsInView}/>
              </div>
              <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', color:'#F8FAFC', fontWeight:'600', marginBottom:'3px' }}>{s.label}</div>
              <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:'#64748B' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAPITAL PHILOSOPHY ───────────────────────────────────────────── */}
      <section ref={pillRef} style={{
        padding:'80px 80px',
        background:'rgba(255,255,255,.015)',
        borderTop:'1px solid rgba(255,255,255,.05)',
        borderBottom:'1px solid rgba(255,255,255,.05)',
        position:'relative', zIndex:1,
      }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#3B82F6,#22D3EE)' }}/>
            <span style={{ color:'#22D3EE', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>
              Capital Philosophy
            </span>
          </div>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(26px,4vw,42px)', fontWeight:'800', color:'#F8FAFC', marginBottom:'64px', maxWidth:'500px' }}>
            How We Think<br/>About Money
          </h2>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'20px' }}>
            {PILLARS.map((p, i) => (
              <div key={i} style={{
                background:'rgba(255,255,255,.03)', border:`1px solid rgba(255,255,255,.07)`,
                borderRadius:'20px', padding:'36px',
                opacity:pillInView?1:0, transform:pillInView?'translateY(0)':'translateY(28px)',
                transition:`all .65s ease ${i*.1}s`,
                position:'relative', overflow:'hidden',
              }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=p.color+'45'; e.currentTarget.style.background=p.color+'08'; e.currentTarget.style.transform='translateY(-5px)' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,.07)'; e.currentTarget.style.background='rgba(255,255,255,.03)'; e.currentTarget.style.transform='translateY(0)' }}
              >
                <div style={{ position:'absolute', top:'-24px', right:'-24px', width:'100px', height:'100px', borderRadius:'50%', background:`radial-gradient(circle,${p.color}18 0%,transparent 70%)`, pointerEvents:'none' }}/>
                <div style={{ fontSize:'28px', color:p.color, marginBottom:'20px', filter:`drop-shadow(0 0 10px ${p.color}55)` }}>{p.icon}</div>
                <h3 style={{ fontFamily:'Syne, sans-serif', fontSize:'18px', fontWeight:'700', color:'#F8FAFC', marginBottom:'12px' }}>{p.title}</h3>
                <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', color:'#94A3B8', lineHeight:'1.85' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STRATEGIC ROADMAP ────────────────────────────────────────────── */}
      <section ref={roadRef} style={{ padding:'100px 80px', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#3B82F6,#22D3EE)' }}/>
            <span style={{ color:'#22D3EE', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>
              Strategic Roadmap
            </span>
          </div>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(26px,4vw,42px)', fontWeight:'800', color:'#F8FAFC', marginBottom:'56px' }}>
            2024 — 2027
          </h2>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', alignItems:'start' }}>

            {/* Year selector */}
            <div>
              {ROADMAP.map((r, i) => (
                <div key={r.year}
                  onClick={() => setActiveYear(r.year)}
                  style={{
                    display:'flex', gap:'20px', alignItems:'flex-start',
                    padding:'24px 28px', borderRadius:'16px', cursor:'pointer', marginBottom:'12px',
                    background: activeYear===r.year ? r.color+'0E' : 'rgba(255,255,255,.02)',
                    border:`1px solid ${activeYear===r.year ? r.color+'45' : 'rgba(255,255,255,.06)'}`,
                    transition:'all .25s ease',
                    opacity:roadInView?1:0, transform:roadInView?'translateX(0)':'translateX(-24px)',
                    transitionDelay:`${i*.1}s`,
                  }}
                  onMouseEnter={e=>{ if(activeYear!==r.year){ e.currentTarget.style.background=r.color+'07'; e.currentTarget.style.borderColor=r.color+'28' }}}
                  onMouseLeave={e=>{ if(activeYear!==r.year){ e.currentTarget.style.background='rgba(255,255,255,.02)'; e.currentTarget.style.borderColor='rgba(255,255,255,.06)' }}}
                >
                  {/* Status dot */}
                  <div style={{ flexShrink:0, marginTop:'3px', display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' }}>
                    <div style={{
                      width:'12px', height:'12px', borderRadius:'50%',
                      background: r.status==='complete' ? r.color : r.status==='active' ? r.color : 'transparent',
                      border:`2px solid ${r.color}`,
                      boxShadow: r.status==='active' ? `0 0 10px ${r.color}` : 'none',
                    }}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'4px' }}>
                      <span style={{ fontFamily:'Syne, sans-serif', fontSize:'20px', fontWeight:'800', color: activeYear===r.year ? r.color : '#F8FAFC' }}>{r.year}</span>
                      <span style={{
                        padding:'2px 10px', borderRadius:'100px',
                        background: r.status==='complete' ? '#22C55E18' : r.status==='active' ? r.color+'18' : 'rgba(255,255,255,.06)',
                        border:`1px solid ${r.status==='complete' ? '#22C55E40' : r.status==='active' ? r.color+'40' : 'rgba(255,255,255,.1)'}`,
                        color: r.status==='complete' ? '#22C55E' : r.status==='active' ? r.color : '#64748B',
                        fontFamily:'DM Sans, sans-serif', fontSize:'10px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'1px',
                      }}>
                        {r.status==='complete' ? 'Done' : r.status==='active' ? 'In Progress' : 'Upcoming'}
                      </span>
                    </div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', color:'#64748B' }}>{r.title}</div>
                  </div>
                  <div style={{ color: activeYear===r.year ? r.color : '#64748B', fontSize:'18px', transition:'color .2s' }}>→</div>
                </div>
              ))}
            </div>

            {/* Detail panel */}
            <div key={activeYear} style={{
              animation:'fadeUp .35s ease',
              opacity:roadInView?1:0, transform:roadInView?'translateX(0)':'translateX(24px)',
              transition:'opacity .8s ease .3s, transform .8s ease .3s',
            }}>
              <div style={{
                background:'rgba(255,255,255,.03)',
                border:`1px solid ${activeRoadmap.color}30`,
                borderRadius:'20px', padding:'40px',
                position:'relative', overflow:'hidden',
              }}>
                {/* Top accent line */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(90deg,transparent,${activeRoadmap.color},transparent)` }}/>
                {/* BG glow */}
                <div style={{ position:'absolute', top:'-40px', right:'-40px', width:'180px', height:'180px', borderRadius:'50%', background:`radial-gradient(circle,${activeRoadmap.color}15 0%,transparent 70%)`, pointerEvents:'none' }}/>

                <div style={{ marginBottom:'8px' }}>
                  <span style={{ fontFamily:'Syne, sans-serif', fontSize:'48px', fontWeight:'800', color:activeRoadmap.color, filter:`drop-shadow(0 0 16px ${activeRoadmap.color}60)` }}>
                    {activeRoadmap.year}
                  </span>
                </div>
                <h3 style={{ fontFamily:'Syne, sans-serif', fontSize:'22px', fontWeight:'700', color:'#F8FAFC', marginBottom:'32px' }}>
                  {activeRoadmap.title}
                </h3>

                <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                  {activeRoadmap.items.map((item, i) => (
                    <div key={i} style={{
                      display:'flex', alignItems:'flex-start', gap:'14px',
                      padding:'16px 18px', borderRadius:'12px',
                      background:'rgba(255,255,255,.025)',
                      border:'1px solid rgba(255,255,255,.05)',
                      animation:`fadeUp .4s ease ${i*.08}s both`,
                    }}>
                      <div style={{
                        width:'7px', height:'7px', borderRadius:'50%',
                        background:activeRoadmap.color, marginTop:'5px', flexShrink:0,
                        boxShadow:`0 0 7px ${activeRoadmap.color}`,
                      }}/>
                      <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', color:'#94A3B8', lineHeight:'1.6' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GOVERNANCE ───────────────────────────────────────────────────── */}
      <section ref={govRef} style={{
        padding:'80px 80px',
        background:'rgba(255,255,255,.015)',
        borderTop:'1px solid rgba(255,255,255,.05)',
        borderBottom:'1px solid rgba(255,255,255,.05)',
        position:'relative', zIndex:1,
      }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#3B82F6,#22D3EE)' }}/>
            <span style={{ color:'#22D3EE', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>
              Governance Model
            </span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'0.9fr 1.1fr', gap:'80px', alignItems:'start' }}>

            <div style={{ opacity:govInView?1:0, transform:govInView?'translateX(0)':'translateX(-24px)', transition:'all .8s ease' }}>
              <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(24px,3.5vw,38px)', fontWeight:'800', color:'#F8FAFC', marginBottom:'20px', lineHeight:'1.2' }}>
                How We're<br/>
                <span style={{ background:'linear-gradient(135deg,#3B82F6,#22D3EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  Accountable
                </span>
              </h2>
              <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'15px', color:'#94A3B8', lineHeight:'1.9', marginBottom:'32px' }}>
                Governance at TMG is not a checkbox. It is how we earn and keep the trust of every person whose capital or partnership we hold.
              </p>
              {/* Visual governance diagram — concentric rings */}
              <div style={{ position:'relative', height:'220px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {['Group Holding', 'Investment Committee', 'Vertical Leads', 'External Advisory'].map((label, i) => (
                  <div key={i} style={{
                    position:'absolute',
                    width:`${100+i*58}px`, height:`${100+i*58}px`,
                    borderRadius:'50%',
                    border:`1px solid rgba(59,130,246,${.6-i*.12})`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    {i === 0 && (
                      <div style={{
                        fontFamily:'Syne, sans-serif', fontSize:'11px', fontWeight:'700',
                        color:'#3B82F6', textAlign:'center', lineHeight:'1.3', padding:'8px',
                      }}>Group<br/>Holding</div>
                    )}
                  </div>
                ))}
                {/* Labels around the rings */}
                {[
                  { label:'Investment\nCommittee', angle:0,   r:95 },
                  { label:'Vertical\nLeads',       angle:120, r:95 },
                  { label:'External\nAdvisory',    angle:240, r:95 },
                ].map((item, i) => {
                  const rad = (item.angle * Math.PI) / 180
                  const x = Math.cos(rad) * item.r
                  const y = Math.sin(rad) * item.r
                  return (
                    <div key={i} style={{
                      position:'absolute',
                      left:`calc(50% + ${x}px)`, top:`calc(50% + ${y}px)`,
                      transform:'translate(-50%,-50%)',
                      fontFamily:'DM Sans, sans-serif', fontSize:'10px', color:'#64748B',
                      textAlign:'center', lineHeight:'1.4', whiteSpace:'pre-line',
                      fontWeight:'600',
                    }}>
                      {item.label}
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={{ opacity:govInView?1:0, transform:govInView?'translateX(0)':'translateX(24px)', transition:'all .8s ease .2s' }}>
              {GOVERNANCE.map((g, i) => (
                <div key={i} className="gov-item" style={{
                  display:'flex', gap:'18px', padding:'22px 24px',
                  borderRadius:'14px', marginBottom:'12px',
                  border:'1px solid rgba(255,255,255,.06)',
                  background:'rgba(255,255,255,.025)',
                  opacity:govInView?1:0, transform:govInView?'translateY(0)':'translateY(16px)',
                  transition:`all .6s ease ${i*.1}s`,
                  cursor:'default',
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=g.color+'0C'; e.currentTarget.style.borderColor=g.color+'30' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,.025)'; e.currentTarget.style.borderColor='rgba(255,255,255,.06)' }}
                >
                  <div style={{ fontSize:'22px', color:g.color, flexShrink:0, marginTop:'2px', filter:`drop-shadow(0 0 8px ${g.color}55)` }}>{g.icon}</div>
                  <div>
                    <div style={{ fontFamily:'Syne, sans-serif', fontSize:'15px', fontWeight:'700', color:'#F8FAFC', marginBottom:'5px' }}>{g.title}</div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', color:'#94A3B8', lineHeight:'1.7' }}>{g.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER TYPES ────────────────────────────────────────────────── */}
      <section ref={partRef} style={{ padding:'100px 80px 120px', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#3B82F6,#22D3EE)' }}/>
            <span style={{ color:'#22D3EE', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>
              Who We Work With
            </span>
          </div>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(26px,4vw,42px)', fontWeight:'800', color:'#F8FAFC', marginBottom:'56px' }}>
            Partner With TMG
          </h2>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px', marginBottom:'48px' }}>
            {PARTNER_TYPES.map((p, i) => (
              <div key={i} className="partner-card" style={{
                background:'rgba(255,255,255,.03)',
                border:`1px solid rgba(255,255,255,.07)`,
                borderRadius:'20px', padding:'36px',
                position:'relative', overflow:'hidden',
                opacity:partInView?1:0, transform:partInView?'translateY(0)':'translateY(28px)',
                transition:`all .65s ease ${i*.12}s`,
              }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=p.color+'45'; e.currentTarget.style.background=p.color+'08' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,.07)'; e.currentTarget.style.background='rgba(255,255,255,.03)' }}
              >
                <div style={{ position:'absolute', top:'-20px', right:'-20px', width:'100px', height:'100px', borderRadius:'50%', background:`radial-gradient(circle,${p.color}18 0%,transparent 70%)`, pointerEvents:'none' }}/>
                <div style={{ fontSize:'28px', color:p.color, marginBottom:'20px', filter:`drop-shadow(0 0 10px ${p.color}55)` }}>{p.icon}</div>
                <h3 style={{ fontFamily:'Syne, sans-serif', fontSize:'18px', fontWeight:'700', color:'#F8FAFC', marginBottom:'12px' }}>{p.type}</h3>
                <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', color:'#94A3B8', lineHeight:'1.85', marginBottom:'20px' }}>{p.desc}</p>
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                  <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:'#64748B' }}>Ticket size:</span>
                  <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:p.color, fontWeight:'700' }}>{p.min}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div style={{
            padding:'48px 56px', borderRadius:'24px',
            background:'linear-gradient(135deg,rgba(26,86,219,.12),rgba(34,211,238,.06))',
            border:'1px solid rgba(59,130,246,.22)',
            display:'grid', gridTemplateColumns:'1fr auto', gap:'40px', alignItems:'center',
            opacity:partInView?1:0, transition:'all .7s ease .4s',
          }}>
            <div>
              <h3 style={{ fontFamily:'Syne, sans-serif', fontSize:'24px', fontWeight:'800', color:'#F8FAFC', marginBottom:'10px' }}>
                Ready to explore a partnership?
              </h3>
              <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'15px', color:'#94A3B8', lineHeight:'1.7' }}>
                We have a simple process — a conversation first, numbers second.
                Reach out and we'll respond within 48 hours.
              </p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'10px', flexShrink:0 }}>
              <button style={{
                padding:'14px 32px', borderRadius:'10px',
                background:'linear-gradient(135deg,#1A56DB,#3B82F6)',
                border:'none', color:'#fff',
                fontFamily:'Syne, sans-serif', fontWeight:'600', fontSize:'14px',
                cursor:'pointer', transition:'all .25s ease',
                boxShadow:'0 0 24px rgba(26,86,219,.4)', whiteSpace:'nowrap',
              }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 0 40px rgba(26,86,219,.65)' }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 0 24px rgba(26,86,219,.4)' }}
              >
                Start a Conversation →
              </button>
              <button style={{
                padding:'12px 32px', borderRadius:'10px',
                background:'transparent', border:'1px solid rgba(255,255,255,.1)',
                color:'#94A3B8', fontFamily:'DM Sans, sans-serif', fontWeight:'600', fontSize:'13px',
                cursor:'pointer', transition:'all .25s ease', whiteSpace:'nowrap',
              }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(59,130,246,.4)'; e.currentTarget.style.color='#F8FAFC' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,.1)'; e.currentTarget.style.color='#94A3B8' }}
              >
                Download Strategy Deck
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}