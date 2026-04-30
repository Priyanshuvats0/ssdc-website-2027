import React from "react";
import HeroSection from "./HeroSection";
import DescriptionSection from "./DescriptionSection";
import WhySSDC from "./WhySSDC";
import EventsSection from "./EventsSection";
import Carousel from "./Carousel";
import TeamSection from "./TeamSection";
import HeroSectionV2 from "./HeroSectionV2";
import DescriptionSectionV2 from "./DescriptionSectionV2";
import WhySSDCV2 from "./WhySSDCV2";
import EventsSectionV2 from "./Eventssectionv2 ";
import CarouselV2 from "./CarouselV2";
import TeamSectionV2 from "./TeamSectionV2";
import HeroSectionV3 from "./HeroSectionV3";

const LandingV2 = () => {
  return (
    // ⚠️  No px-* padding here — each section controls its own horizontal spacing.
    // Full-width backgrounds (hero grid, carousels, etc.) need to reach the viewport edge.
    <div className="bg-transparent text-white">
      <HeroSectionV2 />
      <DescriptionSectionV2 />
      <WhySSDCV2 />
      <EventsSectionV2 />
      <CarouselV2 />
      <TeamSectionV2 />
    </div>
  );
};

export default LandingV2;