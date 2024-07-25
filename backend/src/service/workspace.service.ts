import { Inject, Provide } from "@midwayjs/core";
import { UserDB } from "./userdb.service";
import { WorkspaceDB } from "./workspacedb.service";

@Provide()
export class WorkspaceService {
  @Inject()
  userdb: UserDB;

  @Inject()
  workspacedb: WorkspaceDB;
  
  public getWorkspaceInfos(uuid: number) {
    const userInfo = this.userdb.getUserInfoByUuid(uuid);
    if (!userInfo) {
      return {authenticated: false};
    }
    const wuids = userInfo.workspaces;
    let wsInfos = wuids.filter(wuid => this.workspacedb.getWorkspaceInfoByWuid(wuid)).map(wuid => this.workspacedb.getWorkspaceInfoByWuid(wuid));
    return { authenticated: true, data: wsInfos.map(wsInfo => { return { wuid: wsInfo.wuid, name: wsInfo.name }; })};
  }

  public createWorkspace(uuid: number, name: string) {
    const wuid = this.workspacedb.addWorkspace(name, [uuid]);
    if (wuid < 0) {
      return { validity: false, reason: 'Replicated name' };
    }
    return { validity: true, wuid: wuid };
  }

  public deleteWorkspace(wuid: number) {
    const succ = this.workspacedb.deleteWorkspace(wuid);
    if (!succ) {
      return { validity: false, reason: 'Already deleted' };
    }
    return { validity: true };
  }
}