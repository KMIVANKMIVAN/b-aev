import { Module } from '@nestjs/common';
import { DocumentpdfService } from './documentpdf.service';
import { DocumentpdfController } from './documentpdf.controller';

@Module({
  controllers: [DocumentpdfController],
  providers: [DocumentpdfService],
})
export class DocumentpdfModule {}
