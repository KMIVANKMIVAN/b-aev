import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';

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
import { Titularcuenta } from './titularcuenta/entities/titularcuenta.entity';
import { Devolucione } from './devoluciones/entities/devolucione.entity';
import { RespaldoDesembolso } from './respaldo_desembolsos/entities/respaldo_desembolso.entity';
import { TipoRespaldo } from './tipo_respaldo/entities/tipo_respaldo.entity';
//////cuadro
import { Proyectosexcel } from './proyectosexcel/entities/proyectosexcel.entity';
import { Departamento } from './departamentos/entities/departamento.entity';
import { Estado } from './estados/entities/estado.entity';
import { TbActividade } from './tb_actividades/entities/tb_actividade.entity';
import { Tipo } from './tipo/entities/tipo.entity';
import { Modalidade } from './modalidades/entities/modalidade.entity';
import { Fiscale } from './fiscales/entities/fiscale.entity';
import { Estructuracosto } from './estructuracostos/entities/estructuracosto.entity';
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
import { TitularcuentaModule } from './titularcuenta/titularcuenta.module';
import { DevolucionesModule } from './devoluciones/devoluciones.module';
import { RespaldoDesembolsosModule } from './respaldo_desembolsos/respaldo_desembolsos.module';
import { TipoRespaldoModule } from './tipo_respaldo/tipo_respaldo.module';
//////cuadro
import { ProyectosexcelModule } from './proyectosexcel/proyectosexcel.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { EstadosModule } from './estados/estados.module';
import { TbActividadesModule } from './tb_actividades/tb_actividades.module';
import { TipoModule } from './tipo/tipo.module';
import { ModalidadesModule } from './modalidades/modalidades.module';
import { FiscalesModule } from './fiscales/fiscales.module';
import { EstructuracostosModule } from './estructuracostos/estructuracostos.module';
import { CuadroModule } from './cuadro/cuadro.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Esto cargará y analizará un archivo .env desde la ubicación predeterminada
      // (el directorio raíz del proyecto)
      // fusionará pares clave/valor del archivo .env con variables de entorno asignadas process.env
      // y almacenará el resultado en una estructura privada accesible a través de ConfigService.
      // Este método también registra el proveedor ConfigService.
      isGlobal: true, // Esto permite que ConfigService sea global y esté disponible en toda la aplicación
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
    TitularcuentaModule,
    DevolucionesModule,
    AuthModule,
    RespaldoDesembolsosModule,
    TipoRespaldoModule,

    ProyectosexcelModule,
    DepartamentosModule,
    EstadosModule,
    TbActividadesModule,
    TipoModule,
    ModalidadesModule,
    FiscalesModule,
    EstructuracostosModule,
    /* TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'aev',
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
        Titularcuenta,
        Devolucione,
      ],
      synchronize: false, // Sincronizar automáticamente las estructuras de la base de datos (solo en desarrollo)
    }), */
    TypeOrmModule.forRoot({
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
        Titularcuenta,
        Devolucione,
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
      entities: [
        Proyectosexcel,
        Departamento,
        Estado,
        TbActividade,
        Tipo,
        Modalidade,
        Fiscale,
        Estructuracosto,
      ],
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
    CuadroModule,
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
        Titularcuenta,
        Devolucione,
        RespaldoDesembolso,
        TipoRespaldo,
      ],
      synchronize: false,
      multipleStatements: true,
      name: 'default',
      type: 'mysql',
      host: '10.10.1.9',
      port: 3306,
      username: 'root',
      password: '43vivienda',
      database: 'sipago',
    }),
    TypeOrmModule.forRoot({
      logging: true,
      entities: [
        Proyectosexcel,
        Departamento,
        Estado,
        TbActividade,
        Tipo,
        Modalidade,
        Fiscale,
        Estructuracosto,
      ],
      synchronize: false,
      multipleStatements: true,
      name: 'cuadroConnection',
      type: 'mysql',
      host: '10.10.1.9',
      port: 3306,
      username: 'root',
      password: '43vivienda',
      database: 'cuadro',
    }),
    CuadroModule, */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
