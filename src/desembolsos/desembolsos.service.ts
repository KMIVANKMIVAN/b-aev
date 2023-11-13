import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Desembolso } from './entities/desembolso.entity';

@Injectable()
export class DesembolsosService {
  constructor(
    @InjectRepository(Desembolso)
    private readonly desembolsoRepository: Repository<Desembolso>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<Desembolso[]> {
    try {
      return await this.desembolsoRepository.find();
    } catch (error) {
      throw new Error('No se pudieron obtener los Desembolso.');
    }
  }
  async desenbolsoetapas(): Promise<Desembolso[]> {
    try {
      const queryBuilder = this.desembolsoRepository
        .createQueryBuilder('d')
        .select([
          'd.*',
          'd.id AS iddesem',
          "DATE_FORMAT(d.fecha_generado, '%d/%m/%Y') AS fechagenerado",
          "DATE_FORMAT(d.fecha_banco, '%d/%m/%Y') AS fechabanco",
          'd.monto_desembolsado',
        ])
        .innerJoin('etapas', 'e', 'd.estado = e.id')
        .where('d.estado = :estado', { estado: 6 })
        .andWhere('d.cont_cod = :cont_cod', { cont_cod: '4367' })
        .andWhere('d.titr_cod = :titr_cod', { titr_cod: 'CT_PL' })
        .andWhere('d.ploc_cod IN (:ploc_cod)', { ploc_cod: ['1', '2'] });

      return await queryBuilder.getRawMany();
    } catch (error) {
      throw new Error('No se pudieron obtener los Desembolso.');
    }
  }

  async findOne(id: number): Promise<Desembolso> {
    const desembolso = await this.desembolsoRepository.findOne({
      where: { id },
    });

    if (!desembolso) {
      throw new NotFoundException(`Desembolso con ID ${id} no encontrado`);
    }

    return desembolso;
  }
}
