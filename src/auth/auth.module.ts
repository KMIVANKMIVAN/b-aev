import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';

// import { HttpService } from '@nestjs/axios';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  // para que sea gloval
  /* providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ], */
  exports: [AuthService],
})
export class AuthModule {}
