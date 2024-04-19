import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuariobusaService } from './usuariobusa.service';
import { CreateUsuariobusaDto } from './dto/create-usuariobusa.dto';
import { UpdateUsuariobusaDto } from './dto/update-usuariobusa.dto';

@Controller('usuariobusa')
export class UsuariobusaController {
  constructor(private readonly usuariobusaService: UsuariobusaService) {}

  //@UseGuards(AuthGuard)
  @Post()
  create(@Body() createUsuariobusaDto: CreateUsuariobusaDto) {
    return this.usuariobusaService.create(createUsuariobusaDto);
  }

  //@UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usuariobusaService.findAll();
  }
  @Get('/findmenosadmin')
  findMenosAdmin() {
    return this.usuariobusaService.findMenosAdmin();
  }

  //@UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuariobusaService.findOne(+id);
  }

  //@UseGuards(AuthGuard)
  @Get('buscarci/:ci')
  findOneCi(@Param('nomci') nomci: string) {
    return this.usuariobusaService.findOneCi(nomci);
  }

  //@UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUsuariobusaDto: UpdateUsuariobusaDto,
  ) {
    return this.usuariobusaService.update(+id, updateUsuariobusaDto);
  }

  /* //@UseGuards(AuthGuard)
  @Patch('updatepw/:id')
  updateContrasenia(
    @Param('id') id: number,
    @Body() updateUsuariobusaDto: UpdateUsuariobusaDto,
  ) {
    return this.usuariobusaService.updateContrasenia(+id, updateUsuariobusaDto);
  } */

  //@UseGuards(AuthGuard)
  @Patch('updatepw/:id')
  updateContrasenia(
    @Param('id') id: number,
    @Body('contraseniaAntigua') contraseniaAntigua: string, // Nuevo parámetro
    @Body() updateUsuariobusaDto: UpdateUsuariobusaDto,
  ) {
    return this.usuariobusaService.updateContrasenia(
      id,
      contraseniaAntigua,
      updateUsuariobusaDto,
    );
  }

  //@UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuariobusaService.remove(+id);
  }
}
