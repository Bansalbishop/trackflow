import React, { useEffect, useRef, useState } from "react";
import DashNavbar from "../components/DashNavbar";
import Dashcards from "../components/Dashcards";
import assets from "../assets/assets";
import Dashlist from "../components/Dashlist";
import { useDashboard } from "../contexts/Dashboard.context";
import RoundProgressbar from "../components/RoundProgressbar";
import LandingFooter from "../components/LandingFooter";
import DashFooter from "../components/DashFooter";
import Add from "./Add";
const Dashboard = () => {
  const [addState, setAddState] = useState("task");
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const [search, setSearch] = useState("");

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
  const [addOpen, setAddOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { tasks, projects } = useDashboard();
  const taskdoneCount = tasks.filter((task) => task.isdone).length;
  const taskpendingCount = tasks.filter((task) => !task.isdone).length;
  const projectdoneCount = projects.filter(
    (project) => project.status === "completed",
  ).length;
  const projectpendingCount = projects.filter(
    (project) => project.status === "stopped",
  ).length;
  const projectongoingCount = projects.filter(
    (project) => project.status === "started",
  ).length;
  const [activeFilter, setActiveFilter] = useState("a");

  return (
    <>
      <div
        className={`relative bg-blue-600/10 pb-10 ${addOpen ? "blur-sm pointer-events-none" : ""}`}
      >
        <DashNavbar
          search={search}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          setSearch={setSearch}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
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
                title="Total Tasks"
                num={tasks.length}
                image={assets.task_done_logo}
              />
              <Dashcards
                title="Total Projects"
                num={projects.length}
                image={assets.project_done_logo}
              />
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-evenly">
            <div className="flex mx-5 my-10 rounded-2xl p-4 sm:ml-5 md:ml-20 lg:ml-40 text-black bg-white gap-10 sm:gap-0  flex-col shadow-lg sm:flex-row justify-between  items-center md:w-1/3 lg:w-1/4">
              <Dashlist
                search={search}
                activeFilter={activeFilter}
                setAddState={setAddState}
                onAddClick={() => setAddOpen(true)}
              />
            </div>
            <div className="  md:w-2/3 flex items:center md:items-start bg-transparent my-10 mx-5 sm:mr-5 md:mr-20 lg:mr-40 rounded-2xl  text-black gap-5  flex-col lg:flex-row justify-evenly">
              <div className="bg-white shadow-lg rounded-2xl py-10 px-4">
                <RoundProgressbar
                  state={"task"}
                  total={tasks.length}
                  pending={taskpendingCount}
                  ongoing={0}
                  completed={taskdoneCount}
                  activityType={"task"}
                />
              </div>
              <div className="bg-white shadow-lg rounded-2xl py-10 px-4">
                <RoundProgressbar
                  state={"project"}
                  total={projects.length}
                  pending={projectpendingCount}
                  ongoing={projectongoingCount}
                  completed={projectdoneCount}
                  activityType={"project"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex mx-5 rounded-2xl p-4 sm:mx-5 md:mx-20 lg:mx-40 text-black bg-white gap-10 sm:gap-0 flex-col shadow-lg sm:flex-row justify-between items-center">
          <DashFooter />
        </div>
      </div>
      <div>{addOpen && <Add addState={addState} setAddState={setAddState} onClose={() => setAddOpen(false)} />}</div>
      <div
        ref={outlineRef}
        className={`${menuOpen ? "border-white" : "border-black"} hidden md:block fixed top-0 left-0 h-10 w-10 rounded-full border border-black  pointer-events-none z-[9999]`}
      ></div>
      {/* custom cursor dot */}
      <div
        ref={dotRef}
        className={` ${menuOpen ? "bg-white" : "bg-black"} hidden md:block fixed top-0 left-0 h-3 w-3 rounded-full bg-black pointer-events-none z-[9999]`}
      ></div>
    </>
  );
};

export default Dashboard;
