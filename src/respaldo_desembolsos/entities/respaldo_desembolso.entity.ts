// export class RespaldoDesembolso {}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('respaldo_desembolsos')
export class RespaldoDesembolso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  desembolsos_id: number;

  @Column({ length: 100, nullable: true })
  archivo: string;

  @Column({ nullable: true })
  id_user: number;

  @Column({ nullable: true })
  fecha_insert: Date;

  @Column({ length: 200, nullable: true })
  referencia: string;

  @Column({ nullable: true })
  tiporespaldo_id: number;
}
