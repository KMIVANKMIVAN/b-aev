import { Injectable } from '@nestjs/common';
import { CreateRolesUserDto } from './dto/create-roles_user.dto';
import { UpdateRolesUserDto } from './dto/update-roles_user.dto';

@Injectable()
export class RolesUsersService {
  create(createRolesUserDto: CreateRolesUserDto) {
    return 'This action adds a new rolesUser';
  }

  findAll() {
    return `This action returns all rolesUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolesUser`;
  }

  update(id: number, updateRolesUserDto: UpdateRolesUserDto) {
    return `This action updates a #${id} rolesUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolesUser`;
  }
}
