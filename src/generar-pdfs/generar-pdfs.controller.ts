// En generar-pdfs.controller.ts
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { GenerarPdfsService } from './generar-pdfs.service';
import * as path from 'path';

@Controller('generarpdfs')
export class GenerarPdfsController {
  constructor(private readonly generarPdfsService: GenerarPdfsService) { }

  @Get()
  async generatePdf(@Res() res: Response) {
    const pdfPath = await this.generarPdfsService.generarPDF();
    res.sendFile(pdfPath);
  }

  @Get('verhtml')
  verHtml(@Res() res: Response) {
    const htmlPath = path.resolve(__dirname, '..', '..', 'src', 'generar-pdfs', 'pag', 'index.html');
    res.sendFile(htmlPath);
  }

  /*  @Get('enviarpdf/:nombrePDF')
   async enviarInstructivo(@Res() res: Response, @Param('nombrePDF') nombrePDF: string) {
     const mensaje = await this.generarPdfsService.enviarInstructivo(nombrePDF);
     res.json({ mensaje });
   } */

  @Get('enviarpdf/:nombrePDF')
  download(@Param('nombrePDF') nombrePDF: string, @Res() res: Response) {
    this.generarPdfsService.downloadFile(nombrePDF, res);
  }
}
