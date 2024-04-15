import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartamentobusaDto } from './dto/create-departamentobusa.dto';
import { UpdateDepartamentobusaDto } from './dto/update-departamentobusa.dto';
import { Departamentobusa } from './entities/departamentobusa.entity';

@Injectable()
export class DepartamentobusaService {
  constructor(
    @InjectRepository(Departamentobusa)
    private readonly departamentobusaRepository: Repository<Departamentobusa>,
  ) {}

  async create(createDepartamentobusaDto: CreateDepartamentobusaDto) {
    try {
      const newDepartamento = this.departamentobusaRepository.create(
        createDepartamentobusaDto,
      );
      return await this.departamentobusaRepository.save(newDepartamento);
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

  async findAll() {
    try {
      const departamentos = await this.departamentobusaRepository.find();
      if (!departamentos || departamentos.length === 0) {
        throw new BadRequestException({
          error: `No se encontraron departamentos`,
          message: `No hay departamentos en la base de datos`,
        });
      }
      return departamentos;
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

  async findOne(id: number) {
    try {
      const departamento = await this.departamentobusaRepository.findOne({
        where: { id },
      });
      if (!departamento) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El departamento con ID ${id} NO Existe`,
          message: `Departamentobusa con ID ${id} no fue encontrado`,
        });
      }
      return departamento;
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
    updateDepartamentobusaDto: UpdateDepartamentobusaDto,
  ) {
    try {
      const existingDepartamento = await this.findOne(id);
      if (!existingDepartamento) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Departamentobusa con ID ${id} NO Existe`,
          message: `Departamentobusa con ID ${id} no fue encontrada`,
        });
      }

      const updateResult = Object.assign(
        existingDepartamento,
        updateDepartamentobusaDto,
      );
      return await this.departamentobusaRepository.save(updateResult);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (update): ${error}`,
          message: `Error del Servidor en (update): ${error}`,
        });
      }
    }
  }

  async remove(id: number) {
    try {
      const departamento = await this.findOne(id);
      if (!departamento) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Departamentobusa con ID ${id} NO Existe`,
          message: `Departamentobusa con ID ${id} no fue encontrada`,
        });
      }
      await this.departamentobusaRepository.delete(id);
      return {
        success: true,
        message: `Se eliminó el Departamentobusa con ID: ${id}`,
      };
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
