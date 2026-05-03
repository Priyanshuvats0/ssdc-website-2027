import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CarouselHeader = ({ active, total }) => {
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
          <span style={{ fontSize: "55%", color: "rgba(255,255,255,0.04)" }}> / {String(total).padStart(2, "0")}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default CarouselHeader;
