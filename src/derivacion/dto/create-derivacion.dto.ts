// export class CreateDerivacionDto {}
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateDerivacionDto {
  @IsInt()
  id: number;

  @IsInt()
  id_desembolso: number;

  @IsInt()
  firmador: number;

  @IsNotEmpty()
  fecha_envio: Date;

  @IsNotEmpty()
  limite: number;

  @IsString()
  observacion: string;

  @IsInt()
  recibido: number;

  @IsString()
  estado: string;

  @IsInt()
  id_enviador: number;

  @IsInt()
  id_destinatario: number;

  @IsString()
  documento: string;
}
