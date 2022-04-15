import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('我是全局拦截器:，我这会在进入controller 之前');
    return next.handle().pipe(
      map((data) => {
        console.log('我是全局拦截器:，我这会在进入controller 之后');
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
