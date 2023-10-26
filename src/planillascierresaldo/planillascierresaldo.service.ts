import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CreatePlanillascierresaldoDto } from './dto/create-planillascierresaldo.dto';
import { UpdatePlanillascierresaldoDto } from './dto/update-planillascierresaldo.dto';
import { Planillascierresaldo } from './entities/planillascierresaldo.entity';

@Injectable()
export class PlanillascierresaldoService {
  constructor(
    @InjectRepository(Planillascierresaldo)
    private readonly planillascierresaldoRepository: Repository<Planillascierresaldo>,
    private connection: Connection,
  ) {}

  /* create(createPlanillascierresaldoDto: CreatePlanillascierresaldoDto) {
    return 'This action adds a new planillascierresaldo';
  } */

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

  /* update(
    id: number,
    updatePlanillascierresaldoDto: UpdatePlanillascierresaldoDto,
  ) {
    return `This action updates a #${id} planillascierresaldo`;
  }

  remove(id: number) {
    return `This action removes a #${id} planillascierresaldo`;
  } */
}
