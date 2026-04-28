import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const moto = [
  { icon: "/vector/ThirdCard/learn.png",   title: "Learn",    num: "01", des: "Master modern technologies through hands-on projects and workshops built for real-world impact." },
  { icon: "/vector/ThirdCard/inovate.png", title: "Innovate", num: "02", des: "Build solutions that impact thousands of students and push boundaries beyond the classroom." },
  { icon: "/vector/ThirdCard/connect.png", title: "Connect",  num: "03", des: "Join a vibrant community of passionate developers who challenge and uplift each other daily." },
  { icon: "/vector/ThirdCard/grow.png",    title: "Grow",     num: "04", des: "Launch your tech career with real industry exposure, mentorship, and a portfolio that speaks for itself." },
];

const marqueeItems = [
  { text: "LEARN", hi: true }, { text: "·" }, { text: "INNOVATE" }, { text: "·" },
  { text: "CONNECT", hi: true }, { text: "·" }, { text: "GROW" }, { text: "·" },
  { text: "SSDC" }, { text: "·" }, { text: "LEARN", hi: true }, { text: "·" },
  { text: "INNOVATE" }, { text: "·" }, { text: "CONNECT", hi: true }, { text: "·" },
  { text: "GROW" }, { text: "·" },
];

const inView = (delay = 0) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: false, amount: 0.25 },
  variants: {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay } },
  },
});

const inViewX = (x = -24, delay = 0) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: false, amount: 0.25 },
  variants: {
    hidden:  { opacity: 0, x },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay } },
  },
});

