import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { RolesUsersModule } from './roles_users/roles_users.module';

import { User } from './users/entities/user.entity';
import { RolesUser } from './roles_users/entities/roles_user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    RolesUsersModule,
    AuthModule,
    /* TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'aev',
      entities: [User, RolesUser], // Agrega aquí tus entidades
      synchronize: true, // Sincronizar automáticamente las estructuras de la base de datos (solo en desarrollo)
    }), */
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '10.10.1.9',
      port: 3306,
      username: 'root',
      password: '43vivienda',
      database: 'sipago',
      entities: [User, RolesUser], // Agrega aquí tus entidades
      synchronize: true, // Sincronizar automáticamente las estructuras de la base de datos (solo en desarrollo)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
