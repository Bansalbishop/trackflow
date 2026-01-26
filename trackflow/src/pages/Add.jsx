import React, { useState } from "react";
import assets from "../assets/assets";
import { createTask } from "../models/task.model";
import { createProject } from "../models/project.model";
import { useDashboard } from "../contexts/Dashboard.context";
const Add = ({ onClose }) => {
  const [activity, setActivity] = useState("task");
  const { projects, addTask, addProject } = useDashboard();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duedate, setDuedate] = useState("");

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const handleSubmit = () => {
    if (!title.trim()) return;
    if (activity === "task") {
      const newTask = createTask({
        title,
        description,
        duedate,
        projectId: selectedProjectId,
      });
      addTask(newTask);

      setSelectedProjectId(null);
    } else {
      const newProject = createProject({ title, description, duedate });
      addProject(newProject);
    }
    setTitle("");
    setDescription("");
    setDuedate("");
    
      onClose();
    
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal Box */}
      <div className="relative z-50 w-[90%] border-2 border-gray-200 hover:border-blue-400 max-w-md bg-white rounded-2xl shadow-xl p-6 animate-scaleIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-extrabold">Add Activity</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-gray-500">Create a new task or project here.</p>
          <div className="flex items-center justify-center gap-5">
            <img
              src={assets.task_logo}
              className={`w-20 cursor-pointer border-white   shadow-lg p-2 border-2  rounded-lg ${activity === "task" ? "bg-blue-500 border-white" : "hover:border-black"}`}
              onClick={() => setActivity("task")}
              alt=""
            />
            <img
              src={assets.project_logo}
              onClick={() => setActivity("project")}
              className={`w-20 cursor-pointer  shadow-lg p-2 border-2 border-white rounded-lg ${activity === "project" ? "bg-blue-500 border-white" : "hover:border-black"}`}
              calt=""
            />
          </div>
          <p className="text-gray-500">
            {activity === "task" ? "Task Details:" : "Project Details"}
          </p>

          {/* Example inputs (you can replace later) */}
          <input
            type="text"
            required
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Description"
            required
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {activity === "task" ? (
            <select
              value={selectedProjectId ?? ""}
              onChange={(e) =>
                setSelectedProjectId(
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Task related to project or individual</option>
              <option value="">Individual</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          ) : null}

          <input
            required
            type="date"
            onChange={(e) => {
              setDuedate(e.target.value);
            }}
            placeholder="Tentative date for completion"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
