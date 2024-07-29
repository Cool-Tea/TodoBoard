import React, { useState } from "react";
import { Group } from "./Group";
import * as axios from "axios"
import addIcon from "../assets/add_1.png"
import deleteIcon from "../assets/delete_1.png"

export function ViewBoard({wuid} : {wuid: number}) {
  const client = axios.default;
  const [] = useState();

  function getTaskInfos() {
    client.get("http://127.0.0.1/task/query", { params: { wuid: wuid } }).then(response => {
      const body = response.data;

    });
  }

  return (
    <div className="flex-grow flex flex-row min-h-full">
      <div className="absolute ml-0 flex flex-col space-y-6 bg-white pt-4 px-2 min-h-full z-40 ring-1 ring-gray-900/5 shadow-2xl">
        <div>
          <button><img src={addIcon} alt="add board" className="w-10 h-10" /></button>
          <p className="text-center">Add</p>
        </div>
        <div>
          <button><img src={deleteIcon} alt="delete board" className="w-10 h-10" /></button>
          <p className="text-center">Delete</p>
        </div>
      </div>
      <div className="relative min-h-full bg-sky-50 my-0 ml-16 mr-0 px-8 pt-4 flex flex-row items-start text-base">
        <Group />
        <Group />
        <Group />
      </div>
    </div>
  )
}