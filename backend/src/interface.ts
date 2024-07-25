export interface IUserInfo {
  uuid: number;
  userName: string;
  password: string;
  avatar: string;
  workspaces: number[];
}

export interface IWorkspaceInfo {
  wuid: number;
  name: string;
  tasks: number[];
  members: number[];
}