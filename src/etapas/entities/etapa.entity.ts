import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('etapas')
export class Etapa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  etapa: string;
}
