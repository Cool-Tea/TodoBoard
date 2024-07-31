import React from "react";
import { SideBar, SideBarStatus } from "../components/SideBar";
import addIcon from "../assets/add.png"
import fileIcon from "../assets/file.png"
import { useParams } from "react-router";

export function Task() {
  const { user } = useParams();

  return (
    <div className="relative bg-sky-50 min-h-screen flex">
      <SideBar status={SideBarStatus.TASK} />
      <div className="ml-24 px-8 pt-4 pb-8 flex-grow flex space-x-4">
        <div className="w-1/3 flex flex-col space-y-4">
          <div className="flex-initial bg-white p-4 space-y-2 rounded-lg ring-1 ring-gray-900/5 shadow-lg">
            <div className="text-xl text-gray-900/90">
              Info
            </div>
            <div className="p-2 text-md shadow-inner space-y-2 rounded-md bg-gray-100/80">
              <p>Name: Sleep</p>
              <p>Start Time: 2022-9-1 15:00</p>
              <p>End Time: 2023-9-1 16:00</p>
              <p>Group: To do</p>
            </div>
          </div>
          <div className="flex-inital bg-white p-4 space-y-2 rounded-lg ring-1 ring-gray-900/5 shadow-lg">
            <div className="flex flex-row justify-between items-center text-xl text-gray-900/90">
              <p>Attachment</p>
              <button className="p-1 rounded-full hover:bg-gray-200"><img src={addIcon} className="h-6 w-6"/></button>
            </div>
            <div className="p-2 text-md shadow-inner rounded-md bg-gray-100/80">
              <button className="p-2 rounded-lg flex flex-col items-center hover:bg-white">
                <img src={fileIcon} className="h-6 w-6" />
                <p>attachment</p>
              </button>
            </div>
          </div>
        </div>
        <div className="w-2/3 flex flex-col">
          <div className="flex-1 flex flex-col bg-white p-4 space-y-2 rounded-lg ring-1 ring-gray-900/5 shadow-lg">
            <div className="text-xl text-gray-900/90">
              Comment
            </div>
            <div className="flex-grow p-2 text-md shadow-inner space-y-2 rounded-md bg-gray-100/80">
              <div>
                Tim: Hello
              </div>
              <div>
                Bob: Nice to C U
              </div>
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <input type="text" className="flex-grow px-2 rounded-lg ring-1 ring-gray-900/50" />
              <button className="px-2 py-1 rounded-lg bg-sky-600 text-white">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}