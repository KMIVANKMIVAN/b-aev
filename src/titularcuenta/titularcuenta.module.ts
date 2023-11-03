import { Module } from '@nestjs/common';
import { TitularcuentaService } from './titularcuenta.service';
import { TitularcuentaController } from './titularcuenta.controller';

@Module({
  controllers: [TitularcuentaController],
  providers: [TitularcuentaService],
})
export class TitularcuentaModule {}
