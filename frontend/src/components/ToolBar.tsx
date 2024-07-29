import React from "react";

export function ToolBar({children}) {
  
  return (
    <div className="flex felx-row space-x-4 bg-white rounded-md px-4 py-2 ring-1 ring-gray-900/5 shadow-sm">
      {children}
    </div>
  )
}