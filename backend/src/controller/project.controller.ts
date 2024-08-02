import { Body, Controller, Del, Get, Inject, Post, Query } from "@midwayjs/core";
import { ProjectService } from "../service/project.service";
import { IProject } from "../interface";

@Controller('/project')
export class ProjectController {

  @Inject()
  projectService: ProjectService;

  private processReturnProject(info: IProject) {
    let n = info.groups.length;
    let groups = [];
    for (let i = 0; i < n; i++) {
      let group = {
        name: this.projectService.getGroup(i),
        tasks: info.tasks.filter(task => task.groupId == i),
      }
      groups.push(group);
    }
    let ret = {
      name: info.name,
      groups: groups,
    };
    return ret;
  }

  @Get('/summary')
  async summary(@Query('project') project: string) {
    if (!this.projectService.open(project)) return { success: false, reason: 'Project doesn\'t exists'};
    let projectInfo = this.projectService.getProject(project);
    let ret = this.processReturnProject(projectInfo);
    this.projectService.close();
    return { success: true, data: ret };
  }

  @Post('/create')
  async create(@Body() body) {
    if (!this.projectService.addProject(body.name)) return { success: false, reason: 'Project name duplicated'};
    return { success: true, data: null };
  }

  @Del('/delete')
  async deleteProject(@Query('project') project: string) {
    if (!this.projectService.deleteProject(project)) return { success: false, reason: 'Project doesn\'t exists'};
    return { success: true, data: null };
  }

  @Post('/group/create')
  async createGroup(@Body() body) {
    if (!this.projectService.open(body.project)) return { success: false, reason: 'Project doesn\'t exists'};
    if (!this.projectService.addGroup(body.name)) {
      this.projectService.close();
      return { success: false, reason: 'Group name duplicated' };
    }
    this.projectService.close();
    return { success: true, data: null };
  }

  @Del('/group/delete')
  async deleteGroup(@Query('project') project: string, @Query('group') group: string) {
    if (!this.projectService.open(project)) return { success: false, reason: 'Project doesn\'t exists'};
    if (!this.projectService.deleteGroup(group)) {
      this.projectService.close();
      return { success: false, reason: 'Group doesn\'t exists' };
    }
    this.projectService.close();
    return { success: true, data: null };
  }
}