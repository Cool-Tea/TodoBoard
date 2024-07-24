import { Inject, Provide } from "@midwayjs/core";
import { UserDB } from "./userdb.service";

@Provide()
export class LoginService {
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
}