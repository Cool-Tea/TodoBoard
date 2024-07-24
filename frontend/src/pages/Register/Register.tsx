import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as axios from "axios"

export function Register() {
  const [hint, setHint] = useState<string | null>(null);
  const navigator = useNavigate();
  const client = axios.default;

  function redirectToLogin() {
    navigator('/login');
  }

  function showHint() {
    return hint && <p className="text-sm text-red-600/90 text-center">{hint}</p>;
  }

  function submitRegister() {
    event?.preventDefault();
    const registerForm = document.getElementById("registerForm") as HTMLFormElement;
    let data = new FormData(registerForm);
    for (let pair of data.entries()) {
      console.log(pair);
    }
    client.post("http://127.0.0.1:7001/user/register", { userName: data.get("userName"), password: data.get("password")}).then(response => {
      const body = response.data;
      console.log(body);
      if (body.validity) {
        navigator('/login');
      }
      else {
        setHint(body.reason);
      }
    }).catch(err => {
      console.log("Error: " + err);
    });
  }

  return (
    <div className="relative flex flex-col min-h-screen justify-center overflow-hidden bg-gray-50 py-6">
      <div className="relative bg-white mx-auto max-w-lg rounded-lg px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 space-y-6">
        <h1 className="text-4xl font-bold font-serif text-slate-900/90">Register</h1>
        <form id="registerForm" onSubmit={submitRegister} className="flex flex-col space-y-6 text-lg font-semibold font-serif">
          <div className="flex-grow space-y-4">
            User Name: <input type="text" required name="userName" className="ml-2 px-2 ring-2 ring-slate-900/30 rounded-lg shadow-sm" /> <br />
            Password: <input type="password" required name="password" className="ml-2 px-2 ring-2 ring-slate-900/30 rounded-lg shadow-sm" /> <br />
            {showHint()}
          </div>
          <div className="flex flex-grow justify-center space-x-4">
            <button type="button" className="bg-sky-600 ring-1 ring-gray-100 rounded-lg px-2 py-1 text-white/90 hover:bg-sky-800 hover:text-white/60" onClick={redirectToLogin}>Back</button>
            <button type="submit" className="bg-sky-600 ring-1 ring-gray-100 rounded-lg px-2 py-1 text-white/90 hover:bg-sky-800 hover:text-white/60">Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}