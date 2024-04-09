import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDerivacionDto } from './dto/create-derivacion.dto';
import { UpdateDerivacionDto } from './dto/update-derivacion.dto';
import { Derivacion } from './entities/derivacion.entity';
import { Connection } from 'typeorm';

@Injectable()
export class DerivacionService {
  constructor(
    @InjectRepository(Derivacion)
    private readonly derivacionRepository: Repository<Derivacion>,
    private connection: Connection,
  ) { }

  /* async create(createDerivacionDto: CreateDerivacionDto): Promise<Derivacion> {
    try {
      const newDerivacion = this.derivacionRepository.create(createDerivacionDto);
      return await this.derivacionRepository.save(newDerivacion);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (create): ${error}`,
          message: `Error del Servidor en (create): ${error}`,
        });
      }
    }
  } */

  async create(createDerivacionDto: CreateDerivacionDto): Promise<Derivacion> {
    try {
      // Crea la nueva derivación sin el campo fecha_envio proveniente del DTO
      const newDerivacion =
        this.derivacionRepository.create(createDerivacionDto);

      // Asigna la fecha y hora actual directamente como un objeto Date
      newDerivacion.fecha_envio = new Date(); // Esto es compatible con la mayoría de las bases de datos

      return await this.derivacionRepository.save(newDerivacion);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (create): ${error}`,
          message: `Error del Servidor en (create): ${error}`,
        });
      }
    }
  }

  async createAutomatico(
    createDerivacionDto: CreateDerivacionDto,
  ): Promise<Derivacion> {
    try {
      const buscarIdDesemb = await this.findOneIdDesembolso(
        createDerivacionDto.id_desembolso,
      );

      if (buscarIdDesemb == null) {
        const newDerivacion =
          this.derivacionRepository.create(createDerivacionDto);

        newDerivacion.fecha_envio = new Date();
        newDerivacion.estado = 1;
        newDerivacion.firmador = 1;
        newDerivacion.limite = 4;

        return await this.derivacionRepository.save(newDerivacion);
      }
      if (buscarIdDesemb && buscarIdDesemb.estado === 2) {
        const newDerivacion =
          this.derivacionRepository.create(createDerivacionDto);

        newDerivacion.fecha_envio = new Date();
        newDerivacion.estado = 1;
        newDerivacion.firmador = 1;
        newDerivacion.limite = 4;
        return await this.derivacionRepository.save(newDerivacion);
      }
      if (buscarIdDesemb && buscarIdDesemb.firmador === buscarIdDesemb.limite) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Instructivo fue firmado por Todos`,
          message: `El Instructivo fue firmado por todos`,
        });
      }
      if (buscarIdDesemb.estado != 3) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Usted debe Aceptar el Instructivo para poder Firmarlo y derivarlo`,
          message: `El Instructivo no fue Aceptado por Usted`,
        });
      }

      const newDerivacion =
        this.derivacionRepository.create(createDerivacionDto);

      newDerivacion.fecha_envio = new Date();
      // Incrementar primero
      buscarIdDesemb.firmador += 1;

      // Luego asignar
      newDerivacion.firmador = buscarIdDesemb.firmador;
      newDerivacion.limite = 4;
      return await this.derivacionRepository.save(newDerivacion);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (create): ${error}`,
          message: `Error del Servidor en (create): ${error}`,
        });
      }
    }
  }

  async findOneIdDesembolso(idDesembolso: number): Promise<Derivacion> {
    try {
      console.log('findOneIdDesembolso');

      const derivacion = await this.derivacionRepository.findOne({
        where: { id_desembolso: idDesembolso },
        order: { fecha_envio: 'DESC' }, // Ordena por fecha_envio en orden descendente
      });

      return derivacion;
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

  async findAll(): Promise<Derivacion[]> {
    try {
      const derivacion = await this.derivacionRepository.find();
      if (derivacion.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `No se encontraron derivacion.`,
          message: `No se encontraron derivacion.`,
        });
      }
      return derivacion;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAll): ${error}`,
          message: `Error del Servidor en (findAll): ${error}`,
        });
      }
    }
  }

  async BusonDerivacion(id: number): Promise<Derivacion[]> {
    try {
      // const derivacion = await this.derivacionRepository.find({ where: { id_destinatario: id } });
      const sql = `
      SELECT
          d.id,
          d.id_desembolso,
          f.cargo ,
          d.fecha_envio,
          d.limite,
          d.observacion,
          e.estado ,
          d.id_enviador,
          d.id_destinatario,
          d.codigo_proyecto,
          d.documento
      FROM
          derivacion d
          JOIN firmador f ON d.firmador = f.id
          JOIN estado e ON d.estado = e.id
      WHERE
          d.id_destinatario = ${id}
          AND e.id <> 4;
      `;
      const derivacion = await this.connection.query(sql);
      if (!derivacion) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El derivacion con ID ${id} NO Existe`,
          message: `derivacion con ID ${id} no fue encontrado`,
        });
      }
      return derivacion;
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

  async BusonDerivacionFecha(
    id: number,
    fechaInicio: string,
    fechaFinal: string,
    idEstado: number,
  ): Promise<Derivacion[]> {
    try {
      // const derivacion = await this.derivacionRepository.find({ where: { id_destinatario: id } });
      console.log();

      const sql = `
      SELECT
          d.id,
          d.id_desembolso,
          f.cargo ,
          d.fecha_envio,
          d.limite,
          d.observacion,
          e.estado ,
          d.id_enviador,
          d.id_destinatario,
          d.codigo_proyecto,
          d.documento,
          d.estado,
          d.selectVContCodPCodid,
          d.esVivienda,
          d.esPemar
      FROM
          derivacion d
          JOIN firmador f ON d.firmador = f.id
          JOIN estado e ON d.estado = e.id
      WHERE
          d.id_destinatario = ${id}
          AND e.id = ${idEstado}
          AND DATE(d.fecha_envio) BETWEEN '${fechaInicio}' AND '${fechaFinal}';
  
      `;
      const estado =
        idEstado === 1 ? 'Enviado' : idEstado === 2 ? 'Rechazado' : 'Aceptado';

      const derivacion = await this.connection.query(sql);
      if (derivacion.length === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `La derivacion con ID ${id}, Fechas: ${fechaInicio} a ${fechaFinal} y estado ${estado}: NO Existe`,
          message: `La Derivacion en Fechas: ${fechaInicio} a ${fechaFinal} y estado ${estado}: NO Existe`,
        });
      }
      return derivacion;
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

  async findOne(id: number): Promise<Derivacion> {
    try {
      const derivacion = await this.derivacionRepository.findOne({
        where: { id },
      });
      if (!derivacion) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El derivacion con ID ${id} NO Existe`,
          message: `derivacion con ID ${id} no fue encontrado`,
        });
      }
      return derivacion;
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
    updateDerivacionDto: UpdateDerivacionDto,
  ): Promise<Derivacion> {
    try {
      const existingDerivacion = await this.findOne(id);
      const { ...rest } = updateDerivacionDto;

      const updatedDerivacion: Partial<Derivacion> = {
        ...rest,
      };

      const updateResult = await this.derivacionRepository.update(
        id,
        updatedDerivacion,
      );
      if (updateResult.affected === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El derivacion con ID ${id} NO se actualizo correctamente`,
          message: `derivacion con ID ${id} no se actualizo correctamente`,
        });
      }
      return this.findOne(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (update) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (update) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (update): ${error}`,
          message: `Error del Servidor en (update): ${error}`,
        });
      }
    }
  }

  async aceptar(
    userid: number,
    proyecto: string,
    desembolso: number,
    estadotipo: number,
    updateDerivacionDto: UpdateDerivacionDto,
  ): Promise<Derivacion> {
    console.log("estadotipo", estadotipo);

    try {
      const existingDerivacion = await this.derivacionRepository.findOne({
        where: {
          codigo_proyecto: proyecto,
          id_desembolso: desembolso, // Asegúrate de que desembolso es un número.
          id_destinatario: userid,
          estado: 1,
        },
        order: {
          fecha_envio: "DESC", // Asegúrate de que la fecha más reciente es la primera
        },
      });

      if (!existingDerivacion) {
        throw new BadRequestException({
          statusCode: 404,
          error: `No se encontró una derivación que coincida con los criterios especificados.`,
          message: `No se encontró una derivación válida para aceptar.`,
        });
      }

      // Actualiza el estado a 3
      const updateResult = await this.derivacionRepository.update(existingDerivacion.id, {
        ...updateDerivacionDto,
        estado: estadotipo, // Actualiza el estado a 3
      });

      if (updateResult.affected === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `La derivación con ID ${existingDerivacion.id} NO se actualizó correctamente`,
          message: `Derivación con ID ${existingDerivacion.id} no se actualizó correctamente`,
        });
      }

      // Retorna la derivación actualizada
      return this.findOne(existingDerivacion.id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error.code === 'CONNECTION_ERROR') {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (aceptar) NO SE CONECTO A LA BASE DE DATOS`,
          message: `Error del Servidor en (aceptar) NO SE CONECTO A LA BASE DE DATOS`,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (aceptar): ${error}`,
          message: `Error del Servidor en (aceptar): ${error}`,
        });
      }
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const existingDerivacion = await this.findOne(id);
      await this.derivacionRepository.remove(existingDerivacion);
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
}
