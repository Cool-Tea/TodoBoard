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

  private saveList() {
    let data = JSON.stringify(this.projectList);
    fs.writeFileSync('src/database/project.json', data, 'utf-8');
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

  public attachTask(name: string, filepath: string, filename: string) {
    let task = this.getTask(name);
    if (!task) return false;
    task.attachments.push(filename);
    fs.copyFileSync(filepath, `src/database/projects/${this.project.name}/${filename}`);
    return true;
  }

  public downloadAttachment(name: string, filename: string) {
    let task = this.getTask(name);
    if (!task || !task.attachments.includes(filename)) return null;
    let stream = fs.createReadStream(`src/database/projects/${this.project.name}/${filename}`);
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
      name: name,
      groups: [],
      tasks: [],
    };
    console.log(newProject);
    this.projectList.push(name);
    this.saveList();
    let data = JSON.stringify(newProject);
    fs.writeFileSync(`src/database/projects/${name}.json`, data, 'utf-8');
    fs.mkdirSync(`src/database/projects/${name}`);
    return true;
  }

  public deleteProject(user: string, name: string) {
    this.close();
    if (!this.projectList.includes(name)) return false;
    if (!this.open(name)) return false;
    if (this.project.owner != user) {
      this.close();
      return true;
    }
    this.close();
    let id = this.projectList.indexOf(name);
    this.projectList.splice(id, 1);
    this.saveList();
    fs.rmSync(`src/database/projects/${name}.json`);
    fs.rmSync(`src/database/projects/${name}`, { recursive: true, force: true });
    return true;
  }
}