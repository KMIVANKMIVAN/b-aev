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
  // async guardarPdf(file: Express.Multer.File, textToReplace: string) {
  //   if (file) {
  //     if (file.mimetype !== 'application/pdf') {
  //       throw new BadRequestException('El archivo no es un PDF válido');
  //     }

  //     if (file.size > 10 * 1024 * 1024) {
  //       throw new BadRequestException(
  //         'El archivo excede el tamaño máximo de 10MB',
  //       );
  //     }

  //     const dateTime = this.obtenerFechaYHoraActual();
  //     /* const uniqueName = await this.concatenarNombreConFechaHora(
  //       dateTime,
  //       textToReplace,
  //     );
  //     const destinationPath = '/home/van369/Documentos/' + uniqueName; */
  //     const uniqueName = await this.concatenarNombreConFechaHora(
  //       dateTime,
  //       textToReplace,
  //     );
  //     const destinationPath = `/home/van369/Documentos/${uniqueName}`;

  //     try {
  //       fs.writeFileSync(destinationPath, file.buffer);
  //       console.log(`PDF guardado en: ${destinationPath}`);
  //       return { success: true, message: 'PDF guardado exitosamente' };
  //     } catch (error) {
  //       console.error('Error al guardar el PDF:', error);
  //       return { success: false, message: 'Error al guardar el PDF' };
  //     }
  //   } else {
  //     console.log('No se recibió ningún archivo.');
  //     return { success: false, message: 'No se recibió ningún archivo' };
  //   }
  // }

  async downloadFile(fileName: string, res: Response): Promise<void> {
    const filesDirectory = '/home/van369/Documentos/';
    const destinationDirectory = '/home/van369/Documentos/descargador/';

    try {
      const filesInDirectory = fs.readdirSync(filesDirectory);

      const matchingFiles = filesInDirectory.filter((file) =>
        file.includes(fileName),
      );

      if (matchingFiles.length === 0) {
        throw new BadRequestException('No se encontró el archivo');
      }

      let fileToDownload = matchingFiles[0]; // Tomar el primer archivo coincidente

      const filePath = `${filesDirectory}${fileToDownload}`;
      let destinationPath = `${destinationDirectory}${fileToDownload}`;

      if (await this.fileExists(destinationPath)) {
        // Lógica para agregar sufijo si el archivo ya existe
        let suffix = 1;
        let newFileName = this.addSuffixToFileName(fileToDownload, suffix);
        let newDestinationPath = `${destinationDirectory}${newFileName}`;

        while (await this.fileExists(newDestinationPath)) {
          suffix++;
          newFileName = this.addSuffixToFileName(fileToDownload, suffix);
          newDestinationPath = `${destinationDirectory}${newFileName}`;
        }

        fileToDownload = newFileName;
        destinationPath = newDestinationPath;
      }

      // Configurar el tipo y la disposición del contenido directamente en la respuesta
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${fileToDownload}`,
      );

      // Crear un stream de lectura del archivo y enviarlo como respuesta
      const fileStream = fs.createReadStream(filePath);

      // Pipe también a la respuesta para enviar al cliente
      const writeStream = fs.createWriteStream(destinationPath);
      fileStream.pipe(writeStream);

      fileStream.on('end', () => {
        res.end();
      });

      fileStream.on('error', (error) => {
        console.error('Error during file download:', error);
        throw new BadRequestException('Error during file download');
      });
    } catch (error) {
      console.error('Error during file download:', error);
      throw new BadRequestException('Error during file download');
    }
  }

  private addSuffixToFileName(fileName: string, suffix: number): string {
    const fileParts = fileName.split('.');
    const fileBaseName = fileParts.slice(0, -1).join('.');
    const fileExtension = fileParts[fileParts.length - 1];
    return `${fileBaseName}(${suffix})${fileExtension}`;
  }

  /* async downloadFile(fileName: string, res: Response): Promise<void> {
    const filePath = `/home/van369/Documentos/${fileName}`;
    let destinationPath = `/home/van369/Documentos/descargador/${fileName}`;

    if (await this.fileExists(destinationPath)) {
      let suffix = 1;
      let newFileName = this.addSuffixToFileName(fileName, suffix);
      let newDestinationPath = `/home/van369/Documentos/descargador/${newFileName}`;

      while (await this.fileExists(newDestinationPath)) {
        suffix++;
        newFileName = this.addSuffixToFileName(fileName, suffix);
        newDestinationPath = `/home/van369/Documentos/descargador/${newFileName}`;
      }

      fileName = newFileName;
      destinationPath = newDestinationPath;
    }

    try {
      // Configurar el tipo y la disposición del contenido directamente en la respuesta
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

      // Crear un stream de lectura del archivo y enviarlo como respuesta
      const fileStream = fs.createReadStream(filePath);

      // Pipe también a la respuesta para enviar al cliente
      const writeStream = fs.createWriteStream(destinationPath);
      fileStream.pipe(writeStream);

      fileStream.on('end', () => {
        res.end();
      });

      fileStream.on('error', (error) => {
        console.error('Error during file download:', error);
        throw new BadRequestException('Error during file download');
      });
    } catch (error) {
      console.error('Error during file download:', error);
      throw new BadRequestException('Error during file download');
    }
  } */

  private fileExists(filePath: string): Promise<boolean> {
    return new Promise((resolve) => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
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
