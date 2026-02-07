import { createContext, useContext, useEffect, useState } from "react";
import Papa from "papaparse";
import assets from "../assets/assets";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  /* =======================
     INITIAL STATE
  ======================= */

  const [tasks, setTasks] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    return stored.map((t) => ({ ...t, image: assets.task_logo }));
  });

  const [projects, setProjects] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("projects")) || [];
    return stored.map((p) => ({ ...p, image: assets.project_logo }));
  });

  /* =======================
     PERSISTENCE
  ======================= */

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  /* =======================
     HELPERS
  ======================= */

  const clean = (v) => (v === "" || v === undefined ? null : v);

  /* =======================
     CRUD OPERATIONS
  ======================= */

  const addTask = (task) => setTasks((p) => [...p, task]);
  const addProject = (project) => setProjects((p) => [...p, project]);

  const deleteTask = (id) => setTasks((p) => p.filter((t) => t.id !== id));

  const deleteProject = (id) => {
    setTasks((p) => p.filter((t) => t.projectId !== id));
    setProjects((p) => p.filter((pr) => pr.id !== id));
  };

  const toggleTask = (id) =>
    setTasks((p) =>
      p.map((t) => (t.id === id ? { ...t, isdone: !t.isdone } : t)),
    );

  const updateTaskNote = (id, note) =>
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, note } : t)));

  const updateProjectNote = (id, note) =>
    setProjects((p) => p.map((pr) => (pr.id === id ? { ...pr, note } : pr)));

  const changeProject = (id) =>
    setProjects((p) =>
      p.map((pr) => {
        if (pr.id !== id) return pr;
        const next =
          pr.status === "stopped"
            ? "started"
            : pr.status === "started"
              ? "completed"
              : "stopped";
        return { ...pr, status: next };
      }),
    );

  /* =======================
     CSV EXPORT
  ======================= */

  const downloadCSV = () => {
    const rows = [];

    tasks.forEach((t) =>
      rows.push({
        type: "task",
        id: t.id,
        title: t.title ?? "",
        description: t.description ?? "",
        note: t.note ?? "",
        duedate: t.duedate ?? "",
        link: t.link ?? "",
        projectId: t.projectId ?? "",
        isdone: t.isdone,
        status: "",
        createdAt: t.createdAt ?? "",
      }),
    );

    projects.forEach((p) =>
      rows.push({
        type: "project",
        id: p.id,
        title: p.title ?? "",
        description: p.description ?? "",
        note: p.note ?? "",
        duedate: p.duedate ?? "",
        link: p.link ?? "",
        projectId: "",
        isdone: "",
        status: p.status ?? "stopped",
        createdAt: p.createdAt ?? "",
      }),
    );

    if (!rows.length) return alert("No data to export");

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard-backup.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  /* =======================
     CSV IMPORT (FIXED)
  ======================= */

  const restoreFromCSV = (csvText) => {
    if (!window.confirm("This will overwrite current data. Continue?")) return;

    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length) {
          console.error("CSV errors:", results.errors);
          alert("CSV has errors. Import may be incomplete.");
        }

        const newTasks = [];
        const newProjects = [];

        results.data.forEach((r) => {
          if (r.type === "task") {
            newTasks.push({
              id: Number(r.id),
              title: clean(r.title),
              description: clean(r.description),
              note: clean(r.note),
              duedate: clean(r.duedate),
              link: clean(r.link),
              projectId: r.projectId ? Number(r.projectId) : null,
              isdone: r.isdone === "true",
              createdAt: clean(r.createdAt),
              image: assets.task_logo,
            });
          }

          if (r.type === "project") {
            newProjects.push({
              id: Number(r.id),
              title: clean(r.title),
              description: clean(r.description),
              note: clean(r.note),
              duedate: clean(r.duedate),
              link: clean(r.link),
              status: r.status || "stopped",
              createdAt: clean(r.createdAt),
              image: assets.project_logo,
            });
          }
        });

        setTasks(newTasks);
        setProjects(newProjects);
      },
    });
  };

  /* =======================
     CONTEXT
  ======================= */

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
