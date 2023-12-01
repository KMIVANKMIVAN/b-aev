import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespaldoDesembolsosService } from './respaldo_desembolsos.service';
import { RespaldoDesembolsosController } from './respaldo_desembolsos.controller';

import { RespaldoDesembolso } from './entities/respaldo_desembolso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RespaldoDesembolso])],
  controllers: [RespaldoDesembolsosController],
  providers: [RespaldoDesembolsosService],
  exports: [RespaldoDesembolsosService],
})
export class RespaldoDesembolsosModule {}
