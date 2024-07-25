import React from "react";
import { Navigator } from "../../components/Navigator";
import { useParams } from "react-router";
import { RepoBoard } from "../../components/RepoBoard";

export function Repository() {
  const { uuid } = useParams();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-sky-50">
      <Navigator uuid={Number.parseInt(uuid!)} />
      <RepoBoard uuid={Number.parseInt(uuid!)} />
    </div>
  )
}