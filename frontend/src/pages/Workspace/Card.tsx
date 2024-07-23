import React from "react";

export interface CardInfo {
  taskName: string
  period: string
  progress: number
  members: {
      avatar: string,
      name: string,
  }[]
}

export function Card({info, index} : {info : CardInfo, index: number}) {

  const memberItems = info.members.map(member => 
    <div className="flex flex-col items-center justify-center">
      <img src={member.avatar} alt="" className="h-10 w-10 rounded-full mx-2" />
      <p className="w-10 truncate">{member.name}</p>
    </div>
  )

  return (
    <li key={index} className="bg-white rounded-lg p-2 shadow-lg flex justify-between">
      <div className="flex-initial min-w-32">
        <p className="font-semibold text-slate-900/90">Task: {info.taskName}</p>
        <p>Period: {info.period}</p>
        <p>Progress: {info.progress * 100}%/100%</p>
      </div>
      <div className="flex flex-grow justify-end max-w-60 overflow-x-auto">
        {memberItems}
      </div>
    </li>
  )
}