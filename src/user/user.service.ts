import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  /****************************************************
   * 方法: 创建一个新用户
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  async create(createUserDto: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const result = await this.userRepository.save(createUserDto);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(error);
    }
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
