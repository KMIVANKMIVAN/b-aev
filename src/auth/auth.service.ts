import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';

import { UsersService } from '../users/users.service';

import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    /* const url = 'https://sitahu.aevivienda.gob.bo/ServicioWeb/verify/4760619';
    const authorizationToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF9rZXkiOjEsImluc3RpdHV0aW9uIjoiQWdlbmNpYS';
    const headers = {
      Authorization: `Bearer ${authorizationToken}`,
    };
    // Define los datos que deseas enviar en la solicitud POST, por ejemplo:
    const requestData = {
      // Agrega los datos que necesitas enviar aquí
    };
    const response = await this.httpService.axiosRef.post(url, requestData, {
      headers,
    });
    console.log('2222');
    console.log(response.data); */
    // Buscar al usuario por nombre de usuario
    const user = await this.usersService.findOneNameUser(username);
    const carnet = user.cedulaIdentidad;

    console.log('1111 ' + carnet);

    const secretKey = '2, 4, 6, 7, 9, 15, 20, 23, 25, 30'; // Tu clave secreta

    // Crear un objeto hash con el algoritmo SHA-256
    const sha256Hash = crypto.createHmac('sha256', secretKey);

    // Actualizar el hash con los datos que deseas encriptar
    sha256Hash.update(password);

    // Calcular el hash en formato hexadecimal
    const hashedData = sha256Hash.digest('hex');

    let verificar = null;

    if (hashedData === user.password) {
      verificar = true;
    }

    if (!verificar) {
      return {
        message: 'Contraseña Incorrecta',
      };
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
