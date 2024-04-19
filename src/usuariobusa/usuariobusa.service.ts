import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUsuariobusaDto } from './dto/create-usuariobusa.dto';
import { UpdateUsuariobusaDto } from './dto/update-usuariobusa.dto';
import { Usuariobusa } from './entities/usuariobusa.entity';

@Injectable()
export class UsuariobusaService {
  constructor(
    @InjectRepository(Usuariobusa)
    private readonly usuariobusaRepository: Repository<Usuariobusa>,
  ) { }

  async create(createUsuarioDto: CreateUsuariobusaDto): Promise<Usuariobusa> {
    try {
      /* const { roles, sucursal_id, ...userData } = createUsuarioDto; // Extrae los roles y sucursal_id del DTO

      // Comprueba si los roles proporcionados existen en la base de datos
      const rolesExistente = await this.roleRepository.findByIds(roles);
      if (rolesExistente.length !== roles.length) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Uno o más roles proporcionados no existen`,
          message: `Uno o más roles proporcionados  no fueron encontrados`,
        });
      }

      // Verifica si la sucursal proporcionada existe en la base de datos
      const sucursalExistente = await this.sucursaleRepository.findOne({
        where: { id: sucursal_id },
      });

      if (!sucursalExistente) {
        throw new BadRequestException({
          statusCode: 400,
          error: `La sucursal proporcionada no existen`,
          message: `La sucursal proporcionada no fueron encontrados`,
        });
      } */
      const userData = createUsuarioDto; // Extrae los roles y sucursal_id del DTO

      // Hashea la contraseña antes de crear el usuario
      const hashedPassword = await bcrypt.hash(userData.contrasenia, 10);

      // Crea un nuevo usuario con los datos del DTO y los roles obtenidos
      const usuario = this.usuariobusaRepository.create({
        ...userData,
        contrasenia: hashedPassword,
      });

      // return this.usuariobusaRepository.save(usuario);
      delete usuario.contrasenia; // Eliminar el campo de contraseña del usuario

      return this.usuariobusaRepository.save(usuario);
    } catch (error) {
      if (error instanceof BadRequestException) {
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

  async findAll(): Promise<Usuariobusa[]> {
    try {
      const users = await this.usuariobusaRepository.find();
      if (!users || users.length === 0) {
        throw new BadRequestException({
          error: `No se encontraron usuarios`,
          message: `No hay usuarios en la base de datos`,
        });
      }
      // return users;
      users.forEach((user) => delete user.contrasenia);
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
  async findMenosAdmin(): Promise<Usuariobusa[]> {
    try {
      const users = await this.usuariobusaRepository.find({ where: { nivelbusa_id: 3 } });
      if (!users || users.length === 0) {
        throw new BadRequestException({
          error: `No se encontraron usuarios`,
          message: `No hay usuarios en la base de datos`,
        });
      }
      // return users;
      users.forEach((user) => delete user.contrasenia);
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

  async findOne(id: number): Promise<Usuariobusa | undefined> {
    try {
      const user = await this.usuariobusaRepository.findOne({ where: { id } });
      if (!user) {
        throw new BadRequestException({
          error: `El Usuariobusa con ID ${id} NO Existe`,
          message: `Usuariobusa con ID ${id} no fue encontrado`,
        });
      }
      // return user;
      delete user.contrasenia; // Eliminar el campo de contraseña del usuario
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOne): ${error}`,
          message: `Error del Servidor en (findOne): ${error}`,
        });
      }
    }
  }

  async findOnePw(id: number): Promise<Usuariobusa | undefined> {
    try {
      const user = await this.usuariobusaRepository.findOne({ where: { id } });
      if (!user) {
        throw new BadRequestException({
          error: `El Usuariobusa con ID ${id} NO Existe`,
          message: `Usuariobusa con ID ${id} no fue encontrado`,
        });
      }
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOne): ${error}`,
          message: `Error del Servidor en (findOne): ${error}`,
        });
      }
    }
  }

  async findOneCi(ci: string): Promise<Usuariobusa[] | undefined> {
    try {
      const users = await this.usuariobusaRepository
        .createQueryBuilder('usuarios')
        .where('usuarios.ci ILIKE :ci', { ci: `%${ci}%` }) // Corrección aquí
        .take(5)
        .getMany();
      if (!users || users.length === 0) {
        // Corrección aquí
        throw new BadRequestException({
          error: `El Usuariobusa con dato ${ci} NO Existe`,
          message: `Usuariobusa con dato ${ci} no fue encontrado`,
        });
      }
      // return users;
      // Iterar sobre cada usuario y eliminar el campo de contraseña
      users.forEach((user) => delete user.contrasenia);

      return users;
    } catch (error) {
      if (error instanceof BadRequestException) {
        // Corrección aquí
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOneCi): ${error}`,
          message: `Error del Servidor en (findOneCi): ${error}`,
        });
      }
    }
  }

  async findOneByUserCi(ci: string): Promise<Usuariobusa> {
    try {
      const user = await this.usuariobusaRepository.findOne({ where: { ci } });
      if (!user) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Usuariobusa con CI ${ci} NO Existe`,
          message: `Usuariobusa con CI ${ci} no fue encontrada`,
        });
      }
      // return user;
      // delete user.contrasenia; // Eliminar el campo de contraseña del usuario
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOneByUserCi): ${error}`,
          message: `Error del Servidor en (findOneByUserCi): ${error}`,
        });
      }
    }
  }

  async update(
    id: number,
    updateUsuariobusaDto: UpdateUsuariobusaDto,
  ): Promise<Usuariobusa> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Usuariobusa con ID ${id} NO Existe`,
          message: `Usuariobusa con ID ${id} no fue encontrada`,
        });
      }
      const userUpdated = Object.assign(user, updateUsuariobusaDto);
      // return await this.usuariobusaRepository.save(userUpdated);
      delete userUpdated.contrasenia; // Eliminar el campo de contraseña del usuario actualizado

      return await this.usuariobusaRepository.save(userUpdated);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (update): ${error}`,
          message: `Error del Servidor en (update): ${error}`,
        });
      }
    }
  }

  async updateContrasenia(
    id: number,
    contraseniaAntigua: string,
    updateUsuariobusaDto: UpdateUsuariobusaDto,
  ): Promise<Partial<Usuariobusa>> {
    try {
      const user = await this.findOnePw(id);
      if (!user) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Usuariobusa con ID ${id} NO Existe`,
          message: `Usuariobusa con ID ${id} no fue encontrada`,
        });
      }

      // Verificar si la contraseña anterior coincide
      const contraseniaCorrecta = await bcrypt.compare(
        contraseniaAntigua,
        user.contrasenia,
      );

      if (!contraseniaCorrecta) {
        throw new BadRequestException({
          statusCode: 400,
          error: 'La contraseña anterior no es correcta',
          message: 'La contraseña anterior no es correcta',
        });
      }

      // Verificar si la nueva contraseña está presente
      if (!updateUsuariobusaDto.contrasenia) {
        throw new BadRequestException({
          statusCode: 400,
          error: 'La nueva contraseña no puede estar vacía',
          message: 'La nueva contraseña no puede estar vacía',
        });
      }

      // Hashea la nueva contraseña antes de actualizarla
      const hashedPassword = await bcrypt.hash(
        updateUsuariobusaDto.contrasenia,
        10,
      );
      // Actualiza la contraseña del usuario en la base de datos
      user.contrasenia = hashedPassword;

      // Guarda los cambios
      const updatedUser = await this.usuariobusaRepository.save(user);

      // Elimina el campo de contraseña del objeto updatedUser
      delete updatedUser.contrasenia;

      return updatedUser; // Devuelve todos los datos excepto la contraseña
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (updateContrasenia): ${error}`,
          message: `Error del Servidor en (updateContrasenia): ${error}`,
        });
      }
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Usuariobusa con ID ${id} NO Existe`,
          message: `Usuariobusa con ID ${id} no fue encontrada`,
        });
      }
      await this.usuariobusaRepository.delete(id);
      return { success: true, message: `Se eliminó el usuario con ID: ${id}` };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (remove): ${error}`,
          message: `Error del Servidor en (remove): ${error}`,
        });
      }
    }
  }
}
