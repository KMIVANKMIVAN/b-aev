import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Patch,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { RespaldoDesembolsosService } from './respaldo_desembolsos.service';
import { CreateRespaldoDesembolsoDto } from './dto/create-respaldo_desembolso.dto';
import { UpdateRespaldoDesembolsoDto } from './dto/update-respaldo_desembolso.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('respaldodesembolsos')
export class RespaldoDesembolsosController {
  constructor(
    private readonly respaldoDesembolsosService: RespaldoDesembolsosService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createRespaldoDesembolsoDto: CreateRespaldoDesembolsoDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    return this.respaldoDesembolsosService.create(
      createRespaldoDesembolsoDto,
      file,
      res,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.respaldoDesembolsosService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('findallone/:desembolsos_id')
  findAllOne(@Param('desembolsos_id') desembolsos_id: number) {
    return this.respaldoDesembolsosService.findAllOne(+desembolsos_id);
  }

  @UseGuards(AuthGuard)
  @Get('eliminardesembidarchiv/:desembolsos_id/:archivo')
  eliminarDesembIdArchiv(
    @Param('desembolsos_id') desembolsos_id: number,
    @Param('archivo') archivo: string,
  ) {
    return this.respaldoDesembolsosService.eliminarDesembIdArchiv(
      +desembolsos_id,
      archivo,
    );
  }

  @UseGuards(AuthGuard)
  @Get('descargardesembidarchiv/:desembolsos_id/:archivo')
  descargarDesembIdArchiv(
    @Param('desembolsos_id') desembolsos_id: number,
    @Param('archivo') archivo: string,
    @Res() res: Response,
  ) {
    this.respaldoDesembolsosService.descargarDesembIdArchiv(
      +desembolsos_id,
      archivo,
      res,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.respaldoDesembolsosService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateRespaldoDesembolsoDto: UpdateRespaldoDesembolsoDto,
  ) {
    return this.respaldoDesembolsosService.update(
      +id,
      updateRespaldoDesembolsoDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id/:nombrepdf')
  remove(@Param('id') id: number, @Param('nombrepdf') nombrepdf: string) {
    return this.respaldoDesembolsosService.remove(id, nombrepdf);
  }
}
