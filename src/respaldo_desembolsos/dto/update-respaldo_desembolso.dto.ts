import { PartialType } from '@nestjs/mapped-types';
import { CreateRespaldoDesembolsoDto } from './create-respaldo_desembolso.dto';

export class UpdateRespaldoDesembolsoDto extends PartialType(CreateRespaldoDesembolsoDto) {}
