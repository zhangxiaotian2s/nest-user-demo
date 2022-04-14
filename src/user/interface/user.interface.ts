import { UserEntity } from '../entities/user.entity';

export interface ListArgsInterface {
  pageIndex?: number;
  pageSize?: number;
}

export interface UserListInterface {
  pageSize: number;
  pageIndex: number;
  pageCount: number;
  count: number;
  list: UserEntity[];
}
