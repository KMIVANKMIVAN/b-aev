import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartamentobusaDto } from './create-departamentobusa.dto';

export class UpdateDepartamentobusaDto extends PartialType(CreateDepartamentobusaDto) {}
