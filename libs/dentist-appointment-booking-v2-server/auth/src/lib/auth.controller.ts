import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ConfirmSignUpRequest,
  RefreshTokenRequest,
  SignInRequest, SignInResponse,
  SignUpRequest, SignUpResponse
} from '@dentist-appointment-booking-v2/shared/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('sign-up')
  signUp(@Body() request: SignUpRequest): Promise<SignUpResponse> {
    return this.authService.signUp(request);
  }

  @Post('confirm-sign-up')
  confirmSignUp(@Body() request: ConfirmSignUpRequest): Promise<string> {
    return this.authService.confirmSignUp(request);
  }

  @Post('sign-in')
  signIn(@Body() request: SignInRequest): Promise<SignInResponse> {
    return this.authService.signIn(request);
  }

  @Post('sign-out')
  signOut(@Headers('Authorization') accessToken: string) {
    return this.authService.signOut(accessToken.split(' ').at(1) || '');
  }

  @Post('refresh-token')
  refreshToken(@Body() request: RefreshTokenRequest) {
    return this.authService.refreshTokens(request.refreshToken);
  }
}
