import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { CreateRolesUserDto } from './dto/create-roles_user.dto';
import { UpdateRolesUserDto } from './dto/update-roles_user.dto';
import { RolesUser } from './entities/roles_user.entity';
@Injectable()
export class RolesUsersService {
  constructor(
    @InjectRepository(RolesUser)
    private readonly rolesUserRepository: Repository<RolesUser>,
  ) {}
  /* create(createRolesUserDto: CreateRolesUserDto) {
      return 'This action adds a new rolesUser';
    } */

  async findAll(): Promise<RolesUser[]> {
    try {
      return await this.rolesUserRepository.find();
    } catch (error) {
      console.error('Error al obtener los usuarios:', error); // Agrega esta línea
      // Puedes personalizar la respuesta de error aquí si lo deseas
      throw new Error('No se pudieron obtener los usuarios.');
    }
  }

  /* findOne(id: number) {
      return `This action returns a #${id} rolesUser`;
    }

    update(id: number, updateRolesUserDto: UpdateRolesUserDto) {
      return `This action updates a #${id} rolesUser`;
    }

    remove(id: number) {
      return `This action removes a #${id} rolesUser`;
    } */
}
