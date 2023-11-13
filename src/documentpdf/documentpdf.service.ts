import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';

import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';

import { Documentpdf } from './entities/documentpdf.entity';
import { Response } from 'express';
@Injectable()
export class DocumentpdfService {
  constructor(
    @InjectRepository(Documentpdf)
    private readonly documentpdfRepository: Repository<Documentpdf>,
    private connection: Connection,
    private httpService: HttpService,
  ) {}
  async guardarPdf(file: Express.Multer.File, textToReplace: string) {
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
      /* const uniqueName = await this.concatenarNombreConFechaHora(
        dateTime,
        textToReplace,
      );
      const destinationPath = '/home/van369/Documentos/' + uniqueName; */
      const uniqueName = await this.concatenarNombreConFechaHora(
        dateTime,
        textToReplace,
      );
      const destinationPath = `/home/van369/Documentos/${uniqueName}`;

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

  async downloadFile(fileName: string, res: Response): Promise<void> {
    // Intenta agregar un sufijo numérico si el archivo ya existe
    let suffix = 0;
    let filePath = `/home/van369/Documentos/${fileName}`;
    const destinationPath = `/home/van369/Documentos/descargador/${fileName}`;

    while (!(await this.fileExists(filePath))) {
      if (suffix === 0) {
        console.error(`File not found: ${filePath}`);
        throw new BadRequestException('File not found');
      }

      suffix++;
      filePath = `/home/van369/Documentos/${this.addSuffixToFileName(
        fileName,
        suffix,
      )}`;
    }

    try {
      // Configurar el tipo y la disposición del contenido directamente en la respuesta
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

      // Crear un stream de lectura del archivo y enviarlo como respuesta
      const fileStream = fs.createReadStream(filePath);

      // Cambiar la ruta de destino al escribir el archivo
      const writeStream = fs.createWriteStream(destinationPath);
      fileStream.pipe(writeStream);

      // Pipe también a la respuesta para enviar al cliente
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error during file download:', error);
      throw new BadRequestException('Error during file download');
    }
  }

  private fileExists(filePath: string): Promise<boolean> {
    return new Promise((resolve) => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
  }

  private addSuffixToFileName(fileName: string, suffix: number): string {
    const fileParts = fileName.split('.');
    const fileBaseName = fileParts[0];
    const fileExtension = fileParts[1];
    return `${fileBaseName}(${suffix}).${fileExtension}`;
  }

  /* async guardarPdf(file: Express.Multer.File) {
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
      const destinationPath = '/home/van369/Documentos/' + uniqueName;

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
  } */

  /* obtenerFechaYHoraActual(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
  } */
  obtenerFechaYHoraActual(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return `${year}-${month}-${day}`;
  }

  /* async concatenarNombreConFechaHora(dateTime: string, textToReplace: string) {
    return `${textToReplace}-${dateTime}.pdf`;
  } */
  async concatenarNombreConFechaHora(
    dateTime: string,
    textToReplace: string,
  ): Promise<string> {
    // Se intentará agregar un sufijo numérico si el archivo ya existe
    let suffix = 0;
    let uniqueName = `${textToReplace}-${dateTime}.pdf`;

    while (await this.fileExists(`/home/van369/Documentos/${uniqueName}`)) {
      suffix++;
      uniqueName = `${textToReplace}-${dateTime}(${suffix}).pdf`;
    }

    return uniqueName;
  }

  /* async concatenarNombreConFechaHora(dateTime: string) {
    return `haciendopruebas-${dateTime}.pdf`;
  } */

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
