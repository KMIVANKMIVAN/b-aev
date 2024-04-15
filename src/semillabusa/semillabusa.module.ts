import { Module } from '@nestjs/common';
import { SemillabusaService } from './semillabusa.service';
import { SemillabusaController } from './semillabusa.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { SucursalbusaModule } from 'src/sucursalbusa/sucursalbusa.module';
import { DepartamentobusaModule } from 'src/departamentobusa/departamentobusa.module';
import { UsuariobusaModule } from 'src/usuariobusa/usuariobusa.module';
import { NivelbusaModule } from 'src/nivelbusa/nivelbusa.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    SucursalbusaModule,
    DepartamentobusaModule,
    UsuariobusaModule,
    NivelbusaModule,
  ],
  controllers: [SemillabusaController],
  providers: [SemillabusaService],
})
export class SemillabusaModule {}
