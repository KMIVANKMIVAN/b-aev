import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';

import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
// import { PDFDocument } from 'pdfjs-dist/build/pdf';

// import { PDFDocument } from 'pdfjs-dist/build/pdf.mjs';
// import { PDFDocument } from 'pdf-lib';
// import * as PDFDocument from 'pdfkit';

import { Documentpdf } from './entities/documentpdf.entity';
import { Response } from 'express';
import * as path from 'path';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class DocumentpdfService {
  constructor(
    @InjectRepository(Documentpdf)
    private readonly documentpdfRepository: Repository<Documentpdf>,
    private connection: Connection,
    private httpService: HttpService,

    private configService: ConfigService,
  ) {}

  namePc = this.configService.get<string>('NAMEPC');

  async guardarPdf(
    file: Express.Multer.File,
    textToReplace: string,
    res: Response,
  ) {
    const existeArchivo = await this.buscarpdf(textToReplace);

    if (existeArchivo) {
      res.status(404).send('Ya Se Subio el Archivo');
      return;
    }
    if (file) {
      if (file.mimetype !== 'application/pdf') {
        // throw new BadRequestException('El archivo no es un PDF válido');
        res.status(404).send('El archivo no es un PDF válido');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        /* throw new BadRequestException(
          'El archivo excede el tamaño máximo de 10MB',
        ); */
        res.status(404).send('El archivo excede el tamaño máximo de 10MB');
        return;
      }

      const dateTime = this.obtenerFechaYHoraActual();
      const uniqueName = await this.concatenarNombreConFechaHora(
        dateTime,
        textToReplace,
      );
      const destinationPath = `/home/${this.namePc}/Documentos/${uniqueName}`;

      try {
        fs.writeFileSync(destinationPath, file.buffer);
        console.log(`PDF guardado en: ${destinationPath}`);

        const numero = this.obtenerParteNumerica(textToReplace);
        const isAEV = textToReplace.includes('-AEV');

        if (isAEV) {
          await this.actualizarRegistroEnBaseDeDatos(numero);
          console.log('a qui aev');
        } else {
          console.log('a qui busa');
          const dateTime = this.obtenerFechaYHoraActualSQL();
          console.log('a qui busa', dateTime);

          await this.actualizarRegistroEnBaseDeDatosBUSA(numero);
        }
        res.status(200).send('PDF guardado exitosamente');
      } catch (error) {
        res.status(404).send('Error durante la subida del archivo');
      }
    } else {
      res.status(404).send('No es un PDF válido');
    }
  }
  obtenerFechaYHoraActualSQL(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  obtenerParteNumerica(texto: string): string {
    const numerosEncontrados = texto.match(/\d+/); // Expresión regular para encontrar dígitos
    if (numerosEncontrados) {
      return numerosEncontrados[0]; // Devuelve la primera coincidencia encontrada
    }
    return ''; // En caso de no encontrar números, se devuelve una cadena vacía
  }

  async actualizarRegistroEnBaseDeDatos(numero: string): Promise<void> {
    // Aquí ejecutas el UPDATE en tu base de datos utilizando el número recibido
    try {
      const sql = `
        UPDATE desembolsos
        SET archivo = '${numero}'
        WHERE id = '${numero}';
      `;

      await this.connection.query(sql);
    } catch (error) {
      throw new Error(
        'Error al ejecutar la consulta SQL para actualizar el registro',
      );
    }
  }
  async actualizarRegistroEnBaseDeDatosBUSA(
    numero: string,
    // dateTime: string,
  ): Promise<void> {
    // Aquí ejecutas el UPDATE en tu base de datos utilizando el número recibido
    try {
      /* const sql = `
        UPDATE desembolsos
        SET archivo_busa = '${numero}',
        fecha_busa = '${dateTime}'
        WHERE id = '${numero}';
      `; */
      const sql = `
        UPDATE desembolsos
        SET archivo_busa = '${numero}'
        WHERE id = '${numero}';
      `;

      await this.connection.query(sql);
    } catch (error) {
      throw new Error(
        'Error al ejecutar la consulta SQL para actualizar el registro',
      );
    }
  }

  async downloadFile(fileName: string, res: Response): Promise<void> {
    const filesDirectory = `/home/${this.namePc}/Documentos/`;
    console.log('Valor de namePc:', this.namePc);
    try {
      const filesInDirectory = fs.readdirSync(filesDirectory);

      const matchingFiles = filesInDirectory.filter((file) =>
        file.includes(fileName),
      );

      if (matchingFiles.length === 0) {
        res.status(404).send('Error ¿Estas seguro de que se Subio el Archivo?');
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

    return `${day}-${month}-${year}`;
  }

  async concatenarNombreConFechaHora(
    dateTime: string,
    textToReplace: string,
  ): Promise<string> {
    let suffix = 0;
    let uniqueName = `${textToReplace}-${dateTime}.pdf`;

    while (
      await this.fileExists(`/home/${this.namePc}/Documentos/${uniqueName}`)
    ) {
      suffix++;
      uniqueName = `${textToReplace}-${dateTime}(${suffix}).pdf`;
    }

    return uniqueName;
  }

  async verPdf(fileName: string, res: Response): Promise<void> {
    const filesDirectory = `/home/${this.namePc}/Documentos/`;

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

      fileStream.on('error', () => {
        // console.error('Error al mostrar e  l archivo PDF:', error);
        res.status(404).send('Error al mostrar el archivo PDF');
      });
    } catch (error) {
      // console.error('Error al mostrar el archivo PDF:', error);
      res.status(404).send('Error al mostrar el archivo PDF');
    }
  }

  async verPdfByPartialName(partialName: string, res: Response): Promise<void> {
    const filesDirectory = `/home/${this.namePc}/Documentos/`;

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

      fileStream.on('error', () => {
        res.status(404).send('Error al mostrar el archivo PDF');
      });
    } catch (error) {
      res.status(404).send('Error al mostrar el archivo PDF');
    }
  }
  async buscarpdf(partialName: string): Promise<boolean | string> {
    const filesDirectory = `/home/${this.namePc}/Documentos/`;
    try {
      if (!fs.existsSync(filesDirectory)) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Directorio ${filesDirectory} NO Existe`,
          message: `Directorio ${filesDirectory} no fue encontrado en el S.O.`,
        });
      }
      const filesInDirectory = fs.readdirSync(filesDirectory);
      const matchingFile = filesInDirectory.find(
        (file) => file.includes(partialName) && file.endsWith('.pdf'),
      );
      if (matchingFile) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (buscarpdf): ${error}`,
          message: `Error del Servidor en (buscarpdf): ${error}`,
        });
      }
    }
  }
  async eliminarPdf(textToMatch: string, res: Response): Promise<void> {
    try {
      const filesDirectory = `/home/${this.namePc}/Documentos/`;
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

      const numero = this.obtenerParteNumerica(textToMatch);

      if (textToMatch.includes('-AEV')) {
        await this.actualizarRegistroEliminarEnBaseDeDatos(numero, 'archivo');
      } else if (textToMatch.includes('-BUSA')) {
        await this.actualizarRegistroEliminarEnBaseDeDatos(
          numero,
          'archivo_busa',
        );
      }

      res.send('Archivo eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el PDF:', error);
      res.status(404).send('Error al eliminar el archivo PDF');
    }
  }

  async actualizarRegistroEliminarEnBaseDeDatos(
    numero: string,
    campo: string,
  ): Promise<void> {
    const isnum = this.obtenerParteNumerica(numero);
    try {
      let sql = '';
      if (campo === 'archivo') {
        console.log('entro a aev');

        sql = `
          UPDATE desembolsos
          SET archivo = NULL
          WHERE id = '${isnum}';
        `;
      } else if (campo === 'archivo_busa') {
        console.log('entro a busa');

        sql = `
          UPDATE desembolsos
          SET archivo_busa = NULL
          WHERE id = '${isnum}';
        `;
      }

      await this.connection.query(sql);
    } catch (error) {
      throw new Error(
        'Error al ejecutar la consulta SQL para actualizar el registro',
      );
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
          LIMIT 4;
      `;
      const result = await this.connection.query(sql);
      if (result.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Vivienda Nueva ${buscar} NO Existe`,
          message: `Vivienda Nueva ${buscar} no fue encontrado`,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (signIn) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (signIn) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (signIn): ${error}`,
          message: `Error del Servidor en (signIn): ${error}`,
        });
      }
    }
  }

  async base64ToPdf(
    base64String: string,
    fileName: string,
    res: Response,
  ): Promise<void> {
    try {
      if (!this.verificarEnvioBanco(fileName)) {
        res.status(404).send('El archivo ya fue enviado al banco');
      }
      const existeArchivo = await this.buscarpdf(fileName);

      if (existeArchivo) {
        res.status(404).send('Ya Se Subio el Archivo');
        return;
      }

      try {
        const buffer = Buffer.from(base64String, 'base64');
        const filesDirectory = `/home/${this.namePc}/Documentos/`;
        const dateTime = this.obtenerFechaYHoraActual();
        const uniqueName = await this.concatenarNombreConFechaHora(
          dateTime,
          fileName, // Usar fileName en lugar de textToReplace
        );
        const destinationPath = `${filesDirectory}${uniqueName}`; // Generar la ruta con el nuevo nombre único

        console.log('Ruta del archivo:', destinationPath); // Verificar la ruta del archivo
        // Guardar el archivo PDF en la ruta especificada con el nuevo nombre único
        fs.writeFileSync(destinationPath, buffer);

        console.log('Archivo guardado correctamente:', destinationPath);

        console.log(`PDF guardado en: ${destinationPath}`);

        const numero = this.obtenerParteNumerica(fileName);
        const isAEV = fileName.includes('-AEV');

        if (isAEV) {
          await this.actualizarRegistroEnBaseDeDatos(numero);
          console.log('a qui aev');
        } else {
          await this.actualizarRegistroEnBaseDeDatosBUSA(numero);
        }
        res.status(200).send('PDF guardado exitosamente');
      } catch (error) {
        res.status(404).send('Error durante la subida del archivo try 0');
      }
    } catch (error) {
      console.error('Error al convertir Base64 a PDF:', error);

      res.status(404).send('Error durante la subida del archivo try');
    }
  }
  async enviarBanco(numero: string): Promise<string> {
    try {
      const buscarpdf = await this.buscarpdf(numero);
      const seEnvioBanco = await this.verificarEnvioBanco(numero);
      let columnaFecha = '';
      let mensajeExito = '';

      if (numero.includes('-AEV')) {
        columnaFecha = 'fecha_banco';
        mensajeExito = 'Se envió al BANCO';
      } else if (numero.includes('-BUSA')) {
        columnaFecha = 'fecha_busa';
        mensajeExito = 'Se envió a la AEV';
      } else {
        throw new Error('Número no tiene el formato adecuado');
      }

      if (!buscarpdf) {
        return 'No se ha subido el Instrucitvo y/o Anexos';
      }

      if (seEnvioBanco) {
        return 'Ya se envió al BANCO y/o AEV';
      }

      const sql = `
        UPDATE desembolsos
        SET ${columnaFecha} = '${this.obtenerFechaYHoraActualSQL()}'
        WHERE id = '${numero}';
      `;

      await this.connection.query(sql);
      return mensajeExito;
    } catch (error) {
      throw new Error(
        'Error al ejecutar la consulta SQL para actualizar el registro',
      );
    }
  }

  async verificarEnvioBanco(numero: string): Promise<boolean> {
    try {
      const idnum = this.obtenerParteNumerica(numero);
      if (numero.includes('-AEV')) {
        const sql = `SELECT d.fecha_banco FROM desembolsos d WHERE d.id = '${idnum}'`;
        const result = await this.connection.query(sql);
        return result[0].fecha_banco !== null;
      } else if (numero.includes('-BUSA')) {
        const sql = `SELECT d.fecha_busa FROM desembolsos d WHERE d.id = '${idnum}'`;
        const result = await this.connection.query(sql);
        return result[0].fecha_busa !== null;
      } else {
        throw new Error('Número no tiene el formato adecuado');
      }
    } catch (error) {
      throw new Error(
        'Error al ejecutar la consulta SQL para obtener los datos',
      );
    }
  }
}
