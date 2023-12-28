import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import * as crypto from 'crypto';

import { RolesUsersService } from '../roles_users/roles_users.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesUsersService: RolesUsersService,
    private connection: Connection,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      console.log(createUserDto.expedido);

      const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
      };

      const obtenerIniciales = (nombreCompleto) => {
        const palabras = nombreCompleto.split(' ');
        let iniciales = '';

        for (const palabra of palabras) {
          iniciales += palabra[0].toUpperCase();
        }

        return iniciales;
      };

      const iniciales = obtenerIniciales(createUserDto.nombre);

      const secretKey = '2, 4, 6, 7, 9, 15, 20, 23, 25, 30';

      const sha256Hash = crypto.createHmac('sha256', secretKey);

      sha256Hash.update(createUserDto.password);

      const hashedData = sha256Hash.digest('hex');

      const newUser = this.userRepository.create({
        ...createUserDto,
        superior: createUserDto.superior,
        idOficina: createUserDto.idOficina,
        dependencia: createUserDto.dependencia,
        lastLogin: 0,
        logins: 0,
        fechaCreacion: parseInt(getTodayDate()),
        habilitado: createUserDto.habilitado,
        nivel: createUserDto.nivel,
        prioridad: 0,
        idEntidad: createUserDto.idEntidad,
        super: createUserDto.super,
        mosca: iniciales,
        password: hashedData,
      });

      const savedUser = await this.userRepository.save(newUser);

      const createRolesUserDto = {
        user_id: savedUser.id,
        role_id: 1,
      };
      await this.rolesUsersService.create(createRolesUserDto);

      return savedUser;

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error('No se pudo crear el usuario.');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error('No se pudieron obtener los usuarios.');
    }
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }
  async findOneNameUser(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(
        `Usuario con nombre de usuario ${username} no encontrado`,
      );
    }

    return user;
  }
  async buscarUsuarios(buscar: string): Promise<User[]> {
    try {
      const sql = `
        SELECT * FROM (
          SELECT * FROM users
          WHERE username LIKE '%${buscar}%' OR cedula_identidad LIKE '%${buscar}%'
          ) AS resultados
          LIMIT 10;
      `;

      const result = await this.connection.query(sql);
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('No se pudieron obtener los usuarios.');
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    try {
      const { ...rest } = updateUserDto;

      const updateData: Partial<User> = {
        ...rest,
      };

      await this.userRepository.update(id, updateData);
      return this.findOne(id);
    } catch (error) {
      throw new Error(
        `No se pudo actualizar el usuario. Usuario con ID ${id} no encontrado`,
      );
    }
  }
  async updatePassword(
    id: number,
    antiguop: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    try {
      const user = await this.findOne(id);
      const secretKey = '2, 4, 6, 7, 9, 15, 20, 23, 25, 30';

      const sha256Hash = crypto.createHmac('sha256', secretKey);

      sha256Hash.update(antiguop);

      const anti = sha256Hash.digest('hex');

      if (anti === user.password) {
        console.log('si es la antigua');
        const sha256HashNew = crypto.createHmac('sha256', secretKey);

        sha256HashNew.update(updateUserDto.password);
        const newPassword = sha256HashNew.digest('hex');

        const updateData: Partial<User> = {
          prioridad: 1,
          password: newPassword,
        };

        await this.userRepository.update(id, updateData);

        return this.findOne(id);
      } else {
        throw new Error(
          `No se pudo actualizar el usuario. Usuario con ID ${id} su contrasena anterior no coincide`,
        );
      }
    } catch (error) {
      throw error;
    }
  }
  async resetPassword(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    try {
      const secretKey = '2, 4, 6, 7, 9, 15, 20, 23, 25, 30';

      const sha256Hash = crypto.createHmac('sha256', secretKey);

      sha256Hash.update(updateUserDto.password);

      const hashedData = sha256Hash.digest('hex');

      const updateData: Partial<User> = {
        prioridad: 0,
        password: hashedData,
      };

      await this.userRepository.update(id, updateData);

      return this.findOne(id);
    } catch (error) {
      throw new Error(
        `No se pudo actualizar el usuario. Usuario con ID ${id} no encontrado`,
      );
    }
  }
  async resetearPasswordDefecto(id: number): Promise<User | undefined> {
    try {
      const secretKey = '2, 4, 6, 7, 9, 15, 20, 23, 25, 30';
      const defaultPassword = '708090'; // Contraseña por defecto a establecer

      const sha256Hash = crypto.createHmac('sha256', secretKey);
      sha256Hash.update(defaultPassword);
      const hashedData = sha256Hash.digest('hex');

      const updateData: Partial<User> = {
        prioridad: 0,
        password: hashedData,
      };

      await this.userRepository.update(id, updateData);
      return this.findOne(id);
    } catch (error) {
      throw new Error(
        `No se pudo actualizar el usuario. Usuario con ID ${id} no encontrado`,
      );
    }
  }
  async remove(id: number): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      throw new Error(
        `No se pudo eliminar el usuario. Usuario con ID ${id} no encontrado`,
      );
    }
  }
}
