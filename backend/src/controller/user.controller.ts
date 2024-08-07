import { Body, Controller, Del, Get, Inject, Post, Query } from "@midwayjs/core";
import { UserService } from "../service/user.service";
import { Rule, RuleType } from "@midwayjs/validate";

class RegisterDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  password: string;
}

@Controller('/user')
export class UserController {

  @Inject()
  userService: UserService;
  
  /**
   * Get user info by user name
   * @param user user name
   * @returns user info
   */
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
  async register(@Body() body: RegisterDTO) {
    if (!this.userService.addUser(body.name, body.password)) return { success: false, reason: 'User name has been used' };
    return { success: true, data: null };
  }

  @Post('/project/add')
  async addProject(@Body() body) {
    if (!this.userService.getUser(body.user)) return { success: false, reason: 'User doesn\'t exists' };
    if (!this.userService.addProject(body.user, body.project)) return { success: false, reason: 'User already has this project' };
    return { success: true, data: null };
  }

  @Del('/project/delete')
  async deleteProject(@Query('user') user: string, @Query('project') project: string) {
    if (!this.userService.getUser(user)) return { success: false, reason: 'User doesn\'t exists' };
    if (!this.userService.deleteProject(user, project)) return { success: false, reason: 'User doesn\'t has this project' };
    return { success: true, data: null };
  }
}