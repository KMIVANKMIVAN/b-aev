import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use('/documentpdf/upload', express.static('/home/vancc369/Documentos'));
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
