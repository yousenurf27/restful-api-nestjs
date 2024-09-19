import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  LoginUserReq,
  RegisterUserReq,
  UpdateUserReq,
  UserRes,
} from '../model/user.model';
import { Logger } from 'winston';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async register(request: RegisterUserReq): Promise<UserRes> {
    this.logger.debug(`Register new User ${JSON.stringify(request)}`);
    const registerReq: RegisterUserReq = this.validationService.validate(
      UserValidation.REGISTER,
      request,
    );

    const totalUserWithSameUsername = await this.prismaService.user.count({
      where: {
        username: registerReq.username,
      },
    });

    if (totalUserWithSameUsername != 0) {
      throw new HttpException('Username already exists', 400);
    }

    registerReq.password = await bcrypt.hash(registerReq.password, 10);

    const user = await this.prismaService.user.create({
      data: registerReq,
    });

    return {
      username: user.username,
      name: user.name,
    };
  }

  async login(request: LoginUserReq): Promise<UserRes> {
    this.logger.debug(`UserService.login(${JSON.stringify(request)})`);
    const loginRequest: LoginUserReq = this.validationService.validate(
      UserValidation.LOGIN,
      request,
    );

    let user = await this.prismaService.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) {
      throw new HttpException(`Username or password is invalid`, 401);
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(`Username or password is invalid`, 401);
    }

    user = await this.prismaService.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuidv4(),
      },
    });

    return {
      username: user.username,
      name: user.name,
      token: user.token,
    };
  }

  async get(user: User): Promise<UserRes> {
    return {
      username: user.username,
      name: user.name,
    };
  }

  async update(user: User, request: UpdateUserReq): Promise<UserRes> {
    this.logger.debug(
      `UserService.update( ${user} , ${JSON.stringify(request)} )`,
    );

    const updateReq: UpdateUserReq = this.validationService.validate(
      UserValidation.UPDATE,
      request,
    );

    if (updateReq.name) {
      user.name = updateReq.name;
    }

    if (updateReq.password) {
      user.password = await bcrypt.hash(updateReq.password, 10);
    }

    const result = await this.prismaService.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });

    return {
      name: result.name,
      username: result.username,
    };
  }
}
