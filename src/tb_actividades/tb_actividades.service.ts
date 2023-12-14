import { Injectable } from '@nestjs/common';
import { CreateTbActividadeDto } from './dto/create-tb_actividade.dto';
import { UpdateTbActividadeDto } from './dto/update-tb_actividade.dto';

@Injectable()
export class TbActividadesService {
  create(createTbActividadeDto: CreateTbActividadeDto) {
    return 'This action adds a new tbActividade';
  }

  findAll() {
    return `This action returns all tbActividades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tbActividade`;
  }

  update(id: number, updateTbActividadeDto: UpdateTbActividadeDto) {
    return `This action updates a #${id} tbActividade`;
  }

  remove(id: number) {
    return `This action removes a #${id} tbActividade`;
  }
}
