import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatoscontratoService } from './datoscontrato.service';
import { DatoscontratoController } from './datoscontrato.controller';

import { Datoscontrato } from './entities/datoscontrato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Datoscontrato])],
  controllers: [DatoscontratoController],
  providers: [DatoscontratoService],
  exports: [DatoscontratoService],
})
export class DatoscontratoModule {}
