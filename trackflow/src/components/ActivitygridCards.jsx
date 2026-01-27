import assets from "../assets/assets";
import { useDashboard } from "../contexts/Dashboard.context";

const ActivitygridCards = ({ task, whichState, onViewNote, onToggle }) => {
  const {
    id,
    title,
    description,
    projectId,
    isdone,
    link,
    duedate,
    image,
    status,
  } = task;

  const { deleteTask, deleteProject, projects } = useDashboard();
  let label = "";
  let badgeClass = "";

  if (whichState === "alltasks") {
    if (isdone) {
      label = "Done";
      badgeClass = "bg-green-50 text-green-600 border-green-300";
    } else {
      label = "Pending";
      badgeClass = "bg-gray-50 text-gray-500 border-gray-300";
    }
  } else {
    if (status === "completed") {
      label = "Done";
      badgeClass = "bg-green-50 text-green-600 border-green-300";
    } else if (status === "stopped") {
      label = "Pending";
      badgeClass = "bg-gray-50 text-gray-600 border-gray-300";
    } else {
      label = "Ongoing";
      badgeClass = "bg-yellow-50 text-yellow-600 border-yellow-300";
    }
  }

  return (
    <div className="flex flex-col h-[260px] border mx-1 mb-1 border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all bg-white">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <img
          src={image}
          className="w-11 h-11 bg-gray-100 p-2 rounded-lg flex-shrink-0"
          alt="icon"
        />

        <h3 className="font-bold text-base truncate flex-1">{title}</h3>

        <span className={`text-xs px-3 py-1 rounded-full border ${badgeClass}`}>
          {label}
        </span>
      </div>
      {whichState === "alltasks" && projectId ? (
        <div>
          <p className="text-xs text-blue-400">
            Project:{" "}
            {projects.find((project) => project.id === projectId)?.title}
          </p>
        </div>
      ) : null}

      {/* DESCRIPTION */}
      <div className="mt-3 bg-gray-100 rounded-lg p-3 flex-1 overflow-hidden">
        <p className="text-sm text-gray-500 max-h-full overflow-y-auto pr-1">
          {description}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="mt-auto">
        <div className="flex justify-center gap-6 my-3">
          <button
            title="View Notes"
            onClick={() => onViewNote(task)}
            className="w-11 h-11 flex items-center justify-center rounded-lg bg-yellow-400 hover:scale-105 transition"
          >
            <img src={assets.noteicon} className="w-5" />
          </button>
          <button
            title="Open Link"
            onClick={() => window.open(link)}
            className="w-11 h-11 flex items-center justify-center rounded-lg bg-blue-300 hover:scale-105 transition"
          >
            <img src={assets.linkicon} className="w-5" />
          </button>
          <button
            onClick={() => onToggle(id)}
            title="Mark as Done/ Undone"
            className={`w-11 h-11 flex items-center justify-center rounded-lg transition hover:scale-105 ${
              whichState === "alltasks"
                ? isdone
                  ? "bg-green-500 text-green-600 border-green-300"
                  : "bg-gray-500 text-gray-500 border-gray-300"
                : status === "completed"
                  ? "bg-green-500 text-green-600 border-green-300"
                  : status === "stopped"
                    ? "bg-gray-200 text-gray-600 border-gray-300"
                    : "bg-yellow-300 text-yellow-600 border-yellow-300"
            }`}
          >
            <img src={assets.donelogo} className="w-5" />
          </button>

          <button
            onClick={() => {
              whichState === "alltasks" ? deleteTask(id) : deleteProject(id);
            }}
            title="Delete"
            className="w-11 h-11 flex items-center justify-center rounded-lg bg-red-600 hover:scale-105 transition"
          >
            <img src={assets.deletelogo} className="w-5" />
          </button>
        </div>

        <p className="text-xs text-center text-gray-400">{duedate}</p>
      </div>
    </div>
  );
};

export default ActivitygridCards;
