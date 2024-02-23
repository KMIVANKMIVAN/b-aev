import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirmadorService } from './firmador.service';
import { FirmadorController } from './firmador.controller';

import { Firmador } from './entities/firmador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Firmador])],
  controllers: [FirmadorController],
  providers: [FirmadorService],
  exports: [FirmadorService],
})
export class FirmadorModule {}
