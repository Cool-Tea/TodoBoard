import React, { useState } from "react";
import addIcon from "../assets/add.png";
import deleteIcon from "../assets/delete.png";
import crossIcon from "../assets/cross.png";
import { TaskCard } from "./TaskCard";
import { ProjectMode } from "../pages/Project";

interface IGroup {
  name: string;
  tasks: [];
}

interface Props {
  index: number;
  group: IGroup;
  mode: ProjectMode;
  setMode: React.Dispatch<React.SetStateAction<ProjectMode>>;
  deleteGroup: ()=>void;
  setGroup: React.Dispatch<React.SetStateAction<number>>;
  deleteTask: (task: string)=>void;
}

export function Group({index, group, mode, setMode, deleteGroup, setGroup, deleteTask}: Props) {
  const [isDel, setDel] = useState(false);

  return (
    <div className="relative flex-grow p-4 bg-white rounded-lg ring-1 ring-gray-900/5 shadow-lg">
      {
        mode == ProjectMode.DGROUP &&
        <button onClick={deleteGroup} className="absolute top-0 right-0 rounded-full hover:bg-gray-200"><img src={crossIcon} className="h-4 w-4 rounded-full" /></button>
      }
      <div className="flex">
        <p className="text-xl font-serif font-bold text-gray-900/90">{group.name}</p>
        <div className="flex-grow flex space-x-2 justify-end">
          <button onClick={()=>{setGroup(index);setMode(ProjectMode.ATask)}} className="p-1 rounded-full hover:bg-gray-200"><img src={addIcon} className="h-6 w-6"/></button>
          <button onClick={()=>{setMode(ProjectMode.DTask);setDel(!isDel)}} className="p-1 rounded-full hover:bg-gray-200"><img src={deleteIcon} className="h-6 w-6"/></button>
        </div>
      </div>
      <div className="mt-2 p-4 flex flex-col space-y-4 items-stretch shadow-inner rounded-lg bg-gray-900/60">
        {
          group.tasks.map((task, index) => 
            <TaskCard key={index} task={task} isDel={isDel} deleteTask={deleteTask} />
          )
        }
      </div>
    </div>
  )
}