import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useSpring, useTransform, animate, useMotionValue } from "framer-motion";

// ─── KINETIC GRID CELL (preserved + enhanced) ───────────────────────────────
const GridCell = ({ mouseX, mouseY, radius = 340 }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePos = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }
    };
    setTimeout(updatePos, 50);
    window.addEventListener("resize", updatePos);
    return () => window.removeEventListener("resize", updatePos);
  }, []);

  const z = useTransform(() => {
    if (!pos.x && !pos.y) return 0;
    const dist = Math.hypot(mouseX.get() - pos.x, mouseY.get() - pos.y);
    if (dist > radius) return 0;
    return Math.pow(1 - dist / radius, 2) * 160;
  });

  const rotateX = useTransform(() => {
    if (!pos.x && !pos.y) return 0;
    const dy = mouseY.get() - pos.y;
    const dist = Math.hypot(mouseX.get() - pos.x, dy);
    if (dist > radius) return 0;
    return (dy / radius) * (1 - dist / radius) * -48;
  });

  const rotateY = useTransform(() => {
    if (!pos.x && !pos.y) return 0;
    const dx = mouseX.get() - pos.x;
    const dist = Math.hypot(dx, mouseY.get() - pos.y);
    if (dist > radius) return 0;
    return (dx / radius) * (1 - dist / radius) * 48;
  });

  const borderColor = useTransform(() => {
    if (!pos.x && !pos.y) return "rgba(255,255,255,0.025)";
    const dist = Math.hypot(mouseX.get() - pos.x, mouseY.get() - pos.y);
    if (dist > radius) return "rgba(255,255,255,0.025)";
    const n = 1 - dist / radius;
    // Shifts from cold blue at edges to hot cyan at center
    const r = Math.round(n * 56);
    const g = Math.round(120 + n * 135);
    const b = Math.round(200 + n * 55);
    return `rgba(${r},${g},${b},${0.025 + n * 0.65})`;
  });

  const backgroundColor = useTransform(() => {
    if (!pos.x && !pos.y) return "rgba(0,0,0,0)";
    const dist = Math.hypot(mouseX.get() - pos.x, mouseY.get() - pos.y);
    if (dist > radius) return "rgba(0,0,0,0)";
    const n = 1 - dist / radius;
    return `rgba(0, 210, 255, ${n * 0.055})`;
  });

  return (
    <motion.div
      ref={ref}
      className="border-b border-r will-change-transform"
      style={{
        z, rotateX, rotateY, borderColor, backgroundColor,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
    />
  );
};

// ─── GLITCH TEXT ─────────────────────────────────────────────────────────────
const GlitchChar = ({ char, delay }) => {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  const [display, setDisplay] = useState("_");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 10;
    const startDelay = delay;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (frame < totalFrames) {
          setDisplay(CHARS[Math.floor(Math.random() * CHARS.length)]);
          frame++;
        } else {
          setDisplay(char);
          setDone(true);
          clearInterval(interval);
        }
      }, 40);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [char, delay]);

  return (
    <span
      style={{
        display: "inline-block",
        color: done ? "inherit" : "rgba(0,220,255,0.9)",
        textShadow: done ? "none" : "0 0 12px rgba(0,220,255,0.8)",
        transition: "color 0.15s, text-shadow 0.15s",
      }}
    >
      {display}
    </span>
  );
};

const GlitchText = ({ text, startDelay = 0 }) => {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  return (
    <>
      {text.split("").map((char, i) =>
        started ? (
          <GlitchChar key={i} char={char} delay={i * 55} />
        ) : (
          <span key={i} style={{ opacity: 0 }}>{char}</span>
        )
      )}
    </>
  );
};

// ─── COUNTER ─────────────────────────────────────────────────────────────────
const Counter = ({ value, suffix = "", delay = 0 }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now();
      const dur = 1800;
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / dur, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.floor(eased * value));
        if (progress < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return <span>{display}{suffix}</span>;
};

