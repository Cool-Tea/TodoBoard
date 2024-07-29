import React from "react";
import { Task } from "./Task";
import addIcon from "../assets/add.png"
import deleteIcon from "../assets/delete.png"

export function Group() {

  return (
    <div className="mx-4 p-4 flex-grow items-center bg-white rounded-xl shadow-xl space-y-4">
      <div className="font-semibold text-slate-800/90 flex flex-grow justify-between">
        <p className="ml-4">Title</p>
        <div className="flex space-x-4">
          <button><img src={addIcon} alt="add task" className="w-6 h-6 rounded-full" /></button>
          <button><img src={deleteIcon} alt="delete task" className="w-6 h-6 rounded-full" /></button>
        </div>
      </div>
      <div className="flex flex-col p-4 rounded-xl space-y-4 bg-slate-500 shadow-inner ring-1 ring-slate-900/60">
        <Task />
      </div>
    </div>
  )
}