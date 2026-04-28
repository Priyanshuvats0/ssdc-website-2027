import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const events = [
  {
    id: 1,
    index: "01 / 03",
    title: "Athlos 03",
    type: "Contest",
    description:
      "Ready to test your coding skills? Join the upcoming coding contest and put your problem solving abilities to the test. Compete with fellow students.",
    date: "March 17, 2026",
    time: "08:00 PM",
    participation: "Individual",
    prize: "₹10,000+ & Goodies",
    image: "/images/events/athlos.png",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3L13.5 8.5L19.5 9.3L15 13.5L16.2 19.5L11 16.5L5.8 19.5L7 13.5L2.5 9.3L8.5 8.5L11 3Z"
          stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    index: "02 / 03",
    title: "Intro to CP",
    type: "Workshop",
    description:
      "Kickstart your CP journey. Learn time complexity, C++ STL, and basic data structures to start solving problems efficiently from day one.",
    date: "February 20, 2026",
    time: "05:00 PM",
    participation: "Open to All",
    prize: "Mentorship",
    image: "/images/events/cp.png",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M7 8L4 11L7 14M15 8L18 11L15 14M12 5L10 17"
          stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    index: "03 / 03",
    title: "Advanced CP",
    type: "Workshop",
    description:
      "Master advanced algorithms, dynamic programming, and graph theory to ace coding interviews and dominate competitive programming contests.",
    date: "March 05, 2026",
    time: "06:30 PM",
    participation: "Intermediate",
    prize: "Certificates",
    image: "/images/events/workshop.png",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 17L8 12L12 15L19 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="19" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
];

// ─── EVENT CARD ───────────────────────────────────────────────────────────────
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

// ─── SECTION HEADER (matches WhySSDC header style) ────────────────────────────
const Header = () => {
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

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
const EventsSectionV2 = () => {
  const sectionRef = useRef(null);

  // Subtle section-level parallax — whole section drifts slightly as it enters
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="events"
      ref={sectionRef}
      style={{
        background: "#03040a",
        color: "white",
        padding: "clamp(3rem, 8vw, 7rem) clamp(1.2rem, 5vw, 4rem)",
        borderBottom: "0.5px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;600;700&family=Bebas+Neue&display=swap');

        @media (max-width: 768px) {
          .events-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1100px) {
          .events-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* Subtle background ambient */}
      <div style={{
        position: "absolute", top: "10%", right: "-10%",
        width: "50%", height: "60%",
        background: "radial-gradient(ellipse, rgba(0,80,255,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <motion.div style={{ y: sectionY, maxWidth: 1300, margin: "0 auto" }}>
        <Header />

        {/* Card grid — same structure as WhySSDC 4-column grid */}
        <div
          className="events-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} i={i} />
          ))}
        </div>

        {/* Bottom CTA row */}
        <BottomRow />
      </motion.div>
    </section>
  );
};

// ─── BOTTOM ROW ───────────────────────────────────────────────────────────────
const BottomRow = () => {
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

export default EventsSectionV2;