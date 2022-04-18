import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
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
}
