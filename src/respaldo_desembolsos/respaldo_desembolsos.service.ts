import { Injectable } from '@nestjs/common';
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

@Injectable()
export class RespaldoDesembolsosService {
  constructor(
    @InjectRepository(RespaldoDesembolso)
    private readonly respaldodesembolsoRepository: Repository<RespaldoDesembolso>,
    private connection: Connection,
  ) {}

  /* async create(
    createRespaldoDesembolsoDto: CreateRespaldoDesembolsoDto,
  ): Promise<RespaldoDesembolso> {
    const newRespaldoDesembolso = this.respaldodesembolsoRepository.create(
      createRespaldoDesembolsoDto,
    );
    return await this.respaldodesembolsoRepository.save(newRespaldoDesembolso);
  } */

  async create(
    createRespaldoDesembolsoDto: CreateRespaldoDesembolsoDto,
    file: Express.Multer.File,
    res: Response,
  ): Promise<RespaldoDesembolso | Response> {
    console.log('111');
    console.log(createRespaldoDesembolsoDto);
    console.log(createRespaldoDesembolsoDto.tiporespaldo_id);

    const { tiporespaldo_id, ...restoDeDatos } = createRespaldoDesembolsoDto;

    // Obtener la fecha y hora actual
    const fechaActual = new Date();

    // Agregar la fecha actual al DTO
    const nuevoRespaldoDesembolso = {
      ...restoDeDatos,
      fecha_insert: fechaActual,
    };

    // Crear el nuevo respaldo sin el campo archivo
    const newRespaldoDesembolso = this.respaldodesembolsoRepository.create(
      nuevoRespaldoDesembolso,
    );

    // Obtener la sigla de tipo_respaldo según el tiporespaldo_id
    const tipoRespaldo = await this.connection.query(
      `SELECT sigla FROM tipo_respaldo WHERE id = ?`,
      [tiporespaldo_id],
    );

    if (!tipoRespaldo || !tipoRespaldo[0] || !tipoRespaldo[0].sigla) {
      throw new NotFoundException(
        `Tipo de respaldo con ID ${tiporespaldo_id} no encontrado o sin sigla`,
      );
    }

    // Guardar el nuevo respaldo en la base de datos
    const savedRespaldoDesembolso =
      await this.respaldodesembolsoRepository.save(newRespaldoDesembolso);

    // Construir el valor de archivo usando el ID generado y la sigla del tipo_respaldo
    const archivo = `${savedRespaldoDesembolso.id}-${tipoRespaldo[0].sigla}`;

    // Actualizar el archivo y tiporespaldo_id en el registro de respaldo_desembolsos
    await this.respaldodesembolsoRepository.update(savedRespaldoDesembolso.id, {
      archivo,
      tiporespaldo_id,
    });

    // Lógica para guardar el archivo
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
        archivo,
      );
      const destinationPath = `/home/van369/Documentos/${uniqueName}`;

