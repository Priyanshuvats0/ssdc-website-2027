import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const teamData = {
  faculty: [
    { name: "Dr. Manoj Sachan",  role: "Faculty Advisor",    img: "/images/team/manoj sachan.png",  initials: "MS", index: "01" },
    { name: "Er. Rahul Gautam",  role: "Co-Faculty Advisor", img: "/images/team/rahul gautam.png",  initials: "RG", index: "02" },
  ],
  mentors: [
    { name: "Arvind Kumar",  role: "Mentor", img: "/images/team/arvind.png",        initials: "AK", index: "03" },
    { name: "Marut Jindal",  role: "Mentor", img: "/images/team/marut jindal.png",  initials: "MJ", index: "04" },
  ],
};

const A = "0,170,255"; // accent RGB — matches CarouselV2

// ── HEADER — mirrors CarouselV2 Header exactly ────────────────────────────────
const TeamHeader = ({ totalMembers }) => {
  const ref = useRef(null);
  // same margin as CarouselV2
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px", once: false });

  return (
    <div ref={ref} style={{ marginBottom: "clamp(2rem,4vw,3rem)" }}>
      {/* Eyebrow row — identical animation to carousel */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
        transition={{ duration: 0.5 }}
        style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.7rem" }}
      >
        <div style={{ width: 28, height: "0.5px", background: `rgba(${A},0.5)` }} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase",
          color: `rgba(${A},0.7)`,
        }}>
          05 → TEAM
        </span>
      </motion.div>

      {/* Headline + ghost counter row — mirrors "Moments & Memories" layout */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.8rem,7vw,6rem)",
            lineHeight: 0.9, margin: 0,
            color: "rgba(255,255,255,0.92)",
          }}
        >
          The People &<br />
          <span style={{ color: `rgba(${A},1)` }}>The Team.</span>
        </motion.h2>

        {/* Ghost member count — mirrors ghost slide counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, paddingBottom: "0.2rem" }}
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700, fontSize: "clamp(2rem,5vw,2.8rem)",
            color: `rgba(${A},1)`, lineHeight: 1, letterSpacing: "-0.02em",
          }}>
            {totalMembers}<span style={{ color: `rgba(${A},0.4)` }}>+</span>
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.58rem", letterSpacing: "0.22em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
          }}>
            Developers
          </span>
        </motion.div>
      </div>

      {/* Accent divider — same as carousel */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: "0.5px", transformOrigin: "left",
          background: `linear-gradient(90deg, rgba(${A},0.45), rgba(255,255,255,0.06), transparent)`,
        }}
      />
    </div>
  );
};

// ── GROUP LABEL — same reveal as carousel dot indicators ──────────────────────
const GroupLabel = ({ label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
      transition={{ duration: 0.5 }}
      style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", maxWidth: 520 }}
    >
      <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1))" }} />
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.28)", whiteSpace: "nowrap",
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)" }} />
    </motion.div>
  );
};

