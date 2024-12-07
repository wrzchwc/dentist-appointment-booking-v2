import { Global, Module } from '@nestjs/common';
import { AuthController } from './api/auth.controller';
import { AuthService } from './data/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { JwtVerifierService } from './api/jwt-verifier.service';
import { AuthGuard } from './api/auth-guard.service';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtVerifierService, AuthGuard],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [AuthGuard, JwtVerifierService],
})
export class AuthModule {}
