import { Destroy, Provide } from "@midwayjs/core";
import { IProject, ITask } from "../interface";
import * as fs from "fs"

@Provide()
export class ProjectService {
  private projectList: string[] = null;
  private project: IProject = null;

  constructor() {
    let data = fs.readFileSync('src/database/project.json', 'utf-8');
    this.projectList = JSON.parse(data);
    console.log(this.projectList);
  }

  @Destroy()
  async destroy() {
    this.close();
    let data = JSON.stringify(this.projectList);
    fs.writeFileSync('src/database/project.json', data, 'utf-8');
  }

  public open(name: string) {
    if (!this.projectList.includes(name)) {
      return false;
    }
    let data = fs.readFileSync(`src/database/projects/${name}.json`, 'utf-8');
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
    fs.writeFileSync(`src/database/projects/${this.project.name}.json`, data, 'utf-8');
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
    this.projectList.push(name);
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

  public attachTask(name: string) {
    //TODO: add attachment
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

  public addProject(name: string) {
    if (this.projectList.includes(name)) return false;
    let newProject: IProject = {
      name: name,
      groups: [],
      tasks: [],
    };
    console.log(newProject);
    this.projectList.push(name);
    let data = JSON.stringify(newProject);
    fs.writeFileSync(`src/database/projects/${name}.json`, data, 'utf-8');
    fs.mkdirSync(`src/database/projects/${name}`);
    return true;
  }
}