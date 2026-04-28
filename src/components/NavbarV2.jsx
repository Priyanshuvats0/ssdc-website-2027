import { useState, useEffect, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const SECTIONS = ["home", "about", "events", "gallery", "team"];

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const NavbarV2 = () => {
  const [scrolled, setScrolled]       = useState(false);
  const [active, setActive]           = useState("home");
  const [menuOpen, setMenuOpen]       = useState(false);
  const location = useLocation();
  const isHome   = location.pathname === "/";

  // Single scroll listener — drives both condensed state + progress bar
  const progress = useMotionValue(0);
  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 40);
      progress.set(max > 0 ? y / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [progress]);

  const barWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;600&display=swap');
        .nl { position:relative; font-family:'JetBrains Mono',monospace; font-size:0.68rem;
              letter-spacing:0.2em; text-transform:uppercase; cursor:pointer;
              padding:4px 0; transition:color .22s ease; text-decoration:none; }
        .nl::after { content:''; position:absolute; bottom:0; left:0; right:0;
                     height:.5px; background:linear-gradient(90deg,transparent,#00d2ff,transparent);
                     transform:scaleX(0); transform-origin:right;
                     transition:transform .3s cubic-bezier(.16,1,.3,1); }
        .nl:hover,.nl.active { color:rgba(0,210,255,.92) !important; }
        .nl:hover::after,.nl.active::after { transform:scaleX(1); transform-origin:left; }
        @media(max-width:768px){ .nd{display:none!important} }
        @media(min-width:769px){ .nh{display:none!important} }
      `}</style>

      {/* Progress bar */}
      <div style={{ position:"fixed", top:0, left:0, right:0, height:"1.5px", zIndex:502, pointerEvents:"none", background:"rgba(255,255,255,0.04)" }}>
        <motion.div style={{ height:"100%", width:barWidth, background:"linear-gradient(90deg,#00d2ff,#0077ff)", boxShadow:"0 0 8px rgba(0,210,255,.5)" }} />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y:-70, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:.65, ease:[.16,1,.3,1], delay:.1 }}
        style={{
          position:"fixed", top:0, left:0, right:0, zIndex:500,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding: scrolled ? "10px 32px" : "16px 40px",
          background: scrolled ? "rgba(3,4,10,.9)" : "rgba(3,4,10,.3)",
          borderBottom: scrolled ? ".5px solid rgba(255,255,255,.07)" : ".5px solid rgba(255,255,255,.03)",
          backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
          transition:"padding .35s ease, background .35s ease",
        }}
      >
        {/* Logo */}
        <RouterLink to="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
          <img src="/images/logo.png" alt="SSDC" style={{ width:36, height:36, borderRadius:"50%", objectFit:"cover" }} />
          <div style={{ lineHeight:1 }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem", letterSpacing:"0.18em", color:"rgba(255,255,255,.92)" }}>SSDC</div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.42rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(0,210,255,.6)", marginTop:1 }}>SLIET · EST. 2021</div>
          </div>
        </RouterLink>

        {/* Desktop links */}
        <div className="nd" style={{ display:"flex", alignItems:"center", gap:"clamp(1.2rem,2.5vw,2.2rem)" }}>
          {isHome ? SECTIONS.map(s => (
            <ScrollLink
              key={s} to={s} smooth duration={600} offset={-80}
              spy onSetActive={() => setActive(s)}
              className={`nl${active === s ? " active" : ""}`}
              style={{ color: active === s ? "rgba(0,210,255,.92)" : "rgba(255,255,255,.45)" }}
            >
              {s[0].toUpperCase() + s.slice(1)}
            </ScrollLink>
          )) : (
            <RouterLink to="/" className="nl" style={{ color:"rgba(255,255,255,.45)", display:"flex", alignItems:"center", gap:5 }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M8 1L3 6L8 11" stroke="rgba(0,210,255,.7)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Home
            </RouterLink>
          )}

          <a
            href="#"
            style={{
              fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem",
              letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600,
              color:"#03040a", background:"linear-gradient(135deg,#00d2ff,#0077ff)",
              borderRadius:4, padding:"7px 16px", textDecoration:"none",
              transition:"opacity .2s, transform .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = ".85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            ./join
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="nh"
          onClick={() => setMenuOpen(true)}
          style={{
            background:"none", border:".5px solid rgba(255,255,255,.1)", borderRadius:5,
            padding:"7px 9px", cursor:"pointer", display:"flex", flexDirection:"column", gap:4, alignItems:"flex-end",
          }}
        >
          <span style={{ display:"block", width:20, height:1, background:"rgba(255,255,255,.7)" }} />
          <span style={{ display:"block", width:13, height:1, background:"rgba(0,210,255,.8)" }} />
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="bd"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setMenuOpen(false)}
              style={{ position:"fixed", inset:0, background:"rgba(3,4,10,.7)", backdropFilter:"blur(6px)", zIndex:998 }}
            />
            <motion.div
              key="dr"
              initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }}
              transition={{ type:"spring", stiffness:280, damping:30 }}
              style={{
                position:"fixed", top:0, right:0, bottom:0, width:"min(72vw,300px)",
                background:"rgba(5,7,16,.97)", backdropFilter:"blur(24px)",
                borderLeft:".5px solid rgba(255,255,255,.07)", zIndex:999,
                display:"flex", flexDirection:"column",
              }}
            >
              {/* Header */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 24px", borderBottom:".5px solid rgba(255,255,255,.06)" }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem", letterSpacing:"0.2em", color:"rgba(255,255,255,.88)" }}>SSDC</span>
                <button onClick={() => setMenuOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,.5)", padding:4 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>

              {/* Links */}
              <nav style={{ padding:"28px 24px", flex:1, display:"flex", flexDirection:"column", gap:0 }}>
                {isHome ? SECTIONS.map((s, i) => (
                  <motion.div key={s} initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ delay:.05 + i*.06 }}>
                    <ScrollLink to={s} smooth duration={600} offset={-80} onClick={() => setMenuOpen(false)} style={{ textDecoration:"none", display:"block" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 0", borderBottom:".5px solid rgba(255,255,255,.05)", cursor:"pointer" }}>
                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.56rem", color:"rgba(0,210,255,.5)", letterSpacing:"0.1em", minWidth:20 }}>{String(i+1).padStart(2,"0")}</span>
                        <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.4rem", letterSpacing:"0.1em", color:"rgba(255,255,255,.75)" }}>{s[0].toUpperCase() + s.slice(1)}</span>
                      </div>
                    </ScrollLink>
                  </motion.div>
                )) : (
                  <RouterLink to="/" onClick={() => setMenuOpen(false)} style={{ textDecoration:"none" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"13px 0", cursor:"pointer" }}>
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M8 1L3 6L8 11" stroke="rgba(0,210,255,.7)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.4rem", letterSpacing:"0.1em", color:"rgba(255,255,255,.75)" }}>Back to Home</span>
                    </div>
                  </RouterLink>
                )}
              </nav>

              <div style={{ padding:"18px 24px", borderTop:".5px solid rgba(255,255,255,.05)" }}>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.52rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,.18)" }}>Software Dev Club · SLIET</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarV2;