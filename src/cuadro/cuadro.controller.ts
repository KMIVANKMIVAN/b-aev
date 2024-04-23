import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CuadroService } from './cuadro.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cuadro')
export class CuadroController {
  constructor(private readonly cuadroService: CuadroService) { }

  @UseGuards(AuthGuard)
  @Get('consultacuadro/:contcod')
  consultaCuadro(@Param('contcod') contcod: string) {
    return this.cuadroService.consultaCuadro(contcod);
  }
  @UseGuards(AuthGuard)
  @Get('consultacuadrovivienda/:contcod')
  consultaCuadroVivienda(@Param('contcod') contcod: string) {
    return this.cuadroService.consultaCuadroVivienda(contcod);
  }
  @UseGuards(AuthGuard)
  @Get('consultabusa')
  consultaBusa() {
    return this.cuadroService.consultaBusa();
  }
  @UseGuards(AuthGuard)
  @Get('trinsbu')
  traerInstrucParaBusa() {
    return this.cuadroService.traerInstrucParaBusa();
  }
  @UseGuards(AuthGuard)
  @Get('consultabusaaev/:fechaInicioC/:fechaFinC')
  consultaBusaAev(
    @Param('fechaInicioC') fechaInicioC: string,
    @Param('fechaFinC') fechaFinC: string,
  ) {
    return this.cuadroService.consultaBusaAev(fechaInicioC, fechaFinC);
  }
  @UseGuards(AuthGuard)
  @Get('consultasipago/:codid')
  consultaSipago(@Param('codid') codid: string) {
    return this.cuadroService.consultaSipago(codid);
  }
  @UseGuards(AuthGuard)
  @Get('proyectosexcel')
  findAllProyectosexcel() {
    return this.cuadroService.findAllProyectosexcel();
  }
  @UseGuards(AuthGuard)
  @Get('departamentos')
  findAllDepartamentos() {
    return this.cuadroService.findAllDepartamentos();
  }
  @UseGuards(AuthGuard)
  @Get('estados')
  findAllEstados() {
    return this.cuadroService.findAllEstados();
  }
  @UseGuards(AuthGuard)
  @Get('tbactividades')
  findAllTb_actividades() {
    return this.cuadroService.findAllTb_actividades();
  }
  @UseGuards(AuthGuard)
  @Get('tipo')
  findAllTipo() {
    return this.cuadroService.findAllTipo();
  }
  @UseGuards(AuthGuard)
  @Get('modalidades')
  findAllModalidades() {
    return this.cuadroService.findAllModalidades();
  }
  @UseGuards(AuthGuard)
  @Get('fiscales')
  findAllFiscales() {
    return this.cuadroService.findAllFiscales();
  }
  @UseGuards(AuthGuard)
  @Get('estructuracostos')
  findAllEstructuracostos() {
    return this.cuadroService.findAllEstructuracostos();
  }
}
