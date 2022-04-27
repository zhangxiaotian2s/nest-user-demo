import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { environment } from 'config';
import { RedisCacheModule } from './redis-cache/redis-cache.module';

@Module({
  imports: [ScheduleModule.forRoot(), UserModule, TypeOrmModule.forRoot(environment.dbCofnig), AuthModule, RedisCacheModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
