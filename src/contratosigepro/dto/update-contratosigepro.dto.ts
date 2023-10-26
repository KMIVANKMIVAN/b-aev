import { PartialType } from '@nestjs/mapped-types';
import { CreateContratosigeproDto } from './create-contratosigepro.dto';

export class UpdateContratosigeproDto extends PartialType(
  CreateContratosigeproDto,
) {}
