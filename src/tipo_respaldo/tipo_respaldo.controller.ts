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
import { TipoRespaldoService } from './tipo_respaldo.service';
import { CreateTipoRespaldoDto } from './dto/create-tipo_respaldo.dto';
import { UpdateTipoRespaldoDto } from './dto/update-tipo_respaldo.dto';

import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tiporespaldo')
export class TipoRespaldoController {
  constructor(private readonly tipoRespaldoService: TipoRespaldoService) {}

  /* @Post()
  create(@Body() createTipoRespaldoDto: CreateTipoRespaldoDto) {
    return this.tipoRespaldoService.create(createTipoRespaldoDto);
  } */

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.tipoRespaldoService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tipoRespaldoService.findOne(+id);
  }

  /* @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTipoRespaldoDto: UpdateTipoRespaldoDto,
  ) {
    return this.tipoRespaldoService.update(+id, updateTipoRespaldoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoRespaldoService.remove(+id);
  } */
}
