import React, { useState } from "react";
import reactIcon from "../assets/react.svg"
import { useNavigate } from "react-router";
import * as axios from "axios"

export function Register() {
  const navigate = useNavigate();
  const client = axios.default;
  const [reason, setReason] = useState<string | null>(null);

  function register() {
    event?.preventDefault();
    const register = document.getElementById('register') as HTMLFormElement;
    let formData = new FormData(register);
    let data = {
      name: formData.get('name') as string,
      password: formData.get('password') as string,
    };
    if (data.name.includes(' ') || data.password.includes(' ')) {
      setReason('Invalid user name or password (blank not allowed)');
      return;
    }
    client.post("http://127.0.0.1:7001/user/register", data).then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
        setReason(body.reason);
      }
      else {
        navigate('/login');
      }
    }).catch(err => console.log(`Error: ${err}`));
  }

  return (
    <div className="relative bg-[url('/background.jpg')] bg-cover min-h-screen flex justify-center items-center">
      <div className="bg-white p-4 space-y-4 rounded-lg ring-1 ring-gray-900/5 shadow-lg flex flex-col">
        <div className="flex flex-row items-center space-x-4">
          <img src={reactIcon} className="w-12 h-12" />
          <p className="font-serif text-2xl font-bold">Register</p>
        </div>
        <form id="register" className="text-lg px-2 space-y-2 flex flex-col">
          <div className="flex space-x-2">
            <p>New User Name:</p> 
            <input type="text" name="name" required className="flex-grow px-2 rounded-lg ring-1 ring-gray-900/50 focus:ring-sky-500" />
          </div>
          <div className="flex space-x-2">
            <p>Set Password:</p> 
            <input type="password" name="password" required className="flex-grow px-2 rounded-lg ring-1 ring-gray-900/50 focus:ring-sky-500" />
          </div>
          {
            reason && 
            <div className="text-red-600 text-sm">
              {reason}
            </div>
          }
          <div className="flex justify-between">
            <button type="button" onClick={()=>navigate('/login')} className="text-sky-600 hover:text-sky-800">Back</button>
            <button type="button" onClick={register} className="text-white px-2 py-1 rounded-lg bg-sky-600 hover:bg-sky-800">Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}