import React from "react";

export function NVProfile({avatar} : {avatar: string}) {

  return (
    <div className="flex flex-grow flex-row-reverse items-center">
      <a href="">
        <img src={avatar} alt="" className="h-10 w-10 rounded-full" />
      </a>
    </div>
  )
}