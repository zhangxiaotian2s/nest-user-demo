import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';
import { IsNickNameType } from '../pipe/nickname-type.pipe';
export class CreateUserDto {
  // 用户昵称
  @IsNotEmpty()
  @IsNickNameType('', {
    message: '必须是大写字母小写字母数字特殊符号的组合',
  })
  @Length(1, 20, {
    message: '长度不行',
  })
  nickname: string;
  // 用户密码
  @IsNotEmpty()
  @Length(1, 20, {
    message: '长度不行',
  })
  password: string;
  //用户群组
  @IsArray()
  group: string[];
  //用户状态
  @IsBoolean()
  status: boolean;
  //权限分组
  @IsIn([1, 2, 3, 4], {
    message: '权限划分没在指定范围内',
  })
  limit?: 1 | 2 | 3 | 4;
}