      try {
        fs.writeFileSync(destinationPath, file.buffer);
        console.log(`PDF guardado en: ${destinationPath}`);
        // res.status(200).send('PDF guardado exitosamente');
        const responseObj = {
          message: 'PDF guardado exitosamente',
          archivo: archivo,
          respaldo: await this.findOne(savedRespaldoDesembolso.id),
        };

        // Enviar la respuesta con el objeto JSON que contiene la información requerida
        return res.status(200).json(responseObj);
      } catch (error) {
        res.status(404).send('Error durante la subida del archivo');
      }
    } else {
      res.status(404).send('No se proporcionó un archivo');
    }

    // Devolver el respaldo actualizado
    return await this.findOne(savedRespaldoDesembolso.id);
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
      const destinationPath = `/home/van369/Documentos/${uniqueName}`;

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
    const filesDirectory = '/home/van369/Documentos/';

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
      // throw new Error('Error al buscar el archivo PDF');
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

    while (await this.fileExists(`/home/van369/Documentos/${uniqueName}`)) {
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
  /* async findAllOne(desembolsos_id: number): Promise<RespaldoDesembolso[]> {
    const respaldosDesembolso = await this.respaldodesembolsoRepository.find({
      where: { desembolsos_id },
    });
    if (!respaldosDesembolso || respaldosDesembolso.length === 0) {
      throw new NotFoundException(
        `No se encontraron respaldos de desembolso para el ID ${desembolsos_id}`,
      );
    }
    return respaldosDesembolso;
  } */
  async findAllOne(desembolsos_id: number): Promise<any[]> {
    try {
      const respaldosDesembolso = await this.respaldodesembolsoRepository.query(
        `SELECT rd.*, tr.detalle
         FROM respaldo_desembolsos rd
         INNER JOIN tipo_respaldo tr ON rd.tiporespaldo_id = tr.id
         WHERE rd.desembolsos_id = ?`,
        [desembolsos_id],
      );

      if (!respaldosDesembolso || respaldosDesembolso.length === 0) {
        throw new NotFoundException(
          `No se encontraron respaldos de desembolso para el ID ${desembolsos_id}`,
        );
      }

      return respaldosDesembolso;
    } catch (error) {
      // Manejo de errores
      throw new Error(
        `Error al buscar respaldos de desembolso: ${error.message}`,
      );
    }
  }
  /* async eliminarDesembIdArchiv(
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

      if (!respaldosDesembolso || respaldosDesembolso.length === 0) {
        throw new NotFoundException(
          `No se encontraron respaldos de desembolso para el ID ${desembolsos_id} y el archivo ${archivo}`,
        );
      }

      // Llamar a eliminarPdf con el nombre del archivo después de encontrar los respaldos
      await this.eliminarPdf(archivo);

      // Llamar a remove pasando el ID y el archivo para eliminar el registro
      const eliminacion = await this.remove(respaldosDesembolso[0].id, archivo);

      // Enviar respuesta de éxito con el mensaje de eliminación
      return eliminacion;
    } catch (error) {
      // Manejar errores
      console.error('Error al eliminar respaldo de desembolso:', error.message);

      if (error instanceof NotFoundException) {
        return 'No se encontraron respaldos para eliminar.';
      } else {
        return 'Hubo un problema al eliminar el respaldo de desembolso.';
      }
    }
  } */
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

      if (!respaldosDesembolso || respaldosDesembolso.length === 0) {
        throw new NotFoundException(
          `No se encontraron respaldos de desembolso para el ID ${desembolsos_id} y el archivo ${archivo}`,
        );
      }

      const id = respaldosDesembolso[0].id;

      const filesDirectory = '/home/van369/Documentos/';

      const matchingFile = fs.readdirSync(filesDirectory).find((file) => {
        const fileNameWithoutExtension = path.parse(file).name;
        const filePrefix = fileNameWithoutExtension.split('-')[0];
        const receivedPrefix = archivo.split('-')[0];

        return filePrefix === receivedPrefix;
      });

      if (!matchingFile) {
        console.error('El archivo no se encontró');
        throw new Error('El archivo no se encontró');
      }

      const filePath = path.join(filesDirectory, matchingFile);
      fs.unlinkSync(filePath);
      console.log(`PDF eliminado: ${matchingFile}`);

      await this.respaldodesembolsoRepository.remove(respaldosDesembolso[0]);

      return `RespaldoDesembolso con ID ${id} y archivo ${archivo} eliminado correctamente`;
    } catch (error) {
      console.error('Error al eliminar respaldo de desembolso:', error.message);

      if (error instanceof NotFoundException) {
        return 'No se encontraron respaldos para eliminar.';
      } else {
        return 'Hubo un problema al eliminar el respaldo de desembolso.';
      }
    }
  }
  /* async descargarDesembIdArchiv(
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

      const filesDirectory = '/home/van369/Documentos/';

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
  } */

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

      const filesDirectory = '/home/van369/Documentos/';

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
    const respaldoDesembolso = await this.respaldodesembolsoRepository.findOne({
      where: { id },
    });
    if (!respaldoDesembolso) {
      throw new NotFoundException(
        `RespaldoDesembolso con ID ${id} no encontrado`,
      );
    }
    return respaldoDesembolso;
  }

  async update(
    id: number,
    updateRespaldoDesembolsoDto: UpdateRespaldoDesembolsoDto,
  ): Promise<RespaldoDesembolso> {
    const respaldoDesembolso = await this.findOne(id);
    this.respaldodesembolsoRepository.merge(
      respaldoDesembolso,
      updateRespaldoDesembolsoDto,
    );
    return await this.respaldodesembolsoRepository.save(respaldoDesembolso);
  }

  async remove(id: number, nombrepdf: string): Promise<string> {
    try {
      const respaldoDesembolso = await this.findOne(id);
      if (!respaldoDesembolso) {
        throw new NotFoundException(
          `RespaldoDesembolso con ID ${id} no encontrado`,
        );
      }

      await this.respaldodesembolsoRepository.remove(respaldoDesembolso);

      // Llamada a eliminarPdf después de eliminar el registro
      await this.eliminarPdf(nombrepdf);

      return `RespaldoDesembolso con ID ${id} y archivo ${nombrepdf} eliminado correctamente`;
    } catch (error) {
      throw new Error(
        `Error al eliminar el RespaldoDesembolso: ${error.message}`,
      );
    }
  }
  async eliminarPdf(nombrepdf: string): Promise<void> {
    const filesDirectory = '/home/van369/Documentos/';

    try {
      const filesInDirectory = fs.readdirSync(filesDirectory);

      const matchingFile = filesInDirectory.find((file) => {
        const fileNameWithoutExtension = path.parse(file).name;
        const filePrefix = fileNameWithoutExtension.split('-')[0]; // Obtener los primeros caracteres antes del guion
        const receivedPrefix = nombrepdf.split('-')[0]; // Obtener los primeros caracteres del nombre recibido

        return filePrefix === receivedPrefix;
      });

      if (!matchingFile) {
        console.error('El archivo no se encontró');
        throw new Error('El archivo no se encontró');
      }

      const filePath = path.join(filesDirectory, matchingFile);

      // Eliminar el archivo
      fs.unlinkSync(filePath);
      console.log(`PDF eliminado: ${matchingFile}`);

      // Enviar respuesta de éxito
      // Usar un mensaje diferente si se eliminó el archivo correctamente
      return; // No es necesario devolver nada en este caso
    } catch (error) {
      console.error('Error al eliminar el PDF:', error);
      throw new Error('Error al eliminar el archivo PDF');
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
