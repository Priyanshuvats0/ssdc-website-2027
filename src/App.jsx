import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Team from "./Pages/Team";

function App() {
  return (
    // 1. Add flex, flex-col, and min-h-screen here
    <div className="min-h-screen bg-black text-white bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:30px_30px]">
      <Navbar />
      
      {/* 2. Wrap Routes in a main tag with flex-grow */}
      {/* flex-grow forces this container to stretch and push the Footer down */}
      <main className="flex-grow pt-20"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;