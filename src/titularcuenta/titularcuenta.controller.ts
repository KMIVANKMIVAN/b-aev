import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TitularcuentaService } from './titularcuenta.service';
import { CreateTitularcuentaDto } from './dto/create-titularcuenta.dto';
import { UpdateTitularcuentaDto } from './dto/update-titularcuenta.dto';

@Controller('titularcuenta')
export class TitularcuentaController {
  constructor(private readonly titularcuentaService: TitularcuentaService) {}

  @Post()
  create(@Body() createTitularcuentaDto: CreateTitularcuentaDto) {
    return this.titularcuentaService.create(createTitularcuentaDto);
  }

  @Get()
  findAll() {
    return this.titularcuentaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.titularcuentaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTitularcuentaDto: UpdateTitularcuentaDto) {
    return this.titularcuentaService.update(+id, updateTitularcuentaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.titularcuentaService.remove(+id);
  }
}
