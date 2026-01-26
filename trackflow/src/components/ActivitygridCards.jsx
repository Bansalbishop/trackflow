import assets from "../assets/assets";
import { useDashboard } from "../contexts/Dashboard.context";
const ActivitygridCards = ({ task, onViewNote, onToggle }) => {
  const { id, title, description, isdone, duedate, image } = task;
  const { deleteTask } = useDashboard();
  return (
    <div
      className={`flex  border-2 hover:shadow-md transition-all mb-2 mx-1  border-gray-100 rounded-lg p-3 hover:border-blue-300 items-center gap-3  `}
    >
      <div>
        <img src={image} className="max-w-15 bg-gray-200 p-2 rounded-lg"></img>
      </div>

      <div className="flex-1 w-100">
        <div className="flex justify-between">
          <h3 className="font-extrabold text-xl ">{title}</h3>
          <button
            className={` text-gray-400 hover:scale-105 transition-all border-2 border-gray-300 p-1 rounded-full ${isdone ? "  px-4" : ""} `}
          >
            {isdone ? "Done" : "Pending"}
          </button>
        </div>
        <h5 className=" text-sm wrap-break-word text-gray-400">
          {description}
        </h5>
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

export default ActivitygridCards;
