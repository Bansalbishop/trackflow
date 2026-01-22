import React from "react";
import assets from "../assets/assets";
import LandingserviceTitle from "./LandingserviceTitle";
import LandingServiceCard from "./LandingServiceCard";

function LandingsServices() {
  const servicesData = [
    {
      title: "Task Management",
      description:
        "Organize and prioritize your tasks with ease using our intuitive task management features.",
      icon: assets.marketing_icon,
    },
    {
      title: "Visual insights",
      description:
        "Visualize your progress and performance with our powerful analytics dashboard.",
      icon: assets.content_icon,
    },
    {
      title: "Secure Local Sessions",
      description:
        "Log in securely and resume your work exactly where you stopped.",
      icon: assets.ads_icon,
    },
    {
      title: "Fast & Lightweight",
      description:
        "Built with React for blazing-fast performance and smooth user experience.",
      icon: assets.ads_icon,
    },
  ];
  return (
    <div
      id="services"
      className="relative flex flex-col items-center gap-7 scroll-smooth  px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700"
    >
      <img
        src={assets.bgImage2}
        className="absolute -top-110 -left-70 -z-1"
      ></img>

      <LandingserviceTitle
        title="How can we help?"
        desc="TrackFlow helps you stay organized, focused, and productive by bringing
your tasks, progress, and insights into one simple dashboard."
      />

      <div className="flex flex-col md:grid grid-cols-2">
        {servicesData.map((service, index) => (
          <LandingServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}

export default LandingsServices;
