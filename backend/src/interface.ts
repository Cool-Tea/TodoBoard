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

interface IComment {
  uuid: number;
  content: string;
}

export enum TaskStatus {
  TODO, DOING, DONE
}

export interface ITaskInfo {
  wuid: number;
  tuid: number;
  name: string;
  startTime: Date;
  endTime: Date;
  status: TaskStatus;
  members: number[];
  comments: IComment[];
}