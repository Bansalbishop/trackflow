import assets from "../assets/assets";

export const createProject = ({ title, duedate, description }) => {
  return {
    id: Date.now(),
    title,
    description,
    duedate,
    image: assets.project_logo,
    status: "stopped", // ongoing | completed
    createdAt: new Date().toISOString(),
  };
};
