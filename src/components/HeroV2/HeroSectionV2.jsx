import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import Counter from "./Counter";

const CELL   = 72;
const RIPPLE = 340;

const HeroSectionV2 = () => {
  const spotRef    = useRef(null);
  const rafRef     = useRef(null);
  const mouseRef   = useRef({ x: -9999, y: -9999 });
  const cellsRef   = useRef([]);        // array of cell DOM nodes
  const nCurRef    = useRef(null);      // lerped n values per cell
  const [gridDims, setGridDims] = useState({ cols: 0, rows: 0 });

  // Parallax
  const { scrollY } = useScroll();
  const contentY    = useTransform(scrollY, [0, 600], [0, -65]);
  const gridOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  // Compute grid dimensions on resize
  useEffect(() => {
    const resize = () => setGridDims({
      cols: Math.ceil(window.innerWidth  / CELL) + 2,
      rows: Math.ceil(window.innerHeight / CELL) + 2,
    });
    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Single RAF loop — lerps per-cell n, writes CSS transforms directly to DOM
  // No React state updates, no Framer subscriptions per cell → stays smooth
  useEffect(() => {
    if (gridDims.cols === 0) return;
    const total = gridDims.cols * gridDims.rows;
    nCurRef.current = new Float32Array(total);

    const tick = () => {
      const { x: mx, y: my } = mouseRef.current;
      const nArr = nCurRef.current;

      cellsRef.current.forEach((el, i) => {
        if (!el) return;
        // getBoundingClientRect is fine here — we only do it when mouse is near
        const rect = el.getBoundingClientRect();
        const cx = rect.left + CELL / 2;
        const cy = rect.top  + CELL / 2;
        const dist = Math.hypot(mx - cx, my - cy);
        const target = dist > RIPPLE ? 0 : Math.pow(1 - dist / RIPPLE, 2.2);

        // Lerp for smooth spring-like approach without useSpring overhead
        nArr[i] += (target - nArr[i]) * 0.11;
        const n = nArr[i];

        if (n < 0.003) {
          // Only reset if it was non-zero (avoid thrashing unchanged cells)
          if (nArr[i] > 0.001) {
            el.style.transform   = "";
            el.style.borderColor = "rgba(255,255,255,0.022)";
            el.style.background  = "transparent";
          }
          return;
        }

        // 3D pop identical to the original GridCell effect
        const dxN = (mx - cx) / RIPPLE;
        const dyN = (my - cy) / RIPPLE;
        const tz  = n * 120;
        const rx  = dyN * n * -40;
        const ry  = dxN * n *  40;

        el.style.transform   = `translateZ(${tz.toFixed(1)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
        el.style.borderColor = `rgba(${Math.round(n*40)},${Math.round(130+n*120)},${Math.round(210+n*45)},${(0.022+n*0.55).toFixed(3)})`;
        el.style.background  = `rgba(0,200,255,${(n*0.045).toFixed(4)})`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gridDims]);

  // Mouse handlers — only write to refs, zero re-renders
  const onMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    if (spotRef.current)
      spotRef.current.style.transform = `translate(${e.clientX - 500}px,${e.clientY - 500}px)`;
  }, []);
  const onMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  const total = gridDims.cols * gridDims.rows;

  const stats = [
    // { val: 3,   suffix: "+ yrs", label: "Running"    },
    // { val: 120, suffix: "+",     label: "Members"    },
    // { val: 40,  suffix: "+",     label: "Projects"   },
    // { val: 8,   suffix: "×",     label: "Hackathons" },
  ];

  return (
    <div
      id="home"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position:"relative", width:"100%", minHeight:"100svh",
        background:"#03040a", overflow:"hidden",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        perspective:"1200px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;700&family=Bebas+Neue&display=swap');
        @keyframes pulse-ring { 0%{transform:scale(.85);opacity:.8} 60%,100%{transform:scale(1.2);opacity:0} }
        @keyframes float      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes scanline   { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes sb         { 0%,100%{transform:translateY(0);opacity:.5} 50%{transform:translateY(7px);opacity:1} }
        @media(max-width:480px){ .sdiv{display:none!important} }
      `}</style>

      {/* ── 3D GRID ── DOM cells, single RAF writes transforms directly ──── */}
      {total > 0 && (
        <motion.div
          style={{
            position:"absolute", top:"-24px", left:"-24px",
            width:`${gridDims.cols * CELL}px`,
            height:`${gridDims.rows * CELL}px`,
            display:"grid",
            gridTemplateColumns:`repeat(${gridDims.cols}, ${CELL}px)`,
            gridTemplateRows:`repeat(${gridDims.rows}, ${CELL}px)`,
            transformStyle:"preserve-3d",
            pointerEvents:"none", zIndex:0,
            opacity: gridOpacity,
          }}
        >
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              ref={el => { cellsRef.current[i] = el; }}
              style={{
                borderRight: ".5px solid rgba(255,255,255,0.022)",
                borderBottom:".5px solid rgba(255,255,255,0.022)",
                transformStyle:"preserve-3d",
                transformOrigin:"center center",
                willChange:"transform, border-color, background",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* ── SPOTLIGHT ── plain CSS transform, no Framer overhead ─────────── */}
      <div
        ref={spotRef}
        style={{
          position:"absolute", width:1000, height:1000,
          background:"radial-gradient(circle,rgba(0,170,255,.10) 0%,rgba(0,90,255,.04) 38%,transparent 62%)",
          pointerEvents:"none", zIndex:2, willChange:"transform",
        }}
      />

      {/* Vignette */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:3,
        background:"radial-gradient(ellipse 88% 78% at 50% 50%,transparent 12%,#03040a 100%)" }} />

      {/* Bottom glow */}
      <div style={{ position:"absolute", bottom:-100, left:"50%", transform:"translateX(-50%)",
        width:"65%", height:300,
        background:"radial-gradient(ellipse,rgba(0,120,255,.06) 0%,transparent 70%)",
        pointerEvents:"none", zIndex:2 }} />

      {/* Scanline */}
      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:4, opacity:.018 }}>
        <div style={{
          position:"absolute", left:0, right:0, height:3,
          background:"linear-gradient(90deg,transparent,rgba(0,215,255,.7),rgba(255,255,255,.9),rgba(0,215,255,.7),transparent)",
          animation:"scanline 10s linear infinite",
        }} />
      </div>

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          y: contentY,
          position:"relative", zIndex:10, textAlign:"center",
          padding:"clamp(5rem,10vh,7rem) clamp(1.2rem,5vw,4rem) 0",
          maxWidth:1020, width:"100%",
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.2, duration:.55, ease:[.16,1,.3,1] }}
          style={{ marginBottom:"clamp(1.2rem,3vw,2.2rem)", animation:"float 6s ease-in-out infinite" }}
        >
          <div style={{
            display:"inline-flex", alignItems:"center", gap:9,
            padding:"6px 16px 6px 12px",
            border:".5px solid rgba(0,210,255,.28)", borderRadius:999,
            background:"rgba(0,210,255,.05)", backdropFilter:"blur(12px)",
          }}>
            <span style={{ position:"relative", display:"inline-flex", width:8, height:8 }}>
              <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#00d2ff", animation:"pulse-ring 2s ease-out infinite" }} />
              <span style={{ width:8, height:8, borderRadius:"50%", background:"#00d2ff", display:"block" }} />
            </span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".65rem", letterSpacing:".2em", textTransform:"uppercase", color:"rgba(0,210,255,.88)" }}>
              SLIET · Est. 2021
            </span>
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:.4, duration:.55 }}
          style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(.56rem,1.1vw,.7rem)",
            letterSpacing:".3em", textTransform:"uppercase", color:"rgba(255,255,255,.42)",
            marginBottom:"clamp(.8rem,2vw,1.4rem)" }}
        >
          SLIET Software Development Club
        </motion.p>

        {/* WE BUILD */}
        <motion.div
          initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.52, duration:.85, ease:[.16,1,.3,1] }}
          style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(2.8rem,11vw,10.5rem)",
            lineHeight:.88, letterSpacing:"-0.01em",
            background:"linear-gradient(175deg,rgba(255,255,255,.95),rgba(255,255,255,.38))",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            userSelect:"none",
          }}
        >
          WE BUILD
        </motion.div>

        {/* SSDC */}
        <motion.div
          initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.7, duration:.85, ease:[.16,1,.3,1] }}
          style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(3rem,13vw,13rem)",
            lineHeight:.95, letterSpacing:".05em",
            color:"#00d2ff",
            textShadow:"0 0 70px rgba(0,210,255,.18),0 0 140px rgba(0,170,255,.08)",
            userSelect:"none",
          }}
        >
          SSDC
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.95, duration:.75 }}
          style={{
            fontFamily:"'DM Sans',sans-serif", fontWeight:300,
            fontSize:"clamp(.84rem,1.6vw,1rem)", lineHeight:1.72,
            color:"rgba(255,255,255,.36)", maxWidth:"min(540px,90vw)",
            margin:"clamp(1rem,2.5vw,1.8rem) auto 0",
          }}
        >
          The premier coding collective at SLIET — engineering real software,{" "}
          <span style={{ color:"rgba(255,255,255,.72)", fontWeight:500 }}>open-sourcing everything</span>
          , and shipping products that actually matter.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX:0, opacity:0 }} animate={{ scaleX:1, opacity:1 }}
          transition={{ delay:1.15, duration:.85, ease:[.16,1,.3,1] }}
          style={{
            width:"100%", maxWidth:400, height:".5px",
            margin:"clamp(1.6rem,3.5vw,2.6rem) auto",
            background:"linear-gradient(90deg,transparent,rgba(0,210,255,.36),rgba(255,255,255,.08),rgba(0,210,255,.36),transparent)",
            transformOrigin:"center",
          }}
        />

        {/* Stats */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:1.35, duration:.65 }}
          style={{ display:"flex", justifyContent:"center", alignItems:"center",
            gap:"clamp(.8rem,3vw,3rem)", rowGap:"1rem", flexWrap:"wrap" }}
        >
          {stats.map((s, i) => (
            <>
              <div key={`s${i}`} style={{ textAlign:"center" }}>
                <div style={{
                  fontFamily:"'JetBrains Mono',monospace", fontWeight:700,
                  fontSize:"clamp(1.1rem,2.4vw,1.9rem)",
                  background:"linear-gradient(160deg,#fff 30%,rgba(255,255,255,.42))",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                  lineHeight:1,
                }}>
                  <Counter value={s.val} suffix={s.suffix} delay={1500 + i * 100} />
                </div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".57rem",
                  letterSpacing:".22em", textTransform:"uppercase",
                  color:"rgba(255,255,255,.28)", marginTop:4 }}>
                  {s.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div key={`d${i}`} className="sdiv" style={{ width:1, height:26,
                  background:"linear-gradient(180deg,transparent,rgba(255,255,255,.1),transparent)", flexShrink:0 }} />
              )}
            </>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:1.9, duration:1 }}
          style={{ marginTop:"clamp(2.8rem,6vw,4.5rem)", display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}
        >
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".52rem", letterSpacing:".28em", textTransform:"uppercase", color:"rgba(255,255,255,.13)" }}>scroll</span>
          {[0,1].map(n => (
            <svg key={n} width="12" height="7" viewBox="0 0 12 7" fill="none"
              style={{ animation:`sb 1.9s ease-in-out ${n*.2}s infinite`, opacity:1-n*.45 }}>
              <path d="M1 1L6 6L11 1" stroke="rgba(0,210,255,.5)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSectionV2;
