import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtContants: JwtModuleOptions = {
  secret: 'abc123zhangsan', //生成token的秘钥
  signOptions: {
    expiresIn: 1000 * 60 * 24 * 30, //过期时间一个月
  },
};
