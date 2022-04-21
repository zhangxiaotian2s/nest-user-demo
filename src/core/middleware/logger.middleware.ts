// 函数式中间件
export function logger(req: any, res: any, next: () => any) {
  const start_time = Date.now();
  // 组装日志信息
  const logger = {
    IP: req.ip,
    req_url: req.originalUrl,
    req_method: req.method,
    parmas: req.params,
    query: req.query,
    body: req.body,
    cookie: req.headers.cookie,
    token: req.headers.token,
    ua: req.headers['user-agent'],
    start_time,
  };
  // 把公共的日志信息 挂载到 request logger 上
  req.logger = logger;
  next();
}
