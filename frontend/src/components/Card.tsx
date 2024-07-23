import React, { useState } from "react";

export interface CardInfo {
  uuid: number
  taskName: string
  period: string
  progress: number
  members: {
      avatar: string,
      name: string,
  }[]
}

const comments = [
  {
    uuid: 123,
    userName: 'Tim',
    content: 'let\' comment',
  },
];

export function Card({info, index} : {info : CardInfo, index: number}) {
  const [isExpanded, setExpanded] = useState(false);

  const memberItems = info.members.map(member => 
    <div className="flex flex-col items-center justify-center">
      <img src={member.avatar} alt="" className="h-10 w-10 rounded-full mx-2" />
      <p className="w-10 truncate">{member.name}</p>
    </div>
  )

  const commentItems = comments.map(comment => 
    <div className="flex flex-row items-center">
      <img src="" alt="" className="w-6 h-6 rounded-full" />
      <p>{comment.userName}: </p>
      <p>{comment.content}</p>
    </div>
  )
  
  function getComments() {
    setExpanded(!isExpanded);
    if (isExpanded) {
    }
  }

  return (
    <li key={index} className="bg-white rounded-lg p-2 shadow-lg flex justify-between">
      <div className="flex-initial min-w-32 transition ease-in-out">
        <p className="font-semibold text-slate-900/90">Task: {info.taskName}</p>
        <p>Period: {info.period}</p>
        <p>Progress: {info.progress * 100}%/100%</p>
        <button className="text-sky-600 hover:text-sky-800" onClick={getComments}>Comments</button>
        {isExpanded && 
          <div className="my-2 space-y-2">
            {commentItems}
          </div>
        }
      </div>
      <div className="flex flex-grow justify-end max-w-60 overflow-x-auto">
        {memberItems}
      </div>
    </li>
  )
}