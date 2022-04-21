import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { jwtContants } from '../jwt.contants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
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
    console.log('我是守卫，我完成了jwt验证');
    return { ...payload };
  }
}
