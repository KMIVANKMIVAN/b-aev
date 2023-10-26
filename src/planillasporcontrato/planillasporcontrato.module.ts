import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanillasporcontratoService } from './planillasporcontrato.service';
import { PlanillasporcontratoController } from './planillasporcontrato.controller';

import { Planillasporcontrato } from './entities/planillasporcontrato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planillasporcontrato])],
  controllers: [PlanillasporcontratoController],
  providers: [PlanillasporcontratoService],
  exports: [PlanillasporcontratoService],
})
export class PlanillasporcontratoModule {}
