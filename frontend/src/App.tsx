import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Task } from "./pages/Task";

export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="/task" Component={Task} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}
