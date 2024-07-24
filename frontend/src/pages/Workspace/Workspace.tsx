import React from "react";
import { Navigator } from "../../components/Navigator";
import { ViewBoard } from "../../components/ViewBoard";
import { CardInfo } from "../../components/Task";
import avatar from "../../assets/avatar.png"
import { CardBoardInfo } from "../../components/TaskBoard";
import * as axios from "axios"
import { useParams } from "react-router";

const cards: CardInfo[] = [
  {uuid: 0, taskName:'Eat', period:'7.15 ~ 8.15', progress: 0.18, members:[{avatar:avatar, name:'React'},{avatar:avatar, name:'React'}]},
  {uuid: 1, taskName:'Sleep', period:'7.15 ~ 8.15', progress: 0.18, members:[{avatar:avatar, name:'React'},{avatar:avatar, name:'React'},{avatar:avatar, name:'React'},{avatar:avatar, name:'React'},{avatar:avatar, name:'React'},{avatar:avatar, name:'React'}]}
];

const infos: CardBoardInfo[] = [
  {title: 'To Do', cards},
  {title: 'On Going', cards},
  {title: 'Done', cards},
]

export function Workspace() {
  const client = axios.default;
  const { uuid, wuid } = useParams();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-sky-50">
      <Navigator uuid={Number.parseInt(uuid!)} />
      <ViewBoard infos={infos} />
    </div>
  )
}