// Inject card hover styles once
const STYLE_ID = "whyssdc-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes scanMove {
      0%   { transform: translateY(-100%); }
      100% { transform: translateY(500%); }
    }
    .ssdc-card { background: #03040a; transition: background 0.4s; }
    .ssdc-card:hover { background: rgba(0,210,255,0.035); }

    .ssdc-card .card-left-line { background: transparent; transition: background 0.4s; }
    .ssdc-card:hover .card-left-line { background: linear-gradient(180deg, transparent, rgba(0,210,255,0.6), transparent); }

    .ssdc-card .card-bot-line { background: transparent; transition: background 0.4s; }
    .ssdc-card:hover .card-bot-line { background: linear-gradient(90deg, transparent, rgba(0,210,255,0.5), transparent); }

    .ssdc-card .card-icon-wrap { border-color: rgba(0,210,255,0.2); background: rgba(0,210,255,0.04); transition: border-color 0.4s, background 0.4s; }
    .ssdc-card:hover .card-icon-wrap { border-color: rgba(0,210,255,0.5); background: rgba(0,210,255,0.08); }

    .ssdc-card .card-icon { transform: scale(1) rotate(0deg); transition: transform 0.4s; }
    .ssdc-card:hover .card-icon { transform: scale(1.15) rotate(6deg); }

    .ssdc-card .card-title {
      background: linear-gradient(170deg, rgba(255,255,255,0.92), rgba(255,255,255,0.4));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      transition: background 0.3s;
    }
    .ssdc-card:hover .card-title {
      background: linear-gradient(135deg, #00d2ff, #0077ff);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }

    .ssdc-card .card-desc { color: rgba(255,255,255,0.38); transition: color 0.4s; }
    .ssdc-card:hover .card-desc { color: rgba(255,255,255,0.55); }

    .ssdc-card .card-scan { opacity: 0; transition: opacity 0.3s; }
    .ssdc-card:hover .card-scan { opacity: 1; }
  `;
  document.head.appendChild(s);
}

const WhySSDCV2 = () => {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blob1Y = useSpring(useTransform(scrollYProgress, [0, 1], [-50, 70]),  { stiffness: 60, damping: 20 });
  const blob2Y = useSpring(useTransform(scrollYProgress, [0, 1], [50, -70]),  { stiffness: 60, damping: 20 });
  const headY  = useSpring(useTransform(scrollYProgress, [0, 1], [0, -50]),   { stiffness: 80, damping: 25 });

  useEffect(() => {
    let x = 0, raf;
    const el = marqueeRef.current;
    if (!el) return;
    const tick = () => {
      x -= 0.45;
      if (Math.abs(x) >= el.scrollWidth / 2) x = 0;
      el.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="why"
      ref={sectionRef}
      style={{ background: "#03040a", color: "rgba(255,255,255,0.92)", position: "relative", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Scanlines */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,210,255,0.013) 2px,rgba(0,210,255,0.013) 4px)" }} />

      {/* Parallax blobs */}
      <motion.div style={{ y: blob1Y, position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,210,255,0.06) 0%,transparent 70%)", top: -100, left: -100, pointerEvents: "none", zIndex: 0 }} />
      <motion.div style={{ y: blob2Y, position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,119,255,0.05) 0%,transparent 70%)", bottom: -80, right: -80, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "clamp(3rem,8vw,5.5rem) clamp(1.5rem,5vw,4rem)" }}>

        {/* Top accent line */}
        <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg,transparent,rgba(0,210,255,0.55),rgba(255,255,255,0.12),rgba(0,210,255,0.55),transparent)", marginBottom: "3rem" }} />

        {/* Eyebrow */}
        <motion.p {...inViewX(-24)}
          style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.63rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(0,210,255,0.7)", display: "flex", alignItems: "center", gap: 10, marginBottom: "1.2rem" }}
        >
          <span style={{ display: "inline-block", width: 32, height: 1, background: "linear-gradient(90deg,rgba(0,210,255,0.9),transparent)" }} />
          02 — Why SSDC
        </motion.p>

        {/* Parallax headline */}
        <motion.div style={{ y: headY }}>
          <motion.div {...inView(0.05)}
            style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,7vw,6rem)", lineHeight: 0.9, marginBottom: "0.6rem" }}
          >
            <span style={{ display: "block", background: "linear-gradient(170deg,#fff 30%,rgba(255,255,255,0.28))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Four Reasons</span>
            <span style={{ display: "block", background: "linear-gradient(135deg,#00d2ff,#0077ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>To Join Us.</span>
          </motion.div>
        </motion.div>

        <motion.p {...inView(0.1)}
          style={{ fontSize: "clamp(0.85rem,1.2vw,0.95rem)", color: "rgba(255,255,255,0.38)", maxWidth: 480, lineHeight: 1.7, marginBottom: "3.5rem" }}
        >
          We don't just teach you to code. We shape engineers, builders, and problem-solvers — one project at a time.
        </motion.p>

        {/* Cards grid */}
        <motion.div {...inView(0.15)}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 1, background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          {moto.map((item, i) => (
            <WhySSDCCardV2 key={item.title} item={item} index={i} total={moto.length} />
          ))}
        </motion.div>

        {/* Footer + marquee */}
        <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "0.5px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", overflow: "hidden" }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)", flexShrink: 0 }}>© SSDC · SLIET · Punjab, IN</span>
          <div style={{ overflow: "hidden", flex: 1, maskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)" }}>
            <div ref={marqueeRef} style={{ display: "flex", gap: 20, whiteSpace: "nowrap", width: "max-content" }}>
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: item.hi ? "rgba(0,210,255,0.4)" : "rgba(255,255,255,0.13)" }}>
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const WhySSDCCardV2 = ({ item, index, total }) => {
  return (
    <div className="ssdc-card" style={{ padding: "2rem 1.8rem", position: "relative", overflow: "hidden", cursor: "default" }}>

      {/* Scan sweep — CSS animation, always rendered, opacity toggled via CSS */}
      <div className="card-scan" style={{ position: "absolute", left: 0, right: 0, top: 0, height: 50, background: "linear-gradient(180deg,transparent,rgba(0,210,255,0.045),transparent)", pointerEvents: "none", animation: "scanMove 2.8s linear infinite" }} />

      {/* Left edge glow */}
      <div className="card-left-line" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1 }} />

      {/* Index */}
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(0,210,255,0.35)", marginBottom: "1.6rem" }}>
        {item.num} / 0{total}
      </p>

      {/* Icon */}
      <div className="card-icon-wrap" style={{ width: 48, height: 48, border: "0.5px solid", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.4rem" }}>
        <img className="card-icon" src={item.icon} alt={item.title} style={{ width: 22, height: 22, objectFit: "contain" }} />
      </div>

      {/* Title */}
      <h3 className="card-title" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", lineHeight: 1, marginBottom: "0.7rem" }}>
        {item.title}
      </h3>

      {/* Description */}
      <p className="card-desc" style={{ fontSize: "0.82rem", lineHeight: 1.7 }}>
        {item.des}
      </p>

      {/* Bottom edge glow */}
      <div className="card-bot-line" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1 }} />
    </div>
  );
};

export default WhySSDCV2;