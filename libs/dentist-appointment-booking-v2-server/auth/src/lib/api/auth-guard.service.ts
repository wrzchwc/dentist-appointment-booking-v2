import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtVerifierService } from './jwt-verifier.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtVerifier: JwtVerifierService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'].split(' ')[1];
    try {
      const { username } = await this.jwtVerifier.verify(token);
      request.userId = username;
    } catch (error) {
      console.log(error);
      console.log('Token invalid!');
      return false;
    }

    return true;
  }
}
