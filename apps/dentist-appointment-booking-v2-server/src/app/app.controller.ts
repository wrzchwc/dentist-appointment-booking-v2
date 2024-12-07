import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  checkHealth(): object {
    return ({ message: 'API is healthy!' });
  }
}
