import React from "react";
import AboutAndVision from "../Home-Page-Components/About-Club/About_Vision";
import DomainSection from "../Home-Page-Components/Doamin-Section/DomainSection";
import ProjectSection from "../Home-Page-Components/Project-Section/ProjectSection";
import Testmonials from "../Home-Page-Components/TestMonials/Testmonials";
import LandingPage from "../Home-Page-Components/Landing-Page/LandingPage";
import { About, Vision } from "../Home-Page-Components/About-Club/data";
import Landingimage from "../Images/Landing-Image/LandingImg.ecde1f8a.webp";
import MiddleBar from "../MiddleBar/MiddleBar";
import Ticker from "../Home-Page-Components/Ticker/Ticker";

// styling
import "./Home.scss";
import SocialMedia from "../SocialMedia/SocialMedia";
const Home = () => {
  const about = About;
  const vision = Vision;
  const { VisonParagraph, VisionHeading } = vision;
  const { AboutParagraph, AboutHeading } = about;
  return (
    <div className="Home-Main">
      <LandingPage />
      <Ticker />
      <AboutAndVision
        AboutHeading={AboutHeading}
        About={AboutParagraph}
        image={Landingimage}
        Vision={VisonParagraph}
        VisionHeading={VisionHeading}
      />
      <DomainSection />
      <Testmonials />
      <MiddleBar />
      <ProjectSection />
      <div className="Home-sub">
        <SocialMedia />
      </div>
    </div>
  );
};

export default Home;
