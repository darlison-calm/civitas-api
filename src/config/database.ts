import { DataSource } from 'typeorm';

export const MysqlDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '172.20.0.3',
  port: 3306,
  username: process.env.DB_USER || 'orion_root',
  password: process.env.DB_PASSWORD || 'j5m966qp7jiypfda',
  database: process.env.DB_DATABASE || 'orion',
  entities: ['src/entities/**/*.ts', 'dist/entities/*.js'],
  logging: true,
  synchronize: true
});
