import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as axios from "axios"
import { ToolBarButton } from "./ToolBarButton";
import { ToolBar } from "./ToolBar";

function WSButton({title, isDel, onClick}: {title: string, isDel: boolean, onClick: ()=>void}) {

  return (
    <button onClick={onClick} className={`p-2 bg-white rounded-md shadow-md ${isDel && "border-2 border-dashed border-slate-600"}`}>
      {title}
    </button>
  )
}

enum Mode {
  DEFAULT, CREATE, DELETE
}

export function RepoBoard({uuid} : {uuid: number}) {
  const [infos, setInfos] = useState<{wuid: number, name: string}[]>([]);
  const [mode, setMode] = useState(Mode.DEFAULT);
  const [hint, setHint] = useState<string | null>(null);
  const navigator = useNavigate();
  const client = axios.default;

  useEffect(getWorkspaceInfos, []);

  function getWorkspaceInfos() {
    client.get("http://127.0.0.1:7001/workspace/query", {
      params: { uuid: uuid }
    }).then(response => {
      const body = response.data;
      if (!body.authenticated) {
        navigator('/login');
      }
      else {
        console.log(body);
        setInfos(body.data);
      }
    }).catch(err => {
      console.log("Error: " + err);
    });
  }
  
  function showHint() {
    return hint && <p className="text-md text-red-600/90 text-center">{hint}</p>
  }

  function ToggleDelete() {
    if (mode == Mode.DELETE) setMode(Mode.DEFAULT);
    else setMode(Mode.DELETE);
  }

  function submitCreate() {
    event?.preventDefault();
    const cwsform = document.getElementById("createWSForm") as HTMLFormElement;
    const data = new FormData(cwsform);
    client.post("http://127.0.0.1:7001/workspace/create", { uuid: uuid, name: data.get("name") }).then(response => {
      const body = response.data;
      console.log(body);
      if (body.validity) {
        console.log('Valid');
        setMode(Mode.DEFAULT);
      }
      else {
        setHint(body.reason);
      }
    }).catch(err => {
      console.log("Error: " + err);
    });
  }

  function submitDelete(wuid: number) {
    console.log('Deleting ' + wuid);
    client.delete("http://127.0.0.1:7001/workspace/delete", { params: { wuid: wuid } }).then(response => {
      const body = response.data;
      console.log(body);
      getWorkspaceInfos();
    }).catch(err => {
      console.log("Error: " + err);
    });
  }

  return (
    <div className="relative flex flex-col space-y-4 flex-grow px-8 pb-8 pt-4 m-0 bg-sky-50 text-base">
      {mode == Mode.CREATE && 
        <div className="absolute inset-0 backdrop-blur-sm backdrop-brightness-50 flex items-center justify-center">
          <div className="flex flex-col space-y-6 bg-white px-6 pt-10 pb-8 shadow-xl rounded-lg ring-1 ring-gray-900/5">
            <h1 className="font-serif font-semibold text-4xl text-slate-800/90 text-center">Create WorkSpace</h1>
            <form id="createWSForm" onSubmit={submitCreate} className="flex flex-grow flex-col space-y-4 text-lg font-semibold font-serif">
              <div>
                Name: <input type="text" name="name" required className="ml-2 px-2 ring-2 ring-slate-900/30 rounded-lg shadow-sm" />
              </div>
              {showHint()}
              <div className="flex flex-row justify-between">
                <button className="bg-sky-600 text-white px-2 rounded-lg shadow-sm hover:bg-sky-800 hover:text-white/80" onClick={()=>setMode(Mode.DEFAULT)}>
                  Cancel
                </button>
                <button type="submit" className="bg-sky-600 text-white px-2 rounded-lg shadow-sm hover:bg-sky-800 hover:text-white/80">
                  Comfirm
                </button>
              </div>
            </form>
          </div>
        </div>
      }
      <ToolBar>
        <ToolBarButton title="Create Workspace" onClick={()=>setMode(Mode.CREATE)} />
        <ToolBarButton title="Delete Workspace" onClick={ToggleDelete} />
      </ToolBar>
      <div className="flex-grow shadow-inner ring-1 ring-slate-900/5 p-4 bg-sky-100/80 rounded-lg min-h-full grid grid-cols-4 gap-4 items-start">
      {
        infos.map((info, index) => 
          <WSButton key={index} title={info.name} isDel={mode == Mode.DELETE} onClick={()=>{
            if (mode == Mode.DELETE) submitDelete(info.wuid);
            else navigator(`/${uuid}/workspace/${info.wuid}`);
          }} />
        )
      }
      </div>
    </div>
  )
}