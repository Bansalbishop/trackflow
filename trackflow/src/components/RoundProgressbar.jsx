import React, { useEffect, useState } from "react";

const RoundProgressbar = ({
  state,
  total,
  completed,
  activityType,
  ongoing,
  pending = total - completed - ongoing,
  size = 300,
  strokeWidth = 25,
}) => {
  if (total === 0) {
    completed = 0;
    ongoing = 0;
    pending = 0;
  }
  const [hovered, setHovered] = useState(null);
  const radius = (size - strokeWidth) / 2;
  const perimeter = 2 * Math.PI * radius;
  var completedlen = (completed / total) * perimeter;
  var ongoinglen = (ongoing / total) * perimeter;

  if (total === "0") {
    completedlen = 0;
    ongoinglen = 0;
  }

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const getCenterText = () => {
    switch (hovered) {
      case "completed":
        return {
          percentage: Math.floor(total === 0 ? 0 : (completed / total) * 100),
          value: completed,
          label: "Completed",
          color: "text-green-500",
        };
      case "ongoing":
        return {
          percentage: Math.floor(total === 0 ? 0 : (ongoing / total) * 100),
          value: ongoing,
          label: "Ongoing",
          color: "text-yellow-500",
        };
      case "pending":
        return {
          percentage: Math.floor(total === 0 ? 0 : (pending / total) * 100),
          value: pending,
          label: "Pending",
          color: "text-red-400",
        };
      default:
        return {
          percentage: Math.floor(total === 0 ? 0 : (completed / total) * 100),
          value: completed,
          label: activityType === "task" ? "Task Done" : "Project Done",
          color: "text-black",
        };
    }
  };
  const center = getCenterText();

  return (
    <>
      <div className="relative flex items-center justify-center ">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            pointerEvents="stroke"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            onMouseEnter={() => setHovered("pending")}
            onMouseLeave={() => setHovered(null)}
          />

          {ongoing > 0 ? (
            <circle
              pointerEvents="stroke"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#facc15"
              strokeWidth={strokeWidth}
              strokeDasharray={`${ongoinglen} ${perimeter}`}
              strokeDashoffset={animate ? -completedlen : perimeter}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 1.2s ease",
              }}
              onMouseEnter={() => setHovered("ongoing")}
              onMouseLeave={() => setHovered(null)}
            />
          ) : null}
          {completed > 0 ? (
            <circle
              pointerEvents="stroke"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#22c55e"
              strokeWidth={strokeWidth}
              strokeDasharray={`${completedlen} ${perimeter}`}
              strokeDashoffset={animate ? 0 : perimeter}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 1.2s ease",
              }}
              onMouseEnter={() => setHovered("completed")}
              onMouseLeave={() => setHovered(null)}
            />
          ) : null}
        </svg>
        <div className="absolute flex flex-col items-center pointer-events-none">
          <p className={`text-2xl font-extrabold ${center.color}`}>
            {center.percentage}%
          </p>
          <p className="text-lg text-gray-400">
            {center.value}/{total} {center.label}
          </p>
        </div>
      </div>

      <div className="flex justify-evenly mb-9 mt-4">
        <div className="flex gap-1 items-center">
          <button className="bg-white-500 border-2 border-black-500 p-2 rounded-lg"></button>
          <p>Pending</p>
        </div>

        {state === "project" ? (
          <div className="flex gap-1 items-center">
            <button className="bg-yellow-500 border-2 border-yellow-500 p-2 rounded-lg"></button>
            <p>Ongoing</p>
          </div>
        ) : null}

        <div className="flex gap-1 items-center">
          <button className="bg-green-500 border-2 border-green-500 p-2 rounded-lg"></button>
          <p>Done</p>
        </div>
      </div>
    </>
  );
};

export default RoundProgressbar;
