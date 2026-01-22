import React, { useEffect, useRef } from "react";
import LandingNavbar from "../components/LandingNavbar";
import LandingHero from "../components/LandingHero";
import LandingsServices from "../components/LandingsServices";
import LandingourWork from "../components/LandingourWork";
import Landingcontactus from "../components/Landingcontactus";
import { Toaster } from "react-hot-toast";
import LandingFooter from "../components/LandingFooter";
function HomePage() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    document.addEventListener("mousemove", handleMouseMove);
    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.05;
      position.current.y += (mouse.current.y - position.current.y) * 0.05;
      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 6}px,${mouse.current.y - 6}px, 0)`;
        outlineRef.current.style.transform = `translate3d(${position.current.x - 20}px,${position.current.y - 20}px, 0)`;
      }
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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

        {/* custom cursor ring */}

        <div
          ref={outlineRef}
          className="fixed top-0 left-0 h-10 w-10 rounded-full border border-black  pointer-events-none z-[9999]"
        ></div>
        {/* custom cursor dot */}
        <div
          ref={dotRef}
          className="fixed top-0 left-0 h-3 w-3 rounded-full bg-black pointer-events-none z-[9999]"
        ></div>
      </div>
    </>
  );
}

export default HomePage;
