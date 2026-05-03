import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EventsBottomRow = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px", once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        marginTop: "clamp(2rem, 4vw, 3rem)",
        paddingTop: "clamp(1.5rem, 3vw, 2rem)",
        borderTop: "0.5px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
          color: "rgba(255,255,255,0.8)", lineHeight: 1,
        }}>
          More events coming soon.
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.58rem", letterSpacing: "0.2em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.25)",
          marginTop: 6,
        }}>
          Follow us for updates
        </div>
      </div>

      <a
        href="#"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase",
          fontWeight: 600, color: "#03040a",
          background: "linear-gradient(135deg, #00d2ff, #0077ff)",
          border: "none", borderRadius: 5,
          padding: "12px 26px", cursor: "pointer",
          textDecoration: "none", display: "inline-block",
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
        View all events →
      </a>
    </motion.div>
  );
};

export default EventsBottomRow;
