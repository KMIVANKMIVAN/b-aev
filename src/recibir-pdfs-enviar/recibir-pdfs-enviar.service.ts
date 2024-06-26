import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';

import * as fs from 'fs';

import { Response } from 'express';
import * as path from 'path';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class RecibirPdfsEnviarService {
  constructor(
    private configService: ConfigService,
    private connection: Connection,
  ) { }

  namePc = this.configService.get<string>('NAMEPC');

  async savePdf(file: Express.Multer.File, res: Response): Promise<Response> {
    try {
      const documentsPath = `/home/${this.namePc}/Documentos`;
      if (!fs.existsSync(documentsPath)) {
        fs.mkdirSync(documentsPath, { recursive: true });
      }

      const savePath = path.join(documentsPath, file.originalname);
      fs.writeFileSync(savePath, file.buffer);

      // Maneja la respuesta directamente desde el servicio
      return res.status(201).json({
        message: 'El Archivo se guardo Exitosamente',
        nombrePDF: file.originalname,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Conflictos al Guardar el PDF' });
    }
  }

  async enviarPdf(nombrePdf: string, res: Response): Promise<void> {
    try {
      const documentsPath = `/home/${this.namePc}/Documentos`;
      const pdfFiles = fs.readdirSync(documentsPath).filter(file => file.startsWith(nombrePdf));

      if (pdfFiles.length > 0) {
        const pdfPath = path.join(documentsPath, pdfFiles[0]);
        res.setHeader('Content-Type', 'application/pdf');
        res.download(pdfPath, pdfFiles[0]); // Descarga el archivo con su nombre original
      } else {
        // res.status(404).json({ message: 'PDF no encontrado' });
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron en PDF: ${nombrePdf}.`,
          message: `No se encontraron PDF: ${nombrePdf}.`,
        });
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (enviarPdf): ${error}`,
          message: `Error del Servidor en (enviarPdf): ${error}`,
        });
      }
    }
  }


  /* async traerPDFFirmar(nombreParcialPdf: string, res: Response): Promise<void> {
    try {
      const documentsPath = `/home/${this.namePc}/Documentos`;

      // Busca archivos en el directorio
      const files = fs.readdirSync(documentsPath);

      // Filtra los archivos que coincidan con las primeras tres partes del nombre
      const pdfFiles = files.filter((file) => {
        const fileNameParts = file.split('-');
        const partialFileName = fileNameParts.slice(0, 2).join('-'); // Tomar las dos primeras partes
        return partialFileName === nombreParcialPdf;
      });

      // Devuelve el primer PDF encontrado
      if (pdfFiles.length > 0) {
        const pdfPath = path.join(documentsPath, pdfFiles[0]);

        // Envía el PDF al cliente
        res.setHeader('Content-Type', 'application/pdf');
        res.download(pdfPath, pdfFiles[0]);
      } else {
        res.status(404).json({ message: 'PDF no encontrado' });
      }
    } catch (error) {
      console.error('Error al buscar PDFs para firmar:', error);
      res.status(500).json({ message: 'Error al buscar PDFs para firmar' });
    }
  } */

  async traerPDFFirmar(nombreParcialPdf: string): Promise<{ nombrePdf: string, pdfBuffer: Buffer }> {
    try {
      const documentsPath = `/home/${this.namePc}/Documentos`;

      // Busca archivos en el directorio
      const files = fs.readdirSync(documentsPath);

      // Filtra los archivos que coincidan con las primeras partes del nombre
      const pdfFiles = files.filter((file) => {
        return file.startsWith(nombreParcialPdf);
      });

      if (pdfFiles.length > 0) {
        const pdfPath = path.join(documentsPath, pdfFiles[0]);
        const pdfBuffer = fs.readFileSync(pdfPath);
        return { nombrePdf: pdfFiles[0], pdfBuffer };
      } else {
        throw new Error('No se encontraron PDFs para firmar');
      }
    } catch (error) {
      throw new Error('Conflictos al buscar PDFs para firmar');
    }
  }
  async traerPDFFirmarBase64(nombreParcialPdf: string): Promise<{ nombrePdf: string, pdfBase64: string }> {
    try {
      const documentsPath = `/home/${this.namePc}/Documentos/${nombreParcialPdf}`;

      // Busca archivos en el directorio
      const files = fs.readdirSync(documentsPath);

      // Filtra los archivos que coincidan con las primeras partes del nombre
      const pdfFiles = files.filter((file) => file.startsWith(nombreParcialPdf));

      if (pdfFiles.length > 0) {
        const pdfPath = path.join(documentsPath, pdfFiles[0]);
        const pdfBuffer = fs.readFileSync(pdfPath);
        const pdfBase64 = pdfBuffer.toString('base64'); // Convierte el buffer a base64
        return { nombrePdf: pdfFiles[0], pdfBase64 }; // Retorna el nombre del archivo y el PDF en base64
      } else {
        throw new Error('No se encontraron PDFs para firmar');
      }
    } catch (error) {
      throw new Error('Conflicto al buscar PDFs para firmar');
    }
  }
  async traerPDFFirmarBase64NombreComple(nombrePdf: string): Promise<{ nombrePdf: string, pdfBase64: string }> {
    try {
      const documentsPath = `/home/${this.namePc}/Documentos/${nombrePdf}`;
      // Verifica si la carpeta existe
      if (!fs.existsSync(documentsPath)) {
        // throw new NotFoundException(`La carpeta ${documentsPath} no existe.`);
        throw new BadRequestException({
          statusCode: 400,
          error: `El documento con ID: ${nombrePdf} NO SE CARGO`,
          message: `El documento con ID: ${nombrePdf}`,
        });
      }

      const pdfFullPath = path.join(documentsPath, `${nombrePdf}.pdf`);

      // Verifica si el archivo existe
      if (fs.existsSync(pdfFullPath)) {
        const pdfBuffer = fs.readFileSync(pdfFullPath);
        const pdfBase64 = pdfBuffer.toString('base64'); // Convierte el buffer a base64
        return { nombrePdf, pdfBase64 }; // Retorna el nombre del archivo y el PDF en base64
      } else {
        // throw new Error('No se encontró el PDF especificado para firmar');
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontró el PDF especificado para firmar`,
          message: `No se encontró el PDF especificado para firmar`,
        });
      }
    } catch (error) {
      // throw new Error('Conflicto al buscar PDFs para firmar');
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (traerPDFFirmarBase64NombreComple): ${error}`,
          message: `Error del Servidor en (traerPDFFirmarBase64NombreComple): ${error}`,
        });
      }
    }
  }


  async recibirBase64(base64Pdf: string): Promise<string> {
    try {
      const documentsPath = `/home/${this.namePc}/Documentos`;

      if (!fs.existsSync(documentsPath)) {
        fs.mkdirSync(documentsPath, { recursive: true });
      }

      const pdfFileName = `pdf_${Date.now()}.pdf`;
      const pdfPath = path.join(documentsPath, pdfFileName);

      if (typeof base64Pdf !== 'string') {
        throw new Error('El argumento base64Pdf no es una cadena válida en formato base64');
      }

      const buffer = Buffer.from(base64Pdf, 'base64');
      fs.writeFileSync(pdfPath, buffer);

      return pdfFileName;
    } catch (error) {
      console.error('Conflicto al recibir y guardar el PDF en base64:', error);
      throw new Error('Conflicto al recibir y guardar el PDF en base64');
    }
  }

  async base64ToPdf(
    base64String: string,
    fileName: string,
    res: Response,
  ): Promise<void> {
    try {
      const buffer = Buffer.from(base64String, 'base64');
      const filesDirectory = `/home/${this.namePc}/Documentos/`;
      const destinationPath = `${filesDirectory}${fileName}.pdf`;
      fs.writeFileSync(destinationPath, buffer);

      const nombrePDF = `${fileName}.pdf`;
      res.status(200).json({ message: 'El Archivo se guardo Exitosamente', nombrePDF });
    } catch (error) {
      console.error('Conflicto al convertir Base64 a PDF:', error);
      res.status(404).send('Conflicto durante la subida del archivo');
    }
  }

  /* async base64ToPdfCarpeta(
    base64String: string,
    fileName: string,
    res: Response,
  ): Promise<void> {
    try {
      const filesDirectory = `/home/${this.namePc}/Documentos/`;
      const folderName = `${fileName}`;
      const folderPath = path.join(filesDirectory, folderName);
      const filePath = path.join(folderPath, `${fileName}.pdf`);

      // Verificar si la carpeta ya existe
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      } else {
        // Verificar si el archivo ya existe
        if (fs.existsSync(filePath)) {
          throw new BadRequestException({
            statusCode: 400,
            error: `Ya se grabó el archivo ${fileName}`,
            message: `No se pudo crear el archivo debido a que ya se grabó el archivo ${fileName}`,
          });
        }
      }

      const buffer = Buffer.from(base64String, 'base64');
      fs.writeFileSync(filePath, buffer);

      const nombrePDF = `${folderName}/${fileName}.pdf`;
      res.status(200).json({ message: 'El Archivo se guardó Exitosamente', nombrePDF });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (base64ToPdfCarpeta): ${error}`,
          message: `Error del Servidor en (base64ToPdfCarpeta): ${error}`,
        });
      }
    }
  } */
  async base64ToPdfCarpeta(
    base64String: string,
    fileName: string,
    res: Response,
  ): Promise<void> {
    try {
      const filesDirectory = `/home/${this.namePc}/Documentos/`;
      const folderName = `${fileName}`;
      const folderPath = path.join(filesDirectory, folderName);
      const filePath = path.join(folderPath, `${fileName}.pdf`);

      // Verificar si la carpeta ya existe
      if (fs.existsSync(folderPath)) {
        // Si la carpeta existe, borrarla y su contenido
        const sql = `
        DELETE FROM respaldo_desembolsos
        WHERE desembolsos_id = ${fileName};
      `;
        const result = await this.connection.query(sql);
        if (result) {
          fs.rmSync(folderPath, { recursive: true });
        }

      }

      // Crear la carpeta nuevamente
      fs.mkdirSync(folderPath);

      const buffer = Buffer.from(base64String, 'base64');
      fs.writeFileSync(filePath, buffer);

      const nombrePDF = `${folderName}/${fileName}.pdf`;
      res.status(200).json({ message: 'El Archivo se guardó Exitosamente', nombrePDF });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (base64ToPdfCarpeta): ${error}`,
          message: `Error del Servidor en (base64ToPdfCarpeta): ${error}`,
        });
      }
    }
  }

  async capeta(
    base64String: string,
    carpetaName: string,
    fileName: string,
    res: Response,
  ): Promise<void> {
    try {
      const filesDirectory = `/home/${this.namePc}/Documentos/${carpetaName}/`;
      const folderName = `${fileName}`;
      const folderPath = path.join(filesDirectory, folderName);
      const filePath = path.join(folderPath, `${fileName}.pdf`);

      // Verificar si la carpeta ya existe
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      } else {
        // Verificar si el archivo ya existe
        if (fs.existsSync(filePath)) {
          throw new BadRequestException({
            statusCode: 400,
            error: `Ya se grabó el archivo ${fileName}`,
            message: `No se pudo crear el archivo debido a que ya se grabó el archivo ${fileName}`,
          });
        }
      }

      const buffer = Buffer.from(base64String, 'base64');
      fs.writeFileSync(filePath, buffer);

      const nombrePDF = `${folderName}/${fileName}.pdf`;
      res.status(200).json({ message: 'El Archivo se guardó Exitosamente', nombrePDF });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (base64ToPdfCarpeta): ${error}`,
          message: `Error del Servidor en (base64ToPdfCarpeta): ${error}`,
        });
      }
    }
  }

  async sobreEscribir(
    base64String: string,
    carpetaName: string,
    fileName: string,
    res: Response,
  ): Promise<void> {
    try {
      // Definir el directorio de archivos y el camino del archivo directamente dentro de carpetaName
      const filesDirectory = `/home/${this.namePc}/Documentos/${carpetaName}/`;
      if (!fs.existsSync(filesDirectory)) {
        // throw new NotFoundException(`La carpeta ${documentsPath} no existe.`);
        throw new BadRequestException({
          statusCode: 400,
          error: `El documento con ID: ${carpetaName} NO SE CARGO`,
          message: `El documento con ID: ${carpetaName}`,
        });
      }
      const filePath = path.join(filesDirectory, `${fileName}.pdf`);

      // Convertir la cadena base64 a buffer y escribir/sobrescribir el archivo PDF
      const buffer = Buffer.from(base64String, 'base64');
      fs.writeFileSync(filePath, buffer);

      // Devolver el nombre del PDF creado
      const nombrePDF = `${carpetaName}/${fileName}.pdf`;
      res.status(200).json({ message: 'El Archivo se guardó Exitosamente', nombrePDF });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (base64ToPdfCarpeta): ${error}`,
          message: `Error del Servidor en (base64ToPdfCarpeta): ${error}`,
        });
      }
    }
  }
}
