import assets from "../assets/assets";

export const createProject = ({ title, duedate, description,link }) => {
  return {
    id: Date.now(),
    title,
    description,
    duedate,
    link,
    image: assets.project_logo,
    status: "stopped", // ongoing | completed
    createdAt: new Date().toISOString(),
  };
};
