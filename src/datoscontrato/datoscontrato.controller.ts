import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { DatoscontratoService } from './datoscontrato.service';

import { AuthGuard } from 'src/auth/auth.guard';

@Controller('datoscontrato')
export class DatoscontratoController {
  constructor(private readonly datoscontratoService: DatoscontratoService) {}

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
  @UseGuards(AuthGuard)
  @Get('/compleja/:contcod/:valortitrcod')
  findOneContCodCompleja(
    @Param('contcod') contcod: string,
    @Param('valortitrcod') valortitrcod: string,
    @Query('ploccod') ploccod: string[],
  ) {
    return this.datoscontratoService.findOneContCodCompleja(
      contcod,
      valortitrcod,
      ploccod,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/codigo/:codigo')
  findOneCodigo(@Param('codigo') codigo: string) {
    return this.datoscontratoService.findOneCodigo(codigo);
  }
  @UseGuards(AuthGuard)
  @Get('/nomproy/:nomproy')
  findOneNomProy(@Param('nomproy') nomproy: string) {
    return this.datoscontratoService.findOneNomProy(nomproy);
  }
  @UseGuards(AuthGuard)
  @Get('/depdes/:depdes')
  findOneDepart(@Param('depdes') depdes: string) {
    return this.datoscontratoService.findOneDepart(depdes);
  }

  @UseGuards(AuthGuard)
  @Get('/filtrar/:codigo/:nomproy/:depdes')
  filtrarViviendaNueva(
    @Param('codigo') codigo: string,
    @Param('nomproy') nomproy: string,
    @Param('depdes') depdes: string,
  ) {
    return this.datoscontratoService.filtrarViviendaNueva(
      codigo,
      nomproy,
      depdes,
    );
  }
  @UseGuards(AuthGuard)
  @Get('/buscar/:buscar')
  buscarViviendaNueva(@Param('buscar') buscar: string) {
    return this.datoscontratoService.buscarViviendaNueva(buscar);
  }
}
