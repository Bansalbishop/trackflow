import React from "react";
import LandingNavbar from "../components/LandingNavbar";
import LandingHero from "../components/LandingHero";
import LandingsServices from "../components/LandingsServices";

function HomePage() {
  return (
    <>
      <div className="relative z-40 sticky top-0">
        <LandingNavbar />
      </div>
      <div className="">
        <LandingHero />
      </div>
      <div className="">
        <LandingsServices />
      </div>
    </>
  );
}

export default HomePage;
