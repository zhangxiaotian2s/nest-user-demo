import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformUserInterceptor implements NestInterceptor {
  private type;
  constructor(type: 'single' | 'all') {
    this.type = type;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('我是局部拦截器：我再进入controller 之前');
    return next.handle().pipe(
      map((data) => {
        console.log('我是局部拦截器：我再进入controller 之后', data);
        if (!data) {
          return null;
        }
        if (this.type === 'single') {
          data.group = data.group.split(',');
        }
        if (this.type === 'all') {
          data.list.forEach((item) => {
            item.group = item.group.split(',');
          });
        }
        return data;
      }),
    );
  }
}
