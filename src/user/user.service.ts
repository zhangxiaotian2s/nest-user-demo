import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  /****************************************************
   * 方法: 创建一个新用户
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  /****************************************************
   * 方法: 查找全部用户
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  findAll() {
    return `This action returns all user`;
  }
  /****************************************************
   * 方法: 查找指定id 用户信息
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  /****************************************************
   * 方法: 更新指定id 用户信息
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  /****************************************************
   * 方法: 删除指定id 用户
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
