import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentpdfService } from './documentpdf.service';
import { Express } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('documentpdf')
export class DocumentpdfController {
  constructor(private readonly documentpdfService: DocumentpdfService) {}
  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.documentpdfService.guardarPdf(file);
  }
  @UseGuards(AuthGuard)
  @Get('/buscar/:buscar')
  buscarViviendaNueva(@Param('buscar') buscar: string) {
    return this.documentpdfService.buscarViviendaNueva(buscar);
  }
}
