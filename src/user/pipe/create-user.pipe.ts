import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.nickname === undefined || value.password == undefined) {
      throw new BadRequestException('没有用户名或密码');
    }
    return value;
  }
}
