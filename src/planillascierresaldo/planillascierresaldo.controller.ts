import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlanillascierresaldoService } from './planillascierresaldo.service';
import { CreatePlanillascierresaldoDto } from './dto/create-planillascierresaldo.dto';
import { UpdatePlanillascierresaldoDto } from './dto/update-planillascierresaldo.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('planillascierresaldo')
export class PlanillascierresaldoController {
  constructor(
    private readonly planillascierresaldoService: PlanillascierresaldoService,
  ) {}

  /* @Post()
  create(@Body() createPlanillascierresaldoDto: CreatePlanillascierresaldoDto) {
    return this.planillascierresaldoService.create(
      createPlanillascierresaldoDto,
    );
  } */

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

  /* @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanillascierresaldoDto: UpdatePlanillascierresaldoDto,
  ) {
    return this.planillascierresaldoService.update(
      +id,
      updatePlanillascierresaldoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planillascierresaldoService.remove(+id);
  } */
}
