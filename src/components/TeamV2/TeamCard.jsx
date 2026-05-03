import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { A } from "./constants";

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

export default TeamCard;
