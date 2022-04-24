import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async cacheSet(key: string, value: string | object, ttl: number) {
    this.cacheManager.set(key, value, { ttl: ttl }, (err: any) => {
      if (err) {
        throw err;
      }
    });
  }
  async cacheGet(key: string) {
    const result = await this.cacheManager.get(key);
    if (!result) {
      return null;
    }
    return result;
  }
  async cacheDelete(key: string) {
    const result = await this.cacheManager.del(key);
    if (!result) {
      return null;
    }
    return result;
  }
}
