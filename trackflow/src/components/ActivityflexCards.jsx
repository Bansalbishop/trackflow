import assets from "../assets/assets";
import { useDashboard } from "../contexts/Dashboard.context";
const ActivityflexCards = ({ task, whichState, onViewNote, onToggle }) => {
  const { id, title, description, isdone, projectId, duedate, status, image } =
    task;
  const { deleteTask, projects } = useDashboard();
  return (
    <div
      className={`flex  border-2 hover:shadow-md transition-all mb-4  border-gray-100 rounded-lg p-3 hover:border-blue-300 items-center gap-3  `}
    >
      <div>
        <img src={image} className="max-w-15 bg-gray-200 p-2 rounded-lg"></img>
      </div>

      <div className="flex-1 w-100">
        <div className="flex justify-between">
          <h3 className="font-extrabold text-xl ">{title}</h3>
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
        <div className="mt-3 bg-gray-100 rounded-lg p-3 flex-1 overflow-hidden">
          <p className="text-sm text-gray-500 max-h-full overflow-y-auto pr-1">
            {description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 w-40 items-end">
        <div className="flex gap-2">
          <img
            src={assets.noteicon}
            className="p-1 hover:scale-105 transition-all w-8 rounded-lg bg-yellow-500 text-white"
            onClick={() => onViewNote(task)}
          ></img>
          <img
            src={assets.donelogo}
            className={`p-1 hover:scale-105 transition-all w-8 rounded-lg ${isdone ? "bg-green-500" : "bg-gray-300"} text-white`}
            onClick={() => onToggle(id)}
          ></img>
          <img
            src={assets.deletelogo}
            className="p-1 hover:scale-105 w-8 transition-all  rounded-lg bg-red-700 text-white"
            onClick={() => deleteTask(id)}
          ></img>
        </div>
        <p className="text-[15px] font-extralight text-gray-400">{duedate}</p>
      </div>
    </div>
  );
};

export default ActivityflexCards;
