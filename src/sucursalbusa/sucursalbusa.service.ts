import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSucursalbusaDto } from './dto/create-sucursalbusa.dto';
import { UpdateSucursalbusaDto } from './dto/update-sucursalbusa.dto';
import { Sucursalbusa } from './entities/sucursalbusa.entity';

@Injectable()
export class SucursalbusaService {
  constructor(
    @InjectRepository(Sucursalbusa)
    private readonly sucursalbusaRepository: Repository<Sucursalbusa>,
  ) {}

  async create(createSucursalbusaDto: CreateSucursalbusaDto) {
    try {
      // Buscar el departamento por su ID
      /* const departamento = await this.sucursalbusaRepository.findOne({
        where: { id: createSucursalbusaDto.departamento_id },
      });
      if (!departamento) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El departamento con ID ${createSucursalbusaDto.departamento_id} NO Existe`,
          message: `Departamento con ID ${createSucursalbusaDto.departamento_id} no fue encontrado`,
        });
      } */

      // Crear nueva sucursal y asignar el departamento
      const newSucursale = createSucursalbusaDto;

      return await this.sucursalbusaRepository.save(newSucursale);
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
      const sucursales = await this.sucursalbusaRepository.find();
      if (!sucursales || sucursales.length === 0) {
        throw new BadRequestException({
          error: `No se encontraron sucursales`,
          message: `No hay sucursales en la base de datos`,
        });
      }
      return sucursales;
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
      const sucursale = await this.sucursalbusaRepository.findOne({
        where: { id },
      });
      if (!sucursale) {
        throw new BadRequestException({
          statusCode: 400,
          error: `La sucursal con ID ${id} NO Existe`,
          message: `Sucursal con ID ${id} no fue encontrada`,
        });
      }
      return sucursale;
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

  async update(id: number, updateSucursalbusaDto: UpdateSucursalbusaDto) {
    try {
      const existingSucursale = await this.findOne(id);

      // Transforma el DTO en una instancia de Sucursalbusa
      if (!existingSucursale) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Sucursal con ID ${id} NO Existe`,
          message: `Sucursal con ID ${id} no fue encontrada`,
        });
      }
      const updatedSucursale = Object.assign(
        existingSucursale,
        updateSucursalbusaDto,
      );

      return await this.sucursalbusaRepository.save(updatedSucursale);
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
      const sucursale = await this.findOne(id);
      if (!sucursale) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Sucursal con ID ${id} NO Existe`,
          message: `Sucursal con ID ${id} no fue encontrada`,
        });
      }
      await this.sucursalbusaRepository.delete(id);
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
