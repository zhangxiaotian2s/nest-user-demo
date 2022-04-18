import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformUserInterceptor implements NestInterceptor {
  private type;
  private key;
  constructor(type: 'single' | 'all', key?: string) {
    this.type = type;
    this.key = key || '';
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
          if (this.key) {
            splitStrToArray(data, this.key);
          } else {
            data.group = data.group.split(',');
          }
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
//
function splitStrToArray(data, key) {
  if (key.indexOf('.') > -1) {
    const keyArr = key.split('.');
    deepSplitData(data, keyArr);
  } else {
    data[key] = data[key].group.split(',');
  }
}
// 递归
function deepSplitData(data, keys) {
  if (keys.length == 1 && data[keys[0]] && data[keys[0]].group) {
    data[keys[0]].group = data[keys[0]].group.split(',');
  }
  const key = keys.shift();
  if (data && data[key]) {
    deepSplitData(data[key], keys);
  }
}
