import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ContratosigeproService } from './contratosigepro.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('contratosigepro')
export class ContratosigeproController {
  constructor(
    private readonly contratosigeproService: ContratosigeproService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.contratosigeproService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contratosigeproService.findOne(+id);
  }
}
