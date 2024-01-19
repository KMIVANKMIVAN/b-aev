import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Proyecto } from './entities/proyecto.entity';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    private connection: Connection,
    private configService: ConfigService,
  ) {}
  async findAll(contcod: string, iduser: number): Promise<Proyecto[]> {
    try {
      const iddepartuser = await this.findOneUser(iduser);
      let sql: string;
      if (iddepartuser[0].id === 10 || iddepartuser[0].id === 11) {
        sql = `
        SELECT p.id, p.num, p.proyecto_nombre, p.idTipo, t.tipo, p.departamento, d.departamento  
        FROM cuadro.proyectosexcel p,
        cuadro.tipo t,
        cuadro.departamentos d 
        WHERE p.idTipo = t.idTipo
        and p.departamento = d.id
        and num LIKE '%${contcod}%'
        and activo = 1
        `;
      } else {
        sql = `
        SELECT p.id, p.num, p.proyecto_nombre, p.idTipo, t.tipo, p.departamento, d.departamento  
        FROM cuadro.proyectosexcel p,
        cuadro.tipo t,
        cuadro.departamentos d 
        WHERE p.idTipo = t.idTipo
        and p.departamento = d.id
        and num LIKE '%${contcod}%'
        AND p.departamento = '${iddepartuser[0].id}'
        and activo = 1

        `;
      }
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        const errorMessage = `No se encontraron datos para el código ${contcod}`;
        throw new BadRequestException({
          statusCode: 400,
          error: errorMessage,
          message: `${errorMessage} sin datos`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAll) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findAll) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAll): ${error}`,
          message: `Error del Servidor en (findAll): ${error}`,
        });
      }
    }
  }

  async findOneUser(id: number) {
    try {
      const sql = `
        SELECT
        users.username, 
        departamento.id 
      FROM
        users
        INNER JOIN
        oficinas
        ON 
          users.id_oficina = oficinas.id
        INNER JOIN
        departamento
        ON 
          oficinas.departamento = departamento.id
        WHERE users.id = ${id}
        `;
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        const errorMessage = `No se encontraron datos para el usuario con ID: ${id}`;
        throw new BadRequestException({
          statusCode: 400,
          error: errorMessage,
          message: `${errorMessage} sin datos`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOneUser) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findOneUser) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOneUser): ${error}`,
          message: `Error del Servidor en (findOneUser): ${error}`,
        });
      }
    }
  }
}
