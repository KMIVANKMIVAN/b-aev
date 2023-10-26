// export class RolesUser {}
import { Entity, Column, PrimaryColumn } from 'typeorm'; // Importa PrimaryColumn

@Entity('roles_users')
export class RolesUser {
  @PrimaryColumn({ type: 'int', width: 10, unsigned: true }) // Define user_id como la clave primaria
  user_id: number;

  @Column({ type: 'int', width: 10, unsigned: true })
  role_id: number;
}
