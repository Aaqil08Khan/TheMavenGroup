import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Calendly config ────────────────────────────────────────────────────────────
const CALENDLY_URL = 'https://calendly.com/meet_mavenaitech/30min'

// ── EmailJS config ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_7s1nlxg'
const EMAILJS_TEMPLATE_ID = 'template_1is2g6u'
const EMAILJS_PUBLIC_KEY  = 'BKHbaqK7BmxxI02oD'

// ── useInView hook ─────────────────────────────────────────────────────────────
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

// ── Calendly hook ──────────────────────────────────────────────────────────────
function useCalendly() {
  useEffect(() => {
    if (!document.getElementById('calendly-css')) {
      const link = document.createElement('link')
      link.id = 'calendly-css'
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    if (!document.getElementById('calendly-script')) {
      const script = document.createElement('script')
      script.id = 'calendly-script'
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  const openCalendly = (e) => {
    e?.preventDefault()
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    } else {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')
    }
  }
  return { openCalendly }
}

// ── Floating particles background ─────────────────────────────────────────────
const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  duration: Math.random() * 20 + 10,
  delay: Math.random() * 10,
  opacity: Math.random() * 0.35 + 0.06,
}))

// ── Validation ─────────────────────────────────────────────────────────────────
function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email (e.g. you@company.com).'
  }
  if (!form.message.trim()) errors.message = 'Please write a message.'
  else if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  return errors
}

// ── Contact info items ─────────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: '✉',
    label: 'Email',
    value: 'info@themavengroup.com',
    sub: 'We reply within 24 hours',
    color: '#3B82F6',
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+91 9381472914',
    sub: 'Mon – Fri, 9am – 6pm IST',
    color: '#22D3EE',
  },
  {
    icon: '📍',
    label: 'Office',
    value: '5th Floor, Bait ar Rahma',
    sub: 'Shaikpet, Hyderabad – 500008',
    color: '#A78BFA',
  },
]

// ── Trust badges ───────────────────────────────────────────────────────────────
const TRUST = [
  { icon: '⚡', text: 'Response within 24 hours' },
  { icon: '☑', text: 'Free initial consultation' },
  { icon: '🔒', text: 'Your data stays private' },
]

