import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentpdfService } from './documentpdf.service';
import { DocumentpdfController } from './documentpdf.controller';

import { Documentpdf } from './entities/documentpdf.entity';

import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Documentpdf])],
  controllers: [DocumentpdfController],
  providers: [DocumentpdfService],
  exports: [DocumentpdfService],
})
export class DocumentpdfModule {}
