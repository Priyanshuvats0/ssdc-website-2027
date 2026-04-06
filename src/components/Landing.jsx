import React from "react";
import HeroSection from "./HeroSection";
import DescriptionSection from "./DescriptionSection";
import WhySSDC from "./WhySSDC";
import EventsSection from "./EventsSection";
import Carousel from "./Carousel";
import TeamSection from "./TeamSection";

const Landing = () => {
  return (
    <div className="bg-black text-white px-6 sm:px-10 lg:px-16">
      <HeroSection />
      <DescriptionSection />
      <WhySSDC/>
      <EventsSection/>
      <Carousel/>
      <TeamSection/>
    </div>
  );
};



export default Landing;
