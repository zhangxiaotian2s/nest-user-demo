import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  // 主键
  @PrimaryGeneratedColumn()
  id: number;

  //用户名
  @Column({ length: 20 })
  nickname: string;

  //用户密码
  @Column({ length: 20 })
  password: string;

  //用户组
  @Column('text')
  group: string;

  // 用户状态
  @Column({ default: true })
  status: boolean;

  // 权限
  @Column({ type: 'tinyint', default: 1 })
  limit: number;

  // 用户创建时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;
  // 用户信息更新时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
