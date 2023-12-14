import { Injectable } from '@nestjs/common';
import { CreateModalidadeDto } from './dto/create-modalidade.dto';
import { UpdateModalidadeDto } from './dto/update-modalidade.dto';

@Injectable()
export class ModalidadesService {
  create(createModalidadeDto: CreateModalidadeDto) {
    return 'This action adds a new modalidade';
  }

  findAll() {
    return `This action returns all modalidades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modalidade`;
  }

  update(id: number, updateModalidadeDto: UpdateModalidadeDto) {
    return `This action updates a #${id} modalidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} modalidade`;
  }
}
