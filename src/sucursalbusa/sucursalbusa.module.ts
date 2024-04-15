import { Module } from '@nestjs/common';
import { Sucursalbusa } from './entities/sucursalbusa.entity';
import { SucursalbusaService } from './sucursalbusa.service';
import { SucursalbusaController } from './sucursalbusa.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sucursalbusa])],
  controllers: [SucursalbusaController],
  providers: [SucursalbusaService],
  exports: [TypeOrmModule, SucursalbusaService],
})
export class SucursalbusaModule {}
