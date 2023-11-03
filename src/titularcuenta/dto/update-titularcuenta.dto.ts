import { PartialType } from '@nestjs/mapped-types';
import { CreateTitularcuentaDto } from './create-titularcuenta.dto';

export class UpdateTitularcuentaDto extends PartialType(CreateTitularcuentaDto) {}
