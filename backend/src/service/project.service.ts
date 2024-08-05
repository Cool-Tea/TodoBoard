import { Destroy, Inject, Provide, Scope, ScopeEnum } from "@midwayjs/core";
import { IProject, ITask } from "../interface";
import * as fs from "fs"
import { UserService } from "./user.service";

@Provide()
@Scope(ScopeEnum.Singleton)
export class ProjectService {
  private projectList: string[] = null;
  private project: IProject = null;

  @Inject()
  userService: UserService;

  constructor() {
    let data = fs.readFileSync('database/project.json', 'utf-8');
    this.projectList = JSON.parse(data);
    console.log(this.projectList);
  }

  private saveList() {
    let data = JSON.stringify(this.projectList);
    fs.writeFileSync('database/project.json', data, 'utf-8');
  }

  @Destroy()
  async destroy() {
    this.close();
    this.saveList();
  }

  public open(name: string) {
    if (!this.projectList.includes(name)) {
      return false;
    }
    let data = fs.readFileSync(`database/projects/${name}.json`, 'utf-8');
    this.project = JSON.parse(data);
    console.log(`==== Openning ${name} ====`)
    console.log(this.project);
    return true;
  }

  public close() {
    if (!this.project) return;
    console.log(`==== Closing ${this.project.name} ====`)
    console.log(this.project);
    let data = JSON.stringify(this.project);
    fs.writeFileSync(`database/projects/${this.project.name}.json`, data, 'utf-8');
    this.project = null;
  }

  public getTask(name: string): ITask | undefined {
    return this.project.tasks.find(task => task.name == name);
  }

  public addTask(name: string, startTime: string, endTime: string, groupId: number) {
    if (this.getTask(name)) return false;
    let newTask: ITask = {
      name: name,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      groupId: groupId,
      attachments: [],
      comments: [],
    };
    this.project.tasks.push(newTask);
    return true;
  }

  public deleteTask(name: string) {
    let task = this.getTask(name);
    if (!task) return false;
    this.project.tasks.splice(this.project.tasks.indexOf(task), 1);
    return true;
  }

  public moveTask(name: string, distance: number) {
    let task = this.getTask(name);
    let groupCount = this.project.groups.length;
    if (!task) return false;
    task.groupId = (task.groupId + groupCount + distance) % groupCount;
    return true;
  }

  public attachTask(name: string, filepath: string, filename: string) {
    let task = this.getTask(name);
    if (!task) return false;
    task.attachments.push(filename);
    fs.copyFileSync(filepath, `database/projects/${this.project.name}/${filename}`);
    return true;
  }

  public downloadAttachment(name: string, filename: string) {
    let task = this.getTask(name);
    if (!task || !task.attachments.includes(filename)) return null;
    let stream = fs.createReadStream(`database/projects/${this.project.name}/${filename}`);
    return stream;
  }

  public commentTask(name: string, user: string, content: string) {
    let task = this.getTask(name);
    if (!task) return false;
    task.comments.push({user: user, content: content});
    return true;
  }

  public getGroup(id: number) {
    return this.project.groups[id];
  }

  public getGroupId(name: string) {
    return this.project.groups.indexOf(name);
  }

  public addGroup(name: string) {
    if (this.project.groups.includes(name)) return false;
    this.project.groups.push(name);
    return true;
  }

  public deleteGroup(name: string) {
    if (!this.project.groups.includes(name)) return false;
    let id = this.project.groups.indexOf(name);
    let toBeDelete = [];
    this.project.tasks.forEach((task, index) => {
      if (task.groupId == id) toBeDelete.push(index);
      else if (task.groupId > id) task.groupId--;
    });
    this.project.groups.splice(id, 1);
    this.project.tasks = this.project.tasks.filter((task, index) => !toBeDelete.includes(index));
    return true;
  }

  public addMember(user: string) {
    if (this.project.members.includes(user)) return false;
    this.project.members.push(user);
    return true;
  }

  public deleteMember(user: string) {
    let id = this.project.members.indexOf(user);
    if (id < 0) return false;
    this.project.members.splice(id, 1);
    return true;
  }

  public getProject(name: string) {
    return this.project;
  }

  public getProjectList() {
    return this.projectList;
  }

  public addProject(user: string, name: string) {
    if (this.projectList.includes(name)) return false;
    let newProject: IProject = {
      owner: user,
      members: [],
      name: name,
      groups: [],
      tasks: [],
    };
    console.log(`==== Adding new project ====`);
    console.log(newProject);
    this.projectList.push(name);
    let data = JSON.stringify(newProject);
    fs.writeFileSync(`database/projects/${name}.json`, data, 'utf-8');
    fs.mkdirSync(`database/projects/${name}`);
    return true;
  }

  public deleteProject(user: string, name: string) {
    console.log(`==== Deleting ${name} ====`)
    console.log(this.project);
    if (this.project.owner != user) return true;
    for (let member of this.project.members) {
      if (member != this.project.owner)
        this.userService.deleteProject(member, this.project.name);
    }
    let id = this.projectList.indexOf(name);
    this.projectList.splice(id, 1);
    console.log(`==== Deleting ${name}.json ====`)
    fs.unlinkSync(`database/projects/${name}.json`);
    console.log(`==== Deleting ${name} directory ====`)
    fs.rmSync(`database/projects/${name}`, { recursive: true });
    return true;
  }
}