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
    const user = await this.usersService.findOneNameUser(username);

    const secretKey = '2, 4, 6, 7, 9, 15, 20, 23, 25, 30';
    const sha256Hash = crypto.createHmac('sha256', secretKey);

    sha256Hash.update(password);

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

    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    const userResponse = {
      id: user.id,
      username: user.username,
      nivel: user.nivel,
      prioridad: user.prioridad,
    };

    return {
      access_token: accessToken,
      user: userResponse,
    };
  }
}
