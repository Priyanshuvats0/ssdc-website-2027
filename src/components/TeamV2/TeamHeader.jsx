import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { A } from "./constants";

const TeamHeader = ({ totalMembers }) => {
  const ref = useRef(null);
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

export default TeamHeader;
