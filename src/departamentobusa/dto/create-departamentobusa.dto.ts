import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDepartamentobusaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'La longitud maxima es de 50 caracteres' })
  departamento: string;
}
