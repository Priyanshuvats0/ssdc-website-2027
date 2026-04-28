import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const teamData = {
  faculty: [
    { name: "Dr. Manoj Sachan",  role: "Faculty Advisor",    img: "/images/team/manoj sachan.png" },
    { name: "Er. Rahul Gautam",  role: "Co-Faculty Advisor", img: "/images/team/rahul gautam.png" },
  ],
  mentors: [
    { name: "Arvind Kumar",  role: "Mentor", img: "/images/team/arvind.png"       },
    { name: "Marut Jindal",  role: "Mentor", img: "/images/team/marut jindal.png" },
  ],
};

// ─── CARD ─────────────────────────────────────────────────────────────────────
const TeamCard = ({ person, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -6 }}
    style={{
      position: "relative",
      background: "rgba(255,255,255,0.03)",
      border: "0.5px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: "clamp(1.4rem, 3vw, 2rem)",
      width: 220,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      backdropFilter: "blur(14px)",
      cursor: "default",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = "rgba(0,210,255,0.28)";
      e.currentTarget.style.boxShadow   = "0 0 32px rgba(0,210,255,0.08), 0 20px 40px rgba(0,0,0,0.4)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      e.currentTarget.style.boxShadow   = "none";
    }}
  >
    {/* Subtle top accent line */}
    <div style={{
      position: "absolute", top: 0, left: "20%", right: "20%", height: "0.5px",
      background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.4), transparent)",
      borderRadius: 999,
    }} />

    {/* Avatar */}
    <div style={{ position: "relative", marginBottom: "1.2rem" }}>
      {/* Glow ring */}
      <div style={{
        position: "absolute", inset: -4, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,210,255,0.18) 0%, transparent 70%)",
        filter: "blur(6px)",
      }} />
      {/* Ring border */}
      <div style={{
        position: "absolute", inset: -2, borderRadius: "50%",
        border: "0.5px solid rgba(0,210,255,0.25)",
      }} />
      <img
        src={person.img}
        alt={person.name}
        style={{
          width: 110, height: 110, borderRadius: "50%",
          objectFit: "cover", display: "block",
          position: "relative", zIndex: 1,
          border: "2px solid rgba(255,255,255,0.06)",
        }}
      />
    </div>

    {/* Name */}
    <p style={{
      fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
      fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
      color: "rgba(255,255,255,0.92)",
      marginBottom: "0.5rem", lineHeight: 1.3,
    }}>
      {person.name}
    </p>

    {/* Role badge */}
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 12px",
      border: "0.5px solid rgba(0,210,255,0.28)", borderRadius: 999,
      background: "rgba(0,210,255,0.05)",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase",
      color: "rgba(0,210,255,0.82)",
    }}>
      {person.role}
    </div>
  </motion.div>
);

// ─── GROUP ────────────────────────────────────────────────────────────────────
const TeamGroup = ({ label, people, startIndex }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
    {/* Sub-heading */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", alignItems: "center", gap: 14 }}
    >
      <div style={{ width: 40, height: "0.5px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18))" }} />
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)",
      }}>
        {label}
      </span>
      <div style={{ width: 40, height: "0.5px", background: "linear-gradient(90deg, rgba(255,255,255,0.18), transparent)" }} />
    </motion.div>

    {/* Cards */}
    <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", justifyContent: "center" }}>
      {people.map((person, i) => (
        <TeamCard key={person.name} person={person} index={startIndex + i} />
      ))}
    </div>
  </div>
);

// ─── SECTION ──────────────────────────────────────────────────────────────────
const TeamSectionV2 = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // Parallax layers
  const headlineY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const col1Y     = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const col2Y     = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const bgBlobY   = useTransform(scrollYProgress, [0, 1], [-30, 60]);

  return (
    <section
      ref={sectionRef}
      id="team"
      style={{
        position: "relative",
        background: "#03040a",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.2rem, 5vw, 4rem)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;600;700&family=Bebas+Neue&display=swap');
      `}</style>

      {/* Background ambient blobs */}
      <motion.div style={{ y: bgBlobY, position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "10%", left: "5%",
          width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,120,255,0.045) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "5%",
          width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,210,255,0.035) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
      </motion.div>

      {/* Subtle grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.018,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <motion.div style={{ y: headlineY }} >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            {/* Eyebrow */}
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(0.56rem, 1.1vw, 0.7rem)",
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)", marginBottom: "1rem",
            }}>
              The people behind it
            </p>

            {/* Headline */}
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              lineHeight: 0.92, letterSpacing: "-0.01em",
              background: "linear-gradient(175deg, rgba(255,255,255,0.95), rgba(255,255,255,0.4))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              marginBottom: "1.2rem",
            }}>
              Our Team
            </h2>

            {/* Accent divider */}
            <div style={{
              width: "100%", maxWidth: 420, height: "0.5px", margin: "0 auto",
              background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.38), rgba(255,255,255,0.1), rgba(0,210,255,0.38), transparent)",
            }} />
          </motion.div>
        </motion.div>

        {/* Two columns with independent parallax */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(2rem, 5vw, 4rem)",
          alignItems: "start",
        }}>
          <motion.div style={{ y: col1Y }}>
            <TeamGroup label="Faculty Advisors" people={teamData.faculty} startIndex={0} />
          </motion.div>
          <motion.div style={{ y: col2Y }}>
            <TeamGroup label="Mentors" people={teamData.mentors} startIndex={2} />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default TeamSectionV2;