import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  GlobalSignOutCommand,
  InitiateAuthCommand,
  SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';
import {
  ConfirmSignUpRequest, Role, RefreshTokenResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse, UserProfile
} from '@dentist-appointment-booking-v2/shared/auth';
import { User, UsersService } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/users';

@Injectable()
export class AuthService {
  private readonly cognitoClient: CognitoIdentityProviderClient = new CognitoIdentityProviderClient({
    region: this.configService.get('REGION')
  });

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
  }

  async signUp(request: SignUpRequest): Promise<SignUpResponse> {
    const { UserSub } = await this.cognitoClient.send(new SignUpCommand({
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
    return { userId: UserSub || '' };
  }

  async confirmSignUp(request: ConfirmSignUpRequest): Promise<string> {
    await this.cognitoClient.send(new ConfirmSignUpCommand({
      ClientId: this.configService.get('CLIENT_ID'),
      Username: request.email,
      ConfirmationCode: request.confirmationCode
    }));
    await this.usersService.createUser({
      id: request.userId,
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      photoUrl: request.photoUrl
    });
    return 'Success';
  }

  async signIn(request: SignInRequest): Promise<SignInResponse> {
    const { AuthenticationResult } = await this.cognitoClient.send(
      new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: this.configService.get('CLIENT_ID'),
        AuthParameters: {
          USERNAME: request.email,
          PASSWORD: request.password
        }
      })
    );
    return {
      refreshToken: AuthenticationResult?.RefreshToken || '',
      accessToken: AuthenticationResult?.AccessToken || ''
    };
  }

  async signOut(accessToken: string): Promise<string> {
    await this.cognitoClient.send(new GlobalSignOutCommand({
      AccessToken: accessToken
    }));
    return 'SUCCESS';
  }

  async refreshTokens(refreshToken: string): Promise<RefreshTokenResponse> {
    const { AuthenticationResult } = await this.cognitoClient.send(
      new InitiateAuthCommand({
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: this.configService.get('CLIENT_ID'),
        AuthParameters: {
          'REFRESH_TOKEN': refreshToken
        }
      })
    );
    if (!AuthenticationResult) {
      throw new InternalServerErrorException({ message: 'Refresh failed' });
    }
    return {
      accessToken: AuthenticationResult.AccessToken || ''
    };
  }

  async getUserProfile(userId: string, roles: Role[]): Promise<UserProfile> {
    const foundUser: User | null = await this.usersService.getUserProfile(userId);
    if (!foundUser) throw new InternalServerErrorException();
    return { ...foundUser, roles };
  }
}
