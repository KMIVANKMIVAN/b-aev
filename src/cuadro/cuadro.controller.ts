import { Controller, Get, Param } from '@nestjs/common';
import { CuadroService } from './cuadro.service';

@Controller('cuadro')
export class CuadroController {
  constructor(private readonly cuadroService: CuadroService) {}

  @Get('consultacuadro/:contcod')
  consultaCuadro(@Param('contcod') contcod: string) {
    return this.cuadroService.consultaCuadro(contcod);
  }
  @Get('consultabusa')
  consultaBusa() {
    return this.cuadroService.consultaBusa();
  }
  @Get('consultasipago/:codid')
  consultaSipago(@Param('codid') codid: string) {
    return this.cuadroService.consultaSipago(codid);
  }

  @Get('proyectosexcel')
  findAllProyectosexcel() {
    return this.cuadroService.findAllProyectosexcel();
  }
  @Get('departamentos')
  findAllDepartamentos() {
    return this.cuadroService.findAllDepartamentos();
  }
  @Get('estados')
  findAllEstados() {
    return this.cuadroService.findAllEstados();
  }
  @Get('tbactividades')
  findAllTb_actividades() {
    return this.cuadroService.findAllTb_actividades();
  }
  @Get('tipo')
  findAllTipo() {
    return this.cuadroService.findAllTipo();
  }
  @Get('modalidades')
  findAllModalidades() {
    return this.cuadroService.findAllModalidades();
  }
  @Get('fiscales')
  findAllFiscales() {
    return this.cuadroService.findAllFiscales();
  }
  @Get('estructuracostos')
  findAllEstructuracostos() {
    return this.cuadroService.findAllEstructuracostos();
  }
}
