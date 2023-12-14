import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TbActividadesService } from './tb_actividades.service';
import { CreateTbActividadeDto } from './dto/create-tb_actividade.dto';
import { UpdateTbActividadeDto } from './dto/update-tb_actividade.dto';

@Controller('tb-actividades')
export class TbActividadesController {
  constructor(private readonly tbActividadesService: TbActividadesService) {}

  @Post()
  create(@Body() createTbActividadeDto: CreateTbActividadeDto) {
    return this.tbActividadesService.create(createTbActividadeDto);
  }

  @Get()
  findAll() {
    return this.tbActividadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tbActividadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTbActividadeDto: UpdateTbActividadeDto) {
    return this.tbActividadesService.update(+id, updateTbActividadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tbActividadesService.remove(+id);
  }
}
