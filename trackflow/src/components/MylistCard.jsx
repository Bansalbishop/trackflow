import React from "react";

const MylistCard = ({ task, trueState, onClick, onToggle }) => {
  const { id, title, description, isdone, duedate, status, image } = task;

  return (
    <div
      onClick={onClick}
      className="flex  border-2 hover:shadow-md transition-all mb-4  border-gray-100 rounded-lg p-3 hover:border-blue-300 items-center gap-3"
    >
      {
        trueState==="task"?(<div>
        <img src={image} className="w-15 bg-yellow-200/60 p-2 rounded-lg"></img>
      </div>):(<div>
        <img src={image} className="w-15 bg-blue-300 p-2 rounded-lg"></img>
      </div>)
      }

      <div className="flex-1 min-w-0">
        <h3 className="font-extrabold overflow-x-hidden ">{title}</h3>
        <h5 className=" text-sm truncate text-gray-400">{description}</h5>
      </div>

      <div className="flex flex-col gap-5 items-end">
        {trueState === "task" ? (
          <button
            className={`bg-blue-500 cursor-pointer ${isdone ? "bg-green-500 border-2 border-green-500" : "bg-white border-2 border-black"} 
        p-2 rounded-lg`}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(id);
            }}
          ></button>
        ) : (
          <button
            className={`cursor-pointer bg-blue-500 ${status === "completed" ? "bg-green-500 border-2 border-green-500" : status === "stopped" ? "bg-white border-2 border-black" : "bg-yellow-500 border-2 border-yellow-500"} 
        p-2 rounded-lg`}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(id);
            }}
          ></button>
        )}
        <p className="text-[10px] font-extralight text-gray-400">{duedate}</p>
      </div>
    </div>
  );
};

export default MylistCard;
