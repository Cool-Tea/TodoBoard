import React from "react";
import backIcon from "../assets/back.png"
import nextIcon from "../assets/next.png"
import moreIcon from "../assets/more.png"
import { useNavigate, useParams } from "react-router";

interface ITask {
  name: string;
  startTime: string;
  endTime: string;
}

export function TaskCard({task}: { task: ITask }) {
  const navigate = useNavigate();
  const { user, project } = useParams();

  return (
    <div className="bg-white p-4 rounded-lg ring-1 ring-gray-900/5 shadow-lg text-left flex justify-between">
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