import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratosigeproService } from './contratosigepro.service';
import { ContratosigeproController } from './contratosigepro.controller';

import { Contratosigepro } from './entities/contratosigepro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contratosigepro])],
  controllers: [ContratosigeproController],
  providers: [ContratosigeproService],
  exports: [ContratosigeproService],
})
export class ContratosigeproModule {}
