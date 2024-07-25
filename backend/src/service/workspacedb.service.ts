import { Destroy, Inject, Provide, Scope, ScopeEnum } from "@midwayjs/core";
import { dbPath, jsonToMap, mapToJson } from "./dbUtils";
import * as fs from "fs"
import { IWorkspaceInfo } from "../interface";
import { UserDB } from "./userdb.service";

@Provide()
@Scope(ScopeEnum.Singleton)
export class WorkspaceDB {
  private workspaceData: IWorkspaceInfo[];
  private nameToWuid: Map<string, number>;

  @Inject()
  userdb: UserDB;

  constructor() {
    console.log(this.workspaceData);
    console.log(this.nameToWuid);
    this.readData(`${dbPath}/workspace/workspaceData.json`);
    this.readNameToWuid(`${dbPath}/workspace/nameToWuid.json`);
  }

  @Destroy()
  async destroy() {
    this.saveData(`${dbPath}/workspace/workspaceData.json`);
    this.saveNameToUuid(`${dbPath}/workspace/nameToWuid.json`);
  }

  private readData(path: string) {
    let data = fs.readFileSync(path, 'utf-8');
    this.workspaceData = JSON.parse(data);
  }

  private readNameToWuid(path: string) {
    let data = fs.readFileSync(path, 'utf-8');
    this.nameToWuid = jsonToMap(data);
  }

  private saveData(path: string) {
    const jsonStr = JSON.stringify(this.workspaceData);
    fs.writeFileSync(path, jsonStr, 'utf-8');
  }

  private saveNameToUuid(path: string) {
    const jsonStr = mapToJson(this.nameToWuid);
    fs.writeFileSync(path, jsonStr, 'utf-8');
  }

  public isDeleted(wuid: number) {
    const info = this.getWorkspaceInfoByWuid(wuid);
    if (!info || !this.nameToWuid.has(info.name)) return true;
    return false;
  }

  public getWorkspaceInfoByWuid(wuid: number): IWorkspaceInfo | null {
    if (wuid >= this.workspaceData.length) return null;
    return this.workspaceData[wuid];
  }

  public getWorkspaceInfoByName(name: string): IWorkspaceInfo | null {
    if (!this.nameToWuid.has(name)) return null;
    return this.workspaceData[this.nameToWuid.get(name)];
  }

  public addWorkspace(name: string, members: number[]): number {
    if (this.nameToWuid.has(name)) return -1;
    let newWorkspace: IWorkspaceInfo = {
      wuid: this.workspaceData.length,
      name: name,
      tasks: [],
      members: members,
    };
    this.workspaceData.push(newWorkspace);
    this.nameToWuid.set(name, newWorkspace.wuid);
    members.forEach(member => {
      if (this.userdb.userQueryWorkspace(member).indexOf(newWorkspace.wuid) >= 0) return;
      this.userdb.userAddWorkspace(member, newWorkspace.wuid);
    })
    return newWorkspace.wuid;
  }

  public deleteWorkspace(wuid: number): boolean {
    if (this.isDeleted(wuid)) return false;
    this.workspaceData[wuid].members.forEach(member => {
      this.userdb.userDeleteWorkspace(member, wuid);
    })
    this.nameToWuid.delete(this.workspaceData[wuid].name);
    return true;
  }
}