import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CreatePlanillasporcontratoDto } from './dto/create-planillasporcontrato.dto';
import { UpdatePlanillasporcontratoDto } from './dto/update-planillasporcontrato.dto';
import { Planillasporcontrato } from './entities/planillasporcontrato.entity';

@Injectable()
export class PlanillasporcontratoService {
  constructor(
    @InjectRepository(Planillasporcontrato)
    private readonly planillasporcontratoRepository: Repository<Planillasporcontrato>,
    private connection: Connection,
  ) {}

  /* create(createPlanillasporcontratoDto: CreatePlanillasporcontratoDto) {
    return 'This action adds a new planillasporcontrato';
  } */

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

  /* update(
    id: number,
    updatePlanillasporcontratoDto: UpdatePlanillasporcontratoDto,
  ) {
    return `This action updates a #${id} planillasporcontrato`;
  }

  remove(id: number) {
    return `This action removes a #${id} planillasporcontrato`;
  } */
}
