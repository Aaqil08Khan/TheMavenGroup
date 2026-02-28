import { useEffect, useRef, useState } from 'react'

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

const categories = [
  { icon: '💄', label: 'Beauty & Wellness', color: '#FB7185', count: '120+ SKUs' },
  { icon: '👗', label: 'Fashion & Apparel', color: '#A78BFA', count: '80+ SKUs' },
  { icon: '🏠', label: 'Home & Living', color: '#34D399', count: '60+ SKUs' },
  { icon: '📱', label: 'Tech Accessories', color: '#22D3EE', count: '40+ SKUs' },
  { icon: '🍎', label: 'Health & Nutrition', color: '#F59E0B', count: '50+ SKUs' },
  { icon: '🎁', label: 'Gifts & Lifestyle', color: '#3B82F6', count: '30+ SKUs' },
]

const platforms = [
  { name: 'Amazon India', icon: '📦', color: '#F59E0B', status: 'Live' },
  { name: 'Flipkart', icon: '🛒', color: '#3B82F6', status: 'Live' },
  { name: 'Meesho', icon: '🏪', color: '#A78BFA', status: 'Live' },
  { name: 'Amazon UAE', icon: '🌍', color: '#22D3EE', status: 'Active' },
  { name: 'Noon', icon: '🌙', color: '#FB7185', status: 'Active' },
  { name: 'Own D2C', icon: '🚀', color: '#34D399', status: 'Building' },
]

const steps = [
  { icon: '🔍', title: 'Product Sourcing', desc: 'Curated from verified manufacturers across India and Southeast Asia', color: '#3B82F6' },
  { icon: '📦', title: 'Smart Packaging', desc: 'Premium branded packaging that creates an unforgettable unboxing moment', color: '#FB7185' },
  { icon: '🏭', title: 'Warehouse & FBA', desc: 'Fulfilled by Amazon and partner 3PL networks across India and Gulf', color: '#F59E0B' },
  { icon: '🚚', title: 'Last Mile Delivery', desc: 'Pan-India and cross-border delivery within 2-5 business days', color: '#34D399' },
  { icon: '⭐', title: 'Customer Delight', desc: 'Post-purchase experience designed to drive repeat orders and reviews', color: '#A78BFA' },
]

const stats = [
  { value: '380+', label: 'Active SKUs', color: '#FB7185' },
  { value: '5', label: 'Marketplaces', color: '#A78BFA' },
  { value: '2', label: 'Markets', color: '#22D3EE' },
  { value: '4.6★', label: 'Avg Rating', color: '#F59E0B' },
]

