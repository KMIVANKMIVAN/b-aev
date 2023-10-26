import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CreatePlanillasigeproDto } from './dto/create-planillasigepro.dto';
import { UpdatePlanillasigeproDto } from './dto/update-planillasigepro.dto';
import { Planillasigepro } from './entities/planillasigepro.entity';

@Injectable()
export class PlanillasigeproService {
  constructor(
    @InjectRepository(Planillasigepro)
    private readonly planillasigeproRepository: Repository<Planillasigepro>,
    private connection: Connection,
  ) {}

  /* create(createPlanillasigeproDto: CreatePlanillasigeproDto) {
    return 'This action adds a new planillasigepro';
  } */

  async findAll(): Promise<Planillasigepro[]> {
    try {
      return await this.planillasigeproRepository.find();
    } catch (error) {
      throw new Error('No se pudieron obtener las Planillasporcontrato.');
    }
  }

  async findOne(id: number): Promise<Planillasigepro> {
    const planillasigepro = await this.planillasigeproRepository.findOne({
      where: { id },
    });

    if (!planillasigepro) {
      throw new NotFoundException(`Planillasigepro con ID ${id} no encontrado`);
    }

    return planillasigepro;
  }

  /* update(id: number, updatePlanillasigeproDto: UpdatePlanillasigeproDto) {
    return `This action updates a #${id} planillasigepro`;
  }

  remove(id: number) {
    return `This action removes a #${id} planillasigepro`;
  } */
}
