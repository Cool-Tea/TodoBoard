import { Inject, Provide } from "@midwayjs/core";
import { UserDB } from "./userdb.service";

@Provide()
export class UserService {
  @Inject()
  userdb: UserDB;

  public async validateUser(info: {userName: string, password: string}) {
    const userInfo = this.userdb.getUserInfoByName(info.userName);
    console.log(userInfo);
    if (!userInfo) {
      return {
        authenticated: false,
      };
    }
    if (userInfo.password === info.password) {
      return {
        authenticated: true,
        uuid: userInfo.uuid,
      };
    }
    return {
      authenticated: false,
    };
  }

  public async isNewUserNameValid(userName: string): Promise<boolean> {
    return !this.userdb.getUserInfoByName(userName);
  }

  public isPasswordValid(password: string) {
    return true;
  }

  public async createUser(info: {userName: string, password: string}) {
    let valid = await this.isNewUserNameValid(info.userName) && this.isPasswordValid(info.password);
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