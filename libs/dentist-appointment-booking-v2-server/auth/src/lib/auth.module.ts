import { Global, Module } from '@nestjs/common';
import { AuthController } from './api/auth.controller';
import { AuthService } from './data/auth.service';
import { JwtVerifierService } from './api/jwt-verifier.service';
import { AuthGuard } from './api/auth-guard.service';
import { UsersModule } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/users';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtVerifierService, AuthGuard],
  exports: [AuthGuard, JwtVerifierService],
  imports: [UsersModule]
})
export class AuthModule {}
