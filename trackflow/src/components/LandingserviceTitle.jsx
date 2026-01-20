import React from "react";

const LandingserviceTitle = ({ title, desc }) => {
  return (
    <>
      <h2 className="text-3xl sm:text-5xl font-medium">{title}</h2>
      <p className="max-w-lg text-center text-gray-500 ">{desc}</p>
    </>
  );
};

export default LandingserviceTitle;
