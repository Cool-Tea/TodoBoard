import React from "react";
import { Navigator } from "../../components/Navigator";

export function TaskPage() {

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-sky-50">
      <Navigator uuid={1} />
      <div className="flex flex-row flex-grow px-8 py-4">
        <div className="w-1/2 flex flex-col space-y-4">
          <div className="mx-4 p-4 items-center bg-white rounded-xl shadow-xl space-y-4">
            Info
          </div>
          <div className="mx-4 p-4 items-center bg-white rounded-xl shadow-xl space-y-4">
            Info
          </div>
          <div className="mx-4 p-4 items-center bg-white rounded-xl shadow-xl space-y-4">
            Info
          </div>
        </div>
        <div className="mx-4 p-4 w-1/2 items-center bg-white rounded-xl shadow-xl space-y-4">
          Comments
        </div>
      </div>
    </div>
  )
}