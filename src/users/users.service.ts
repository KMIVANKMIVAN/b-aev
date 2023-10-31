import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

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
    private readonly rolesUsersService: RolesUsersService, // Inyecta el servicio de roles_users
  ) {}

  /* async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      ...createUserDto,
      habilitado: createUserDto.habilitado ? 1 : 0, // Convertir boolean a number
    });
    return await this.userRepository.save(newUser);
  } */
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

      const secretKey = '2, 4, 6, 7, 9, 15, 20, 23, 25, 30'; // Tu clave secreta

      // Crear un objeto hash con el algoritmo SHA-256
      const sha256Hash = crypto.createHmac('sha256', secretKey);

      // Actualizar el hash con los datos que deseas encriptar
      sha256Hash.update(createUserDto.password);

      // Calcular el hash en formato hexadecimal
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

      // Guardar el nuevo usuario en la base de datos
      const savedUser = await this.userRepository.save(newUser);

      // Llama al servicio de roles_users para crear un nuevo registro
      // Pasando el user_id del usuario recién creado y el role_id adecuado
      const createRolesUserDto = {
        user_id: savedUser.id,
        role_id: 1, // Reemplaza 1 por el role_id correcto
      };
      await this.rolesUsersService.create(createRolesUserDto);

      return savedUser;

      return await this.userRepository.save(newUser);
    } catch (error) {
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
    antiguop: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    try {
      const user = await this.findOne(id);
      const secretKey = '2, 4, 6, 7, 9, 15, 20, 23, 25, 30'; // Tu clave secreta

      // Crear un objeto hash con el algoritmo SHA-256
      const sha256Hash = crypto.createHmac('sha256', secretKey);

      // Actualizar el hash con los datos que deseas encriptar
      sha256Hash.update(antiguop);

      // Calcular el hash en formato hexadecimal
      const anti = sha256Hash.digest('hex');

      if (anti === user.password) {
        console.log('si es la antigua');
        const sha256HashNew = crypto.createHmac('sha256', secretKey);

        // Actualizar el hash con los datos que deseas encriptar
        sha256HashNew.update(updateUserDto.password);
        const newPassword = sha256HashNew.digest('hex');

        const updateData: Partial<User> = {
          prioridad: 1, // Establece la prioridad en 1
          password: newPassword, // Actualiza la contraseña
        };

        // Actualiza el usuario con ID específico
        await this.userRepository.update(id, updateData);

        // Devuelve el usuario actualizado (opcional)
        return this.findOne(id);
      } else {
        throw new Error(
          `No se pudo actualizar el usuario. Usuario con ID ${id} su contrasena anterior no coincide`,
        );
      }
    } catch (error) {
      // Puedes personalizar la respuesta de error aquí si lo deseas
      throw error;
    }
  }
  async resetPassword(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    try {
      // Genera un hash de la nueva contraseña
      const secretKey = '2, 4, 6, 7, 9, 15, 20, 23, 25, 30'; // Tu clave secreta

      // Crear un objeto hash con el algoritmo SHA-256
      const sha256Hash = crypto.createHmac('sha256', secretKey);

      // Actualizar el hash con los datos que deseas encriptar
      sha256Hash.update(updateUserDto.password);

      // Calcular el hash en formato hexadecimal
      const hashedData = sha256Hash.digest('hex');

      const updateData: Partial<User> = {
        prioridad: 0, // Establece la prioridad en 1
        password: hashedData, // Actualiza la contraseña
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
