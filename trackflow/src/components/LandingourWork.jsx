import React from "react";
import LandingserviceTitle from "./LandingserviceTitle";
import assets from "../assets/assets";

const LandingourWork = () => {
  const workData = [
    {
      title: "📁 Smart File Organization",
      desc: "Automatically organize files into folders with intuitive sorting and search capabilities.",
      image: assets.work_fitness_app,
    },
    {
      title: "📊 Personalized Dashboard Access",
      desc: "Access your files through a centralized dashboard with clear insights and controls.",
      image: assets.work_dashboard_management,
    },
    {
      title: "🔍 Quick Search & Preview",
      desc: "Instantly locate files and preview documents without opening or downloading them.",
      image: assets.work_mobile_app,
    },
  ];

  return (
    <div
      id="working"
      className="flex flex-col items-center gap-7 px-4 sm:px-12 scroll-mt-30 lg:px-24 xl:px-40 text-gray-700 mt-20"
    >
      <LandingserviceTitle
        title="Our Services"
        desc="We provide a range of services to help you manage your tasks efficiently."
      />
      <div className="grid mt-10 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {workData.map((work, index) => (
          <div
            key={index}
            className="hover:scale-102 duration-500 transition:all cursor-pointer"
          >
            <img src={work.image} className="w-full rounded-xl"></img>
            <h3 className="mt-3 mb-2 text-lg font-semibold">{work.title}</h3>
            <p className="text-gray-500">{work.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingourWork;
