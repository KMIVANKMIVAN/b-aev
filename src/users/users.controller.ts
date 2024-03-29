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
  constructor(private readonly usersService: UsersService) { }

  // @UseGuards(AuthGuard)
  @Post('create/:nivel')
  create(@Param('nivel') nivel: number, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(nivel, createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('username/:username')
  findOneNameUser(@Param('username') username: string) {
    return this.usersService.findOneNameUser(username);
  }
  @UseGuards(AuthGuard)
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne2(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @Get('/buscarnomusuardepartemento/:buscar/:idofi')
  buscarNomUsuarDepartemento(@Param('buscar') buscar: string, @Param('idofi') idofi: number) {
    return this.usersService.buscarNomUsuarDepartemento(buscar, idofi);
  }

  @UseGuards(AuthGuard)
  @Get('/buscar/:buscar')
  buscarUsuarios(@Param('buscar') buscar: string) {
    return this.usersService.buscarUsuarios(buscar);
  }
  @UseGuards(AuthGuard)
  @Get('/buscarusuario/:buscar')
  buscarUsuariosNombres(@Param('buscar') buscar: string) {
    return this.usersService.buscarUsuariosNombres(buscar);
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
  @Patch('resetearpassworddefecto/:id')
  resetearPasswordDefecto(@Param('id') id: string) {
    return this.usersService.resetearPasswordDefecto(+id);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
