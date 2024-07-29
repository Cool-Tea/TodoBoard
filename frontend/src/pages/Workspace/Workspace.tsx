import React from "react";
import { Navigator } from "../../components/Navigator";
import { ViewBoard } from "../../components/ViewBoard";
import { useParams } from "react-router";

export function Workspace() {
  const { uuid, wuid } = useParams();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-sky-50">
      <Navigator uuid={Number.parseInt(uuid!)} />
      <ViewBoard wuid={Number.parseInt(wuid!)} />
    </div>
  )
}