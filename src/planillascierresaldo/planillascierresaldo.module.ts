import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanillascierresaldoService } from './planillascierresaldo.service';
import { PlanillascierresaldoController } from './planillascierresaldo.controller';

import { Planillascierresaldo } from './entities/planillascierresaldo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planillascierresaldo])],
  controllers: [PlanillascierresaldoController],
  providers: [PlanillascierresaldoService],
  exports: [PlanillascierresaldoService],
})
export class PlanillascierresaldoModule {}
