// export class Derivacion {}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Derivacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  id_desembolso: number;

  @Column({ type: 'int' })
  firmador: number;

  @Column({ type: 'date' })
  fecha_envio: Date;

  @Column({ type: 'int' })
  limite: number;

  @Column({ type: 'varchar', length: 255 })
  observacion: string;

  @Column({ type: 'int' })
  recibido: number;

  @Column({ type: 'varchar', length: 255 })
  estado: string;

  @Column({ type: 'int' })
  id_enviador: number;

  @Column({ type: 'int' })
  id_destinatario: number;

  @Column({ type: 'varchar', length: 100 })
  documento: string;
}
