import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProyectosexcelService } from './proyectosexcel.service';
import { CreateProyectosexcelDto } from './dto/create-proyectosexcel.dto';
import { UpdateProyectosexcelDto } from './dto/update-proyectosexcel.dto';

@Controller('proyectosexcel')
export class ProyectosexcelController {
  constructor(private readonly proyectosexcelService: ProyectosexcelService) {}

  @Post()
  create(@Body() createProyectosexcelDto: CreateProyectosexcelDto) {
    return this.proyectosexcelService.create(createProyectosexcelDto);
  }

  @Get()
  findAll() {
    return this.proyectosexcelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectosexcelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectosexcelDto: UpdateProyectosexcelDto) {
    return this.proyectosexcelService.update(+id, updateProyectosexcelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectosexcelService.remove(+id);
  }
}
