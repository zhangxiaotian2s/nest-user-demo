import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body) {
    const _user = await this.userService.findOne(+body.id);
    if (body.password == _user.password) {
      return _user;
    }
  }
}
