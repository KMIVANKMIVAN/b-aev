// export class TipoRespaldo {}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipo_respaldo')
export class TipoRespaldo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  detalle: string;

  @Column({ length: 10, nullable: true })
  sigla: string;

  @Column({ nullable: true })
  activo: number;
}
