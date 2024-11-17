import { Module } from '@nestjs/common';
import { AuthController } from './api/auth.controller';
import { AuthService } from './data/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { JwtVerifierService } from './api/jwt-verifier.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtVerifierService],
  imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class AuthModule {}
