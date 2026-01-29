import { useState } from "react";
import assets from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useDashboard } from "../contexts/Dashboard.context";
import { useLocation } from "react-router-dom";

const DashNavbar = ({
  activeFilter,
  menuOpen,
  setSelectedProject,
  selectedProject,
  setMenuOpen,
  setActiveFilter,
  setSearch,
}) => {
  const navigate = useNavigate();
  const { projects } = useDashboard();
  const location = useLocation();
  const pathname = location.pathname;

  const [projectPickerOpen, setProjectPickerOpen] = useState(null);

  return (
    <>
      <div className="flex justify-evenly relative items-center text-black border-b-2 bg-black border-gray-200 px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 bg-white/85 backdrop-blur-xl font-medium   ">
        <p
          onClick={() => navigate("/")}
          className=" cursor-pointer text-black text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-serif  font-bold py-4 px-6"
        >
          TaskFlow
        </p>
        <div className="flex gap-4 items-center ">
          <div className="relative flex items-center gap-2 border-2 border-gray-300 rounded-full px-3 py-1 w-60 md:w-80">
            {/* Selected Project Chip */}
            {selectedProject && (
              <>
              <div
                className=" flex-col items-center bg-blue-500 hidden sm:flex whitespace-nowrap text-white w-20  overflow-hidden relative text-xs px-3 py-1 rounded-xl"
                onClick={() => setSelectedProject(null)}
              >
                {selectedProject.title}
                <span className="text-[8px]">Tap to Close</span>
              </div>
              <div
                className="flex flex-col items-center bg-blue-500 block sm:hidden whitespace-nowrap text-white w-20  overflow-hidden relative text-xs px-3 py-1 rounded-xl"
                onClick={() => setSelectedProject(null)}
              >
                <span title="Close">X</span>                
              </div></>
            )}

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none bg-transparent px-2"
            />

            {/* Project Picker Icon */}
            {!pathname.includes("/allprojects") && !selectedProject && (
              <img
                src={assets.project_logo}
                title="select project"
                onClick={() => setProjectPickerOpen(true)}
                className="w-7 absolute right-3 bg-blue-300  p-1 rounded-sm cursor-pointer"
              />
            )}

            {projectPickerOpen && (
              <div className="absolute top-full mt-2 left-0 w-full bg-white shadow-xl rounded-xl z-50 overflow-hidden">
                {projects.length === 0 && (
                  <p className="px-4 py-3 text-sm text-gray-400">No projects</p>
                )}

                {projects.map((project) => (
                  <>
                    <div
                      key={project.id}
                      onClick={() => {
                        setSelectedProject(project);
                        setProjectPickerOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                    >
                      {project.title}
                    </div>
                  </>
                ))}
                {
                  <div
                    onClick={() => {
                      setSelectedProject(null);
                      setProjectPickerOpen(false);
                    }}
                    className="px-4 py-2 bg-red-300 cursor-pointer text-sm"
                  >
                    Close X
                  </div>
                }
              </div>
            )}
          </div>

          <div className="hidden md:grid grid-cols-2">
            <button
              title="Today"
              onClick={() => setActiveFilter("t")}
              className={`border cursor-pointer border-gray-300 rounded-full px-2 py-1 text-sm mr-2 mt-2 ${activeFilter === "t" ? "bg-blue-500 text-white" : ""}`}
            >
              T
            </button>
            <button
              title="Weekly"
              onClick={() => setActiveFilter("w")}
              className={`border cursor-pointer border-gray-300 rounded-full px-2 py-1 text-sm mr-2 mt-2 ${activeFilter === "w" ? "bg-blue-500 text-white" : ""}`}
            >
              W
            </button>
            <button
              title="Monthly"
              onClick={() => setActiveFilter("m")}
              className={`border cursor-pointer border-gray-300 rounded-full px-2 py-1 text-sm mr-2 mt-2 ${activeFilter === "m" ? "bg-blue-500 text-white" : ""}`}
            >
              M
            </button>
            <button
              title="All"
              onClick={() => setActiveFilter("a")}
              className={`border cursor-pointer border-gray-300 rounded-full px-2 py-1 text-sm mr-2 mt-2 ${activeFilter === "a" ? "bg-blue-500 text-white" : ""}`}
            >
              A
            </button>
          </div>

          <div className="hidden md:flex gap-4  items-center ">
            <Link
              to="/dashboard"
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
          className="w-6 h-6 md:w-9 md:h-9 rounded-full m-4"
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
            <button
              title="today"
              onClick={() => setActiveFilter("t")}
              className={`border cursor-pointer border-gray-300 rounded-full px-2 py-1 text-sm mr-2 mt-2 ${activeFilter === "t" ? "bg-blue-500 text-white" : ""}`}
            >
              T
            </button>
            <button
              title="weekly"
              onClick={() => setActiveFilter("w")}
              className={`border cursor-pointer border-gray-300 rounded-full px-2 py-1 text-sm mr-2 mt-2 ${activeFilter === "w" ? "bg-blue-500 text-white" : ""}`}
            >
              W
            </button>
            <button
              title="monthly"
              onClick={() => setActiveFilter("m")}
              className={`border cursor-pointer border-gray-300 rounded-full px-2 py-1 text-sm mr-2 mt-2 ${activeFilter === "m" ? "bg-blue-500 text-white" : ""}`}
            >
              M
            </button>
            <button
              title="All"
              onClick={() => setActiveFilter("a")}
              className={`border cursor-pointer border-gray-300 rounded-full px-2 py-1 text-sm mr-2 mt-2 ${activeFilter === "a" ? "bg-blue-500 text-white" : ""}`}
            >
              A
            </button>
          </div>

          {/* Navigation Links */}
          <Link
            to="/dashboard"
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
