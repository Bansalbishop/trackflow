import React, { useState } from "react";
import assets from "../assets/assets";
import MylistCard from "./MylistCard";
import { useDashboard } from "../contexts/Dashboard.context";

const Dashlist = () => {
  const { tasks, projects, toggleTask, changeProject } = useDashboard();
  const [activeTab, setActiveTab] = useState("task");

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h2 className="font-extrabold text-3xl mb-5">My List</h2>
        <img
          src={assets.plus_icon}
          alt="add"
          className="w-10 cursor-pointer bg-blue-300/45 rounded-full p-2 hover:scale-105 transition-all"
        />
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 my-2 mb-10">
        <button
          onClick={() => setActiveTab("task")}
          className={`border-2 px-4 py-1 rounded-full transition-all ${
            activeTab === "task"
              ? "bg-blue-500 text-white scale-110"
              : "border-gray-300 text-gray-500"
          }`}
        >
          Tasks
        </button>

        <button
          onClick={() => setActiveTab("project")}
          className={`border-2 px-4 py-1 rounded-full transition-all ${
            activeTab === "project"
              ? "bg-blue-500 text-white scale-110"
              : "border-gray-300 text-gray-500"
          }`}
        >
          Projects
        </button>
      </div>

      {/* List */}
      <div className="h-[45vh] hide-scrollbar overflow-y-auto">
        {activeTab === "task"
          ? [...tasks]
              .sort((a, b) => a.isdone - b.isdone)
              .map((task) => (
                <MylistCard
                  key={`task-${task.id}`}
                  task={task}
                  trueState="task"
                  onToggle={toggleTask}
                />
              ))
          : [...projects]
              .sort(
                (a, b) =>
                  (a.status === "completed") -
                  (b.status === "completed")
              )
              .map((project) => (
                <MylistCard
                  key={`project-${project.id}`}
                  task={project}
                  trueState="project"
                  onToggle={changeProject}
                />
              ))}
      </div>
    </div>
  );
};

export default Dashlist;
