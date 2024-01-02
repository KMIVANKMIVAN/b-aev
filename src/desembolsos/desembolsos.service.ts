import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      const desembolsos = await this.desembolsoRepository.find();
      if (desembolsos.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron desembolsos.`,
          message: `No se encontraron desembolsos.`,
        });
      }
      return desembolsos;
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
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (desenbolsoetapas) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (desenbolsoetapas) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (desenbolsoetapas): ${error}`,
          message: `Error del Servidor en (desenbolsoetapas): ${error}`,
        });
      }
    }
  }

  async findOne(id: number): Promise<Desembolso> {
    try {
      const desembolso = await this.desembolsoRepository.findOne({
        where: { id },
      });
      if (!desembolso) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Desembolso con ID ${id} no encontrado NO Existe`,
          message: `Desembolso con ID ${id} no encontrado`,
        });
      }
      return desembolso;
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
