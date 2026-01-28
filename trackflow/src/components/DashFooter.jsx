import React from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage";

const DashFooter = () => {
  const navigate = useNavigate();
  const goLandingPage = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col w-full">
      {/* footer top */}
      <div className="flex justify-between lg:items-center max-lg:flex-col gap-10">
        <div>
          <p
            onClick={goLandingPage}
            className="text-black cursor-pointer text-2xl sm:text-3xl md:text-3xl font-extrabold  lg:text-4xl font-serif py-4"
          >
            TaskFlow
          </p>
          <p className="max-w-md">
            It will multiply your productivity by tracking and managing the flow
            of your tasks.
          </p>
          <ul className="flex gap-4 mt-5">
            <li>
              <p
                className=" hover:border-b-2 cursor-pointer"
                href=""
                onClick={() => navigate("/aboutus")}
              >
                About Us
              </p>
            </li>
            <li>
              <p
                className=" cursor-pointer hover:border-b-2"
                onClick={() => navigate("/termsconditions")}
              >
                Terms & Conditions
              </p>
            </li>
            <li>
              <p
                className=" hover:border-b-2 cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </p>
            </li>
          </ul>
        </div>
        <div className="text-gray-600 ">
          <h3 className="font-semibold">Subscribe to Our Newsletter</h3>
          <p className="text-sm mt-2 pb-6">
            The latest news, articles, and resources, sent to your inbox weekly
          </p>
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 text-sm outline-none rounded bg-transparent border border-gray-300 "
            ></input>
            <button className="bg-indigo-500 text-white rounded px-6  mt-4">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 my-6"></hr>

      <div className="pb-6 text-sm text-gray-500 flex justify-center sm:justify-between gap-4 flex-wrap">
        <p>Copyright 2026 - TaskFlow - All Right Reserved. </p>

        <div className="flex items-center justify-between gap-4 cursor-pointer">
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.twitter_icon} alt="" />
          <img src={assets.instagram_icon} alt="" />
          <img src={assets.linkedin_icon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default DashFooter;
