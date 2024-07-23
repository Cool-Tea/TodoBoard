import { Body, Controller, Inject, Post } from "@midwayjs/core";
import { LoginService } from "../service/login.service";
import { RegisterService } from "../service/register.service";

@Controller('/user')
export class UserController {
  @Inject()
  loginService: LoginService;

  @Inject()
  registerService: RegisterService;

  @Post('/login')
  public async login(@Body() info: { userName: string, password: string }) {
    const stat = await this.loginService.validateUser(info);
    return stat;
  }

  @Post('/register')
  public async register(@Body() info: { userName: string, password: string }) {
    const stat = await this.registerService.createUser(info);
    return stat;
  }
}