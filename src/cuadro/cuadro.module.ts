import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuadroService } from './cuadro.service';
import { CuadroController } from './cuadro.controller';

import { Cuadro } from './entities/cuadro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuadro])],
  controllers: [CuadroController],
  providers: [CuadroService],
  exports: [CuadroService],
})
export class CuadroModule {}
