import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Logger } from '../utils/log4js';
import filterCode from './filter-code';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 在请求上下文中拿到response
    const ctx = host.switchToHttp();
    const req = ctx.getResponse();
    const res = ctx.getRequest();
    console.log('我是filter:  我在处理错误');
    const status = (exception && exception.getStatus()) || 500;

    let errmessage = exception.getResponse();
    //如果是 object
    if (errmessage instanceof Object) {
      errmessage = (errmessage as any).message;
    }
    // 如果是arry  如果是arry 上面的也会被执行
    if (errmessage instanceof Array) {
      errmessage = errmessage[0];
    }
    const message = filterCode(status, errmessage);

    // 自定义异常结构体, 日志用
    const logger = {
      endTime: Date.now(),
      diff_time: Date.now() - res.logger.start_time,
      http_code: 200,
      errorCode: status,
      errorMsg: message,
      errmessage: errmessage,
    };
    Logger.error(
      JSON.stringify({
        ...res.logger,
        ...logger,
      }),
    );

    const errorResponse = {
      data: null,
      msg: message,
      code: status > 50000 ? status : 50000, //用自定义的错误code 都应该在50000 以上的数值来定义
    };
    // 设置返回的状态码， 请求头，发送错误信息
    req.status(200);
    req.header('Content-Type', 'application/json; charset=utf-8');
    req.send(errorResponse);
  }
}
