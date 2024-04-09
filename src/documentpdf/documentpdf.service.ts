import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';

import * as fs from 'fs';

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

    private configService: ConfigService,
  ) { }

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
        res.status(404).send('El archivo no es un PDF válido');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
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
        const numero = this.obtenerParteNumerica(textToReplace);
        const isAEV = textToReplace.includes('-AEV');

        if (isAEV) {
          await this.actualizarRegistroEnBaseDeDatos(numero);
        } else {
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
    const numerosEncontrados = texto.match(/\d+/);
    if (numerosEncontrados) {
      return numerosEncontrados[0];
    }
    return '';
  }

  async actualizarRegistroEnBaseDeDatos(numero: string): Promise<void> {
    try {
      const sql = `
        UPDATE desembolsos
        SET archivo = '${numero}'
        WHERE id = '${numero}';
      `;
      await this.connection.query(sql);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (actualizarRegistroEnBaseDeDatos) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (actualizarRegistroEnBaseDeDatos) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (actualizarRegistroEnBaseDeDatos): ${error}`,
          message: `Error del Servidor en (actualizarRegistroEnBaseDeDatos): ${error}`,
        });
      }
    }
  }
  async actualizarRegistroEnBaseDeDatosBUSA(numero: string): Promise<void> {
    try {
      const sql = `
        UPDATE desembolsos
        SET archivo_busa = '${numero}'
        WHERE id = '${numero}';
      `;
      await this.connection.query(sql);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (actualizarRegistroEnBaseDeDatosBUSA) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (actualizarRegistroEnBaseDeDatosBUSA) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (actualizarRegistroEnBaseDeDatosBUSA): ${error}`,
          message: `Error del Servidor en (actualizarRegistroEnBaseDeDatosBUSA): ${error}`,
        });
      }
    }
  }

  async downloadFile(
    nomCarperta: string,
    fileName: string,
    res: Response,
  ): Promise<void> {
    console.log('---->', nomCarperta);

    const filesDirectory = `/home/${this.namePc}/Documentos/${nomCarperta}/${fileName}/`;
    try {
      const filesInDirectory = fs.readdirSync(filesDirectory);

      const matchingFiles = filesInDirectory.filter((file) =>
        file.includes(fileName),
      );

      if (matchingFiles.length === 0) {
        res.status(404).send('Conflicto ¿Estas seguro de que se Subio el Archivo?');
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
        res.status(404).send('Conflicto durante la descarga del archivo');
      });
    } catch (error) {
      console.error('Error durante la descarga del archivo:', error);
      res.status(404).send('Conflicto durante la descarga del archivo');
    }
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
        res.status(404).send('Conflicto al mostrar el archivo PDF');
      });
    } catch (error) {
      res.status(404).send('Conflicto al mostrar el archivo PDF');
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
        res.status(404).send('Conflicto al mostrar el archivo PDF');
      });
    } catch (error) {
      res.status(404).send('Conflicto al mostrar el archivo PDF');
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
  async eliminarPdf(
    nomCarperta: string,
    fileName: string,
    res: Response,
  ): Promise<void> {
    try {
      const filesDirectory = `/home/${this.namePc}/Documentos/${nomCarperta}/${fileName}/`;
      const filesInDirectory = fs.readdirSync(filesDirectory);

      const matchingFile = filesInDirectory.find((file) =>
        file.startsWith(fileName),
      );

      if (!matchingFile) {
        console.error('El archivo no se encontró');
        res.status(404).send('El archivo no se encontró');
        return;
      }

      const filePath = path.join(filesDirectory, matchingFile);

      fs.unlinkSync(filePath);

      const numero = this.obtenerParteNumerica(fileName);

      if (fileName.includes('-AEV')) {
        await this.actualizarRegistroEliminarEnBaseDeDatos(numero, 'archivo');
      } else if (fileName.includes('-BUSA')) {
        await this.actualizarRegistroEliminarEnBaseDeDatos(
          numero,
          'archivo_busa',
        );
      }

      res.send('Archivo eliminado correctamente');
    } catch (error) {
      console.error('Conflicto al eliminar el PDF:', error);
      res.status(404).send('Conflicto al eliminar el archivo PDF');
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
        sql = `
          UPDATE desembolsos
          SET archivo = NULL
          WHERE id = '${isnum}';
        `;
      } else if (campo === 'archivo_busa') {
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
          fileName,
        );
        const destinationPath = `${filesDirectory}${uniqueName}`;
        fs.writeFileSync(destinationPath, buffer);

        const numero = this.obtenerParteNumerica(fileName);
        const isAEV = fileName.includes('-AEV');

        if (isAEV) {
          await this.actualizarRegistroEnBaseDeDatos(numero);
        } else {
          await this.actualizarRegistroEnBaseDeDatosBUSA(numero);
        }
        res.status(200).send('PDF guardado exitosamente');
      } catch (error) {
        res.status(404).send('Conflicto durante la subida del archivo try 0');
      }
    } catch (error) {
      console.error('Error al convertir Base64 a PDF:', error);

      res.status(404).send('Conflicto durante la subida del archivo try');
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
        throw new BadRequestException({
          statusCode: 400,
          error: `Número no tiene el formato adecuado`,
          message: `Número no tiene el formato adecuado`,
        });
      }

      if (!buscarpdf) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se ha subido el Instrucitvo y/o Anexos`,
          message: `No se ha subido el Instrucitvo y/o Anexos`,
        });
      }

      if (seEnvioBanco) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Ya se envió al BANCO y/o AEV`,
          message: `Ya se envió al BANCO y/o AEV`,
        });
      }

      const sql = `
        UPDATE desembolsos
        SET ${columnaFecha} = '${this.obtenerFechaYHoraActualSQL()}'
        WHERE id = '${numero}';
      `;
      const result = await this.connection.query(sql);
      if (result.affectedRows === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Conflicto al actualizar el registro en la base de datos`,
          message: `Conflicto al actualizar el registro en la base de datos`,
        });
      }
      return mensajeExito;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (enviarBanco) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (enviarBanco) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (enviarBanco): ${error}`,
          message: `Error del Servidor en (enviarBanco): ${error}`,
        });
      }
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
        'Conflicto al ejecutar la consulta SQL para obtener los datos',
      );
    }
  }
}