// ─── MAIN HERO ────────────────────────────────────────────────────────────────
const HeroSectionV3 = () => {
  const mouseX = useSpring(-2000, { stiffness: 50, damping: 22 });
  const mouseY = useSpring(-2000, { stiffness: 50, damping: 22 });
  const [gridSize, setGridSize] = useState({ columns: 0, rows: 0 });
  const [cursorBlink, setCursorBlink] = useState(true);
  const squareSize = 62;

  useEffect(() => {
    const calc = () => {
      setGridSize({
        columns: Math.ceil(window.innerWidth / squareSize) + 2,
        rows: Math.ceil(window.innerHeight / squareSize) + 2,
      });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursorBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-2000);
    mouseY.set(-2000);
  }, [mouseX, mouseY]);

  const totalCells = gridSize.columns * gridSize.rows || 0;
  const cells = Array.from({ length: totalCells });

  // Spotlight follows mouse
  const spotX = useTransform(mouseX, v => v - 600);
  const spotY = useTransform(mouseY, v => v - 600);
  const spotOpacity = useTransform(mouseX, v => (v < -1000 ? 0 : 1));

  const stats = [
    { val: 3, suffix: "+ yrs", label: "Running" },
    { val: 120, suffix: "+", label: "Members" },
    { val: 40, suffix: "+", label: "Projects" },
    { val: 8, suffix: "×", label: "Hackathons" },
  ];

  return (
    <div
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        background: "#020305",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1400px",
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      }}
    >
      {/* ── IMPORT FONTS ───────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&family=Bebas+Neue&display=swap');

        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.9); opacity: 0.7; }
          70%  { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(1.15); opacity: 0; }
        }
        @keyframes float-badge {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .stat-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          font-weight: 700;
          background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.55) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-top: 2px;
        }
        .cta-primary:hover {
          box-shadow: 0 0 0 1px rgba(0,210,255,0.5), 0 0 30px rgba(0,180,255,0.25), 0 0 60px rgba(0,150,255,0.1);
          transform: translateY(-2px);
        }
        .cta-secondary:hover {
          background: rgba(255,255,255,0.06);
          transform: translateY(-2px);
        }
      `}</style>

      {/* ── KINETIC GRID ───────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize.columns}, ${squareSize}px)`,
          gridTemplateRows: `repeat(${gridSize.rows}, ${squareSize}px)`,
          transformStyle: "preserve-3d",
          transform: "translate(-20px, -20px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {cells.map((_, i) => (
          <GridCell key={i} mouseX={mouseX} mouseY={mouseY} radius={360} />
        ))}
      </div>

      {/* ── AURORA SPOTLIGHT ───────────────────────────────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          width: 1200,
          height: 1200,
          x: spotX,
          y: spotY,
          opacity: spotOpacity,
          background: "radial-gradient(circle, rgba(0,180,255,0.09) 0%, rgba(0,100,255,0.04) 35%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── DEEP VIGNETTE ──────────────────────────────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
        background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, #020305 100%)",
      }} />

      {/* ── SCAN LINE EFFECT ───────────────────────────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3,
        overflow: "hidden", opacity: 0.025,
      }}>
        <div style={{
          position: "absolute", left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(0,220,255,0.8), transparent)",
          animation: "scanline 6s linear infinite",
        }} />
      </div>

      {/* ── FLOATING BADGE ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        style={{
          position: "relative", zIndex: 10,
          marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          animation: "float-badge 4s ease-in-out infinite",
        }}
      >
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "6px 16px",
          border: "0.5px solid rgba(0,210,255,0.3)",
          borderRadius: "999px",
          background: "rgba(0,210,255,0.05)",
          backdropFilter: "blur(12px)",
        }}>
          {/* Pulse dot */}
          <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
            <span style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "#00d2ff",
              animation: "pulse-ring 1.8s ease-out infinite",
            }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00d2ff", display: "block" }} />
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(0,210,255,0.9)",
          }}>
            SLIET · Est. 2021
          </span>
        </div>
      </motion.div>

      {/* ── MAIN CONTENT ───────────────────────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 10,
        textAlign: "center",
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
        maxWidth: "1000px",
        pointerEvents: "none",
      }}>

        {/* ── EYEBROW ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(0.65rem, 1.2vw, 0.75rem)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "clamp(1rem, 2.5vw, 1.8rem)",
          }}
        >
          {'<'} Software Systems Development Club {'>'}
        </motion.p>

        {/* ── HEADLINE ── */}
        <h1 style={{
          margin: 0,
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
        }}>
          {/* Line 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(4rem, 12vw, 10rem)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "block",
            }}
          >
            WE BUILD
          </motion.div>

          {/* Line 2 — glitch reveal SSDC */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.3 }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(4.5rem, 14vw, 12rem)",
              display: "block",
              color: "#00d2ff",
              textShadow: "0 0 60px rgba(0,210,255,0.25), 0 0 120px rgba(0,180,255,0.1)",
              lineHeight: 1,
              letterSpacing: "0.04em",
            }}
          >
            <GlitchText text="SSDC" startDelay={1100} />
            <span style={{
              display: "inline-block",
              width: "0.08em", height: "0.85em",
              background: "#00d2ff",
              marginLeft: "0.06em",
              verticalAlign: "middle",
              opacity: cursorBlink ? 1 : 0,
              transition: "opacity 0.08s",
              boxShadow: "0 0 12px #00d2ff",
            }} />
          </motion.div>
        </h1>

        {/* ── SUBHEADLINE ── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.4)",
            maxWidth: "600px",
            margin: "clamp(1.5rem, 3vw, 2.5rem) auto 0",
            fontWeight: 400,
          }}
        >
          The premier coding collective at SLIET — engineering real software,{" "}
          <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
            open-sourcing everything
          </span>
          , and shipping products that actually matter.
        </motion.p>

        {/* ── DIVIDER LINE ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.9, duration: 0.8, ease: "easeOut" }}
          style={{
            width: "100%", maxWidth: 480,
            height: "0.5px",
            margin: "clamp(2rem, 4vw, 3rem) auto",
            background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.4), transparent)",
            transformOrigin: "center",
          }}
        />

        {/* ── STATS ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.7 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(2rem, 5vw, 4rem)",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div className="stat-num">
                <Counter value={s.val} suffix={s.suffix} delay={2200 + i * 150} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.7 }}
          style={{
            display: "flex",
            gap: "clamp(0.75rem, 2vw, 1.25rem)",
            justifyContent: "center",
            flexWrap: "wrap",
            pointerEvents: "auto",
          }}
        >
          <button
            className="cta-primary"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#020305",
              background: "linear-gradient(135deg, #00d2ff 0%, #0077ff 100%)",
              border: "none",
              borderRadius: "6px",
              padding: "14px 36px",
              cursor: "pointer",
              transition: "all 0.25s ease",
              boxShadow: "0 0 0 0 rgba(0,210,255,0)",
            }}
          >
            ./join --club
          </button>

          <button
            className="cta-secondary"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 400,
              color: "rgba(255,255,255,0.6)",
              background: "rgba(255,255,255,0.03)",
              border: "0.5px solid rgba(255,255,255,0.12)",
              borderRadius: "6px",
              padding: "14px 36px",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            cat projects.md
          </button>
        </motion.div>

        {/* ── SCROLL HINT ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}
        >
          <div style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
            }}>scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              style={{
                width: 1,
                height: 36,
                background: "linear-gradient(180deg, rgba(0,210,255,0.5), transparent)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSectionV3;