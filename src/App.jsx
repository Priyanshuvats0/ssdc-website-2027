import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";
import EventPage from "./Pages/Event";
import Team from "./Pages/Team";


function App() {
  return (
    <>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </>
  );
}

export default App;
