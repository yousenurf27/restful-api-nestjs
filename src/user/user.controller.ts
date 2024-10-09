import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { WebResponse } from '../model/web.model';
import {
  LoginUserReq,
  RegisterUserReq,
  UpdateUserReq,
  UserRes,
} from '../model/user.model';
import { Auth } from '../common/auth.decorator';
import { User } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(200)
  @ApiOkResponse({ type: UserRes })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: RegisterUserReq,
    description: 'Create user structure',
  })
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

  @Get('/current')
  @HttpCode(200)
  async get(@Auth() user: User): Promise<WebResponse<UserRes>> {
    const result = await this.userService.get(user);
    return {
      data: result,
    };
  }

  @Patch('/current')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Body() request: UpdateUserReq,
  ): Promise<WebResponse<UserRes>> {
    const result = await this.userService.update(user, request);
    return {
      data: result,
    };
  }

  @Delete('/current')
  @HttpCode(200)
  async logout(@Auth() user: User): Promise<WebResponse<string>> {
    await this.userService.logout(user);
    return {
      data: 'Success logout.',
    };
  }
}
