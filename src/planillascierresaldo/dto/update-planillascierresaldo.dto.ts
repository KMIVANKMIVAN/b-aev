import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanillascierresaldoDto } from './create-planillascierresaldo.dto';

export class UpdatePlanillascierresaldoDto extends PartialType(
  CreatePlanillascierresaldoDto,
) {}
