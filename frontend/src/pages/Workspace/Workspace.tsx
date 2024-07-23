import React from "react";
import { Navigator } from "./Navigator";
import { ViewBoard } from "./ViewBoard";
import { CardInfo } from "./Card";
import avatar from "../../assets/avatar.png"
import { CardBoardInfo } from "./CardBoard";

const cards: CardInfo[] = [
  {taskName:'Eat', period:'7.15 ~ 8.15', progress: 0.18, members:[{avatar:avatar, name:'React'},{avatar:avatar, name:'React'}]},
  {taskName:'Sleep', period:'7.15 ~ 8.15', progress: 0.18, members:[{avatar:avatar, name:'React'},{avatar:avatar, name:'React'},{avatar:avatar, name:'React'},{avatar:avatar, name:'React'},{avatar:avatar, name:'React'},{avatar:avatar, name:'React'}]}
];

const infos: CardBoardInfo[] = [
  {title: 'To Do', cards},
  {title: 'On Going', cards},
  {title: 'Done', cards},
]

export function Workspace() {

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-sky-50">
      <Navigator />
      <br />
      <ViewBoard infos={infos} />
    </div>
  )
}