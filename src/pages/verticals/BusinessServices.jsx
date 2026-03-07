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

function Counter({ to, prefix = '', suffix = '', duration = 1600, inView, decimals = 0 }) {
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
      setVal(parseFloat((p * to).toFixed(decimals)))
      if (step >= steps) { setVal(to); clearInterval(id) }
    }, duration / steps)
    return () => clearInterval(id)
  }, [inView, to, duration, decimals])
  return <>{prefix}{decimals ? val.toFixed(decimals) : val}{suffix}</>
}

const BAR_DATA = [
  { label: "Q1 '24", value: 42, color: '#1A56DB' },
  { label: "Q2 '24", value: 61, color: '#1A56DB' },
  { label: "Q3 '24", value: 55, color: '#1A56DB' },
  { label: "Q4 '24", value: 78, color: '#3B82F6' },
  { label: "Q1 '25", value: 88, color: '#3B82F6' },
  { label: "Q2 '25", value: 95, color: '#22D3EE' },
]

function buildPath(points, w, h) {
  const xs = points.map((_, i) => (i / (points.length - 1)) * w)
  const min = Math.min(...points), max = Math.max(...points)
  const ys = points.map(v => h - ((v - min) / (max - min)) * (h * 0.8) - h * 0.1)
  let d = `M ${xs[0]} ${ys[0]}`
  for (let i = 1; i < xs.length; i++) {
    const cx = (xs[i - 1] + xs[i]) / 2
    d += ` C ${cx} ${ys[i - 1]}, ${cx} ${ys[i]}, ${xs[i]} ${ys[i]}`
  }
  return { d, endX: xs[xs.length - 1], endY: ys[ys.length - 1] }
}

const SPARK_POINTS = [30, 38, 35, 52, 48, 61, 58, 72, 69, 85, 88, 95]
const { d: sparkD, endX: sparkEndX, endY: sparkEndY } = buildPath(SPARK_POINTS, 400, 120)

