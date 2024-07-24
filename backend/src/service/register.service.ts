import { Inject, Provide } from "@midwayjs/core";
import { UserDB } from "./userdb.service";

@Provide()
export class RegisterService {
  @Inject()
  userdb: UserDB;

  public async isUserNameValid(userName: string): Promise<boolean> {
    return !this.userdb.getUserInfoByName(userName);
  }

  public isPasswordValid(password: string) {
    return true;
  }

  public async createUser(info: {userName: string, password: string}) {
    let valid = await this.isUserNameValid(info.userName) && this.isPasswordValid(info.password);
    if (!valid) {
      return { validity: valid, reason: 'Invalid user name or password' };
    }
    let uuid = this.userdb.addUser(info.userName, info.password);
    if (uuid < 0) {
      return { validity: valid, reason: 'Invalid user name or password' };
    }
    return { validity: valid, uuid: uuid };
  }
}