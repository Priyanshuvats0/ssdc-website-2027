import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

const IMAGES = [
  "/images/corousel/image1.png",
  "/images/corousel/image2.png",
  "/images/corousel/image3.png",
  "/images/corousel/image4.png",
  "/images/corousel/image5.png",
];

const TOTAL = IMAGES.length;
const AUTO_INTERVAL = 4000;

// wrap index circularly
const wrap = (i) => ((i % TOTAL) + TOTAL) % TOTAL;

// ─── HEADER ───────────────────────────────────────────────────────────────────
const Header = ({ active }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px", once: false });

  return (
    <div ref={ref} style={{ marginBottom: "clamp(2rem, 4vw, 3rem)", padding: "0 clamp(1.2rem,5vw,4rem)" }}>
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
        transition={{ duration: 0.5 }}
        style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.7rem" }}
      >
        <div style={{ width: 28, height: "0.5px", background: "rgba(0,210,255,0.5)" }} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase",
          color: "rgba(0,210,255,0.7)",
        }}>04 → GALLERY</span>
      </motion.div>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            lineHeight: 0.9, margin: 0,
            color: "rgba(255,255,255,0.92)",
          }}
        >
          Moments &<br /><span style={{ color: "#00d2ff" }}>Memories.</span>
        </motion.h2>

        {/* Big ghost counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            lineHeight: 1, letterSpacing: "0.05em",
            color: "rgba(255,255,255,0.06)",
            userSelect: "none",
          }}
        >
          {String(active + 1).padStart(2, "0")}
          <span style={{ fontSize: "55%", color: "rgba(255,255,255,0.04)" }}> / {String(TOTAL).padStart(2, "0")}</span>
        </motion.div>
      </div>
    </div>
  );
};

// ─── MAIN CAROUSEL ────────────────────────────────────────────────────────────
export default function CarouselV2() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const autoRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-5% 0px -5% 0px", once: false });

  // Section parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const sectionY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const goTo = useCallback((next) => {
    const n = wrap(next);
    setDirection(next >= active ? 1 : -1);
    setActive(n);
  }, [active]);

  const next = useCallback(() => {
    setDirection(1);
    setActive((p) => wrap(p + 1));
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((p) => wrap(p - 1));
  }, []);

  // Auto-advance
  const resetAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, AUTO_INTERVAL);
  }, [next]);

  useEffect(() => {
    resetAuto();
    return () => clearInterval(autoRef.current);
  }, [resetAuto]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") { next(); resetAuto(); }
      if (e.key === "ArrowLeft")  { prev(); resetAuto(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, resetAuto]);

  // Drag/swipe
  const dragRef = useRef({ startX: 0, dragging: false });

  const onDragEnd = (e, info) => {
    if (info.offset.x < -60)      { next(); resetAuto(); }
    else if (info.offset.x > 60)  { prev(); resetAuto(); }
  };

  // Build visible strip: prev, active, next (+ extras for smooth feel)
  // We show: [active-1, active, active+1] on desktop, just active on mobile
  const strip = [-2, -1, 0, 1, 2].map((offset) => ({
    index: wrap(active + offset),
    offset,
  }));

  // Slide animation variants
  const variants = {
    enter: (d) => ({
      x: d > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.88,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (d) => ({
      x: d > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.88,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      style={{
        background: "#03040a",
        color: "white",
        padding: "clamp(3rem, 8vw, 7rem) 0",
        borderBottom: "0.5px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;600;700&family=Bebas+Neue&display=swap');
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "55%", height: "50%",
        background: "radial-gradient(ellipse, rgba(0,80,255,0.045) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <motion.div style={{ y: sectionY }}>
        <Header active={active} />

        {/* ── MAIN STAGE ─────────────────────────────────────────────────── */}
        <div style={{ padding: "0 clamp(1.2rem, 5vw, 4rem)" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 2.4fr 1fr",
            gap: "clamp(8px, 1.5vw, 16px)",
            alignItems: "center",
          }}
          className="carousel-grid"
          >
            {/* PREV THUMBNAIL */}
            <motion.div
              key={`prev-${wrap(active - 1)}`}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => { prev(); resetAuto(); }}
              style={{
                borderRadius: 10,
                overflow: "hidden",
                cursor: "pointer",
                border: "0.5px solid rgba(255,255,255,0.07)",
                aspectRatio: "4/3",
                position: "relative",
              }}
              whileHover={{ scale: 1.03, borderColor: "rgba(0,210,255,0.3)" }}
              transition={{ duration: 0.25 }}
            >
              <img
                src={IMAGES[wrap(active - 1)]}
                alt="prev"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.35) saturate(0.6)",
                  transition: "filter 0.4s ease",
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(3,4,10,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "0.5px solid rgba(255,255,255,0.15)",
                  background: "rgba(0,0,0,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "1rem",
                }}>←</div>
              </div>
              <div style={{
                position: "absolute", bottom: 10, left: 10,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.55rem", letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.3)",
              }}>
                {String(wrap(active - 1) + 1).padStart(2, "0")}
              </div>
            </motion.div>

            {/* ACTIVE SLIDE */}
            <div style={{
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
              border: "0.5px solid rgba(0,210,255,0.3)",
              boxShadow: "0 0 0 1px rgba(0,210,255,0.08), 0 24px 64px rgba(0,0,0,0.7)",
              aspectRatio: "16/10",
            }}>
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.div
                  key={active}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={onDragEnd}
                  style={{
                    position: "absolute", inset: 0,
                    cursor: "grab",
                  }}
                  whileDrag={{ cursor: "grabbing" }}
                >
                  <img
                    src={IMAGES[active]}
                    alt={`slide-${active}`}
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover",
                      display: "block",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                    draggable={false}
                  />
                  {/* Bottom gradient + info */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(3,4,10,0.85) 0%, rgba(3,4,10,0.2) 45%, transparent 100%)",
                  }} />
                  <div style={{
                    position: "absolute", bottom: 20, left: 20, right: 20,
                    display: "flex", justifyContent: "space-between", alignItems: "flex-end",
                  }}>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.62rem", letterSpacing: "0.2em",
                      textTransform: "uppercase", color: "rgba(0,210,255,0.8)",
                    }}>
                      SSDC · SLIET
                    </div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.62rem", letterSpacing: "0.15em",
                      color: "rgba(255,255,255,0.4)",
                    }}>
                      {String(active + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Cyan accent bottom bar */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, #00d2ff, transparent)",
                zIndex: 10,
              }} />
            </div>

            {/* NEXT THUMBNAIL */}
            <motion.div
              key={`next-${wrap(active + 1)}`}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => { next(); resetAuto(); }}
              style={{
                borderRadius: 10,
                overflow: "hidden",
                cursor: "pointer",
                border: "0.5px solid rgba(255,255,255,0.07)",
                aspectRatio: "4/3",
                position: "relative",
              }}
              whileHover={{ scale: 1.03, borderColor: "rgba(0,210,255,0.3)" }}
              transition={{ duration: 0.25 }}
            >
              <img
                src={IMAGES[wrap(active + 1)]}
                alt="next"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.35) saturate(0.6)",
                  transition: "filter 0.4s ease",
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(3,4,10,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "0.5px solid rgba(255,255,255,0.15)",
                  background: "rgba(0,0,0,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "1rem",
                }}>→</div>
              </div>
              <div style={{
                position: "absolute", bottom: 10, left: 10,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.55rem", letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.3)",
              }}>
                {String(wrap(active + 1) + 1).padStart(2, "0")}
              </div>
            </motion.div>
          </div>

          {/* ── CONTROLS ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              marginTop: "clamp(1.2rem, 2.5vw, 2rem)",
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Dot indicators */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { goTo(i); resetAuto(); }}
                  style={{
                    width: i === active ? 28 : 6,
                    height: 6, borderRadius: 999,
                    background: i === active
                      ? "linear-gradient(90deg, #00d2ff, #0077ff)"
                      : "rgba(255,255,255,0.15)",
                    border: "none", cursor: "pointer", padding: 0,
                    transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease",
                  }}
                />
              ))}
            </div>

            {/* Progress + arrows */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem", letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.25)",
              }}>
                {String(active + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
              </span>

              {[{ d: -1, l: "←" }, { d: 1, l: "→" }].map(({ d, l }) => (
                <button
                  key={d}
                  onClick={() => { d === 1 ? next() : prev(); resetAuto(); }}
                  style={{
                    width: 38, height: 38, borderRadius: "50%",
                    border: "0.5px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.03)",
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "0.9rem", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.22s ease",
                  }}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, {
                      borderColor: "rgba(0,210,255,0.4)",
                      background: "rgba(0,210,255,0.08)",
                      color: "#00d2ff",
                      transform: "scale(1.08)",
                    });
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.currentTarget.style, {
                      borderColor: "rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.03)",
                      color: "rgba(255,255,255,0.55)",
                      transform: "scale(1)",
                    });
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 640px) {
          .carousel-grid {
            grid-template-columns: 0.5fr 1fr 0.5fr !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}