const SERVICES = [
  { icon: '◈', title: 'Equity Market Operations', desc: 'Active management across Indian and international equity markets. Long/short strategies with disciplined risk frameworks.', tags: ['NSE', 'BSE', 'International'], color: '#3B82F6' },
  { icon: '⬡', title: 'Portfolio Advisory', desc: 'Bespoke portfolio construction for HNI clients and institutional partners. Research-driven, conviction-based allocation.', tags: ['HNI', 'Institutional', 'Advisory'], color: '#22D3EE' },
  { icon: '◉', title: 'Real Estate Investments', desc: 'Strategic exposure to Saudi and Gulf real estate — commercial, residential, and mixed-use assets at inflection points.', tags: ['KSA', 'UAE', 'Commercial'], color: '#A78BFA' },
  { icon: '⬢', title: 'Cross-Border Structuring', desc: 'Entity structuring and formation across India, UAE, and KSA for smooth cross-border investment flows.', tags: ['India', 'KSA', 'UAE'], color: '#F59E0B' },
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

const TICKERS = [
  { sym: 'NIFTY',   val: '24,320', chg: '+1.2%', up: true },
  { sym: 'SENSEX',  val: '80,148', chg: '+0.9%', up: true },
  { sym: 'USDINR',  val: '83.42',  chg: '-0.1%', up: false },
  { sym: 'TADAWUL', val: '12,180', chg: '+0.6%', up: true },
  { sym: 'DFM',     val: '4,812',  chg: '+0.4%', up: true },
]

export default function BusinessServices() {
  const [visible, setVisible]             = useState(false)
  const [activeService, setActiveService] = useState(0)
  const [heroRef,    heroInView]    = useInView(0.1)
  const [statsRef,   statsInView]   = useInView(0.2)
  const [chartRef,   chartInView]   = useInView(0.2)
  const [serviceRef, serviceInView] = useInView(0.15)
  const [timeRef,    timeInView]    = useInView(0.1)
  const [teamRef,    teamInView]    = useInView(0.15)

  const navigate = useNavigate()
  const servicesSectionRef = useRef(null)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const scrollToServices = () => {
    servicesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px', overflow: 'hidden' }}>

      <style>{`
        @keyframes floatP   { from{transform:translateY(0) translateX(0);}to{transform:translateY(-16px) translateX(6px);} }
        @keyframes pulseD   { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.75);} }
        @keyframes ticker   { 0%{transform:translateX(0);}100%{transform:translateX(-50%);} }
        @keyframes drawLine { from{stroke-dashoffset:800;}to{stroke-dashoffset:0;} }
        @keyframes glowPulse{ 0%,100%{box-shadow:0 0 20px rgba(59,130,246,.3);}50%{box-shadow:0 0 40px rgba(59,130,246,.6);} }

        .svc-card:hover  { transform:translateY(-6px) !important; }
        .team-card:hover .avatar { transform:scale(1.06); }

        /* ─ padding helpers ─ */
        .bs-pad { padding: 80px 80px; }
        .bs-pad-hero { padding: 72px 80px 60px; }
        .bs-pad-stats { padding: 20px 80px 80px; }
        .bs-pad-svc { padding: 100px 80px; }
        .bs-pad-team { padding: 100px 80px 120px; }

        /* ─ grid helpers ─ */
        .bs-2col  { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; max-width:1200px; margin:0 auto; }
        .bs-2col-start { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; max-width:1200px; margin:0 auto; }
        .bs-4col  { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; max-width:1200px; margin:0 auto; }
        .bs-svc-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; }

        /* ─ Timeline ─ */
        .bs-tl-wrap { position:relative; }
        .bs-tl-line {
          position:absolute; left:50%; top:0; bottom:0; width:1px;
          transform:translateX(-50%);
          background:linear-gradient(180deg,#3B82F6,#22D3EE,#A78BFA,#F59E0B,rgba(255,255,255,0));
        }
        .bs-tl-row  { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; margin-bottom:48px; }
        .bs-tl-l    { padding:0 40px 0 0; text-align:right; }
        .bs-tl-r    { padding:0 0 0 40px; }
        .bs-tl-dot  { width:16px; height:16px; border-radius:50%; border:3px solid var(--navy); flex-shrink:0; z-index:2; }

        /* ─ TABLET ≤ 900px ─ */
        @media(max-width:900px){
          .bs-pad       { padding:60px 32px; }
          .bs-pad-hero  { padding:48px 32px 48px; }
          .bs-pad-stats { padding:0 32px 60px; }
          .bs-pad-svc   { padding:72px 32px; }
          .bs-pad-team  { padding:72px 32px 80px; }

          .bs-2col       { grid-template-columns:1fr; gap:48px; }
          .bs-2col-start { grid-template-columns:1fr; gap:48px; }
          .bs-4col       { grid-template-columns:repeat(2,1fr); }

          /* Timeline: left-rail layout */
          .bs-tl-line { left:8px !important; transform:none; }
          .bs-tl-row  { grid-template-columns:auto 1fr; }
          .bs-tl-l    { display:none; }
          .bs-tl-r    { padding:0 0 0 20px; }
          /* Show right card for ALL items (even left-side items) */
          .bs-tl-r-always { display:block !important; }
          .bs-tl-r-odd    { display:none !important; }
        }

        /* ─ MOBILE ≤ 600px ─ */
        @media(max-width:600px){
          .bs-pad       { padding:48px 20px; }
          .bs-pad-hero  { padding:36px 20px 40px; }
          .bs-pad-stats { padding:0 20px 48px; }
          .bs-pad-svc   { padding:56px 20px; }
          .bs-pad-team  { padding:56px 20px 64px; }

          .bs-4col     { gap:12px; }
          .bs-svc-grid { grid-template-columns:1fr; }
          .bs-hero-btns { flex-direction:column; }
          .bs-hero-btns button { width:100% !important; }
        }
      `}</style>

      {/* ── TICKER ── */}
      <div style={{ position:'fixed', top:'80px', left:0, right:0, zIndex:99, background:'rgba(11,28,45,0.95)', borderBottom:'1px solid rgba(59,130,246,0.15)', backdropFilter:'blur(12px)', overflow:'hidden', height:'36px', display:'flex', alignItems:'center' }}>
        <div style={{ display:'flex', gap:'48px', whiteSpace:'nowrap', animation:'ticker 22s linear infinite', width:'max-content' }}>
          {[...TICKERS, ...TICKERS, ...TICKERS].map((t, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', fontWeight:'700', color:'#64748B', letterSpacing:'1px' }}>{t.sym}</span>
              <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'12px', fontWeight:'600', color:'#F8FAFC' }}>{t.val}</span>
              <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', fontWeight:'600', color:t.up?'#22D3EE':'#F87171' }}>{t.up?'▲':'▼'} {t.chg}</span>
              <div style={{ width:'1px', height:'14px', background:'rgba(255,255,255,0.08)' }}/>
            </div>
          ))}
        </div>
      </div>

      {/* Background */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', background:'radial-gradient(ellipse at 80% 20%,rgba(26,86,219,.12) 0%,transparent 55%),radial-gradient(ellipse at 10% 80%,rgba(34,211,238,.06) 0%,transparent 50%)' }}/>
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:`linear-gradient(rgba(59,130,246,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.025) 1px,transparent 1px)`, backgroundSize:'60px 60px' }}/>

      {/* ── HERO ── */}
      <section ref={heroRef} className="bs-pad-hero" style={{ position:'relative', zIndex:1, marginTop:'36px' }}>
        <div className="bs-2col">
          {/* Left */}
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 16px', borderRadius:'100px', background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.25)', marginBottom:'32px', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(20px)', transition:'all .6s ease .1s' }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#3B82F6', animation:'pulseD 2s infinite' }}/>
              <span style={{ color:'#3B82F6', fontSize:'12px', fontWeight:'600', letterSpacing:'2px', fontFamily:'DM Sans, sans-serif' }}>MAVEN BUSINESS SERVICES</span>
            </div>
            <h1 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(2.2rem,4.5vw,3.6rem)', fontWeight:'800', color:'#F8FAFC', lineHeight:'1.1', marginBottom:'16px', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(30px)', transition:'all .7s ease .2s' }}>
              Where Strategy Meets
            </h1>
            <h1 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(2.2rem,4.5vw,3.6rem)', fontWeight:'800', lineHeight:'1.1', marginBottom:'28px', background:'linear-gradient(135deg,#3B82F6,#22D3EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(30px)', transition:'all .7s ease .32s' }}>
              Conviction.
            </h1>
            <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'17px', color:'#94A3B8', lineHeight:'1.85', maxWidth:'460px', marginBottom:'40px', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(20px)', transition:'all .7s ease .45s' }}>
              TMG's financial services vertical — operating across Indian equity markets, international instruments, and Gulf real estate. Disciplined. Research-driven. Built for the long term.
            </p>
            <div className="bs-hero-btns" style={{ display:'flex', gap:'14px', flexWrap:'wrap', opacity:visible?1:0, transition:'all .7s ease .6s' }}>
              <button onClick={scrollToServices} style={{ padding:'13px 26px', borderRadius:'10px', background:'linear-gradient(135deg,#1A56DB,#3B82F6)', border:'none', color:'#fff', fontFamily:'Syne, sans-serif', fontWeight:'600', fontSize:'14px', cursor:'pointer', transition:'all .25s ease', boxShadow:'0 0 24px rgba(26,86,219,0.4)', animation:'glowPulse 3s ease-in-out infinite' }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 0 40px rgba(26,86,219,.65)' }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 0 24px rgba(26,86,219,.4)' }}
              >Explore Services →</button>
              <button onClick={() => navigate('/investors')} style={{ padding:'13px 26px', borderRadius:'10px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', color:'#94A3B8', fontFamily:'Syne, sans-serif', fontWeight:'600', fontSize:'14px', cursor:'pointer', transition:'all .25s ease' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,.08)'; e.currentTarget.style.borderColor='rgba(59,130,246,.4)'; e.currentTarget.style.color='#F8FAFC' }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,.04)'; e.currentTarget.style.borderColor='rgba(255,255,255,.1)'; e.currentTarget.style.color='#94A3B8' }}
              >Partner With Us</button>
            </div>
          </div>

          {/* Right — Portfolio card */}
          <div style={{ opacity:visible?1:0, transform:visible?'translateX(0)':'translateX(40px)', transition:'all .9s ease .4s' }}>
            <div style={{ background:'rgba(11,28,45,0.8)', border:'1px solid rgba(59,130,246,0.2)', borderRadius:'20px', padding:'28px', backdropFilter:'blur(16px)', boxShadow:'0 24px 80px rgba(0,0,0,.5),0 0 0 1px rgba(59,130,246,.08)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'20px' }}>
                <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#EF4444' }}/>
                <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#F59E0B' }}/>
                <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#22C55E' }}/>
                <span style={{ marginLeft:'12px', fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:'#64748B', letterSpacing:'1px' }}>PORTFOLIO OVERVIEW · LIVE</span>
                <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:'6px' }}>
                  <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#22D3EE', animation:'pulseD 1.5s infinite' }}/>
                  <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', color:'#22D3EE' }}>ACTIVE</span>
                </div>
              </div>
              <div style={{ marginBottom:'20px' }}>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:'#64748B', marginBottom:'8px', letterSpacing:'1px' }}>PORTFOLIO GROWTH INDEX</div>
                <svg viewBox="0 0 400 120" style={{ width:'100%', height:'100px', overflow:'visible' }}>
                  <defs>
                    <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#3B82F6" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="sparkLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%"   stopColor="#1A56DB"/>
                      <stop offset="100%" stopColor="#22D3EE"/>
                    </linearGradient>
                  </defs>
                  <path d={`${sparkD} L ${sparkEndX} 120 L 0 120 Z`} fill="url(#sparkFill)"/>
                  <path d={sparkD} fill="none" stroke="url(#sparkLine)" strokeWidth="2.5" strokeDasharray="800" strokeDashoffset="800"
                    style={{ animation:visible?'drawLine 2s .6s ease forwards':'none' }}/>
                  <circle cx={sparkEndX} cy={sparkEndY} r="5" fill="#22D3EE"
                    style={{ filter:'drop-shadow(0 0 6px #22D3EE)', animation:'pulseD 2s infinite' }}/>
                </svg>
              </div>
              {[
                { label:'Indian Equity Markets', pct:58, color:'#3B82F6' },
                { label:'International Markets',  pct:27, color:'#22D3EE' },
                { label:'Saudi Real Estate',       pct:15, color:'#A78BFA' },
              ].map((row, i) => (
                <div key={i} style={{ marginBottom:i<2?'14px':0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
                    <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'12px', color:'#94A3B8' }}>{row.label}</span>
                    <span style={{ fontFamily:'Syne, sans-serif', fontSize:'12px', fontWeight:'700', color:row.color }}>{row.pct}%</span>
                  </div>
                  <div style={{ height:'4px', borderRadius:'4px', background:'rgba(255,255,255,.06)', overflow:'hidden' }}>
                    <div style={{ height:'100%', borderRadius:'4px', background:`linear-gradient(90deg,${row.color},${row.color}99)`, width:visible?`${row.pct}%`:'0%', transition:`width 1.2s ease ${.7+i*.2}s`, boxShadow:`0 0 8px ${row.color}60` }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY METRICS ── */}
      <section ref={statsRef} className="bs-pad-stats" style={{ position:'relative', zIndex:1 }}>
        <div className="bs-4col">
          {[
            { label:'Markets Covered',    to:3,  suffix:'',  color:'#3B82F6', sub:'India · KSA · UAE' },
            { label:'Active Strategies',  to:6,  suffix:'+', color:'#22D3EE', sub:'Equity & Real Estate' },
            { label:'Yrs of Experience',  to:5,  suffix:'+', color:'#A78BFA', sub:'Financial Markets' },
            { label:'Client Satisfaction',to:98, suffix:'%', color:'#F59E0B', sub:'Retention Rate' },
          ].map((s, i) => (
            <div key={i} style={{ background:'rgba(255,255,255,.03)', border:`1px solid ${s.color}20`, borderRadius:'18px', padding:'28px 24px', position:'relative', overflow:'hidden', opacity:statsInView?1:0, transform:statsInView?'translateY(0)':'translateY(28px)', transition:`all .6s ease ${i*.1}s`, cursor:'default' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.borderColor=s.color+'50'; e.currentTarget.style.background=s.color+'0C' }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor=s.color+'20'; e.currentTarget.style.background='rgba(255,255,255,.03)' }}
            >
              <div style={{ position:'absolute', top:'-16px', right:'-16px', width:'70px', height:'70px', borderRadius:'50%', background:`radial-gradient(circle,${s.color}25 0%,transparent 70%)`, pointerEvents:'none' }}/>
              <div style={{ fontFamily:'Syne, sans-serif', fontSize:'36px', fontWeight:'800', color:s.color, marginBottom:'6px', filter:`drop-shadow(0 0 10px ${s.color}55)` }}>
                <Counter to={s.to} suffix={s.suffix} inView={statsInView}/>
              </div>
              <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', color:'#F8FAFC', fontWeight:'600', marginBottom:'4px' }}>{s.label}</div>
              <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:'#64748B' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BAR CHART ── */}
      <section ref={chartRef} className="bs-pad" style={{ position:'relative', zIndex:1, background:'rgba(255,255,255,.015)', borderTop:'1px solid rgba(255,255,255,.05)', borderBottom:'1px solid rgba(255,255,255,.05)' }}>
        <div className="bs-2col">
          {/* Left */}
          <div style={{ opacity:chartInView?1:0, transform:chartInView?'translateX(0)':'translateX(-28px)', transition:'all .8s ease .1s' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'32px' }}>
              <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#3B82F6,#22D3EE)' }}/>
              <span style={{ color:'#22D3EE', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>Performance Index</span>
            </div>
            <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'28px', fontWeight:'800', color:'#F8FAFC', marginBottom:'8px' }}>Quarterly Growth</h2>
            <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', color:'#64748B', marginBottom:'40px' }}>Relative performance index across active strategies</p>
            <div style={{ display:'flex', alignItems:'flex-end', gap:'12px', height:'180px', padding:'0 4px' }}>
              {BAR_DATA.map((bar, i) => (
                <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', height:'100%', justifyContent:'flex-end' }}>
                  <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', fontWeight:'700', color:i===BAR_DATA.length-1?'#22D3EE':'#64748B', opacity:chartInView?1:0, transition:`opacity .4s ease ${.3+i*.1}s` }}>{bar.value}</span>
                  <div style={{ width:'100%', borderRadius:'6px 6px 0 0', background:i===BAR_DATA.length-1?'linear-gradient(180deg,#22D3EE,#3B82F6)':`linear-gradient(180deg,${bar.color}cc,${bar.color}66)`, height:chartInView?`${bar.value*1.7}px`:'0px', transition:`height .9s ease ${.2+i*.1}s`, boxShadow:i===BAR_DATA.length-1?'0 0 20px rgba(34,211,238,.4)':'none', position:'relative' }}>
                    {i===BAR_DATA.length-1&&<div style={{ position:'absolute', top:'-2px', left:0, right:0, height:'2px', background:'#22D3EE', borderRadius:'2px', boxShadow:'0 0 8px #22D3EE' }}/>}
                  </div>
                  <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', color:'#64748B', whiteSpace:'nowrap' }}>{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Right */}
          <div style={{ opacity:chartInView?1:0, transform:chartInView?'translateX(0)':'translateX(28px)', transition:'all .8s ease .2s' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'32px' }}>
              <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#3B82F6,#22D3EE)' }}/>
              <span style={{ color:'#22D3EE', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>Market Allocation</span>
            </div>
            <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'28px', fontWeight:'800', color:'#F8FAFC', marginBottom:'32px' }}>Where We Operate</h2>
            {[
              { market:'Indian Equity',    desc:'NSE & BSE listed equities, F&O strategies', pct:58, color:'#3B82F6', flag:'🇮🇳' },
              { market:'International',    desc:'US, EU & emerging market instruments',        pct:27, color:'#22D3EE', flag:'🌐' },
              { market:'Gulf Real Estate', desc:'KSA & UAE commercial and residential',        pct:15, color:'#A78BFA', flag:'🇸🇦' },
            ].map((row, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'18px', padding:'20px', borderRadius:'14px', border:'1px solid rgba(255,255,255,.05)', background:'rgba(255,255,255,.02)', marginBottom:i<2?'12px':0, transition:'all .25s ease' }}
                onMouseEnter={e=>{ e.currentTarget.style.background=row.color+'0D'; e.currentTarget.style.borderColor=row.color+'33'; e.currentTarget.style.transform='translateX(6px)' }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,.02)'; e.currentTarget.style.borderColor='rgba(255,255,255,.05)'; e.currentTarget.style.transform='translateX(0)' }}
              >
                <div style={{ fontSize:'28px' }}>{row.flag}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'Syne, sans-serif', fontSize:'15px', fontWeight:'700', color:'#F8FAFC', marginBottom:'3px' }}>{row.market}</div>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'12px', color:'#64748B' }}>{row.desc}</div>
                </div>
                <div style={{ fontFamily:'Syne, sans-serif', fontSize:'22px', fontWeight:'800', color:row.color, filter:`drop-shadow(0 0 8px ${row.color}60)` }}>{row.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section
        ref={(el) => { serviceRef.current = el; servicesSectionRef.current = el }}
        className="bs-pad-svc"
        style={{ position:'relative', zIndex:1 }}
      >
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#3B82F6,#22D3EE)' }}/>
            <span style={{ color:'#22D3EE', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>What We Do</span>
          </div>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(28px,4vw,44px)', fontWeight:'800', color:'#F8FAFC', marginBottom:'64px', maxWidth:'520px' }}>
            Four Core<br/>
            <span style={{ background:'linear-gradient(135deg,#3B82F6,#22D3EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Service Lines</span>
          </h2>
          <div className="bs-svc-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="svc-card" onClick={() => setActiveService(i)}
                style={{ background:activeService===i?s.color+'10':'rgba(255,255,255,.03)', border:`1px solid ${activeService===i?s.color+'50':'rgba(255,255,255,.07)'}`, borderRadius:'20px', padding:'36px', cursor:'pointer', opacity:serviceInView?1:0, transform:serviceInView?'translateY(0)':'translateY(32px)', transition:`opacity .6s ease ${i*.1}s,transform .6s ease ${i*.1}s,background .25s ease,border-color .25s ease`, position:'relative', overflow:'hidden' }}
              >
                <div style={{ position:'absolute', top:'-30px', right:'-30px', width:'120px', height:'120px', borderRadius:'50%', background:`radial-gradient(circle,${s.color}${activeService===i?'25':'12'} 0%,transparent 70%)`, pointerEvents:'none', transition:'all .3s ease' }}/>
                <div style={{ fontSize:'32px', color:s.color, marginBottom:'20px', filter:`drop-shadow(0 0 10px ${s.color}60)` }}>{s.icon}</div>
                <h3 style={{ fontFamily:'Syne, sans-serif', fontSize:'19px', fontWeight:'700', color:'#F8FAFC', marginBottom:'12px' }}>{s.title}</h3>
                <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', color:'#94A3B8', lineHeight:'1.8', marginBottom:'20px' }}>{s.desc}</p>
                <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                  {s.tags.map((tag, ti) => (
                    <span key={ti} style={{ padding:'4px 12px', borderRadius:'100px', background:s.color+'12', border:`1px solid ${s.color}28`, color:s.color, fontFamily:'DM Sans, sans-serif', fontSize:'11px', fontWeight:'600' }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section ref={timeRef} className="bs-pad" style={{ background:'rgba(255,255,255,.015)', borderTop:'1px solid rgba(255,255,255,.05)', borderBottom:'1px solid rgba(255,255,255,.05)', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#3B82F6,#22D3EE)' }}/>
            <span style={{ color:'#22D3EE', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>Our Journey</span>
          </div>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(28px,4vw,44px)', fontWeight:'800', color:'#F8FAFC', marginBottom:'72px' }}>Built Step by Step</h2>

          <div className="bs-tl-wrap">
            <div className="bs-tl-line" style={{ opacity:timeInView?0.4:0, transition:'opacity .8s ease' }}/>
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0
              const card = (
                <div style={{ background:'rgba(255,255,255,.03)', border:`1px solid ${item.color}30`, borderRadius:'16px', padding:'24px 28px', maxWidth:'360px' }}>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:item.color, fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'8px' }}>{item.year} · {item.q}</div>
                  <div style={{ fontFamily:'Syne, sans-serif', fontSize:'17px', fontWeight:'700', color:'#F8FAFC', marginBottom:'8px' }}>{item.title}</div>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', color:'#94A3B8', lineHeight:'1.7' }}>{item.desc}</div>
                </div>
              )
              return (
                <div key={i} className="bs-tl-row" style={{ opacity:timeInView?1:0, transform:timeInView?'translateY(0)':'translateY(24px)', transition:`all .7s ease ${i*.15}s` }}>
                  {/* Left cell — desktop only, even items */}
                  <div className="bs-tl-l">
                    {isLeft && <div style={{ display:'flex', justifyContent:'flex-end' }}>{card}</div>}
                  </div>
                  {/* Dot */}
                  <div className="bs-tl-dot" style={{ background:item.color, boxShadow:`0 0 16px ${item.color}80` }}/>
                  {/* Right cell — odd items on desktop, ALL items on mobile */}
                  <div className="bs-tl-r">
                    {/* Desktop: only odd (right-side) items */}
                    <div style={{ display: isLeft ? 'none' : 'block' }} className="bs-tl-desktop-odd">
                      {card}
                    </div>
                    {/* Mobile: all items (shown via media query) */}
                    <div style={{ display:'none' }} className="bs-tl-mobile-all">
                      {card}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TEAM / GOVERNANCE ── */}
      <section ref={teamRef} className="bs-pad-team" style={{ position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#3B82F6,#22D3EE)' }}/>
            <span style={{ color:'#22D3EE', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase', fontFamily:'DM Sans, sans-serif' }}>Governance & Team</span>
          </div>
          <div className="bs-2col-start">
            {/* Left — Governance */}
            <div style={{ opacity:teamInView?1:0, transform:teamInView?'translateX(0)':'translateX(-28px)', transition:'all .8s ease' }}>
              <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(24px,3.5vw,38px)', fontWeight:'800', color:'#F8FAFC', marginBottom:'16px' }}>
                How We Run<br/>
                <span style={{ background:'linear-gradient(135deg,#3B82F6,#22D3EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>This Business</span>
              </h2>
              <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'15px', color:'#94A3B8', lineHeight:'1.9', marginBottom:'36px' }}>
                Maven Business Services operates on a simple mandate: protect the downside first, grow it second. Every decision passes through a disciplined risk-review process before execution.
              </p>
              {[
                { icon:'◈', title:'Risk-First Framework',     desc:'Every allocation reviewed against downside before upside.',      color:'#3B82F6' },
                { icon:'⬡', title:'Transparent Reporting',    desc:'Regular performance updates with no hidden fees or ambiguity.',  color:'#22D3EE' },
                { icon:'◉', title:'Independent Oversight',    desc:'External advisory input on all positions above threshold size.', color:'#A78BFA' },
                { icon:'⬢', title:'Ethical Operating Mandate',desc:'No leverage without consent. No speculation beyond mandate.',    color:'#F59E0B' },
              ].map((p, i) => (
                <div key={i} style={{ display:'flex', gap:'16px', marginBottom:'20px', padding:'18px 20px', borderRadius:'14px', border:'1px solid rgba(255,255,255,.05)', background:'rgba(255,255,255,.02)', transition:'all .25s ease', opacity:teamInView?1:0, transform:teamInView?'translateY(0)':'translateY(16px)', transitionDelay:`${.1+i*.1}s` }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=p.color+'0C'; e.currentTarget.style.borderColor=p.color+'30'; e.currentTarget.style.transform='translateX(6px)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,.02)'; e.currentTarget.style.borderColor='rgba(255,255,255,.05)'; e.currentTarget.style.transform='translateX(0)' }}
                >
                  <div style={{ fontSize:'22px', color:p.color, flexShrink:0, marginTop:'2px', filter:`drop-shadow(0 0 8px ${p.color}60)` }}>{p.icon}</div>
                  <div>
                    <div style={{ fontFamily:'Syne, sans-serif', fontSize:'15px', fontWeight:'700', color:'#F8FAFC', marginBottom:'4px' }}>{p.title}</div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', color:'#64748B', lineHeight:'1.6' }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — Team cards */}
            <div style={{ opacity:teamInView?1:0, transform:teamInView?'translateX(0)':'translateX(28px)', transition:'all .8s ease .2s' }}>
              <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(24px,3.5vw,38px)', fontWeight:'800', color:'#F8FAFC', marginBottom:'36px' }}>
                The People<br/>
                <span style={{ background:'linear-gradient(135deg,#3B82F6,#22D3EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Behind The Numbers</span>
              </h2>
              {TEAM.map((member, i) => (
                <div key={i} className="team-card"
                  style={{ display:'flex', gap:'20px', alignItems:'flex-start', padding:'24px', borderRadius:'18px', border:'1px solid rgba(255,255,255,.06)', background:'rgba(255,255,255,.03)', marginBottom:i<TEAM.length-1?'16px':0, transition:'all .3s ease', opacity:teamInView?1:0, transform:teamInView?'translateY(0)':'translateY(20px)', transitionDelay:`${.2+i*.15}s` }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=member.color+'0D'; e.currentTarget.style.borderColor=member.color+'35'; e.currentTarget.style.transform='translateY(-4px)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,.03)'; e.currentTarget.style.borderColor='rgba(255,255,255,.06)'; e.currentTarget.style.transform='translateY(0)' }}
                >
                  <div className="avatar" style={{ width:'54px', height:'54px', borderRadius:'14px', flexShrink:0, background:`linear-gradient(135deg,${member.color}40,${member.color}15)`, border:`1px solid ${member.color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Syne, sans-serif', fontWeight:'800', fontSize:'16px', color:member.color, transition:'transform .3s ease', boxShadow:`0 0 16px ${member.color}25` }}>
                    {member.initials}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:'Syne, sans-serif', fontSize:'16px', fontWeight:'700', color:'#F8FAFC', marginBottom:'3px' }}>{member.name}</div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:member.color, fontWeight:'600', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'8px' }}>{member.role}</div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', color:'#64748B', lineHeight:'1.6' }}>{member.desc}</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop:'20px', padding:'24px 28px', borderRadius:'18px', background:'linear-gradient(135deg,rgba(26,86,219,.15),rgba(34,211,238,.08))', border:'1px solid rgba(59,130,246,.25)', textAlign:'center' }}>
                <div style={{ fontFamily:'Syne, sans-serif', fontSize:'15px', fontWeight:'700', color:'#F8FAFC', marginBottom:'6px' }}>Interested in partnering?</div>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', color:'#64748B', marginBottom:'16px' }}>We work with HNI clients, family offices, and institutional partners.</div>
                <button onClick={() => navigate('/investors')} style={{ padding:'10px 24px', borderRadius:'8px', background:'linear-gradient(135deg,#1A56DB,#3B82F6)', border:'none', color:'#fff', fontFamily:'Syne, sans-serif', fontWeight:'600', fontSize:'13px', cursor:'pointer', transition:'all .25s ease', boxShadow:'0 0 20px rgba(26,86,219,.4)' }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 0 32px rgba(26,86,219,.65)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 0 20px rgba(26,86,219,.4)' }}
                >Get In Touch →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline mobile override — injected last so it wins specificity */}
      <style>{`
        @media(max-width:900px){
          .bs-tl-desktop-odd { display: block !important; }
          .bs-tl-mobile-all  { display: none !important; }
        }
      `}</style>

    </div>
  )
}