import React from "react";

export function Task() {

  const date = new Date(2024, 9, 8, 20, 20);
  function formatDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  }

  return (
    <button className="bg-white rounded-lg p-2 shadow-lg flex flex-row space-x-2 justify-between">
      <div className="flex-initial min-w-32 text-left">
        <p className="font-semibold text-slate-900/90">Task: </p>
        <p>Start Time: {formatDate(date)}</p>
        <p>End Time: </p>
        <button className="text-sky-600 hover:text-sky-800">
          Details
        </button>
      </div>
      <div className="flex flex-grow space-x-2 justify-end max-w-40 overflow-x-clip truncate">
        <p>member</p>
        <p>member</p>
        <p>member</p>
        <p>member</p>
        <p>member</p>
      </div>
    </button>
  )
}