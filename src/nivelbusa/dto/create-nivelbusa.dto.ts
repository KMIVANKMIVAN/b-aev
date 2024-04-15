import { IsString, MaxLength } from 'class-validator';
export class CreateNivelbusaDto {
  @IsString()
  @MaxLength(50, { message: 'La longitud máxima es de 50 caracteres' })
  nivel: string;
}
