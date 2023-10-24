import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesUsersService } from './roles_users.service';
import { CreateRolesUserDto } from './dto/create-roles_user.dto';
import { UpdateRolesUserDto } from './dto/update-roles_user.dto';

@Controller('roles-users')
export class RolesUsersController {
  constructor(private readonly rolesUsersService: RolesUsersService) {}

  @Post()
  create(@Body() createRolesUserDto: CreateRolesUserDto) {
    return this.rolesUsersService.create(createRolesUserDto);
  }

  @Get()
  findAll() {
    return this.rolesUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolesUserDto: UpdateRolesUserDto) {
    return this.rolesUsersService.update(+id, updateRolesUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesUsersService.remove(+id);
  }
}
