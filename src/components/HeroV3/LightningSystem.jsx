import { useState, useEffect } from "react";

// ─── CYBER CAPSULE SYSTEM (Inspired by geometric tech aesthetic) ───────
//
// Features:
//   • Diagonal layout (45 degrees down-right on left, down-left on right)
//   • Glowing thick pill capsules (rounded strokecaps)
//   • Dashed utility lines
//   • Hexagonal/diagonal dot matrices
//   • Arc flash (random full brightness spikes)
//

// Dot Grid Component
const DotGrid = ({ cx, cy, rows, cols, spacing, angle, fill }) => {
  const dots = [];
  for(let r=0; r<rows; r++) {
    for(let c=0; c<cols; c++) {
      dots.push(<circle key={`${r}-${c}`} cx={c*spacing} cy={r*spacing} r="1.5" fill={fill} />);
    }
  }
  return (
    <g transform={`translate(${cx}, ${cy}) rotate(${angle})`}>
      {dots}
    </g>
  )
}

const LightningSystem = () => {
  const [drawn, setDrawn] = useState(false);
  const [flash, setFlash] = useState({ L1: false, R1: false });

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 1300);
    return () => clearTimeout(t);
  }, []);

  // Arc flash — fires randomly to illuminate the tech capsules
  useEffect(() => {
    if (!drawn) return;
    const scheduleFlash = (side) => {
      const delay = 3000 + Math.random() * 4000;
      return setTimeout(() => {
        setFlash(f => ({ ...f, [side]: true }));
        setTimeout(() => setFlash(f => ({ ...f, [side]: false })), 120);
        scheduleFlash(side);
      }, delay);
    };
    const tL = scheduleFlash("L1");
    const tR = setTimeout(() => scheduleFlash("R1"), 1800);
    return () => { clearTimeout(tL); clearTimeout(tR); };
  }, [drawn]);

  // Define geometric elements for the LEFT side
  // The right side will reuse these via a `<g transform="scale(-1, 1) translate(-480, 0)">` wrapper to perfectly mirror!
  
  const pills = [
    { id: 1, x1: -40, y1: 80,  x2: 140, y2: 260, w: 26, op: 0.55, delay: 0 },
    { id: 2, x1: 80,  y1: -20, x2: 220, y2: 120, w: 16, op: 0.3,  delay: 0.2 },
    { id: 3, x1: -30, y1: 340, x2: 160, y2: 530, w: 34, op: 0.65, delay: 0.4 },
    { id: 4, x1: 170, y1: 240, x2: 310, y2: 380, w: 14, op: 0.4, delay: 0.1 },
    { id: 5, x1: 100, y1: 520, x2: 280, y2: 700, w: 22, op: 0.45, delay: 0.5 },
    { id: 6, x1: -10, y1: 650, x2: 110, y2: 770, w: 28, op: 0.5,  delay: 0.3 },
    { id: 7, x1: 270, y1: 420, x2: 390, y2: 540, w: 12, op: 0.25, delay: 0.6 },
  ];

  const dashes = [
    { id: 1, x1: 40,  y1: 200, x2: 280, y2: 440, w: 3.5, dash: "12 12", op: 0.3 },
    { id: 2, x1: 140, y1: 60,  x2: 340, y2: 260, w: 2,   dash: "6 14",  op: 0.25 },
    { id: 3, x1: -10, y1: 460, x2: 200, y2: 670, w: 4,   dash: "20 15", op: 0.35 },
    { id: 4, x1: 210, y1: 540, x2: 350, y2: 680, w: 2.5, dash: "8 8",   op: 0.25 },
  ];

  const lines = [
    { id: 1, x1: -20, y1: 150, x2: 270, y2: 440, w: 1.5, op: 0.15 },
    { id: 2, x1: 160, y1: -10, x2: 370, y2: 200, w: 2,   op: 0.15 },
    { id: 3, x1: 30,  y1: 360, x2: 320, y2: 650, w: 1,   op: 0.2 },
  ];

  const grids = [
    { id: 1, cx: 180, cy: 90,  rows: 4, cols: 9, spacing: 14, angle: 45, op: 0.15 },
    { id: 2, cx: 60,  cy: 310, rows: 6, cols: 5, spacing: 16, angle: 45, op: 0.2 },
    { id: 3, cx: 250, cy: 460, rows: 3, cols: 7, spacing: 12, angle: 45, op: 0.12 },
  ];

  // Base colors
  const baseColor = "0, 210, 255";
  const brightColor = "160, 255, 255";

  // Reusable render function for a side
  const renderSide = (isRight) => {
    const flashActive = isRight ? flash.R1 : flash.L1;

    return (
      <svg viewBox="0 0 480 700" preserveAspectRatio={isRight ? "xMaxYSlice" : "xMinYSlice"}
        style={{ width:"100%", height:"100%", overflow:"visible" }}>
        
        {/* Mirror everything if it's the right side */}
        <g transform={isRight ? "scale(-1, 1) translate(-480, 0)" : "none"}>
          
          {/* Dot Grids */}
          {drawn && grids.map(g => (
            <g key={`grid-${g.id}`} style={{ opacity: flashActive ? 0.8 : g.op, transition: "opacity 0.15s ease", animation: `tick-in 1s ease ${isRight ? 1.2 : 0.8}s both` }}>
              <DotGrid cx={g.cx} cy={g.cy} rows={g.rows} cols={g.cols} spacing={g.spacing} angle={g.angle} fill={`rgba(${baseColor}, 1)`} />
            </g>
          ))}

          {/* Thin Lines */}
          {lines.map(l => {
            const len = Math.hypot(l.x2 - l.x1, l.y2 - l.y1);
            return (
              <line key={`line-${l.id}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke={`rgba(${baseColor}, ${l.op})`} strokeWidth={l.w} strokeLinecap="round"
                strokeDasharray={len} strokeDashoffset={drawn ? 0 : len}
                style={{ transition: drawn ? `stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1) ${isRight ? 0.3 : 0}s` : "none" }}
              />
            )
          })}

          {/* Dashed Lines */}
          {drawn && dashes.map(d => (
            <line key={`dash-${d.id}`} x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2}
              stroke={`rgba(${flashActive ? brightColor : baseColor}, ${flashActive ? 0.9 : d.op})`} 
              strokeWidth={d.w} strokeLinecap="round" strokeDasharray={d.dash}
              style={{ transition: "stroke 0.1s, opacity 0.1s", animation: `tick-in 0.8s ease ${isRight ? 1.0 : 0.6}s both` }}
            />
          ))}

          {/* Thick Glowing Capsules (Pills) */}
          {pills.map(p => {
            const len = Math.hypot(p.x2 - p.x1, p.y2 - p.y1);
            const color = flashActive ? brightColor : baseColor;
            const op = flashActive ? 1 : p.op;
            const glow = flashActive ? 12 : 4;
            return (
              <g key={`pill-${p.id}`}>
                {/* Glow layer */}
                {drawn && (
                  <line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
                    stroke={`rgba(${color}, ${op * 0.4})`} strokeWidth={p.w + glow} strokeLinecap="round"
                    style={{ transition: "stroke 0.1s", animation: `tick-in 0.5s ease ${p.delay + (isRight ? 0.5 : 0)}s both`, filter: "blur(4px)" }}
                  />
                )}
                {/* Main capsule */}
                <line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
                  stroke={`rgba(${color}, ${op})`} strokeWidth={p.w} strokeLinecap="round"
                  strokeDasharray={len} strokeDashoffset={drawn ? 0 : len}
                  style={{ transition: drawn ? `stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1) ${p.delay + (isRight ? 0.2 : 0)}s, stroke 0.1s` : "none" }}
                />
              </g>
            )
          })}

        </g>
      </svg>
    );
  };

  // Custom render for mobile portrait screens (Bespoke HUD design)
  const renderMobile = () => {
    return (
      <svg viewBox="0 0 400 800" preserveAspectRatio="xMidYMin slice" style={{ width: "100%", height: "100%", overflow: "visible" }}>
        {drawn && (
          <g style={{ animation: "tick-in 1s ease 0.5s both" }}>
            {/* Faint center radar rings */}
            <circle cx="200" cy="350" r="160" fill="none" stroke={`rgba(${baseColor}, 0.15)`} strokeWidth="1" strokeDasharray="4 12"
              style={{ animation: "spin 40s linear infinite", transformOrigin: "200px 350px" }} />
            <circle cx="200" cy="350" r="120" fill="none" stroke={`rgba(${baseColor}, 0.05)`} strokeWidth="20" />
            <circle cx="200" cy="350" r="180" fill="none" stroke={`rgba(${brightColor}, 0.1)`} strokeWidth="1" strokeDasharray="40 100"
              style={{ animation: "spin 25s linear infinite reverse", transformOrigin: "200px 350px" }} />
            
            {/* Top framing bracket */}
            <path d="M -20 80 L 100 80 L 120 100 L 280 100 L 300 80 L 420 80" fill="none" stroke={`rgba(${baseColor}, 0.4)`} strokeWidth="1.5" />
            <path d="M 120 100 L 280 100" fill="none" stroke={`rgba(${brightColor}, 0.7)`} strokeWidth="3" filter="blur(3px)" />
            
            {/* Bottom framing bracket */}
            <path d="M -20 620 L 80 620 L 100 600 L 300 600 L 320 620 L 420 620" fill="none" stroke={`rgba(${baseColor}, 0.4)`} strokeWidth="1.5" />
            <path d="M 100 600 L 300 600" fill="none" stroke={`rgba(${brightColor}, 0.7)`} strokeWidth="3" filter="blur(3px)" />

            {/* Glowing tech pills */}
            <line x1="160" y1="60" x2="240" y2="60" stroke={`rgba(${brightColor}, 0.9)`} strokeWidth="4" strokeLinecap="round" />
            <line x1="180" y1="640" x2="220" y2="640" stroke={`rgba(${brightColor}, 0.9)`} strokeWidth="4" strokeLinecap="round" />
            
            {/* Radar Crosshairs */}
            <line x1="200" y1="175" x2="200" y2="200" stroke={`rgba(${baseColor}, 0.6)`} strokeWidth="2" strokeLinecap="round" />
            <line x1="200" y1="500" x2="200" y2="525" stroke={`rgba(${baseColor}, 0.6)`} strokeWidth="2" strokeLinecap="round" />
            <line x1="25" y1="350" x2="50" y2="350" stroke={`rgba(${baseColor}, 0.6)`} strokeWidth="2" strokeLinecap="round" />
            <line x1="350" y1="350" x2="375" y2="350" stroke={`rgba(${baseColor}, 0.6)`} strokeWidth="2" strokeLinecap="round" />
            
            {/* Corner nodes */}
            <circle cx="20" cy="80" r="3" fill={`rgba(${brightColor}, 0.9)`} />
            <circle cx="380" cy="80" r="3" fill={`rgba(${brightColor}, 0.9)`} />
            <circle cx="20" cy="620" r="3" fill={`rgba(${brightColor}, 0.9)`} />
            <circle cx="380" cy="620" r="3" fill={`rgba(${brightColor}, 0.9)`} />
          </g>
        )}
      </svg>
    );
  };

  return (
    <>
      <style>{`
        /* Engineering tick fade-in */
        @keyframes tick-in { from{opacity:0} to{opacity:1} }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        /* Mobile vs Desktop Toggle */
        @media(max-width:768px){ 
          .ls-wrap-desktop { display: none !important; }
          .ls-wrap-mobile { display: block !important; }
        }
        @media(min-width:769px){
          .ls-wrap-mobile { display: none !important; }
        }
      `}</style>

      {/* --- DESKTOP GRAPHICS --- */}
      {/* LEFT SIDE */}
      <div className="ls-wrap-desktop" style={{
        position:"absolute", top:0, left:0,
        width:"clamp(200px, 34vw, 500px)",
        height:"135vh",
        pointerEvents:"none", zIndex:5, overflow:"hidden",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 74%)",
        maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 74%)"
      }}>
        {renderSide(false)}
      </div>

      {/* RIGHT SIDE */}
      <div className="ls-wrap-desktop" style={{
        position:"absolute", top:0, right:0,
        width:"clamp(200px, 34vw, 500px)",
        height:"135vh",
        pointerEvents:"none", zIndex:5, overflow:"hidden",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 74%)",
        maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 74%)"
      }}>
        {renderSide(true)}
      </div>

      {/* --- MOBILE GRAPHICS --- */}
      <div className="ls-wrap-mobile" style={{
        position:"absolute", top:0, left:0, right:0,
        height:"115vh",
        pointerEvents:"none", zIndex:2, overflow:"hidden",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)"
      }}>
        {renderMobile()}
      </div>

    </>
  );
};

export default LightningSystem;