export default function ECommerce() {
  const [heroRef, heroInView] = useInView(0.1)
  const [categoriesRef, categoriesInView] = useInView(0.1)
  const [platformsRef, platformsInView] = useInView(0.15)
  const [stepsRef, stepsInView] = useInView(0.1)
  const [unboxRef, unboxInView] = useInView(0.2)
  const [hoveredCat, setHoveredCat] = useState(null)
  const [hoveredPlatform, setHoveredPlatform] = useState(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px' }}>

      {/* HERO BANNER */}
      <section
        ref={heroRef}
        style={{
          padding: '80px 0 60px',
          position: 'relative',
          background: 'radial-gradient(ellipse at 30% 50%, #1A0D2E 0%, #0B1C2D 70%)',
          overflow: 'hidden',
        }}
      >
        {/* Colorful confetti dots */}
        {[...Array(30)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            background: ['#FB7185', '#A78BFA', '#22D3EE', '#F59E0B', '#34D399'][Math.floor(Math.random() * 5)],
            opacity: Math.random() * 0.3 + 0.05,
            animation: `floatDot ${Math.random() * 10 + 8}s ${Math.random() * 5}s ease-in-out infinite alternate`,
            pointerEvents: 'none',
          }} />
        ))}

        <div style={{
          position: 'absolute', top: '-50px', right: '-50px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,113,133,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-50px', left: '20%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 2 }}>

          {/* Breadcrumb */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            marginBottom: '32px',
            opacity: heroInView ? 1 : 0,
            transition: 'all 0.5s ease',
          }}>
            <span style={{ color: '#475569', fontSize: '13px' }}>The Maven's Group</span>
            <span style={{ color: '#334155' }}>→</span>
            <span style={{ color: '#475569', fontSize: '13px' }}>Verticals</span>
            <span style={{ color: '#334155' }}>→</span>
            <span style={{ color: '#FB7185', fontSize: '13px' }}>E-Commerce</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

            {/* LEFT */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px', borderRadius: '100px',
                background: 'rgba(251,113,133,0.1)',
                border: '1px solid rgba(251,113,133,0.25)',
                marginBottom: '24px',
                opacity: heroInView ? 1 : 0,
                transition: 'all 0.5s ease 0.1s',
              }}>
                <span style={{ fontSize: '16px' }}>🛍️</span>
                <span style={{ color: '#FB7185', fontSize: '12px', fontWeight: '600', letterSpacing: '2px' }}>
                  VERTICAL 04 · RETAIL
                </span>
              </div>

              <h1 style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontWeight: '800', lineHeight: '1.15',
                color: '#F8FAFC', marginBottom: '20px',
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.6s ease 0.2s',
              }}>
                Maven{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #FB7185, #A78BFA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  E-Commerce
                </span>
              </h1>

              <p style={{
                color: '#94A3B8', fontSize: '1rem',
                lineHeight: '1.8', maxWidth: '480px',
                marginBottom: '32px',
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.35s',
              }}>
                Building a cross-border retail powerhouse across India and Gulf markets —
                curating premium products, crafting unforgettable unboxing experiences,
                and scaling through
                <span style={{ color: '#FB7185' }}> multi-platform distribution</span>.
              </p>

              <div style={{
                display: 'flex', gap: '12px', flexWrap: 'wrap',
                opacity: heroInView ? 1 : 0,
                transition: 'all 0.6s ease 0.5s',
              }}>
                {['Amazon', 'Flipkart', 'D2C', 'Gulf Markets', 'Premium'].map(tag => (
                  <span key={tag} style={{
                    padding: '6px 14px', borderRadius: '100px',
                    background: 'rgba(251,113,133,0.08)',
                    border: '1px solid rgba(251,113,133,0.2)',
                    color: '#FB7185', fontSize: '12px', fontWeight: '500',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — E-commerce visual */}
            <div style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.8s ease 0.3s',
            }}>
              <div style={{
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(251,113,133,0.12)',
                padding: '28px',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(ellipse at 80% 20%, rgba(251,113,133,0.07) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(167,139,250,0.06) 0%, transparent 60%)',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '20px',
                  }}>
                    <div>
                      <div style={{ color: '#64748B', fontSize: '11px', letterSpacing: '1px', marginBottom: '4px' }}>
                        MONTHLY ORDERS
                      </div>
                      <div style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: '800', fontSize: '1.8rem', color: '#F8FAFC',
                      }}>
                        2,400+
                      </div>
                    </div>
                    <div style={{
                      padding: '6px 12px', borderRadius: '100px',
                      background: 'rgba(52,211,153,0.1)',
                      border: '1px solid rgba(52,211,153,0.2)',
                      color: '#34D399', fontSize: '12px', fontWeight: '600',
                    }}>
                      ↑ Growing
                    </div>
                  </div>

                  {/* Category pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                    {categories.slice(0, 4).map((cat, i) => (
                      <div key={i} style={{
                        padding: '6px 12px', borderRadius: '100px',
                        background: `${cat.color}12`,
                        border: `1px solid ${cat.color}25`,
                        display: 'flex', alignItems: 'center', gap: '6px',
                      }}>
                        <span style={{ fontSize: '14px' }}>{cat.icon}</span>
                        <span style={{ color: cat.color, fontSize: '11px', fontWeight: '500' }}>{cat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Marketplace logos row */}
                  <div style={{
                    padding: '14px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <div style={{ color: '#475569', fontSize: '10px', letterSpacing: '1px', marginBottom: '10px' }}>
                      ACTIVE MARKETPLACES
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {platforms.slice(0, 5).map((p, i) => (
                        <div key={i} style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          background: `${p.color}15`,
                          border: `1px solid ${p.color}30`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '16px',
                        }}>
                          {p.icon}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{
        padding: '50px 0',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '28px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${0.3 + i * 0.1}s`,
              }}>
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: '800', fontSize: '2rem',
                  color: stat.color, marginBottom: '8px',
                }}>
                  {stat.value}
                </div>
                <div style={{ color: '#64748B', fontSize: '13px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNBOXING WONDERS SECTION */}
      <section ref={unboxRef} style={{
        padding: '100px 0',
        background: 'radial-gradient(ellipse at 50% 50%, #1A0D2E 0%, #0B1C2D 70%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-100px', left: '-100px',
          width: '400px', height: '400px', borderRadius: '50%',
          border: '1px solid rgba(251,113,133,0.06)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '-50px', left: '-50px',
          width: '300px', height: '300px', borderRadius: '50%',
          border: '1px solid rgba(251,113,133,0.06)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-100px', right: '-100px',
          width: '500px', height: '500px', borderRadius: '50%',
          border: '1px solid rgba(167,139,250,0.05)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 2 }}>

          {/* Section label */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              opacity: unboxInView ? 1 : 0, transition: 'all 0.5s ease',
            }}>
              <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #FB7185, #A78BFA)' }} />
              <span style={{ color: '#FB7185', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>
                Brand Identity
              </span>
              <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #A78BFA, #FB7185)' }} />
            </div>
          </div>

          {/* Big brand headline */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: '800',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: '1.1', marginBottom: '16px',
              opacity: unboxInView ? 1 : 0,
              transform: unboxInView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s ease 0.1s',
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #FB7185, #A78BFA, #22D3EE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Unboxing Wonders
              </span>
            </h2>
            <p style={{
              color: '#64748B', fontSize: '1rem', maxWidth: '500px',
              margin: '0 auto', lineHeight: '1.8',
              opacity: unboxInView ? 1 : 0,
              transition: 'all 0.6s ease 0.25s',
            }}>
              Every product we sell is designed to create a moment —
              from the first click to the last layer of packaging.
              We don't just sell products. We deliver experiences.
            </p>
          </div>

          {/* 3 experience cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {[
              {
                icon: '🎁',
                title: 'Premium Packaging',
                desc: 'Every order ships in branded boxes designed for that perfect unboxing moment worth sharing.',
                color: '#FB7185',
                bg: 'rgba(251,113,133,0.06)',
              },
              {
                icon: '💌',
                title: 'Personal Touch',
                desc: 'Handwritten thank-you cards, surprise freebies, and loyalty rewards that make customers feel valued.',
                color: '#A78BFA',
                bg: 'rgba(167,139,250,0.06)',
              },
              {
                icon: '📸',
                title: 'Share-Worthy',
                desc: 'Products and packaging designed to be photographed, shared, and talked about on social media.',
                color: '#22D3EE',
                bg: 'rgba(34,211,238,0.06)',
              },
            ].map((card, i) => (
              <div key={i} style={{
                padding: '32px',
                borderRadius: '20px',
                background: card.bg,
                border: `1px solid ${card.color}20`,
                textAlign: 'center',
                opacity: unboxInView ? 1 : 0,
                transform: unboxInView ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.6s ease ${0.2 + i * 0.15}s`,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', bottom: '-30px', right: '-30px',
                  width: '100px', height: '100px', borderRadius: '50%',
                  background: `radial-gradient(circle, ${card.color}15 0%, transparent 70%)`,
                }} />
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{card.icon}</div>
                <h3 style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: '700',
                  fontSize: '16px', color: '#F8FAFC', marginBottom: '10px',
                }}>
                  {card.title}
                </h3>
                <p style={{ color: '#64748B', fontSize: '13px', lineHeight: '1.7' }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section ref={categoriesRef} style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px',
            opacity: categoriesInView ? 1 : 0, transition: 'all 0.5s ease',
          }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #FB7185, #A78BFA)' }} />
            <span style={{ color: '#FB7185', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Product Categories
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: '800',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            color: '#F8FAFC', marginBottom: '48px',
            opacity: categoriesInView ? 1 : 0,
            transform: categoriesInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            What We Sell
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
            {categories.map((cat, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredCat(i)}
                onMouseLeave={() => setHoveredCat(null)}
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  background: hoveredCat === i ? `${cat.color}10` : 'rgba(255,255,255,0.02)',
                  border: hoveredCat === i
                    ? `1px solid ${cat.color}40`
                    : '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', gap: '16px',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                  transform: hoveredCat === i
                    ? 'translateY(-4px)'
                    : categoriesInView ? 'translateY(0)' : 'translateY(20px)',
                  opacity: categoriesInView ? 1 : 0,
                  transitionDelay: categoriesInView ? `${i * 0.07}s` : '0s',
                }}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: `${cat.color}15`,
                  border: `1px solid ${cat.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', flexShrink: 0,
                  transition: 'all 0.3s ease',
                  boxShadow: hoveredCat === i ? `0 0 20px ${cat.color}30` : 'none',
                }}>
                  {cat.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: '700',
                    fontSize: '14px', color: '#F8FAFC', marginBottom: '4px',
                  }}>
                    {cat.label}
                  </div>
                  <div style={{ color: cat.color, fontSize: '11px', fontWeight: '500' }}>
                    {cat.count}
                  </div>
                </div>
                <div style={{
                  color: cat.color, fontSize: '18px',
                  opacity: hoveredCat === i ? 1 : 0,
                  transform: hoveredCat === i ? 'translateX(0)' : 'translateX(-8px)',
                  transition: 'all 0.3s ease',
                }}>
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section ref={platformsRef} style={{
        padding: '80px 0',
        background: 'radial-gradient(ellipse at 50% 0%, #1A0D2E 0%, #0B1C2D 70%)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px',
            opacity: platformsInView ? 1 : 0, transition: 'all 0.5s ease',
          }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #A78BFA, #22D3EE)' }} />
            <span style={{ color: '#A78BFA', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Where We Sell
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: '800',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            color: '#F8FAFC', marginBottom: '48px',
            opacity: platformsInView ? 1 : 0,
            transform: platformsInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            Multi-Platform Distribution
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '60px' }}>
            {platforms.map((platform, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredPlatform(i)}
                onMouseLeave={() => setHoveredPlatform(null)}
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  background: hoveredPlatform === i ? `${platform.color}08` : 'rgba(255,255,255,0.02)',
                  border: hoveredPlatform === i
                    ? `1px solid ${platform.color}35`
                    : '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', gap: '16px',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                  transform: hoveredPlatform === i ? 'translateY(-4px)' : platformsInView ? 'translateY(0)' : 'translateY(20px)',
                  opacity: platformsInView ? 1 : 0,
                  transitionDelay: platformsInView ? `${i * 0.08}s` : '0s',
                }}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: `${platform.color}15`,
                  border: `1px solid ${platform.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', flexShrink: 0,
                }}>
                  {platform.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: '700',
                    fontSize: '14px', color: '#F8FAFC', marginBottom: '4px',
                  }}>
                    {platform.name}
                  </div>
                  <span style={{
                    padding: '2px 10px', borderRadius: '100px',
                    background: platform.status === 'Live'
                      ? 'rgba(52,211,153,0.1)'
                      : platform.status === 'Active'
                        ? 'rgba(59,130,246,0.1)'
                        : 'rgba(245,158,11,0.1)',
                    border: `1px solid ${platform.status === 'Live' ? 'rgba(52,211,153,0.25)' : platform.status === 'Active' ? 'rgba(59,130,246,0.25)' : 'rgba(245,158,11,0.25)'}`,
                    color: platform.status === 'Live' ? '#34D399' : platform.status === 'Active' ? '#3B82F6' : '#F59E0B',
                    fontSize: '10px', fontWeight: '600',
                  }}>
                    ● {platform.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATIONS FLOW */}
      <section ref={stepsRef} style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px',
            opacity: stepsInView ? 1 : 0, transition: 'all 0.5s ease',
          }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #FB7185, #A78BFA)' }} />
            <span style={{ color: '#FB7185', fontSize: '12px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>
              How It Works
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: '800',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            color: '#F8FAFC', marginBottom: '48px',
            opacity: stepsInView ? 1 : 0,
            transform: stepsInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            From Source to Doorstep
          </h2>

          <div style={{ display: 'flex', gap: '0', position: 'relative' }}>

            {/* Connecting line */}
            <div style={{
              position: 'absolute',
              top: '36px', left: '36px', right: '36px',
              height: '2px',
              background: 'linear-gradient(90deg, #FB7185, #A78BFA, #22D3EE, #34D399, #F59E0B)',
              opacity: 0.2,
              zIndex: 0,
            }} />

            {steps.map((step, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '0 12px',
                  cursor: 'pointer',
                  opacity: stepsInView ? 1 : 0,
                  transform: stepsInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease ${i * 0.1}s`,
                  position: 'relative', zIndex: 1,
                }}
              >
                {/* Icon circle */}
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: activeStep === i ? `${step.color}20` : 'rgba(255,255,255,0.03)',
                  border: activeStep === i
                    ? `2px solid ${step.color}60`
                    : '2px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '28px', marginBottom: '16px',
                  transition: 'all 0.4s ease',
                  boxShadow: activeStep === i ? `0 0 24px ${step.color}30` : 'none',
                }}>
                  {step.icon}
                </div>

                <div style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: '700',
                  fontSize: '13px',
                  color: activeStep === i ? step.color : '#94A3B8',
                  marginBottom: '8px',
                  transition: 'color 0.3s ease',
                }}>
                  {step.title}
                </div>

                <div style={{
                  color: '#475569', fontSize: '12px',
                  lineHeight: '1.6',
                  maxHeight: activeStep === i ? '80px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease, opacity 0.3s ease',
                  opacity: activeStep === i ? 1 : 0,
                }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes floatDot {
          from { transform: translateY(0px) translateX(0px) rotate(0deg); }
          to { transform: translateY(-30px) translateX(15px) rotate(180deg); }
        }
      `}</style>
    </div>
  )
}