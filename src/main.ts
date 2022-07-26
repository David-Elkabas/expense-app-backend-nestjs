import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //in order to use the class-validator and class-transformer in the Dto section.
      whitelist: true, //for security reason. ignore any addition data from the user by looking at the Dto section.
    }),
  );
  await app.listen(3000);
}
bootstrap();
