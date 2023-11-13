import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';

import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';

import { Documentpdf } from './entities/documentpdf.entity';

@Injectable()
export class DocumentpdfService {
  constructor(
    @InjectRepository(Documentpdf)
    private readonly documentpdfRepository: Repository<Documentpdf>,
    private connection: Connection,
    private httpService: HttpService,
  ) {}
  async guardarPdf(file: Express.Multer.File) {
    if (file) {
      if (file.mimetype !== 'application/pdf') {
        throw new BadRequestException('El archivo no es un PDF válido');
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new BadRequestException(
          'El archivo excede el tamaño máximo de 10MB',
        );
      }

      const dateTime = this.obtenerFechaYHoraActual();
      const uniqueName = await this.concatenarNombreConFechaHora(dateTime);
      const destinationPath = '/home/vancc369/Documentos/' + uniqueName;

      try {
        fs.writeFileSync(destinationPath, file.buffer);
        console.log(`PDF guardado en: ${destinationPath}`);
        return { success: true, message: 'PDF guardado exitosamente' };
      } catch (error) {
        console.error('Error al guardar el PDF:', error);
        return { success: false, message: 'Error al guardar el PDF' };
      }
    } else {
      console.log('No se recibió ningún archivo.');
      return { success: false, message: 'No se recibió ningún archivo' };
    }
  }

  obtenerFechaYHoraActual(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
  }

  async concatenarNombreConFechaHora(dateTime: string) {
    return `haciendopruebas-${dateTime}.pdf`;
  }

  async buscarViviendaNueva(buscar: string): Promise<Documentpdf[]> {
    try {
      const sql = `
        SELECT * FROM (
          SELECT * FROM datoscontrato
          WHERE proy_cod LIKE '%${buscar}%' OR cont_des LIKE '%${buscar}%'
          UNION
          SELECT * FROM contratosigepro
          WHERE proy_cod LIKE '%${buscar}%' OR cont_des LIKE '%${buscar}%'
          ) AS resultados
          ORDER BY RAND()
          LIMIT 10;
      `;

      const result = await this.connection.query(sql);
      return result;
    } catch (error) {
      console.error('Error al obtener Datoscontrato:', error.message);
      throw new Error(
        'No se pudieron obtener los Datoscontrato. Detalles en el registro.',
      );
    }
  }
}
