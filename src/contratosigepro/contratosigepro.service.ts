import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { Contratosigepro } from './entities/contratosigepro.entity';

@Injectable()
export class ContratosigeproService {
  constructor(
    @InjectRepository(Contratosigepro)
    private readonly contratosigeproRepository: Repository<Contratosigepro>,
  ) {}

  async findAll(): Promise<Contratosigepro[]> {
    try {
      return await this.contratosigeproRepository.find();
    } catch (error) {
      throw new Error('No se pudieron obtener los Contratosigepro.');
    }
  }

  async findOne(id: number): Promise<Contratosigepro> {
    const contratosigepro = await this.contratosigeproRepository.findOne({
      where: { id },
    });

    if (!contratosigepro) {
      throw new NotFoundException(`Contratosigepro con ID ${id} no encontrado`);
    }

    return contratosigepro;
  }
}
