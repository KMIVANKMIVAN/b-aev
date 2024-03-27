import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateRespaldoDesembolsoDto } from './dto/create-respaldo_desembolso.dto';
import { UpdateRespaldoDesembolsoDto } from './dto/update-respaldo_desembolso.dto';
import { Connection } from 'typeorm';

import * as fs from 'fs';
import { Response } from 'express';
import * as path from 'path';

import { RespaldoDesembolso } from './entities/respaldo_desembolso.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RespaldoDesembolsosService {
  constructor(
    @InjectRepository(RespaldoDesembolso)
    private readonly respaldodesembolsoRepository: Repository<RespaldoDesembolso>,
    private connection: Connection,
    private configService: ConfigService,
  ) { }

  namePc = this.configService.get<string>('NAMEPC');

  async create(
    createRespaldoDesembolsoDto: CreateRespaldoDesembolsoDto,
    file: Express.Multer.File,
    res: Response,
  ): Promise<RespaldoDesembolso | Response> {
    try {
      const { tiporespaldo_id, ...restoDeDatos } = createRespaldoDesembolsoDto;

      const fechaActual = new Date();

      const nuevoRespaldoDesembolso = {
        ...restoDeDatos,
        fecha_insert: fechaActual,
      };

      const newRespaldoDesembolso = this.respaldodesembolsoRepository.create(
        nuevoRespaldoDesembolso,
      );

      const tipoRespaldo = await this.connection.query(
        `SELECT sigla FROM tipo_respaldo WHERE id = ?`,
        [tiporespaldo_id],
      );

      if (!tipoRespaldo || !tipoRespaldo[0] || !tipoRespaldo[0].sigla) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Tipo de respaldo con ID: ${tiporespaldo_id} NO Existe`,
          message: `Tipo de respaldo con ID: ${tiporespaldo_id}`,
        });
      }

      const savedRespaldoDesembolso =
        await this.respaldodesembolsoRepository.save(newRespaldoDesembolso);

      const archivo = `${savedRespaldoDesembolso.id}-${tipoRespaldo[0].sigla}`;

      await this.respaldodesembolsoRepository.update(
        savedRespaldoDesembolso.id,
        {
          archivo,
          tiporespaldo_id,
        },
      );
      if (file) {
        if (file.mimetype !== 'application/pdf') {
          throw new BadRequestException({
            statusCode: 400,
            error: 'El archivo no es un PDF válido',
            message: 'El archivo no es un PDF válido',
          });
        }
        if (file.size > 10 * 1024 * 1024) {
          throw new BadRequestException({
            statusCode: 400,
            error: 'El archivo excede el tamaño máximo de 10MB',
            message: 'El archivo excede el tamaño máximo de 10MB',
          });
        }
        const dateTime = this.obtenerFechaYHoraActual();
        const uniqueName = await this.concatenarNombreConFechaHora(
          dateTime,
          archivo,
        );
        const destinationPath = `/home/${this.namePc}/Documentos/${createRespaldoDesembolsoDto.desembolsos_id}/${uniqueName}`;
        try {
          fs.writeFileSync(destinationPath, file.buffer);
          const responseObj = {
            message: 'PDF guardado exitosamente',
            archivo: archivo,
            respaldo: await this.findOne(savedRespaldoDesembolso.id),
          };
          return res.status(200).json(responseObj);
        } catch (error) {
          throw new BadRequestException({
            statusCode: 400,
            error: 'Error durante la subida del archivo',
            message: 'Error durante la subida del archivo',
          });
        }
      } else {
        throw new BadRequestException({
          statusCode: 400,
          error: 'No se proporcionó un archivo',
          message: 'No se proporcionó un archivo',
        });
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOne) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findOne) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOne): ${error}`,
          message: `Error del Servidor en (findOne): ${error}`,
        });
      }
    }
  }

  async guardarPdf(
    textToReplace: string,
    file: Express.Multer.File,
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
        console.log(`PDF guardado en: ${destinationPath}`);

        res.status(200).send('PDF guardado exitosamente');
      } catch (error) {
        res.status(404).send('Error durante la subida del archivo');
      }
    } else {
      res.status(404).send('No es un PDF válido');
    }
  }
  async buscarpdf(partialName: string): Promise<boolean | string> {
    const filesDirectory = '/home/${this.namePc}/Documentos/';

    try {
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
      console.error('Error al buscar el archivo PDF:', error);
      return 'HUBO PROBLEMAS AL BUSCAR';
    }
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

    while (
      await this.fileExists(`/home/${this.namePc}/Documentos/${uniqueName}`)
    ) {
      suffix++;
      uniqueName = `${textToReplace}-${dateTime}(${suffix}).pdf`;
    }

    return uniqueName;
  }

  private fileExists(filePath: string): Promise<boolean> {
    return new Promise((resolve) => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
  }

  async findAll(): Promise<RespaldoDesembolso[]> {
    return await this.respaldodesembolsoRepository.find();
  }
  async findAllOne(desembolsos_id: number): Promise<any[]> {
    try {
      const respaldosDesembolso = await this.respaldodesembolsoRepository.query(
        `SELECT rd.*, tr.detalle
         FROM respaldo_desembolsos rd
         INNER JOIN tipo_respaldo tr ON rd.tiporespaldo_id = tr.id
         WHERE rd.desembolsos_id = ?`,
        [desembolsos_id],
      );
      if (respaldosDesembolso.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Sin datos ID: ${desembolsos_id}`,
          message: `No se encontraron respaldos de desembolso para el ID ${desembolsos_id}`,
        });
      }
      return respaldosDesembolso;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllOne) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findAllOne) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAllOne): ${error}`,
          message: `Error del Servidor en (findAllOne): ${error}`,
        });
      }
    }
  }
  async eliminarDesembIdArchiv(
    desembolsos_id: number,
    archivo: string,
  ): Promise<string> {
    try {
      const respaldosDesembolso = await this.respaldodesembolsoRepository.query(
        `SELECT rd.*
         FROM respaldo_desembolsos rd
         WHERE rd.desembolsos_id = ? AND rd.archivo = ?`,
        [desembolsos_id, archivo],
      );
      if (respaldosDesembolso.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No datos para ID ${desembolsos_id} y el archivo ${archivo}`,
          message: `No se encontraron respaldos de desembolso para el ID ${desembolsos_id} y el archivo ${archivo}`,
        });
      }
      const id = respaldosDesembolso[0].id;
      const filesDirectory = `/home/${this.namePc}/Documentos/`;
      const matchingFile = fs.readdirSync(filesDirectory).find((file) => {
        const fileNameWithoutExtension = path.parse(file).name;
        const filePrefix = fileNameWithoutExtension.split('-')[0];
        const receivedPrefix = archivo.split('-')[0];
        return filePrefix === receivedPrefix;
      });
      if (!matchingFile) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El archivo no se encontró`,
          message: `El archivo no se encontró`,
        });
      }
      const filePath = path.join(filesDirectory, matchingFile);
      fs.unlinkSync(filePath);
      await this.respaldodesembolsoRepository.remove(respaldosDesembolso[0]);
      return `RespaldoDesembolso con ID ${id} y archivo ${archivo} eliminado correctamente`;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOne) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (findOne) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOne): ${error}`,
          message: `Error del Servidor en (findOne): ${error}`,
        });
      }
    }
  }
  async descargarDesembIdArchiv(
    desembolsos_id: number,
    archivo: string,
    res: Response,
  ): Promise<void> {
    try {
      const respaldosDesembolso = await this.respaldodesembolsoRepository.query(
        `SELECT rd.*
         FROM respaldo_desembolsos rd
         WHERE rd.desembolsos_id = ? AND rd.archivo = ?`,
        [desembolsos_id, archivo],
      );

      if (!respaldosDesembolso || respaldosDesembolso.length === 0) {
        throw new NotFoundException(
          `No se encontraron respaldos de desembolso para el ID ${desembolsos_id} y el archivo ${archivo}`,
        );
      }

      const nomarchivo = respaldosDesembolso[0].archivo;

      const filesDirectory = `/home/${this.namePc}/Documentos/${desembolsos_id}`;

      const filesInDirectory = fs.readdirSync(filesDirectory);

      const matchingFiles = filesInDirectory.filter((file) =>
        file.includes(nomarchivo),
      );

      if (matchingFiles.length === 0) {
        res
          .status(404)
          .send('Error: ¿Estás seguro de que se subió el archivo?');
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
      console.error(
        'Error al descargar respaldo de desembolso:',
        error.message,
      );

      if (error instanceof NotFoundException) {
        res.status(404).send('No se encontraron respaldos para descargar.');
      } else {
        res
          .status(404)
          .send('Hubo un problema al descargar el respaldo de desembolso.');
      }
    }
  }
  


  async findOne(id: number): Promise<RespaldoDesembolso> {
    try {
      const respaldoDesembolso =
        await this.respaldodesembolsoRepository.findOne({
          where: { id },
        });
      if (!respaldoDesembolso) {
        throw new BadRequestException({
          statusCode: 400,
          error: `RespaldoDesembolso con ID ${id} no encontrado`,
          message: `RespaldoDesembolso con ID ${id} no encontrado`,
        });
      }
      return respaldoDesembolso;
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

  async update(
    id: number,
    updateRespaldoDesembolsoDto: UpdateRespaldoDesembolsoDto,
  ): Promise<RespaldoDesembolso> {
    try {
      const respaldoDesembolso = await this.findOne(id);
      this.respaldodesembolsoRepository.merge(
        respaldoDesembolso,
        updateRespaldoDesembolsoDto,
      );
      const updateResult =
        await this.respaldodesembolsoRepository.save(respaldoDesembolso);
      if (!updateResult) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Error al actualizar el RespaldoDesembolso.`,
          message: `Error al actualizar el RespaldoDesembolso.`,
        });
      }
      return updateResult;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (update): ${error}`,
          message: `Error del Servidor en (update): ${error}`,
        });
      }
    }
  }

  async remove(id: number, nombrepdf: string): Promise<string> {
    try {
      const respaldoDesembolso = await this.findOne(id);

      await this.respaldodesembolsoRepository.remove(respaldoDesembolso);

      await this.eliminarPdf(nombrepdf);

      return `RespaldoDesembolso con ID ${id} y archivo ${nombrepdf} eliminado correctamente`;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (remove): ${error}`,
          message: `Error del Servidor en (remove): ${error}`,
        });
      }
    }
  }
  async eliminarPdf(nombrepdf: string): Promise<void> {
    const filesDirectory = `/home/${this.namePc}/Documentos/`;

    try {
      const filesInDirectory = fs.readdirSync(filesDirectory);

      const matchingFile = filesInDirectory.find((file) => {
        const fileNameWithoutExtension = path.parse(file).name;
        const filePrefix = fileNameWithoutExtension.split('-')[0];
        const receivedPrefix = nombrepdf.split('-')[0];

        return filePrefix === receivedPrefix;
      });

      if (!matchingFile) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El archivo ${nombrepdf} no se encontró 123`,
          message: `El archivo ${nombrepdf} no se encontró 123`,
        });
      }

      const filePath = path.join(filesDirectory, matchingFile);

      fs.unlinkSync(filePath);
      return;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (eliminarPdf): ${error}`,
          message: `Error del Servidor en (eliminarPdf): ${error}`,
        });
      }
    }
  }
  async downloadFile(fileName: string, res: Response): Promise<void> {
    const filesDirectory = `/home/${this.namePc}/Documentos/`;

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
}
