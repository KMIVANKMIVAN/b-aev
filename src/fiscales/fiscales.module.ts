import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiscalesService } from './fiscales.service';
import { FiscalesController } from './fiscales.controller';

import { Fiscale } from './entities/fiscale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fiscale])],
  controllers: [FiscalesController],
  providers: [FiscalesService],
  exports: [FiscalesService],
})
export class FiscalesModule {}
