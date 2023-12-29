import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TipoRespaldoService } from './tipo_respaldo.service';

import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tiporespaldo')
export class TipoRespaldoController {
  constructor(private readonly tipoRespaldoService: TipoRespaldoService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.tipoRespaldoService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tipoRespaldoService.findOne(+id);
  }
}
