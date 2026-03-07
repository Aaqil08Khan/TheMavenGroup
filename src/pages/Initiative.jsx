import { useEffect, useRef, useState } from 'react'
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
  { arabic:'الإيمان', english:'Iman', translation:'Faith', color:'#C8A96E', icon:'🌙' },
  { arabic:'الأسرة', english:'Usra', translation:'Family', color:'#34D399', icon:'👨‍👩‍👧‍👦' },
  { arabic:'العلم', english:'Ilm', translation:'Knowledge', color:'#3B82F6', icon:'📚' },
  { arabic:'الأمة', english:'Ummah', translation:'Community', color:'#A78BFA', icon:'🤝' },
]

const values = [
  { icon:'🕌', title:'Faith-Centered Living', desc:'Grounding family decisions in Islamic values — from financial planning to parenting, guided by the Quran and Sunnah.', color:'#C8A96E' },
  { icon:'👨‍👩‍👧‍👦', title:'Strong Family Bonds', desc:'Nurturing the ties of family through education, communication, and shared purpose across generations.', color:'#34D399' },
  { icon:'📚', title:'Islamic Education', desc:'Making authentic Islamic knowledge accessible to every family — children, parents, and elders alike.', color:'#3B82F6' },
  { icon:'💰', title:'Halal Finance', desc:'Guiding families toward Sharia-compliant financial decisions — from savings and investments to giving.', color:'#A78BFA' },
  { icon:'🤝', title:'Community Unity', desc:'Building bridges between Muslim families across India, Gulf, and global diaspora communities.', color:'#22D3EE' },
  { icon:'🌱', title:'Purposeful Growth', desc:'Encouraging personal development rooted in Islamic character — tarbiyah for the modern world.', color:'#FB7185' },
]

const programs = [
  { icon:'📖', title:'Family Tarbiyah Program', desc:'Monthly educational sessions for families covering parenting in Islam, marital guidance, and raising righteous children.', tag:'Education', tagColor:'#3B82F6', status:'Active' },
  { icon:'💼', title:'Halal Wealth Circles', desc:'Small group financial literacy sessions helping Muslim families navigate halal investing, budgeting, and Zakat calculation.', tag:'Finance', tagColor:'#C8A96E', status:'Active' },
  { icon:'👧', title:'Youth Islamic Identity', desc:'Programs designed for Muslim youth navigating identity, faith, and purpose in a modern, globalized world.', tag:'Youth', tagColor:'#34D399', status:'Coming Soon' },
  { icon:'🌐', title:'Global Muslim Family Network', desc:'A growing network connecting Muslim families across India, KSA, UAE and beyond for mutual support and collaboration.', tag:'Community', tagColor:'#22D3EE', status:'Building' },
]

