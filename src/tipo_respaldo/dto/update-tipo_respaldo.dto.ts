import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoRespaldoDto } from './create-tipo_respaldo.dto';

export class UpdateTipoRespaldoDto extends PartialType(CreateTipoRespaldoDto) {}