// ── Main Export ────────────────────────────────────────────────────────────────
export default function Contact() {
  const navigate = useNavigate()
  const { openCalendly } = useCalendly()

  const [visible, setVisible] = useState(false)
  const [heroRef,  heroInView]  = useInView(0.1)
  const [formRef,  formInView]  = useInView(0.1)
  const [mapRef,   mapInView]   = useInView(0.15)

  const [form, setForm]       = useState({ name: '', email: '', company: '', message: '' })
  const [errors, setErrors]   = useState({})
  const [focused, setFocused] = useState(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setSending(true)
    try {
      // Dynamic import so EmailJS doesn't need to be in deps if not used
      const emailjs = await import('@emailjs/browser').then(m => m.default || m)
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          company:    form.company || 'Not provided',
          message:    form.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      setSent(true)
      setForm({ name: '', email: '', company: '', message: '' })
      setErrors({})
    } catch (err) {
      console.error('EmailJS error:', err)
      setErrors({ submit: 'Failed to send. Please try again or email us directly.' })
    } finally {
      setSending(false)
    }
  }

  // ── Input style helper ───────────────────────────────────────────────────────
  const inputStyle = (field) => ({
    width: '100%',
    background: errors[field]
      ? 'rgba(239,68,68,0.06)'
      : focused === field
      ? 'rgba(59,130,246,0.07)'
      : 'rgba(255,255,255,0.03)',
    border: `1px solid ${
      errors[field]
        ? 'rgba(239,68,68,0.55)'
        : focused === field
        ? 'rgba(59,130,246,0.55)'
        : 'rgba(255,255,255,0.08)'
    }`,
    borderRadius: '12px',
    padding: '13px 16px',
    fontSize: '14px',
    fontFamily: 'DM Sans, sans-serif',
    color: '#F8FAFC',
    outline: 'none',
    transition: 'all 0.25s ease',
    boxSizing: 'border-box',
    boxShadow: focused === field && !errors[field]
      ? '0 0 0 3px rgba(59,130,246,0.10)'
      : 'none',
  })

  return (
    <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px', overflow: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes floatP   { from{transform:translateY(0) translateX(0)} to{transform:translateY(-18px) translateX(8px)} }
        @keyframes pulseD   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.75)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spinRing { to{transform:rotate(360deg)} }
        @keyframes shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes glow     { 0%,100%{box-shadow:0 0 20px rgba(59,130,246,.3)} 50%{box-shadow:0 0 40px rgba(59,130,246,.6)} }

        .con-input-field::placeholder { color: #475569; }
        .con-input-field:focus { outline: none; }

        .con-field-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #64748B;
          display: block;
          margin-bottom: 8px;
          font-family: 'DM Sans', sans-serif;
        }

        .con-submit-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          background: linear-gradient(135deg,#1A56DB,#3B82F6);
          border: none;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all .25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          animation: glow 3s ease-in-out infinite;
        }
        .con-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(26,86,219,.65) !important; }
        .con-submit-btn:disabled { opacity: .6; cursor: not-allowed; transform: none !important; animation: none; }

        .con-calendly-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          background: rgba(52,211,153,0.08);
          border: 1px solid rgba(52,211,153,0.28);
          color: #34D399;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all .25s ease;
        }
        .con-calendly-btn:hover {
          background: rgba(52,211,153,0.14);
          box-shadow: 0 8px 32px rgba(52,211,153,.2);
          transform: translateY(-2px);
        }

        .con-info-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 20px;
          padding: 28px;
          transition: all .3s ease;
          position: relative;
          overflow: hidden;
        }
        .con-info-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,.12); }

        /* ── Responsive ── */
        @media(max-width:900px){
          .con-layout  { grid-template-columns: 1fr !important; }
          .con-hero    { padding: 60px 24px 48px !important; }
          .con-section { padding: 60px 24px !important; }
          .con-map     { height: 200px !important; }
          .con-hero-right { display: none !important; }
          .con-fields-row { grid-template-columns: 1fr !important; }
        }
        @media(max-width:600px){
          .con-info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Floating particles ── */}
      {PARTICLES.map(p => (
        <div key={p.id} style={{
          position: 'fixed', left: `${p.x}%`, top: `${p.y}%`,
          width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
          background: p.id % 3 === 0 ? '#3B82F6' : p.id % 3 === 1 ? '#22D3EE' : '#A78BFA',
          opacity: p.opacity,
          animation: `floatP ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
          pointerEvents: 'none', zIndex: 0,
        }} />
      ))}

      {/* ── Ambient gradients ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 75% 25%,rgba(26,86,219,.10) 0%,transparent 55%),radial-gradient(ellipse at 15% 75%,rgba(34,211,238,.06) 0%,transparent 50%)'
      }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(59,130,246,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.022) 1px,transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* ── HERO ── */}
      <section ref={heroRef} className="con-hero" style={{ padding: '72px 80px 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          <div className="con-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

            {/* Left — heading */}
            <div>
              {/* Pill label */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px', borderRadius: '100px',
                background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.25)',
                marginBottom: '32px',
                opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all .6s ease .1s',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3B82F6', animation: 'pulseD 2s infinite' }} />
                <span style={{ color: '#3B82F6', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', fontFamily: 'DM Sans, sans-serif' }}>GET IN TOUCH</span>
              </div>

              <h1 style={{
                fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(3rem,6vw,5.2rem)', fontWeight: '400',
                color: '#F8FAFC', lineHeight: '1.0', letterSpacing: '2px', marginBottom: '8px',
                opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all .75s ease .2s',
              }}>Let's Build Something</h1>
              <h1 style={{
                fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(3rem,6vw,5.2rem)', fontWeight: '400',
                lineHeight: '1.0', letterSpacing: '2px', marginBottom: '28px',
                background: 'linear-gradient(135deg,#3B82F6,#22D3EE)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all .75s ease .32s',
              }}>Extraordinary.</h1>

              <p style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(15px,2vw,17px)', color: '#94A3B8',
                lineHeight: '1.85', maxWidth: '440px', marginBottom: '36px',
                opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all .7s ease .45s',
              }}>
                Have a project in mind? We'd love to hear about it — whether it's an AI build, a partnership opportunity, or just a question. Reach out and we'll get back to you promptly.
              </p>

              {/* Trust badges */}
              <div style={{
                display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px',
                opacity: visible ? 1 : 0, transition: 'all .7s ease .55s',
              }}>
                {TRUST.map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>{t.icon}</div>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#94A3B8' }}>{t.text}</span>
                  </div>
                ))}
              </div>

              {/* Hero Calendly CTA */}
              <div style={{ opacity: visible ? 1 : 0, transition: 'all .7s ease .65s' }}>
                <button
                  onClick={openCalendly}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    padding: '13px 28px', borderRadius: '12px',
                    background: 'linear-gradient(135deg,#059669,#34D399)',
                    border: 'none', color: '#fff',
                    fontFamily: 'Outfit, sans-serif', fontWeight: '700', fontSize: '14px',
                    cursor: 'pointer', transition: 'all .25s ease',
                    boxShadow: '0 8px 28px rgba(52,211,153,0.28)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(52,211,153,.42)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(52,211,153,.28)' }}
                >
                  📅 Book a Free Consultation →
                </button>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#475569', marginTop: '10px' }}>
                  Pick a time — a team member will be on the call.
                </p>
              </div>
            </div>

            {/* Right — floating info panel */}
            <div className="con-hero-right" style={{
              opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(36px)',
              transition: 'all .9s ease .4s',
            }}>
              <div style={{
                background: 'rgba(11,28,45,.85)', border: '1px solid rgba(59,130,246,.18)',
                borderRadius: '24px', padding: '36px', backdropFilter: 'blur(16px)',
                boxShadow: '0 24px 80px rgba(0,0,0,.45),0 0 0 1px rgba(59,130,246,.07)',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Top accent line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg,transparent,#3B82F6,#22D3EE,transparent)' }} />
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22D3EE', animation: 'pulseD 1.8s infinite', boxShadow: '0 0 8px #22D3EE' }} />
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#64748B', letterSpacing: '2px', fontWeight: '600' }}>REACH US DIRECTLY</span>
                </div>

                {/* Contact items */}
                {CONTACT_INFO.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '16px',
                    padding: '18px 20px', borderRadius: '14px',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                    marginBottom: i < CONTACT_INFO.length - 1 ? '12px' : '0',
                    transition: 'all .25s ease', cursor: 'default',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${item.color}0A`; e.currentTarget.style.borderColor = `${item.color}30` }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}
                  >
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '12px',
                      background: `${item.color}15`, border: `1px solid ${item.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '18px', flexShrink: 0,
                      boxShadow: `0 0 14px ${item.color}22`,
                    }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#64748B', marginBottom: '4px' }}>{item.label}</div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: '600', color: '#F8FAFC', marginBottom: '2px' }}>{item.value}</div>
                      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#475569' }}>{item.sub}</div>
                    </div>
                  </div>
                ))}

                {/* Response time badge */}
                <div style={{
                  marginTop: '20px', padding: '16px 20px', borderRadius: '14px',
                  background: 'linear-gradient(135deg,rgba(26,86,219,0.12),rgba(34,211,238,0.08))',
                  border: '1px solid rgba(59,130,246,0.2)',
                  display: 'flex', alignItems: 'center', gap: '14px',
                }}>
                  <div style={{ fontSize: '24px' }}>⚡</div>
                  <div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700', fontSize: '16px', color: '#22D3EE' }}>{'< 4 Hours'}</div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#64748B' }}>Average response during business hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ── */}
      <section ref={formRef} className="con-section" style={{ padding: '0 80px 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Section label */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px',
            opacity: formInView ? 1 : 0, transition: 'all .6s ease',
          }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg,#3B82F6,#22D3EE)' }} />
            <span style={{ color: '#22D3EE', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>Send a Message</span>
          </div>

          <div className="con-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>

            {/* ── CONTACT FORM ── */}
            <div style={{
              opacity: formInView ? 1 : 0, transform: formInView ? 'translateY(0)' : 'translateY(28px)',
              transition: 'all .7s ease .1s',
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '24px', padding: '40px', position: 'relative', overflow: 'hidden',
              }}>
                {/* Accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg,transparent,#3B82F6,transparent)' }} />
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />

                {sent ? (
                  /* ── Success state ── */
                  <div style={{ textAlign: 'center', padding: '40px 0', animation: 'fadeUp .5s ease' }}>
                    <div style={{ fontSize: '56px', marginBottom: '20px' }}>✅</div>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', fontSize: '22px', color: '#F8FAFC', marginBottom: '12px' }}>Message Sent!</h3>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#94A3B8', lineHeight: '1.75', marginBottom: '28px' }}>
                      We've received your message and will get back to you within 24 hours. Looking forward to connecting!
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      style={{
                        padding: '10px 24px', borderRadius: '10px',
                        background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
                        color: '#3B82F6', fontFamily: 'Outfit, sans-serif', fontWeight: '600', fontSize: '13px',
                        cursor: 'pointer', transition: 'all .2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.18)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)' }}
                    >Send Another Message</button>
                  </div>
                ) : (
                  /* ── Form ── */
                  <>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', fontSize: 'clamp(1.3rem,2.5vw,1.7rem)', color: '#F8FAFC', marginBottom: '6px' }}>Send Us a Message</h2>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#64748B', marginBottom: '28px' }}>
                      Fields marked <span style={{ color: '#EF4444' }}>*</span> are required.
                    </p>

                    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                      {/* Name + Company row */}
                      <div className="con-fields-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label className="con-field-label">Full Name <span style={{ color: '#EF4444' }}>*</span></label>
                          <input
                            className="con-input-field"
                            type="text"
                            value={form.name}
                            onChange={e => handleChange('name', e.target.value)}
                            onFocus={() => setFocused('name')}
                            onBlur={() => setFocused(null)}
                            style={inputStyle('name')}
                            placeholder="John Smith"
                          />
                          {errors.name && <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#EF4444', marginTop: '5px', fontWeight: '600' }}>{errors.name}</p>}
                        </div>
                        <div>
                          <label className="con-field-label">Company</label>
                          <input
                            className="con-input-field"
                            type="text"
                            value={form.company}
                            onChange={e => handleChange('company', e.target.value)}
                            onFocus={() => setFocused('company')}
                            onBlur={() => setFocused(null)}
                            style={inputStyle('company')}
                            placeholder="Acme Inc. (optional)"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="con-field-label">Email Address <span style={{ color: '#EF4444' }}>*</span></label>
                        <input
                          className="con-input-field"
                          type="email"
                          value={form.email}
                          onChange={e => handleChange('email', e.target.value)}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused(null)}
                          style={inputStyle('email')}
                          placeholder="you@company.com"
                        />
                        {errors.email && <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#EF4444', marginTop: '5px', fontWeight: '600' }}>{errors.email}</p>}
                      </div>

                      {/* Message */}
                      <div>
                        <label className="con-field-label">Message <span style={{ color: '#EF4444' }}>*</span></label>
                        <textarea
                          className="con-input-field"
                          value={form.message}
                          onChange={e => handleChange('message', e.target.value)}
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused(null)}
                          rows={5}
                          style={{ ...inputStyle('message'), resize: 'none' }}
                          placeholder="Tell us about your project, goals, and timeline..."
                        />
                        {errors.message && <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#EF4444', marginTop: '5px', fontWeight: '600' }}>{errors.message}</p>}
                      </div>

                      {/* Submit error */}
                      {errors.submit && (
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#EF4444', padding: '10px 14px', borderRadius: '8px', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}>
                          {errors.submit}
                        </p>
                      )}

                      <button type="submit" disabled={sending} className="con-submit-btn">
                        {sending ? (
                          <>
                            <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spinRing .8s linear infinite' }} />
                            Sending…
                          </>
                        ) : (
                          <>Send Message ✉</>
                        )}
                      </button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
                      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#475569', fontWeight: '600' }}>OR</span>
                      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
                    </div>

                    {/* Calendly button */}
                    <button onClick={openCalendly} className="con-calendly-btn">
                      📅 Book a Free Consultation Call
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '20px',
              opacity: formInView ? 1 : 0, transform: formInView ? 'translateY(0)' : 'translateY(28px)',
              transition: 'all .7s ease .25s',
            }}>


              {/* Why reach out card */}
              <div className="con-info-card">
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', fontSize: '16px', color: '#F8FAFC', marginBottom: '18px' }}>What to Expect</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { step: '01', title: 'We review your message', desc: 'Every enquiry is read personally by the team.', color: '#3B82F6' },
                    { step: '02', title: 'Initial response in 24h', desc: "We'll acknowledge and set next steps.", color: '#22D3EE' },
                    { step: '03', title: 'Discovery call', desc: 'A short call to understand your project deeply.', color: '#A78BFA' },
                    { step: '04', title: 'Proposal & kickoff', desc: 'Tailored plan delivered, then we build together.', color: '#F59E0B' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                        background: `${item.color}15`, border: `1px solid ${item.color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Outfit, sans-serif', fontSize: '11px', fontWeight: '800', color: item.color,
                      }}>{item.step}</div>
                      <div>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700', fontSize: '13px', color: '#F8FAFC', marginBottom: '3px' }}>{item.title}</div>
                        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#64748B', lineHeight: '1.55' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social / quick links */}
              <div className="con-info-card">
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', fontSize: '16px', color: '#F8FAFC', marginBottom: '16px' }}>Other Ways to Connect</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: 'LinkedIn', handle: 'Maven AI Tech', color: '#3B82F6', icon: '💼' },
                    { label: 'Twitter / X', handle: '@mavenaitech', color: '#22D3EE', icon: '𝕏' },
                    { label: 'Email Direct', handle: 'info@themavengroup.com', color: '#A78BFA', icon: '✉' },
                  ].map((s, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '12px 14px', borderRadius: '10px',
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all .2s ease', cursor: 'default',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${s.color}0A`; e.currentTarget.style.borderColor = `${s.color}28` }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}
                    >
                      <div style={{ fontSize: '18px', width: '30px', textAlign: 'center' }}>{s.icon}</div>
                      <div>
                        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: '#475569', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</div>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: s.color, fontWeight: '600' }}>{s.handle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

   

  

    </div>
  )
}