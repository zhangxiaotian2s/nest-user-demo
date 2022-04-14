import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformUserInterceptor implements NestInterceptor {
  private type;
  constructor(type: 'single' | 'all') {
    this.type = type;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        console.log('type', this.type);
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
