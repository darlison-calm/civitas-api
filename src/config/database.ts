import { DataSource } from 'typeorm';
import 'dotenv/config';

export const MysqlDataSource = new DataSource({
  type: 'mysql',
  url: process.env.DB_CONNECTION_STRING,
  database: process.env.DB_DATABASE,
  entities: ['src/entities/**/*.ts', 'dist/entities/*.js'],
  logging: true,
  synchronize: true
});
