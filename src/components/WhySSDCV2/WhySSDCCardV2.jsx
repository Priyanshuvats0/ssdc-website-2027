const WhySSDCCardV2 = ({ item, index, total }) => {
  return (
    <div className="ssdc-card" style={{ padding: "2rem 1.8rem", position: "relative", overflow: "hidden", cursor: "default" }}>

      {/* Scan sweep — CSS animation, always rendered, opacity toggled via CSS */}
      <div className="card-scan" style={{ position: "absolute", left: 0, right: 0, top: 0, height: 50, background: "linear-gradient(180deg,transparent,rgba(0,210,255,0.045),transparent)", pointerEvents: "none", animation: "scanMove 2.8s linear infinite" }} />

      {/* Left edge glow */}
      <div className="card-left-line" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1 }} />

      {/* Index */}
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(0,210,255,0.35)", marginBottom: "1.6rem" }}>
        {item.num} / 0{total}
      </p>

      {/* Icon */}
      <div className="card-icon-wrap" style={{ width: 48, height: 48, border: "0.5px solid", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.4rem" }}>
        <img className="card-icon" src={item.icon} alt={item.title} style={{ width: 22, height: 22, objectFit: "contain" }} />
      </div>

      {/* Title */}
      <h3 className="card-title" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", lineHeight: 1, marginBottom: "0.7rem" }}>
        {item.title}
      </h3>

      {/* Description */}
      <p className="card-desc" style={{ fontSize: "0.82rem", lineHeight: 1.7 }}>
        {item.des}
      </p>

      {/* Bottom edge glow */}
      <div className="card-bot-line" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1 }} />
    </div>
  );
};

export default WhySSDCCardV2;
