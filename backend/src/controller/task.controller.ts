import { Controller, Get, Inject, Query } from "@midwayjs/core";
import { TaskService } from "../service/task.service";

@Controller('/task')
export class TaskController {
  @Inject()
  taskService: TaskService;

  @Get('/query')
  async query(@Query('wuid') wuid: number) {
    const stat = this.taskService.getTaskInfos(wuid);
    return stat;
  }
}