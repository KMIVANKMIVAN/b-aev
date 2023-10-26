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
import { PlanillasigeproService } from './planillasigepro.service';
import { CreatePlanillasigeproDto } from './dto/create-planillasigepro.dto';
import { UpdatePlanillasigeproDto } from './dto/update-planillasigepro.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('planillasigepro')
export class PlanillasigeproController {
  constructor(
    private readonly planillasigeproService: PlanillasigeproService,
  ) {}

  /* @Post()
  create(@Body() createPlanillasigeproDto: CreatePlanillasigeproDto) {
    return this.planillasigeproService.create(createPlanillasigeproDto);
  } */

  @Get()
  findAll() {
    return this.planillasigeproService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.planillasigeproService.findOne(+id);
  }

  /* @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanillasigeproDto: UpdatePlanillasigeproDto,
  ) {
    return this.planillasigeproService.update(+id, updatePlanillasigeproDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planillasigeproService.remove(+id);
  } */
}
