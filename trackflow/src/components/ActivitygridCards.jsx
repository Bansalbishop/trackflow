import assets from "../assets/assets";
import { useDashboard } from "../contexts/Dashboard.context";

const ActivitygridCards = ({ task, whichState, onViewNote, onToggle }) => {
  const { id, title, description, projectId, isdone, duedate, image, status } =
    task;

  const { deleteTask, projects } = useDashboard();

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

        <span
          className={`text-xs px-3 py-1 rounded-full border ${
            whichState === "alltasks"
              ? isdone
                ? "bg-green-50 text-green-600 border-green-300"
                : "bg-gray-50 text-gray-500 border-gray-300"
              : status === "started"
                ? "bg-green-50 text-green-600 border-green-300"
                : status === "ongoing"
                  ? "bg-yellow-50 text-yellow-600 border-green-300"
                  : "bg-gray-50 text-gray-600 border-gray-300"
          }`}
        >
          {whichState === "alltasks"
            ? isdone
              ? "Done"
              : "Pending"
            : status === "started"
              ? "Done"
              : status === "ongoing"
                ? "Ongoing"
                : "Done"}
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
            onClick={() => onToggle(id)}
            title="Mark as Done/ Undone"
            className={`w-11 h-11 flex items-center justify-center rounded-lg transition hover:scale-105 ${
              isdone ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <img src={assets.donelogo} className="w-5" />
          </button>

          <button
            onClick={() => deleteTask(id)}
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
