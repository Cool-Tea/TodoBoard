import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Task } from "./pages/Task";
import { Project } from "./pages/Project";
import { Repository } from "./pages/Repository";

export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="/task" Component={Task} /> 
          <Route path="/project" Component={Project} /> 
          <Route path="/repository" Component={Repository} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}
