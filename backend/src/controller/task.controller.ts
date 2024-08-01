import { Body, Controller, Del, Get, Inject, Patch, Post, Query } from "@midwayjs/core";
import { Rule, RuleType } from "@midwayjs/validate";
import { ProjectService } from "../service/project.service";
import { ITask } from "../interface";

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

  private dateToString(date: Date) {
    return date.toString().substring(0, 16).replace('T', ' ');
  }

  private processReturnTask(task: ITask) {
    let ret = {
      name: task.name,
      startTime: this.dateToString(task.startTime),
      endTime: this.dateToString(task.endTime),
      group: this.projectService.getGroup(task.groupId),
      comments: task.comments,
      attachments: task.attachments,
    }
    return ret;
  }

  @Get('/query')
  async query(@Query('project') project: string, @Query('task') task: string) {
    if (!this.projectService.open(project)) return { success: false, reason: 'Project doesn\'t exists' };
    let taskInfo = this.projectService.getTask(task);
    if (!taskInfo) return { success: false, reason: 'Task doesn\'t exists' };
    let ret = this.processReturnTask(taskInfo);
    this.projectService.close();
    return { success: true, data: ret };
  }

  @Post('/create')
  async create(@Body() body: CreateBody) {
    if (!this.projectService.open(body.project)) return { success: false, reason: 'Project doesn\'t exists' };
    if (!this.projectService.addTask(body.name, body.startTime, body.endTime, body.groupId)) {
      this.projectService.close();
      return { success: false, reason: 'Task name duplicated' };
    }
    this.projectService.close();
    return { success: true, data: null };
  }

  @Del('/delete')
  async deleteTask(@Query('project') project: string, @Query('task') task: string) {
    if (!this.projectService.open(project)) return { success: false, reason: 'Project doesn\'t exists' };
    if (!this.projectService.deleteTask(task)) {
      this.projectService.close();
      return { success: false, reason: 'Task doesn\'t exists' };
    }
    this.projectService.close();
    return { success: true, data: null };
  }

  @Patch('/move')
  async move(@Body() body) {
    if (!this.projectService.open(body.project)) return { success: false, reason: 'Project doesn\'t exists' };
    if (!this.projectService.moveTask(body.task, body.distance)) {
      this.projectService.close();
      return { success: false, reason: 'Task doesn\'t exists' };
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
    if (!this.projectService.open(body.project)) return { success: false, reason: 'Project doesn\'t exists' };
    if (!this.projectService.commentTask(body.task, body.user, body.content)) {
      this.projectService.close();
      return { success: false, reason: 'Task doesn\'t exists' };
    }
    this.projectService.close();
    return { success: true, data: null };
  }
}