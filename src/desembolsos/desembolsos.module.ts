import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesembolsosService } from './desembolsos.service';
import { DesembolsosController } from './desembolsos.controller';

import { Desembolso } from './entities/desembolso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Desembolso])],
  controllers: [DesembolsosController],
  providers: [DesembolsosService],
  exports: [DesembolsosService],
})
export class DesembolsosModule {}
