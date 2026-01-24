import assets from "../assets/assets";

export const createProject = ({ name }) => {
  return {
    id: Date.now(),
    name,
    image: assets.project_logo,
    status: "not started", // ongoing | completed
    createdAt: new Date().toISOString(),
  };
};
