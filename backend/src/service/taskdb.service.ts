import { Destroy, Inject, Provide, Scope, ScopeEnum } from "@midwayjs/core";
import { ITaskInfo, TaskStatus } from "../interface";
import * as fs from "fs"
import { dbPath } from "./dbUtils";
import { WorkspaceDB } from "./workspacedb.service";

@Provide()
@Scope(ScopeEnum.Singleton)
export class TaskDB {
  private taskData: ITaskInfo[];

  @Inject()
  workspacedb: WorkspaceDB;

  constructor() {
    this.readData(`${dbPath}/task/taskData.json`);
  }

  @Destroy()
  async destory() {
    this.saveData(`${dbPath}/task/taskData.json`);
  }

  private readData(path: string) {
    let data = fs.readFileSync(path, 'utf-8');
    console.log('task: ' + data);
    this.taskData = JSON.parse(data);
  }

  private saveData(path: string) {
    const jsonStr = JSON.stringify(this.taskData);
    fs.writeFileSync(path, jsonStr, 'utf-8');
  }

  public getTaskInfoByTuid(tuid: number): ITaskInfo | null {
    if (tuid >= this.taskData.length) return null;
    return this.taskData[tuid];
  }

  public addTask(wuid: number, name: string, startTime: Date, endTime: Date, members: number[] = []) {
    let newTask: ITaskInfo = {
      wuid: wuid,
      tuid: this.taskData.length,
      name: name, 
      startTime: startTime,
      endTime: endTime,
      status: TaskStatus.TODO,
      members: members,
      comments: [],
    }
    this.taskData.push(newTask);
    this.workspacedb.workspaceAddTask(wuid, newTask.tuid);
    console.log(this.taskData);
    return newTask.tuid;
  }

  public deleteTask(tuid: number) {
    const tinfo = this.getTaskInfoByTuid(tuid);
    if (!tinfo) return false;
    this.workspacedb.workspaceDeleteTask(tinfo.wuid, tuid);
  }
}