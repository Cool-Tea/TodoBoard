import { Body, Controller, Inject, Post } from "@midwayjs/core";
import { LoginService } from "../service/login.service";

@Controller("/login")
export class LoginController {
  @Inject()
  loginService: LoginService

  @Post('/')
  public async login(@Body() info: { userName: string, password: string }) {
    const stat = await this.loginService.checkUser(info);
    return stat;
  }
}