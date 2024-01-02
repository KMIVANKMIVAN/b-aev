import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';

import { Planillasigepro } from './entities/planillasigepro.entity';

@Injectable()
export class PlanillasigeproService {
  constructor(
    @InjectRepository(Planillasigepro)
    private readonly planillasigeproRepository: Repository<Planillasigepro>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<Planillasigepro[]> {
    try {
      const planillasigepro = await this.planillasigeproRepository.find();
      if (planillasigepro.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron Planillasigepro.`,
          message: `No se encontraron Planillasigepro.`,
        });
      }
      return planillasigepro;
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

  async findOne(id: number): Promise<Planillasigepro> {
    try {
      const planillasigepro = await this.planillasigeproRepository.findOne({
        where: { id },
      });
      if (!planillasigepro) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Planillasigepro con ID ${id} no encontrado`,
          message: `Planillasigepro con ID ${id} no encontrado`,
        });
      }
      return planillasigepro;
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
