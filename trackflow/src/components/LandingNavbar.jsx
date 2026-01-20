import React, { useState } from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

function LandingNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex justify-between relative items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium  ">
      <p className="text-black text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-serif  font-bold py-4">
        TaskFLow
      </p>

      <div
        className={`text-gray-700  sm:text-sm ${!sidebarOpen ? "max-sm:w-0 overflow-hidden" : "max-sm:w-60 max-sm:pl-10"}   max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-black max-sm:text-white max-sm:pt-20 flex sm:items-center gap-5 transition-all`}
      >
        <img
          src={assets.close_icon}
          className="w-5 absolute right-4 top-4 sm:hidden "
          onClick={() => setSidebarOpen(false)}
        ></img>

        <a
          href="#home"
          className="sm:hover:border-b"
          onClick={() => setSidebarOpen(false)}
        >
          Home
        </a>
        <a
          href="#services"
          onClick={() => setSidebarOpen(false)}
          className="sm:hover:border-b"
        >
          Services
        </a>
        <a href="#working" className="sm:hover:border-b">
          Working
        </a>

        <a
          href="#contact"
          onClick={() => setSidebarOpen(false)}
          className="sm:hover:border-b"
        >
          Contact
        </a>
      </div>

      <div>
        <img
          src={assets.menu_icon}
          className="w-6 sm:hidden cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        ></img>
        <Link
          to="/signup"
          className="bg-black text-white text-sm max-sm:hidden flex items-center gap-2 px-6 py-2 rounded-full cursor-pointer hover:scale-103 transition-all"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default LandingNavbar;
