import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { objectKeyToArray } from 'src/core/utils/helper';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ListArgsInterface, UserListInterface } from './interface/user.interface';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly redisCacheService: RedisCacheService,
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
      this.redisCacheService.cacheSet(`user_${result.id}`, result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
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
      const { pageIndex = 1, pageSize = 10 } = query;
      return await this.findForUserPage(pageIndex, pageSize);
    } catch (error) {
      throw error;
    }
  }

  /****************************************************
   * 方法: 分页查询用户
   * 描述: 分页查询用户 @Interval(10000) 每10秒执行一次
   * 参数: pageIndex: 页码  pageSize: 每页数量
   * 返回: { list: [], pageIndex: 1, pageSize: 10, pageCount: 1, count: 1 }
   * 时间: 2022-04-27
   ****************************************************/
  @Interval(10000)
  private async findForUserPage(pageIndex = 1, pageSize = 10): Promise<UserListInterface> {
    try {
      const userQB = await this.userRepository.createQueryBuilder('user');
      userQB.orderBy('user.update_time', 'DESC');
      const count = await userQB.getCount();
      const userSQ = userQB.skip((pageIndex - 1) * pageSize).take(pageSize);
      const listIds = await userSQ.getMany();
      const keys = objectKeyToArray(listIds, 'id', 'user');
      const list = await this.redisCacheService.cacheWrap(keys, async (callback) => {
        const _list = await userSQ.getMany();
        callback(null, _list);
      });
      return {
        list: list,
        pageIndex: Number(pageIndex),
        pageSize: Number(pageSize),
        pageCount: Math.ceil(count / pageSize),
        count,
      };
    } catch (error) {
      throw error;
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
      const cacheResult = await this.redisCacheService.cacheGet(`user${id}`);
      if (cacheResult) {
        return cacheResult;
      } else {
        const result = await this.userRepository.findOne({ where: { id } });
        this.redisCacheService.cacheSet(`user_${id}`, result);
        return result;
      }
    } catch (error) {
      throw error;
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
      const result = await this.userRepository.update(id, updateUserDto);
      this.redisCacheService.cacheDelete(`user_${id}`);
      return result;
    } catch (error) {
      throw error;
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
      this.redisCacheService.cacheDelete(`user_${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
