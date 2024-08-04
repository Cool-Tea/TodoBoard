import { Body, Controller, Get, Inject, Post, Query } from "@midwayjs/core";
import { UserService } from "../service/user.service";

@Controller('/user')
export class UserController {

  @Inject()
  userService: UserService;
  
  @Get('/summary')
  async summary(@Query('user') user: string) {
    let userInfo = this.userService.getUser(user);
    if (!userInfo) return { success: false, reason: 'User doesn\'t exists' };
    return { success: true, data: userInfo.projects };
  }

  @Post('/login')
  async login(@Body() body) {
    let user = this.userService.getUser(body.user);
    if (!user) return { success: false, reason: 'User doesn\'t exists' };
    if (user.password != body.password) return { success: false, reason: 'Invalid password' };
    return { success: true, data: null };
  }

  @Post('/register')
  async register(@Body() body) {
    if (!this.userService.addUser(body.name, body.password)) return { success: false, reason: 'User name has been used' };
    return { success: true, data: null };
  }

  @Post('/project/add')
  async addProject(@Body() body) {
    let user = this.userService.getUser(body.user);
    if (!user) return { success: false, reason: 'User doesn\'t exists' };
    if (user.password.includes(body.project)) return { success: false, reason: 'User already has this project' };
    user.projects.push(body.project);
    return { success: true, data: null };
  }
}