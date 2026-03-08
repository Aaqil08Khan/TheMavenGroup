import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

// ── Data ───────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: '◈',
    title: 'Equity Market Operations',
    desc: 'Active management across Indian and international equity markets. Long/short strategies with disciplined risk frameworks built for the long term.',
    tags: ['NSE', 'BSE', 'International'],
    color: '#3B82F6',
  },
  {
    icon: '⬡',
    title: 'Portfolio Advisory',
    desc: 'Bespoke portfolio construction for HNI clients and institutional partners. Research-driven, conviction-based allocation with transparent reporting.',
    tags: ['HNI', 'Institutional', 'Advisory'],
    color: '#22D3EE',
  },
  {
    icon: '◉',
    title: 'Real Estate Investments',
    desc: 'Strategic exposure to Saudi and Gulf real estate — commercial, residential, and mixed-use assets identified at meaningful inflection points.',
    tags: ['KSA', 'UAE', 'Commercial'],
    color: '#A78BFA',
  },
  {
    icon: '⬢',
    title: 'Cross-Border Structuring',
    desc: 'Entity structuring and formation across India, UAE, and KSA for smooth cross-border investment flows and regulatory compliance.',
    tags: ['India', 'KSA', 'UAE'],
    color: '#F59E0B',
  },
]

const PRINCIPLES = [
  {
    num: '01',
    title: 'Downside First',
    desc: 'Every allocation is reviewed against its downside scenario before the upside is ever considered. Capital preservation is the primary mandate.',
    color: '#3B82F6',
  },
  {
    num: '02',
    title: 'Research-Driven',
    desc: 'Positions are built on conviction backed by primary research. We do not follow consensus — we build it.',
    color: '#22D3EE',
  },
  {
    num: '03',
    title: 'Transparent By Design',
    desc: 'Partners receive clear, regular updates with no ambiguity. We believe the relationship is the asset.',
    color: '#A78BFA',
  },
  {
    num: '04',
    title: 'Long-Horizon Thinking',
    desc: 'We structure for 10-year outcomes, not quarterly cycles. Patience and discipline compound into results.',
    color: '#F59E0B',
  },
]

const MARKETS = [
  { flag: '🇮🇳', name: 'India', desc: 'NSE & BSE equity markets, structured products', color: '#3B82F6' },
  { flag: '🇸🇦', name: 'Saudi Arabia', desc: 'Tadawul equities & real estate assets', color: '#22D3EE' },
  { flag: '🇦🇪', name: 'UAE', desc: 'Dubai & Abu Dhabi commercial real estate', color: '#A78BFA' },
  { flag: '🌐', name: 'International', desc: 'US, EU & emerging market instruments', color: '#F59E0B' },
]

const TIMELINE = [
  { year: '2024', q: 'Q1', title: 'Foundation', desc: 'Maven Business Services established. Initial equity portfolio deployed across Indian markets.', color: '#1A56DB' },
  { year: '2024', q: 'Q3', title: 'Portfolio Expansion', desc: 'International market exposure added. Cross-border investment framework formalized.', color: '#3B82F6' },
  { year: '2024', q: 'Q4', title: 'Real Estate Entry', desc: 'First positions established in Saudi Arabian real estate. GCC market research initiated.', color: '#22D3EE' },
  { year: '2025', q: 'Q2', title: 'Advisory Launch', desc: 'HNI advisory services launched. Institutional partnership pipeline opened.', color: '#A78BFA' },
  { year: '2026', q: 'Q1', title: 'Gulf Expansion', desc: 'Full Gulf operations active. UAE and Bahrain market presence formalized.', color: '#F59E0B' },
]

const TEAM = [
  { initials: 'TM', name: 'The Maven', role: 'Group Founder & Principal', desc: 'Drives overall group strategy and operating philosophy across all verticals.', color: '#3B82F6' },
  { initials: 'MS', name: 'Markets Strategy', role: 'Head of Equity Operations', desc: 'Leads Indian and international market operations with a focus on risk-adjusted returns.', color: '#22D3EE' },
  { initials: 'RE', name: 'Real Estate', role: 'Gulf Markets Lead', desc: 'Oversees Saudi and UAE real estate pipeline and cross-border asset structuring.', color: '#A78BFA' },
]

