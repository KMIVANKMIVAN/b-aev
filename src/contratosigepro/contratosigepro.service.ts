import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Contratosigepro } from './entities/contratosigepro.entity';

@Injectable()
export class ContratosigeproService {
  constructor(
    @InjectRepository(Contratosigepro)
    private readonly contratosigeproRepository: Repository<Contratosigepro>,
  ) {}

  async findAll(): Promise<Contratosigepro[]> {
    try {
      const contratosigepro = await this.contratosigeproRepository.find();
      if (contratosigepro.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener los Contratosigepro`,
          message: `No se pudieron obtener los Contratosigepro Sin datos`,
        });
      }
      return contratosigepro;
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

  async findOne(id: number): Promise<Contratosigepro> {
    try {
      const contratosigepro = await this.contratosigeproRepository.findOne({
        where: { id },
      });
      if (!contratosigepro) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Contratosigepro con ID ${id} no encontrado`,
          message: `Contratosigepro con ID ${id} no encontrado`,
        });
      }
      return contratosigepro;
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
