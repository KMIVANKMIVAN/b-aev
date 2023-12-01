import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoRespaldoService } from './tipo_respaldo.service';
import { TipoRespaldoController } from './tipo_respaldo.controller';

import { TipoRespaldo } from './entities/tipo_respaldo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoRespaldo])],
  controllers: [TipoRespaldoController],
  providers: [TipoRespaldoService],
  exports: [TipoRespaldoService],
})
export class TipoRespaldoModule {}
