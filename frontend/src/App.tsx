import React from "react";
import { Workspace } from "./pages/Workspace/Workspace";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Repository } from "./pages/Repository/Repository";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/:uuid/workspace" Component={Repository} />
          <Route path="/:uuid/workspace/:wuid" Component={Workspace} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
