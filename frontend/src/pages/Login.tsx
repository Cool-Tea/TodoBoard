import React, { useState } from "react";
import reactIcon from "../assets/react.svg"
import { useNavigate } from "react-router";
import * as axios from "axios"

export function Login() {
  const navigate = useNavigate();
  const client = axios.default;
  const [reason, setReason] = useState<string | null>(null);

  function login() {
    event?.preventDefault();
    const login = document.getElementById('login') as HTMLFormElement;
    let formData = new FormData(login);
    let data = {
      user: formData.get('name') as string,
      password: formData.get('password') as string,
    };
    if (data.user.includes(' ') || data.password.includes(' ')) {
      setReason('Invalid user name or password');
      return;
    }
    client.post("http://127.0.0.1:7001/user/login", data).then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
        setReason(body.reason);
      }
      else {
        navigate(`/${data.user}/repository`);
      }
    }).catch(err => console.log(`Error: ${err}`));
  }

  return (
    <div className="relative bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 min-h-screen flex justify-center items-center">
      <div className="bg-white p-4 space-y-4 rounded-lg ring-1 ring-gray-900/5 shadow-lg flex flex-col">
        <div className="flex flex-row items-center space-x-4">
          <img src={reactIcon} className="w-12 h-12" />
          <p className="font-serif text-2xl font-bold">Login</p>
        </div>
        <form id="login" className="text-lg px-2 space-y-2">
          User Name: <input type="text" name="name" required className="px-2 rounded-lg ring-1 ring-gray-900/50" /> <br />
          Password: <input type="password" name="password" required className="px-2 rounded-lg ring-1 ring-gray-900/50"/> <br />
          {
            reason && 
            <div className="text-red-600 text-sm">
              {reason}
            </div>
          }
          <div className="flex justify-between">
            <button type="button" onClick={()=>navigate('/register')} className="text-sky-600 hover:text-sky-800">Register</button>
            <button type="button" onClick={login} className="text-white px-2 py-1 rounded-lg bg-sky-600 hover:bg-sky-800">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}