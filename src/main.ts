import 'reflect-metadata'; // добавьте эту строку
import { NestFactory } from '@nestjs/core/nest-factory';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // OpenAPI/Swagger configuration
  const options = new DocumentBuilder()
    .setTitle('Home Music Library Service')
    .setDescription('API for managing a home music library')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); // Swagger docs will be available at /api

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
