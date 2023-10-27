import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { DocumentpdfService } from './documentpdf.service';
import { CreateDocumentpdfDto } from './dto/create-documentpdf.dto';
import { UpdateDocumentpdfDto } from './dto/update-documentpdf.dto';
import { Response } from 'express';

@Controller('documentpdf')
export class DocumentpdfController {
  constructor(private readonly documentpdfService: DocumentpdfService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Pass the uploaded file to the service
    await this.documentpdfService.processUploadedFile(file);
  }
}
