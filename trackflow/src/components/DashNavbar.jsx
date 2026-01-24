import React, { useState } from "react";
import assets from "../assets/assets";
import { Link } from "react-router-dom";

const DashNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex justify-evenly relative items-center text-black border-b-2 bg-black border-gray-200 px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 bg-white/85 backdrop-blur-xl font-medium   ">
        <p className="text-black text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-serif  font-bold py-4 px-6">
          TaskFLow
        </p>
        <div className="flex gap-4 items-center ">
          <input
            type="text"
            className="border-2 border-gray-300 md:w-60 lg:w-100 xl:w-120 rounded-full px-4 py-2 "
            placeholder="Search here"
          ></input>

          <div className="hidden md:grid grid-cols-2">
            <button className="border cursor-pointer border-gray-300 rounded-full px-2 py-1 text-sm mr-2 mt-2">
              T
            </button>
            <button className="border cursor-pointer border-gray-300 rounded-full px-2 py-1 text-sm mr-2 mt-2">
              W
            </button>
            <button className="border cursor-pointer border-gray-300 rounded-full px-2 py-1 text-sm mr-2 mt-2">
              M
            </button>
          </div>

          <div className="hidden md:flex gap-4  items-center ">
            <Link
              to="/signup"
              className=" text-gray-700 text-sm max-sm:hidden flex items-center cursor-pointer hover:scale-103 transition-all"
            >
              Dashboard
            </Link>

            <Link
              to="/alltasks"
              className=" text-gray-700 text-sm max-sm:hidden flex items-center  cursor-pointer hover:scale-103 transition-all"
            >
              Tasks
            </Link>

            <Link
              to="/allprojects"
              className=" text-gray-700 text-sm max-sm:hidden flex items-center cursor-pointer hover:scale-103 transition-all"
            >
              Projects
            </Link>
          </div>
        </div>

        <img
          src={assets.person_icon}
          className="w-10 h-10 rounded-full m-4"
        ></img>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl z-30"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
      </div>
      {/* Mobile Full-Screen Menu */}
      <div
        className={`fixed inset-0 bg-black text-white z-40 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-3xl"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>

        <div className="flex flex-col h-full justify-center gap-8 px-8">
          {/* T W M buttons */}
          <div className="grid grid-cols-3 gap-4">
            <button className="border rounded-full py-2">T</button>
            <button className="border rounded-full py-2">W</button>
            <button className="border rounded-full py-2">M</button>
          </div>

          {/* Navigation Links */}
          <Link
            to="/signup"
            className="text-xl"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            to="/alltasks"
            className="text-xl"
            onClick={() => setMenuOpen(false)}
          >
            Tasks
          </Link>

          <Link
            to="/allprojects"
            className="text-xl"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashNavbar;
