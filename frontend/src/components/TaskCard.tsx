import React from "react";
import backIcon from "../assets/back.png"
import nextIcon from "../assets/next.png"
import moreIcon from "../assets/more.png"
import crossIcon from "../assets/cross.png"
import { useNavigate, useParams } from "react-router";
import * as axios from "axios"

interface ITask {
  name: string;
  startTime: string;
  endTime: string;
}

interface Props {
  task: ITask;
  isDel: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TaskCard({task, isDel, setRefresh}: Props) {
  const navigate = useNavigate();
  const { user, project } = useParams();
  const client = axios.default;

  function deleteTask() {
    client.delete("http://127.0.0.1:7001/task/delete", { params: { project: project, task: task.name } }).then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
      }
      else {
        setRefresh(true);
      }
    }).catch(err => console.log(`Error: ${err}`));
  }

  function moveTask(distance: number) {
    let data = {
      project: project,
      task: task.name,
      distance: distance,
    };
    client.patch("http://127.0.0.1:7001/task/move", data).then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
      }
      else {
        setRefresh(true);
      }
    }).catch(err => console.log(`Error: ${err}`));
  }

  return (
    <div className="relative bg-white p-4 rounded-lg ring-1 ring-gray-900/5 shadow-lg text-left flex justify-between">
      {
        isDel &&
        <button onClick={deleteTask} className="absolute top-0 right-0 rounded-full transition ease-in-out hover:scale-[1.5] hover:bg-gray-200/50"><img src={crossIcon} className="h-4 w-4 rounded-full" /></button>
      }
      <div>
        <p className="font-semibold text-lg">{task.name}</p>
        <p>Start Time: {task.startTime.substring(0, 16).replace('T', ' ')}</p>
        <p>End Time: {task.endTime.substring(0, 16).replace('T', ' ')}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button onClick={()=>moveTask(-1)} className="p-1 rounded-full transition ease-in-out hover:scale-110 hover:bg-gray-200"><img src={backIcon} className="h-6 w-6"/></button>
        <button onClick={()=>moveTask(1)} className="p-1 rounded-full transition ease-in-out hover:scale-110 hover:bg-gray-200"><img src={nextIcon} className="h-6 w-6"/></button>
        <button onClick={()=>navigate(`/${user}/project/${project}/${task.name}`)} className="p-1 rounded-full transition ease-in-out hover:scale-110 hover:bg-gray-200"><img src={moreIcon} className="h-6 w-6"/></button>
      </div>
    </div>
  )
}