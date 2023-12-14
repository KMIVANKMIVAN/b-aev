import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstructuracostosService } from './estructuracostos.service';
import { CreateEstructuracostoDto } from './dto/create-estructuracosto.dto';
import { UpdateEstructuracostoDto } from './dto/update-estructuracosto.dto';

@Controller('estructuracostos')
export class EstructuracostosController {
  constructor(private readonly estructuracostosService: EstructuracostosService) {}

  @Post()
  create(@Body() createEstructuracostoDto: CreateEstructuracostoDto) {
    return this.estructuracostosService.create(createEstructuracostoDto);
  }

  @Get()
  findAll() {
    return this.estructuracostosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estructuracostosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstructuracostoDto: UpdateEstructuracostoDto) {
    return this.estructuracostosService.update(+id, updateEstructuracostoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estructuracostosService.remove(+id);
  }
}
