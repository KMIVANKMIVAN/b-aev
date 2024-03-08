import { Module } from '@nestjs/common';
import { RecibirPdfsEnviarService } from './recibir-pdfs-enviar.service';
import { RecibirPdfsEnviarController } from './recibir-pdfs-enviar.controller';

@Module({
  controllers: [RecibirPdfsEnviarController],
  providers: [RecibirPdfsEnviarService],
})
export class RecibirPdfsEnviarModule {}
