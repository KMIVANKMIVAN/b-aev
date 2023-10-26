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
import { DatoscontratoService } from './datoscontrato.service';
import { CreateDatoscontratoDto } from './dto/create-datoscontrato.dto';
import { UpdateDatoscontratoDto } from './dto/update-datoscontrato.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('datoscontrato')
export class DatoscontratoController {
  constructor(private readonly datoscontratoService: DatoscontratoService) {}

  /* @Post()
  create(@Body() createDatoscontratoDto: CreateDatoscontratoDto) {
    return this.datoscontratoService.create(createDatoscontratoDto);
  } */

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.datoscontratoService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('/findAllDatosContrato')
  findAllDatosContrato() {
    return this.datoscontratoService.findAllDatosContrato();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.datoscontratoService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Get('/contcod/:contcod')
  findOneContCod(@Param('contcod') contcod: string) {
    return this.datoscontratoService.findOneContCod(contcod);
  }

  /* @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDatoscontratoDto: UpdateDatoscontratoDto,
  ) {
    return this.datoscontratoService.update(+id, updateDatoscontratoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datoscontratoService.remove(+id);
  } */
}
