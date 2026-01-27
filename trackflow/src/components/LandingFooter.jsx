import React from "react";
import assets from "../assets/assets";

const LandingFooter = () => {
  return (
    <div className="bg-slate-100 pt-10 sm:pt-10 mt-20 sm:mt-40 px-4 sm:px-10 lg:px-24 xl:px-40">
      {/* footer top */}
      <div className="flex justify-between lg:items-center max-lg:flex-col gap-10">
        <div>
          <p className="text-black text-2xl sm:text-3xl md:text-3xl font-extrabold  lg:text-4xl font-serif py-4">
            TaskFLow
          </p>
          <p className="max-w-md">
            It will multiply your productivity by tracking and managing the flow
            of your tasks.
          </p>
          <ul className="flex gap-4 mt-5">
            <li>
              <a className=" hover:border-b-2" href="#home">
                Home
              </a>
            </li>
            <li>
              <a className=" hover:border-b-2" href="#services">
                Services
              </a>
            </li>
            <li>
              <a className=" hover:border-b-2" href="#working">
                Working
              </a>
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

export default LandingFooter;
