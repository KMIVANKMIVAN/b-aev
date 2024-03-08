import { Module } from '@nestjs/common';
import { GenerarPdfsService } from './generar-pdfs.service';
import { GenerarPdfsController } from './generar-pdfs.controller';

@Module({
  controllers: [GenerarPdfsController],
  providers: [GenerarPdfsService],
})
export class GenerarPdfsModule {}
