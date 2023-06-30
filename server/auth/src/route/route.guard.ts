import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    console.log(token);
    if (token) {
      try {
        const decodedToken = this.jwtService.verify(token); // Verify and decode the JWT token
        request.user = decodedToken; // Attach the decoded token to the request object
        return true; // Allow access to the route
      } catch (error) {
        // Token is invalid or expired
        throw new UnauthorizedException('Invalid token');
        // Deny access to the route
      }
    } else {
      // No token provided
      throw new UnauthorizedException('No token provided');
      // Deny access to the route
    }
  }
}

//

//

//

//
//this code validates if the token is valid or not

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { AuthService } from './auth.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: 'your_jwt_secret_key',
//     });
//   }

//   async validate(payload: any) {
//     const user = await this.authService.validateUserById(payload.userId);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }
