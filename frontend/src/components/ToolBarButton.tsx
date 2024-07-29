import React from "react";

export function ToolBarButton({title, onClick}: {title: string, onClick: ()=>void}) {
  
  return (
    <button className="bg-sky-600 text-white p-2 rounded-lg shadow-sm hover:bg-sky-800 hover:text-white/80" onClick={onClick}>
      {title}
    </button>
  )
}