const codeEmun = {
  400: '请求错误，请检查请求信息', // BadRequestException
  401: '未授权/权限验证失败',  // UnauthorizedException
  403: '无权限/权限不足', // ForbiddenException 
  404: '请求不存在', //NotFoundException
  408: '请求超时' //RequestTimeoutException
};

export default function (status: number, message: any) {
  if (codeEmun[status]) {
    return codeEmun[status];
  } else {
    const _message = message ? message : `${status >= 500 ? '服务器错误' : 'Client Error'}`;
    return _message;
  }
}
