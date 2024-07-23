import React from "react"
import { NVButton } from "./NVButton"
import { NVProfile } from "./NVProfile"
import avatar from "../assets/avatar.png"
import { useNavigate } from "react-router"

export function Navigator({uuid}: {uuid: number}) {
  const navigator = useNavigate();

  function redirectToRepository() {
    navigator(`/${uuid}/workspace`);
  }

  return (
    <div className="flex flex-row z-50 items-center font-serif bg-white px-8 py-4 shadow-md">
      <p className="mx-4 text-4xl font-bold text-sky-600">Navigator</p>
      <div className="flex flex-initial">
        <NVButton title="Repository" onClick={redirectToRepository} />
        <NVButton title="Recent" onClick={()=>{}} />
      </div>
      <NVProfile avatar={avatar} />
    </div>
  )
}