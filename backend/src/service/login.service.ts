import { Provide } from "@midwayjs/core";

@Provide()
export class LoginService {
  async checkUser(info: {userName: string, password: string}) {
    return {
      authenticated: false,
      uuid: 123,
      userName: info.userName,
      password: info.password,
    };
  }
}