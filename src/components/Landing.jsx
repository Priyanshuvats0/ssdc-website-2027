import React from "react";
import HeroSection from "./HeroSection";
import DescriptionSection from "./DescriptionSection";
import WhySSDC from "./WhySSDC";
import EventsSection from "./EventsSection";
import Carousel from "./Carousel";
import TeamSection from "./TeamSection";
import HeroSectionV2 from "./HeroSectionV2";

const Landing = () => {
  return (
    <div className="bg-transparent text-white px-6 sm:px-10 lg:px-16">
      {/* <HeroSection /> */}
      <HeroSectionV2/>
      <DescriptionSection />
      <WhySSDC/>
      <EventsSection/>
      <Carousel/>
      <TeamSection/>
    </div>
  );
};



export default Landing;
