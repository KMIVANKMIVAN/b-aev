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
import { DesembolsosService } from './desembolsos.service';
import { CreateDesembolsoDto } from './dto/create-desembolso.dto';
import { UpdateDesembolsoDto } from './dto/update-desembolso.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('desembolsos')
export class DesembolsosController {
  constructor(private readonly desembolsosService: DesembolsosService) {}

  /* @Post()
  create(@Body() createDesembolsoDto: CreateDesembolsoDto) {
    return this.desembolsosService.create(createDesembolsoDto);
  } */

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.desembolsosService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('/desenetap')
  desenbolsoetapas() {
    return this.desembolsosService.desenbolsoetapas();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.desembolsosService.findOne(+id);
  }

  /* @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDesembolsoDto: UpdateDesembolsoDto,
  ) {
    return this.desembolsosService.update(+id, updateDesembolsoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desembolsosService.remove(+id);
  } */
}
