import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';

import { HttpModule } from '@nestjs/axios';

import { ConsultasExternasModule } from "../consultas-externas/consultas-externas.module";
import { FirmadorusuarioModule } from 'src/firmadorusuario/firmadorusuario.module';



@Module({
  imports: [
    HttpModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' },
    }),
    ConsultasExternasModule, FirmadorusuarioModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }
