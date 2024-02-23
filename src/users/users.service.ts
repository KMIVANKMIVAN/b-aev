import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) { }

  async create(nivel: number, createUserDto: CreateUserDto): Promise<User> {
    try {
      if (nivel != 1) {
        throw new UnauthorizedException({
          statusCode: 401,
          error: `El Usuario ${createUserDto.username} no Puede ser Creado, USTED NO ES UN ADMINISTRADOR`,
          message: `El Usuario ${createUserDto.username} no Puede ser Creado, USTED NO ESTA AUTORIZADO`,
        });
      }
      const userExists = await this.userRepository.findOne({
        where: { username: createUserDto.username },
      });
      if (userExists) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Usuario con nombre ${createUserDto.username} YA EXISTE`,
          message: `El Usuario con nombre ${createUserDto.username} YA FUE REGISTRADO`,
        });
      }
      const userCorreoExists = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (userCorreoExists) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Usuario con correo ${createUserDto.email} YA EXISTE`,
          message: `El Usuario con correo ${createUserDto.email} YA FUE REGISTRADO`,
        });
      }
      const userCedulaIdentidadExists = await this.userRepository.findOne({
        where: { cedulaIdentidad: createUserDto.cedulaIdentidad },
      });
      if (userCedulaIdentidadExists) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Usuario con carnet ${createUserDto.cedulaIdentidad} YA EXISTE`,
          message: `El Usuario con carnet ${createUserDto.cedulaIdentidad} YA FUE REGISTRADO`,
        });
      }
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
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (create): ${error}`,
          message: `Error del Servidor en (create): ${error}`,
        });
      }
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      if (users.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron users.`,
          message: `No se encontraron users.`,
        });
      }
      return users;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAll): ${error}`,
          message: `Error del Servidor en (findAll): ${error}`,
        });
      }
    }
  }

  async findOne2(id: number): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Usuario con ID ${id} NO Existe`,
          message: `Usuario con ID ${id} no fue encontrado`,
        });
      }
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOne2): ${error}`,
          message: `Error del Servidor en (findOne2): ${error}`,
        });
      }
    }
  }
  async findOneNameUser(username: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { username } });

      if (!user) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Usuario ${username} NO Existe`,
          message: `Usuario con nombre de usuario ${username} no fue encontrado`,
        });
      }
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (updatePassword): ${error}`,
          message: `Error del Servidor en (updatePassword): ${error}`,
        });
      }
    }
  }
  async buscarUsuarios(buscar: string): Promise<User[]> {
    try {
      const sql = `
        SELECT * FROM (
          SELECT * FROM users
          WHERE username LIKE '%${buscar}%' OR cedula_identidad LIKE '%${buscar}%'
          ) AS resultados
          LIMIT 5;
      `;
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Usuario ${buscar} NO Existe`,
          message: `Usuario ${buscar} no fue encontrado`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (buscarUsuarios) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (buscarUsuarios) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (buscarUsuarios): ${error}`,
          message: `Error del Servidor en (buscarUsuarios): ${error}`,
        });
      }
    }
  }
  async buscarUsuariosNombres(buscar: string): Promise<User[]> {
    try {
      const sql = `
        SELECT * FROM (
          SELECT * FROM users
          WHERE nombre LIKE '%${buscar}%' OR cedula_identidad LIKE '%${buscar}%'
          ) AS resultados
          LIMIT 5;
      `;
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Usuario ${buscar} NO Existe`,
          message: `Usuario ${buscar} no fue encontrado`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (buscarUsuarios) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (buscarUsuarios) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (buscarUsuarios): ${error}`,
          message: `Error del Servidor en (buscarUsuarios): ${error}`,
        });
      }
    }
  }
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    try {
      const userExists = await this.findOne2(id);

      const { ...rest } = updateUserDto;
      const updateData: Partial<User> = {
        ...rest,
      };
      const updateResult = await this.userRepository.update(id, updateData);
      if (updateResult.affected === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Usuario con ID ${id} NO se actualizo correctamente`,
          message: `Usuario con ID ${id} no se actualizo correctamente`,
        });
      }
      return this.findOne2(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (update) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (update) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (update): ${error}`,
          message: `Error del Servidor en (update): ${error}`,
        });
      }
    }
  }
  async updatePassword(
    id: number,
    antiguop: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    try {
      const user = await this.findOne2(id);
      const secretKey = '2, 4, 6, 7, 9, 15, 20, 23, 25, 30';

      const sha256Hash = crypto.createHmac('sha256', secretKey);

      sha256Hash.update(antiguop);

      const anti = sha256Hash.digest('hex');

      if (anti === user.password) {
        const sha256HashNew = crypto.createHmac('sha256', secretKey);

        sha256HashNew.update(updateUserDto.password);
        const newPassword = sha256HashNew.digest('hex');

        const updateData: Partial<User> = {
          prioridad: 1,
          password: newPassword,
        };

        const updateResult = await this.userRepository.update(id, updateData);
        if (updateResult.affected === 0) {
          throw new BadRequestException({
            statusCode: 400,
            error: `El Usuario con ID ${id} NO se actualizo su contraseña correctamente`,
            message: `Usuario con ID ${id} no se actualizo su contraseña correctamente`,
          });
        }
        return this.findOne2(id);
      } else {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudo actualizar el usuario. Usuario con ID ${id} su contrasena anterior no coincide`,
          message: `No se pudo actualizar el usuario. Usuario con ID ${id} su contrasena anterior no coincide`,
        });
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (updatePassword): ${error}`,
          message: `Error del Servidor en (updatePassword): ${error}`,
        });
      }
    }
  }
  async resetPassword(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    try {
      const userExists = await this.findOne2(id);

      const secretKey = '2, 4, 6, 7, 9, 15, 20, 23, 25, 30';

      const sha256Hash = crypto.createHmac('sha256', secretKey);

      sha256Hash.update(updateUserDto.password);

      const hashedData = sha256Hash.digest('hex');

      const updateData: Partial<User> = {
        prioridad: 0,
        password: hashedData,
      };

      const updateResult = await this.userRepository.update(id, updateData);
      if (updateResult.affected === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Usuario con ID ${id} NO se actualizo su contraseña correctamente`,
          message: `Usuario con ID ${id} no se actualizo su contraseña correctamente`,
        });
      }
      return this.findOne2(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (resetPassword): ${error}`,
          message: `Error del Servidor en (resetPassword): ${error}`,
        });
      }
    }
  }
  async resetearPasswordDefecto(id: number): Promise<User | undefined> {
    try {
      const userExists = await this.findOne2(id);

      const secretKey = '2, 4, 6, 7, 9, 15, 20, 23, 25, 30';
      const defaultPassword = '708090';

      const sha256Hash = crypto.createHmac('sha256', secretKey);
      sha256Hash.update(defaultPassword);
      const hashedData = sha256Hash.digest('hex');

      const updateData: Partial<User> = {
        prioridad: 0,
        password: hashedData,
      };
      const updateResult = await this.userRepository.update(id, updateData);
      if (updateResult.affected === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Usuario con ID ${id} NO se actualizo su contraseña correctamente`,
          message: `Usuario con ID ${id} no se actualizo su contraseña correctamente`,
        });
      }
      return this.findOne2(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (resetearPasswordDefecto): ${error}`,
          message: `Error del Servidor en (resetearPasswordDefecto): ${error}`,
        });
      }
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
