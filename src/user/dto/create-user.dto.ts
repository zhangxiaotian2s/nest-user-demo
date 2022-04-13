export class CreateUserDto {
  // 用户昵称
  nickname: string;
  // 用户密码
  password: string;
  //用户群组
  group: string[];
  //用户状态
  status: boolean;
  //权限分组
  limit?: 1 | 2 | 3 | 4;
}
