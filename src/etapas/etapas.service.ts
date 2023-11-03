import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CreateEtapaDto } from './dto/create-etapa.dto';
import { UpdateEtapaDto } from './dto/update-etapa.dto';
import { Etapa } from './entities/etapa.entity';

@Injectable()
export class EtapasService {
  constructor(
    @InjectRepository(Etapa)
    private readonly etapaRepository: Repository<Etapa>,
    private connection: Connection,
  ) {}
  /* create(createEtapaDto: CreateEtapaDto) {
    return 'This action adds a new etapa';
  } */

  async findAll(): Promise<Etapa[]> {
    try {
      return await this.etapaRepository.find();
    } catch (error) {
      throw new Error('No se pudieron obtener los Desembolso.');
    }
  }

  async findOne(id: number): Promise<Etapa> {
    const etapa = await this.etapaRepository.findOne({
      where: { id },
    });

    if (!etapa) {
      throw new NotFoundException(`Etapa con ID ${id} no encontrado`);
    }

    return etapa;
  }

  /* update(id: number, updateEtapaDto: UpdateEtapaDto) {
    return `This action updates a #${id} etapa`;
  }

  remove(id: number) {
    return `This action removes a #${id} etapa`;
  } */
}
