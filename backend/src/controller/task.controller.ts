import { Body, Controller, Del, Fields, Files, Get, Inject, Patch, Post, Query } from "@midwayjs/core";
import { Rule, RuleType } from "@midwayjs/validate";
import { ProjectService } from "../service/project.service";
import { ITask } from "../interface";
import { Context } from "@midwayjs/koa";

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

  @Inject()
  ctx: Context;

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
  async upload(@Files() files, @Fields() fields) {
    if (!this.projectService.open(fields.project)) return { success: false, reason: 'Project doesn\'t exists' };
    console.log(`==== Uploading ${fields.task} ====`);
    console.log(files);
    for (let file of files) {
      if (!this.projectService.attachTask(fields.task, file.data, file.filename)) {
        this.projectService.close();
        return { success: false, reason: 'Task doesn\'t exists' };
      }
    }
    this.projectService.close();
    return { success: true, data: null };
  }

  @Get('/download')
  async download(@Query('project') project: string, @Query('task') task: string, @Query('file') file: string) {
    console.log(`==== Downloading ${file} ====`);
    this.ctx.set('Content-Type', 'appliaction/octet-stream');
    this.ctx.set('Content-Disposition', `attachment; filename=${file}`);
    if (!this.projectService.open(project)) {
      this.ctx.status = 404;
      this.ctx.body = 'Project doesn\'t exists';
      return;
    }
    let ret = this.projectService.downloadAttachment(task, file);
    if (!ret) {
      this.projectService.close();
      this.ctx.status = 404;
      this.ctx.body = 'Task doesn\'t exists';
      return;
    }
    this.projectService.close();
    this.ctx.body = ret;
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