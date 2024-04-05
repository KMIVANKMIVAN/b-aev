import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';

import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/entities/user.entity';
import { RolesUser } from './roles_users/entities/roles_user.entity';
import { Contratosigepro } from './contratosigepro/entities/contratosigepro.entity';
import { Datoscontrato } from './datoscontrato/entities/datoscontrato.entity';
import { Planillasporcontrato } from './planillasporcontrato/entities/planillasporcontrato.entity';
import { Planillasigepro } from './planillasigepro/entities/planillasigepro.entity';
import { Planillascierresaldo } from './planillascierresaldo/entities/planillascierresaldo.entity';
import { Documentpdf } from './documentpdf/entities/documentpdf.entity';
import { Desembolso } from './desembolsos/entities/desembolso.entity';
import { Etapa } from './etapas/entities/etapa.entity';
import { RespaldoDesembolso } from './respaldo_desembolsos/entities/respaldo_desembolso.entity';
import { TipoRespaldo } from './tipo_respaldo/entities/tipo_respaldo.entity';

import { Derivacion } from './derivacion/entities/derivacion.entity';
import { Firmador } from './firmador/entities/firmador.entity';
import { Estado } from './estado/entities/estado.entity';

//////cuadro

// import {  } from './';

import { UsersModule } from './users/users.module';
import { RolesUsersModule } from './roles_users/roles_users.module';
import { AuthModule } from './auth/auth.module';
import { ContratosigeproModule } from './contratosigepro/contratosigepro.module';
import { DatoscontratoModule } from './datoscontrato/datoscontrato.module';
import { PlanillasporcontratoModule } from './planillasporcontrato/planillasporcontrato.module';
import { PlanillascierresaldoModule } from './planillascierresaldo/planillascierresaldo.module';
import { PlanillasigeproModule } from './planillasigepro/planillasigepro.module';
import { DocumentpdfModule } from './documentpdf/documentpdf.module';
import { DesembolsosModule } from './desembolsos/desembolsos.module';
import { EtapasModule } from './etapas/etapas.module';
import { RespaldoDesembolsosModule } from './respaldo_desembolsos/respaldo_desembolsos.module';
import { TipoRespaldoModule } from './tipo_respaldo/tipo_respaldo.module';
import { DerivacionModule } from './derivacion/derivacion.module';
import { FirmadorModule } from './firmador/firmador.module';
//////cuadro

import { CuadroModule } from './cuadro/cuadro.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { GenerarPdfsModule } from './generar-pdfs/generar-pdfs.module';
import { RecibirPdfsEnviarModule } from './recibir-pdfs-enviar/recibir-pdfs-enviar.module';
import { ConsultasExternasModule } from './consultas-externas/consultas-externas.module';
import { EstadoModule } from './estado/estado.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    UsersModule,
    RolesUsersModule,
    ContratosigeproModule,
    DatoscontratoModule,
    PlanillasporcontratoModule,
    PlanillasigeproModule,
    PlanillascierresaldoModule,
    DocumentpdfModule,
    DesembolsosModule,
    DesembolsosModule,
    EtapasModule,
    AuthModule,
    RespaldoDesembolsosModule,
    TipoRespaldoModule,
    DerivacionModule,
    FirmadorModule,

    /* TypeOrmModule.forRoot({
      logging: true,
      entities: [
        User,
        RolesUser,
        Contratosigepro,
        Datoscontrato,
        Planillasporcontrato,
        Planillasigepro,
        Planillascierresaldo,
        Documentpdf,
        Desembolso,
        Etapa,
        RespaldoDesembolso,
        TipoRespaldo,
      ],
      synchronize: false,
      multipleStatements: true,
      name: 'default',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sipago',
    }),
    TypeOrmModule.forRoot({
      logging: true,
      entities: [],
      synchronize: false,
      multipleStatements: true,
      name: 'cuadroConnection',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'cuadro',
    }),
    CuadroModule, */
    /* TypeOrmModule.forRoot({
      logging: true,
      entities: [
        User,
        RolesUser,
        Contratosigepro,
        Datoscontrato,
        Planillasporcontrato,
        Planillasigepro,
        Planillascierresaldo,
        Documentpdf,
        Desembolso,
        Etapa,
        RespaldoDesembolso,
        TipoRespaldo,
      ],
      synchronize: false,
      multipleStatements: true,
      name: 'default',
      type: 'mysql',
      host: configService.get<string>('IPBASEDEDATOS'),
      port: 3306,
      username: 'root',
      password: configService.get<string>('DATABASESIPAGOPASSWORD'), // Ejemplo de cómo acceder a otra variable
      database: configService.get<string>('DATABASESIPAGO'),
    }),
    TypeOrmModule.forRoot({
      logging: true,
      entities: [],
      synchronize: false,
      multipleStatements: true,
      name: 'cuadroConnection',
      type: 'mysql',
      host: configService.get<string>('IPBASEDEDATOS'),
      port: 3306,
      username: 'root',
      password: configService.get<string>('DATABASECUADROPASSWORD'), // Ejemplo de cómo acceder a otra variable
      database: configService.get<string>('DATABASECUADRO'),
    }), */

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        logging: true,
        entities: [
          User,
          RolesUser,
          Contratosigepro,
          Datoscontrato,
          Planillasporcontrato,
          Planillasigepro,
          Planillascierresaldo,
          Documentpdf,
          Desembolso,
          Etapa,
          RespaldoDesembolso,
          TipoRespaldo,
          Derivacion,
          Firmador,
          Estado,
        ],
        synchronize: false,
        multipleStatements: true,
        name: 'default',
        type: 'mysql',
        host: configService.get<string>('IPBASEDEDATOS'),
        port: 3306,
        username: 'root',
        password: configService.get<string>('DATABASESIPAGOPASSWORD'),
        database: configService.get<string>('DATABASESIPAGO'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        logging: true,
        entities: [],
        synchronize: false,
        multipleStatements: true,
        name: 'cuadroConnection',
        type: 'mysql',
        host: configService.get<string>('IPBASEDEDATOS'),
        port: 3306,
        username: 'root',
        password: configService.get<string>('DATABASECUADROPASSWORD'),
        database: configService.get<string>('DATABASECUADRO'),
      }),
    }),
    CuadroModule,
    ProyectosModule,
    GenerarPdfsModule,
    RecibirPdfsEnviarModule,
    ConsultasExternasModule,
    EstadoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }