import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuariobusaService } from '../usuariobusa/usuariobusa.service';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthbusaService {
  constructor(
    private usuariosService: UsuariobusaService,
    private jwtService: JwtService,
  ) {}

  async signIn(ci: string, contrasenia: string): Promise<any> {
    try {
      const user = await this.usuariosService.findOneByUserCi(ci);
      if (!user) {
        throw new BadRequestException({
          error: `El Usuario con CI ${ci} NO Existe`,
          message: `Usuario con CI ${ci} no fue encontrado`,
        });
      }
      const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);
      if (isMatch) {
        const payload = {
          sub: user.id,
          username: user.ci,
          camb_contra: user.se_cambiado_cntr,
          nivel: user.nivelbusa_id,
        };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new UnauthorizedException({
          statusCode: 401,
          error: `Se introdujo una contrasena Incorecta`,
          message: `Se introdujo una contrasena incorecta vuelva a intentarlo`,
        });
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      if (error instanceof BadRequestException) {
        throw error;
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
