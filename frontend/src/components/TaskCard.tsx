import React from "react";
import backIcon from "../assets/back.png"
import nextIcon from "../assets/next.png"
import moreIcon from "../assets/more.png"
import { useNavigate, useParams } from "react-router";

export function TaskCard() {
  const navigate = useNavigate();
  const { user } = useParams();

  return (
    <div className="bg-white p-4 rounded-lg ring-1 ring-gray-900/5 shadow-lg text-left flex justify-between">
      <div>
        <p className="font-semibold text-lg">Task</p>
        <p>Start Time: 2023-9-1 11:00</p>
        <p>End Time: 2024-8-31 12:00</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button className="p-1 rounded-full hover:bg-gray-200"><img src={backIcon} className="h-6 w-6"/></button>
        <button className="p-1 rounded-full hover:bg-gray-200"><img src={nextIcon} className="h-6 w-6"/></button>
        <button onClick={()=>navigate(`/${user}/task/task`)} className="p-1 rounded-full hover:bg-gray-200"><img src={moreIcon} className="h-6 w-6"/></button>
      </div>
    </div>
  )
}