import React from "react";
import { SideBar, SideBarStatus } from "../components/SideBar";
import addIcon from "../assets/add.png"
import deleteIcon from "../assets/delete.png"
import { Group } from "../components/Group";

export function Project() {
  
  return (
    <div className="relative bg-sky-50 min-h-screen flex">
      <SideBar status={SideBarStatus.PROJECT} />
      <div className="ml-24 px-8 pt-4 pb-8 flex-grow flex flex-row space-x-6 items-start">
        <Group title="To do" />
        <Group title="To do" />
        <Group title="To do" />
        <Group title="To do" />
      </div>
    </div>
  )
}