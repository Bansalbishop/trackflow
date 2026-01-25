import { createContext, useContext, useEffect, useState } from "react";
import assets from "../assets/assets";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    return (
       [
        {
          id: 180000002001,
          image: assets.task_logo,
          title: "Design homepage layout",
          description:
            "Create wireframe and UI layout for the portfolio homepage.",
          isdone: false,
          duedate: "2026-02-01",
          projectId: 170000001001,
          createdAt: "2026-01-21T10:10:00.000Z",
        },
        {
          id: 180000002002,
          image: assets.task_logo,
          title: "Create navbar and footer",
          description: "Implement responsive navbar and footer using Tailwind.",
          isdone: true,
          duedate: "2026-01-30",
          projectId: 170000001001,
          createdAt: "2026-01-20T11:00:00.000Z",
        },
        {
          id: 180000002003,
          image: assets.task_logo,
          title: "Setup React project",
          description: "Initialize React app and configure folder structure.",
          isdone: true,
          duedate: "2026-01-22",
          projectId: 170000001002,
          createdAt: "2026-01-18T09:00:00.000Z",
        },
        {
          id: 180000002004,
          image: assets.task_logo,
          title: "Implement task CRUD",
          description: "Add create, update, delete functionality for tasks.",
          isdone: false,
          duedate: "2026-02-05",
          projectId: 170000001002,
          createdAt: "2026-01-23T10:30:00.000Z",
        },
        {
          id: 180000002005,
          image: assets.task_logo,
          title: "Prepare documentation",
          description: "Write project documentation and README file.",
          isdone: true,
          duedate: "2026-01-15",
          projectId: 170000001003,
          createdAt: "2026-01-12T13:45:00.000Z",
        },
        {
          id: 180000002006,
          image: assets.task_logo,
          title: "Record demo video",
          description: "Record and edit demo video for project submission.",
          isdone: false,
          duedate: "2026-02-02",
          projectId: 170000001003,
          createdAt: "2026-01-25T15:00:00.000Z",
        },
        {
          id: 180000002007,
          image: assets.task_logo,
          title: "Plan weekly video topics",
          description: "Decide topics and outline content for upcoming videos.",
          isdone: false,
          duedate: "2026-01-29",
          projectId: 170000001004,
          createdAt: "2026-01-22T10:00:00.000Z",
        },
        {
          id: 180000002008,
          image: assets.task_logo,
          title: "Write video script",
          description: "Write a detailed script for the next YouTube video.",
          isdone: false,
          duedate: "2026-02-03",
          projectId: 170000001004,
          createdAt: "2026-01-24T09:20:00.000Z",
        },
        {
          id: 180000002009,
          image: assets.task_logo,
          title: "Organize cloud notes",
          description: "Sort and structure cloud computing notes topic-wise.",
          isdone: true,
          duedate: "2026-01-20",
          projectId: 170000001005,
          createdAt: "2026-01-19T08:40:00.000Z",
        },
        {
          id: 180000002010,
          image: assets.task_logo,
          title: "Revise AWS basics",
          description: "Revise AWS core services and deployment models.",
          isdone: false,
          duedate: "2026-02-06",
          projectId: 170000001005,
          createdAt: "2026-01-26T16:00:00.000Z",
        },
        {
          id: 180000002011,
          image: assets.task_logo,
          title: "Morning workout",
          description: "Complete daily workout routine for fitness.",
          isdone: true,
          duedate: "2026-01-26",
          projectId: null,
          createdAt: "2026-01-25T06:30:00.000Z",
        },
        {
          id: 180000002012,
          image: assets.task_logo,
          title: "Solve one LeetCode problem",
          description:
            "Solve at least one DSA problem to maintain consistency.",
          isdone: false,
          duedate: "2026-01-26",
          projectId: null,
          createdAt: "2026-01-25T22:00:00.000Z",
        },
      ]
    );
  });
  const [projects, setProjects] = useState(() => {
    return (
       [
        {
          id: 170000001001,
          title: "Portfolio Website",
          description:
            "Build a personal portfolio website to showcase projects and skills.",
          duedate: "2026-02-10",
          image: assets.project_logo,
          status: "stopped",
          createdAt: "2026-01-20T10:00:00.000Z",
        },
        {
          id: 170000001002,
          title: "Task Manager App",
          description:
            "A full-stack task manager with projects, tasks, and progress tracking.",
          duedate: "2026-02-25",
          image: assets.project_logo,
          status: "started",
          createdAt: "2026-01-18T08:30:00.000Z",
        },
        {
          id: 170000001003,
          title: "College Mini Project",
          description:
            "Semester mini project required for internal evaluation.",
          duedate: "2026-03-05",
          image: assets.project_logo,
          status: "completed",
          createdAt: "2026-01-10T12:15:00.000Z",
        },
        {
          id: 170000001004,
          title: "YouTube Content Planner",
          description:
            "Plan, script, and schedule YouTube videos for the channel.",
          duedate: "2026-02-28",
          image: assets.project_logo,
          status: "started",
          createdAt: "2026-01-22T09:45:00.000Z",
        },
        {
          id: 170000001005,
          title: "Cloud Computing Notes",
          description:
            "Prepare structured notes for Cloud Computing subjects and exams.",
          duedate: "2026-03-15",
          image: assets.project_logo,
          status: "stopped",
          createdAt: "2026-01-25T14:20:00.000Z",
        },
      ]
    );
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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
