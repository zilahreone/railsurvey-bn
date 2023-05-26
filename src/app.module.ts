import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RailSurveyModule } from './rail-survey/rail-survey.module';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { User } from './users/entities/user.entity';
import { RailSurvey } from './rail-survey/entities/rail-survey.entity';

@Module({
  imports: [
    RailSurveyModule, UsersModule,
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', process.env.UPLOAD_DIR),
      serveRoot: `/${process.env.UPLOAD_DIR}`
    }),
    // TypeOrmModule.forRoot(dataSourceOptions)
    TypeOrmModule.forRoot(
      {
        type: 'sqlite',
        database: 'db.sqlite',
        // type: 'mysql',
        // host: process.env.DATABASE_HOST,
        // port: parseInt(process.env.DATABASE_PORT),
        // username: process.env.DATABASE_USER,
        // password: process.env.DATABASE_PASSWORD,
        // database: process.env.DATABASE_DB,
        entities: ['dist/**/*.entity.js'],
        // migrations: ['dist/db/migrations/*.js'],
        synchronize: true
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
