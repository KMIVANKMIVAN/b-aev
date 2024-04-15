import { PartialType } from '@nestjs/mapped-types';
import { CreateNivelbusaDto } from './create-nivelbusa.dto';

export class UpdateNivelbusaDto extends PartialType(CreateNivelbusaDto) {}
