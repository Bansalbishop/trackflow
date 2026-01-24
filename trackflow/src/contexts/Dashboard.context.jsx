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
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };
  const changeProject = (id, status) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, status } : project,
      ),
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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
