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
  const downloadCSV = () => {
    const headers = [
      "type",
      "id",
      "title",
      "description",
      "note",
      "duedate",
      "link",
      "projectId",
      "isdone",
      "status",
      "createdAt",
    ];

    const rows = [];

    tasks.forEach((t) => {
      rows.push([
        "task",
        t.id,
        t.title ?? "",
        t.description ?? "",
        t.note ?? "",
        t.duedate ?? "",
        t.link ?? "",
        t.projectId ?? "",
        t.isdone,
        "", // status not for tasks
        t.createdAt ?? "",
      ]);
    });

    projects.forEach((p) => {
      rows.push([
        "project",
        p.id,
        p.title ?? "",
        p.description ?? "",
        p.note ?? "",
        p.duedate ?? "",
        p.link ?? "",
        "", // projectId not for projects
        "", // isdone not for projects
        p.status ?? "stopped",
        p.createdAt ?? "",
      ]);
    });

    if (rows.length === 0) {
      alert("No data to export");
      return;
    }

    const csv =
      headers.join(",") +
      "\n" +
      rows
        .map((row) =>
          row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","),
        )
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard-backup.csv";
    a.click();

    URL.revokeObjectURL(url);
  };
  const restoreFromCSV = (csvText) => {
    const lines = csvText.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.replace(/"/g, ""));

    const rows = lines.slice(1).map((line) => {
      const values = line
        .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        .map((v) => v.replace(/^"|"$/g, "").replace(/""/g, '"'));

      const obj = {};
      headers.forEach((h, i) => (obj[h] = values[i]));
      return obj;
    });

    const restoredTasks = [];
    const restoredProjects = [];

    rows.forEach((r) => {
      if (r.type === "task") {
        restoredTasks.push({
          id: Number(r.id),
          title: r.title,
          description: r.description,
          note: r.note,
          duedate: r.duedate || null,
          link: r.link,
          projectId: r.projectId ? Number(r.projectId) : null,
          isdone: r.isdone === "true",
          createdAt: r.createdAt,
          image: assets.task_logo,
        });
      }

      if (r.type === "project") {
        restoredProjects.push({
          id: Number(r.id),
          title: r.title,
          description: r.description,
          note: r.note,
          duedate: r.duedate || null,
          link: r.link,
          status: r.status || "stopped",
          createdAt: r.createdAt,
          image: assets.project_logo,
        });
      }
    });

    setTasks(restoredTasks);
    setProjects(restoredProjects);
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
        restoreFromCSV,
        downloadCSV,
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
