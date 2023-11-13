import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
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
      return await this.planillascierresaldoRepository.find();
    } catch (error) {
      throw new Error('No se pudieron obtener las Planillascierresaldo.');
    }
  }

  async findOne(id: number): Promise<Planillascierresaldo> {
    const planillascierresaldo =
      await this.planillascierresaldoRepository.findOne({
        where: { id },
      });

    if (!planillascierresaldo) {
      throw new NotFoundException(
        `Planillascierresaldo con ID ${id} no encontrado`,
      );
    }

    return planillascierresaldo;
  }
}
