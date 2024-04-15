import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SucursalbusaService } from './sucursalbusa.service';
import { CreateSucursalbusaDto } from './dto/create-sucursalbusa.dto';
import { UpdateSucursalbusaDto } from './dto/update-sucursalbusa.dto';

@Controller('sucursalbusa')
export class SucursalbusaController {
  constructor(private readonly sucursalbusaService: SucursalbusaService) {}

  @Post()
  create(@Body() createSucursalbusaDto: CreateSucursalbusaDto) {
    return this.sucursalbusaService.create(createSucursalbusaDto);
  }

  @Get()
  findAll() {
    return this.sucursalbusaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sucursalbusaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateSucursalbusaDto: UpdateSucursalbusaDto,
  ) {
    return this.sucursalbusaService.update(+id, updateSucursalbusaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sucursalbusaService.remove(+id);
  }
}
