import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import NavbarV2 from "./components/NavbarV2";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Team from "./Pages/Team";
import FooterV2 from "./components/FooterV2";

function App() {
  return (
    // ─── No global grid bg — each section owns its own background ───────────
    // scrollbar-hide kept, flex-col added so footer always sticks to bottom
    <div className="min-h-screen bg-black text-white flex flex-col scrollbar-hide">
      <NavbarV2 />

      {/* ── NO pt-20 here — HeroSectionV2 is full-viewport and handles its   ──
           own top spacing. Inner pages that need navbar offset should add      
           pt-20 inside their own component, not globally here.               ── */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </main>

      <FooterV2 />
    </div>
  );
}

export default App;