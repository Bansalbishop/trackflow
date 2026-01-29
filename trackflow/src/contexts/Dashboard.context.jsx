import { createContext, useContext, useEffect, useState } from "react";
import assets from "../assets/assets";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    return storedTasks.map((task) => ({
      ...task,
      image: assets.task_logo, // 🔥 force new image once
    }));
  });

  const [projects, setProjects] = useState(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    return storedProjects.map((project) => ({
      ...project,
      image: assets.project_logo, // 👈 project image
    }));
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };
  const addProject = (project) => {
    setProjects((prev) => [...prev, project]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id != id));
  };

  const deleteProject = (id) => {
    setTasks((prev) => prev.filter((task) => task.projectId != id));
    setProjects((prev) => prev.filter((project) => project.id != id));
  };
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isdone: !task.isdone } : task,
      ),
    );
  };
  const updateTaskNote = (id, note) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, note } : task)),
    );
  };
  const updateProjectNote = (id, note) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, note } : project,
      ),
    );
  };
  const changeProject = (id) => {
    // PROJECT: cycle through statuses
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id !== id) return project;

        let nextStatus;
        switch (project.status) {
          case "stopped":
            nextStatus = "started";
            break;
          case "started":
            nextStatus = "completed";
            break;
          case "completed":
            nextStatus = "stopped";
            break;
          default:
            nextStatus = "stopped";
        }

        return {
          ...project,
          status: nextStatus,
        };
      }),
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        tasks,
        projects,
        addTask,
        deleteTask,
        toggleTask,
        addProject,
        deleteProject,
        changeProject,
        updateTaskNote,
        updateProjectNote,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
