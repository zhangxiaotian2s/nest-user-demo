import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { jwtContants } from '../jwt.contants';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: jwtContants.secret,
    });
  }
  async validate(payload): Promise<UserEntity> {
    // console.log('我是jwt.strategy', payload);
    // //payload：jwt-passport认证jwt通过后解码的结果
    // console.log(handleBack);
    if (payload.limit == 1) {
      return { ...payload };
    } else {
      throw new ForbiddenException();
    }
  }
}
