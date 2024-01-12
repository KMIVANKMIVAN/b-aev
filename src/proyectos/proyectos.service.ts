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
        SELECT proyecto_nombre, id, idTipo, departamento 
        FROM cuadro.proyectosexcel 
        WHERE num LIKE '%${contcod}%'
        `;
      } else {
        sql = `
        SELECT proyecto_nombre, id, idTipo, departamento 
        FROM cuadro.proyectosexcel 
        WHERE num LIKE '%${contcod}%' AND departamento = '${iddepartuser[0].id}'
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
