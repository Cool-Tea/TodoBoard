import React from "react";
import reactIcon from "../assets/react.svg"
import repoIcon from "../assets/Repo.png"
import addIcon from "../assets/add.png"
import deleteIcon from "../assets/delete.png"
import logoutIcon from "../assets/logout.png"
import backIcon from "../assets/back.png"
import { useNavigate, useParams } from "react-router";

function Button({icon, title, onClick}) {
  return (
    <button onClick={onClick} className="p-2 rounded-lg flex flex-col items-center hover:bg-gray-200">
      <img src={icon} className="w-8 h-8" />
      <p className="text-sm">{title}</p>
    </button>
  )
}

export enum SideBarStatus {
  REPO, PROJECT, TASK
}

export function SideBar({status} : {status : SideBarStatus}) {
  const navigate = useNavigate();
  const { user, project, task } = useParams();

  function getTaskButtons() {
    return (
      <>
        <Button icon={backIcon} title="Back" onClick={()=>navigate(`/${user}/project/${project}`)} />
      </>
    )
  }

  function getProjectButtons() {
    return (
      <>
        <Button icon={addIcon} title="Add Group" onClick={()=>{}} />
        <Button icon={deleteIcon} title="Delete Group" onClick={()=>{}}/>
        <Button icon={backIcon} title="Back" onClick={()=>navigate(`/${user}/repository`)} />
      </>
    )
  }

  function getRepoButtons() {
    return (
      <>
        <Button icon={addIcon} title="Add Project" onClick={()=>{}}/>
        <Button icon={deleteIcon} title="Delete Project" onClick={()=>{}}/>
      </>
    )
  }

  function getButtons() {
    switch (status) {
      case SideBarStatus.REPO:
        return getRepoButtons();
      case SideBarStatus.PROJECT:
        return getProjectButtons();
      case SideBarStatus.TASK:
        return getTaskButtons();
      default:
        return null;
    }
  }

  return (
    <div className="absolute inset-0 z-50 bg-white py-4 px-2 w-24 text-center items-center ring-1 ring-gray-900/5 shadow-xl flex flex-col space-y-8">
      <img src={reactIcon} className="w-12 h-12" />
      <div className="p-2 ring-1 ring-gray-900/5 shadow-lg text-center text-white rounded-md bg-gray-900/60">
        {user}
      </div>
      <div className="flex flex-col space-y-4">
        <Button icon={repoIcon} title="Repository" onClick={()=>navigate(`/${user}/repository`)}/>
        {getButtons()}
        <Button icon={logoutIcon} title="Logout" onClick={()=>navigate('/login')}/>
      </div>
    </div>
  )
}