// ── Component ──────────────────────────────────────────────────────────────────
export default function BusinessServices() {
  const [visible, setVisible]             = useState(false)
  const [activeService, setActiveService] = useState(0)

  const [heroRef,      heroInView]      = useInView(0.1)
  const [mktRef,       mktInView]       = useInView(0.15)
  const [serviceRef,   serviceInView]   = useInView(0.15)
  const [principleRef, principleInView] = useInView(0.15)
  const [timeRef,      timeInView]      = useInView(0.1)
  const [teamRef,      teamInView]      = useInView(0.15)

  const navigate = useNavigate()
  const servicesSectionRef = useRef(null)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const scrollToServices = () =>
    servicesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px', overflow: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes pulseD   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.75)} }
        @keyframes glowPulse{ 0%,100%{box-shadow:0 0 22px rgba(59,130,246,.35)} 50%{box-shadow:0 0 44px rgba(59,130,246,.65)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmerX { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }

        .svc-card { transition: transform .3s ease, border-color .3s ease, background .3s ease; }
        .svc-card:hover { transform: translateY(-6px) !important; }
        .team-card:hover .avatar { transform: scale(1.06); }
        .mkt-card:hover { transform: translateY(-5px) !important; border-color: rgba(255,255,255,.14) !important; }

        /* ─ padding ─ */
        .bs-pad       { padding: 80px 80px; }
        .bs-pad-hero  { padding: 72px 80px 80px; }
        .bs-pad-svc   { padding: 100px 80px; }
        .bs-pad-team  { padding: 100px 80px 120px; }

        /* ─ grids ─ */
        .bs-2col      { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; max-width:1200px; margin:0 auto; }
        .bs-2col-start{ display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start;  max-width:1200px; margin:0 auto; }
        .bs-4col      { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; max-width:1200px; margin:0 auto; }
        .bs-svc-grid  { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; }

        /* ─ timeline ─ */
        .bs-tl-wrap { position:relative; }
        .bs-tl-line { position:absolute; left:50%; top:0; bottom:0; width:1px; transform:translateX(-50%); background:linear-gradient(180deg,#3B82F6,#22D3EE,#A78BFA,#F59E0B,transparent); }
        .bs-tl-row  { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; margin-bottom:48px; }
        .bs-tl-l    { padding:0 40px 0 0; text-align:right; }
        .bs-tl-r    { padding:0 0 0 40px; }
        .bs-tl-dot  { width:16px; height:16px; border-radius:50%; border:3px solid var(--navy); flex-shrink:0; z-index:2; }

        /* ─ tablet ≤900 ─ */
        @media(max-width:900px){
          .bs-pad       { padding:60px 32px; }
          .bs-pad-hero  { padding:48px 32px; }
          .bs-pad-svc   { padding:72px 32px; }
          .bs-pad-team  { padding:72px 32px 80px; }
          .bs-2col      { grid-template-columns:1fr; gap:48px; }
          .bs-2col-start{ grid-template-columns:1fr; gap:48px; }
          .bs-4col      { grid-template-columns:repeat(2,1fr); }
          .bs-hero-img  { display:none !important; }
          .bs-tl-line   { left:8px !important; transform:none; }
          .bs-tl-row    { grid-template-columns:auto 1fr; }
          .bs-tl-l      { display:none; }
          .bs-tl-r      { padding:0 0 0 20px; }
        }

        /* ─ mobile ≤600 ─ */
        @media(max-width:600px){
          .bs-pad      { padding:48px 20px; }
          .bs-pad-hero { padding:36px 20px 48px; }
          .bs-pad-svc  { padding:56px 20px; }
          .bs-pad-team { padding:56px 20px 64px; }
          .bs-4col     { grid-template-columns:1fr 1fr; gap:12px; }
          .bs-svc-grid { grid-template-columns:1fr; }
          .bs-hero-btns{ flex-direction:column; }
          .bs-hero-btns button { width:100% !important; }
        }
      `}</style>

      {/* ── Ambient BG ── */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none',
        background:'radial-gradient(ellipse at 80% 20%,rgba(26,86,219,.1) 0%,transparent 55%),radial-gradient(ellipse at 10% 80%,rgba(34,211,238,.06) 0%,transparent 50%)'
      }}/>
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none',
        backgroundImage:`linear-gradient(rgba(59,130,246,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.022) 1px,transparent 1px)`,
        backgroundSize:'60px 60px'
      }}/>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="bs-pad-hero" style={{ position:'relative', zIndex:1 }}>
        <div className="bs-2col">

          {/* Left — copy */}
          <div>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:'8px',
              padding:'6px 16px', borderRadius:'100px',
              background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.25)',
              marginBottom:'32px',
              opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(20px)',
              transition:'all .6s ease .1s',
            }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#3B82F6', animation:'pulseD 2s infinite' }}/>
              <span style={{ color:'#3B82F6', fontSize:'12px', fontWeight:'600', letterSpacing:'2px', fontFamily:'DM Sans, sans-serif' }}>MAVEN BUSINESS SERVICES</span>
            </div>

            <h1 style={{
              fontFamily:'Bebas Neue, sans-serif', fontSize:'clamp(3rem,6vw,5.2rem)', fontWeight:'400',
              color:'#F8FAFC', lineHeight:'1.0', letterSpacing:'2px', marginBottom:'8px',
              opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(30px)', transition:'all .7s ease .2s',
            }}>Where Strategy Meets</h1>
            <h1 style={{
              fontFamily:'Bebas Neue, sans-serif', fontSize:'clamp(3rem,6vw,5.2rem)', fontWeight:'400',
              lineHeight:'1.0', letterSpacing:'2px', marginBottom:'32px',
              background:'linear-gradient(135deg,#3B82F6,#22D3EE)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(30px)', transition:'all .7s ease .32s',
            }}>Conviction.</h1>

            <p style={{
              fontFamily:'DM Sans, sans-serif', fontSize:'clamp(15px,2vw,17px)', color:'#94A3B8',
              lineHeight:'1.9', maxWidth:'480px', marginBottom:'44px',
              opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(20px)', transition:'all .7s ease .45s',
            }}>
              TMG's financial services vertical — operating across Indian equity markets, international instruments, and Gulf real estate. Disciplined. Research-driven. Built for the long term.
            </p>

            <div className="bs-hero-btns" style={{ display:'flex', gap:'14px', flexWrap:'wrap', opacity:visible?1:0, transition:'all .7s ease .6s' }}>
              <button onClick={scrollToServices}
                style={{ padding:'13px 26px', borderRadius:'10px', background:'linear-gradient(135deg,#1A56DB,#3B82F6)', border:'none', color:'#fff', fontFamily:'Outfit, sans-serif', fontWeight:'600', fontSize:'14px', cursor:'pointer', transition:'all .25s ease', boxShadow:'0 0 24px rgba(26,86,219,0.4)', animation:'glowPulse 3s ease-in-out infinite' }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 0 40px rgba(26,86,219,.65)' }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 0 24px rgba(26,86,219,.4)' }}
              >Explore Services →</button>
              <button onClick={() => navigate('/investors')}
                style={{ padding:'13px 26px', borderRadius:'10px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', color:'#94A3B8', fontFamily:'Outfit, sans-serif', fontWeight:'600', fontSize:'14px', cursor:'pointer', transition:'all .25s ease' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,.08)'; e.currentTarget.style.borderColor='rgba(59,130,246,.4)'; e.currentTarget.style.color='#F8FAFC' }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,.04)'; e.currentTarget.style.borderColor='rgba(255,255,255,.1)'; e.currentTarget.style.color='#94A3B8' }}
              >Partner With Us</button>
            </div>
          </div>

          {/* Right — hero image */}
          <div className="bs-hero-img" style={{
            opacity:visible?1:0, transform:visible?'translateX(0)':'translateX(40px)',
            transition:'all .9s ease .4s', position:'relative',
          }}>
            <div style={{ borderRadius:'24px', overflow:'hidden', position:'relative', height:'460px', boxShadow:'0 32px 80px rgba(0,0,0,.55)' }}>
              <img
                src="../images/businessservice.avif"
                alt="Financial district skyline"
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
              />
              {/* Overlay tint */}
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(26,86,219,0.45) 0%,rgba(11,28,45,0.55) 100%)' }}/>
              {/* Top accent line */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,#3B82F6,#22D3EE,transparent)' }}/>

              {/* Floating quote pill */}
              <div style={{
                position:'absolute', bottom:'28px', left:'24px', right:'24px',
                background:'rgba(11,28,45,0.88)', backdropFilter:'blur(16px)',
                border:'1px solid rgba(59,130,246,0.25)', borderRadius:'16px',
                padding:'20px 24px',
              }}>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:'#64748B', letterSpacing:'2px', fontWeight:'600', marginBottom:'8px' }}>OUR PHILOSOPHY</div>
                <div style={{ fontFamily:'Outfit, sans-serif', fontSize:'15px', fontWeight:'600', color:'#F8FAFC', lineHeight:'1.6' }}>
                  "Protect the downside first.<br/>The upside takes care of itself."
                </div>
              </div>

              {/* Markets badge */}
              <div style={{
                position:'absolute', top:'24px', right:'24px',
                background:'rgba(11,28,45,0.85)', backdropFilter:'blur(12px)',
                border:'1px solid rgba(34,211,238,0.25)', borderRadius:'12px',
                padding:'12px 18px', display:'flex', alignItems:'center', gap:'10px',
              }}>
                <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#22D3EE', animation:'pulseD 1.8s infinite', boxShadow:'0 0 8px #22D3EE' }}/>
                <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'12px', fontWeight:'700', color:'#22D3EE', letterSpacing:'1px' }}>3 MARKETS · ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MARKETS WE OPERATE IN ══════════════════════════════════════════════ */}
      <section ref={mktRef} className="bs-pad" style={{ background:'rgba(255,255,255,.015)', borderTop:'1px solid rgba(255,255,255,.05)', borderBottom:'1px solid rgba(255,255,255,.05)', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>

          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#3B82F6,#22D3EE)' }}/>
            <span style={{ color:'#22D3EE', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>Where We Operate</span>
          </div>
          <h2 style={{ fontFamily:'Outfit, sans-serif', fontWeight:'800', fontSize:'clamp(24px,3.5vw,38px)', color:'#F8FAFC', marginBottom:'56px', maxWidth:'520px' }}>
            Four Markets.<br/>
            <span style={{ background:'linear-gradient(135deg,#3B82F6,#22D3EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>One Operating Framework.</span>
          </h2>

          <div className="bs-4col">
            {MARKETS.map((m, i) => (
              <div key={i} className="mkt-card" style={{
                background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)',
                borderRadius:'20px', padding:'32px 28px',
                opacity:mktInView?1:0, transform:mktInView?'translateY(0)':'translateY(28px)',
                transition:`all .65s ease ${i*.1}s`,
              }}>
                <div style={{ fontSize:'40px', marginBottom:'20px' }}>{m.flag}</div>
                <div style={{ fontFamily:'Outfit, sans-serif', fontSize:'18px', fontWeight:'700', color:'#F8FAFC', marginBottom:'10px' }}>{m.name}</div>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', color:'#64748B', lineHeight:'1.65' }}>{m.desc}</div>
                <div style={{ marginTop:'20px', height:'2px', borderRadius:'2px', background:`linear-gradient(90deg,${m.color},transparent)` }}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICE CARDS ══════════════════════════════════════════════════════ */}
      <section
        ref={el => { serviceRef.current = el; servicesSectionRef.current = el }}
        className="bs-pad-svc"
        style={{ position:'relative', zIndex:1 }}
      >
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>

          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#3B82F6,#22D3EE)' }}/>
            <span style={{ color:'#22D3EE', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>What We Do</span>
          </div>
          <h2 style={{ fontFamily:'Outfit, sans-serif', fontWeight:'800', fontSize:'clamp(28px,4vw,44px)', color:'#F8FAFC', marginBottom:'64px', maxWidth:'520px' }}>
            Four Core<br/>
            <span style={{ background:'linear-gradient(135deg,#3B82F6,#22D3EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Service Lines</span>
          </h2>

          <div className="bs-svc-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="svc-card" onClick={() => setActiveService(i)}
                style={{
                  background: activeService === i ? `${s.color}10` : 'rgba(255,255,255,.03)',
                  border: `1px solid ${activeService === i ? `${s.color}50` : 'rgba(255,255,255,.07)'}`,
                  borderRadius:'20px', padding:'36px', cursor:'pointer',
                  opacity:serviceInView?1:0, transform:serviceInView?'translateY(0)':'translateY(32px)',
                  transition:`opacity .6s ease ${i*.1}s,transform .6s ease ${i*.1}s,background .25s ease,border-color .25s ease`,
                  position:'relative', overflow:'hidden',
                }}
              >
                <div style={{ position:'absolute', top:'-30px', right:'-30px', width:'120px', height:'120px', borderRadius:'50%', background:`radial-gradient(circle,${s.color}${activeService===i?'22':'10'} 0%,transparent 70%)`, pointerEvents:'none' }}/>
                <div style={{ fontSize:'32px', color:s.color, marginBottom:'20px', filter:`drop-shadow(0 0 10px ${s.color}55)` }}>{s.icon}</div>
                <h3 style={{ fontFamily:'Outfit, sans-serif', fontSize:'19px', fontWeight:'700', color:'#F8FAFC', marginBottom:'12px' }}>{s.title}</h3>
                <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', color:'#94A3B8', lineHeight:'1.8', marginBottom:'20px' }}>{s.desc}</p>
                <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                  {s.tags.map((tag, ti) => (
                    <span key={ti} style={{ padding:'4px 12px', borderRadius:'100px', background:`${s.color}12`, border:`1px solid ${s.color}28`, color:s.color, fontFamily:'DM Sans, sans-serif', fontSize:'11px', fontWeight:'600' }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRINCIPLES ════════════════════════════════════════════════════════ */}
      <section ref={principleRef} className="bs-pad" style={{ background:'rgba(255,255,255,.015)', borderTop:'1px solid rgba(255,255,255,.05)', borderBottom:'1px solid rgba(255,255,255,.05)', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>

          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#3B82F6,#22D3EE)' }}/>
            <span style={{ color:'#22D3EE', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>How We Think</span>
          </div>
          <h2 style={{ fontFamily:'Outfit, sans-serif', fontWeight:'800', fontSize:'clamp(28px,4vw,44px)', color:'#F8FAFC', marginBottom:'64px', maxWidth:'520px' }}>
            Four Principles.<br/>
            <span style={{ background:'linear-gradient(135deg,#3B82F6,#22D3EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Non-Negotiable.</span>
          </h2>

          {/* 2-col principle grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }} className="bs-svc-grid">
            {PRINCIPLES.map((p, i) => (
              <div key={i} style={{
                background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)',
                borderRadius:'20px', padding:'36px',
                opacity:principleInView?1:0, transform:principleInView?'translateY(0)':'translateY(28px)',
                transition:`all .65s ease ${i*.1}s`,
                position:'relative', overflow:'hidden',
              }}
                onMouseEnter={e=>{ e.currentTarget.style.background=`${p.color}0A`; e.currentTarget.style.borderColor=`${p.color}35`; e.currentTarget.style.transform='translateY(-5px)' }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,.03)'; e.currentTarget.style.borderColor='rgba(255,255,255,.07)'; e.currentTarget.style.transform='translateY(0)' }}
              >
                <div style={{ position:'absolute', top:'-20px', right:'-20px', width:'100px', height:'100px', borderRadius:'50%', background:`radial-gradient(circle,${p.color}18 0%,transparent 70%)`, pointerEvents:'none' }}/>
                <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:'400', color:p.color, letterSpacing:'2px', lineHeight:'1', marginBottom:'16px', filter:`drop-shadow(0 0 14px ${p.color}55)` }}>{p.num}</div>
                <h3 style={{ fontFamily:'Outfit, sans-serif', fontSize:'18px', fontWeight:'700', color:'#F8FAFC', marginBottom:'12px' }}>{p.title}</h3>
                <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', color:'#94A3B8', lineHeight:'1.8' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══════════════════════════════════════════════════════════ */}
      <section ref={timeRef} className="bs-pad" style={{ position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>

          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#3B82F6,#22D3EE)' }}/>
            <span style={{ color:'#22D3EE', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>Our Journey</span>
          </div>
          <h2 style={{ fontFamily:'Outfit, sans-serif', fontWeight:'800', fontSize:'clamp(28px,4vw,44px)', color:'#F8FAFC', marginBottom:'72px' }}>Built Step by Step</h2>

          <div className="bs-tl-wrap">
            <div className="bs-tl-line" style={{ opacity:timeInView?0.4:0, transition:'opacity .8s ease' }}/>
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0
              const card = (
                <div style={{ background:'rgba(255,255,255,.03)', border:`1px solid ${item.color}30`, borderRadius:'16px', padding:'24px 28px', maxWidth:'360px' }}>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:item.color, fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'8px' }}>{item.year} · {item.q}</div>
                  <div style={{ fontFamily:'Outfit, sans-serif', fontSize:'17px', fontWeight:'700', color:'#F8FAFC', marginBottom:'8px' }}>{item.title}</div>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', color:'#94A3B8', lineHeight:'1.7' }}>{item.desc}</div>
                </div>
              )
              return (
                <div key={i} className="bs-tl-row" style={{ opacity:timeInView?1:0, transform:timeInView?'translateY(0)':'translateY(24px)', transition:`all .7s ease ${i*.15}s` }}>
                  <div className="bs-tl-l">
                    {isLeft && <div style={{ display:'flex', justifyContent:'flex-end' }}>{card}</div>}
                  </div>
                  <div className="bs-tl-dot" style={{ background:item.color, boxShadow:`0 0 16px ${item.color}80` }}/>
                  <div className="bs-tl-r">
                    {!isLeft && card}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ TEAM & GOVERNANCE ══════════════════════════════════════════════════ */}
      <section ref={teamRef} className="bs-pad-team" style={{ background:'rgba(255,255,255,.015)', borderTop:'1px solid rgba(255,255,255,.05)', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>

          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#3B82F6,#22D3EE)' }}/>
            <span style={{ color:'#22D3EE', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>Governance & Team</span>
          </div>

          <div className="bs-2col-start">

            {/* Left — governance pillars */}
            <div style={{ opacity:teamInView?1:0, transform:teamInView?'translateX(0)':'translateX(-28px)', transition:'all .8s ease' }}>
              <h2 style={{ fontFamily:'Outfit, sans-serif', fontWeight:'800', fontSize:'clamp(24px,3.5vw,38px)', color:'#F8FAFC', marginBottom:'16px' }}>
                How We Run<br/>
                <span style={{ background:'linear-gradient(135deg,#3B82F6,#22D3EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>This Business</span>
              </h2>
              <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'15px', color:'#94A3B8', lineHeight:'1.9', marginBottom:'36px' }}>
                Maven Business Services operates on a simple mandate: protect the downside first, grow it second. Every decision passes through a disciplined risk-review process before execution.
              </p>

              {[
                { icon:'◈', title:'Risk-First Framework',      desc:'Every allocation reviewed against downside before upside.',      color:'#3B82F6' },
                { icon:'⬡', title:'Transparent Reporting',     desc:'Regular performance updates with no hidden fees or ambiguity.',  color:'#22D3EE' },
                { icon:'◉', title:'Independent Oversight',     desc:'External advisory input on all positions above threshold size.', color:'#A78BFA' },
                { icon:'⬢', title:'Ethical Operating Mandate', desc:'No leverage without consent. No speculation beyond mandate.',    color:'#F59E0B' },
              ].map((p, i) => (
                <div key={i}
                  style={{ display:'flex', gap:'16px', marginBottom:'16px', padding:'18px 20px', borderRadius:'14px', border:'1px solid rgba(255,255,255,.05)', background:'rgba(255,255,255,.02)', transition:'all .25s ease', opacity:teamInView?1:0, transform:teamInView?'translateY(0)':'translateY(16px)', transitionDelay:`${.1+i*.1}s` }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=`${p.color}0C`; e.currentTarget.style.borderColor=`${p.color}30`; e.currentTarget.style.transform='translateX(6px)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,.02)'; e.currentTarget.style.borderColor='rgba(255,255,255,.05)'; e.currentTarget.style.transform='translateX(0)' }}
                >
                  <div style={{ fontSize:'22px', color:p.color, flexShrink:0, marginTop:'2px', filter:`drop-shadow(0 0 8px ${p.color}55)` }}>{p.icon}</div>
                  <div>
                    <div style={{ fontFamily:'Outfit, sans-serif', fontSize:'15px', fontWeight:'700', color:'#F8FAFC', marginBottom:'4px' }}>{p.title}</div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', color:'#64748B', lineHeight:'1.6' }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — team + CTA */}
            <div style={{ opacity:teamInView?1:0, transform:teamInView?'translateX(0)':'translateX(28px)', transition:'all .8s ease .2s' }}>
              <h2 style={{ fontFamily:'Outfit, sans-serif', fontWeight:'800', fontSize:'clamp(24px,3.5vw,38px)', color:'#F8FAFC', marginBottom:'36px' }}>
                The People<br/>
                <span style={{ background:'linear-gradient(135deg,#3B82F6,#22D3EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Behind The Work</span>
              </h2>

              {TEAM.map((member, i) => (
                <div key={i} className="team-card"
                  style={{ display:'flex', gap:'20px', alignItems:'flex-start', padding:'24px', borderRadius:'18px', border:'1px solid rgba(255,255,255,.06)', background:'rgba(255,255,255,.03)', marginBottom:i<TEAM.length-1?'16px':0, transition:'all .3s ease', opacity:teamInView?1:0, transform:teamInView?'translateY(0)':'translateY(20px)', transitionDelay:`${.2+i*.15}s` }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=`${member.color}0D`; e.currentTarget.style.borderColor=`${member.color}35`; e.currentTarget.style.transform='translateY(-4px)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,.03)'; e.currentTarget.style.borderColor='rgba(255,255,255,.06)'; e.currentTarget.style.transform='translateY(0)' }}
                >
                  <div className="avatar" style={{ width:'54px', height:'54px', borderRadius:'14px', flexShrink:0, background:`linear-gradient(135deg,${member.color}40,${member.color}15)`, border:`1px solid ${member.color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Outfit, sans-serif', fontWeight:'800', fontSize:'16px', color:member.color, transition:'transform .3s ease', boxShadow:`0 0 16px ${member.color}25` }}>
                    {member.initials}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:'Outfit, sans-serif', fontSize:'16px', fontWeight:'700', color:'#F8FAFC', marginBottom:'3px' }}>{member.name}</div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:member.color, fontWeight:'600', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'8px' }}>{member.role}</div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', color:'#64748B', lineHeight:'1.6' }}>{member.desc}</div>
                  </div>
                </div>
              ))}

              {/* Partnership CTA */}
              <div style={{ marginTop:'24px', padding:'28px', borderRadius:'18px', background:'linear-gradient(135deg,rgba(26,86,219,.14),rgba(34,211,238,.07))', border:'1px solid rgba(59,130,246,.22)', textAlign:'center', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,#3B82F6,#22D3EE,transparent)' }}/>
                <div style={{ fontFamily:'Outfit, sans-serif', fontSize:'16px', fontWeight:'700', color:'#F8FAFC', marginBottom:'8px' }}>Interested in partnering?</div>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', color:'#64748B', marginBottom:'20px', lineHeight:'1.6' }}>We work with HNI clients, family offices, and institutional partners.</div>
                <button onClick={() => navigate('/investors')}
                  style={{ padding:'11px 28px', borderRadius:'8px', background:'linear-gradient(135deg,#1A56DB,#3B82F6)', border:'none', color:'#fff', fontFamily:'Outfit, sans-serif', fontWeight:'600', fontSize:'13px', cursor:'pointer', transition:'all .25s ease', boxShadow:'0 0 20px rgba(26,86,219,.4)' }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 0 32px rgba(26,86,219,.65)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 0 20px rgba(26,86,219,.4)' }}
                >Get In Touch →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}