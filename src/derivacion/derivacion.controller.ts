import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DerivacionService } from './derivacion.service';
import { CreateDerivacionDto } from './dto/create-derivacion.dto';
import { UpdateDerivacionDto } from './dto/update-derivacion.dto';

@Controller('derivacion')
export class DerivacionController {
  constructor(private readonly derivacionService: DerivacionService) { }

  @Post()
  async create(@Body() createDerivacionDto: CreateDerivacionDto) {
    return await this.derivacionService.create(createDerivacionDto);
  }
  @Post()
  async createAutomatico(@Body() createDerivacionDto: CreateDerivacionDto) {
    return await this.derivacionService.createAutomatico(createDerivacionDto);
  }
  @Get('/poridesembolso/:iddesembolso')
  async findOneIdDesembolso(@Param('iddesembolso') iddesembolso: number) {
    return await this.derivacionService.findOneIdDesembolso(+iddesembolso);
  }

  @Get()
  async findAll() {
    return await this.derivacionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.derivacionService.findOne(+id);
  }

  @Get('busonderivacion/:id')
  async BusonDerivacion(@Param('id') id: number) {
    return await this.derivacionService.BusonDerivacion(+id);
  }

  @Get('busonderivacionfecha/:id/:fechaInicio/:fechaFinal/:idEstado')
  async BusonDerivacionFecha(
    @Param('id') id: number,
    @Param('fechaInicio') fechaInicio: string,
    @Param('fechaFinal') fechaFinal: string,
    @Param('idEstado') idEstado: number,
  ) {
    return await this.derivacionService.BusonDerivacionFecha(
      +id,
      fechaInicio,
      fechaFinal,
      +idEstado,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDerivacionDto: UpdateDerivacionDto,
  ) {
    return await this.derivacionService.update(+id, updateDerivacionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.derivacionService.remove(+id);
  }
}
