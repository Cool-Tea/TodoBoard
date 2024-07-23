import React from "react";
import { Card, CardInfo } from "./Card";

export interface CardBoardInfo {
  title: string
  cards: CardInfo[]
}

export function CardBoard({info} : {info: CardBoardInfo}) {

  const cardItems = info.cards.map((card, index) => 
    <Card info={card} index={index} />
  )

  return (
    <div className="mx-4 p-4 flex-grow items-center bg-white rounded-xl shadow-xl space-y-4">
      <div className="font-semibold text-slate-800/90 flex flex-grow">
        <p className="ml-4">{info.title}</p>
      </div>
      <ul className="p-4 rounded-xl space-y-4 bg-slate-500 shadow-inner ring-1 ring-slate-900/60">
        {cardItems}
      </ul>
    </div>
  )
}