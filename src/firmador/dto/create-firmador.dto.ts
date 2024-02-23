// export class CreateFirmadorDto {}
import { IsInt, IsString } from 'class-validator';

export class CreateFirmadorDto {
  @IsInt()
  id: number;

  @IsString()
  cargo: string;

  @IsInt()
  departamental: number;

  @IsInt()
  nacional: number;
}
