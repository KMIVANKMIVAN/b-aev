import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanillasporcontratoDto } from './create-planillasporcontrato.dto';

export class UpdatePlanillasporcontratoDto extends PartialType(CreatePlanillasporcontratoDto) {}
