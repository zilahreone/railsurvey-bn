import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.useGlobalPipes(new ValidationPipe({
  //   transform: false,
  //   whitelist: true,
  //   stopAtFirstError: true,
  //   forbidNonWhitelisted: true,
  //   forbidUnknownValues: false
  // }))
  await app.listen(3000);
}
bootstrap();
