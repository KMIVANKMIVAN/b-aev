import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PlanillasigeproService } from './planillasigepro.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('planillasigepro')
export class PlanillasigeproController {
  constructor(
    private readonly planillasigeproService: PlanillasigeproService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.planillasigeproService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.planillasigeproService.findOne(+id);
  }
}
