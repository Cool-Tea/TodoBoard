import { Destroy, Inject, Provide, Scope, ScopeEnum } from "@midwayjs/core";
import * as fs from "fs"
import { IUser } from "../interface";
import { ProjectService } from "./project.service";

@Provide()
@Scope(ScopeEnum.Singleton)
export class UserService {
  private userList: IUser[] = null;

  @Inject()
  projectService: ProjectService;

  constructor() {
    let data = fs.readFileSync('database/user.json', 'utf-8');
    this.userList = JSON.parse(data);
    console.log(this.userList);
  }

  public saveList() {
    let data = JSON.stringify(this.userList);
    fs.writeFileSync('database/user.json', data, 'utf-8');
  }

  @Destroy()
  async destroy() {
    this.saveList();
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

  public addProject(user: string, project: string) {
    let userInfo = this.getUser(user);
    if (userInfo.projects.includes(project)) return false;
    userInfo.projects.push(project);
    if (!this.projectService.open(project)) return false;
    this.projectService.addMember(user);
    this.projectService.close();
    return true;
  }

  public deleteProject(user: string, project: string) {
    let userInfo = this.getUser(user);
    let id = userInfo.projects.indexOf(project);
    if (id < 0) return false;
    userInfo.projects.splice(id, 1);
    return true;
  }
}