import { Body, Controller, Del, Get, Inject, Post, Query } from "@midwayjs/core";
import { WorkspaceService } from "../service/workspace.service";

@Controller('/workspace')
export class WorkspaceController {
  @Inject()
  workspaceService: WorkspaceService;

  @Get('/query')
  public async query(@Query('uuid') uuid: number) {
    const stat = this.workspaceService.getWorkspaceInfos(uuid);
    return stat;
  }

  @Post('/create')
  public async create(@Body('uuid') uuid: number, @Body('name') name: string) {
    const stat = this.workspaceService.createWorkspace(uuid, name);
    return stat;
  }

  @Del('/delete')
  public async deleteWorkspace(@Query('wuid') wuid: number) {
    const stat = this.workspaceService.deleteWorkspace(wuid);
    return stat;
  }
}