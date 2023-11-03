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
    private httpService: HttpService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    /* const url = 'https://sitahu.aevivienda.gob.bo/ServicioWeb/vigente/4760619';
    const authorizationToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF9kZXZpY2VpbmciOjEsImluc3RpdHV0aW9uIjoiQWdlbmNpYSBFc3RhdGFsIGRlIFZpdmllbmRhIiwic3lzdGVtIjoiVmlcdTAwZTF0aWNvcyIsImRhdGFjcmVhdGVkIjoxNjY4MTg1OTI2LCJkYXRlZmluaXNoZWQiOjAsIkFQSV9USU1FIjoxNjY4MTg1OTI2fQ.iMvwfyzUolxC_fpRjY606ZHNkWU0WlX4jyykCgv-Xus';
 */
    /* const response = this.httpService.get(url, {
      headers: {
        Authorization: authorizationToken,
      },
    }); */
    /* const response = this.httpService.get(url, {
      headers: {
        Authorization: authorizationToken,
      },
    });
    console.log('222 ', response); */

    console.log(
      this.httpService.get('https://pokeapi.co/api/v2/pokemon/ditto'),
    );

    /* const config = {
      headers: {
        Authorization: authorizationToken,
      },
    };

    const response = await axios.get(url, config);
    // return response.data; */

    /* const response = await this.httpService
      .get(url, {
        headers: {
          Authorization: authorizationToken,
        },
      })
      .toPromise(); */

    // console.log(response.data);

    /* try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.status !== 200) {
        throw new Error('Error al realizar la solicitud');
      }

      // Procesar la respuesta si es necesario
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(
          `Error en la solicitud HTTP: ${response.status} - ${response.statusText}`,
        );
        
        // Resto del código para procesar la respuesta...
      } catch (error) {
      console.error('Error al realizar la solicitud HTTP:', error);
      return {
        message: 'Error en la solicitud HTTP',
      };
    }
  } */
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
