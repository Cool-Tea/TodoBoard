import { Inject, Provide } from "@midwayjs/core";
import { TaskDB } from "./taskdb.service";
import { WorkspaceDB } from "./workspacedb.service";

@Provide()
export class TaskService {
  @Inject()
  taskdb: TaskDB;

  @Inject()
  workspacedb: WorkspaceDB;

  public getTaskInfos(wuid: number) {
    const tuids = this.workspacedb.workspaceGetTasks(wuid);
    const taskInfos = tuids.map(tuid => {
      return this.taskdb.getTaskInfoByTuid(tuid);
    });
    return taskInfos;
  }
}