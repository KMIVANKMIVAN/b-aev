import { PartialType } from '@nestjs/mapped-types';
import { CreateSucursalbusaDto } from './create-sucursalbusa.dto';

export class UpdateSucursalbusaDto extends PartialType(CreateSucursalbusaDto) {}
