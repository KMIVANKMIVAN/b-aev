import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentpdfService } from './documentpdf.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('documentpdf')
export class DocumentpdfController {
  constructor(private readonly documentpdfService: DocumentpdfService) {}

  @UseGuards(AuthGuard)
  @Post('upload/:textToReplace')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('textToReplace') textToReplace: string,
    @Res() res: Response, // Agregar el objeto de respuesta como parámetro
  ) {
    return this.documentpdfService.guardarPdf(file, textToReplace, res);
  }
  //await this.documentpdfService.guardarPdf(file, textToReplace, res);

  /* @UseGuards(AuthGuard)
  @Post('upload/:textToReplace')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('textToReplace') textToReplace: string,
  ) {
    return this.documentpdfService.guardarPdf(file, textToReplace);
  } */
  @UseGuards(AuthGuard)
  @Get('/download/:fileName')
  download(@Param('fileName') fileName: string, @Res() res: Response) {
    this.documentpdfService.downloadFile(fileName, res);
  }

  /* @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.documentpdfService.guardarPdf(file);
  } */
  @UseGuards(AuthGuard)
  @Get('/buscar/:buscar')
  buscarViviendaNueva(@Param('buscar') buscar: string) {
    return this.documentpdfService.buscarViviendaNueva(buscar);
  }
}
