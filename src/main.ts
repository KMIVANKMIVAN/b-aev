import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Configurar el límite de tamaño de carga útil
  app.use(bodyParser.json({ limit: '50mb' })); // Ajusta el límite según tus necesidades

  await app.listen(3000);
}
bootstrap();
