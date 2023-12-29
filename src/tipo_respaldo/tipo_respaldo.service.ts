import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TipoRespaldo } from './entities/tipo_respaldo.entity';

@Injectable()
export class TipoRespaldoService {
  constructor(
    @InjectRepository(TipoRespaldo)
    private readonly tiporespaldoRepository: Repository<TipoRespaldo>,
  ) {}
  async findAll(): Promise<TipoRespaldo[]> {
    try {
      const tipoRespaldoList = await this.tiporespaldoRepository.find();
      if (tipoRespaldoList.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron datos en TIPO RESPALDO NO Existe`,
          message: `No se encontraron datos en TIPO RESPALDO`,
        });
      }
      return tipoRespaldoList;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAll) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findAll) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAll): ${error}`,
          message: `Error del Servidor en (findAll): ${error}`,
        });
      }
    }
  }

  async findOne(id: number): Promise<TipoRespaldo> {
    try {
      const tipoRespaldo = await this.tiporespaldoRepository.findOne({
        where: { id },
      });
      if (!tipoRespaldo) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron datos en TIPO RESPALDO con ID: ${id} NO Existe`,
          message: `No se encontraron datos en TIPO RESPALDO con ID: ${id}`,
        });
      }
      return tipoRespaldo;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOne) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findOne) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOne): ${error}`,
          message: `Error del Servidor en (findOne): ${error}`,
        });
      }
    }
  }
}
