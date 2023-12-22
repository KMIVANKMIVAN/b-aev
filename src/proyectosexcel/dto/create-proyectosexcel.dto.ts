import { IsString, IsOptional, IsNumber } from 'class-validator';
export class CreateProyectosexcelDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  detalle: string;
}
