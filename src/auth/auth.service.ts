import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneNameUser(username);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordSha256 = await user.password;
    console.log('que es', passwordMatch);

    if (
      passwordSha256 ==
      '1f4c9e18b115afd92b5f7f44557064547a66f506a58e2584fc1f12de31262cef'
    ) {
      throw new UnauthorizedException(
        'usted debe cambiar su contrasena SHA256',
      );
    }
    if (!passwordMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    if (user.prioridad == 0) {
      throw new UnauthorizedException(
        'usted debe cambiar su contrasena 708090',
      );
    }

    // Comprueba si la contraseña almacenada tiene un prefijo que indique bcrypt
    /* if (user.password.startsWith('$2a$')) {
      // La contraseña está encriptada con bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }
    } else {
      // La contraseña está encriptada con otro método (por ejemplo, SHA-256)
      // Agrega aquí la lógica para verificar la contraseña con SHA-256
      // Si no se puede verificar, lanza una UnauthorizedException
      // (No se proporciona el código específico para SHA-256, ya que la implementación puede variar)
      return {
        message: 'usted debe cambiar su contrasena',
      };
    } */

    // Aquí puedes generar un JWT y devolverlo en lugar del objeto de usuario
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  /* async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneNameUser(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return  result;
  }*/
}
