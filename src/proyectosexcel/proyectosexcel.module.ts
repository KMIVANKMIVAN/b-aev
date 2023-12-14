import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectosexcelService } from './proyectosexcel.service';
import { ProyectosexcelController } from './proyectosexcel.controller';

import { Proyectosexcel } from './entities/proyectosexcel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyectosexcel])],
  controllers: [ProyectosexcelController],
  providers: [ProyectosexcelService],
  exports: [ProyectosexcelService],
})
export class ProyectosexcelModule {}
