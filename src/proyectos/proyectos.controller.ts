import { Controller, Get, Param } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';

@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Get(':contcod/:iduser')
  findAll(@Param('contcod') contcod: string, @Param('iduser') iduser: number) {
    return this.proyectosService.findAll(contcod, iduser);
  }
}
