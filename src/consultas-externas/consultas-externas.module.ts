import { Module } from '@nestjs/common';
import { ConsultasExternasService } from './consultas-externas.service';
import { ConsultasExternasController } from './consultas-externas.controller';

@Module({
  controllers: [ConsultasExternasController],
  providers: [ConsultasExternasService],
  exports: [ConsultasExternasService],
})
export class ConsultasExternasModule { }
