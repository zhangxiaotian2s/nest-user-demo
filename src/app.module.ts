import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DbLogger } from './core/utils/log4js';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'userDemo',
      autoLoadEntities: true,
      entities: [],
      synchronize: true,
      logging: true,
      logger: new DbLogger(),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
