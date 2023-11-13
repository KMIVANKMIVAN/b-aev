import { IsOptional, IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateEtapaDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  etapa: string;
}
