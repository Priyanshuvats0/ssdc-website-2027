import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EventsHeader = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px", once: false });

  return (
    <div ref={ref} style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
      {/* Eyebrow — exactly like WhySSDC "02 → WHY SSDC" */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: "clamp(0.8rem, 2vw, 1.2rem)",
        }}
      >
        <div style={{ width: 28, height: "0.5px", background: "rgba(0,210,255,0.5)" }} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase",
          color: "rgba(0,210,255,0.7)",
        }}>
          03 → EVENTS
        </span>
      </motion.div>

      {/* Big headline — same scale as "FOUR REASONS TO JOIN US" */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(3rem, 9vw, 7.5rem)",
          lineHeight: 0.9, letterSpacing: "-0.01em",
          color: "rgba(255,255,255,0.92)",
          marginBottom: 0,
        }}
      >
        Upcoming &<br />
        <span style={{ color: "#00d2ff" }}>Events.</span>
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        style={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
          fontSize: "clamp(0.85rem, 1.5vw, 1rem)", lineHeight: 1.7,
          color: "rgba(255,255,255,0.35)",
          maxWidth: 480,
          marginTop: "clamp(1rem, 2.5vw, 1.6rem)",
        }}
      >
        Discover our latest workshops, contests, and coding challenges — all free, open, and built to push you further.
      </motion.p>
    </div>
  );
};

export default EventsHeader;
