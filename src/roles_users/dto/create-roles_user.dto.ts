// export class CreateRolesUserDto {}
import { IsInt } from 'class-validator';
import { PrimaryColumn } from 'typeorm';

export class CreateRolesUserDto {
  @PrimaryColumn()
  @IsInt()
  user_id: number;

  @IsInt()
  role_id: number;
}
