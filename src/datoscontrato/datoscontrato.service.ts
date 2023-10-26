import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CreateDatoscontratoDto } from './dto/create-datoscontrato.dto';
import { UpdateDatoscontratoDto } from './dto/update-datoscontrato.dto';
import { Datoscontrato } from './entities/datoscontrato.entity';

@Injectable()
export class DatoscontratoService {
  constructor(
    @InjectRepository(Datoscontrato)
    private readonly datoscontratoRepository: Repository<Datoscontrato>,
    private connection: Connection,
  ) {}

  /* create(createDatoscontratoDto: CreateDatoscontratoDto) {
    return 'This action adds a new datoscontrato';
  } */

  async findAll(): Promise<Datoscontrato[]> {
    try {
      return await this.datoscontratoRepository.find();
    } catch (error) {
      throw new Error('No se pudieron obtener los Datoscontrato.');
    }
  }
  async findAllDatosContrato(): Promise<Datoscontrato[]> {
    try {
      const sql = `
        SELECT * FROM datoscontrato
        UNION
        SELECT * FROM contratosigepro
      `;

      const result = await this.connection.query(sql);
      return result;
    } catch (error) {
      throw new Error('No se pudieron obtener los Datoscontrato.');
    }
  }

  async findOne(id: number): Promise<Datoscontrato> {
    const datoscontrato = await this.datoscontratoRepository.findOne({
      where: { id },
    });

    if (!datoscontrato) {
      throw new NotFoundException(`Datoscontrato con ID ${id} no encontrado`);
    }

    return datoscontrato;
  }
  async findOneContCod(contcod: string): Promise<Datoscontrato> {
    try {
      const sql = `
        (SELECT *
        FROM planillasporcontrato
        WHERE cont = ?
        AND activo = 1
        )
        UNION
        (SELECT *
        FROM planillasigepro
        WHERE cont = ?
        AND activo = 1
        )
        UNION
        (SELECT *
        FROM planillascierresaldo
        WHERE cont = ?
        ) ORDER BY orden ASC
      `;

      const result = await this.connection.query(sql, [
        contcod,
        contcod,
        contcod,
      ]);
      return result;
    } catch (error) {
      throw new Error('No se pudieron obtener los Datoscontrato.');
    }
  }

  /* update(id: number, updateDatoscontratoDto: UpdateDatoscontratoDto) {
    return `This action updates a #${id} datoscontrato`;
  }

  remove(id: number) {
    return `This action removes a #${id} datoscontrato`;
  } */
}
