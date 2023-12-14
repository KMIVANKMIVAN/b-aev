import { PartialType } from '@nestjs/mapped-types';
import { CreateEstructuracostoDto } from './create-estructuracosto.dto';

export class UpdateEstructuracostoDto extends PartialType(CreateEstructuracostoDto) {}
