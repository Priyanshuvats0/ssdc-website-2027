import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import TeamHeader from "./TeamHeader";
import TeamGroup from "./TeamGroup";
import { A } from "./constants";
import { teamData, teamTotals } from "../../data/team";

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

        <TeamHeader totalMembers={teamTotals.overall} />

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

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: "clamp(2rem, 4vw, 3rem)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link
            to="/team"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#03040a",
              background: "linear-gradient(135deg, #00d2ff, #0077ff)",
              border: "none",
              borderRadius: 6,
              padding: "12px 26px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
              transition: "transform 0.22s ease, box-shadow 0.22s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 0 1px rgba(0,210,255,0.4), 0 8px 28px rgba(0,150,255,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            View all team →
          </Link>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default TeamSectionV2;
