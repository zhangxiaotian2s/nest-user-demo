import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /****************************************************
   * 方法: 创建一个用户
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  /****************************************************
   * 方法: 查询所有用户
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  @Get('')
  findAll() {
    return this.userService.findAll();
  }
  /****************************************************
   * 方法: 获取指定id 用户信息
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  /****************************************************
   * 方法: 更新指定id 用户信息
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  /****************************************************
   * 方法: 删除指定id 用户
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
