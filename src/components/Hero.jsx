import { useEffect, useRef, useState } from 'react'

const particles = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 20 + 10,
  delay: Math.random() * 10,
  opacity: Math.random() * 0.5 + 0.1,
}))

const nodes = [
  { id: 'india', label: 'India', x: 68, y: 52, color: '#3B82F6', desc: 'Headquarters & Capital Markets' },
  { id: 'ksa', label: 'Saudi Arabia', x: 55, y: 45, color: '#22D3EE', desc: 'AI Tech & Infrastructure' },
  { id: 'uae', label: 'UAE', x: 58, y: 48, color: '#A78BFA', desc: 'Investment & E-Commerce' },
]

const connections = [
  { from: { x: 68, y: 52 }, to: { x: 55, y: 45 } },
  { from: { x: 55, y: 45 }, to: { x: 58, y: 48 } },
  { from: { x: 68, y: 52 }, to: { x: 58, y: 48 } },
]

export default function Hero() {
  const [activeNode, setActiveNode] = useState(null)
  const [visible, setVisible] = useState(false)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
    let start = 0
    const interval = setInterval(() => {
      start += 1
      setCounter(start)
      if (start >= 100) clearInterval(interval)
    }, 20)
    return () => clearInterval(interval)
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

      {/* Animated mesh gradient background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse at 70% 30%, rgba(26,86,219,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(13,148,136,0.08) 0%, transparent 50%)',
        animation: 'meshMove 8s ease-in-out infinite alternate',
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          borderRadius: '50%',
          background: p.id % 3 === 0 ? '#3B82F6' : p.id % 3 === 1 ? '#22D3EE' : '#A78BFA',
          opacity: p.opacity,
          animation: `float ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
          zIndex: 1,
        }} />
      ))}

      {/* Main content */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 32px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        width: '100%',
        paddingTop: '100px',
      }}>

        {/* LEFT — Text */}
        <div>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '100px',
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.2)',
            marginBottom: '32px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#22D3EE',
              animation: 'pulse 2s infinite',
            }} />
            <span style={{ color: '#22D3EE', fontSize: '12px', fontWeight: '500', letterSpacing: '1px' }}>
              GLOBAL HOLDING GROUP · EST. 2024
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
            fontWeight: '800',
            lineHeight: '1.1',
            color: '#F8FAFC',
            marginBottom: '12px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            Engineering Growth
          </h1>
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '28px',
            background: 'linear-gradient(135deg, #3B82F6, #22D3EE, #A78BFA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.35s',
          }}>
            Across Borders.
          </h1>

          {/* Subtext */}
          <p style={{
            color: '#94A3B8',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            maxWidth: '480px',
            marginBottom: '40px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.5s',
          }}>
            A diversified holding group building scalable enterprises across
            <span style={{ color: '#60A5FA' }}> India</span>,
            <span style={{ color: '#22D3EE' }}> Saudi Arabia</span>, and
            <span style={{ color: '#A78BFA' }}> global markets</span> — through
            technology, capital, and strategic partnerships.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.65s',
          }}>
            <button
              style={primaryBtn}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 0 40px rgba(59,130,246,0.6)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)'
                e.currentTarget.style.boxShadow = '0 0 25px rgba(59,130,246,0.35)'
              }}
            >
              Explore Our Verticals →
            </button>
            <button
              style={secondaryBtn}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'
                e.currentTarget.style.color = '#F8FAFC'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = '#94A3B8'
              }}
            >
              Partner With TMG
            </button>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex',
            gap: '32px',
            marginTop: '52px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            opacity: visible ? 1 : 0,
            transition: 'all 0.7s ease 0.8s',
          }}>
            {[
              { value: '4', label: 'Active Verticals' },
              { value: '3', label: 'Global Markets' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '1.6rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #3B82F6, #22D3EE)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {stat.value}
                </div>
                <div style={{ color: '#64748B', fontSize: '12px', marginTop: '2px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — World Map Visual */}
        <div style={{
          position: 'relative',
          height: '500px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(40px)',
          transition: 'all 0.9s ease 0.4s',
        }}>

          {/* Glowing orb behind map */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px', height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,86,219,0.15) 0%, transparent 70%)',
            animation: 'orbPulse 4s ease-in-out infinite',
          }} />

          {/* Map Container */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
            backdropFilter: 'blur(4px)',
          }}>
            {/* SVG World Map simplified */}
            <svg viewBox="0 0 100 70" style={{ width: '100%', height: '100%', opacity: 0.15 }}>
              {/* Simplified continent shapes */}
              {/* Europe */}
              <ellipse cx="47" cy="28" rx="7" ry="5" fill="#3B82F6" />
              {/* Africa */}
              <ellipse cx="48" cy="42" rx="6" ry="9" fill="#3B82F6" />
              {/* Asia */}
              <ellipse cx="67" cy="30" rx="14" ry="8" fill="#3B82F6" />
              {/* Americas */}
              <ellipse cx="22" cy="35" rx="8" ry="12" fill="#3B82F6" />
              {/* Australia */}
              <ellipse cx="78" cy="52" rx="5" ry="4" fill="#3B82F6" />
            </svg>

            {/* Connection lines SVG */}
            <svg viewBox="0 0 100 70" style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
            }}>
              {connections.map((conn, i) => (
                <line
                  key={i}
                  x1={conn.from.x} y1={conn.from.y}
                  x2={conn.to.x} y2={conn.to.y}
                  stroke="url(#lineGrad)"
                  strokeWidth="0.3"
                  strokeDasharray="2,2"
                  style={{ animation: `dashMove 3s ${i * 1}s linear infinite` }}
                />
              ))}
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Nodes */}
            {nodes.map(node => (
              <div
                key={node.id}
                style={{
                  position: 'absolute',
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Outer ring */}
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: activeNode === node.id ? '40px' : '28px',
                  height: activeNode === node.id ? '40px' : '28px',
                  borderRadius: '50%',
                  border: `1px solid ${node.color}44`,
                  transition: 'all 0.3s ease',
                  animation: `ping 2s ${Math.random() * 2}s ease-in-out infinite`,
                }} />
                {/* Core dot */}
                <div style={{
                  width: activeNode === node.id ? '14px' : '10px',
                  height: activeNode === node.id ? '14px' : '10px',
                  borderRadius: '50%',
                  background: node.color,
                  boxShadow: `0 0 ${activeNode === node.id ? 16 : 8}px ${node.color}`,
                  transition: 'all 0.3s ease',
                }} />

                {/* Tooltip */}
                {activeNode === node.id && (
                  <div style={{
                    position: 'absolute',
                    bottom: '120%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(11,28,45,0.95)',
                    border: `1px solid ${node.color}44`,
                    borderRadius: '10px',
                    padding: '10px 14px',
                    minWidth: '160px',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)',
                    zIndex: 20,
                  }}>
                    <div style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: '700',
                      fontSize: '13px',
                      color: node.color,
                      marginBottom: '4px',
                    }}>
                      {node.label}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      {node.desc}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Floating cards */}
          <FloatingCard
            style={{ top: '8%', right: '-5%' }}
            delay="0s"
            icon="🇮🇳"
            label="India"
            sub="HQ & Capital Markets"
            color="#3B82F6"
          />
          <FloatingCard
            style={{ bottom: '20%', right: '-8%' }}
            delay="1.5s"
            icon="🇸🇦"
            label="Saudi Arabia"
            sub="AI Tech & Infrastructure"
            color="#22D3EE"
          />
          <FloatingCard
            style={{ bottom: '5%', left: '5%' }}
            delay="3s"
            icon="🇦🇪"
            label="UAE"
            sub="Investment Hub"
            color="#A78BFA"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity: 0.5,
        zIndex: 2,
      }}>
        <span style={{ color: '#64748B', fontSize: '11px', letterSpacing: '2px' }}>SCROLL</span>
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, #3B82F6, transparent)',
          animation: 'scrollLine 2s ease-in-out infinite',
        }} />
      </div>

      {/* Keyframe styles */}
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
        @keyframes meshMove {
          from { opacity: 0.8; }
          to { opacity: 1; }
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
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  )
}

function FloatingCard({ style, delay, icon, label, sub, color }) {
  return (
    <div style={{
      position: 'absolute',
      ...style,
      background: 'rgba(11,28,45,0.85)',
      border: `1px solid ${color}33`,
      borderRadius: '12px',
      padding: '12px 16px',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      minWidth: '170px',
      animation: `cardFloat 4s ${delay} ease-in-out infinite`,
      boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${color}11`,
      zIndex: 5,
    }}>
      <div style={{ fontSize: '22px' }}>{icon}</div>
      <div>
        <div style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: '700',
          fontSize: '13px',
          color: '#F8FAFC',
        }}>{label}</div>
        <div style={{ fontSize: '11px', color: '#64748B' }}>{sub}</div>
      </div>
      <div style={{
        width: '6px', height: '6px',
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 8px ${color}`,
        marginLeft: 'auto',
        animation: 'pulse 2s infinite',
      }} />
    </div>
  )
}

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