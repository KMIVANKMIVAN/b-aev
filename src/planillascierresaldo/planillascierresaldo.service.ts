import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';

import { Planillascierresaldo } from './entities/planillascierresaldo.entity';

@Injectable()
export class PlanillascierresaldoService {
  constructor(
    @InjectRepository(Planillascierresaldo)
    private readonly planillascierresaldoRepository: Repository<Planillascierresaldo>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<Planillascierresaldo[]> {
    try {
      const planillascierre = await this.planillascierresaldoRepository.find();
      if (planillascierre.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron Planillascierresaldo.`,
          message: `No se encontraron Planillascierresaldo.`,
        });
      }
      return planillascierre;
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

  async findOne(id: number): Promise<Planillascierresaldo> {
    try {
      const planillascierresaldo =
        await this.planillascierresaldoRepository.findOne({
          where: { id },
        });
      if (!planillascierresaldo) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Planillascierresaldo con ID ${id} no encontrado`,
          message: `Planillascierresaldo con ID ${id} no encontrado`,
        });
      }
      return planillascierresaldo;
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
