import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';

import { Cuadro } from './entities/cuadro.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CuadroService {
  constructor(
    @InjectRepository(Cuadro)
    private readonly CuadroRepository: Repository<Cuadro>,
    private connection: Connection,
    private configService: ConfigService,
  ) { }
  fechainicio = this.configService.get<string>('FECHAINICIO');
  //--AND p.idTipo IN (5, 11, 13, 2, 15, 17, 18)
  async consultaCuadro(contcod: string): Promise<Cuadro[]> {
    try {
      const sql = `
      SELECT
      p.id,
      p.gestion,
      p.num,
      p.codigo_sap,
      p.proyecto_nombre,
      e.estado,
      a.actividad,
      d.departamento,
      p.provincia,
      p.municipio,
      p.comunidades,
      t.tipo,
      m.modalidad,
      p.plan_plurianual,
      p.gestion,
      p.empresa_adjudicada,
      p.fecha_orden_proceder,
      p.plazo_ejecucion,
      p.ampliacion_plazo,
      DATE_ADD(p.fecha_orden_proceder, INTERVAL (p.plazo_ejecucion + p.ampliacion_plazo) DAY) as fecha_ent_provisional,
      p.fecha_entrega_definitiva,
      p.uh_programado as uh_proy,
      f.nombre_fiscal,
      p.pueblo_indigena,
      p.descripcion_obra,
      p.observaciones,
      p.costo_proyecto,
      p.monto_con_aev,
      p.monto_cont_modificatorio,
      p.monto_con_benef,
      p.por_con_benef,
      p.monto_sup_aev,
      p.monto_fin_aev,
      p.monto_total_proyecto,
      p.monto_con_muni,
      p.monto_con_sectorial,
      p.monto_total_concurrencia,
      p.empresa_sup,
      p.nombre_sup,
      p.monto_contrato_sup,
      p.avance_fisico_obra,
      p.fecha_contrato,
      ec.monto_aevivienda as monto_contrato_aevivienda,
      p.sigepro_id
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
      
      AND p.idTipo IN (5, 11, 13, 17, 15, 18)
      AND (p.num LIKE '%${contcod}%' OR p.proyecto_nombre LIKE '%${contcod}%')
  LIMIT 4;
      `;
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron datos para el código ${contcod}`,
          message: `No se encontraron datos para el código ${contcod} sin datos`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (consultaCuadro) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (consultaCuadro) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (consultaCuadro): ${error}`,
          message: `Error del Servidor en (consultaCuadro): ${error}`,
        });
      }
    }
  }
  async consultaCuadroVivienda(contcod: string): Promise<Cuadro[]> {
    try {
      const sql = `
      SELECT
      p.id,
      p.gestion,
      p.num,
      p.codigo_sap,
      p.proyecto_nombre,
      e.estado,
      a.actividad,
      d.departamento,
      p.provincia,
      p.municipio,
      p.comunidades,
      t.tipo,
      m.modalidad,
      p.plan_plurianual,
      p.gestion,
      p.empresa_adjudicada,
      p.fecha_orden_proceder,
      p.plazo_ejecucion,
      p.ampliacion_plazo,
      DATE_ADD(p.fecha_orden_proceder, INTERVAL (p.plazo_ejecucion + p.ampliacion_plazo) DAY) as fecha_ent_provisional,
      p.fecha_entrega_definitiva,
      p.uh_programado as uh_proy,
      f.nombre_fiscal,
      p.pueblo_indigena,
      p.descripcion_obra,
      p.observaciones,
      p.costo_proyecto,
      p.monto_con_aev,
      p.monto_cont_modificatorio,
      p.monto_con_benef,
      p.por_con_benef,
      p.monto_sup_aev,
      p.monto_fin_aev,
      p.monto_total_proyecto,
      p.monto_con_muni,
      p.monto_con_sectorial,
      p.monto_total_concurrencia,
      p.empresa_sup,
      p.nombre_sup,
      p.monto_contrato_sup,
      p.avance_fisico_obra,
      p.fecha_contrato,
      ec.monto_aevivienda as monto_contrato_aevivienda,
      p.sigepro_id
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
      AND p.idTipo IN (1, 2, 10, 14, 19, 3, 4, 16, 9)
      AND (p.num LIKE '%${contcod}%' OR p.proyecto_nombre LIKE '%${contcod}%')
  LIMIT 4;
      `;
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron datos para el código ${contcod}`,
          message: `No se encontraron datos para el código ${contcod} sin datos`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (consultaCuadro) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (consultaCuadro) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (consultaCuadro): ${error}`,
          message: `Error del Servidor en (consultaCuadro): ${error}`,
        });
      }
    }
  }
  async consultaBusa(): Promise<Cuadro[]> {
    try {
      const sql = `
      SELECT
      p.id AS id_proyecto,
      p.num AS codigo,
      p.proyecto_nombre AS nombre_proyecto,
      t.tipo AS tipo,
      d.id AS id_desembolso,
      d.cont_cod,
      d.monto_fisico,
      d.descuento_anti_reten,
      d.multa,
      d.monto_desembolsado,
      d.idcuenta,
      c.titular,
      c.cuentatitular,
      d.estado,
      d.numero_inst,
      d.numero_factura,
      d.fecha_insert,
      d.objeto,
      d.fecha_banco,
      d.archivo,
      d.fecha_busa,
      d.archivo_busa,
      d.fecha_abono 
      FROM sipago.desembolsos d,
      cuadro.proyectosexcel p,
      cuadro.tipo t,
      sipago.titularcuenta c
      WHERE d.proyecto_id = p.id
      AND p.idTipo = t.idTipo
      AND d.idcuenta = c.id
      AND d.estado = 6
      AND NOT ISNULL(d.archivo)
      AND NOT ISNULL(d.fecha_banco)
AND d.fecha_insert>= '${this.fechainicio}'
AND  ISNULL(d.fecha_busa) 
AND  ISNULL(d.archivo_busa)
limit 100
      `;
      // this.fechainicio;
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron datos para la fecha seleccionada 2023-12-01`,
          message: `No se encontraron datos para la fecha seleccionada 2023-12-01`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (consultaBusa) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (consultaBusa) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (consultaBusa): ${error}`,
          message: `Error del Servidor en (consultaBusa): ${error}`,
        });
      }
    }
  }
  async consultaBusaAev(
    fechaInicioC: string,
    fechaFinc: string,
  ): Promise<Cuadro[]> {
    try {
      let fechaIf = fechaInicioC;
      if (fechaInicioC < this.fechainicio) {
        fechaIf = this.fechainicio;
      }
      const sql = `
      SELECT
p.id AS id_proyecto,
p.num AS codigo,
p.proyecto_nombre AS nombre_proyecto,
t.tipo AS tipo,
d.id AS id_desembolso,
d.cont_cod,
d.monto_fisico,
d.descuento_anti_reten,
d.multa,
d.monto_desembolsado,
d.idcuenta,
c.titular,
c.cuentatitular,
d.estado,
d.numero_inst,
d.numero_factura,
d.fecha_insert,
d.objeto,
d.fecha_banco,
d.archivo,
d.fecha_busa,
d.archivo_busa,
d.fecha_abono 
FROM sipago.desembolsos d,
cuadro.proyectosexcel p,
cuadro.tipo t,
sipago.titularcuenta c
WHERE d.proyecto_id = p.id
AND p.idTipo = t.idTipo
AND d.idcuenta = c.id
AND d.estado = 6
AND NOT ISNULL(d.archivo)
AND NOT ISNULL(d.fecha_banco)
      AND d.fecha_insert >= '${fechaIf}'
    AND d.fecha_insert <= '${fechaFinc}'
      AND NOT ISNULL(d.fecha_busa) 
      AND NOT ISNULL(d.archivo_busa)
      `;
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron datos para la fecha seleccionada ${this.fechainicio}`,
          message: `No se encontraron datos para la fecha seleccionada ${this.fechainicio}`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (consultaBusa) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (consultaBusa) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (consultaBusa): ${error}`,
          message: `Error del Servidor en (consultaBusa): ${error}`,
        });
      }
    }
  }
  async consultaSipago(codid: string): Promise<Cuadro[]> {
    try {
      /* const sql = `
        SELECT tp.detalle,tp.id as idtipo,e.etapa,DATE_FORMAT(d.fecha_generado,'%d/%m/%Y') as fechagenerado,DATE_FORMAT(d.fecha_banco,'%d/%m/%Y') as fechabanco,d.*
        FROM desembolsos d
        INNER JOIN tipoplanillas tp ON d.tipo_planilla = tp.id
        INNER JOIN etapas e ON d.estado = e.id
        WHERE d.proyecto_id = ${codid} 
        AND d.estado = 6
        AND d.activo = 1
        ORDER BY d.id desc
      `; */
      /* const sql = `
      SELECT 
      tp.detalle,
      tp.id AS idtipo,
      e.etapa,
      DATE_FORMAT(d.fecha_generado, '%d/%m/%Y') AS fechagenerado,
      DATE_FORMAT(d.fecha_banco, '%d/%m/%Y') AS fechabanco,
      d.*,
      CASE 
          WHEN (d.fecha_banco IS NULL OR d.fecha_banco = '' OR STR_TO_DATE(d.fecha_banco, '%Y-%m-%d') >= '2023-12-27') THEN 0
          ELSE 1
      END AS buttonAEV,
      CASE 
          WHEN (d.fecha_busa IS NULL OR d.fecha_busa = '' OR STR_TO_DATE(d.fecha_busa, '%Y-%m-%d') >= '2023-12-27') THEN 0
          ELSE 1
      END AS buttonBUSA
  FROM desembolsos d
  INNER JOIN tipoplanillas tp ON d.tipo_planilla = tp.id
  INNER JOIN etapas e ON d.estado = e.id
  WHERE d.proyecto_id = ${codid} 
      AND d.estado = 6
      AND d.activo = 1
  ORDER BY d.id DESC;  
      `;
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron datos para el codigo: ${codid}`,
          message: `No se encontraron datos para el codigo: ${codid} sin datos`,
        });
      }
      return result; */
      const sql = `
      SELECT 
    tp.detalle,
    tp.id AS idtipo,
    e.etapa,
    DATE_FORMAT(d.fecha_generado, '%d/%m/%Y') AS fechagenerado,
    DATE_FORMAT(d.fecha_banco, '%d/%m/%Y') AS fechabanco,
    d.*,
    CASE 
        WHEN (d.fecha_banco IS NULL OR d.fecha_banco = '' OR STR_TO_DATE(d.fecha_insert, '%Y-%m-%d') >= '${this.fechainicio}') THEN 0
        ELSE 1
    END AS buttonAEV,
    CASE 
        WHEN ((d.fecha_busa IS NULL OR d.fecha_busa = '') AND (STR_TO_DATE(d.fecha_insert, '%Y-%m-%d') < '${this.fechainicio}')) OR (STR_TO_DATE(d.fecha_busa, '%Y-%m-%d') < '${this.fechainicio}') THEN 1
        ELSE 0
    END AS buttonBUSA
FROM desembolsos d
INNER JOIN tipoplanillas tp ON d.tipo_planilla = tp.id
INNER JOIN etapas e ON d.estado = e.id
  WHERE d.proyecto_id = ${codid} 
      AND d.estado = 6
      AND d.activo = 1
  ORDER BY d.id DESC;  
      `;

      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron datos para el codigo: ${codid}`,
          message: `No se encontraron datos para el codigo: ${codid} sin datos`,
        });
      }
      return result;

      /* const ids = result.map((data: any) => data.id);

      const buttonAEVResponses = await Promise.all(
        ids.map((id: string) => this.verificarEnvioBanco(`${id}-AEV`)),
      );
      const buttonBUSAResponses = await Promise.all(
        ids.map((id: string) => this.verificarEnvioBanco(`${id}-BUSA`)),
      );

      const resultWithButtons = result.map((data: any, index: number) => {
        return {
          ...data,
          buttonAEV: buttonAEVResponses[index],
          buttonBUSA: buttonBUSAResponses[index],
        };
      });

      return resultWithButtons; */
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (buscarUsuarios) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (buscarUsuarios) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (buscarUsuarios): ${error}`,
          message: `Error del Servidor en (buscarUsuarios): ${error}`,
        });
      }
    }
  }
  async verificarEnvioBanco(numero: string): Promise<boolean> {
    try {
      if (numero.includes('-AEV')) {
        const sql = `SELECT d.fecha_banco FROM desembolsos d WHERE d.id = '${numero}'`;
        const result = await this.connection.query(sql);
        if (result.length === 0) {
          throw new BadRequestException({
            statusCode: 400,
            error: `No se pudieron obtener datos para el codigo: ${numero}`,
            message: `No se pudieron obtener datos para el codigo: ${numero}`,
          });
        }
        return result[0].fecha_banco !== null;
      } else if (numero.includes('-BUSA')) {
        const sql = `SELECT d.fecha_busa FROM desembolsos d WHERE d.id = '${numero}'`;
        const result = await this.connection.query(sql);
        if (result.length === 0) {
          throw new BadRequestException({
            statusCode: 400,
            error: `No se pudieron obtener datos para el codigo: ${numero}`,
            message: `No se pudieron obtener datos para el codigo: ${numero}`,
          });
        }
        return result[0].fecha_busa !== null;
      } else {
        throw new BadRequestException({
          statusCode: 400,
          error: `Número no tiene el formato adecuado`,
          message: `Número no tiene el formato adecuados`,
        });
      }
      /* const idnum = numero;
      let fechaBanco: string | null = null;

      if (numero.includes('-AEV')) {
        const sql = `SELECT d.fecha_banco FROM desembolsos d WHERE d.id = '${idnum}'`;
        const result = await this.connection.query(sql);
        if (result.length === 0) {
          throw new BadRequestException({
            statusCode: 400,
            error: `No se pudieron obtener datos para el codigo: ${numero}`,
            message: `No se pudieron obtener datos para el codigo: ${numero}`,
          });
        }
        fechaBanco = result[0].fecha_banco;
      } else if (numero.includes('-BUSA')) {
        const sql = `SELECT d.fecha_busa FROM desembolsos d WHERE d.id = '${idnum}'`;
        const result = await this.connection.query(sql);
        if (result.length === 0) {
          throw new BadRequestException({
            statusCode: 400,
            error: `No se pudieron obtener datos para el codigo: ${numero}`,
            message: `No se pudieron obtener datos para el codigo: ${numero}`,
          });
        }
        fechaBanco = result[0].fecha_busa;
      } else {
        throw new BadRequestException({
          statusCode: 400,
          error: `Número no tiene el formato adecuado`,
          message: `Número no tiene el formato adecuados`,
        });
      }
      if (fechaBanco === null) {
        return true; // Si fechaBanco es null, devolver true
      } else {
        // Verificar si la fecha es mayor o igual a fechaInicio
        return new Date(fechaBanco) >= new Date(this.fechainicio);
      } */
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (verificarEnvioBanco) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (verificarEnvioBanco) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (verificarEnvioBanco): ${error}`,
          message: `Error del Servidor en (verificarEnvioBanco): ${error}`,
        });
      }
    }
  }

  async findAllProyectosexcel(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.proyectosexcel LIMIT 5';
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener los Proyectosexcel`,
          message: `No se pudieron obtener los Proyectosexcel Sin datos`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllProyectosexcel) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findAllProyectosexcel) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllProyectosexcel): ${error}`,
          message: `Error del Servidor en (findAllProyectosexcel): ${error}`,
        });
      }
    }
  }
  async findAllDepartamentos(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.departamentos';
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener los Departamentos`,
          message: `No se pudieron obtener los Departamentos Sin datos`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllDepartamentos) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findAllDepartamentos) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllDepartamentos): ${error}`,
          message: `Error del Servidor en (findAllDepartamentos): ${error}`,
        });
      }
    }
  }
  async findAllEstados(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.estados';
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener los Estados`,
          message: `No se pudieron obtener los Estados Sin datos`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllEstados) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findAllEstados) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllEstados): ${error}`,
          message: `Error del Servidor en (findAllEstados): ${error}`,
        });
      }
    }
  }
  async findAllTb_actividades(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.tb_actividades';
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener los Tb_actividades`,
          message: `No se pudieron obtener los Tb_actividades Sin datos`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllTb_actividades) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findAllTb_actividades) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllTb_actividades): ${error}`,
          message: `Error del Servidor en (findAllTb_actividades): ${error}`,
        });
      }
    }
  }
  async findAllTipo(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.tipo';
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener los findAllTipo`,
          message: `No se pudieron obtener los findAllTipo Sin datos`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllTipo) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findAllTipo) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllTipo): ${error}`,
          message: `Error del Servidor en (findAllTipo): ${error}`,
        });
      }
    }
  }
  async findAllModalidades(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.modalidades LIMIT 5';
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener los findAllModalidades`,
          message: `No se pudieron obtener los findAllModalidades Sin datos`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllModalidades) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findAllModalidades) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllModalidades): ${error}`,
          message: `Error del Servidor en (findAllModalidades): ${error}`,
        });
      }
    }
  }
  async findAllFiscales(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.fiscales';
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener los findAllFiscales`,
          message: `No se pudieron obtener los findAllFiscales Sin datos`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllFiscales) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findAllFiscales) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllFiscales): ${error}`,
          message: `Error del Servidor en (findAllFiscales): ${error}`,
        });
      }
    }
  }
  async findAllEstructuracostos(): Promise<Cuadro[]> {
    try {
      const sql = 'SELECT * FROM cuadro.estructuracostos LIMIT 10';
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener los findAllEstructuracostos`,
          message: `No se pudieron obtener los findAllEstructuracostos Sin datos`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllEstructuracostos) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findAllEstructuracostos) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllEstructuracostos): ${error}`,
          message: `Error del Servidor en (findAllEstructuracostos): ${error}`,
        });
      }
    }
  }
}
