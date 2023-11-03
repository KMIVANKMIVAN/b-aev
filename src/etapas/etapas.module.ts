import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtapasService } from './etapas.service';
import { EtapasController } from './etapas.controller';

import { Etapa } from './entities/etapa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Etapa])],
  controllers: [EtapasController],
  providers: [EtapasService],
  exports: [EtapasService],
})
export class EtapasModule {}
