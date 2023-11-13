import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

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
      const { user_id, role_id } = createRolesUserDto;
      console.log(
        'Creando un nuevo registro de roles_users:',
        user_id,
        role_id,
      );

      const newRolesUser = this.rolesuserRepository.create({
        user_id,
        role_id: 1,
      });

      return await this.rolesuserRepository.save(newRolesUser);
    } catch (error) {
      console.error('Error al crear un nuevo registro de roles_users:', error);
      throw new Error('Error al crear un nuevo registro de roles_users');
    }
  }

  async findAll(): Promise<RolesUser[]> {
    return this.rolesuserRepository.find();
  }

  async findOne(user_id: number): Promise<RolesUser> {
    const rolesUser = await this.rolesuserRepository.findOne({
      where: { user_id },
    });
    if (!rolesUser) {
      throw new NotFoundException(`RolesUser with ID ${user_id} not found`);
    }
    return rolesUser;
  }

  async update(
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
  }
}
