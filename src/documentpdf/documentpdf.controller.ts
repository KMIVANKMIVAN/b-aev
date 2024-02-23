import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Res,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentpdfService } from './documentpdf.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('documentpdf')
export class DocumentpdfController {
  constructor(private readonly documentpdfService: DocumentpdfService) { }

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

  @UseGuards(AuthGuard)
  @Get('/download/:fileName')
  download(@Param('fileName') fileName: string, @Res() res: Response) {
    this.documentpdfService.downloadFile(fileName, res);
  }
  @UseGuards(AuthGuard)
  @Get('/view/:fileName')
  async viewPdf(@Param('fileName') fileName: string, @Res() res: Response) {
    return this.documentpdfService.verPdf(fileName, res);
  }
  @UseGuards(AuthGuard)
  @Get('/viewbypartialName/:partialName')
  async viewPdfByPartialName(
    @Param('partialName') partialName: string,
    @Res() res: Response,
  ) {
    return this.documentpdfService.verPdfByPartialName(partialName, res);
  }
  @UseGuards(AuthGuard)
  @Get('/buscarpdf/:partialName')
  async buscarpdf(@Param('partialName') partialName: string) {
    return this.documentpdfService.buscarpdf(partialName);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:fileName')
  async deletePdf(@Param('fileName') fileName: string, @Res() res: Response) {
    await this.documentpdfService.eliminarPdf(fileName, res);
  }

  @UseGuards(AuthGuard)
  @Get('/buscar/:buscar')
  buscarViviendaNueva(@Param('buscar') buscar: string) {
    return this.documentpdfService.buscarViviendaNueva(buscar);
  }
  @UseGuards(AuthGuard)
  @Post('/base64apdf')
  async base64ToPdf(
    @Body('base64String') base64String: string,
    @Body('fileName') fileName: string,
    @Res() res: Response,
  ) {
    await this.documentpdfService.base64ToPdf(base64String, fileName, res);
  }
  @UseGuards(AuthGuard)
  @Get('enviarbanco/:numero')
  enviarBanco(@Param('numero') numero: string) {
    return this.documentpdfService.enviarBanco(numero);
  }
  @UseGuards(AuthGuard)
  @Get('verificarenviobanco/:numero')
  verificarEnvioBanco(@Param('numero') numero: string) {
    return this.documentpdfService.verificarEnvioBanco(numero);
  }
}
