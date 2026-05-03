import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import EventsHeader from "./EventsHeader";
import EventCard from "./EventCard";
import EventsBottomRow from "./EventsBottomRow";

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
        <EventsHeader />

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
        <EventsBottomRow />
      </motion.div>
    </section>
  );
};

export default EventsSectionV2;
