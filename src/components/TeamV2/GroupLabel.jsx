import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

export default GroupLabel;
