import { Injectable } from '@nestjs/common';
import { CreateProyectosexcelDto } from './dto/create-proyectosexcel.dto';
import { UpdateProyectosexcelDto } from './dto/update-proyectosexcel.dto';

@Injectable()
export class ProyectosexcelService {
  create(createProyectosexcelDto: CreateProyectosexcelDto) {
    return 'This action adds a new proyectosexcel';
  }

  findAll() {
    return `This action returns all proyectosexcel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proyectosexcel`;
  }

  update(id: number, updateProyectosexcelDto: UpdateProyectosexcelDto) {
    return `This action updates a #${id} proyectosexcel`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyectosexcel`;
  }
}
