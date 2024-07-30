import React from "react";
import reactIcon from "../assets/react.svg"

export function Login() {

  return (
    <div className="relative bg-sky-50 min-h-screen flex justify-center items-center">
      <div className="bg-white p-4 space-y-4 rounded-lg ring-1 ring-gray-900/5 shadow-lg flex flex-col">
        <div className="flex flex-row items-center space-x-4">
          <img src={reactIcon} className="w-12 h-12" />
          <p className="font-serif text-2xl font-bold">Login</p>
        </div>
        <form id="loginForm" className="text-lg px-2 space-y-2">
          User Name: <input type="text" className="px-2 rounded-lg ring-1 ring-gray-900/50" /> <br />
          Password: <input type="text" className="px-2 rounded-lg ring-1 ring-gray-900/50"/> <br />
          <div className="flex justify-between">
            <button type="button" className="text-sky-600 hover:text-sky-800">Register</button>
            <button type="button" className="text-white px-2 py-1 rounded-lg bg-sky-600 hover:bg-sky-800">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}