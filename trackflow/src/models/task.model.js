import assets from "../assets/assets";

export const createTask = ({ title, description,duedate, projectId }) => {
  return {
    id: Date.now(),
    image:assets.task_logo,
    title,
    description,
    isdone: false,
    duedate, // string: "2026-02-01"
    projectId, // null = normal task, else belongs to project
    createdAt: new Date().toISOString(),
  };
};
