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
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

import { RecibirPdfsEnviarService } from './recibir-pdfs-enviar.service';

@Controller('recibirpdfsenviar')
export class RecibirPdfsEnviarController {
  constructor(private readonly recibirPdfsEnviarService: RecibirPdfsEnviarService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    if (!file) {
      return res.status(400).json({ message: 'No Cargo un Archivo.' });
    }
    // El controlador simplemente delega la acción y la respuesta al servicio
    return this.recibirPdfsEnviarService.savePdf(file, res);
  }

  @Get('enviarpdf/:nombrePdf')
  enviarPdf(@Param('nombrePdf') nombrePdf: string, @Res() res: Response) {
    return this.recibirPdfsEnviarService.enviarPdf(nombrePdf, res);
  }

  /* @Get('traerpdffirmar/:nombreParcialPdf')
  async traerPdfFirmar(@Param('nombreParcialPdf') nombreParcialPdf: string, @Res() res: Response) {
    try {
      await this.recibirPdfsEnviarService.traerPDFFirmar(nombreParcialPdf, res);
    } catch (error) {
      console.error('Error al buscar PDFs para firmar:', error);
      res.status(500).json({ message: 'Error al buscar PDFs para firmar' });
    }
  }
   */

  @Get('traerpdffirmar/:nombreParcialPdf')
  async traerPdfFirmar(@Param('nombreParcialPdf') nombreParcialPdf: string, @Res() res: Response) {
    try {
      const pdfData = await this.recibirPdfsEnviarService.traerPDFFirmar(nombreParcialPdf);
      // Envía el PDF junto con el JSON
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${pdfData.nombrePdf}"`);
      res.send(pdfData.pdfBuffer); // pdfBuffer es el contenido del PDF
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar el PDF para firmar' });
    }
  }

  @Get('traerpdffirmarbase/:nombreParcialPdf')
  async getSignedPdfBase64(@Param('nombreParcialPdf') nombreParcialPdf: string, @Res() res: Response) {

    const { nombrePdf, pdfBase64 } = await this.recibirPdfsEnviarService.traerPDFFirmarBase64(nombreParcialPdf);

    // Ya tienes el PDF en base64, por lo que puedes devolverlo directamente
    res.json({ nombrePdf, pdfBase64 });


  }

  @Post('recibirbase')
  async recibirBase64(@Body() base64Pdf: string, @Res() res: Response) {
    try {
      const nombrePdf = await this.recibirPdfsEnviarService.recibirBase64(base64Pdf);
      return res.status(201).json({ message: 'El PDF se recibió y guardó correctamente', nombrePDF: nombrePdf });
    } catch (error) {
      return res.status(500).json({ message: 'Error al recibir y guardar el PDF en base64' });
    }
  }
  @Post('/base64apdf')
  async base64ToPdf(
    @Body('base64String') base64String: string,
    @Body('fileName') fileName: string,
    @Res() res: Response,
  ) {
    await this.recibirPdfsEnviarService.base64ToPdf(base64String, fileName, res);
  }

  @Post('/base64apdfcapeta')
  async base64ToPdfCarpeta(
    @Body('base64String') base64String: string,
    @Body('fileName') fileName: string,
    @Res() res: Response,
  ) {
    await this.recibirPdfsEnviarService.base64ToPdfCarpeta(base64String, fileName, res);
  }
}
