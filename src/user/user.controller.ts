import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { WebResponse } from '../model/web.model';
import { LoginUserReq, RegisterUserReq, UserRes } from '../model/user.model';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(200)
  async register(
    @Body() request: RegisterUserReq,
  ): Promise<WebResponse<UserRes>> {
    const result = await this.userService.register(request);
    return {
      data: result,
    };
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() request: LoginUserReq): Promise<WebResponse<UserRes>> {
    const result = await this.userService.login(request);
    return {
      data: result,
    };
  }
}
