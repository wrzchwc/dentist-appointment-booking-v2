import { Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  GlobalSignOutCommand,
  InitiateAuthCommand,
  InitiateAuthCommandOutput,
  SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';
import {
  ConfirmSignUpRequest,
  SignInRequest, SignInResponse,
  SignUpRequest,
  SignUpResponse
} from '@dentist-appointment-booking-v2/shared/auth';
import { Repository } from 'typeorm';
import { User } from '../domain/user.model';
import { UserEntity } from '../domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  private readonly cognitoClient: CognitoIdentityProviderClient = new CognitoIdentityProviderClient({
    region: this.configService.get('REGION')
  });


  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<User>
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
    await this.userRepository.save({
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
      token: AuthenticationResult?.IdToken || '',
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

  async refreshTokens(refreshToken: string): Promise<InitiateAuthCommandOutput> {
    return await this.cognitoClient.send(
      new InitiateAuthCommand({
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: this.configService.get('CLIENT_ID'),
        AuthParameters: {
          'REFRESH_TOKEN': refreshToken
        }
      })
    );
  }

  async getUserProfile(userId: string) {
    return await this.userRepository.findOne({
      where: {
        id: userId
      }
    });
  }
}
