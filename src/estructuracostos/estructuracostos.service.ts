import { Injectable } from '@nestjs/common';
import { CreateEstructuracostoDto } from './dto/create-estructuracosto.dto';
import { UpdateEstructuracostoDto } from './dto/update-estructuracosto.dto';

@Injectable()
export class EstructuracostosService {
  create(createEstructuracostoDto: CreateEstructuracostoDto) {
    return 'This action adds a new estructuracosto';
  }

  findAll() {
    return `This action returns all estructuracostos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estructuracosto`;
  }

  update(id: number, updateEstructuracostoDto: UpdateEstructuracostoDto) {
    return `This action updates a #${id} estructuracosto`;
  }

  remove(id: number) {
    return `This action removes a #${id} estructuracosto`;
  }
}
