import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { Estado } from './entities/estado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';

@Injectable()
export class EstadoService {
  constructor(
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>,
  ) { }

  async create(createEstadoDto: CreateEstadoDto): Promise<Estado> {
    try {
      const newEstado = this.estadoRepository.create(createEstadoDto);
      return await this.estadoRepository.save(newEstado);
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

  async findAll(): Promise<Estado[]> {
    try {
      const estados = await this.estadoRepository.find();
      if (estados.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron estados.`,
          message: `No se encontraron estados.`,
        });
      }
      return estados;
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

  async menosEnviado(): Promise<Estado[]> {
    try {
      const estados = await this.estadoRepository.find({ where: { id: Not(1) } });
      if (estados.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron estados con ID diferente de 1.`,
          message: `No se encontraron estados con ID diferente de 1.`,
        });
      }
      return estados;
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


  async findOne(id: number): Promise<Estado> {
    try {
      const estado = await this.estadoRepository.findOneBy({ id });
      if (!estado) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El estado con ID ${id} NO Existe`,
          message: `Estado con ID ${id} no fue encontrado`,
        });
      }
      return estado;
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

  async update(id: number, updateEstadoDto: UpdateEstadoDto): Promise<Estado> {
    try {
      const existingEstado = await this.findOne(id);
      const updateResult = await this.estadoRepository.update(id, updateEstadoDto);
      if (updateResult.affected === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El estado con ID ${id} NO se actualizo correctamente`,
          message: `Estado con ID ${id} no se actualizo correctamente`,
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
      const existingEstado = await this.findOne(id);
      await this.estadoRepository.remove(existingEstado);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        error: `Error del Servidor en (remove): ${error}`,
        message: `Error del Servidor en (remove): ${error}`,
      });
    }
  }
}
