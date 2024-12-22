import { Global, Module } from '@nestjs/common';
import { AuthController } from './api/auth.controller';
import { AuthService } from './data/auth.service';
import { JwtVerifierService } from './api/jwt-verifier.service';
import { AuthGuard } from './api/auth.guard';
import { UsersModule } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/users';
import { RolesGuard } from './api/roles.guard';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtVerifierService, AuthGuard, RolesGuard],
  exports: [AuthGuard, JwtVerifierService],
  imports: [UsersModule]
})
export class AuthModule {}
