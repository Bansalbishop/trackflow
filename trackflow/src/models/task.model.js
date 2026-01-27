import assets from "../assets/assets";

export const createTask = ({ title, description,duedate, projectId,note,link }) => {
  return {
    id: Date.now(),
    image:assets.task_logo,
    title,
    description,
    isdone: false,
    note,
    link,
    duedate, // string: "2026-02-01"
    projectId, // null = normal task, else belongs to project
    createdAt: new Date().toISOString(),
  };
};
