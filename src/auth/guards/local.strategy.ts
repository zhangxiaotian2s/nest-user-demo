import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'userid',
      passwordField: 'password',
    });
  }
  async validate(username: string, password: string): Promise<UserEntity> {
    const user = await this.authService.validate(+username, password);
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('账号或者密码不正确');
    }
  }
}
