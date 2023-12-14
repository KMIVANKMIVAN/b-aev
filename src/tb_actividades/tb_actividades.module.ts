import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbActividadesService } from './tb_actividades.service';
import { TbActividadesController } from './tb_actividades.controller';

import { TbActividade } from './entities/tb_actividade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TbActividade])],
  controllers: [TbActividadesController],
  providers: [TbActividadesService],
  exports: [TbActividadesService],
})
export class TbActividadesModule {}
