import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DesembolsosService } from './desembolsos.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('desembolsos')
export class DesembolsosController {
  constructor(private readonly desembolsosService: DesembolsosService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.desembolsosService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('/desenetap')
  desenbolsoetapas() {
    return this.desembolsosService.desenbolsoetapas();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.desembolsosService.findOne(+id);
  }
}
