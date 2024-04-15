import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Departamentobusa } from 'src/departamentobusa/entities/departamentobusa.entity';
import { Nivelbusa } from 'src/nivelbusa/entities/nivelbusa.entity';
import { Sucursalbusa } from 'src/sucursalbusa/entities/sucursalbusa.entity';
import { Usuariobusa } from 'src/usuariobusa/entities/usuariobusa.entity';

import {
  SEMILLA_DEPARTAMENTOS,
  SEMILLA_NIVELES,
  SEMILLA_SUCURSAL,
  SEMILLA_USUARIOS,
} from './datos/semilla-datos';

import { UsuariobusaService } from 'src/usuariobusa/usuariobusa.service';
import { SucursalbusaService } from 'src/sucursalbusa/sucursalbusa.service';
import { DepartamentobusaService } from 'src/departamentobusa/departamentobusa.service';
import { NivelbusaService } from 'src/nivelbusa/nivelbusa.service';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SemillabusaService {
  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(Usuariobusa)
    private readonly usuariobusaRepository: Repository<Usuariobusa>,

    @InjectRepository(Sucursalbusa)
    private readonly sucursalbusaRepository: Repository<Sucursalbusa>,

    @InjectRepository(Departamentobusa)
    private readonly departamentobusaRepository: Repository<Departamentobusa>,

    @InjectRepository(Nivelbusa)
    private readonly nivelbusaRepository: Repository<Nivelbusa>,

    private readonly sucursalbusaService: SucursalbusaService,
    private readonly departamentobusaService: DepartamentobusaService,
    private readonly nivelbusaService: NivelbusaService,
    private readonly usuariobusaService: UsuariobusaService,
  ) {
    this.isProd = configService.get('STATE') === 'prod';
  }

  async ejecutarSemilla() {
    try {
      if (this.isProd) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Error al ejecutar la semilla`,
          message: `Problemas en la ejecucion de la semilla`,
        });
      }

      // Limpiar la base de datos BORRAR TODO
      await this.eliminarDatabase();

      await this.crearDepartamentos();
      await this.crearSucursal();
      await this.crearNivel();

      await this.crearUsuario();

      return true;
    } catch (error) {
      // Manejo de excepciones
      throw new InternalServerErrorException({
        statusCode: 500,
        error: `Error del Servidor en (ejecutarSemilla): ${error}`,
        message: `Error del Servidor en (ejecutarSemilla): ${error}`,
      });
    }
  }

  async eliminarDatabase() {
    // borrar usuarios
    await this.usuariobusaRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // borrar empresas
    await this.sucursalbusaRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // borrar tipo empresas
    await this.departamentobusaRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // borrar rol
    await this.nivelbusaRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  async crearDepartamentos(): Promise<Departamentobusa> {
    const departamentos = [];

    for (const departamento of SEMILLA_DEPARTAMENTOS) {
      departamentos.push(
        await this.departamentobusaService.create(departamento),
      );
    }

    return departamentos[0];
  }

  async crearNivel(): Promise<Nivelbusa> {
    const niveles = [];

    for (const nivel of SEMILLA_NIVELES) {
      niveles.push(await this.nivelbusaService.create(nivel));
    }

    return niveles[0];
  }

  async crearSucursal(): Promise<Sucursalbusa[]> {
    const sucursales = [];

    for (const sucursal of SEMILLA_SUCURSAL) {
      const nuevaSucursal = await this.sucursalbusaService.create(sucursal);
      sucursales.push(nuevaSucursal);
    }

    return sucursales;
  }

  async crearUsuario(): Promise<Usuariobusa[]> {
    const usuarios = [];

    for (const usuario of SEMILLA_USUARIOS) {
      /* const nuevoUsuario = await this.usuariobusaService.create({
        nombres: userData.nombres,
        apellidos: userData.apellidos,
        ci: userData.ci,
        complemento: userData.complemento,
        correo: userData.correo,
        contrasenia: userData.contrasenia,
        es_activo: userData.es_activo,
        se_cambiado_cntr: userData.se_cambiado_cntr,
        nivelbusa_id: userData.nivelbusa_id,
        sucursal_id: userData.sucursal_id,
      }); */
      const nuevoUsuario = await this.usuariobusaService.create(usuario);
      usuarios.push(nuevoUsuario);
    }

    return usuarios;
  }
}
