import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';

import { Cuadro } from './entities/cuadro.entity';
@Injectable()
export class CuadroService {
  constructor(
    @InjectRepository(Cuadro)
    private readonly CuadroRepository: Repository<Cuadro>,
    private connection: Connection,
  ) {}

  async consultaCuadro(contcod: string): Promise<Cuadro[]> {
    try {
      const sql = `
        SELECT
          p.id, p.gestion, p.num, p.codigo_sap, p.proyecto_nombre, e.estado,
          a.actividad, d.departamento, p.provincia, p.municipio, p.comunidades,
          t.tipo, m.modalidad, p.plan_plurianual, p.gestion, p.empresa_adjudicada,
          p.fecha_orden_proceder, p.plazo_ejecucion, p.ampliacion_plazo,
          DATE_ADD(p.fecha_orden_proceder, INTERVAL (p.plazo_ejecucion + p.ampliacion_plazo) DAY) as fecha_ent_provisional,
          p.fecha_entrega_definitiva, p.uh_programado as uh_proy, f.nombre_fiscal,
          p.pueblo_indigena, p.descripcion_obra, p.observaciones, p.costo_proyecto,
          p.monto_con_aev, p.monto_cont_modificatorio, p.monto_con_benef,
          p.por_con_benef, p.monto_sup_aev, p.monto_fin_aev, p.monto_total_proyecto,
          p.monto_con_muni, p.monto_con_sectorial, p.monto_total_concurrencia,
          p.empresa_sup, p.nombre_sup, p.monto_contrato_sup, p.avance_fisico_obra,
          p.fecha_contrato, ec.monto_aevivienda as monto_contrato_aevivienda, p.sigepro_id
          FROM
            cuadro.proyectosexcel p
          INNER JOIN
            cuadro.departamentos d ON p.departamento = d.id
          INNER JOIN
            cuadro.estados e ON p.estado = e.idEstado
          INNER JOIN
            cuadro.tb_actividades a ON p.actividad = a.idActividad
          INNER JOIN
            cuadro.tipo t ON p.idTipo = t.idTipo
          INNER JOIN
            cuadro.modalidades m ON p.modalidad = m.id
          INNER JOIN
            cuadro.fiscales f ON p.fiscal = f.id
          LEFT JOIN
            cuadro.estructuracostos ec ON p.id = ec.proyecto_id
        WHERE
          p.activo = 1
          AND p.idTipo IN (5, 11, 13, 2, 15, 17, 18)
          AND p.num LIKE '%${contcod}%' OR p.proyecto_nombre LIKE '%${contcod}%';
      `;
      const result = await this.connection.query(sql);
      return result;
    } catch (error) {
      throw new Error('Unable to fetch consultaCuadro data');
    }
  }
  async consultaSipago(codid: string): Promise<Cuadro[]> {
    try {
      const sql = `
      SELECT tp.detalle,tp.id as idtipo,e.etapa,DATE_FORMAT(d.fecha_generado,'%d/%m/%Y') as fechagenerado,DATE_FORMAT(d.fecha_banco,'%d/%m/%Y') as fechabanco,d.*
      FROM desembolsos d
      INNER JOIN tipoplanillas tp ON d.tipo_planilla = tp.id
      INNER JOIN etapas e ON d.estado = e.id
      WHERE d.proyecto_id = ${codid} 
      AND d.estado = 6
      AND d.activo = 1
      ORDER BY d.id desc
      `;
      const result = await this.connection.query(sql);
      return result;
    } catch (error) {
      throw new Error('Unable to fetch consultaCuadro data');
    }
  }

  async findAllProyectosexcel(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.proyectosexcel LIMIT 5';
      const result = await this.connection.query(sql);
      return result;
    } catch (error) {
      // console.error('Error while fetching data:', error);
      throw new Error('Unable to fetch proyectosexcel data');
    }
  }
  async findAllDepartamentos(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.departamentos';
      const result = await this.connection.query(sql);
      return result;
    } catch (error) {
      // console.error('Error while fetching data:', error);
      throw new Error('Unable to fetch departamentos data');
    }
  }
  async findAllEstados(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.estados';
      const result = await this.connection.query(sql);
      return result;
    } catch (error) {
      // console.error('Error while fetching data:', error);
      throw new Error('Unable to fetch estados data');
    }
  }
  async findAllTb_actividades(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.tb_actividades';
      const result = await this.connection.query(sql);
      return result;
    } catch (error) {
      // console.error('Error while fetching data:', error);
      throw new Error('Unable to fetch tb_actividades data');
    }
  }
  async findAllTipo(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.tipo';
      const result = await this.connection.query(sql);
      return result;
    } catch (error) {
      // console.error('Error while fetching data:', error);
      throw new Error('Unable to fetch tipo data');
    }
  }
  async findAllModalidades(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.modalidades LIMIT 5';
      const result = await this.connection.query(sql);
      return result;
    } catch (error) {
      // console.error('Error while fetching data:', error);
      throw new Error('Unable to fetch modalidades data');
    }
  }
  async findAllFiscales(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.fiscales';
      const result = await this.connection.query(sql);
      return result;
    } catch (error) {
      // console.error('Error while fetching data:', error);
      throw new Error('Unable to fetch fiscales data');
    }
  }
  async findAllEstructuracostos(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.estructuracostos LIMIT 10';
      const result = await this.connection.query(sql);
      return result;
    } catch (error) {
      // console.error('Error while fetching data:', error);
      throw new Error('Unable to fetch estructuracostos data');
    }
  }
}
