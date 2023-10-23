import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    // Buscar al usuario por nombre de usuario
    const user = await this.usersService.findOneNameUser(username);

    // Si el usuario no se encuentra, lanzar una UnauthorizedException
    // if (!user) {
    //   return {
    //     error: 'Usuario No Encontrado',
    //   };
    // }
    const secretKey = '2, 4, 6, 7, 9, 15, 20, 23, 25, 30'; // Tu clave secreta

    // Crear un objeto hash con el algoritmo SHA-256
    const sha256Hash = crypto.createHmac('sha256', secretKey);

    // Actualizar el hash con los datos que deseas encriptar
    sha256Hash.update(password);

    // Calcular el hash en formato hexadecimal
    const hashedData = sha256Hash.digest('hex');

    console.log('111 ' + user.password);
    console.log('222 ' + hashedData);

    let verificar = null;

    if (hashedData === user.password) {
      verificar = true;
    }

    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // Si la contraseña no coincide, devolver un objeto de respuesta con un mensaje de error
    if (!verificar) {
      return {
        message: 'Contraseña Incorrecta',
      };
      /* const payload = { sub: user.id, username: user.username };
      const accessToken = await this.jwtService.signAsync(payload);

      // Crear un objeto de respuesta sin la contraseña
      const userResponse = {
        id: user.id,
      };
      return {
        error: 'Contraseña incorrecta',
        access_token: accessToken,
        user: userResponse,
      }; */
    }

    // Generar un JWT y devolverlo junto con datos del usuario
    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    // Crear un objeto de respuesta sin la contraseña
    const userResponse = {
      id: user.id,
      username: user.username,
      nivel: user.nivel,
      prioridad: user.prioridad,
      // Otras propiedades del usuario que desees incluir
    };

    return {
      access_token: accessToken,
      user: userResponse, // Datos del usuario sin la contraseña
    };
  }
}
