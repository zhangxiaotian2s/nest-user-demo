import { HttpException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ListArgsInterface, UserListInterface } from './interface/user.interface';

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
  async findAll(query: ListArgsInterface): Promise<UserListInterface> {
    try {
      const userQB = await this.userRepository.createQueryBuilder('user');
      userQB.orderBy('user.update_time', 'DESC');
      const count = await userQB.getCount();
      const { pageIndex = 1, pageSize = 10 } = query;

      // qb.limit(pageSize);
      // qb.offset((pageIndex - 1) * pageSize);
      // const userList = await qb.getMany();

      const userList = await userQB
        .skip((pageIndex - 1) * pageSize)
        .take(pageSize)
        .getMany();
      console.log(userList);
      return {
        list: userList,
        pageIndex: Number(pageIndex),
        pageSize: Number(pageSize),
        pageCount: Math.ceil(count / pageSize),
        count,
      };
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }
  /****************************************************
   * 方法: 查找指定id 用户信息
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  async findOne(id: number) {
    try {
      const result = this.userRepository.findOne({ where: { id } });
      console.log(result);
      return result;
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }
  /****************************************************
   * 方法: 更新指定id 用户信息
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  async update(id: number, updateUserDto: Partial<UserEntity>) {
    try {
      // const exitUser = await this.userRepository.findOne({ where: { id } });
      // if (!exitUser) {
      //   throw new NotFoundException(`用户id 为：${id} 的用户不存在`);
      // }
      // const result = this.userRepository.merge(exitUser, updateUserDto);
      // return await this.userRepository.save(result);

      // 用这个方法好  网上的方法比较狗篮子
      const result = await this.userRepository.update(id, updateUserDto);
      console.log(result);
      return result;
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }
  /****************************************************
   * 方法: 删除指定id 用户
   * 参数:
   * 返回:
   * 时间: 2022-04-13
   ****************************************************/
  async remove(id: number) {
    try {
      const result = await this.userRepository.delete(id);
      console.log(result);
      if (result.affected >= 1) {
        return new HttpException('删除成功', 10000);
      } else {
        return new HttpException('删除失败,你要删除的那个用户不存在', 50000);
      }
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }
}
