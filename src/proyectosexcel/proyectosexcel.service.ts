import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateProyectosexcelDto } from './dto/create-proyectosexcel.dto';
import { UpdateProyectosexcelDto } from './dto/update-proyectosexcel.dto';
import { Connection } from 'typeorm';

import { Proyectosexcel } from './entities/proyectosexcel.entity';

@Injectable()
export class ProyectosexcelService {
  constructor(
    @InjectRepository(Proyectosexcel)
    private readonly proyectosexcelRepository: Repository<Proyectosexcel>,
    private connection: Connection,
  ) {}

  async testDatabaseConnection(): Promise<void> {
    try {
      const result = await this.proyectosexcelRepository.query('SELECT 1');
      console.log('Database connection successful:', result);
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw new Error('Database connection error');
    }
  }

  /* async create(createProyectosexcelDto: CreateProyectosexcelDto) {
    // Aquí se debería utilizar el repositorio para crear un nuevo elemento en la base de datos
    const newProyecto = await this.proyectosexcelRepository.create(
      createProyectosexcelDto,
    );
    await this.proyectosexcelRepository.save(newProyecto);
    return newProyecto;
  } */

  async findAll(): Promise<Proyectosexcel[]> {
    try {
      const sql = 'SELECT * FROM cuadro.proyectosexcel LIMIT 5';
      const result = await this.connection.query(sql);
      return result;
    } catch (error) {
      console.error('Error while fetching data:', error);
      throw new Error('Unable to fetch proyectosexcel data');
    }
  }

  /* async findOne(id: number) {
    // Utilizando el repositorio, se busca un elemento por su ID en la base de datos
    const proyecto = await this.proyectosexcelRepository.findOne(id);
    if (!proyecto) {
      throw new NotFoundException(`Proyectosexcel with ID ${id} not found`);
    }
    return proyecto;
  } */

  /* async update(id: number, updateProyectosexcelDto: UpdateProyectosexcelDto) {
    // Aquí se debería utilizar el repositorio para actualizar el elemento en la base de datos
    await this.proyectosexcelRepository.update(id, updateProyectosexcelDto);
    const updatedProyecto = await this.proyectosexcelRepository.findOne(id);
    if (!updatedProyecto) {
      throw new NotFoundException(`Proyectosexcel with ID ${id} not found`);
    }
    return updatedProyecto;
  }

  async remove(id: number) {
    // Aquí se debería utilizar el repositorio para eliminar el elemento de la base de datos
    const proyectoToRemove = await this.proyectosexcelRepository.findOne(id);
    if (!proyectoToRemove) {
      throw new NotFoundException(`Proyectosexcel with ID ${id} not found`);
    }
    await this.proyectosexcelRepository.remove(proyectoToRemove);
    return `Proyectosexcel with ID ${id} has been removed`;
  } */
}
