import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanillasigeproDto } from './create-planillasigepro.dto';

export class UpdatePlanillasigeproDto extends PartialType(
  CreatePlanillasigeproDto,
) {}
