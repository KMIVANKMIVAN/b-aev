import { PartialType } from '@nestjs/mapped-types';
import { CreateRolesUserDto } from './create-roles_user.dto';

export class UpdateRolesUserDto extends PartialType(CreateRolesUserDto) {}
