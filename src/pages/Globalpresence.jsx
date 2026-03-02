import { useRef, useState, useEffect } from "react";

const particles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  duration: Math.random() * 20 + 10,
  delay: Math.random() * 10,
  opacity: Math.random() * 0.4 + 0.08,
}));

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedCounter({ target, suffix = "", duration = 1800, inView }) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      setValue(Math.floor(eased * target));
      if (step >= steps) {
        setValue(target);
        clearInterval(timer);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return (
    <>
      {value}
      {suffix}
    </>
  );
}

// SVG viewBox 0 0 1000 500
// Mercator: lon -180→180 = x 0→1000 | lat 85→-60 = y 0→500
// India (77°E, 22°N):     x=714, y=216
// Saudi (46°E, 24°N):     x=628, y=210
// UAE   (55°E, 24°N):     x=653, y=210
// Bahrain (50°E, 26°N):   x=639, y=203

const NODES = {
  india: { x: 714, y: 216 },
  ksa: { x: 621, y: 213 },
  uae: { x: 650, y: 218 },
  bahrain: { x: 636, y: 205 },
};

const CONNECTIONS = [
  ["india", "ksa"],
  ["india", "uae"],
  ["ksa", "uae"],
  ["ksa", "bahrain"],
  ["uae", "bahrain"],
];

// Continent outlines as simple polygon paths within viewBox 0 0 1000 500
const CONTINENTS = [
  // North America
  "M55,70 L95,58 L150,52 L200,60 L230,80 L245,115 L240,155 L220,185 L195,205 L165,215 L140,230 L115,250 L95,235 L68,210 L48,180 L38,145 L42,110 Z",
  // South America
  "M185,245 L215,235 L245,255 L258,295 L252,345 L235,390 L210,415 L188,400 L172,360 L170,310 L178,270 Z",
  // Europe
  "M435,55 L478,48 L520,52 L545,68 L538,90 L510,108 L475,112 L445,105 L430,85 Z",
  // Africa
  "M438,118 L490,108 L535,118 L562,148 L568,202 L558,265 L535,318 L505,355 L472,365 L445,345 L425,295 L418,235 L425,172 L437,140 Z",
  // Arabian Peninsula (Middle East)
  "M552,158 L598,148 L645,153 L672,165 L682,188 L666,212 L638,228 L604,232 L572,220 L552,200 L546,178 Z",
  // Indian Subcontinent
  "M658,153 L722,158 L762,172 L778,198 L774,232 L748,268 L714,282 L688,272 L665,242 L655,205 L656,172 Z",
  // East/SE Asia
  "M752,75 L825,65 L888,75 L925,98 L932,132 L902,158 L848,168 L798,158 L755,140 L742,112 Z",
  "M762,195 L812,183 L845,198 L848,228 L822,242 L785,238 L762,218 Z",
  // Australia
  "M802,288 L865,272 L925,283 L952,310 L958,348 L932,378 L878,388 L825,378 L796,350 L788,314 Z",
  // Russia / North Asia
  "M488,28 L598,18 L752,22 L872,38 L942,58 L940,88 L878,95 L795,85 L698,78 L595,72 L495,68 L478,48 Z",
  // UK / Greenland / Iceland blobs
  "M395,45 L415,38 L425,50 L415,62 L400,58 Z",
  "M130,25 L175,18 L195,32 L185,52 L155,55 L132,42 Z",
];

