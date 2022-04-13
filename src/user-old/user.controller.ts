import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /****************************************************
   * 方法: 创建一个用户
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  @Post('create')
  async createUser(@Body() body) {
    return this.userService.createUser(body);
  }
  /****************************************************
   * 方法:根据id 获取指定用户信息
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  @Get(':id')
  async getUserByID(@Param('id') id) {
    return this.userService.findUserById(id);
  }
  /****************************************************
   * 方法: 修改指定用户
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  @Put(':id')
  async updateUserById(@Param('id') id, @Body() body) {
    return this.userService.updateUserById(id, body);
  }
  /****************************************************
   * 方法: 删除指定用户
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  @Delete(':id')
  async deleteUserById(@Param('id') id) {
    return this.userService.removeUserById(id);
  }
}