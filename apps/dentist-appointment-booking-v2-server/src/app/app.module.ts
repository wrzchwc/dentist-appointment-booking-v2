import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/auth';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number.parseInt(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      synchronize: true,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false
      }
    })
  ],
  controllers: [AppController]
})
export class AppModule {}
