import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { CognitoAccessTokenPayload } from 'aws-jwt-verify/jwt-model';

@Injectable()
export class JwtVerifierService {
  constructor(private readonly configService: ConfigService) {}

  private readonly verifier = CognitoJwtVerifier.create({
    userPoolId: this.configService.get('USER_POOL_ID') || '',
    tokenUse: "access",
    clientId: this.configService.get('CLIENT_ID'),
  });

  verify(jwt: string): Promise<CognitoAccessTokenPayload> {
    return this.verifier.verify(jwt);
  }
}
