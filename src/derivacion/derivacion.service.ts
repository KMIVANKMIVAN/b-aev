import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDerivacionDto } from './dto/create-derivacion.dto';
import { UpdateDerivacionDto } from './dto/update-derivacion.dto';
import { Derivacion } from './entities/derivacion.entity';

@Injectable()
export class DerivacionService {
  constructor(
    @InjectRepository(Derivacion)
    private readonly derivacionRepository: Repository<Derivacion>,
  ) { }

  async create(createDerivacionDto: CreateDerivacionDto): Promise<Derivacion> {
    try {
      const newDerivacion = this.derivacionRepository.create(createDerivacionDto);
      return await this.derivacionRepository.save(newDerivacion);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error instanceof UnauthorizedException) {
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

  async findAll(): Promise<Derivacion[]> {
    try {
      const derivacion = await this.derivacionRepository.find();
      if (derivacion.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron derivacion.`,
          message: `No se encontraron derivacion.`,
        });
      }
      return derivacion;
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

  async findOne(id: number): Promise<Derivacion> {
    try {
      const derivacion = await this.derivacionRepository.findOne({ where: { id } });
      if (!derivacion) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El derivacion con ID ${id} NO Existe`,
          message: `derivacion con ID ${id} no fue encontrado`,
        });
      }
      return derivacion;
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

  async update(
    id: number,
    updateDerivacionDto: UpdateDerivacionDto,
  ): Promise<Derivacion> {
    try {
      const existingDerivacion = await this.findOne(id);
      const { ...rest } = updateDerivacionDto;
      const updatedDerivacion: Partial<Derivacion> = {
        ...rest,
      };
      const updateResult = await this.derivacionRepository.update(id, updatedDerivacion);
      if (updateResult.affected === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El derivacion con ID ${id} NO se actualizo correctamente`,
          message: `derivacion con ID ${id} no se actualizo correctamente`,
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
      const existingDerivacion = await this.findOne(id);
      await this.derivacionRepository.remove(existingDerivacion);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (remove): ${error}`,
          message: `Error del Servidor en (remove): ${error}`,
        });
      }
    }
  }
}
