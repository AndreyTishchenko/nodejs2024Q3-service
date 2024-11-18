import 'reflect-metadata'; // добавьте эту строку
import { NestFactory } from '@nestjs/core/nest-factory';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { INestApplication } from '@nestjs/common';

const defaultPort = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // await setupSwagger(app);

  const PORT = process.env.PORT || defaultPort;
  await app.listen(PORT, () =>
    console.log(`\x1b[35mApplication is running on port: ${PORT}\x1b[0m`),
  );
}
bootstrap();
// function setupSwagger(app: INestApplication) {
//   throw new Error('Function not implemented.');
// }

