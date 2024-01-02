import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';

import { Planillasporcontrato } from './entities/planillasporcontrato.entity';

@Injectable()
export class PlanillasporcontratoService {
  constructor(
    @InjectRepository(Planillasporcontrato)
    private readonly planillasporcontratoRepository: Repository<Planillasporcontrato>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<Planillasporcontrato[]> {
    try {
      const planillasporcontrato =
        await this.planillasporcontratoRepository.find();
      if (planillasporcontrato.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron Planillasporcontrato.`,
          message: `No se encontraron Planillasporcontrato.`,
        });
      }
      return planillasporcontrato;
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

  async findOne(id: number): Promise<Planillasporcontrato> {
    try {
      const planillasporcontrato =
        await this.planillasporcontratoRepository.findOne({
          where: { id },
        });
      if (!planillasporcontrato) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Planillasporcontrato con ID ${id} no encontrado`,
          message: `Planillasporcontrato con ID ${id} no encontrado`,
        });
      }
      return planillasporcontrato;
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
