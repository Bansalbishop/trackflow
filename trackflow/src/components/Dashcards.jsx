import React from "react";

const Dashcards = ({title, num, image}) => {
  return (
    <div className="w-90 sm:w-45 md:w-60 lg:w-75 mx-1 my-1 flex border-2 justify-between rounded-lg border-gray-300 flex-row  py-5 px-3 gap-10 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-200/50 transition-all hover:scale-103">
      <div>
        <div className="text-sm text-gray-700 ">{title}</div>
        <div className="text-2xl text-black font-extrabold">{num}</div>
      </div>
      <div>
        <img
          src={image}
          className="w-11  p-2 bg-green-300/85 rounded-lg"
          alt={title}
        />
      </div>
    </div>
  );
};

export default Dashcards;
