import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtVerifierService } from './jwt-verifier.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtVerifier: JwtVerifierService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) return false;

    const token = request.headers['authorization'].split(' ')[1];
    try {
      const decodedToken = await this.jwtVerifier.verify(token);
      request.userId = decodedToken.username;
      request.roles = decodedToken['cognito:groups'];
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}
