import React from "react";
import DashNavbar from "../components/DashNavbar";
import Dashcards from "../components/Dashcards";
import assets from "../assets/assets";
import Dashlist from "../components/Dashlist";
import { useDashboard } from "../contexts/Dashboard.context";
const Dashboard = () => {
  const { tasks, projects } = useDashboard();

  return (
    <>
      <div className="relative bg-blue-400/10">
        <DashNavbar />
        <div>
          <div className="flex mx-5 my-10 rounded-2xl p-4 sm:mx-5 md:mx-20 lg:mx-40 text-black bg-white gap-10 sm:gap-0 flex-col shadow-lg sm:flex-row justify-between items-center">
            <div className="flex flex-col items-center gap-1">
              <h2 className="font-extrabold text-5xl sm:text-3xl md:text-4xl  ">
                Dashboard
              </h2>
              <h4 className="font-extrabold text-xl text-gray-400 ">
                Manage & Track
              </h4>
            </div>
            <div className="flex flex-col sm:flex-row ">
              <Dashcards
                title="Total Projects"
                num={tasks.length}
                image={assets.project_done_logo}
              />
              <Dashcards
                title="Total Tasks"
                num={projects.length}
                image={assets.task_done_logo}
              />
            </div>
          </div>

          <div className="flex mx-5 my-10 rounded-2xl p-4 sm:mx-5 md:mx-20 lg:mx-40 text-black bg-white gap-10 sm:gap-0  flex-col shadow-lg sm:flex-row justify-between  items-center md:1/3 lg:w-1/4">
            <Dashlist />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
