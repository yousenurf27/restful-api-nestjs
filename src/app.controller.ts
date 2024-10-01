import { Controller, Get } from '@nestjs/common';

@Controller('/api')
export class AppController {
  @Get()
  getHello(): string {
    return 'Welcome to Management Users RESTful API';
  }
}
