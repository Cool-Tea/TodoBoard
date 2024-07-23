import React from "react"
import { NVButton } from "./NVButton"
import { NVProfile } from "./NVProfile"
import avatar from "../../assets/avatar.png"

export function Navigator() {

  return (
    <div className="flex flex-row items-baseline font-serif bg-white px-8 py-4 shadow-md">
      <p className="mx-4 text-4xl font-bold text-sky-600">Navigator</p>
      <div className="flex flex-initial">
        <NVButton title="Workspaces" onClick={()=>{}} />
        <NVButton title="Recent" onClick={()=>{}} />
      </div>
      <NVProfile avatar={avatar} />
    </div>
  )
}