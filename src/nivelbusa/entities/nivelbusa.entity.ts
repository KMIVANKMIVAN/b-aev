import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('nivelbusa')
export class Nivelbusa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nivel: string;
}
