import React, { useEffect, useState } from "react";
import { SideBar, SideBarStatus } from "../components/SideBar";
import { Group } from "../components/Group";
import { useParams } from "react-router";
import * as axios from "axios"
import reactIcon from "../assets/react.svg"

export enum ProjectMode {
  NORMAL, AGROUP, DGROUP, ATask, DTask
}

export function Project() {
  const { user, project } = useParams();
  const [projectInfo, setInfo] = useState<any>(null);
  const [mode, setMode] = useState<ProjectMode>(ProjectMode.NORMAL);
  const [reason, setReason] = useState<string | null>(null);
  const [group, setGroup] = useState(0);
  const client = axios.default;

  function getProjectInfo() {
    client.get("http://127.0.0.1:7001/project/summary", { params: { project: project } }).then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
      }
      else {
        setInfo(body.data);
        console.log(body.data);
      }
    }).catch(err => console.log(`Error: ${err}`));
  }

  useEffect(getProjectInfo, []);

  function isInBlurMode() {
    return mode == ProjectMode.AGROUP || mode == ProjectMode.ATask;
  }

  function getGroupInputItems() {
    return (
      <>
        <div className="flex flex-row items-center space-x-4">
          <img src={reactIcon} className="w-12 h-12" />
          <p className="font-serif text-2xl font-bold">Add Group</p>
        </div>
        <div className="text-lg px-2 space-y-2">
          Group Name: <input type="text" id="group" required className="px-2 rounded-lg ring-1 ring-gray-900/50" />
          {
            reason && 
            <div className="text-red-600 text-sm">
              {reason}
            </div>
          }
          <div className="flex justify-between">
            <button onClick={()=>{setReason(null);setMode(ProjectMode.NORMAL);}} className="text-sky-600 hover:text-sky-800">Back</button>
            <button onClick={addGroup} className="text-white px-2 py-1 rounded-lg bg-sky-600 hover:bg-sky-800">Add</button>
          </div>
        </div>
      </>
    )
  }

  function getTaskInputItems() {
    return (
      <>
        <div className="flex flex-row items-center space-x-4">
          <img src={reactIcon} className="w-12 h-12" />
          <p className="font-serif text-2xl font-bold">Add Task</p>
        </div>
        <form id="task" className="text-lg px-2 space-y-2" >
          Task Name: <input type="text" required name="name" className="px-2 rounded-lg ring-1 ring-gray-900/50" /> <br />
          Start Time: <input type="datetime-local" required name="startTime" className="px-2 rounded-lg ring-1 ring-gray-900/50" /> <br />
          End Time: <input type="datetime-local" required name="endTime" className="px-2 rounded-lg ring-1 ring-gray-900/50" /> <br />
          {
            reason && 
            <div className="text-red-600 text-sm">
              {reason}
            </div>
          }
          <div className="flex justify-between">
            <button onClick={()=>{setReason(null);setMode(ProjectMode.NORMAL);}} className="text-sky-600 hover:text-sky-800">Back</button>
            <button onClick={addTask} className="text-white px-2 py-1 rounded-lg bg-sky-600 hover:bg-sky-800">Add</button>
          </div>
        </form>
      </>
    )
  }

  function getInputItems() {
    switch (mode) {
      case ProjectMode.AGROUP: return getGroupInputItems();
      case ProjectMode.ATask: return getTaskInputItems();
      default: return <></>;
    }
  }

  function addTask() {
    event?.preventDefault();
    const task = document.getElementById('task') as HTMLFormElement;
    const formData = new FormData(task);
    let data = {
      project: project,
      name: formData.get("name"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      groupId: group,
    }
    client.post("http://127.0.0.1:7001/task/create", data).then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
        setReason(body.reason);
      }
      else {
        getProjectInfo();
        setMode(ProjectMode.NORMAL);
        setReason(null);
      }
    }).catch(err => console.log(`Error: ${err}`));
  }

  function deleteTask(task: string) {
    client.delete("http://127.0.0.1:7001/task/delete", { params: { project: project, task: task } }).then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
      }
      else {
        getProjectInfo();
      }
    }).catch(err => console.log(`Error: ${err}`));
  }

  function addGroup() {
    const group = document.getElementById('group') as HTMLInputElement;
    if (group.value.length == 0) return;
    let data = { project: project, name: group.value };
    client.post("http://127.0.0.1:7001/project/group/create", data).then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
        setReason(body.reason);
      }
      else {
        getProjectInfo();
        setMode(ProjectMode.NORMAL);
        group.value = '';
        setReason(null);
      }
    }).catch(err => console.log(`Error: ${err}`));
  }

  function deleteGroup(group: string) {
    client.delete("http://127.0.0.1:7001/project/group/delete", { params: { project: project, group: group } }).then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
      }
      else {
        getProjectInfo();
      }
    }).catch(err => console.log(`Error: ${err}`));
  }

  return (
    <div className="relative bg-sky-50 min-h-screen flex">
      <SideBar status={SideBarStatus.PROJECT} mode={mode} setMode={setMode} />
      {
        isInBlurMode() && 
        <div className="absolute inset-0 ml-24 z-40 backdrop-blur-lg backdrop-brightness-50 flex items-center justify-center">
          <div className="bg-white p-4 space-y-2 rounded-lg ring-1 ring-gray-900/5 shadow-lg">
            {getInputItems()}
          </div>
        </div>
      }
      <div className="ml-24 px-8 pt-4 pb-8 flex-grow flex flex-row space-x-6 items-start">
        {
          projectInfo &&
          projectInfo.groups.map((group, index) => 
            <Group key={index} index={index} group={group} mode={mode} setMode={setMode} deleteGroup={()=>deleteGroup(group.name)} setGroup={setGroup} deleteTask={deleteTask} />
          )
        }
      </div>
    </div>
  )
}