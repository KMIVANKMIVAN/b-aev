import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';

import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';

import { Documentpdf } from './entities/documentpdf.entity';
import { Response } from 'express';
import * as path from 'path';

@Injectable()
export class DocumentpdfService {
  constructor(
    @InjectRepository(Documentpdf)
    private readonly documentpdfRepository: Repository<Documentpdf>,
    private connection: Connection,
    private httpService: HttpService,
  ) {}

  async guardarPdf(
    file: Express.Multer.File,
    textToReplace: string,
    res: Response,
  ) {
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
      const uniqueName = await this.concatenarNombreConFechaHora(
        dateTime,
        textToReplace,
      );
      const destinationPath = `/home/van369/Documentos/${uniqueName}`;

      try {
        fs.writeFileSync(destinationPath, file.buffer);
        console.log(`PDF guardado en: ${destinationPath}`);

        // Configurar la respuesta con el archivo PDF recién guardado
        const fileStream = fs.createReadStream(destinationPath);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
          'Content-Disposition',
          `attachment; filename=${uniqueName}`,
        );
        fileStream.pipe(res); // Enviar el archivo PDF como respuesta

        return { success: true, message: 'PDF guardado exitosamente' };
      } catch (error) {
        console.error('Error al guardar el PDF:', error);
        throw new BadRequestException('Error al guardar el PDF');
      }
    } else {
      console.log('No se recibió ningún archivo.');
      return { success: false, message: 'No se recibió ningún archivo' };
    }
  }

  async downloadFile(fileName: string, res: Response): Promise<void> {
    const filesDirectory = '/home/van369/Documentos/';

    try {
      const filesInDirectory = fs.readdirSync(filesDirectory);

      const matchingFiles = filesInDirectory.filter((file) =>
        file.includes(fileName),
      );

      if (matchingFiles.length === 0) {
        res
          .status(404)
          .send(
            'El archivo solicitado no se encontró ¿Estas seguro de que se Subio el Archivo?',
          );
        return;
      }

      const fileToDownload = matchingFiles[0];
      const filePath = `${filesDirectory}${fileToDownload}`;

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${fileToDownload}`,
      );

      const fileStream = fs.createReadStream(filePath);

      fileStream.pipe(res);

      fileStream.on('end', () => {
        res.end();
      });

      fileStream.on('error', (error) => {
        console.error('Error durante la descarga del archivo:', error);
        res.status(404).send('Error durante la descarga del archivo');
      });
    } catch (error) {
      console.error('Error durante la descarga del archivo:', error);
      res.status(404).send('Error durante la descarga del archivo');
    }
  }

  private addSuffixToFileName(fileName: string, suffix: number): string {
    const fileParts = fileName.split('.');
    const fileBaseName = fileParts.slice(0, -1).join('.');
    const fileExtension = fileParts[fileParts.length - 1];
    return `${fileBaseName}(${suffix})${fileExtension}`;
  }

  private fileExists(filePath: string): Promise<boolean> {
    return new Promise((resolve) => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
  }

  obtenerFechaYHoraActual(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return `${year}-${month}-${day}`;
  }

  async concatenarNombreConFechaHora(
    dateTime: string,
    textToReplace: string,
  ): Promise<string> {
    let suffix = 0;
    let uniqueName = `${textToReplace}-${dateTime}.pdf`;

    while (await this.fileExists(`/home/van369/Documentos/${uniqueName}`)) {
      suffix++;
      uniqueName = `${textToReplace}-${dateTime}(${suffix}).pdf`;
    }

    return uniqueName;
  }

  async verPdf(fileName: string, res: Response): Promise<void> {
    const filesDirectory = '/home/van369/Documentos/';

    try {
      const filesInDirectory = fs.readdirSync(filesDirectory);

      const matchingFiles = filesInDirectory.filter((file) =>
        file.includes(fileName),
      );

      if (matchingFiles.length === 0) {
        res
          .status(404)
          .send(
            'El archivo solicitado no se encontró (Estas seguro de que se Subio el Archivo?)',
          );
        return;
      }

      const fileToView = matchingFiles[0];
      const filePath = `${filesDirectory}${fileToView}`;

      res.setHeader('Content-Type', 'application/pdf');

      const fileStream = fs.createReadStream(filePath);

      fileStream.pipe(res);

      fileStream.on('end', () => {
        res.end();
      });

      fileStream.on('error', (error) => {
        // console.error('Error al mostrar e  l archivo PDF:', error);
        res.status(404).send('Error al mostrar el archivo PDF');
      });
    } catch (error) {
      // console.error('Error al mostrar el archivo PDF:', error);
      res.status(404).send('Error al mostrar el archivo PDF');
    }
  }

  async verPdfByPartialName(partialName: string, res: Response): Promise<void> {
    const filesDirectory = '/home/van369/Documentos/';

    try {
      const filesInDirectory = fs.readdirSync(filesDirectory);

      const matchingFile = filesInDirectory.find((file) =>
        file.includes(partialName),
      );

      if (!matchingFile) {
        res
          .status(404)
          .send(
            'El archivo solicitado no se encontró (¿Estás seguro de que el archivo ha sido subido?)',
          );
        return;
      }

      const filePath = path.join(filesDirectory, matchingFile);

      res.setHeader('Content-Type', 'application/pdf');

      const fileStream = fs.createReadStream(filePath);

      fileStream.pipe(res);

      fileStream.on('end', () => {
        res.end();
      });

      fileStream.on('error', (error) => {
        res.status(404).send('Error al mostrar el archivo PDF');
      });
    } catch (error) {
      res.status(404).send('Error al mostrar el archivo PDF');
    }
  }

  async eliminarPdf(textToMatch: string, res: Response): Promise<void> {
    const filesDirectory = '/home/van369/Documentos/';

    try {
      const filesInDirectory = fs.readdirSync(filesDirectory);

      const matchingFile = filesInDirectory.find((file) =>
        file.startsWith(textToMatch),
      );

      if (!matchingFile) {
        console.error('El archivo no se encontró');
        res.status(404).send('El archivo no se encontró');
        return;
      }

      const filePath = path.join(filesDirectory, matchingFile);

      // Eliminar el archivo
      fs.unlinkSync(filePath);
      console.log(`PDF eliminado: ${matchingFile}`);
      res.send('Archivo eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el PDF:', error);
      res.status(404).send('Error al eliminar el archivo PDF');
    }
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
