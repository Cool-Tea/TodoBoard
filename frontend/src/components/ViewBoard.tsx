import React from "react";
import { TaskBoard, CardBoardInfo } from "./TaskBoard";

export function ViewBoard({infos} : {infos : CardBoardInfo[]}) {

  const cardBoardItems = infos.map(info =>
    <TaskBoard info={info} />
  )

  return (
    <div className="min-h-full bg-sky-50 m-0 p-8 flex flex-row text-base items-start">
      {cardBoardItems}
    </div>
  )
}