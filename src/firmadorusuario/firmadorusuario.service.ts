import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { CreateFirmadorusuarioDto } from './dto/create-firmadorusuario.dto';
import { UpdateFirmadorusuarioDto } from './dto/update-firmadorusuario.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Firmadorusuario } from './entities/firmadorusuario.entity';

import { Connection } from 'typeorm';

@Injectable()
export class FirmadorusuarioService {
  constructor(
    @InjectRepository(Firmadorusuario)
    private readonly firmadorRepository: Repository<Firmadorusuario>,
    private connection: Connection,
  ) { }

  /* async create(createFirmadorusuarioDto: CreateFirmadorusuarioDto): Promise<Firmadorusuario> {
    try {
      const newFirmadorusuario = this.firmadorRepository.create(createFirmadorusuarioDto);
      return await this.firmadorRepository.save(newFirmadorusuario);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (create): ${error}`,
          message: `Error del Servidor en (create): ${error}`,
        });
      }
    }
  } */

  async create(createFirmadorusuarioDto: CreateFirmadorusuarioDto): Promise<Firmadorusuario> {
    try {
      // Buscar si ya existe una fila con el mismo usuario
      const existingFirmadorusuario = await this.firmadorRepository.findOne({
        where: {
          usuario: createFirmadorusuarioDto.usuario,
        },
      });

      if (existingFirmadorusuario) {
        // Si existe, actualizar la fila existente con los nuevos valores
        existingFirmadorusuario.firmador = createFirmadorusuarioDto.firmador;
        return await this.firmadorRepository.save(existingFirmadorusuario);
      } else {
        // Si no existe, crear una nueva fila
        const newFirmadorusuario = this.firmadorRepository.create(createFirmadorusuarioDto);
        return await this.firmadorRepository.save(newFirmadorusuario);
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (create): ${error}`,
          message: `Error del Servidor en (create): ${error}`,
        });
      }
    }
  }

  async findAll(): Promise<Firmadorusuario[]> {
    try {
      const firmadorusuarios = await this.firmadorRepository.find();
      if (firmadorusuarios.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron Firmadorusuario.`,
          message: `No se encontraron Firmadorusuario.`,
        });
      }
      return firmadorusuarios;
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


  /* async mostrarPorUsuarios(
    userid: number,
  ): Promise<Firmadorusuario> {

    try {
      const ocultar = await this.firmadorRepository.findOne({
        where: {
          usuario: userid,
        },
      });
      if (!ocultar) {
        throw new BadRequestException({
          statusCode: 404,
          error: `No se encontró datos del Usuario con ID: ${userid}.`,
          message: `No se encontró datos.`,
        });
      }
      return this.findOne(ocultar.id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (mostrarPorUsuarios) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (mostrarPorUsuarios) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (mostrarPorUsuarios): ${error}`,
          message: `Error del Servidor en (mostrarPorUsuarios): ${error}`,
        });
      }
    }
  } */
  /* async mostrarPorUsuarios(
    userid: number,
  ): Promise<Firmadorusuario> {

    try {
      const sql = `
      SELECT fu.*, f.cargo 
      FROM firmadorusuario fu
      INNER JOIN firmador f ON fu.firmador = f.id
      WHERE fu.usuario = ${userid};  
      `;
      const ocultar = await this.connection.query(sql);
      if (ocultar.length === 0) {
        throw new BadRequestException({
          statusCode: 404,
          error: `No se encontró datos del Usuario con ID: ${userid}.`,
          message: `No se encontró datos.`,
        });
      }
      return ocultar;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (mostrarPorUsuarios) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (mostrarPorUsuarios) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (mostrarPorUsuarios): ${error}`,
          message: `Error del Servidor en (mostrarPorUsuarios): ${error}`,
        });
      }
    }
  } */
  async mostrarPorUsuarios(userid: number): Promise<Firmadorusuario | null> {
    try {
      const sql = `
      SELECT fu.*, f.cargo 
      FROM firmadorusuario fu
      INNER JOIN firmador f ON fu.firmador = f.id
      WHERE fu.usuario = ${userid};  
      `;
      const ocultar = await this.connection.query(sql);
      if (ocultar.length === 0) {
        return null; // No se encontraron datos, devolver null
      }
      return ocultar;
    } catch (error) {
      // Si ocurre algún error, simplemente devolver null
      return null;
    }
  }


  async findOne(id: number): Promise<Firmadorusuario> {
    try {
      const firmadorusuario = await this.firmadorRepository.findOneBy({ id });
      if (!firmadorusuario) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Firmadorusuario con ID ${id} NO Existe`,
          message: `Firmadorusuario con ID ${id} no fue encontrado`,
        });
      }
      return firmadorusuario;
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

  async update(id: number, updateFirmadorusuarioDto: UpdateFirmadorusuarioDto): Promise<Firmadorusuario> {
    try {
      const existingfirmadorusuarios = await this.findOne(id);
      const updateResult = await this.firmadorRepository.update(id, updateFirmadorusuarioDto);
      if (updateResult.affected === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Firmadorusuario con ID ${id} NO se actualizo correctamente`,
          message: `Firmadorusuario con ID ${id} no se actualizo correctamente`,
        });
      }
      return this.findOne(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (update) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (update) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (update): ${error}`,
          message: `Error del Servidor en (update): ${error}`,
        });
      }
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const existingfirmadorusuario = await this.findOne(id);
      await this.firmadorRepository.remove(existingfirmadorusuario);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        error: `Error del Servidor en (remove): ${error}`,
        message: `Error del Servidor en (remove): ${error}`,
      });
    }
  }
}
