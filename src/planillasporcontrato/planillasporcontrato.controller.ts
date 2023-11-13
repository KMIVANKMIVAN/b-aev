import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PlanillasporcontratoService } from './planillasporcontrato.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('planillasporcontrato')
export class PlanillasporcontratoController {
  constructor(
    private readonly planillasporcontratoService: PlanillasporcontratoService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.planillasporcontratoService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.planillasporcontratoService.findOne(+id);
  }
}
