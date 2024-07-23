import { Provide } from "@midwayjs/core";

@Provide()
export class RegisterService {
  public async isUserNameValid(userName: string) {
    return userName == '1';
  }

  public isPasswordValid(password: string) {
    return true;
  }

  public async createUser(info: {userName: string, password: string}) {
    let valid = await this.isUserNameValid(info.userName) && this.isPasswordValid(info.password);
    if (!valid) {
      return { validity: valid, reason: 'Invalid user name or password' };
    }

    return { validity: valid, uuid: 123 };
  }
}