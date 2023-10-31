import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { RolesUsersModule } from './roles_users/roles_users.module';
import { AuthModule } from './auth/auth.module';
import { ContratosigeproModule } from './contratosigepro/contratosigepro.module';
import { DatoscontratoModule } from './datoscontrato/datoscontrato.module';
import { PlanillasporcontratoModule } from './planillasporcontrato/planillasporcontrato.module';
import { PlanillascierresaldoModule } from './planillascierresaldo/planillascierresaldo.module';
import { PlanillasigeproModule } from './planillasigepro/planillasigepro.module';
import { DocumentpdfModule } from './documentpdf/documentpdf.module';

import { User } from './users/entities/user.entity';
import { RolesUser } from './roles_users/entities/roles_user.entity';
import { Contratosigepro } from './contratosigepro/entities/contratosigepro.entity';
import { Datoscontrato } from './datoscontrato/entities/datoscontrato.entity';
import { Planillasporcontrato } from './planillasporcontrato/entities/planillasporcontrato.entity';
import { Planillasigepro } from './planillasigepro/entities/planillasigepro.entity';
import { Planillascierresaldo } from './planillascierresaldo/entities/planillascierresaldo.entity';
import { Documentpdf } from './documentpdf/entities/documentpdf.entity';

// import { HttpModule } from '@nestjs/axios';

// import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UsersModule,
    RolesUsersModule,
    ContratosigeproModule,
    DatoscontratoModule,
    PlanillasporcontratoModule,
    PlanillasigeproModule,
    PlanillascierresaldoModule,
    DocumentpdfModule,
    AuthModule,
    // HttpModule,

    /* MulterModule.register({
      dest: './uploads', // Directorio de destino para guardar los archivos subidos
    }), */
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
      entities: [
        User,
        RolesUser,
        Contratosigepro,
        Datoscontrato,
        Planillasporcontrato,
        Planillasigepro,
        Planillascierresaldo,
        Documentpdf,
      ], // Agrega aquí tus entidades
      synchronize: true, // Sincronizar automáticamente las estructuras de la base de datos (solo en desarrollo)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
