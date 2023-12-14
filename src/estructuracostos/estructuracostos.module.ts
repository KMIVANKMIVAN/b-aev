import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstructuracostosService } from './estructuracostos.service';
import { EstructuracostosController } from './estructuracostos.controller';

import { Estructuracosto } from './entities/estructuracosto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estructuracosto])],
  controllers: [EstructuracostosController],
  providers: [EstructuracostosService],
  exports: [EstructuracostosService],
})
export class EstructuracostosModule {}
