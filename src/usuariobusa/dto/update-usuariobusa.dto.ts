import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuariobusaDto } from './create-usuariobusa.dto';

export class UpdateUsuariobusaDto extends PartialType(CreateUsuariobusaDto) {}
