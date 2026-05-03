import { useState, useEffect } from "react";

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

export default LightningSystem;
