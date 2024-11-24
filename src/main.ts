import 'reflect-metadata'; // добавьте эту строку
import { NestFactory } from '@nestjs/core/nest-factory';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { EnhancedLoggingService } from './logger/logger.service';
import { setupGlobalExceptionHandlers } from './utils/handlers/setupGlobalExceptionHandlers';
import { setupSwagger } from './swagger/swaggerConfig';

const defaultPort = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });
  const logger = await app.resolve(EnhancedLoggingService);
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe());

  await setupSwagger(app);
  setupGlobalExceptionHandlers(logger);

  const PORT = process.env.PORT || defaultPort;
  await app.listen(PORT, () =>
    console.log(`\x1b[35mApplication is running on port: ${PORT}\x1b[0m`),
  );
}
bootstrap();
// function setupSwagger(app: INestApplication) {
//   throw new Error('Function not implemented.');
// }

