import { Destroy, Provide, Scope, ScopeEnum } from "@midwayjs/core";
import * as fs from "fs"
import { IUser } from "../interface";

@Provide()
@Scope(ScopeEnum.Singleton)
export class UserService {
  private userList: IUser[] = null;

  constructor() {
    let data = fs.readFileSync('src/database/user.json', 'utf-8');
    this.userList = JSON.parse(data);
    console.log(this.userList);
  }

  @Destroy()
  async destroy() {
    let data = JSON.stringify(this.userList);
    fs.writeFileSync('src/database/user.json', data, 'utf-8');
  }

  public getUser(name: string) {
    return this.userList.find(user=>user.name == name);
  }

  public addUser(name: string, password: string) {
    if (this.getUser(name)) return false;
    let newUser: IUser = {
      name: name,
      password: password,
      projects: [],
    };
    this.userList.push(newUser);
    return true;
  }
}