const regions = [
  {
    id: "india",
    flag: "🇮🇳",
    name: "India",
    role: "Headquarters & Operations",
    color: "#3B82F6",
    verticals: ["Maven Business Services", "Maven AI Tech"],
    detail:
      "Our founding market. India is our primary operational base — home to our financial services vertical, AI product development, and group headquarters.",
    stats: [
      { label: "Verticals Active", value: "2" },
      { label: "Markets", value: "Domestic + Intl" },
    ],
  },
  {
    id: "ksa",
    flag: "🇸🇦",
    name: "Saudi Arabia",
    role: "AI Tech & Infrastructure",
    color: "#22D3EE",
    verticals: ["Maven AI Tech", "Maven Contractors"],
    detail:
      "Vision 2030 alignment drives our Saudi strategy. We are expanding AI SaaS products and infrastructure contracting into the Kingdom's rapidly growing digital economy.",
    stats: [
      { label: "Products Launching", value: "3" },
      { label: "Sector Focus", value: "AI + Build" },
    ],
  },
  {
    id: "uae",
    flag: "🇦🇪",
    name: "UAE",
    role: "Investment & E-Commerce",
    color: "#A78BFA",
    verticals: ["Maven E-Commerce", "Investment Activity"],
    detail:
      "Dubai serves as our Gulf investment hub. E-commerce operations and cross-border investment structures are being established to serve the wider GCC market.",
    stats: [
      { label: "Market Focus", value: "GCC" },
      { label: "Stage", value: "Expanding" },
    ],
  },
  {
    id: "bahrain",
    flag: "🇧🇭",
    name: "Bahrain",
    role: "Financial Gateway",
    color: "#F59E0B",
    verticals: ["Investment Activity"],
    detail:
      "Bahrain's progressive financial regulation and fintech ecosystem make it a key gateway for structuring regional investment activity across the Gulf.",
    stats: [
      { label: "Focus", value: "Fintech" },
      { label: "Role", value: "Gateway" },
    ],
  },
];

const globalStats = [
  { value: 4, suffix: "", label: "Markets Active", color: "#3B82F6" },
  { value: 4, suffix: "", label: "Business Verticals", color: "#22D3EE" },
  { value: 2026, suffix: "", label: "Gulf Expansion Year", color: "#A78BFA" },
  { value: 3, suffix: "+", label: "AI Products Launching", color: "#F59E0B" },
];

