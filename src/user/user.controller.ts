import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query, UseInterceptors, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ListArgsInterface } from './interface/user.interface';
import { TransformUserInterceptor } from '../core/interceptor/transform-user.interceptor';
import { AuthGuard } from '@nestjs/passport';
@Controller('user')
@UseGuards(AuthGuard('jwt'))
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
  @UseInterceptors(new TransformUserInterceptor('all'))
  findAll(@Query() query: ListArgsInterface) {
    return this.userService.findAll(query);
  }
  /****************************************************
   * 方法: 获取指定id 用户信息
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  @Get(':id')
  @UseInterceptors(new TransformUserInterceptor('single'))
  async findOne(@Param('id') id: string) {
    const result = await this.userService.findOne(+id);
    if (!result) {
      throw new NotFoundException(`没有找到id 为${id}`);
    }
    return result;
  }
  /****************************************************
   * 方法: 更新指定id 用户信息
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  @Patch(':id')
  @UseInterceptors(new TransformUserInterceptor('single'))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const _userObj: Partial<UserEntity> = {};
    Object.assign(_userObj, updateUserDto);
    _userObj.group = _userObj.group.toString();

    const result = await this.userService.update(+id, _userObj);
    if (result.affected == 0) {
      throw new NotFoundException(`没有找到用户id为：${id}的用户`);
    } else {
      return await this.userService.findOne(+id);
    }
  }
  /****************************************************
   * 方法: 删除指定id 用户
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  @Delete(':id')
  @UseGuards(AuthGuard('admin'))
  async remove(@Param('id') id: string) {
    const result = await this.userService.remove(+id);
    console.log(result);
    if (result.affected >= 1) {
      return null;
    } else {
      throw new NotFoundException('删除失败,你要删除的那个用户不存在');
    }
  }
}
