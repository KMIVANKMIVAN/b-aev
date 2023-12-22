import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProyectosexcelService } from './proyectosexcel.service';
import { CreateProyectosexcelDto } from './dto/create-proyectosexcel.dto';
import { UpdateProyectosexcelDto } from './dto/update-proyectosexcel.dto';

@Controller('proyectosexcel')
export class ProyectosexcelController {
  constructor(private readonly proyectosexcelService: ProyectosexcelService) {}

  @Get('test-connection')
  async testDatabaseConnection() {
    try {
      await this.proyectosexcelService.testDatabaseConnection();
      return { message: 'Database connection successful' };
    } catch (error) {
      return { message: 'Error connecting to the database', error };
    }
  }
  /* @Post()
  create(@Body() createProyectosexcelDto: CreateProyectosexcelDto) {
    return this.proyectosexcelService.create(createProyectosexcelDto);
  } */

  @Get()
  findAll() {
    return this.proyectosexcelService.findAll();
  }

  /* @Get(':id')
  findOne(@Param('id') id: number) {
    return this.proyectosexcelService.findOne(+id);
  } */

  /* @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProyectosexcelDto: UpdateProyectosexcelDto,
  ) {
    return this.proyectosexcelService.update(+id, updateProyectosexcelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.proyectosexcelService.remove(+id);
  } */
}
