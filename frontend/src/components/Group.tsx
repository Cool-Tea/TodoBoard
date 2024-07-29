import React from "react";
import addIcon from "../assets/add.png"
import deleteIcon from "../assets/delete.png"
import { TaskCard } from "./TaskCard";

export function Group({title}: {title: string}) {

  return (
    <div className="flex-grow p-4 bg-white rounded-lg ring-1 ring-gray-900/5 shadow-lg">
      <div className="flex">
        <p className="text-xl font-serif font-bold text-gray-900/90">{title}</p>
        <div className="flex-grow flex space-x-2 justify-end">
          <button className="p-1 rounded-full hover:bg-gray-200"><img src={addIcon} className="h-6 w-6"/></button>
          <button className="p-1 rounded-full hover:bg-gray-200"><img src={deleteIcon} className="h-6 w-6"/></button>
        </div>
      </div>
      <div className="mt-2 p-4 flex flex-col space-y-4 items-stretch shadow-inner rounded-lg bg-gray-900/60">
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </div>
  )
}