import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { environment } from 'config';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(environment.dbCofnig), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
