import { DataSource } from 'typeorm';

export const MysqlDataSource = new DataSource({
  name: 'default',
  type: 'mysql',
  database: process.env.DB_DATABASE || 'orion',
  url: process.env.DB_CONNECTION_STRING,
  entities: ['src/entities/*.ts', 'dist/entities/*.js'],
  logging: true,
  synchronize: true
});
