import assets from "../assets/assets";

export const createProject = ({ title, duedate,note, description,link }) => {
  return {
    id: Date.now(),
    title,
    description,
    duedate,
    link,
    note,
    image: assets.project_logo,
    status: "stopped", // ongoing | completed
    createdAt: new Date().toISOString(),
  };
};
