import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PlanillascierresaldoService } from './planillascierresaldo.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('planillascierresaldo')
export class PlanillascierresaldoController {
  constructor(
    private readonly planillascierresaldoService: PlanillascierresaldoService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.planillascierresaldoService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.planillascierresaldoService.findOne(+id);
  }
}
