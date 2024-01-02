import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';

import { HttpService } from '@nestjs/axios';

import { Datoscontrato } from './entities/datoscontrato.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatoscontratoService {
  constructor(
    @InjectRepository(Datoscontrato)
    private readonly datoscontratoRepository: Repository<Datoscontrato>,
    private connection: Connection,
    private httpService: HttpService,

    private configService: ConfigService,
  ) {}
  namePc = this.configService.get<string>('NAMEPC');

  findAll(): Promise<Datoscontrato[]> {
    const url = 'http://sitahu.aevivienda.gob.bo/ServicioWeb/vigente/4760619';
    const authorizationToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF9kZXZpY2VpbmciOjEsImluc3RpdHV0aW9uIjoiQWdlbmNpYSBFc3RhdGFsIGRlIFZpdmllbmRhIiwic3lzdGVtIjoiVmlcdTAwZTF0aWNvcyIsImRhdGFjcmVhdGVkIjoxNjY4MTg1OTI2LCJkYXRlZmluaXNoZWQiOjAsIkFQSV9USU1FIjoxNjY4MTg1OTI2fQ.iMvwfyzUolxC_fpRjY606ZHNkWU0WlX4jyykCgv-Xus';

    const headers = {
      Authorization: `Bearer ${authorizationToken}`,
    };
    const headers2 = {
      Authorization: authorizationToken,
    };

    console.log('000 ', headers);
    console.log('111 ', headers2);

    const requestOptions = {
      headers: headers,
    };

    console.log('222 ', requestOptions);

    return this.httpService
      .get(url, requestOptions)
      .toPromise()
      .then((response) => {
        return response.data as Datoscontrato[];
      })
      .catch((error) => {
        throw error;
      });
  }

  async findAllDatosContrato(): Promise<Datoscontrato[]> {
    try {
      const sql = `
        SELECT * FROM datoscontrato
        UNION
        SELECT * FROM contratosigepro
      `;
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener los findAllDatosContrato`,
          message: `No se pudieron obtener los findAllDatosContrato Sin datos`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllDatosContrato) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findAllDatosContrato) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllDatosContrato): ${error}`,
          message: `Error del Servidor en (findAllDatosContrato): ${error}`,
        });
      }
    }
  }

  async findOne(id: number): Promise<Datoscontrato> {
    try {
      const datoscontrato = await this.datoscontratoRepository.findOne({
        where: { id },
      });
      if (!datoscontrato) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Datoscontrato con ID ${id} no encontrado`,
          message: `Datoscontrato con ID ${id} no encontrado`,
        });
      }
      return datoscontrato;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOne): ${error}`,
          message: `Error del Servidor en (findOne): ${error}`,
        });
      }
    }
  }
  async findOneContCod(contcod: string): Promise<Datoscontrato> {
    try {
      const sql = `
        (SELECT *
        FROM planillasporcontrato
        WHERE cont = ?
        AND activo = 1
        )
        UNION
        (SELECT *
        FROM planillasigepro
        WHERE cont = ?
        AND activo = 1
        )
        UNION
        (SELECT *
        FROM planillascierresaldo
        WHERE cont = ?
        ) ORDER BY orden ASC
      `;
      const result = await this.connection.query(sql, [
        contcod,
        contcod,
        contcod,
      ]);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Vivienda Nueva ${contcod} NO Existe`,
          message: `Vivienda Nueva ${contcod} no se encontraron datos`,
        });
      }
      return result;
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

  async findOneContCodCompleja(contcod: string): Promise<any> {
    try {
      const datosContCod = await this.findOneContCod(contcod);
      if (datosContCod !== null && datosContCod !== undefined) {
        const sql = `
          SELECT 
          *,
          d.id AS iddesem,
          DATE_FORMAT(d.fecha_generado, '%d/%m/%Y') AS fechagenerado,
          DATE_FORMAT(d.fecha_banco, '%d/%m/%Y') AS fechabanco,
          d.monto_desembolsado,
          d.id,
          tp.detalle,
          tc.titular,
          tc.cuentatitular
          FROM desembolsos d
          INNER JOIN etapas e ON d.estado = e.id
          LEFT JOIN tipoplanillas tp ON d.tipo_planilla = tp.id
          LEFT JOIN titularcuenta tc ON d.idcuenta = tc.id 
          WHERE d.estado = 6
          AND d.cont_cod = ?
        `;
        const result = await this.connection.query(sql, [contcod]);
        const ids = result.map((data: any) => data.id);
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
        if (resultWithButtons.length === 0) {
          throw new BadRequestException({
            statusCode: 400,
            error: `Vivienda Nueva con ${contcod} NO Existe`,
            message: `Vivienda Nueva con ${contcod} no fueron encontrados`,
          });
        }
        return resultWithButtons;
      } else {
        throw new BadRequestException({
          statusCode: 400,
          error: `Vivienda Nueva con ${contcod} NO Existe`,
          message: `Vivienda Nueva con ${contcod} no fue encontrado`,
        });
      }
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
      const idnum = numero;
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
        return result[0].fecha_banco !== null;
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
        return result[0].fecha_busa !== null;
      } else {
        throw new BadRequestException({
          statusCode: 400,
          error: `Número no tiene el formato adecuado`,
          message: `Número no tiene el formato adecuados`,
        });
      }
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
  async findOneContCodCompleja2(contcod: string): Promise<Datoscontrato[]> {
    try {
      const sql = `
      SELECT 
      *,
      d.id AS iddesem,
      DATE_FORMAT(d.fecha_generado, '%d/%m/%Y') AS fechagenerado,
      DATE_FORMAT(d.fecha_banco, '%d/%m/%Y') AS fechabanco,
      d.monto_desembolsado,
      d.id,
      tp.detalle,
      tc.titular,
      tc.cuentatitular
  FROM desembolsos d
  INNER JOIN etapas e ON d.estado = e.id
  LEFT JOIN tipoplanillas tp ON d.tipo_planilla = tp.id
  LEFT JOIN titularcuenta tc ON d.idcuenta = tc.id  -- Uniendo con titularcuenta
  WHERE d.estado = 6
      AND d.cont_cod = ?
      AND d.fecha_banco IS NOT NULL
      AND d.archivo IS NOT NULL;
      `;
      const result = await this.connection.query(sql, [contcod]);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener datos para el codigo: ${contcod}`,
          message: `No se pudieron obtener datos para el codigo: ${contcod}`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOneContCodCompleja2) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findOneContCodCompleja2) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOneContCodCompleja2): ${error}`,
          message: `Error del Servidor en (findOneContCodCompleja2): ${error}`,
        });
      }
    }
  }

  async findOneCodigo(codigo: string): Promise<Datoscontrato[]> {
    try {
      const sql = `
        SELECT * FROM (
          SELECT * FROM datoscontrato
          WHERE proy_cod LIKE ?
          UNION
          SELECT * FROM contratosigepro
          WHERE proy_cod LIKE ?
        ) AS combined_data
        ORDER BY RAND()
        LIMIT 10
      `;
      const result = await this.connection.query(sql, [
        `%${codigo}%`,
        `%${codigo}%`,
      ]);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener datos para el codigo: ${codigo}`,
          message: `No se pudieron obtener datos para el codigo: ${codigo}`,
        });
      }
      return result;
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

  async findOneNomProy(nomproy: string): Promise<Datoscontrato[]> {
    try {
      const sql = `
        SELECT * FROM (
          SELECT * FROM datoscontrato
          WHERE cont_des LIKE ?
          UNION
          SELECT * FROM contratosigepro
          WHERE cont_des LIKE ?
        ) AS combined_data
        ORDER BY RAND()
        LIMIT 10
      `;
      const result = await this.connection.query(sql, [
        `%${nomproy}%`,
        `%${nomproy}%`,
      ]);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener datos para el codigo: ${nomproy}`,
          message: `No se pudieron obtener datos para el codigo: ${nomproy}`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOneNomProy) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findOneNomProy) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOneNomProy): ${error}`,
          message: `Error del Servidor en (findOneNomProy): ${error}`,
        });
      }
    }
  }

  async findOneDepart(depdes: string): Promise<Datoscontrato[]> {
    try {
      const sql = `
        SELECT * FROM (
          SELECT * FROM datoscontrato
          WHERE depa_des LIKE ?
          UNION
          SELECT * FROM contratosigepro
          WHERE depa_des LIKE ?
        ) AS combined_data
        ORDER BY RAND()
        LIMIT 10
      `;
      const result = await this.connection.query(sql, [
        `%${depdes}%`,
        `%${depdes}%`,
      ]);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener datos para el codigo: ${depdes}`,
          message: `No se pudieron obtener datos para el codigo: ${depdes}`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOneDepart) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findOneDepart) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOneDepart): ${error}`,
          message: `Error del Servidor en (findOneDepart): ${error}`,
        });
      }
    }
  }

  async filtrarViviendaNueva(
    codigo: string,
    nomproy: string,
    depdes: string,
  ): Promise<Datoscontrato[]> {
    try {
      const conditions = [];
      const values = [];
      if (codigo) {
        conditions.push('proy_cod LIKE ?');
        values.push(`%${codigo}%`);
      }
      if (nomproy) {
        conditions.push('cont_des LIKE ?');
        values.push(`%${nomproy}%`);
      }
      if (depdes) {
        conditions.push('depa_des LIKE ?');
        values.push(`%${depdes}%`);
      }
      const whereClause =
        conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
      const sql = `
        (SELECT * FROM datoscontrato
        ${whereClause}
        ORDER BY RAND()
        LIMIT 10)
        UNION
        (SELECT * FROM contratosigepro
        ${whereClause}
        ORDER BY RAND()
        LIMIT 10)
      `;
      const result = await this.connection.query(sql, values.concat(values));
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener datos para el codigo: ${depdes}, ${nomproy}, ${codigo}`,
          message: `No se pudieron obtener datos para el codigo: ${depdes}, ${nomproy}, ${codigo}`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (filtrarViviendaNueva) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (filtrarViviendaNueva) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (filtrarViviendaNueva): ${error}`,
          message: `Error del Servidor en (filtrarViviendaNueva): ${error}`,
        });
      }
    }
  }
  async buscarViviendaNueva(buscar: string): Promise<Datoscontrato[]> {
    try {
      const matchCodigo = buscar.match(/codigo>(.*?)</);
      const codigo = matchCodigo ? matchCodigo[1] : '';

      const matchNomproy = buscar.match(/<nomproy>(.*?)</);
      const nomproy = matchNomproy ? matchNomproy[1] : '';

      const matchDepdes = buscar.match(/<depdes>(.*)/);
      const depdes = matchDepdes ? matchDepdes[1] : '';

      const conditions = [];
      const values = [];

      if (codigo) {
        conditions.push('proy_cod LIKE ?');
        values.push(`%${codigo}%`);
      }

      if (nomproy) {
        conditions.push('cont_des LIKE ?');
        values.push(`%${nomproy}%`);
      }

      if (depdes) {
        conditions.push('depa_des LIKE ?');
        values.push(`%${depdes}%`);
      }

      const whereClause =
        conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

      const sql = `
      (SELECT * FROM datoscontrato
      ${whereClause}
      ORDER BY RAND()
      LIMIT 5) 
      UNION
      (SELECT * FROM contratosigepro
      ${whereClause}
      ORDER BY RAND()
      LIMIT 5) 
    `;
      const result = await this.connection.query(sql, values.concat(values));
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se pudieron obtener datos para el codigo: ${buscar}`,
          message: `No se pudieron obtener datos para el codigo: ${buscar}`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (buscarViviendaNueva) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (buscarViviendaNueva) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (buscarViviendaNueva): ${error}`,
          message: `Error del Servidor en (buscarViviendaNueva): ${error}`,
        });
      }
    }
  }
}
