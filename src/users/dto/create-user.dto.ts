import {
  IsInt,
  IsString,
  IsOptional,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsInt()
  superior: number;

  @IsInt()
  idOficina: number;

  @IsInt()
  @IsOptional()
  dependencia?: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsInt()
  @IsOptional()
  lastLogin?: number;

  @IsString()
  @IsOptional()
  mosca?: string;

  @IsString()
  @IsOptional()
  cargo?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsInt()
  logins: number;

  @IsInt()
  @IsOptional()
  fechaCreacion?: number;

  // @IsBoolean()
  // habilitado: boolean;

  @IsInt()
  habilitado: number;

  @IsInt()
  nivel: number;

  @IsString()
  @IsOptional()
  genero?: string;

  @IsInt()
  @IsOptional()
  prioridad?: number;

  @IsInt()
  idEntidad: number;

  @IsInt()
  super: number;

  @IsInt()
  @IsOptional()
  cedulaIdentidad?: number;

  @IsString()
  @IsOptional()
  expedido?: string;

  @IsString()
  @IsOptional()
  theme?: string;
}
