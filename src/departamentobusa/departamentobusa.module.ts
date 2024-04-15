import { Module } from '@nestjs/common';
import { Departamentobusa } from './entities/departamentobusa.entity';
import { DepartamentobusaService } from './departamentobusa.service';
import { DepartamentobusaController } from './departamentobusa.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Departamentobusa])],
  controllers: [DepartamentobusaController],
  providers: [DepartamentobusaService],
  exports: [TypeOrmModule, DepartamentobusaService],
})
export class DepartamentobusaModule {}
