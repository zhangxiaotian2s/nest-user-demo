import { DbLogger } from 'src/core/utils/log4js';

export const dbCofnig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '12345678',
  database: 'userDemo',
  autoLoadEntities: true,
  entities: [],
  synchronize: true,
  maxQueryExecutionTime: 1000,
  logging: true,
  logger: new DbLogger(),
};
