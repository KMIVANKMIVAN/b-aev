import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('roles_users')
export class RolesUser {
  @PrimaryColumn({ type: 'int', width: 10, unsigned: true })
  user_id: number;

  @Column({ type: 'int', width: 10, unsigned: true })
  role_id: number;
}
