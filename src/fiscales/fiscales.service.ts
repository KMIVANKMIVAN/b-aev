import { Injectable } from '@nestjs/common';
import { CreateFiscaleDto } from './dto/create-fiscale.dto';
import { UpdateFiscaleDto } from './dto/update-fiscale.dto';

@Injectable()
export class FiscalesService {
  create(createFiscaleDto: CreateFiscaleDto) {
    return 'This action adds a new fiscale';
  }

  findAll() {
    return `This action returns all fiscales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fiscale`;
  }

  update(id: number, updateFiscaleDto: UpdateFiscaleDto) {
    return `This action updates a #${id} fiscale`;
  }

  remove(id: number) {
    return `This action removes a #${id} fiscale`;
  }
}
