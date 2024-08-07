import React, { useEffect, useState } from "react";
import { SideBar, SideBarStatus } from "../components/SideBar";
import addIcon from "../assets/add.png"
import fileIcon from "../assets/file.png"
import crossIcon from "../assets/crossNoCircle.png"
import { useParams } from "react-router";
import * as axios from "axios"

export function Task() {
  const { user, project, task } = useParams();
  const [ taskInfo, setInfo ] = useState<any>(null);
  const client = axios.default;
  const [showUpload, setUpload] = useState(false);

  function getTaskInfo() {
    client.get('http://127.0.0.1:7001/task/query', { params: { project: project, task: task } }).then(res => {
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

  useEffect(getTaskInfo, []);

  function attachTask() {
    const file = document.getElementById('file') as HTMLInputElement;
    if (!file.files || !file.files[0]) return;
    let data = new FormData();
    data.set('file', file.files[0]);
    data.set('project', project!);
    data.set('task', task!);
    client.post("http://127.0.0.1:7001/task/upload", data).then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
      }
      else {
        getTaskInfo();
      }
    }).catch(err => console.log(`Error: ${err}`));
  }

  function unattachTask(file: string) {
    client.delete("http://127.0.0.1:7001/task/unattach", { params: { project: project, task: task, file: file } }).then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
      }
      else {
        getTaskInfo();
      }
    }).catch(err => `Error: ${err}`);
  }

  function downloadAttachment(name: string) {
    client.get("http://127.0.0.1:7001/task/download", { params: { project: project, task: task, file: name }, responseType: 'blob' }).then(res => {
      let { data, headers } = res;
      console.log(headers);
      let filename: string = headers['content-disposition'].replace(/attachment; filename=(.*)/, '$1');
      let blob = new Blob([data], {type: headers['Content-Type']?.toString()});
      let dom = document.createElement('a')
      let url = window.URL.createObjectURL(blob)
      dom.href = url
      dom.download = decodeURI(filename)
      dom.style.display = 'none'
      document.body.appendChild(dom)
      dom.click()
      dom.parentNode!.removeChild(dom)
      window.URL.revokeObjectURL(url)
    }).catch(err => console.log(`Error: ${err}`));
  }

  function commentTask() {
    const comment = document.getElementById('comment') as HTMLInputElement;
    if (comment.value.length == 0) return;
    let data = { project: project, task: task, user: user, content: comment.value };
    client.post("http://127.0.0.1:7001/task/comment", data).then(res => {
      let body = res.data;
      if (!body.success) {
        console.log(`Error: ${body.reason}`);
      }
      else {
        getTaskInfo();
      }
    }).catch(err => console.log(`Error: ${err}`));
    comment.value = '';
  }

  return (
    <div className="relative bg-[url('src/assets/background.jpg')] bg-cover min-h-screen flex">
      <SideBar status={SideBarStatus.TASK} />
      <div className="ml-24 px-8 pt-4 pb-8 flex-grow flex space-x-4">
        <div className="w-1/3 flex flex-col space-y-4">
          <div className="flex-initial bg-white p-4 space-y-2 rounded-lg ring-1 ring-gray-900/5 shadow-lg">
            <div className="text-xl font-bold font-serif text-gray-900/90">
              Info
            </div>
            <div className="p-2 text-md shadow-inner space-y-2 rounded-md bg-gray-900/60 text-white">
              {
                taskInfo && 
                <>
                  <p>Name: {taskInfo.name}</p>
                  <p>Start Time: {taskInfo.startTime}</p>
                  <p>End Time: {taskInfo.endTime}</p>
                  <p>Group: {taskInfo.group}</p>
                </>
              }
            </div>
          </div>
          <div className="flex-inital bg-white p-4 space-y-2 rounded-lg ring-1 ring-gray-900/5 shadow-lg">
            <div className="flex flex-row justify-between items-center text-xl text-gray-900/90">
              <p className="font-bold font-serif">Attachment</p>
              <button onClick={()=>setUpload(!showUpload)} className="p-1 rounded-full transition ease-in-out hover:scale-110 hover:bg-gray-200"><img src={addIcon} className="h-6 w-6"/></button>
            </div>
            <div className="p-2 text-md shadow-inner rounded-md bg-gray-900/60 text-white grid grid-cols-4">
              {
                taskInfo && taskInfo.attachments.map((attachment, index) => 
                  <button key={index} onClick={()=>downloadAttachment(attachment)} className="relative group/item p-2 rounded-lg flex flex-col items-center hover:bg-gray-400">
                    <button onClick={()=>unattachTask(attachment)} className="absolute invisible group-hover/item:visible top-0 right-0 rounded-full transition ease-in-out hover:scale-[1.5] hover:bg-gray-200/50"><img src={crossIcon} className="h-4 w-4 rounded-full invert" /></button>
                    <img src={fileIcon} className="h-6 w-6 invert" />
                    <p className="max-w-24 truncate">{attachment}</p>
                  </button>
                )
              }
            </div>
            {
              showUpload &&
              <div className="flex justify-between">
                <input type="file" id="file" />
                <button onClick={attachTask} className="text-white px-2 py-1 rounded-lg bg-sky-600 hover:bg-sky-800">Add</button>
              </div>
            }
          </div>
        </div>
        <div className="w-2/3 flex flex-col">
          <div className="flex-1 flex flex-col bg-white p-4 space-y-2 rounded-lg ring-1 ring-gray-900/5 shadow-lg">
            <div className="text-xl font-bold font-serif text-gray-900/90">
              Comment
            </div>
            <div className="flex-grow p-2 text-md shadow-inner space-y-2 rounded-md bg-gray-900/60 text-white">
              {
                taskInfo && taskInfo.comments.map((comment, index) => 
                  <div key={index}>
                    {comment.user}: {comment.content}
                  </div>
                )
              }
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <input type="text" id="comment" className="flex-grow px-2 rounded-lg ring-1 ring-gray-900/50" />
              <button onClick={commentTask} className="px-2 py-1 rounded-lg bg-sky-600 text-white">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}