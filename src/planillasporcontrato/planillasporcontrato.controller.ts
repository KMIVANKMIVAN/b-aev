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
import { PlanillasporcontratoService } from './planillasporcontrato.service';
import { CreatePlanillasporcontratoDto } from './dto/create-planillasporcontrato.dto';
import { UpdatePlanillasporcontratoDto } from './dto/update-planillasporcontrato.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('planillasporcontrato')
export class PlanillasporcontratoController {
  constructor(
    private readonly planillasporcontratoService: PlanillasporcontratoService,
  ) {}

  /* @Post()
  create(@Body() createPlanillasporcontratoDto: CreatePlanillasporcontratoDto) {
    return this.planillasporcontratoService.create(
      createPlanillasporcontratoDto,
    );
  } */

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

  /* @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanillasporcontratoDto: UpdatePlanillasporcontratoDto,
  ) {
    return this.planillasporcontratoService.update(
      +id,
      updatePlanillasporcontratoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planillasporcontratoService.remove(+id);
  } */
}
