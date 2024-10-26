import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getData(): object {
    return ({ message: 'Hello API' });
  }
}
