import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置个全局的公共路径 /admin/user/xxx
  app.setGlobalPrefix('admin');
  await app.listen(3000);
}
bootstrap();
