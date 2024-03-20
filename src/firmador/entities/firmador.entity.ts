// export class Firmador {}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('firmador')
export class Firmador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  cargo: string;

  @Column({ type: 'int' })
  departamental: number;

  @Column({ type: 'int' })
  nacional: number;
}
