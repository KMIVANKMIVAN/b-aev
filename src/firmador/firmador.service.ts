import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateFirmadorDto } from './dto/create-firmador.dto';
import { UpdateFirmadorDto } from './dto/update-firmador.dto';
import { Firmador } from './entities/firmador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FirmadorService {
  constructor(
    @InjectRepository(Firmador)
    private readonly firmadorRepository: Repository<Firmador>,
  ) { }

  async create(createFirmadorDto: CreateFirmadorDto): Promise<Firmador> {

    try {
      const newFirmador = this.firmadorRepository.create(createFirmadorDto);
      return await this.firmadorRepository.save(newFirmador);
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

  async findAll(): Promise<Firmador[]> {
    try {
      const firmador = await this.firmadorRepository.find();
      if (firmador.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron firmador.`,
          message: `No se encontraron firmador.`,
        });
      }
      return firmador;
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

  async findOne(id: number): Promise<Firmador> {
    try {
      const firmador = await this.firmadorRepository.findOne({ where: { id } });
      if (!firmador) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El firmador con ID ${id} NO Existe`,
          message: `firmador con ID ${id} no fue encontrado`,
        });
      }
      return firmador;
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
    updateFirmadorDto: UpdateFirmadorDto,
  ): Promise<Firmador> {
    try {
      const existingFirmador = await this.findOne(id);
      const { ...rest } = updateFirmadorDto;
      const updatedFirmador: Partial<Firmador> = {
        ...rest,
      };
      const updateResult = await this.firmadorRepository.update(id, updateFirmadorDto);
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
    const existingFirmador = await this.findOne(id);
    await this.firmadorRepository.remove(existingFirmador);
  }
}
