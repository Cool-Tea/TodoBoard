import { Destroy, Provide, Scope, ScopeEnum } from "@midwayjs/core";
import { IUserInfo } from "../interface";
import { dbPath, jsonToMap, mapToJson } from "./dbUtils";
import * as fs from 'fs'

@Provide()
@Scope(ScopeEnum.Singleton)
export class UserDB {
  private userData: IUserInfo[];
  private nameToUuid: Map<string, number>;
  
  constructor() {
    this.readData(`${dbPath}/user/userData.json`);
    this.readNameToUuid(`${dbPath}/user/nameToUuid.json`);
  }

  @Destroy()
  async destroy() {
    this.saveData(`${dbPath}/user/userData.json`);
    this.saveNameToUuid(`${dbPath}/user/nameToUuid.json`);
  }

  private readData(path: string) {
    let data = fs.readFileSync(path, 'utf-8');
    console.log('user: ' + data);
    this.userData = JSON.parse(data);
  }

  private readNameToUuid(path: string) {
    let data = fs.readFileSync(path, 'utf-8');
    console.log('map: ' + data);
    this.nameToUuid = jsonToMap(data);
  }

  private saveData(path: string) {
    const jsonStr = JSON.stringify(this.userData);
    fs.writeFileSync(path, jsonStr, 'utf-8');
  }

  private saveNameToUuid(path: string) {
    const jsonStr = mapToJson(this.nameToUuid);
    fs.writeFileSync(path, jsonStr, 'utf-8');
  }

  public getUserInfoByName(userName: string): IUserInfo | null {
    if (!this.nameToUuid.has(userName)) return null;
    return this.userData[this.nameToUuid.get(userName)];
  }

  public getUserInfoByUuid(uuid: number): IUserInfo | null {
    if (uuid >= this.userData.length) return null;
    return this.userData[uuid];
  }

  public addUser(userName: string, password: string, avatar: string = 'default.png'): number {
    if (this.getUserInfoByName(userName)) return -1;
    let newUser: IUserInfo = {
      uuid: this.userData.length,
      userName: userName,
      password: password,
      avatar: avatar,
      workspaces: [],
    };
    this.userData.push(newUser);
    this.nameToUuid.set(userName, newUser.uuid);
    console.log(this.userData);
    console.log(this.nameToUuid);
    return newUser.uuid;
  }

  public userQueryWorkspace(uuid: number) {
    return this.getUserInfoByUuid(uuid).workspaces;
  }

  public userAddWorkspace(uuid: number, wuid: number) {
    this.getUserInfoByUuid(uuid).workspaces.push(wuid);
  }
  
  public userDeleteWorkspace(uuid: number, wuid: number) {
    let ws = this.getUserInfoByUuid(uuid).workspaces;
    if (ws.indexOf(wuid) >= 0) ws.splice(ws.indexOf(wuid), 1);
  }
}