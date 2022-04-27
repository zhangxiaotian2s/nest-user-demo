import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cache, MultiCache, Store } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  /****************************************************
   * 方法: 单个缓存存储
   * 参数:
   * 返回:
   * 时间: 2022-04-26
   ****************************************************/
  async cacheSet(key: string, value: string | object, ttl?: number) {
    this.cacheManager.set(key, value, { ttl: ttl || 60 * 60 * 24 * 365 }, (err: any) => {
      if (err) {
        throw err;
      }
    });
  }
  /****************************************************
   * 方法: 批量缓存获取
   * 描述: 如果单个或者多个key不存在，则触发cb,cb 执行的是获取所有数据的方法。其中值是和key必须一一对应的。
   * 参数:
   * 返回:
   * 时间: 2022-04-26
   ****************************************************/
  cacheWrap(ids: string[], cb: any, ttl?: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cacheManager.wrap(
        ...ids,
        async (callback) => {
          await cb(callback);
        },
        {
          ttl: ttl || 60 * 60 * 24 * 365,
        },
        (err: any, result: any) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        },
      );
    });
  }
  /****************************************************
   * 方法: 单个缓存获取
   * 描述:
   * 参数:
   * 返回:
   * 时间: 2022-04-26
   ****************************************************/
  async cacheGet(key: string) {
    const result = await this.cacheManager.get(key);
    if (!result) {
      return null;
    }
    return result;
  }
  /****************************************************
   * 方法:删除指定的key的缓存
   * 描述:
   * 参数:
   * 返回:
   * 时间: 2022-04-26
   ****************************************************/
  async cacheDelete(key: string) {
    const result = await this.cacheManager.del(key);
    if (!result) {
      return null;
    }
    return result;
  }
}
