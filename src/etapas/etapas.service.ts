import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';

import { Etapa } from './entities/etapa.entity';

@Injectable()
export class EtapasService {
  constructor(
    @InjectRepository(Etapa)
    private readonly etapaRepository: Repository<Etapa>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<Etapa[]> {
    try {
      const estapas = await this.etapaRepository.find();
      if (estapas.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron estapas.`,
          message: `No se encontraron estapas.`,
        });
      }
      return estapas;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAll): ${error}`,
          message: `Error del Servidor en (findAll): ${error}`,
        });
      }
    }
  }

  async findOne(id: number): Promise<Etapa> {
    try {
      const etapa = await this.etapaRepository.findOne({
        where: { id },
      });
      if (!etapa) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Etapa con ID ${id} no encontrado`,
          message: `Etapa con ID ${id} no encontrado`,
        });
      }
      return etapa;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
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
