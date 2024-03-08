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
      return res.status(500).json({ message: 'Error al Guardar el PDF' });
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
      throw new Error('Error al buscar PDFs para firmar');
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
      console.error('Error al recibir y guardar el PDF en base64:', error);
      throw new Error('Error al recibir y guardar el PDF en base64');
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
      console.error('Error al convertir Base64 a PDF:', error);
      res.status(404).send('Error durante la subida del archivo');
    }
  }


}
