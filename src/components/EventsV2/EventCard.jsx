import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const EventCard = ({ event, i }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const isInView = useInView(ref, { margin: "-12% 0px -12% 0px", once: false });

  // Image parallax inside card
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "#0a0b12",
        border: "0.5px solid",
        borderColor: hovered ? "rgba(0,210,255,0.35)" : "rgba(255,255,255,0.07)",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 0 0 1px rgba(0,210,255,0.12), 0 20px 60px rgba(0,0,0,0.5)"
          : "0 4px 24px rgba(0,0,0,0.3)",
        cursor: "default",
      }}
    >
      {/* ── IMAGE with parallax ────────────────────────────────────────────── */}
      <div style={{ position: "relative", overflow: "hidden", height: 180, flexShrink: 0 }}>
        <motion.div style={{ y: imgY, height: "120%", marginTop: "-10%" }}>
          <img
            src={event.image}
            alt={event.title}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              filter: hovered ? "brightness(0.65) saturate(1.1)" : "brightness(0.45) saturate(0.8)",
              transition: "filter 0.4s ease",
            }}
          />
        </motion.div>

        {/* Gradient fade to card bg */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,11,18,0) 30%, rgba(10,11,18,0.95) 100%)",
        }} />

        {/* Type badge — top left */}
        <div style={{
          position: "absolute", top: 14, left: 14,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase",
          color: "rgba(0,210,255,0.88)",
          padding: "4px 10px",
          border: "0.5px solid rgba(0,210,255,0.3)",
          borderRadius: 999,
          background: "rgba(0,210,255,0.07)",
          backdropFilter: "blur(8px)",
        }}>
          {event.type}
        </div>

        {/* Index — top right */}
        <div style={{
          position: "absolute", top: 14, right: 14,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.58rem", letterSpacing: "0.15em",
          color: "rgba(0,210,255,0.5)",
        }}>
          {event.index}
        </div>
      </div>

      {/* ── CARD BODY ─────────────────────────────────────────────────────── */}
      <div style={{ padding: "clamp(1.2rem, 2.5vw, 1.6rem)", display: "flex", flexDirection: "column", flex: 1 }}>

        {/* Icon */}
        <div style={{
          width: 42, height: 42,
          border: "0.5px solid rgba(0,210,255,0.22)",
          borderRadius: 8,
          background: "rgba(0,210,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#00d2ff",
          marginBottom: "1rem",
          transition: "background 0.3s ease, border-color 0.3s ease",
          ...(hovered ? { background: "rgba(0,210,255,0.12)", borderColor: "rgba(0,210,255,0.4)" } : {}),
        }}>
          {event.icon}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(1.6rem, 3vw, 2rem)",
          letterSpacing: "0.04em", lineHeight: 1,
          color: "rgba(255,255,255,0.92)",
          marginBottom: "0.75rem",
        }}>
          {event.title}
        </h3>

        {/* Divider */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.35 }}
          style={{
            width: "100%", maxWidth: 60, height: "0.5px",
            background: "linear-gradient(90deg, #00d2ff, transparent)",
            transformOrigin: "left", marginBottom: "0.8rem",
          }}
        />

        {/* Description */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
          fontSize: "clamp(0.82rem, 1.4vw, 0.9rem)", lineHeight: 1.68,
          color: "rgba(255,255,255,0.38)",
          marginBottom: "1.2rem", flex: 1,
        }}>
          {event.description}
        </p>

        {/* Meta — matches WhySSDC card's data table */}
        <div style={{
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          paddingTop: "1rem",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem 1rem",
        }}>
          {[
            { label: "Date",   val: event.date          },
            { label: "Time",   val: event.time          },
            { label: "Format", val: event.participation },
            { label: "Prize",  val: event.prize, green: true },
          ].map((m) => (
            <div key={m.label}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)", marginBottom: 3,
              }}>
                {m.label}
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem", fontWeight: 600,
                color: m.green ? "#4AF626" : "rgba(255,255,255,0.75)",
              }}>
                {m.val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
