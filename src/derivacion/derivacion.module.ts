import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DerivacionService } from './derivacion.service';
import { DerivacionController } from './derivacion.controller';

import { Derivacion } from './entities/derivacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Derivacion])],
  controllers: [DerivacionController],
  providers: [DerivacionService],
  exports: [DerivacionService],
})
export class DerivacionModule {}
