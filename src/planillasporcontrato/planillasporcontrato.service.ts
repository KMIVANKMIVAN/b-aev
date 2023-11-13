import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
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
      return await this.planillasporcontratoRepository.find();
    } catch (error) {
      throw new Error('No se pudieron obtener las Planillasporcontrato.');
    }
  }

  async findOne(id: number): Promise<Planillasporcontrato> {
    const planillasporcontrato =
      await this.planillasporcontratoRepository.findOne({
        where: { id },
      });

    if (!planillasporcontrato) {
      throw new NotFoundException(
        `Planillasporcontrato con ID ${id} no encontrado`,
      );
    }

    return planillasporcontrato;
  }
}
