import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as axios from "axios";

export function Login() {
  const [authenticated, setAuthencicated] = useState(true);
  const navigator = useNavigate();
  const client = axios.default;

  function redirectToRegister() {
    navigator('/register')
  }

  function redirectToWorkspace() {
    navigator('/workspace')
  }

  function showHint() {
    return authenticated ? 
      null : 
      <p className="text-sm text-red-600/90 text-center">Invalid user name or password</p>
  }

  function submitLogin() {
    event?.preventDefault();
    const loginForm = document.getElementById("loginForm") as HTMLFormElement;
    let data = new FormData(loginForm);
    for (let pair of data.entries()) {
      console.log(pair);
    }
    client.post("http://127.0.0.1:7001/user/login", { userName: data.get("userName"), password: data.get("password") }).then(response => {
      const body = response.data;
      console.log(body);
      if (body.authenticated) {
        redirectToWorkspace();
      }
      else {
        setAuthencicated(false);
      }
    }).catch(err => {
      console.log("Error: " + err);
    });
  }

  return (
    <div className="relative flex flex-col min-h-screen justify-center overflow-hidden bg-gray-50 py-6">
      <div className="relative bg-white mx-auto max-w-lg rounded-lg px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 space-y-6">
        <h1 className="text-4xl font-bold font-serif text-slate-900/90">Login</h1>
        <form id="loginForm" onSubmit={submitLogin} className="flex flex-col space-y-6 text-lg font-semibold font-serif">
          <div className="flex-grow space-y-4">
            User Name: <input type="text" required name="userName" className="ml-2 px-2 ring-2 ring-slate-900/30 rounded-lg shadow-sm" /> <br />
            Password: <input type="password" required name="password" className="ml-2 px-2 ring-2 ring-slate-900/30 rounded-lg shadow-sm" /> <br />
            {showHint()}
          </div>
          <div className="flex flex-grow justify-center space-x-4">
            <button type="submit" className="bg-sky-600 ring-1 ring-gray-100 rounded-lg px-2 py-1 text-white/90 hover:bg-sky-800 hover:text-white/60">Login</button>
            <button type="button" className="bg-sky-600 ring-1 ring-gray-100 rounded-lg px-2 py-1 text-white/90 hover:bg-sky-800 hover:text-white/60" onClick={redirectToRegister}>Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}