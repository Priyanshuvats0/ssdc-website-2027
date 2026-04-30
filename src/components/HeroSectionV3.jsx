import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

const CELL   = 72;
const RIPPLE = 340;

// ─── COUNTER ──────────────────────────────────────────────────────────────────
const Counter = ({ value, suffix = "", delay = 0 }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const s = performance.now();
      const tick = (now) => {
        const p = Math.min((now - s) / 1800, 1);
        setN(Math.round((1 - Math.pow(2, -10 * p)) * value));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return <>{n}{suffix}</>;
};

// ─── LIGHTNING SYSTEM ─────────────────────────────────────────────────────────
//
// Left side  — 3 traces (primary + 2 satellites), symmetric mirror on right
// Each trace has:
//   • Base hairline (always visible, 8-14% opacity)
//   • Draw-in (stroke-dashoffset, staggered)
//   • Double pulse (two 30px dashes chasing each other)
//   • Arc flash (random full-path brightness spike via CSS animation)
// Corner brackets: top-left + top-right + bottom-left + bottom-right
//   each with engineering tick marks
//
const LightningSystem = () => {
  const [drawn, setDrawn] = useState(false);
  const [flash, setFlash] = useState({ L1: false, R1: false });

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 1300);
    return () => clearTimeout(t);
  }, []);

  // Arc flash — fires randomly on primary traces
  useEffect(() => {
    if (!drawn) return;
    const scheduleFlash = (side) => {
      const delay = 4000 + Math.random() * 5000;
      return setTimeout(() => {
        setFlash(f => ({ ...f, [side]: true }));
        setTimeout(() => setFlash(f => ({ ...f, [side]: false })), 90);
        scheduleFlash(side); // reschedule
      }, delay);
    };
    const tL = scheduleFlash("L1");
    const tR = setTimeout(() => scheduleFlash("R1"), 2200);
    return () => { clearTimeout(tL); clearTimeout(tR); };
  }, [drawn]);

  // ── PATH DEFINITIONS ────────────────────────────────────────────────────────
  // All paths are in a 480×700 viewBox
  // Left side: traces go top→bottom with rightward lean (electricity falling diagonally)
  // Right side: exact horizontal mirror (480 - x)

  // LEFT PRIMARY — main jagged trace, most prominent
  const LP = "M 60 0 L 120 80 L 140 80 L 240 230 L 220 230 L 320 410 L 310 450 L 380 560 L 370 620";
  const LPL = 920;

  // LEFT SATELLITE A — thinner, slightly left-offset, fewer jogs
  const LA = "M 20 40 L 75 140 L 55 140 L 140 300 L 160 340 L 100 460 L 120 520";
  const LAL = 720;

  // LEFT SATELLITE B — rightmost, closest to center, minimal jogs
  const LB = "M 110 0 L 180 110 L 200 150 L 280 280 L 340 380 L 360 440";
  const LBL = 620;

  // RIGHT SIDE = mirror (x → 480 - x, same y)
  const RP  = "M 420 0 L 360 80 L 340 80 L 240 230 L 260 230 L 160 410 L 170 450 L 100 560 L 110 620";
  const RAp = "M 460 40 L 405 140 L 425 140 L 340 300 L 320 340 L 380 460 L 360 520";
  const RBp = "M 370 0 L 300 110 L 280 150 L 200 280 L 140 380 L 120 440";

  return (
    <>
      <style>{`
        /* ── DRAW-IN TRANSITIONS (applied via inline style) ── */

        /* ── DOUBLE PULSE: two 28px dashes, second offset by 60px ── */
        @keyframes pulseL-a {
          0%   { stroke-dashoffset:${LPL+36}; opacity:0 }
          5%   { opacity:1 }
          95%  { opacity:1 }
          100% { stroke-dashoffset:-36; opacity:0 }
        }
        @keyframes pulseL-b {
          0%   { stroke-dashoffset:${LPL+96}; opacity:0 }
          8%   { opacity:.7 }
          92%  { opacity:.7 }
          100% { stroke-dashoffset:-36; opacity:0 }
        }
        @keyframes pulseR-a {
          0%   { stroke-dashoffset:${LPL+36}; opacity:0 }
          5%   { opacity:1 }
          95%  { opacity:1 }
          100% { stroke-dashoffset:-36; opacity:0 }
        }
        @keyframes pulseR-b {
          0%   { stroke-dashoffset:${LPL+96}; opacity:0 }
          8%   { opacity:.7 }
          92%  { opacity:.7 }
          100% { stroke-dashoffset:-36; opacity:0 }
        }
        /* Satellite pulses — slower, dimmer */
        @keyframes pulseSA-L {
          0%   { stroke-dashoffset:${LAL+30}; opacity:0 }
          10%  { opacity:.55 }
          90%  { opacity:.55 }
          100% { stroke-dashoffset:-30; opacity:0 }
        }
        @keyframes pulseSA-R {
          0%   { stroke-dashoffset:${LAL+30}; opacity:0 }
          10%  { opacity:.55 }
          90%  { opacity:.55 }
          100% { stroke-dashoffset:-30; opacity:0 }
        }
        @keyframes pulseSB-L {
          0%   { stroke-dashoffset:${LBL+30}; opacity:0 }
          10%  { opacity:.45 }
          90%  { opacity:.45 }
          100% { stroke-dashoffset:-30; opacity:0 }
        }
        @keyframes pulseSB-R {
          0%   { stroke-dashoffset:${LBL+30}; opacity:0 }
          10%  { opacity:.45 }
          90%  { opacity:.45 }
          100% { stroke-dashoffset:-30; opacity:0 }
        }

        /* Node dot pulse */
        @keyframes node { 0%,100%{opacity:.4} 50%{opacity:.9} }

        /* Engineering tick fade-in */
        @keyframes tick-in { from{opacity:0} to{opacity:1} }

        /* Hide all on mobile */
        @media(max-width:640px){ .ls-wrap{display:none!important} }
      `}</style>

      {/* ════════════════════════════════════════════════════════════
          LEFT SIDE  — primary + 2 satellites
          One tall SVG covers the full left column
      ════════════════════════════════════════════════════════════ */}
      <div className="ls-wrap" style={{
        position:"absolute", top:0, left:0,
        width:"clamp(200px, 34vw, 500px)",
        height:"100%",
        pointerEvents:"none", zIndex:5, overflow:"hidden",
      }}>
        <svg viewBox="0 0 480 700" preserveAspectRatio="xMinYMin meet"
          style={{ width:"100%", height:"100%", overflow:"visible" }}>

          {/* ── SATELLITE B (rightmost, thinnest) ── */}
          <path d={LB} fill="none" stroke="rgba(0,210,255,0.07)" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d={LB} fill="none" stroke="rgba(0,210,255,0.28)" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={LBL} strokeDashoffset={drawn ? 0 : LBL}
            style={{ transition: drawn ? `stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s` : "none" }}
          />
          {drawn && <path d={LB} fill="none" stroke="rgba(0,220,255,0.75)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="28 9999"
            style={{ filter:"drop-shadow(0 0 3px rgba(0,210,255,0.8))", animation:"pulseSB-L 2.6s ease-in-out 4.5s infinite" }}
          />}

          {/* ── SATELLITE A (left offset, medium) ── */}
          <path d={LA} fill="none" stroke="rgba(0,210,255,0.09)" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round"/>
          <path d={LA} fill="none" stroke="rgba(0,210,255,0.32)" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={LAL} strokeDashoffset={drawn ? 0 : LAL}
            style={{ transition: drawn ? `stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1) 0.25s` : "none" }}
          />
          {drawn && <path d={LA} fill="none" stroke="rgba(0,220,255,0.78)" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="28 9999"
            style={{ filter:"drop-shadow(0 0 4px rgba(0,210,255,0.85))", animation:"pulseSA-L 2.4s ease-in-out 3.1s infinite" }}
          />}

          {/* ── PRIMARY (thickest, brightest) ── */}
          <path d={LP} fill="none" stroke="rgba(0,210,255,0.11)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Arc flash overlay */}
          {flash.L1 && <path d={LP} fill="none" stroke="rgba(160,240,255,0.65)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
            style={{ filter:"drop-shadow(0 0 8px rgba(0,210,255,1))" }}
          />}
          <path d={LP} fill="none" stroke="rgba(0,210,255,0.45)" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={LPL} strokeDashoffset={drawn ? 0 : LPL}
            style={{ transition: drawn ? `stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1)` : "none" }}
          />
          {/* Double pulse — leading dash */}
          {drawn && <path d={LP} fill="none" stroke="rgba(0,230,255,0.95)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="30 9999"
            style={{ filter:"drop-shadow(0 0 6px rgba(0,210,255,1))", animation:"pulseL-a 2s ease-in-out 2s infinite" }}
          />}
          {/* Double pulse — trailing dash */}
          {drawn && <path d={LP} fill="none" stroke="rgba(0,220,255,0.6)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="20 9999"
            style={{ filter:"drop-shadow(0 0 4px rgba(0,210,255,0.7))", animation:"pulseL-b 2s ease-in-out 2s infinite" }}
          />}

          {/* ── NODES at jog corners ── */}
          {drawn && <>
            <circle cx="140" cy="80"  r="2.2" fill="rgba(0,210,255,0.65)" style={{ animation:"node 3s ease-in-out 0.5s infinite" }}/>
            <circle cx="220" cy="230" r="2.4" fill="rgba(0,210,255,0.7)"  style={{ animation:"node 3.2s ease-in-out 1.1s infinite" }}/>
            <circle cx="310" cy="450" r="2.0" fill="rgba(0,210,255,0.55)" style={{ animation:"node 2.8s ease-in-out 0.8s infinite" }}/>
            {/* Satellite nodes */}
            <circle cx="55"  cy="140" r="1.6" fill="rgba(0,210,255,0.45)" style={{ animation:"node 3.5s ease-in-out 1.4s infinite" }}/>
            <circle cx="200" cy="150" r="1.6" fill="rgba(0,210,255,0.4)"  style={{ animation:"node 3.8s ease-in-out 2s infinite" }}/>
          </>}
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════════════
          RIGHT SIDE — perfect mirror
      ════════════════════════════════════════════════════════════ */}
      <div className="ls-wrap" style={{
        position:"absolute", top:0, right:0,
        width:"clamp(200px, 34vw, 500px)",
        height:"100%",
        pointerEvents:"none", zIndex:5, overflow:"hidden",
      }}>
        <svg viewBox="0 0 480 700" preserveAspectRatio="xMaxYMin meet"
          style={{ width:"100%", height:"100%", overflow:"visible" }}>

          {/* SATELLITE B */}
          <path d={RBp} fill="none" stroke="rgba(0,210,255,0.07)" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d={RBp} fill="none" stroke="rgba(0,210,255,0.28)" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={LBL} strokeDashoffset={drawn ? 0 : LBL}
            style={{ transition: drawn ? `stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1) 0.55s` : "none" }}
          />
          {drawn && <path d={RBp} fill="none" stroke="rgba(0,220,255,0.75)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="28 9999"
            style={{ filter:"drop-shadow(0 0 3px rgba(0,210,255,0.8))", animation:"pulseSB-R 2.6s ease-in-out 5.2s infinite" }}
          />}

          {/* SATELLITE A */}
          <path d={RAp} fill="none" stroke="rgba(0,210,255,0.09)" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round"/>
          <path d={RAp} fill="none" stroke="rgba(0,210,255,0.32)" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={LAL} strokeDashoffset={drawn ? 0 : LAL}
            style={{ transition: drawn ? `stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s` : "none" }}
          />
          {drawn && <path d={RAp} fill="none" stroke="rgba(0,220,255,0.78)" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="28 9999"
            style={{ filter:"drop-shadow(0 0 4px rgba(0,210,255,0.85))", animation:"pulseSA-R 2.4s ease-in-out 3.8s infinite" }}
          />}

          {/* PRIMARY */}
          <path d={RP} fill="none" stroke="rgba(0,210,255,0.11)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
          {flash.R1 && <path d={RP} fill="none" stroke="rgba(160,240,255,0.65)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
            style={{ filter:"drop-shadow(0 0 8px rgba(0,210,255,1))" }}
          />}
          <path d={RP} fill="none" stroke="rgba(0,210,255,0.45)" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={LPL} strokeDashoffset={drawn ? 0 : LPL}
            style={{ transition: drawn ? `stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1) 0.12s` : "none" }}
          />
          {drawn && <path d={RP} fill="none" stroke="rgba(0,230,255,0.95)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="30 9999"
            style={{ filter:"drop-shadow(0 0 6px rgba(0,210,255,1))", animation:"pulseR-a 2s ease-in-out 2.6s infinite" }}
          />}
          {drawn && <path d={RP} fill="none" stroke="rgba(0,220,255,0.6)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="20 9999"
            style={{ filter:"drop-shadow(0 0 4px rgba(0,210,255,0.7))", animation:"pulseR-b 2s ease-in-out 2.6s infinite" }}
          />}

          {/* NODES */}
          {drawn && <>
            <circle cx="340" cy="80"  r="2.2" fill="rgba(0,210,255,0.65)" style={{ animation:"node 3s ease-in-out 0.7s infinite" }}/>
            <circle cx="260" cy="230" r="2.4" fill="rgba(0,210,255,0.7)"  style={{ animation:"node 3.2s ease-in-out 1.3s infinite" }}/>
            <circle cx="170" cy="450" r="2.0" fill="rgba(0,210,255,0.55)" style={{ animation:"node 2.8s ease-in-out 1s infinite" }}/>
            <circle cx="425" cy="140" r="1.6" fill="rgba(0,210,255,0.45)" style={{ animation:"node 3.5s ease-in-out 1.6s infinite" }}/>
            <circle cx="280" cy="150" r="1.6" fill="rgba(0,210,255,0.4)"  style={{ animation:"node 3.8s ease-in-out 2.2s infinite" }}/>
          </>}
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════════════
          CORNER BRACKETS — all four corners, with tick marks
      ════════════════════════════════════════════════════════════ */}
      {[
        // [corner, top, left, right, bottom, path, tickPath]
        { id:"tl", style:{ top:18, left:18 },  path:"M 0 56 L 0 0 L 56 0",  tick:"M 0 28 L 6 28" },
        { id:"tr", style:{ top:18, right:18 },  path:"M 0 0 L 56 0 L 56 56", tick:"M 56 28 L 50 28" },
        { id:"bl", style:{ bottom:18, left:18  }, path:"M 56 56 L 0 56 L 0 0", tick:"M 0 28 L 6 28" },
        { id:"br", style:{ bottom:18, right:18 }, path:"M 0 56 L 56 56 L 56 0", tick:"M 56 28 L 50 28" },
      ].map(({ id, style, path, tick }) => (
        <svg key={id} className="ls-wrap" viewBox="0 0 56 56"
          style={{
            position:"absolute", width:52, height:52,
            pointerEvents:"none", zIndex:5, overflow:"visible",
            ...style,
          }}
        >
          {/* Base */}
          <path d={path} fill="none" stroke="rgba(0,210,255,0.1)" strokeWidth="0.6" strokeLinecap="square"/>
          {/* Draw-in */}
          <path d={path} fill="none" stroke="rgba(0,210,255,0.32)" strokeWidth="0.7" strokeLinecap="square"
            strokeDasharray="200" strokeDashoffset={drawn ? 0 : 200}
            style={{ transition: drawn ? "stroke-dashoffset 0.7s cubic-bezier(0.16,1,0.3,1) 1.2s" : "none" }}
          />
          {/* Engineering tick mark */}
          {drawn && (
            <path d={tick} fill="none" stroke="rgba(0,210,255,0.28)" strokeWidth="0.6" strokeLinecap="round"
              style={{ animation:"tick-in 0.4s ease 1.8s both" }}
            />
          )}
          {/* Corner node */}
          {drawn && (
            <circle
              cx={id.includes("l") ? 0 : 56}
              cy={id.includes("t") ? 0 : 56}
              r="1.8" fill="rgba(0,210,255,0.5)"
              style={{ animation:`node ${3 + Math.random()}s ease-in-out ${Math.random()}s infinite` }}
            />
          )}
        </svg>
      ))}
    </>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const HeroSectionV3 = () => {
  const spotRef  = useRef(null);
  const rafRef   = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const cellsRef = useRef([]);
  const nCurRef  = useRef(null);
  const [gridDims, setGridDims] = useState({ cols: 0, rows: 0 });

  const { scrollY } = useScroll();
  const contentY    = useTransform(scrollY, [0, 600], [0, -65]);
  const gridOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  useEffect(() => {
    const resize = () => setGridDims({
      cols: Math.ceil(window.innerWidth  / CELL) + 2,
      rows: Math.ceil(window.innerHeight / CELL) + 2,
    });
    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (gridDims.cols === 0) return;
    const total = gridDims.cols * gridDims.rows;
    nCurRef.current = new Float32Array(total);

    const tick = () => {
      const { x: mx, y: my } = mouseRef.current;
      const nArr = nCurRef.current;
      cellsRef.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + CELL / 2;
        const cy = rect.top  + CELL / 2;
        const dist = Math.hypot(mx - cx, my - cy);
        const target = dist > RIPPLE ? 0 : Math.pow(1 - dist / RIPPLE, 2.2);
        nArr[i] += (target - nArr[i]) * 0.11;
        const n = nArr[i];
        if (n < 0.003) {
          if (nArr[i] > 0.001) {
            el.style.transform   = "";
            el.style.borderColor = "rgba(255,255,255,0.022)";
            el.style.background  = "transparent";
          }
          return;
        }
        const dxN = (mx - cx) / RIPPLE;
        const dyN = (my - cy) / RIPPLE;
        el.style.transform   = `translateZ(${(n*120).toFixed(1)}px) rotateX(${(dyN*n*-40).toFixed(2)}deg) rotateY(${(dxN*n*40).toFixed(2)}deg)`;
        el.style.borderColor = `rgba(${Math.round(n*40)},${Math.round(130+n*120)},${Math.round(210+n*45)},${(0.022+n*0.55).toFixed(3)})`;
        el.style.background  = `rgba(0,200,255,${(n*0.045).toFixed(4)})`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gridDims]);

  const onMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    if (spotRef.current)
      spotRef.current.style.transform = `translate(${e.clientX - 500}px,${e.clientY - 500}px)`;
  }, []);
  const onMouseLeave = useCallback(() => { mouseRef.current = { x: -9999, y: -9999 }; }, []);

  const total = gridDims.cols * gridDims.rows;
  const stats = [];

  return (
    <div id="home" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
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
        @keyframes tick-in    { from{opacity:0} to{opacity:1} }
        @media(max-width:480px){ .sdiv{display:none!important} }
      `}</style>

      {/* 3D GRID */}
      {total > 0 && (
        <motion.div style={{
          position:"absolute", top:"-24px", left:"-24px",
          width:`${gridDims.cols*CELL}px`, height:`${gridDims.rows*CELL}px`,
          display:"grid",
          gridTemplateColumns:`repeat(${gridDims.cols},${CELL}px)`,
          gridTemplateRows:`repeat(${gridDims.rows},${CELL}px)`,
          transformStyle:"preserve-3d", pointerEvents:"none", zIndex:0,
          opacity:gridOpacity,
        }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} ref={el => { cellsRef.current[i] = el; }}
              style={{
                borderRight:".5px solid rgba(255,255,255,0.022)",
                borderBottom:".5px solid rgba(255,255,255,0.022)",
                transformStyle:"preserve-3d", transformOrigin:"center center",
                willChange:"transform, border-color, background",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* SPOTLIGHT */}
      <div ref={spotRef} style={{
        position:"absolute", width:1000, height:1000,
        background:"radial-gradient(circle,rgba(0,170,255,.10) 0%,rgba(0,90,255,.04) 38%,transparent 62%)",
        pointerEvents:"none", zIndex:2, willChange:"transform",
      }} />

      {/* LIGHTNING SYSTEM */}
      <LightningSystem />

      {/* VIGNETTE */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:3,
        background:"radial-gradient(ellipse 88% 78% at 50% 50%,transparent 12%,#03040a 100%)" }} />

      {/* BOTTOM GLOW */}
      <div style={{ position:"absolute", bottom:-100, left:"50%", transform:"translateX(-50%)",
        width:"65%", height:300,
        background:"radial-gradient(ellipse,rgba(0,120,255,.06) 0%,transparent 70%)",
        pointerEvents:"none", zIndex:2 }} />

      {/* SCANLINE */}
      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:4, opacity:.018 }}>
        <div style={{
          position:"absolute", left:0, right:0, height:3,
          background:"linear-gradient(90deg,transparent,rgba(0,215,255,.7),rgba(255,255,255,.9),rgba(0,215,255,.7),transparent)",
          animation:"scanline 10s linear infinite",
        }} />
      </div>

      {/* CONTENT */}
      <motion.div style={{
        y:contentY, position:"relative", zIndex:10, textAlign:"center",
        padding:"clamp(5rem,10vh,7rem) clamp(1.2rem,5vw,4rem) 0",
        maxWidth:1020, width:"100%",
      }}>
        {/* Badge */}
        <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
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
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.4, duration:.55 }}
          style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(.56rem,1.1vw,.7rem)",
            letterSpacing:".3em", textTransform:"uppercase", color:"rgba(255,255,255,.42)",
            marginBottom:"clamp(.8rem,2vw,1.4rem)" }}
        >
          SLIET Software Development Club
        </motion.p>

        {/* WE BUILD */}
        <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.52, duration:.85, ease:[.16,1,.3,1] }}
          style={{
            fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2.8rem,11vw,10.5rem)",
            lineHeight:.88, letterSpacing:"-0.01em",
            background:"linear-gradient(175deg,rgba(255,255,255,.95),rgba(255,255,255,.38))",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            userSelect:"none",
          }}
        >WE BUILD</motion.div>

        {/* SSDC */}
        <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.7, duration:.85, ease:[.16,1,.3,1] }}
          style={{
            fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,13vw,13rem)",
            lineHeight:.95, letterSpacing:".05em", color:"#00d2ff",
            textShadow:"0 0 70px rgba(0,210,255,.18),0 0 140px rgba(0,170,255,.08)",
            userSelect:"none",
          }}
        >SSDC</motion.div>

        {/* Subheadline */}
        <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
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
        <motion.div initial={{ scaleX:0, opacity:0 }} animate={{ scaleX:1, opacity:1 }}
          transition={{ delay:1.15, duration:.85, ease:[.16,1,.3,1] }}
          style={{
            width:"100%", maxWidth:400, height:".5px",
            margin:"clamp(1.6rem,3.5vw,2.6rem) auto",
            background:"linear-gradient(90deg,transparent,rgba(0,210,255,.36),rgba(255,255,255,.08),rgba(0,210,255,.36),transparent)",
            transformOrigin:"center",
          }}
        />

        {/* Scroll hint */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.9, duration:1 }}
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

export default HeroSectionV3;