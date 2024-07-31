import { Body, Controller, Del, Get, Inject, Post, Query } from "@midwayjs/core";
import { Rule, RuleType } from "@midwayjs/validate";
import { ProjectService } from "../service/project.service";

class CreateBody {
  @Rule(RuleType.string().required())
  project: string;

  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  startTime: string;

  @Rule(RuleType.string().required())
  endTime: string;

  @Rule(RuleType.number().required())
  groupId: number;
}

@Controller('/task')
export class TaskController {

  @Inject()
  projectService: ProjectService;

  @Get('/query')
  async query(@Query('project') project: string, @Query('task') task: string) {
    if (!this.projectService.open(project)) return { success: false, reason: 'Project didn\'t exists' };
    let taskInfo = this.projectService.getTask(task);
    if (!taskInfo) return { success: false, reason: 'Task didn\'t exists' };
    this.projectService.close();
    return { success: true, data: taskInfo };
  }

  @Post('/create')
  async create(@Body() body: CreateBody) {
    if (!this.projectService.open(body.project)) return { success: false, reason: 'Project didn\'t exists' };
    if (!this.projectService.addTask(body.name, body.startTime, body.endTime, body.groupId)) {
      this.projectService.close();
      return { success: false, reason: 'Task name duplicated' };
    }
    this.projectService.close();
    return { success: true, data: null };
  }

  @Del('/delete')
  async deleteTask(@Body() body) {
    if (!this.projectService.open(body.project)) return { success: false, reason: 'Project didn\'t exists' };
    if (!this.projectService.deleteTask(body.task)) {
      this.projectService.close();
      return { success: false, reason: 'Task didn\'t exists' };
    }
    this.projectService.close();
    return { success: true, data: null };
  }

  @Post('/upload')
  async upload(@Body() body) {
    //TODO: upload attachments
  }

  @Post('/download')
  async download(@Body() body) {
    //TODO: download attachments
  }

  @Post('/comment')
  async comment(@Body() body) {
    if (!this.projectService.open(body.project)) return { success: false, reason: 'Project didn\'t exists' };
    if (!this.projectService.commentTask(body.task, body.user, body.content)) {
      this.projectService.close();
      return { success: false, reason: 'Task didn\'t exists' };
    }
    this.projectService.close();
    return { success: true, data: null };
  }
}