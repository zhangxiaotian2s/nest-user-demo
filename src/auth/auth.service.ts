import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}
  /****************************************************
   * 方法:用户id 密码验证
   * 参数: id:number password:string
   * 返回:
   * 时间: 2022-04-18
   ****************************************************/
  async validate(id: number, password: string): Promise<UserEntity> {
    try {
      const result = await this.userService.findOne(id);
      if (result && result.password === password) {
        return result;
      } else {
        return null;
      }
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
  /****************************************************
   * 方法:login
   * 参数:
   * 返回:
   * 时间: 2022-04-18
   ****************************************************/
  async login(user: UserEntity): Promise<any> {
    const { id, password, limit, nickname, group, status } = user;
    const userInfo = {
      uid: id,
      nickname,
      group,
      status,
    };
    return {
      token: this.jwtService.sign({ id, password, limit }),
      userInfo,
    };
  }
}
