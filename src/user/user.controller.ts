import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ListArgsInterface } from './interface/user.interface';
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
    const _userObj: Partial<UserEntity> = {};
    Object.assign(_userObj, createUserDto);
    _userObj.group = _userObj.group.toString();
    return this.userService.create(_userObj);
  }
  /****************************************************
   * 方法: 查询所有用户
   * 参数: pageIndex=1, pageSize=10
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  @Get()
  findAll(@Query() query: ListArgsInterface) {
    console.log(query);
    return this.userService.findAll(query);
  }
  /****************************************************
   * 方法: 获取指定id 用户信息
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.userService.findOne(+id);
    return result;
  }
  /****************************************************
   * 方法: 更新指定id 用户信息
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const _userObj: Partial<UserEntity> = {};
    Object.assign(_userObj, updateUserDto);
    _userObj.group = _userObj.group.toString();

    return this.userService.update(+id, _userObj);
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
