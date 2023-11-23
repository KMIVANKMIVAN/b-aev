import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { HttpService } from '@nestjs/axios';

import { Datoscontrato } from './entities/datoscontrato.entity';

@Injectable()
export class DatoscontratoService {
  constructor(
    @InjectRepository(Datoscontrato)
    private readonly datoscontratoRepository: Repository<Datoscontrato>,
    private connection: Connection,
    private httpService: HttpService,
  ) {}

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
      return result;
    } catch (error) {
      throw new Error('No se pudieron obtener los Datoscontrato.');
    }
  }

  async findOne(id: number): Promise<Datoscontrato> {
    const datoscontrato = await this.datoscontratoRepository.findOne({
      where: { id },
    });

    if (!datoscontrato) {
      throw new NotFoundException(`Datoscontrato con ID ${id} no encontrado`);
    }

    return datoscontrato;
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
      return result;
    } catch (error) {
      throw new Error('No se pudieron obtener los Datoscontrato.');
    }
  }

  async findOneContCodCompleja(contcod: string): Promise<Datoscontrato[]> {
    try {
      const sql = `
      SELECT 
      *,
      d.id AS iddesem,
      DATE_FORMAT(d.fecha_generado, '%d/%m/%Y') AS fechagenerado,
      DATE_FORMAT(d.fecha_banco, '%d/%m/%Y') AS fechabanco,
      d.monto_desembolsado,
      d.id,
      tp.detalle,  -- Este es el campo 'detalle' que quieres obtener de 'tipoplanillas'
      tc.titular,
      tc.cuentatitular
  FROM desembolsos d
  INNER JOIN etapas e ON d.estado = e.id
  LEFT JOIN tipoplanillas tp ON d.tipo_planilla = tp.id
  LEFT JOIN titularcuenta tc ON d.idcuenta = tc.id  -- Uniendo con titularcuenta
  WHERE d.estado = 6
      AND d.cont_cod = ?
      AND NOT ISNULL(d.fecha_banco)
      AND ISNULL(d.archivo);
  
      `;
      /* const sql = `
        SELECT 
          *, 
          d.id AS iddesem,
          DATE_FORMAT(d.fecha_generado,'%d/%m/%Y') AS fechagenerado,
          DATE_FORMAT(d.fecha_banco,'%d/%m/%Y') AS fechabanco,
          d.monto_desembolsado,
          d.id
        FROM desembolsos d
        INNER JOIN etapas e ON d.estado = e.id
        WHERE d.estado = 6
        AND d.cont_cod = ?
        AND NOT ISNULL(d.fecha_banco) 
        AND ISNULL(d.archivo);
      `; */

      const result = await this.connection.query(sql, [contcod]);
      return result;
    } catch (error) {
      throw new Error('No se pudieron obtener los Datoscontrato.');
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
      return result;
    } catch (error) {
      throw new Error('No se pudieron obtener los Datoscontrato.');
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

      return result;
    } catch (error) {
      throw new Error('No se pudieron obtener los Datoscontrato.');
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

      return result;
    } catch (error) {
      throw new Error('No se pudieron obtener los Datoscontrato.');
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

      return result;
    } catch (error) {
      throw new Error('No se pudieron obtener los Datoscontrato.');
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

      console.log('111 ', codigo);
      console.log('222 ', nomproy);
      console.log('333 ', depdes);

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

      return result;
    } catch (error) {
      throw new Error('No se pudieron obtener los Datoscontrato.');
    }
  }
}
