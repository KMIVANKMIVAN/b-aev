import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanillasigeproService } from './planillasigepro.service';
import { PlanillasigeproController } from './planillasigepro.controller';

import { Planillasigepro } from './entities/planillasigepro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planillasigepro])],
  controllers: [PlanillasigeproController],
  providers: [PlanillasigeproService],
  exports: [PlanillasigeproService],
})
export class PlanillasigeproModule {}
