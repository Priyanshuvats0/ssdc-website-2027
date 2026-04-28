import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, useAnimation } from "framer-motion";

const DescriptionSectionV2 = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const blobTopRef = useRef(null);
  const blobBotRef = useRef(null);

  const stats = [
    { num: "40+", label: "Active Developers", sub: "Building, shipping, competing", idx: "S.01", accent: true },
    { num: "10+", label: "Projects Shipped", sub: "Across 5+ technical domains", idx: "S.02", accent: false },
    { num: "07+", label: "Years Running", sub: "Since CSE batch of 2017", idx: "S.03", accent: false },
    { num: "∞",   label: "Lines of Ambition", sub: "No upper bound on impact", idx: "S.04", accent: false },
  ];

  const tags = ["Web Dev", "App Dev", "Machine Learning", "Cybersecurity", "Open Source", "DSA / CP"];

  // Scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const blobTopY  = useTransform(scrollYProgress, [0, 1], [-60, 80]);
  const blobBotY  = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -65]);

  // Smooth springs for parallax
  const blobTopYS  = useSpring(blobTopY,  { stiffness: 60, damping: 20 });
  const blobBotYS  = useSpring(blobBotY,  { stiffness: 60, damping: 20 });
  const headlineYS = useSpring(headlineY, { stiffness: 80, damping: 25 });

  // Marquee RAF
  const marqueeRef = useRef(null);
  useEffect(() => {
    let x = 0;
    let raf;
    const el = marqueeRef.current;
    if (!el) return;
    const tick = () => {
      x -= 0.4;
      const half = el.scrollWidth / 2;
      if (Math.abs(x) >= half) x = 0;
      el.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Scroll-triggered variants — animate in AND reverse out
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
    exit:   { opacity: 0, y: 28, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit:   { opacity: 0, x: -24, transition: { duration: 0.4 } },
  };

  const fadeRight = (delay = 0) => ({
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay } },
    exit:   { opacity: 0, x: 32, transition: { duration: 0.4 } },
  });

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit:   { opacity: 0, scale: 0.92, transition: { duration: 0.4 } },
  };

  // whileInView with amount so reverse happens when element leaves
  const inViewProps = (variants, amount = 0.3) => ({
    variants,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: false, amount },
  });

  const marqueeItems = [
    { text: "SSDC", hi: true }, { text: "·" }, { text: "Web Dev" },
    { text: "·" }, { text: "ML" }, { text: "·" },
    { text: "Cybersec", hi: true }, { text: "·" }, { text: "App Dev" },
    { text: "·" }, { text: "Open Source" }, { text: "·" },
    { text: "DSA", hi: true }, { text: "·" }, { text: "Hackathons" }, { text: "·" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ background: "#03040a", color: "rgba(255,255,255,0.92)", position: "relative", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Scanlines */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,210,255,0.013) 2px,rgba(0,210,255,0.013) 4px)" }} />

      {/* Parallax blobs */}
      <motion.div style={{ y: blobTopYS, position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,210,255,0.08) 0%,transparent 70%)", top: -180, left: -200, pointerEvents: "none", zIndex: 0 }} />
      <motion.div style={{ y: blobBotYS, position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,119,255,0.055) 0%,transparent 70%)", bottom: -100, right: -150, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "clamp(3rem,8vw,5.5rem) clamp(1.5rem,5vw,4rem)" }}>

        {/* Top accent line */}
        <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg,transparent,rgba(0,210,255,0.55),rgba(255,255,255,0.12),rgba(0,210,255,0.55),transparent)", marginBottom: "3rem" }} />

        {/* Eyebrow */}
        <motion.p {...inViewProps(fadeLeft)}
          style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.63rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(0,210,255,0.7)", display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}
        >
          <span style={{ display: "inline-block", width: 32, height: 1, background: "linear-gradient(90deg,rgba(0,210,255,0.9),transparent)" }} />
          01 — About SSDC
        </motion.p>

        {/* Parallax headline */}
        <motion.div style={{ y: headlineYS }}>
          <motion.div {...inViewProps(fadeUp)}
            style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3.8rem,9vw,7.5rem)", lineHeight: 0.88, marginBottom: "2.5rem" }}
          >
            <span style={{ display: "block", background: "linear-gradient(170deg,#fff 30%,rgba(255,255,255,0.28))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>We Don't</span>
            <span style={{ display: "block", background: "linear-gradient(135deg,#00d2ff,#0077ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Just Code.</span>
            <span style={{ display: "block", background: "linear-gradient(170deg,rgba(255,255,255,0.55),rgba(255,255,255,0.12))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>We Build.</span>
          </motion.div>
        </motion.div>

        {/* Live badge */}
        <motion.div {...inViewProps(scaleIn)}
          style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 18px", border: "0.5px solid rgba(0,210,255,0.38)", borderRadius: 999, background: "rgba(0,210,255,0.06)", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,210,255,0.88)", marginBottom: "3rem" }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d2ff", flexShrink: 0 }} />
          Est. 2017 · SLIET Longowal · CSE Dept
        </motion.div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(2rem,4vw,5rem)", alignItems: "start" }}>

          {/* Left — text + tags */}
          <motion.div {...inViewProps(fadeUp, 0.2)}>
            <p style={{ fontSize: "clamp(0.88rem,1.3vw,1rem)", lineHeight: 1.9, color: "rgba(255,255,255,0.5)", marginBottom: "1.25rem" }}>
              <strong style={{ color: "rgba(255,255,255,0.88)", fontWeight: 500 }}>SSDC</strong> is the Software Development Club of Computer Science & Engineering at SLIET Longowal — founded by the CSE batch of 2017 and now home to <strong style={{ color: "rgba(255,255,255,0.88)", fontWeight: 500 }}>40+ developers</strong> obsessed with building things that matter.
            </p>
            <p style={{ fontSize: "clamp(0.88rem,1.3vw,1rem)", lineHeight: 1.9, color: "rgba(255,255,255,0.5)", marginBottom: "1.25rem" }}>
              We operate on a <strong style={{ color: "rgba(255,255,255,0.88)", fontWeight: 500 }}>project-first philosophy</strong> — real products, real challenges, real growth. From Web & App Development to Machine Learning, Cybersecurity, and beyond, every member ships.
            </p>
            <p style={{ fontSize: "clamp(0.88rem,1.3vw,1rem)", lineHeight: 1.9, color: "rgba(255,255,255,0.5)", marginBottom: "1.25rem" }}>
              We also run <strong style={{ color: "rgba(255,255,255,0.88)", fontWeight: 500 }}>workshops, hackathons</strong>, and monthly coding competitions that surface the next wave of technical talent from campus.
            </p>

            <div style={{ height: 1, background: "linear-gradient(90deg,rgba(0,210,255,0.3),rgba(255,255,255,0.05),transparent)", margin: "1.8rem 0" }} />

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {tags.map(t => (
                <span key={t} style={{ padding: "5px 13px", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 999, fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Right — stat rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.idx}
                {...inViewProps(fadeRight(i * 0.08), 0.3)}
                style={{ display: "flex", alignItems: "stretch", border: "0.5px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", position: "relative", overflow: "hidden" }}
              >
                <div style={{ width: 2, background: `linear-gradient(180deg,transparent,${s.accent ? "rgba(0,210,255,0.6)" : "rgba(0,210,255,0.35)"},transparent)`, flexShrink: 0 }} />
                <div style={{ padding: "1.5rem 1.6rem", display: "flex", alignItems: "center", gap: "1.2rem", width: "100%" }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.8rem,4.5vw,4rem)", lineHeight: 1, minWidth: 80, ...(s.accent ? { background: "linear-gradient(135deg,#00d2ff,#0077ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" } : { color: "rgba(255,255,255,0.88)" }) }}>
                    {s.num}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.56rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", color: "rgba(255,255,255,0.25)", lineHeight: 1.4 }}>{s.sub}</div>
                  </div>
                </div>
                <span style={{ position: "absolute", right: "1.2rem", top: "50%", transform: "translateY(-50%)", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.48rem", color: "rgba(255,255,255,0.1)", letterSpacing: "0.1em" }}>{s.idx}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer strip with marquee */}
        <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "0.5px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", overflow: "hidden" }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)", flexShrink: 0 }}>© SSDC · SLIET · Punjab, IN</span>

          {/* Marquee */}
          <div style={{ overflow: "hidden", flex: 1, maskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)" }}>
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

export default DescriptionSectionV2;