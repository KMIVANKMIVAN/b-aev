import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateTipoRespaldoDto } from './dto/create-tipo_respaldo.dto';
import { UpdateTipoRespaldoDto } from './dto/update-tipo_respaldo.dto';
import { Connection } from 'typeorm';

import { TipoRespaldo } from './entities/tipo_respaldo.entity';

@Injectable()
export class TipoRespaldoService {
  constructor(
    @InjectRepository(TipoRespaldo)
    private readonly tiporespaldoRepository: Repository<TipoRespaldo>,
    private connection: Connection,
  ) {}

  /* create(createTipoRespaldoDto: CreateTipoRespaldoDto) {
    return 'This action adds a new tipoRespaldo';
  } */

  async findAll(): Promise<TipoRespaldo[]> {
    return await this.tiporespaldoRepository.find();
  }

  async findOne(id: number): Promise<TipoRespaldo> {
    const tipoRespaldo = await this.tiporespaldoRepository.findOne({
      where: { id },
    });
    if (!tipoRespaldo) {
      throw new NotFoundException(`TipoRespaldo with ID ${id} not found`);
    }
    return tipoRespaldo;
  }

  /* update(id: number, updateTipoRespaldoDto: UpdateTipoRespaldoDto) {
    return `This action updates a #${id} tipoRespaldo`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoRespaldo`;
  } */
}
