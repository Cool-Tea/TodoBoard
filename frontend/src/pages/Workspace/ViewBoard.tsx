import React from "react";
import { CardBoard, CardBoardInfo } from "./CardBoard";

export function ViewBoard({infos} : {infos : CardBoardInfo[]}) {

  const cardBoardItems = infos.map(info =>
    <CardBoard info={info} />
  )

  return (
    <div className="min-h-full bg-sky-50 m-0 px-8 pt-0 pb-8 flex flex-row text-base divide-fuchsia-900/30">
      {cardBoardItems}
    </div>
  )
}