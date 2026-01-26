import { createContext, useContext, useEffect, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [projects, setProjects] = useState(() => {
    return JSON.parse(localStorage.getItem("projects")) || [];
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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
