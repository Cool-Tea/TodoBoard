import React from "react";
import { SideBar, SideBarStatus } from "../components/SideBar";
import { Group } from "../components/Group";
import { useParams } from "react-router";

export function Project() {
  const { user } = useParams();
  
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