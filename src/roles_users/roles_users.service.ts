import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolesUserDto } from './dto/create-roles_user.dto';
import { UpdateRolesUserDto } from './dto/update-roles_user.dto';
import { RolesUser } from './entities/roles_user.entity';

@Injectable()
export class RolesUsersService {
  constructor(
    @InjectRepository(RolesUser)
    private readonly rolesuserRepository: Repository<RolesUser>,
  ) {}

  async create(createRolesUserDto: CreateRolesUserDto): Promise<RolesUser> {
    try {
      const { user_id } = createRolesUserDto;
      const newRolesUser = this.rolesuserRepository.create({
        user_id,
        role_id: 1,
      });
      const savedRolesUser = await this.rolesuserRepository.save(newRolesUser);
      if (!savedRolesUser) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Conflicto al guardar el nuevo RolesUser.`,
          message: `Conflicto al guardar el nuevo RolesUser.`,
        });
      }
      return savedRolesUser;
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

  async findAll(): Promise<RolesUser[]> {
    try {
      const rolesuser = await this.rolesuserRepository.find();
      if (rolesuser.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron RolesUser.`,
          message: `No se encontraron RolesUser.`,
        });
      }
      return rolesuser;
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

  async findOne(user_id: number): Promise<RolesUser> {
    try {
      const rolesUser = await this.rolesuserRepository.findOne({
        where: { user_id },
      });
      if (!rolesUser) {
        throw new BadRequestException({
          statusCode: 500,
          error: `RolesUser con ID ${user_id} no encontrado.`,
          message: `RolesUser con ID ${user_id} no encontrado.`,
        });
      }
      return rolesUser;
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
    user_id: number,
    updateRolesUserDto: UpdateRolesUserDto,
  ): Promise<RolesUser> {
    try {
      const { role_id } = updateRolesUserDto;
      const existingRolesUser = await this.findOne(user_id);
      existingRolesUser.role_id = role_id;
      const updatedRolesUser =
        await this.rolesuserRepository.save(existingRolesUser);

      if (!updatedRolesUser) {
        throw new BadRequestException({
          statusCode: 500,
          error: `No se pudo actualizar el RolesUser con ID ${user_id}`,
          message: `No se pudo actualizar el RolesUser con ID ${user_id}`,
        });
      }

      return updatedRolesUser;
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

  /* async update(
    user_id: number,
    updateRolesUserDto: UpdateRolesUserDto,
  ): Promise<RolesUser> {
    try {
      const { role_id } = updateRolesUserDto;
      const existingRolesUser = await this.findOne(user_id);
      existingRolesUser.role_id = role_id;
      return await this.rolesuserRepository.save(existingRolesUser);
    } catch (error) {
      throw new Error(
        `Error al actualizar el registro de roles_users con ID ${user_id}`,
      );
    }
  } */
}
