import React from "react";
import backIcon from "../assets/back.png"
import nextIcon from "../assets/next.png"
import moreIcon from "../assets/more.png"
import crossIcon from "../assets/cross.png"
import { useNavigate, useParams } from "react-router";

interface ITask {
  name: string;
  startTime: string;
  endTime: string;
}

interface Props {
  task: ITask;
  isDel: boolean;
  deleteTask: (task: string)=>void;
}

export function TaskCard({task, isDel, deleteTask}: Props) {
  const navigate = useNavigate();
  const { user, project } = useParams();

  return (
    <div className="relative bg-white p-4 rounded-lg ring-1 ring-gray-900/5 shadow-lg text-left flex justify-between">
      {
        isDel &&
        <button onClick={()=>{deleteTask(task.name)}} className="absolute top-0 right-0 rounded-full hover:bg-gray-200"><img src={crossIcon} className="h-4 w-4 rounded-full" /></button>
      }
      <div>
        <p className="font-semibold text-lg">{task.name}</p>
        <p>Start Time: {task.startTime.substring(0, 16).replace('T', ' ')}</p>
        <p>End Time: {task.endTime.substring(0, 16).replace('T', ' ')}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button className="p-1 rounded-full hover:bg-gray-200"><img src={backIcon} className="h-6 w-6"/></button>
        <button className="p-1 rounded-full hover:bg-gray-200"><img src={nextIcon} className="h-6 w-6"/></button>
        <button onClick={()=>navigate(`/${user}/project/${project}/task`)} className="p-1 rounded-full hover:bg-gray-200"><img src={moreIcon} className="h-6 w-6"/></button>
      </div>
    </div>
  )
}