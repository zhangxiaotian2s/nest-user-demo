import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from '../utils/log4js';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    return next.handle().pipe(
      map((data) => {
        // 自定义异常结构体, 日志用
        const logger = {
          endTime: Date.now(),
          diff_time: Date.now() - req.logger.start_time,
          http_code: 200,
        };
        Logger.access(
          JSON.stringify({
            ...req.logger,
            ...logger,
          }),
        );
        console.log('我是拦截器: transform-all 全局 出文');
        // 一些特殊的业务需求如果需要返回特定的code 在局部的拦截器中已经进行了数据处理 ，这里就不处理直接返回了
        if (data && data.code) {
          return data;
        } else {
          return {
            code: 10000,
            data,
            msg: '',
          };
        }
      }),
    );
  }
}
