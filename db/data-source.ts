import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  // type: 'mysql',
  // host: process.env.DATABASE_HOST,
  // port: parseInt(process.env.DATABASE_PORT),
  // username: process.env.DATABASE_USER,
  // password: process.env.DATABASE_PASSWORD,
  // database: process.env.DATABASE_DB,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js']
  // synchronize: true
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource