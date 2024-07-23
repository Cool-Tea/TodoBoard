import React from "react";

export function NVButton({title, onClick} : {title: string, onClick: ()=>void}) {

  return (
    <button className="mx-8 text-xl px-4 py-2 text-slate-800 hover:text-sky-600/80" onClick={onClick}>
    {title}
    </button>
  )
}