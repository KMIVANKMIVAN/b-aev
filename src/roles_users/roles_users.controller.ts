import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RolesUsersService } from './roles_users.service';
import { CreateRolesUserDto } from './dto/create-roles_user.dto';
import { UpdateRolesUserDto } from './dto/update-roles_user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('roles-users')
export class RolesUsersController {
  constructor(private readonly rolesUsersService: RolesUsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createRolesUserDto: CreateRolesUserDto) {
    return this.rolesUsersService.create(createRolesUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.rolesUsersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') user_id: number) {
    return this.rolesUsersService.findOne(user_id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') user_id: number,
    @Body() updateRolesUserDto: UpdateRolesUserDto,
  ) {
    return this.rolesUsersService.update(user_id, updateRolesUserDto);
  }
}
