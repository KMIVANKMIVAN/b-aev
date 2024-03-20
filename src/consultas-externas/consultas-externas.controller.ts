import { Controller, Post, HttpCode, HttpStatus, Body, Res, Param } from '@nestjs/common';
import { ConsultasExternasService } from './consultas-externas.service';
import { Response } from 'express';

@Controller('consultasexternas')
export class ConsultasExternasController {
  constructor(private readonly consultasExternasService: ConsultasExternasService) { }

  @Post('enviarsitahu/:ci')
  @HttpCode(HttpStatus.OK)
  async enviarSITAHU(@Param('ci') ci: string, @Res() res: Response): Promise<void> {
    const data = await this.consultasExternasService.enviarSITAHU(ci);
    res.send(data);
  }
}
