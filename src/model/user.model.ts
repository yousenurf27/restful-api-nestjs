import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserReq {
  @ApiProperty({
    example: 'jhondoe',
  })
  username: string;

  @ApiProperty({
    example: 'supersecret',
  })
  password: string;

  @ApiProperty({
    example: 'Jhon Doe',
  })
  name: string;
}

export class UserRes {
  @ApiProperty({
    example: 'jhondoe',
  })
  username: string;

  @ApiProperty({
    example: 'Jhon Doe',
  })
  name: string;

  @ApiProperty({
    required: false,
    description: 'This is an optional property',
  })
  token?: string;
}

export class LoginUserReq {
  username: string;
  password: string;
}

export class UpdateUserReq {
  name?: string;
  password?: string;
}