// ── CARD ──────────────────────────────────────────────────────────────────────
const TeamCard = ({ person, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative", width: 230, flexShrink: 0, cursor: "default" }}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          background: `rgba(${A},0.02)`,
          border: "0.5px solid rgba(255,255,255,0.07)",
          borderRadius: 2,
          padding: "2.5rem 1.75rem 2rem",
          display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center",
          overflow: "hidden",
          transition: "border-color .35s ease, background .35s ease, box-shadow .35s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `rgba(${A},0.3)`;
          e.currentTarget.style.background  = `rgba(${A},0.04)`;
          e.currentTarget.style.boxShadow   = `0 24px 60px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(${A},0.18)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          e.currentTarget.style.background  = `rgba(${A},0.02)`;
          e.currentTarget.style.boxShadow   = "none";
        }}
      >
        {/* Top accent line */}
        <div style={{
          position: "absolute", top: 0, left: "20%", right: "20%", height: 1,
          background: `linear-gradient(90deg, transparent, rgba(${A},0.55), transparent)`,
        }} />

        {/* Corner brackets */}
        {[
          { top: 8,    left: 8,   borderTop:    `0.5px solid rgba(${A},0.25)`, borderLeft:   `0.5px solid rgba(${A},0.25)` },
          { top: 8,    right: 8,  borderTop:    `0.5px solid rgba(${A},0.25)`, borderRight:  `0.5px solid rgba(${A},0.25)` },
          { bottom: 8, left: 8,   borderBottom: `0.5px solid rgba(${A},0.25)`, borderLeft:   `0.5px solid rgba(${A},0.25)` },
          { bottom: 8, right: 8,  borderBottom: `0.5px solid rgba(${A},0.25)`, borderRight:  `0.5px solid rgba(${A},0.25)` },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 12, height: 12, ...s }} />
        ))}

        {/* Index badge — top right like carousel slide number */}
        <div style={{
          position: "absolute", top: 14, right: 14,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.52rem", letterSpacing: "0.15em",
          color: `rgba(${A},0.5)`,
        }}>
          {person.index}
        </div>

        {/* Avatar */}
        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <div style={{
            position: "absolute", inset: -8, borderRadius: "50%",
            background: `radial-gradient(circle, rgba(${A},0.14) 0%, transparent 70%)`,
            filter: "blur(10px)",
          }} />
          <div style={{
            position: "absolute", inset: -2, borderRadius: "50%",
            border: `0.5px solid rgba(${A},0.25)`,
          }} />
          <div style={{
            width: 110, height: 110, borderRadius: "50%", overflow: "hidden",
            position: "relative", zIndex: 1,
            background: `rgba(${A},0.06)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <img
              src={person.img}
              alt={person.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const span = document.createElement("span");
                span.textContent = person.initials;
                span.style.cssText = `font-family:'JetBrains Mono',monospace;font-weight:700;font-size:1.25rem;color:rgba(${A},1);letter-spacing:0.08em;`;
                e.currentTarget.parentElement.appendChild(span);
              }}
            />
          </div>
        </div>

        {/* Name */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
          fontSize: "clamp(0.88rem,1.5vw,1rem)",
          color: "rgba(255,255,255,0.92)",
          marginBottom: "0.65rem", lineHeight: 1.3,
        }}>
          {person.name}
        </p>

        {/* Role badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "4px 14px",
          border: `0.5px solid rgba(${A},0.25)`,
          borderRadius: 2,
          background: `rgba(${A},0.05)`,
        }}>
          <div style={{
            width: 4, height: 4, borderRadius: "50%",
            background: `rgba(${A},1)`,
            boxShadow: `0 0 6px rgba(${A},0.8)`,
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase",
            color: `rgba(${A},0.82)`,
          }}>
            {person.role}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── GROUP ─────────────────────────────────────────────────────────────────────
const TeamGroup = ({ label, people, startIndex }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
    <GroupLabel label={label} />
    <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center" }}>
      {people.map((person, i) => (
        <TeamCard key={person.name} person={person} index={startIndex + i} />
      ))}
    </div>
  </div>
);

// ── MAIN ─────────────────────────────────────────────────────────────────────
const TeamSectionV2 = () => {
  const sectionRef = useRef(null);

  // Same parallax setup as CarouselV2
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const sectionY  = useTransform(scrollYProgress, [0, 1], [24, -24]);   // whole section — mirrors carouselV2
  const col1Y     = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const col2Y     = useTransform(scrollYProgress, [0, 1], [55, -55]);
  const bgBlobY   = useTransform(scrollYProgress, [0, 1], [-30, 60]);

  return (
    <section
      ref={sectionRef}
      id="team"
      style={{
        position: "relative",
        background: "#03040a",
        padding: "clamp(3rem,8vw,7rem) 0",
        borderBottom: "0.5px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;600;700&family=Bebas+Neue&display=swap');
      `}</style>

      {/* Ambient blobs — same as carousel */}
      <motion.div style={{ y: bgBlobY, position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "8%", left: "3%",
          width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,100,255,0.045) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", bottom: "8%", right: "3%",
          width: 380, height: 380, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${A},0.035) 0%, transparent 70%)`,
          filter: "blur(60px)",
        }} />
        {/* Centre glow — mirrors carousel ambient */}
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: "55%", height: "50%",
          background: "radial-gradient(ellipse, rgba(0,80,255,0.04) 0%, transparent 70%)",
        }} />
      </motion.div>

      {/* Hairline grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.016,
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Whole section drifts on scroll — same as sectionY in CarouselV2 */}
      <motion.div style={{ y: sectionY, position: "relative", zIndex: 1, padding: "0 clamp(1.2rem,5vw,4rem)" }}>

        <TeamHeader totalMembers={40} />

        {/* Two columns — independent parallax depths */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(2rem,5vw,4rem)",
          alignItems: "start",
        }}>
          <motion.div style={{ y: col1Y }}>
            <TeamGroup label="Faculty Advisors" people={teamData.faculty} startIndex={0} />
          </motion.div>
          <motion.div style={{ y: col2Y }}>
            <TeamGroup label="Mentors" people={teamData.mentors} startIndex={2} />
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

export default TeamSectionV2;