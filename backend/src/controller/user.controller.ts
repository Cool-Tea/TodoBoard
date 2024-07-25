import { Body, Controller, Get, Inject, Post, Query } from "@midwayjs/core";
import { UserService } from "../service/user.service";

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Get('/login')
  public async login(@Query('userName') userName: string, @Query('password') password: string) {
    const stat = await this.userService.validateUser({userName: userName, password: password});
    return stat;
  }

  @Post('/register')
  public async register(@Body() info: { userName: string, password: string }) {
    const stat = await this.userService.createUser(info);
    return stat;
  }
}