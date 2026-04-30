import { motion } from "framer-motion";

const A = "0,170,255";

const socialLinks = [
  { name: "instagram", url: "https://www.instagram.com/ssdc.sliet/" },
  { name: "linkedin",  url: "https://www.linkedin.com/company/sliet-software-developement-club/" },
  { name: "github",    url: "https://github.com/ssdc-sliet" },
];

const FooterV2 = () => (
  <footer id="contact" style={{ background: "#03040a", borderTop: ".5px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;600;700&family=Bebas+Neue&display=swap');
      @keyframes dot-blink { 0%,100%{opacity:1} 50%{opacity:.3} }
      .soc-btn { transition: border-color .25s ease, background .25s ease, transform .25s ease; }
      .soc-btn:hover { border-color: rgba(${A},0.5) !important; background: rgba(${A},0.07) !important; transform: translateY(-3px); }
      .mail-link { transition: color .2s ease; color: rgba(255,255,255,0.45); text-decoration: none; }
      .mail-link:hover { color: rgba(${A},0.9); }
    `}</style>

    {/* Ambient glow */}
    <div style={{
      position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: "60%", height: 180,
      background: `radial-gradient(ellipse, rgba(0,80,255,0.04) 0%, transparent 70%)`,
      pointerEvents: "none",
    }} />

    {/* Top accent line */}
    <div style={{
      position: "absolute", top: 0, left: "10%", right: "10%", height: ".5px",
      background: `linear-gradient(90deg, transparent, rgba(${A},0.3), rgba(255,255,255,0.06), rgba(${A},0.3), transparent)`,
    }} />

    {/* Main grid */}
    <div style={{
      maxWidth: 1100, margin: "0 auto",
      padding: "clamp(2.5rem,6vw,4.5rem) clamp(1.2rem,5vw,4rem) clamp(2rem,4vw,3rem)",
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "clamp(2rem,4vw,3.5rem)",
      position: "relative", zIndex: 1,
    }}>

      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
          <img src="/images/logo.png" alt="SSDC" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: `.5px solid rgba(${A},0.2)` }} />
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem", letterSpacing: "0.18em", color: "rgba(255,255,255,.92)" }}>SSDC</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#00d2ff", display: "inline-block", boxShadow: `0 0 5px rgba(${A},0.9)`, animation: "dot-blink 2.5s ease-in-out infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.38rem", letterSpacing: "0.22em", textTransform: "uppercase", color: `rgba(${A},.5)` }}>SLIET · EST. 2021</span>
            </div>
          </div>
        </div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: "clamp(.82rem,1.4vw,.9rem)", color: "rgba(255,255,255,0.32)", lineHeight: 1.7, maxWidth: 260 }}>
          Building a culture of software development and innovation at SLIET.
        </p>
      </motion.div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.2rem" }}>
          <div style={{ width: 18, height: ".5px", background: `rgba(${A},0.5)` }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", color: `rgba(${A},0.65)` }}>Contact</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {/* Email */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, border: `.5px solid rgba(${A},0.2)`, background: `rgba(${A},0.05)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={`rgba(${A},0.8)`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <a href="mailto:sliet.ssdc@gmail.com" className="mail-link" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.08em" }}>
              sliet.ssdc@gmail.com
            </a>
          </div>

          {/* Location */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, border: `.5px solid rgba(${A},0.2)`, background: `rgba(${A},0.05)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={`rgba(${A},0.8)`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.38)" }}>
              Longowal, Punjab · 148106
            </span>
          </div>
        </div>
      </motion.div>

      {/* Socials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.2rem" }}>
          <div style={{ width: 18, height: ".5px", background: `rgba(${A},0.5)` }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", color: `rgba(${A},0.65)` }}>Follow Us</span>
        </div>

        <div style={{ display: "flex", gap: "0.7rem", marginBottom: "1rem" }}>
          {socialLinks.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank" rel="noopener noreferrer"
              className="soc-btn"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08 }}
              style={{
                width: 38, height: 38, borderRadius: 8,
                border: ".5px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <img src={`/vector/${p.name}.svg`} alt={p.name} style={{ width: 17, height: 17, opacity: 0.7 }} />
            </motion.a>
          ))}
        </div>

        <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: "clamp(.78rem,1.3vw,.85rem)", color: "rgba(255,255,255,0.28)", lineHeight: 1.65 }}>
          Stay updated with our latest events and projects.
        </p>
      </motion.div>
    </div>

    {/* Bottom bar */}
    <div style={{ borderTop: ".5px solid rgba(255,255,255,0.04)", padding: "1.2rem clamp(1.2rem,5vw,4rem)", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.8rem" }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>
          © 2026 SSDC · All rights reserved
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 20, height: ".5px", background: `rgba(${A},0.3)` }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: `rgba(${A},0.4)` }}>
            SLIET · Punjab · India
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterV2;