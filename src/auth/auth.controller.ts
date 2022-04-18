import { Controller, Post, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransformUserInterceptor } from 'src/core/interceptor/transform-user.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /****************************************************
   * 方法: login
   * 参数:
   * 返回:
   * 时间: 2022-04-18
   ****************************************************/
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @UseInterceptors(new TransformUserInterceptor('single', 'userInfo.user'))
  async login(@Request() request) {
    return this.authService.login(request.user);
  }
}
