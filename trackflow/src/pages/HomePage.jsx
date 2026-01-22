import React from "react";
import LandingNavbar from "../components/LandingNavbar";
import LandingHero from "../components/LandingHero";
import LandingsServices from "../components/LandingsServices";
import LandingourWork from "../components/LandingourWork";
import Landingcontactus from "../components/Landingcontactus";
import { Toaster } from "react-hot-toast";
import LandingFooter from "../components/LandingFooter";
function HomePage() {
  return (
    <>
      <div className="relative z-40 sticky top-0">
        <Toaster />
        <LandingNavbar />
        <LandingHero />
        <LandingsServices />
        <LandingourWork />
        <Landingcontactus />
        <LandingFooter />
      </div>
    </>
  );
}

export default HomePage;
