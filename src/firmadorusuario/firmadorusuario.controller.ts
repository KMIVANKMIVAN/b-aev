import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FirmadorusuarioService } from './firmadorusuario.service';
import { CreateFirmadorusuarioDto } from './dto/create-firmadorusuario.dto';
import { UpdateFirmadorusuarioDto } from './dto/update-firmadorusuario.dto';

@Controller('firmadorusuario')
export class FirmadorusuarioController {
  constructor(private readonly firmadorusuarioService: FirmadorusuarioService) { }

  @Post()
  create(@Body() createFirmadorusuarioDto: CreateFirmadorusuarioDto) {
    return this.firmadorusuarioService.create(createFirmadorusuarioDto);
  }

  @Get()
  findAll() {
    return this.firmadorusuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.firmadorusuarioService.findOne(+id);
  }

  @Get('/mostrarporusuarios/:id')
  mostrarPorUsuarios(@Param('id') id: number) {
    return this.firmadorusuarioService.mostrarPorUsuarios(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFirmadorusuarioDto: UpdateFirmadorusuarioDto) {
    return this.firmadorusuarioService.update(+id, updateFirmadorusuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.firmadorusuarioService.remove(+id);
  }
}
