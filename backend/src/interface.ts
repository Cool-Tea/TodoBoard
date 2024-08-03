export interface IComment {
  user: string;
  content: string;
}

export interface ITask {
  name: string;
  startTime: Date;
  endTime: Date;
  groupId: number;
  attachments: string[];
  comments: IComment[];
}

export interface IProject {
  name: string;
  groups: string[];
  tasks: ITask[];
}

export interface IUser {
  name: string;
  password: string;
  projects: string[];
}