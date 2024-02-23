import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @UseGuards(AuthGuard)
  @Get(':contcod/:iduser')
  findAll(@Param('contcod') contcod: string, @Param('iduser') iduser: number) {
    return this.proyectosService.findAll(contcod, iduser);
  }
}
