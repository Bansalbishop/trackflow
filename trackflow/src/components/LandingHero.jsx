import React from "react";
import assets from "../assets/assets";

const LandingHero = () => {
  return (
    <div
      id="home"
      className="flex flex-col items-center gap-6 py-10 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden text-gray-700 scroll-mt-24 "
    >
      {/* <h1 className="text-4xl sm:text-5xl md:text-6xl text-gray-500 xl:text-[84px] font-medium xl:leading-[95px] max-w-5xl">
        Wanna be <span className="text-black font-bold">Productive!</span>
        <br></br>
        <span className="text-black font-bold">Think</span>,{" "}
        <span className="text-black font-bold">Plan</span>, and{" "}
        <span className="text-black font-bold">Track</span>{" "}
      </h1> */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-gray-500 xl:text-[74px] font-medium xl:leading-[75px] max-w-5xl">
        <span className="text-black font-bold">Track</span> your work.<br></br>
        Flow through <span className="text-black font-bold">productivity</span>.
      </h1>
      <p className="text-sm sm:text-lg font-medium text-gray-500 max-w-4/5  pb-3">
        TrackFlow helps you organize tasks, manage projects, and visualize
        progress — all in one clean dashboard built for focus and speed.
      </p>

      <div className="relative">
        <img
          src={assets.hero_img}
          className=" rounded-4xl w-full max-w-5xl"
          alt=""
        />
        <img
          src={assets.bgImage1}
          className="absolute -top-40 -right-40 sm:-top-100 sm:-right-70 -z-1 filter blur-3xl opacity-90"
        ></img>
      </div>
    </div>
  );
};

export default LandingHero;