export default function GlobalPresence() {
  const [activeRegion, setActiveRegion] = useState("india");
  const [visible, setVisible] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [statsRef, statsInView] = useInView(0.2);
  const [mapRef, mapInView] = useInView(0.1);
  const [detailRef, detailInView] = useInView(0.1);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const active = regions.find((r) => r.id === activeRegion);

  return (
    <div
      style={{
        background: "var(--navy)",
        minHeight: "100vh",
        paddingTop: "100px",
        overflow: "hidden",
      }}
    >
      <style>{`
      @keyframes pingRing {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.15); opacity: 0.2; }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
        @keyframes floatP {
          from { transform: translateY(0) translateX(0); }
          to   { transform: translateY(-18px) translateX(8px); }
        }
        @keyframes pulseD {
          0%,100% { opacity:1; transform:scale(1); }
          50%     { opacity:.4; transform:scale(.75); }
        }
        @keyframes pingR {
          0%   { r:10; opacity:.65; }
          70%  { r:22; opacity:0; }
          100% { r:10; opacity:0; }
        }
        @keyframes dashAnim {
          to { stroke-dashoffset: -24; }
        }
        @keyframes orbGlow {
          0%,100% { opacity:.5; }
          50%     { opacity:.9; }
        }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background:
              p.id % 3 === 0
                ? "#3B82F6"
                : p.id % 3 === 1
                  ? "#22D3EE"
                  : "#A78BFA",
            opacity: p.opacity,
            animation: `floatP ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 70% 30%,rgba(26,86,219,.10) 0%,transparent 60%),radial-gradient(ellipse at 20% 80%,rgba(13,148,136,.07) 0%,transparent 50%)",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(59,130,246,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.025) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{ padding: "60px 80px 72px", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "100px",
              background: "rgba(34,211,238,.08)",
              border: "1px solid rgba(34,211,238,.2)",
              marginBottom: "32px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all .6s ease .1s",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#22D3EE",
                animation: "pulseD 2s infinite",
              }}
            />
            <span
              style={{
                color: "#22D3EE",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "2px",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              GLOBAL PRESENCE · 4 MARKETS
            </span>
          </div>

          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.4rem,5vw,4rem)",
              fontWeight: "800",
              color: "#F8FAFC",
              lineHeight: "1.1",
              marginBottom: "12px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all .7s ease .2s",
            }}
          >
            One Group.
          </h1>

          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.4rem,5vw,4rem)",
              fontWeight: "800",
              lineHeight: "1.1",
              marginBottom: "28px",
              background: "linear-gradient(135deg,#3B82F6,#22D3EE,#A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all .7s ease .35s",
            }}
          >
            Four Markets.
          </h1>

          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "18px",
              color: "#94A3B8",
              lineHeight: "1.8",
              maxWidth: "520px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all .7s ease .5s",
            }}
          >
            From South Asia to the Gulf — TMG operates where opportunity meets
            discipline. Technology and people working across borders.
          </p>
        </div>
      </section>

      {/* ── COUNTERS ─────────────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        style={{ padding: "0 80px 80px", position: "relative", zIndex: 1 }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
          }}
        >
          {globalStats.map((s, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,.03)",
                border: `1px solid ${s.color}22`,
                borderRadius: "20px",
                padding: "36px 28px",
                position: "relative",
                overflow: "hidden",
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? "translateY(0)" : "translateY(32px)",
                transition: `all .7s ease ${i * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = s.color + "55";
                e.currentTarget.style.background = s.color + "0D";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = s.color + "22";
                e.currentTarget.style.background = "rgba(255,255,255,.03)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle,${s.color}22 0%,transparent 70%)`,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "clamp(28px,3vw,40px)",
                  fontWeight: "800",
                  color: s.color,
                  marginBottom: "10px",
                  lineHeight: "1",
                  filter: `drop-shadow(0 0 12px ${s.color}50)`,
                }}
              >
                <AnimatedCounter
                  target={s.value}
                  suffix={s.suffix}
                  inView={statsInView}
                />
              </div>
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "13px",
                  color: "#64748B",
                  fontWeight: "500",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MAP + DETAIL ─────────────────────────────────────────────────── */}
      {/* ── WHERE WE OPERATE ─────────────────────────────────────────────── */}
      <section
        ref={mapRef}
        style={{ padding: "0 80px 100px", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "48px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "2px",
                background: "linear-gradient(90deg,#3B82F6,#22D3EE)",
              }}
            />
            <span
              style={{
                color: "#22D3EE",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Where We Operate
            </span>
          </div>

          {/* Region selector tabs */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "40px",
              flexWrap: "wrap",
            }}
          >
            {regions.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRegion(r.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 20px",
                  borderRadius: "100px",
                  border: `1px solid ${activeRegion === r.id ? r.color + "66" : "rgba(255,255,255,.08)"}`,
                  background:
                    activeRegion === r.id ? r.color + "15" : "transparent",
                  color: activeRegion === r.id ? r.color : "#64748B",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all .3s ease",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: activeRegion === r.id ? r.color : "#334155",
                    boxShadow:
                      activeRegion === r.id ? `0 0 8px ${r.color}` : "none",
                    transition: "all .3s ease",
                  }}
                />
                {r.flag} {r.name}
              </button>
            ))}
          </div>

          {/* Main layout — big card left + detail right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "32px",
              alignItems: "stretch",
            }}
          >
            {/* LEFT — Visual region card */}
            <div
              key={active.id}
              style={{
                borderRadius: "24px",
                background: `linear-gradient(135deg, ${active.color}10 0%, rgba(255,255,255,.02) 100%)`,
                border: `1px solid ${active.color}25`,
                padding: "48px 40px",
                position: "relative",
                overflow: "hidden",
                animation: "slideUp .4s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "400px",
              }}
            >
              {/* Background glow */}
              <div
                style={{
                  position: "absolute",
                  top: "-60px",
                  right: "-60px",
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${active.color}18 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />
              {/* Grid pattern */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `linear-gradient(${active.color}08 1px, transparent 1px), linear-gradient(90deg, ${active.color}08 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                  pointerEvents: "none",
                }}
              />
              {/* Animated pulse ring */}
              <div
                style={{
                  position: "absolute",
                  bottom: "32px",
                  right: "32px",
                  width: "80px",
                  height: "80px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    border: `2px solid ${active.color}30`,
                    animation: "pingRing 2s ease-in-out infinite",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: "12px",
                    borderRadius: "50%",
                    border: `1px solid ${active.color}50`,
                    animation: "pingRing 2s .5s ease-in-out infinite",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: "24px",
                    borderRadius: "50%",
                    background: `${active.color}30`,
                    border: `1px solid ${active.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                  }}
                >
                  {active.flag}
                </div>
              </div>

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Flag + name */}
                <div style={{ fontSize: "56px", marginBottom: "20px" }}>
                  {active.flag}
                </div>
                <h2
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: "800",
                    fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                    color: "#F8FAFC",
                    lineHeight: "1.1",
                    marginBottom: "8px",
                  }}
                >
                  {active.name}
                </h2>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    borderRadius: "100px",
                    background: `${active.color}15`,
                    border: `1px solid ${active.color}30`,
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: active.color,
                      animation: "pulseD 2s infinite",
                    }}
                  />
                  <span
                    style={{
                      color: active.color,
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      fontFamily: "DM Sans, sans-serif",
                    }}
                  >
                    {active.role}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "15px",
                    color: "#94A3B8",
                    lineHeight: "1.8",
                    maxWidth: "380px",
                  }}
                >
                  {active.detail}
                </p>
              </div>

              {/* Stats row at bottom */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginTop: "32px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {active.stats.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(0,0,0,.25)",
                      border: `1px solid ${active.color}20`,
                      borderRadius: "12px",
                      padding: "16px 18px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: "800",
                        fontSize: "1.2rem",
                        color: active.color,
                        marginBottom: "4px",
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "11px",
                        color: "#64748B",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — All 4 region mini cards stacked */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {regions.map((region, i) => (
                <div
                  key={region.id}
                  onClick={() => setActiveRegion(region.id)}
                  style={{
                    padding: "22px 24px",
                    borderRadius: "16px",
                    background:
                      activeRegion === region.id
                        ? `${region.color}10`
                        : "rgba(255,255,255,.02)",
                    border: `1px solid ${activeRegion === region.id ? region.color + "40" : "rgba(255,255,255,.06)"}`,
                    cursor: "pointer",
                    transition: "all .3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    transform:
                      activeRegion === region.id
                        ? "translateX(6px)"
                        : "translateX(0)",
                    opacity: mapInView ? 1 : 0,
                    animationDelay: `${i * 0.1}s`,
                  }}
                  onMouseEnter={(e) => {
                    if (activeRegion !== region.id) {
                      e.currentTarget.style.background = `${region.color}08`;
                      e.currentTarget.style.borderColor = `${region.color}30`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeRegion !== region.id) {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,.02)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,.06)";
                    }
                  }}
                >
                  {/* Flag icon */}
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "14px",
                      background: `${region.color}15`,
                      border: `1px solid ${region.color}25`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "26px",
                      flexShrink: 0,
                      boxShadow:
                        activeRegion === region.id
                          ? `0 0 20px ${region.color}30`
                          : "none",
                      transition: "all .3s ease",
                    }}
                  >
                    {region.flag}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: "700",
                        fontSize: "15px",
                        color: "#F8FAFC",
                        marginBottom: "4px",
                      }}
                    >
                      {region.name}
                    </div>
                    <div
                      style={{
                        color: "#64748B",
                        fontSize: "12px",
                        fontFamily: "DM Sans, sans-serif",
                        marginBottom: "8px",
                      }}
                    >
                      {region.role}
                    </div>
                    {/* Vertical tags */}
                    <div
                      style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}
                    >
                      {region.verticals.map((v, j) => (
                        <span
                          key={j}
                          style={{
                            padding: "2px 8px",
                            borderRadius: "100px",
                            background: `${region.color}12`,
                            border: `1px solid ${region.color}25`,
                            color: region.color,
                            fontSize: "10px",
                            fontWeight: "600",
                            fontFamily: "DM Sans, sans-serif",
                          }}
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Active indicator */}
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background:
                        activeRegion === region.id
                          ? region.color
                          : "rgba(255,255,255,.1)",
                      boxShadow:
                        activeRegion === region.id
                          ? `0 0 10px ${region.color}`
                          : "none",
                      transition: "all .3s ease",
                      flexShrink: 0,
                    }}
                  />
                </div>
              ))}

              {/* Connection visual */}
              <div
                style={{
                  marginTop: "8px",
                  padding: "20px 24px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,.02)",
                  border: "1px solid rgba(255,255,255,.05)",
                }}
              >
                <div
                  style={{
                    color: "#475569",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    marginBottom: "14px",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  CROSS-BORDER CONNECTIONS
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  {regions.map((r, i) => (
                    <div
                      key={r.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          padding: "4px 10px",
                          borderRadius: "100px",
                          background: `${r.color}10`,
                          border: `1px solid ${r.color}25`,
                          color: r.color,
                          fontSize: "11px",
                          fontWeight: "600",
                          fontFamily: "DM Sans, sans-serif",
                        }}
                      >
                        {r.flag} {r.name}
                      </div>
                      {i < regions.length - 1 && (
                        <div
                          style={{
                            width: "20px",
                            height: "1px",
                            background:
                              "linear-gradient(90deg, #3B82F6, #22D3EE)",
                            opacity: 0.4,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MATRIX ───────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 80px 120px",
          background: "rgba(255,255,255,.015)",
          borderTop: "1px solid rgba(255,255,255,.05)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "48px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "2px",
                background: "linear-gradient(90deg,#3B82F6,#22D3EE)",
              }}
            />
            <span
              style={{
                color: "#22D3EE",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Vertical × Market Matrix
            </span>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0",
            }}
          >
            <thead>
              <tr>
                <th style={{ ...thStyle, textAlign: "left" }}>Vertical</th>
                {regions.map((r) => (
                  <th key={r.id} style={{ ...thStyle, color: r.color }}>
                    {r.flag} {r.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Business Services",
                  color: "#3B82F6",
                  presence: [true, false, false, false],
                },
                {
                  name: "AI Tech",
                  color: "#22D3EE",
                  presence: [true, true, false, false],
                },
                {
                  name: "Contractors",
                  color: "#A78BFA",
                  presence: [false, true, false, false],
                },
                {
                  name: "E-Commerce",
                  color: "#F59E0B",
                  presence: [true, false, true, false],
                },
              ].map((row, ri) => (
                <tr key={ri}>
                  <td
                    style={{
                      ...tdStyle,
                      fontFamily: "Syne, sans-serif",
                      fontWeight: "700",
                      color: row.color,
                      fontSize: "14px",
                      borderLeft: `3px solid ${row.color}44`,
                    }}
                  >
                    {row.name}
                  </td>
                  {row.presence.map((on, ci) => (
                    <td key={ci} style={{ ...tdStyle, textAlign: "center" }}>
                      {on ? (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: row.color + "18",
                            border: `1px solid ${row.color}44`,
                          }}
                        >
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: row.color,
                              boxShadow: `0 0 8px ${row.color}`,
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "inline-block",
                            width: "16px",
                            height: "1px",
                            background: "rgba(255,255,255,.1)",
                          }}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

const thStyle = {
  fontFamily: "DM Sans, sans-serif",
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: "#64748B",
  padding: "16px 20px",
  borderBottom: "1px solid rgba(255,255,255,.06)",
};
const tdStyle = {
  fontFamily: "DM Sans, sans-serif",
  fontSize: "14px",
  color: "#94A3B8",
  padding: "18px 20px",
  borderBottom: "1px solid rgba(255,255,255,.04)",
};
