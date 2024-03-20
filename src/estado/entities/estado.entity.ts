// export class Estado {}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('estado') // Esto mapea la clase a la tabla 'estado' en la base de datos.
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  estado: string;
}