export default function Initiative() {
  const navigate = useNavigate()
  const [heroRef,     heroInView]     = useInView(0.1)
  const [pillarsRef,  pillarsInView]  = useInView(0.2)
  const [valuesRef,   valuesInView]   = useInView(0.1)
  const [programsRef, programsInView] = useInView(0.1)
  const [ctaRef,      ctaInView]      = useInView(0.2)
  const [hoveredValue,   setHoveredValue]   = useState(null)
  const [hoveredProgram, setHoveredProgram] = useState(null)

  return (
    <div style={{ background:'var(--navy)', minHeight:'100vh', paddingTop:'100px' }}>

      <style>{`
        /* ── Responsive ── */
        @media(max-width:900px){
          .ini-hero-grid{grid-template-columns:1fr!important}
          .ini-hero-right{display:none!important}
          .ini-pillars-grid{grid-template-columns:repeat(2,1fr)!important}
          .ini-values-grid{grid-template-columns:repeat(2,1fr)!important}
          .ini-programs-grid{grid-template-columns:1fr!important}
          .ini-section{padding:60px 24px!important}
          .ini-cta{padding:40px 24px!important}
          .ini-cta-btns{justify-content:center!important}
        }
        @media(max-width:600px){
          .ini-pillars-grid{grid-template-columns:repeat(2,1fr)!important}
          .ini-values-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* HERO */}
      <section ref={heroRef} className="ini-section" style={{ padding:'80px 32px 60px', position:'relative', background:'radial-gradient(ellipse at 40% 50%,#1A1408 0%,#0B1C2D 70%)', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:0.025, backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(200,169,110,0.8) 40px,rgba(200,169,110,0.8) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(200,169,110,0.8) 40px,rgba(200,169,110,0.8) 41px),repeating-linear-gradient(45deg,transparent,transparent 28px,rgba(200,169,110,0.5) 28px,rgba(200,169,110,0.5) 29px),repeating-linear-gradient(-45deg,transparent,transparent 28px,rgba(200,169,110,0.5) 28px,rgba(200,169,110,0.5) 29px)`, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'-80px', right:'10%', width:'450px', height:'450px', borderRadius:'50%', background:'radial-gradient(circle,rgba(200,169,110,0.07) 0%,transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:'1280px', margin:'0 auto', position:'relative', zIndex:2 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'32px', opacity:heroInView?1:0, transition:'all 0.5s ease', flexWrap:'wrap' }}>
            <span style={{ color:'#475569', fontSize:'13px' }}>The Maven's Group</span>
            <span style={{ color:'#334155' }}>→</span>
            <span style={{ color:'#C8A96E', fontSize:'13px' }}>The Islamic Family</span>
          </div>

          <div className="ini-hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 16px', borderRadius:'100px', background:'rgba(200,169,110,0.1)', border:'1px solid rgba(200,169,110,0.25)', marginBottom:'24px', opacity:heroInView?1:0, transition:'all 0.5s ease 0.1s' }}>
                <span style={{ fontSize:'16px' }}>🕌</span>
                <span style={{ color:'#C8A96E', fontSize:'12px', fontWeight:'600', letterSpacing:'2px' }}>TMG INITIATIVE</span>
              </div>
              <div style={{ fontFamily:'serif', fontSize:'clamp(1.2rem,2.5vw,1.8rem)', color:'rgba(200,169,110,0.55)', marginBottom:'10px', letterSpacing:'3px', direction:'rtl', opacity:heroInView?1:0, transition:'all 0.6s ease 0.15s' }}>الأسرة الإسلامية</div>
              <h1 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:'800', lineHeight:'1.15', color:'#F8FAFC', marginBottom:'20px', opacity:heroInView?1:0, transform:heroInView?'translateY(0)':'translateY(24px)', transition:'all 0.6s ease 0.2s' }}>
                The{' '}
                <span style={{ background:'linear-gradient(135deg,#C8A96E,#FCD34D)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Islamic Family</span>
              </h1>
              <p style={{ color:'#94A3B8', fontSize:'1rem', lineHeight:'1.8', maxWidth:'480px', marginBottom:'16px', opacity:heroInView?1:0, transform:heroInView?'translateY(0)':'translateY(20px)', transition:'all 0.6s ease 0.35s' }}>
                A dedicated initiative by The Maven's Group committed to strengthening Muslim families — through faith, education, financial literacy, and community belonging.
              </p>
              <p style={{ color:'#64748B', fontSize:'0.95rem', lineHeight:'1.8', maxWidth:'480px', marginBottom:'32px', opacity:heroInView?1:0, transition:'all 0.6s ease 0.45s' }}>
                In a world of rapid change, the Muslim family remains the most important institution. We exist to protect, strengthen, and celebrate it — across India, the Gulf, and beyond.
              </p>
              <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', opacity:heroInView?1:0, transition:'all 0.6s ease 0.55s' }}>
                {['Family','Tarbiyah','Halal Finance','Ummah','Education'].map(tag => (
                  <span key={tag} style={{ padding:'6px 14px', borderRadius:'100px', background:'rgba(200,169,110,0.08)', border:'1px solid rgba(200,169,110,0.2)', color:'#C8A96E', fontSize:'12px', fontWeight:'500' }}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="ini-hero-right" style={{ opacity:heroInView?1:0, transform:heroInView?'translateX(0)':'translateX(30px)', transition:'all 0.8s ease 0.3s' }}>
              <div style={{ borderRadius:'24px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(200,169,110,0.12)', padding:'36px', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', inset:0, opacity:0.03, backgroundImage:`repeating-linear-gradient(45deg,rgba(200,169,110,1) 0px,rgba(200,169,110,1) 1px,transparent 1px,transparent 20px),repeating-linear-gradient(-45deg,rgba(200,169,110,1) 0px,rgba(200,169,110,1) 1px,transparent 1px,transparent 20px)`, pointerEvents:'none' }}/>
                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 70% 20%,rgba(200,169,110,0.07) 0%,transparent 60%)' }}/>
                <div style={{ position:'relative', zIndex:1 }}>
                  <div style={{ width:'80px', height:'80px', margin:'0 auto 24px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg viewBox="0 0 80 80" width="80" height="80">
                      <defs><radialGradient id="starGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FCD34D"/><stop offset="100%" stopColor="#C8A96E"/></radialGradient></defs>
                      <polygon points="40,5 47,30 72,30 52,47 59,72 40,57 21,72 28,47 8,30 33,30" fill="none" stroke="url(#starGrad)" strokeWidth="1.5" opacity="0.6"/>
                      <circle cx="40" cy="40" r="20" fill="none" stroke="#C8A96E" strokeWidth="0.5" opacity="0.3"/>
                      <circle cx="40" cy="40" r="12" fill="none" stroke="#C8A96E" strokeWidth="0.8" opacity="0.4"/>
                      <circle cx="40" cy="40" r="4" fill="#C8A96E" opacity="0.8"/>
                    </svg>
                  </div>
                  <div style={{ textAlign:'center', fontFamily:'Syne, sans-serif', fontWeight:'700', fontSize:'1.2rem', color:'#F8FAFC', marginBottom:'4px' }}>The Islamic Family</div>
                  <div style={{ textAlign:'center', color:'#C8A96E', fontSize:'11px', letterSpacing:'2px', marginBottom:'28px' }}>AN INITIATIVE BY TMG</div>
                  <div style={{ padding:'16px 20px', borderRadius:'12px', background:'rgba(200,169,110,0.06)', border:'1px solid rgba(200,169,110,0.12)', marginBottom:'20px' }}>
                    <div style={{ color:'#94A3B8', fontSize:'13px', lineHeight:'1.7', textAlign:'center', fontStyle:'italic' }}>"And of His signs is that He created for you from yourselves mates that you may find tranquility in them."</div>
                    <div style={{ color:'#C8A96E', fontSize:'11px', textAlign:'center', marginTop:'8px', letterSpacing:'1px' }}>— Quran 30:21</div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
                    {[{ flag:'🇮🇳', label:'India' }, { flag:'🇸🇦', label:'Saudi Arabia' }, { flag:'🇦🇪', label:'UAE' }, { flag:'🌍', label:'Global Diaspora' }].map((item, i) => (
                      <div key={i} style={{ padding:'10px 12px', borderRadius:'8px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', gap:'8px' }}>
                        <span style={{ fontSize:'16px' }}>{item.flag}</span>
                        <span style={{ color:'#64748B', fontSize:'11px' }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section ref={pillarsRef} className="ini-section" style={{ padding:'80px 32px', borderTop:'1px solid rgba(255,255,255,0.04)', borderBottom:'1px solid rgba(255,255,255,0.04)', background:'rgba(200,169,110,0.015)' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'48px', opacity:pillarsInView?1:0, transform:pillarsInView?'translateY(0)':'translateY(20px)', transition:'all 0.6s ease' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
              <div style={{ width:'32px', height:'1px', background:'linear-gradient(90deg,transparent,#C8A96E)' }}/>
              <span style={{ color:'#C8A96E', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase' }}>Our Foundation</span>
              <div style={{ width:'32px', height:'1px', background:'linear-gradient(90deg,#C8A96E,transparent)' }}/>
            </div>
            <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:'800', fontSize:'clamp(1.6rem,3vw,2.4rem)', color:'#F8FAFC' }}>Four Pillars of the Islamic Family</h2>
          </div>
          <div className="ini-pillars-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
            {pillars.map((pillar, i) => (
              <div key={i} style={{ padding:'36px 24px', borderRadius:'20px', background:'rgba(255,255,255,0.02)', border:`1px solid ${pillar.color}20`, textAlign:'center', position:'relative', overflow:'hidden', opacity:pillarsInView?1:0, transform:pillarsInView?'translateY(0)':'translateY(24px)', transition:`all 0.6s ease ${i*0.12}s` }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(90deg,transparent,${pillar.color},transparent)` }}/>
                <div style={{ fontSize:'28px', marginBottom:'12px' }}>{pillar.icon}</div>
                <div style={{ fontFamily:'serif', fontSize:'1.6rem', color:pillar.color, marginBottom:'8px', opacity:0.8, direction:'rtl' }}>{pillar.arabic}</div>
                <div style={{ fontFamily:'Syne, sans-serif', fontWeight:'800', fontSize:'1.1rem', color:'#F8FAFC', marginBottom:'4px' }}>{pillar.english}</div>
                <div style={{ color:pillar.color, fontSize:'12px', fontWeight:'500', letterSpacing:'1px' }}>{pillar.translation}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section ref={valuesRef} className="ini-section" style={{ padding:'100px 32px' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px', opacity:valuesInView?1:0, transition:'all 0.5s ease' }}>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#C8A96E,#FCD34D)' }}/>
            <span style={{ color:'#C8A96E', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase' }}>What We Stand For</span>
          </div>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:'800', fontSize:'clamp(1.6rem,3vw,2.4rem)', color:'#F8FAFC', marginBottom:'12px', opacity:valuesInView?1:0, transform:valuesInView?'translateY(0)':'translateY(20px)', transition:'all 0.6s ease 0.1s' }}>Our Core Values</h2>
          <p style={{ color:'#64748B', marginBottom:'48px', maxWidth:'500px', opacity:valuesInView?1:0, transition:'all 0.6s ease 0.2s' }}>
            Six principles that guide every program, every resource, and every conversation under The Islamic Family initiative.
          </p>
          <div className="ini-values-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
            {values.map((value, i) => (
              <div key={i} onMouseEnter={() => setHoveredValue(i)} onMouseLeave={() => setHoveredValue(null)} style={{ padding:'28px', borderRadius:'18px', background:hoveredValue===i?`${value.color}08`:'rgba(255,255,255,0.02)', border:hoveredValue===i?`1px solid ${value.color}35`:'1px solid rgba(255,255,255,0.05)', cursor:'default', transition:'all 0.3s ease', transform:hoveredValue===i?'translateY(-6px)':valuesInView?'translateY(0)':'translateY(24px)', opacity:valuesInView?1:0, transitionDelay:valuesInView?`${i*0.08}s`:'0s', position:'relative', overflow:'hidden' }}>
                {hoveredValue===i && <div style={{ position:'absolute', top:'-30px', right:'-30px', width:'120px', height:'120px', borderRadius:'50%', background:`radial-gradient(circle,${value.color}12 0%,transparent 70%)`, pointerEvents:'none' }}/>}
                <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:`${value.color}12`, border:`1px solid ${value.color}22`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', marginBottom:'16px', transition:'all 0.3s ease', boxShadow:hoveredValue===i?`0 0 20px ${value.color}20`:'none' }}>{value.icon}</div>
                <h3 style={{ fontFamily:'Syne, sans-serif', fontWeight:'700', fontSize:'15px', color:'#F8FAFC', marginBottom:'10px' }}>{value.title}</h3>
                <p style={{ color:'#64748B', fontSize:'13px', lineHeight:'1.7' }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section ref={programsRef} className="ini-section" style={{ padding:'80px 32px', background:'radial-gradient(ellipse at 50% 0%,#1A1408 0%,#0B1C2D 70%)', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px', opacity:programsInView?1:0, transition:'all 0.5s ease' }}>
            <div style={{ width:'32px', height:'2px', background:'linear-gradient(90deg,#C8A96E,#FCD34D)' }}/>
            <span style={{ color:'#C8A96E', fontSize:'12px', fontWeight:'600', letterSpacing:'3px', textTransform:'uppercase' }}>Active Programs</span>
          </div>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:'800', fontSize:'clamp(1.6rem,3vw,2.4rem)', color:'#F8FAFC', marginBottom:'48px', opacity:programsInView?1:0, transform:programsInView?'translateY(0)':'translateY(20px)', transition:'all 0.6s ease 0.1s' }}>What We Run</h2>
          <div className="ini-programs-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'20px' }}>
            {programs.map((program, i) => (
              <div key={i} onMouseEnter={() => setHoveredProgram(i)} onMouseLeave={() => setHoveredProgram(null)} style={{ padding:'32px', borderRadius:'20px', background:hoveredProgram===i?'rgba(200,169,110,0.05)':'rgba(255,255,255,0.02)', border:hoveredProgram===i?'1px solid rgba(200,169,110,0.25)':'1px solid rgba(255,255,255,0.05)', cursor:'default', transition:'all 0.3s ease', transform:hoveredProgram===i?'translateY(-4px)':programsInView?'translateY(0)':'translateY(24px)', opacity:programsInView?1:0, transitionDelay:programsInView?`${i*0.1}s`:'0s', position:'relative', overflow:'hidden' }}>
                {hoveredProgram===i && <div style={{ position:'absolute', top:0, right:0, width:'200px', height:'200px', borderRadius:'50%', background:'radial-gradient(circle,rgba(200,169,110,0.06) 0%,transparent 70%)', pointerEvents:'none' }}/>}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'16px' }}>
                  <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:'rgba(200,169,110,0.1)', border:'1px solid rgba(200,169,110,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px' }}>{program.icon}</div>
                  <div style={{ display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap' }}>
                    <span style={{ padding:'3px 10px', borderRadius:'100px', background:`${program.tagColor}15`, border:`1px solid ${program.tagColor}25`, color:program.tagColor, fontSize:'10px', fontWeight:'600' }}>{program.tag}</span>
                    <span style={{ padding:'3px 10px', borderRadius:'100px', background:program.status==='Active'?'rgba(52,211,153,0.1)':program.status==='Coming Soon'?'rgba(245,158,11,0.1)':'rgba(59,130,246,0.1)', border:`1px solid ${program.status==='Active'?'rgba(52,211,153,0.25)':program.status==='Coming Soon'?'rgba(245,158,11,0.25)':'rgba(59,130,246,0.25)'}`, color:program.status==='Active'?'#34D399':program.status==='Coming Soon'?'#F59E0B':'#3B82F6', fontSize:'10px', fontWeight:'600' }}>
                      {program.status==='Active'?'●':program.status==='Coming Soon'?'◐':'○'} {program.status}
                    </span>
                  </div>
                </div>
                <h3 style={{ fontFamily:'Syne, sans-serif', fontWeight:'700', fontSize:'16px', color:'#F8FAFC', marginBottom:'10px' }}>{program.title}</h3>
                <p style={{ color:'#64748B', fontSize:'13px', lineHeight:'1.7' }}>{program.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="ini-section" style={{ padding:'100px 32px' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div className="ini-cta" style={{ borderRadius:'24px', background:'linear-gradient(135deg,rgba(200,169,110,0.08) 0%,rgba(200,169,110,0.03) 100%)', border:'1px solid rgba(200,169,110,0.15)', padding:'70px 60px', textAlign:'center', position:'relative', overflow:'hidden', opacity:ctaInView?1:0, transform:ctaInView?'translateY(0)':'translateY(24px)', transition:'all 0.7s ease' }}>
            <div style={{ position:'absolute', inset:0, opacity:0.025, backgroundImage:`repeating-linear-gradient(45deg,rgba(200,169,110,1) 0px,rgba(200,169,110,1) 1px,transparent 1px,transparent 20px),repeating-linear-gradient(-45deg,rgba(200,169,110,1) 0px,rgba(200,169,110,1) 1px,transparent 1px,transparent 20px)`, pointerEvents:'none' }}/>
            <div style={{ position:'absolute', top:'-80px', left:'50%', transform:'translateX(-50%)', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(200,169,110,0.07) 0%,transparent 70%)', pointerEvents:'none' }}/>
            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ fontSize:'48px', marginBottom:'16px' }}>🕌</div>
              <div style={{ fontFamily:'serif', fontSize:'1.3rem', color:'rgba(200,169,110,0.5)', marginBottom:'16px', direction:'rtl', letterSpacing:'2px' }}>بسم الله الرحمن الرحيم</div>
              <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:'800', fontSize:'clamp(1.6rem,3vw,2.4rem)', color:'#F8FAFC', marginBottom:'16px' }}>Join The Islamic Family</h2>
              <p style={{ color:'#64748B', fontSize:'1rem', lineHeight:'1.8', maxWidth:'500px', margin:'0 auto 36px' }}>
                Whether you're a family, scholar, educator, or institution — there is a place for you in this movement. Let's build stronger Muslim families together.
              </p>
              <div className="ini-cta-btns" style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
                {/* Join the Initiative → /investors (partner/contact) */}
                <button onClick={() => navigate('/investors')} style={{ padding:'14px 32px', background:'linear-gradient(135deg,#C8A96E,#FCD34D)', border:'none', borderRadius:'10px', color:'#0B1C2D', fontFamily:'Syne, sans-serif', fontWeight:'700', fontSize:'14px', cursor:'pointer', transition:'all 0.3s ease', boxShadow:'0 0 24px rgba(200,169,110,0.3)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 0 40px rgba(200,169,110,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 0 24px rgba(200,169,110,0.3)' }}>
                  Join the Initiative →
                </button>
                {/* Learn More → /impact (social impact programs) */}
                <button onClick={() => navigate('/impact')} style={{ padding:'14px 32px', background:'transparent', border:'1px solid rgba(200,169,110,0.25)', borderRadius:'10px', color:'#C8A96E', fontFamily:'Syne, sans-serif', fontWeight:'600', fontSize:'14px', cursor:'pointer', transition:'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(200,169,110,0.08)'; e.currentTarget.style.borderColor='rgba(200,169,110,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(200,169,110,0.25)' }}>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}