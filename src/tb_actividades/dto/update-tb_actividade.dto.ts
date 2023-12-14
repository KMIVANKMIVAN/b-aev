import { PartialType } from '@nestjs/mapped-types';
import { CreateTbActividadeDto } from './create-tb_actividade.dto';

export class UpdateTbActividadeDto extends PartialType(CreateTbActividadeDto) {}
