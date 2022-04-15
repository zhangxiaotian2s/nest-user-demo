import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 在请求上下文中拿到response
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log('我是filter  我在处理错误', exception);
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
    const errorResponse = {
      data: null,
      msg: errmessage,
      code: 50000,
    };
    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
