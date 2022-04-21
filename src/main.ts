import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './core/filter/all-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { logger } from './core/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置个全局的公共路径 /admin/user/xxx
  app.setGlobalPrefix('admin');
  // 挂载管道
  app.useGlobalPipes(new ValidationPipe());
  // 挂载全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 挂载全局过滤器
  app.useGlobalFilters(new AllExceptionFilter());
  // 挂载中间件
  app.use(logger);

  await app.listen(3000);
}
bootstrap();
