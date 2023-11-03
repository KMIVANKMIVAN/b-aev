import { Injectable } from '@nestjs/common';
import { CreateDevolucioneDto } from './dto/create-devolucione.dto';
import { UpdateDevolucioneDto } from './dto/update-devolucione.dto';

@Injectable()
export class DevolucionesService {
  create(createDevolucioneDto: CreateDevolucioneDto) {
    return 'This action adds a new devolucione';
  }

  findAll() {
    return `This action returns all devoluciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} devolucione`;
  }

  update(id: number, updateDevolucioneDto: UpdateDevolucioneDto) {
    return `This action updates a #${id} devolucione`;
  }

  remove(id: number) {
    return `This action removes a #${id} devolucione`;
  }
}
