import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import * as bcrypt from 'bcrypt'; // Importa el módulo bcrypt

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /* async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      ...createUserDto,
      habilitado: createUserDto.habilitado ? 1 : 0, // Convertir boolean a number
    });
    return await this.userRepository.save(newUser);
  } */
  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log('entro');

    try {
      // Genera un hash de la contraseña antes de almacenarla
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

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const newUser = this.userRepository.create({
        ...createUserDto,
        superior: parseInt(createUserDto.superior.toString()),
        idOficina: parseInt(createUserDto.idOficina.toString()),
        dependencia: parseInt(createUserDto.dependencia.toString()),
        lastLogin: 0,
        logins: 0,
        fechaCreacion: parseInt(getTodayDate()),
        habilitado: parseInt(createUserDto.habilitado.toString()),
        nivel: parseInt(createUserDto.nivel.toString()),
        prioridad: 0,
        idEntidad: parseInt(createUserDto.idEntidad.toString()),
        super: parseInt(createUserDto.super.toString()),
        mosca: iniciales,
        password: hashedPassword,
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      // Puedes personalizar la respuesta de error aquí si lo deseas
      throw new Error('No se pudo crear el usuario.');
    }
  }

  /* async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  } */
  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      // Puedes personalizar la respuesta de error aquí si lo deseas
      throw new Error('No se pudieron obtener los usuarios.');
    }
  }

  /* async findOne(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  } */
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

  /*   async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const { habilitado, ...rest } = updateUserDto;
    const updateData: Partial<User> = {
      ...rest,
      habilitado: habilitado ? 1 : 0,
    };
    await this.userRepository.update(id, updateData);
    return this.findOne(id);
  } */
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
      // Puedes personalizar la respuesta de error aquí si lo deseas
      throw new Error(
        `No se pudo actualizar el usuario. Usuario con ID ${id} no encontrado`,
      );
    }
  }
  /* async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    try {
      const { habilitado, password, ...rest } = updateUserDto;

      // Si se proporcionó una nueva contraseña, generamos un hash de la misma
      let hashedPassword: string | undefined = undefined;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updateData: Partial<User> = {
        ...rest,
        habilitado: habilitado ? 1 : 0,
      };

      // Si tenemos una contraseña hasheada, la incluimos en los datos de actualización
      if (hashedPassword) {
        updateData.password = hashedPassword;
      }

      await this.userRepository.update(id, updateData);
      return this.findOne(id);
    } catch (error) {
      // Puedes personalizar la respuesta de error aquí si lo deseas
      throw new Error(
        `No se pudo actualizar el usuario. Usuario con ID ${id} no encontrado`,
      );
    }
  } */
  /* async updatePassword(
    id: number,
    newPassword: string,
  ): Promise<User | undefined> {
    try {
      // Genera un hash de la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Crea un objeto de actualización con la nueva contraseña
      const updateData: Partial<User> = {
        password: hashedPassword,
        prioridad: 1,
      };

      // Actualiza la contraseña del usuario con ID específico
      await this.userRepository.update(id, updateData);

      // Devuelve el usuario actualizado (opcional)
      return this.findOne(id);
    } catch (error) {
      // Puedes personalizar la respuesta de error aquí si lo deseas
      throw new Error(
        `No se pudo actualizar la contraseña del usuario. Usuario con ID ${id} no encontrado`,
      );
    }
  } */
  async updatePassword(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    try {
      // Genera un hash de la nueva contraseña
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);

      const updateData: Partial<User> = {
        prioridad: 1, // Establece la prioridad en 1
        password: hashedPassword, // Actualiza la contraseña
      };

      // Actualiza el usuario con ID específico
      await this.userRepository.update(id, updateData);

      // Devuelve el usuario actualizado (opcional)
      return this.findOne(id);
    } catch (error) {
      // Puedes personalizar la respuesta de error aquí si lo deseas
      throw new Error(
        `No se pudo actualizar el usuario. Usuario con ID ${id} no encontrado`,
      );
    }
  }
  async resetPassword(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    try {
      // Genera un hash de la nueva contraseña
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);

      const updateData: Partial<User> = {
        prioridad: 0, // Establece la prioridad en 1
        password: hashedPassword, // Actualiza la contraseña
      };

      // Actualiza el usuario con ID específico
      await this.userRepository.update(id, updateData);

      // Devuelve el usuario actualizado (opcional)
      return this.findOne(id);
    } catch (error) {
      // Puedes personalizar la respuesta de error aquí si lo deseas
      throw new Error(
        `No se pudo actualizar el usuario. Usuario con ID ${id} no encontrado`,
      );
    }
  }

  /* async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  } */
  async remove(id: number): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      // Puedes personalizar la respuesta de error aquí si lo deseas
      throw new Error(
        `No se pudo eliminar el usuario. Usuario con ID ${id} no encontrado`,
      );
    }
  }

  /* create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    // retornaremos en formato JSON
    return {
      mensaje: 'accion de crear',
      cuerpo: createUserDto,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return {
      id,
      updateUserDto,
    };
  }

  remove(id: number) {
    return {
      id,
    };
  } */

  //funciones
}
