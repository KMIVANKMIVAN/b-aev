import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  } */
  @UseGuards(AuthGuard)
  @Get('username/:username')
  findOneNameUser(@Param('username') username: string) {
    return this.usersService.findOneNameUser(username);
  }
  @UseGuards(AuthGuard)
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @Get('/buscar/:buscar')
  buscarUsuarios(@Param('buscar') buscar: string) {
    return this.usersService.buscarUsuarios(buscar); // Pasar los parámetros a la función
  }
  @UseGuards(AuthGuard)
  @Patch('updatepassword/:id/:antiguop')
  updatePassword(
    @Param('id') id: string,
    @Param('antiguop') antiguop: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updatePassword(+id, antiguop, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @Patch('resetpassword/:id')
  resetPassword(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.resetPassword(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
