import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsuariobusaModule } from '../usuariobusa/usuariobusa.module';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

import { AuthbusaService } from './authbusa.service';
import { AuthbusaController } from './authbusa.controller';

@Module({
  imports: [
    UsuariobusaModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthbusaController],
  providers: [AuthbusaService],
})
export class AuthbusaModule {}
