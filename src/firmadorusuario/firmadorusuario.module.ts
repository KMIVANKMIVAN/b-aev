import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirmadorusuarioService } from './firmadorusuario.service';
import { FirmadorusuarioController } from './firmadorusuario.controller';
import { Firmadorusuario } from './entities/firmadorusuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Firmadorusuario])],
  controllers: [FirmadorusuarioController],
  providers: [FirmadorusuarioService],
  exports: [FirmadorusuarioService]
})
export class FirmadorusuarioModule { }
