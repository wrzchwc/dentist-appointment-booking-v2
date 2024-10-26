import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfirmSignUpRequest, SignInRequest, SignUpRequest } from './model';
import {
  ConfirmSignUpCommandOutput,
  InitiateAuthCommandOutput,
  SignUpCommandOutput
} from '@aws-sdk/client-cognito-identity-provider';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('sign-up')
  signUp(@Body() request: SignUpRequest): Promise<SignUpCommandOutput> {
    return this.authService.signUp(request);
  }

  @Post('confirm-sign-up')
  confirmSignUp(@Body() request: ConfirmSignUpRequest): Promise<ConfirmSignUpCommandOutput> {
    return this.authService.confirmSignUp(request);
  }

  @Post('sign-in')
  signIn(@Body() request: SignInRequest): Promise<InitiateAuthCommandOutput> {
    return this.authService.signIn(request);
  }

  @Post('sign-out')
  signOut(@Headers('Authorization') accessToken: string) {
    return this.authService.signOut(accessToken.split(' ').at(1) || '');
  }
}
