import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  getHello(): string {
    return 'Welcome to Management Users RESTful API, read doc in my GitHub https://github.com/yousenurf27/restful-api-nestjs';
  }
}
