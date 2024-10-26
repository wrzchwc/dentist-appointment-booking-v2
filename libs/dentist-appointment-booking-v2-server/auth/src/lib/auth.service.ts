import { Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandOutput, GlobalSignOutCommand,
  GlobalSignOutCommandOutput,
  InitiateAuthCommand,
  InitiateAuthCommandOutput,
  SignUpCommand,
  SignUpCommandOutput
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';
import { ConfirmSignUpRequest, SignInRequest, SignUpRequest } from '@dentist-appointment-booking-v2/shared/auth';

@Injectable()
export class AuthService {
  private readonly cognitoClient: CognitoIdentityProviderClient = new CognitoIdentityProviderClient({
    region: this.configService.get('REGION')
  });

  constructor(private readonly configService: ConfigService) {}

  async signUp(request: SignUpRequest): Promise<SignUpCommandOutput> {
    return await this.cognitoClient.send(new SignUpCommand({
      ClientId: this.configService.get('CLIENT_ID'),
      Username: request.email,
      Password: request.password,
      UserAttributes: [
        {
          Name: 'email',
          Value: request.email
        }
      ]
    }));
  }

  async confirmSignUp(request: ConfirmSignUpRequest): Promise<ConfirmSignUpCommandOutput> {
    return await this.cognitoClient.send(new ConfirmSignUpCommand({
      ClientId: this.configService.get('CLIENT_ID'),
      Username: request.email,
      ConfirmationCode: request.confirmationCode
    }));
  }

  async signIn(request: SignInRequest): Promise<InitiateAuthCommandOutput> {
    return await this.cognitoClient.send(
      new InitiateAuthCommand({ ...({
          AuthFlow: this.configService.get('AUTH_FLOW'),
          ClientId: this.configService.get('CLIENT_ID'),
          AuthParameters: {
            USERNAME: request.email,
            PASSWORD: request.password,
          },
        }) }),
    );
  }

  async signOut(accessToken: string): Promise<GlobalSignOutCommandOutput> {
    return await this.cognitoClient.send(new GlobalSignOutCommand({
      AccessToken: accessToken
    }))
  }
}
