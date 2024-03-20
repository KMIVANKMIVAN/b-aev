import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FirmadorService } from './firmador.service';
import { CreateFirmadorDto } from './dto/create-firmador.dto';
import { UpdateFirmadorDto } from './dto/update-firmador.dto';

@Controller('firmador')
export class FirmadorController {
  constructor(private readonly firmadorService: FirmadorService) { }

  @Post()
  async create(@Body() createFirmadorDto: CreateFirmadorDto) {
    return await this.firmadorService.create(createFirmadorDto);
  }

  @Get()
  async findAll() {
    return await this.firmadorService.findAll();
  }
  @Get('/findAllDepartamento')
  async findAllDepartamento() {
    return await this.firmadorService.findAllDepartamento();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.firmadorService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFirmadorDto: UpdateFirmadorDto,
  ) {
    return await this.firmadorService.update(+id, updateFirmadorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.firmadorService.remove(+id);
  }
}
