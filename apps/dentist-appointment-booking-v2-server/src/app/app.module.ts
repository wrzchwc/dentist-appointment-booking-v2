import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/auth'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true, cache: true })],
  controllers: [AppController],
})
export class AppModule {}
