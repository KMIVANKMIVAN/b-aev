import { Module } from '@nestjs/common';
import { Usuariobusa } from './entities/usuariobusa.entity';
import { UsuariobusaService } from './usuariobusa.service';
import { UsuariobusaController } from './usuariobusa.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Usuariobusa])],
  controllers: [UsuariobusaController],
  providers: [UsuariobusaService],
  exports: [TypeOrmModule, UsuariobusaService],
})
export class UsuariobusaModule {}
