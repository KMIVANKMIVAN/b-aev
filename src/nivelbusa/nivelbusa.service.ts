import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNivelbusaDto } from './dto/create-nivelbusa.dto';
import { UpdateNivelbusaDto } from './dto/update-nivelbusa.dto';
import { Nivelbusa } from './entities/nivelbusa.entity';

@Injectable()
export class NivelbusaService {
  constructor(
    @InjectRepository(Nivelbusa)
    private readonly nivelbusaRepository: Repository<Nivelbusa>,
  ) {}

  async create(createNivelbusaDto: CreateNivelbusaDto) {
    try {
      // Buscar el departamento por su ID
      /* const departamento = await this.nivelbusaRepository.findOne({
        where: { id: createSucursaleDto.departamento_id },
      });
      if (!departamento) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El departamento con ID ${createSucursaleDto.departamento_id} NO Existe`,
          message: `Departamento con ID ${createSucursaleDto.departamento_id} no fue encontrado`,
        });
      } */

      // Crear nueva sucursal y asignar el departamento
      const newNivel = createNivelbusaDto;
      /* newSucursale.sucursal = createSucursaleDto.sucursal;
      newSucursale.departamento_id = departamento; */

      return await this.nivelbusaRepository.save(newNivel);
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
      const niveles = await this.nivelbusaRepository.find();
      if (!niveles || niveles.length === 0) {
        throw new BadRequestException({
          error: `No se encontraron niveles`,
          message: `No hay niveles en la base de datos`,
        });
      }
      return niveles;
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
      const niveles = await this.nivelbusaRepository.findOne({
        where: { id },
      });
      if (!niveles) {
        throw new BadRequestException({
          statusCode: 400,
          error: `La sucursal con ID ${id} NO Existe`,
          message: `Sucursal con ID ${id} no fue encontrada`,
        });
      }
      return niveles;
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

  async update(id: number, updateNivelbusaDto: UpdateNivelbusaDto) {
    try {
      const existingNivel = await this.findOne(id);

      // Transforma el DTO en una instancia de Nivelbusa
      if (!existingNivel) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Sucursal con ID ${id} NO Existe`,
          message: `Sucursal con ID ${id} no fue encontrada`,
        });
      }
      const updatedSucursale = Object.assign(existingNivel, updateNivelbusaDto);

      return await this.nivelbusaRepository.save(updatedSucursale);
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

  async remove(id: number): Promise<any> {
    try {
      const niveles = await this.findOne(id);
      if (!niveles) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Sucursal con ID ${id} NO Existe`,
          message: `Sucursal con ID ${id} no fue encontrada`,
        });
      }
      await this.nivelbusaRepository.delete(id);
      return { success: true, message: `Se eliminó la Sucursal con ID: ${id}` };
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
