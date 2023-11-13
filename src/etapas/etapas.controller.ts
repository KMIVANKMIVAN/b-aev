import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { EtapasService } from './etapas.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('etapas')
export class EtapasController {
  constructor(private readonly etapasService: EtapasService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.etapasService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.etapasService.findOne(+id);
  }
}
