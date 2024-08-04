import React, { useEffect, useState } from "react";
import { SideBar, SideBarStatus } from "../components/SideBar";
import addIcon from "../assets/add.png"
import deleteIcon from "../assets/delete.png"
import reactIcon from "../assets/react.svg"
import tickIcon from "../assets/tick.png"
import { useNavigate, useParams } from "react-router";
import * as axios from "axios"

function Button({title, onClick}: {title: string, onClick: ()=>void}) {
  return (
    <button onClick={onClick} className="bg-white hover:bg-gray-200 p-4 rounded-lg ring-1 ring-gray-900/5 shadow-lg">
      {title}
    </button>
  )
}

export enum RepoMode {
  NORMAL, APROJECT, DPROJECT
}

export function Repository() {
  const { user } = useParams();
  const navigate = useNavigate();
  const client = axios.default;
  const [projects, setProjects] = useState<any>(null);
  const [overview, setOverview] = useState<any>(null);
  const [mode, setMode] = useState<RepoMode>(RepoMode.NORMAL);
  const [reason, setReason] = useState<string | null>(null);

  function getProjects() {
    client.get("http://127.0.0.1:7001/user/summary", { params: { user: user } }).then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
      }
      else {
        setProjects(body.data);
      }
    });
  }

  function getAllProjects() {
    client.get("http://127.0.0.1:7001/project/overview").then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
      }
      else {
        setOverview(body.data);
      }
    }).catch(err => console.log(`Error ${err}`));
  }

  function refresh() {
    getProjects();
    getAllProjects();
  }

  useEffect(refresh, []);

  function getOverviewItems() {
    return (
      overview.map((proj, index) => 
        <div key={index} className="relative bg-white p-4 rounded-lg ring-1 ring-gray-900/5 shadow-lg text-left flex items-center justify-between">
          <p>{proj}</p>
          {
            projects.includes(proj) ?
            <div className="p-1 rounded-full bg-gray-200">
              <img src={tickIcon} className="h-6 w-6"/>
            </div> :
            <button onClick={()=>addProject(proj)} className="p-1 rounded-full hover:bg-gray-200">
              <img src={addIcon} className="h-6 w-6"/>
            </button>
          }
        </div>
      )
    )
  }

  function addProject(project: string) {
    let data = {
      user: user,
      project: project,
    };
    client.post("http://127.0.0.1:7001/user/project/add", data).then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
      }
      else {
        refresh();
      }
    }).catch(err => console.log(`Error: ${err}`));
  }

  function createProject() {
    const project = document.getElementById('project') as HTMLInputElement;
    if (project.value.length == 0) return;
    let data = { name: project.value };
    client.post("http://127.0.0.1:7001/project/create", data).then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
        setReason(body.reason);
      }
      else {
        addProject(data.name);
      }
    }).catch(err => console.log(`Error: ${err}`));
  }

  return (
    <div className="relative bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 min-h-screen flex">
      <SideBar status={SideBarStatus.REPO} repoMode={mode} setRepoMode={setMode} />
      {
        mode == RepoMode.APROJECT &&
        <div className="absolute inset-0 ml-24 z-40 pb-8 pt-4 backdrop-blur-lg backdrop-brightness-50 flex flex-col items-center justify-center space-y-4">
          <div className="bg-white w-1/3 p-4 space-y-2 rounded-lg ring-1 ring-gray-900/5 shadow-lg">
            <div className="flex flex-row items-center space-x-4">
              <img src={reactIcon} className="w-12 h-12" />
              <p className="font-serif text-2xl font-bold">Create Project</p>
            </div>
            <div className="text-lg px-2 space-y-2">
              <div className="flex space-x-2">
                <p>Project Name:</p>
                <input type="text" id="project" required className="flex-grow px-2 rounded-lg ring-1 ring-gray-900/50" />
              </div>
              {
                reason && 
                <div className="text-red-600 text-sm">
                  {reason}
                </div>
              }
              <div className="flex justify-between">
                <button onClick={()=>{setMode(RepoMode.NORMAL)}} className="text-sky-600 hover:text-sky-800">Back</button>
                <button onClick={createProject} className="text-white px-2 py-1 rounded-lg bg-sky-600 hover:bg-sky-800">Create</button>
              </div>
            </div>
          </div>
          <div className="bg-white w-1/3 max-h-96 flex-grow p-4 space-y-2 rounded-lg ring-1 ring-gray-900/5 shadow-lg flex flex-col">
            <div className="flex flex-row items-center space-x-4">
              <img src={reactIcon} className="w-12 h-12" />
              <p className="font-serif text-2xl font-bold">Select Project</p>
            </div>
            <div className="flex-grow mt-2 p-4 space-y-4 shadow-inner rounded-lg bg-gray-900/60 overflow-y-auto overscroll-contain">
              {
                overview &&
                getOverviewItems()
              }
            </div>
          </div>
        </div>
      }
      <div className="ml-24 px-8 pt-4 pb-8 flex-grow flex space-x-4">
        <div className="flex-grow flex flex-col bg-white p-4 space-y-2 rounded-lg ring-1 ring-gray-900/5 shadow-lg">
          <div className="flex">
            <p className="text-xl text-gray-900/90 font-bold font-serif">Project</p>
            <div className="flex-grow flex space-x-2 justify-end">
              <button onClick={()=>setMode(RepoMode.APROJECT)} className="p-1 rounded-full hover:bg-gray-200"><img src={addIcon} className="h-6 w-6"/></button>
              <button onClick={()=>{
                if (mode == RepoMode.DPROJECT) setMode(RepoMode.NORMAL);
                else setMode(RepoMode.DPROJECT);
              }} className="p-1 rounded-full hover:bg-gray-200"><img src={deleteIcon} className="h-6 w-6"/></button>
            </div>
          </div>
          <div className="mt-2 p-4 flex-grow grid grid-cols-5 gap-4 shadow-inner rounded-lg bg-gray-900/60">
            {
              projects &&
              projects.map((project, index) => 
                <Button key={index} title={project} onClick={()=>navigate(`/${user}/project/${project}`)} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}