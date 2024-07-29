import React from "react";
import { SideBar, SideBarStatus } from "../components/SideBar";
import addIcon from "../assets/add.png"
import deleteIcon from "../assets/delete.png"

function Button({title}: {title: string}) {
  return (
    <button className="bg-white hover:bg-gray-200 p-4 rounded-lg ring-1 ring-gray-900/5 shadow-lg">
      {title}
    </button>
  )
}

export function Repository() {

  return (
    <div className="relative bg-sky-50 min-h-screen flex">
      <SideBar status={SideBarStatus.REPO} />
      <div className="ml-24 px-8 pt-4 pb-8 flex-grow flex space-x-4">
        <div className="flex-grow flex flex-col bg-white p-4 space-y-2 rounded-lg ring-1 ring-gray-900/5 shadow-lg">
          <div className="flex">
            <p className="text-xl text-gray-900/90 font-bold font-serif">Project</p>
            <div className="flex-grow flex space-x-2 justify-end">
              <button className="p-1 rounded-full hover:bg-gray-200"><img src={addIcon} className="h-6 w-6"/></button>
              <button className="p-1 rounded-full hover:bg-gray-200"><img src={deleteIcon} className="h-6 w-6"/></button>
            </div>
          </div>
          <div className="mt-2 p-4 flex-grow grid grid-cols-5 gap-4 shadow-inner rounded-lg bg-gray-900/60">
            <Button title="Project" />
            <Button title="Project" />
            <Button title="Project" />
            <Button title="Project" />
            <Button title="Project" />
            <Button title="Project" />
            <Button title="Project" />
            <Button title="Project" />
            <Button title="Project" />
          </div>
        </div>
      </div>
    </div>
  )
}