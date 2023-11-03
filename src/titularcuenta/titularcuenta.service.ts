import { Injectable } from '@nestjs/common';
import { CreateTitularcuentaDto } from './dto/create-titularcuenta.dto';
import { UpdateTitularcuentaDto } from './dto/update-titularcuenta.dto';

@Injectable()
export class TitularcuentaService {
  create(createTitularcuentaDto: CreateTitularcuentaDto) {
    return 'This action adds a new titularcuenta';
  }

  findAll() {
    return `This action returns all titularcuenta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} titularcuenta`;
  }

  update(id: number, updateTitularcuentaDto: UpdateTitularcuentaDto) {
    return `This action updates a #${id} titularcuenta`;
  }

  remove(id: number) {
    return `This action removes a #${id} titularcuenta`;
  }
}
