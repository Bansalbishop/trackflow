import assets from "../assets/assets";

export const createTask = ({ title, dueDate = null, projectId = null }) => {
  return {
    id: Date.now(),
    image: assets.task_logo,
    title,
    completed: false,
    dueDate, // string: "2026-02-01"
    projectId, // null = normal task, else belongs to project
    createdAt: new Date().toISOString(),
  };
};
