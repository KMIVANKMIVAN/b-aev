import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

import * as crypto from 'crypto';

import { ConsultasExternasService } from "../consultas-externas/consultas-externas.service";

import { Repository } from 'typeorm';
import { FirmadorusuarioService } from 'src/firmadorusuario/firmadorusuario.service';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private consultasExternasService: ConsultasExternasService,
    private firmadorusuarioService: FirmadorusuarioService,
  ) { }

  async signIn(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findOneNameUser(username);
      /* const sitahu = await this.consultasExternasService.enviarSITAHU(user.cedulaIdentidad.toString());

      if (sitahu.register === null) {
        throw new BadRequestException({
          statusCode: 401,
          error: `Usuario ${username} NO ESTA HABILITADO al sistema`,
          message: `Usuario ${username} NO ESTA HABILITADO al sistema`,
        });
      } */

      if (user.habilitado === 0) {
        throw new BadRequestException({
          statusCode: 401,
          error: `Usuario ${username} NO ESTA HABILITADO`,
          message: `Usuario ${username} NO ESTA HABILITADO`,
        });
      }

      const secretKey = '2, 4, 6, 7, 9, 15, 20, 23, 25, 30';
      const sha256Hash = crypto.createHmac('sha256', secretKey);

      sha256Hash.update(password);

      const hashedData = sha256Hash.digest('hex');

      if (hashedData !== user.password) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Contraseña del Usuario ${username} NO ES CORRECTA`,
          message: `Usuario con nombre de usuario ${username} no ingresó la contraseña correcta`,
        });
      }

      const payload = { sub: user.id, username: user.username };
      const accessToken = await this.jwtService.signAsync(payload);

      /* const userResponse = {
        id: user.id,
        username: user.username,
        nivel: user.nivel,
        prioridad: user.prioridad,
        id_oficina: user.idOficina,
        // departamento: user.departamento,
      }; */

      const userResponse: {
        id: number;
        username: string;
        nivel: number;
        prioridad: number;
        id_oficina: number;
        firmador?: number; // Agrega firmador como una propiedad opcional
      } = {
        id: user.id,
        username: user.username,
        nivel: user.nivel,
        prioridad: user.prioridad,
        id_oficina: user.idOficina,
      };

      const firmadorUsuario = await this.firmadorusuarioService.mostrarPorUsuarios(user.id);
      if (firmadorUsuario) {
        // Agregar firmador al objeto userResponse
        userResponse.firmador = firmadorUsuario[0].firmador;
        console.log("646464",firmadorUsuario[0].firmador);
        
      }

      console.log("87878787",firmadorUsuario);
      

      return {
        access_token: accessToken,
        user: userResponse,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (signIn) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (signIn) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (signIn): ${error}`,
          message: `Error del Servidor en (signIn): ${error}`,
        });
      }
    }
  }
}
