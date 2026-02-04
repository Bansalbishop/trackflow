import React, { useState } from "react";
import assets from "../assets/assets";
import MylistCard from "./MylistCard";
import { useDashboard } from "../contexts/Dashboard.context";

const Dashlist = ({
  tasks,
  projects,
  activeFilter,
  setAddState,
  onAddClick,
}) => {
  const { toggleTask, changeProject, downloadCSV, restoreFromCSV } =
    useDashboard();
  const [activeTab, setActiveTab] = useState("task");

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    const d = new Date(date);

    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const isThisWeek = (date) => {
    if (!date) return false;
    const today = new Date();
    const d = new Date(date);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return d >= startOfWeek && d <= endOfWeek;
  };

  const isThisMonth = (date) => {
    if (!date) return false;
    const today = new Date();
    const d = new Date(date);

    return (
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const filterByDate = (item) => {
    if (activeFilter === "a") return true;
    if (activeFilter === "t") return isToday(item.duedate);
    if (activeFilter === "w") return isThisWeek(item.duedate);
    if (activeFilter === "m") return isThisMonth(item.duedate);

    return true;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-5">
        <h2 className="font-extrabold center text-3xl ">My List</h2>
        <div className="flex gap-2">
          <input
            type="file"
            accept=".csv"
            className="hidden"
            id="csvRestore"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              const reader = new FileReader();

              reader.onload = (ev) => {
                const ok = window.confirm(
                  "This will replace your current tasks & projects. Continue?",
                );

                if (!ok) {
                  e.target.value = "";
                  return;
                }

                restoreFromCSV(ev.target.result);
                e.target.value = "";
              };

              reader.readAsText(file);
            }}
          />
          <label
            htmlFor="csvRestore"
            title="Upload data from CSV"
            className="w-10 cursor-pointer bg-blue-300/45 rounded-full p-2 hover:scale-105 transition-all flex items-center justify-center"
          >
            <img src={assets.upload_logo} alt="Restore" />
          </label>
          <img
          title="Download data"
            src={assets.download_logo}
            alt="Download all data"
            onClick={downloadCSV}
            className="w-11 cursor-pointer bg-blue-300/45 rounded-full p-2 hover:scale-105 transition-all"
          />
          <img
            src={assets.plus_icon}
            alt="add"
            onClick={onAddClick}
            className="w-11 cursor-pointer bg-blue-300/45 rounded-full p-2 hover:scale-105 transition-all"
          />
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex justify-center gap-4 my-2 mb-1">
          <button
            onClick={() => {
              setActiveTab("task");
              setAddState("task");
            }}
            className={`border-2 px-4 py-1 rounded-full transition-all ${
              activeTab === "task"
                ? "bg-blue-500 text-white scale-110"
                : "border-gray-300 text-gray-500"
            }`}
          >
            Tasks
          </button>

          <button
            onClick={() => {
              setActiveTab("project");
              setAddState("project");
            }}
            className={`border-2 px-4 py-1 rounded-full transition-all ${
              activeTab === "project"
                ? "bg-blue-500 text-white scale-110"
                : "border-gray-300 text-gray-500"
            }`}
          >
            Projects
          </button>
        </div>
        <div className="flex justify-evenly mb-9 mt-1">
          <div className="flex gap-1 items-center">
            <button className="bg-white-500 border-2 border-black-500 p-2 rounded-lg"></button>
            <p>Pending</p>
          </div>

          <div className="flex gap-1 items-center">
            <button className="bg-yellow-500 border-2 border-yellow-500 p-2 rounded-lg"></button>
            <p>Ongoing</p>
          </div>

          <div className="flex gap-1 items-center">
            <button className="bg-green-500 border-2 border-green-500 p-2 rounded-lg"></button>
            <p>Done</p>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="h-[45vh] hide-scrollbar overflow-y-auto">
        {activeTab === "task"
          ? [...tasks]
              .filter(filterByDate)
              .sort((a, b) => {
                if (a.isdone !== b.isdone) {
                  return a.isdone ? 1 : -1;
                }
                if (!a.duedate) return 1;
                if (!b.duedate) return -1;
                return new Date(a.duedate) - new Date(b.duedate);
              })
              .map((task) => (
                <MylistCard
                  key={task.id}
                  task={task}
                  trueState="task"
                  onToggle={toggleTask}
                  onClick={() => window.open(task.link)}
                />
              ))
          : [...projects]
              .filter(filterByDate)
              .sort((a, b) => {
                if ((a.status === "completed") - (b.status === "completed")) {
                  return a.status === "completed" ? 1 : -1;
                }

                if (!a.duedate) return 1;
                if (!b.duedate) return -1;

                return new Date(a.duedate) - new Date(b.duedate);
              })
              .map((project) => (
                <MylistCard
                  key={project.id}
                  task={project}
                  trueState="project"
                  onToggle={changeProject}
                  onClick={() => window.open(project.link)}
                />
              ))}
      </div>
    </div>
  );
};

export default Dashlist;
