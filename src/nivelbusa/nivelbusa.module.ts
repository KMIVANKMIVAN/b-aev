import { Module } from '@nestjs/common';
import { Nivelbusa } from './entities/nivelbusa.entity';
import { NivelbusaService } from './nivelbusa.service';
import { NivelbusaController } from './nivelbusa.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Nivelbusa])],
  controllers: [NivelbusaController],
  providers: [NivelbusaService],
  exports: [TypeOrmModule, NivelbusaService],
})
export class NivelbusaModule {}
